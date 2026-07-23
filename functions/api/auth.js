// POST /api/auth — verifies the admin password for login screen; sets admin cookie for image access
import { authorized, json, sha256hex } from './_shared.js';
export async function onRequestPost({ request, env }){
  const ok = authorized(request, env);
  if(!ok) return json({ ok:false }, 401);
  const ack = await sha256hex(env.ADMIN_PASSWORD + '|ack');
  return new Response(JSON.stringify({ ok:true }), { status:200, headers:{
    'Content-Type':'application/json', 'Cache-Control':'no-store',
    'Set-Cookie': `ack=${ack}; Path=/; Max-Age=31536000; HttpOnly; Secure; SameSite=Lax`
  }});
}
