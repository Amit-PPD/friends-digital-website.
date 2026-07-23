// GET /api/original/:sku — returns the print master (admin only); lightweight check via ?probe=1
import { authorized, json } from '../_shared.js';
const EXT = {'image/jpeg':'jpg','image/png':'png','image/webp':'webp','image/tiff':'tif'};
export async function onRequestGet({ request, env, params }){
  if(!authorized(request, env)) return json({error:'unauthorized'}, 401);
  const sku = params.sku;
  const obj = await env.BUCKET.get(`originals/${sku}`);
  if(!obj) return json({error:'no original stored for this SKU'}, 404);
  const ct = obj.httpMetadata?.contentType || 'application/octet-stream';
  if(new URL(request.url).searchParams.get('probe'))
    return json({ ok:true, bytes: obj.size, type: ct });
  const ext = EXT[ct] || 'bin';
  return new Response(obj.body, { headers: {
    'Content-Type': ct,
    'Content-Disposition': `attachment; filename="${sku}.${ext}"`,
    'Cache-Control': 'no-store'
  }});
}
