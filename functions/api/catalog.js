// GET /api/catalog — public catalog data (hidden collections excluded)
// GET /api/catalog?all=1 with admin key — includes hidden, returns hidden list
import { json, authorized, viewerOK } from './_shared.js';
export async function onRequestGet({ request, env }){
  const url = new URL(request.url);
  const wantAll = url.searchParams.get('all')==='1' && authorized(request, env);
  if(!wantAll && !(await viewerOK(request, env))) return json({error:'login required'}, 401);

  const { results } = await env.DB.prepare(
    'SELECT sku, ptype, code, bucket, w, h, added, ck FROM designs WHERE live=1 ORDER BY ptype, code, sku'
  ).all();
  const hiddenRows = (await env.DB.prepare('SELECT ptype, code FROM hidden').all()).results || [];
  const hiddenSet = new Set(hiddenRows.map(r=>r.ptype+'|'+r.code));

  const designs = wantAll ? results
    : results.filter(d=> !hiddenSet.has(d.ptype+'|'+d.code));

  const out = { updated: new Date().toISOString().slice(0,10), designs };
  if(wantAll) out.hidden = hiddenRows;
  return json(out);
}
