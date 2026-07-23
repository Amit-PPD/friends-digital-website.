// POST /api/hashcheck {hashes:[...]} — returns {matches:{hash:sku}} for already-uploaded files
import { authorized, json } from './_shared.js';
export async function onRequestPost({ request, env }){
  if(!authorized(request, env)) return json({error:'unauthorized'}, 401);
  const { hashes } = await request.json();
  if(!Array.isArray(hashes) || !hashes.length || hashes.length>200) return json({matches:{}});
  const qs = hashes.map((_,i)=>'?'+(i+1)).join(',');
  const rows = await env.DB.prepare(
    `SELECT sku, hash FROM designs WHERE live=1 AND hash IN (${qs})`
  ).bind(...hashes).all();
  const matches={};
  (rows.results||[]).forEach(r=>{ if(r.hash) matches[r.hash]=r.sku; });
  return json({ matches });
}
