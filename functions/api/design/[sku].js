// DELETE /api/design/:sku — removes a design (number is never reused)
import { authorized, json } from '../_shared.js';
export async function onRequestDelete({ request, env, params }){
  if(!authorized(request, env)) return json({error:'unauthorized'}, 401);
  const sku = params.sku;
  await env.BUCKET.delete(`images/${sku}.jpg`);
  await env.BUCKET.delete(`originals/${sku}`);
  await env.DB.prepare('DELETE FROM designs WHERE sku=?1').bind(sku).run();
  return json({ ok:true });
}
