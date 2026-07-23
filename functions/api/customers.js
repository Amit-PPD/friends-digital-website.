// GET /api/customers — admin only: full registered customer list
// POST /api/customers {action:'resetpass', id, password} — admin sets a new password for a customer
import { authorized, json, hashPass } from './_shared.js';
export async function onRequestGet({ request, env }){
  if(!authorized(request, env)) return json({error:'unauthorized'}, 401);
  const { results } = await env.DB.prepare(
    'SELECT id,name,company,phone,email,created FROM customers ORDER BY id DESC'
  ).all();
  return json({ customers: results||[] });
}
export async function onRequestPost({ request, env }){
  if(!authorized(request, env)) return json({error:'unauthorized'}, 401);
  const b = await request.json().catch(()=>({}));
  if(b.action !== 'resetpass') return json({error:'bad action'}, 400);
  const id = b.id|0, pw = b.password||'';
  if(!id || !pw) return json({error:'need customer id and new password'}, 400);
  const row = await env.DB.prepare('SELECT id FROM customers WHERE id=?1').bind(id).first();
  if(!row) return json({error:'customer not found'}, 404);
  const pass = await hashPass(pw);
  const token = crypto.randomUUID().replace(/-/g,'') + crypto.randomUUID().replace(/-/g,'');
  await env.DB.prepare('UPDATE customers SET pass=?2, token=?3 WHERE id=?1').bind(id, pass, token).run();
  return json({ ok:true });
}
