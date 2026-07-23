// POST /api/upload-original/:sku — stores the untouched print master in the vault (originals/)
import { authorized, json } from '../_shared.js';
export async function onRequestPost({ request, env, params }){
  if(!authorized(request, env)) return json({error:'unauthorized'}, 401);
  const sku = params.sku;
  const rec = await env.DB.prepare('SELECT sku FROM designs WHERE sku=?1').bind(sku).first();
  if(!rec) return json({error:'sku not reserved'}, 404);
  const ctype = request.headers.get('x-orig-type') || 'application/octet-stream';
  const body = await request.arrayBuffer();
  if(body.byteLength < 1000) return json({error:'file too small'}, 400);
  if(body.byteLength > 95_000_000) return json({error:'file exceeds 95MB limit'}, 400);
  await env.BUCKET.put(`originals/${sku}`, body, { httpMetadata: { contentType: ctype } });
  return json({ ok:true, sku, bytes: body.byteLength });
}
