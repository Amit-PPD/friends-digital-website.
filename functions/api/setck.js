// POST /api/setck {sku, ck} — stores the colour key for a design (admin; used by backfill)
import { authorized, json } from './_shared.js';
export async function onRequestPost({ request, env }){
  if(!authorized(request, env)) return json({error:'unauthorized'}, 401);
  const { sku, ck } = await request.json();
  if(!sku || !Number.isFinite(ck)) return json({error:'bad input'}, 400);
  await env.DB.prepare('UPDATE designs SET ck=?2 WHERE sku=?1').bind(sku, ck|0).run();
  return json({ ok:true });
}
