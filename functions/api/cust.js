// Customer accounts — GET /api/cust (session check) | POST {action:register|login|logout}
// Instant access on register. Passwords: any text, no rules; stored as PBKDF2 hash.
import { json, hashPass } from './_shared.js';

const cookie = (tok, maxAge=31536000) =>
  `catk=${tok}; Path=/; Max-Age=${maxAge}; HttpOnly; Secure; SameSite=Lax`;
const respond = (data, status, setCookie) => new Response(JSON.stringify(data), { status,
  headers:{ 'Content-Type':'application/json', 'Cache-Control':'no-store',
    ...(setCookie ? {'Set-Cookie': setCookie} : {}) }});

export async function onRequestGet({ request, env }){
  const c = (request.headers.get('Cookie')||'').match(/(?:^|;\s*)catk=([^;]+)/);
  if(!c) return json({ ok:false }, 401);
  const row = await env.DB.prepare('SELECT name FROM customers WHERE token=?1').bind(c[1]).first().catch(()=>null);
  return row ? json({ ok:true, name: row.name }) : json({ ok:false }, 401);
}

export async function onRequestPost({ request, env }){
  const b = await request.json().catch(()=>({}));
  const act = b.action;

  if(act === 'logout') return respond({ ok:true }, 200, cookie('x', 0));

  if(act === 'register'){
    const name=(b.name||'').trim(), company=(b.company||'').trim(),
          phone=(b.phone||'').trim(), email=(b.email||'').trim().toLowerCase(),
          pw=b.password||'';
    if(!name||!company||!phone||!email||!pw) return json({error:'Please fill all fields.'},400);
    if(!/^\S+@\S+\.\S+$/.test(email)) return json({error:'Please enter a valid email.'},400);
    if(!/^[\d+\-() ]{7,16}$/.test(phone)) return json({error:'Please enter a valid phone number.'},400);
    const dup = await env.DB.prepare('SELECT id FROM customers WHERE email=?1').bind(email).first();
    if(dup) return json({error:'This email is already registered. Please use Login.'},409);
    const pdigits = phone.replace(/\D/g,'').slice(-10);
    if(pdigits.length >= 7){
      const pdup = await env.DB.prepare(
        `SELECT id FROM customers
         WHERE replace(replace(replace(replace(replace(phone,' ',''),'-',''),'+',''),'(',''),')','') LIKE ?1`
      ).bind('%'+pdigits).first();
      if(pdup) return json({error:'This phone number is already registered. Please use Login.'},409);
    }
    const pass = await hashPass(pw);
    const token = crypto.randomUUID().replace(/-/g,'') + crypto.randomUUID().replace(/-/g,'');
    await env.DB.prepare(
      `INSERT INTO customers(name,company,phone,email,pass,token,created)
       VALUES(?1,?2,?3,?4,?5,?6,?7)`
    ).bind(name,company,phone,email,pass,token,new Date().toISOString()).run();
    return respond({ ok:true, name }, 200, cookie(token));
  }

  if(act === 'login'){
    const idRaw=(b.email||'').trim(), pw=b.password||'';
    if(!idRaw||!pw) return json({error:'Please enter your email or phone, and password.'},400);
    let row;
    if(idRaw.includes('@')){
      row = await env.DB.prepare('SELECT id,name,pass,token FROM customers WHERE email=?1')
        .bind(idRaw.toLowerCase()).first();
    } else {
      const digits = idRaw.replace(/\D/g,'').slice(-10);
      if(digits.length < 7) return json({error:'Please enter a valid email or phone number.'},400);
      row = await env.DB.prepare(
        `SELECT id,name,pass,token FROM customers
         WHERE replace(replace(replace(replace(replace(phone,' ',''),'-',''),'+',''),'(',''),')','') LIKE ?1`
      ).bind('%'+digits).first();
    }
    if(!row) return json({error:'No account found. Please check the details or register.'},404);
    const salt = row.pass.split('$')[0];
    if(await hashPass(pw, salt) !== row.pass) return json({error:'Incorrect password.'},401);
    return respond({ ok:true, name: row.name }, 200, cookie(row.token));
  }

  return json({error:'bad action'},400);
}
