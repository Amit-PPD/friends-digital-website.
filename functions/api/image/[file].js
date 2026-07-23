// GET /api/image/:file — serves images from R2 (login required)
import { viewerOK } from '../_shared.js';
export async function onRequestGet({ request, env, params }){
  if(!(await viewerOK(request, env))) return new Response('login required', {status:401});
  const file = params.file;
  if(!/^((IJ|CV|TX)-[A-Z]{4}|3D|LT)-\d{4}\.jpg$/.test(file)) return new Response('not found', {status:404});
  const obj = await env.BUCKET.get(`images/${file}`);
  if(!obj) return new Response('not found', {status:404});
  return new Response(obj.body, { headers:{
    'Content-Type':'image/jpeg',
    'Cache-Control':'private, max-age=604800'
  }});
}
