// POST /api/hide {ptype, code, hidden:true|false} — toggle collection visibility
import { authorized, json, VALID_CODES, PTYPES } from './_shared.js';
export async function onRequestPost({ request, env }){
  if(!authorized(request, env)) return json({error:'unauthorized'}, 401);
  const { ptype, code, hidden } = await request.json();
  if(!PTYPES[ptype]) return json({error:'unknown print type'}, 400);
  if(code!=='ART' && code!=='LTH' && !VALID_CODES.has(code)) return json({error:'unknown collection'}, 400);
  if(hidden){
    await env.DB.prepare('INSERT OR IGNORE INTO hidden(ptype,code) VALUES(?1,?2)').bind(ptype,code).run();
  } else {
    await env.DB.prepare('DELETE FROM hidden WHERE ptype=?1 AND code=?2').bind(ptype,code).run();
  }
  return json({ ok:true });
}
