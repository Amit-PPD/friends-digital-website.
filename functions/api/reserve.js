// POST /api/reserve {ptype, code, bucket, w, h} — atomically assigns the next SKU
import { authorized, json, VALID_CODES, PTYPES, FLAT_CODES } from './_shared.js';
export async function onRequestPost({ request, env }){
  if(!authorized(request, env)) return json({error:'unauthorized'}, 401);
  let { ptype, code, bucket, w, h, hash, ck } = await request.json();
  if(!PTYPES[ptype]) return json({error:'unknown print type'}, 400);
  if(FLAT_CODES[ptype]){ code = FLAT_CODES[ptype]; }        // flat print types (3D, Leather): one series each
  else if(!VALID_CODES.has(code)) return json({error:'unknown collection code'}, 400);
  if(!(bucket>=1 && bucket<=8)) return json({error:'bad bucket'}, 400);

  const row = await env.DB.prepare(
    `INSERT INTO counters(ptype,code,bucket,seq) VALUES(?1,?2,?3,1)
     ON CONFLICT(ptype,code,bucket) DO UPDATE SET seq=seq+1
     RETURNING seq`
  ).bind(ptype, code, bucket).first();
  if(row.seq > 999) return json({error:'bucket full (999) — contact admin to open overflow range'}, 409);

  const num = bucket*1000 + row.seq;
  const sku = FLAT_CODES[ptype] ? `${ptype}-${num}` : `${ptype}-${code}-${num}`;
  await env.DB.prepare(
    'INSERT INTO designs(sku,ptype,code,bucket,w,h,added,live,hash,ck) VALUES(?1,?2,?3,?4,?5,?6,?7,0,?8,?9)'
  ).bind(sku, ptype, code, bucket, w|0, h|0, new Date().toISOString().slice(0,10), hash||null, Number.isFinite(ck)?ck:null).run();

  return json({ sku });
}
