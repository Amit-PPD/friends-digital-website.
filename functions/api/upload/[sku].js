// POST /api/upload/:sku — body is the processed JPEG; stores in R2, sets design live
import { authorized, json } from '../_shared.js';
export async function onRequestPost({ request, env, params }){
  if(!authorized(request, env)) return json({error:'unauthorized'}, 401);
  const sku = params.sku;
  const rec = await env.DB.prepare('SELECT sku FROM designs WHERE sku=?1').bind(sku).first();
  if(!rec) return json({error:'sku not reserved'}, 404);

  const body = await request.arrayBuffer();
  if(body.byteLength < 1000) return json({error:'file too small'}, 400);
  if(body.byteLength > 8_000_000) return json({error:'file too large'}, 400);

  await env.BUCKET.put(`images/${sku}.jpg`, body, {
    httpMetadata: { contentType: 'image/jpeg' }
  });
  await env.DB.prepare('UPDATE designs SET live=1 WHERE sku=?1').bind(sku).run();
  return json({ ok:true, sku });
}
