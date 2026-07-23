// GET /api/dlmark?ptype=&code=  |  POST /api/dlmark {ptype,code,date}
// Remembers, per collection, when print masters were last bulk-downloaded (shared across the team)
import { authorized, json } from './_shared.js';
export async function onRequestGet({ request, env }){
  if(!authorized(request, env)) return json({error:'unauthorized'}, 401);
  const u=new URL(request.url);
  const ptype=u.searchParams.get('ptype'), code=u.searchParams.get('code');
  if(!ptype||!code) return json({error:'bad input'},400);
  const row = await env.DB.prepare('SELECT last_dl FROM dlmarks WHERE ptype=?1 AND code=?2').bind(ptype,code).first();
  return json({ last_dl: row?row.last_dl:null });
}
export async function onRequestPost({ request, env }){
  if(!authorized(request, env)) return json({error:'unauthorized'}, 401);
  const { ptype, code, date } = await request.json();
  if(!ptype||!code||!/^\d{4}-\d{2}-\d{2}$/.test(date||'')) return json({error:'bad input'},400);
  await env.DB.prepare(
    `INSERT INTO dlmarks(ptype,code,last_dl) VALUES(?1,?2,?3)
     ON CONFLICT(ptype,code) DO UPDATE SET last_dl=?3`
  ).bind(ptype,code,date).run();
  return json({ ok:true });
}
