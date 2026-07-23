// Shared helpers for all API routes
export const PTYPES = { IJ:"Inkjet Prints", CV:"Canvas Printing", TX:"Texture Canvas Printing", "3D":"3D Wall Art", LT:"Leather Paintings" };
export const FLAT_CODES = { "3D":"ART", LT:"LTH" };  // flat print types: one series, no collections

export const STRUCTURE = [
 ["Master Categories",[["MODN", "Modern Art"], ["ABST", "Abstract Art"], ["OFFC", "Office Art"], ["BOHO", "Boho"], ["BLKW", "Black & White"], ["FLRL", "Floral"], ["HRSE", "Horses"], ["CITY", "City & Landscapes"], ["TRVL", "Travel"], ["ASTR", "Astronomy & Space"], ["MUSC", "Music"], ["KTCH", "Kitchen / Food"], ["KIDS", "Kids Room"], ["BABY", "Baby / Cute Kids"], ["MOTV", "Motivational"], ["WMEN", "Women"], ["CUPL", "Couple"], ["EURO", "European Vintage"], ["PATR", "Patriotic / Freedom Fighters"], ["FMPT", "Famous Paintings"], ["MNDL", "Mandala"], ["AMRC", "America"]]],
 ["Nature",[["NATR", "Nature – General"], ["CSTL", "Coastal & Beach"], ["MNTN", "Mountains"], ["FRST", "Forests & Trees"], ["SESN", "Seasons"], ["CHRY", "Cherry Blossom / Japanese"], ["TRPC", "Tropical & Palms"], ["BTNC", "Botanical"]]],
 ["Wildlife",[["WILD", "Wildlife – General"], ["LNTG", "Lions & Tigers"], ["ELPH", "Elephants"], ["DEER", "Deer & Stag"], ["SEAL", "Sea Life"], ["BIRD", "Birds"]]],
 ["Automobile",[["AUTO", "Automobile – General"], ["BIKE", "Bikes & Motorcycles"], ["CARS", "Cars"]]],
 ["Sports",[["GYMF", "Gym & Fitness"], ["FTBL", "Football"], ["CRKT", "Cricket"], ["FRML", "Formula 1"], ["GOLF", "Golf"], ["BSBL", "Baseball"], ["BSKT", "Basketball"], ["BOXG", "Boxing"], ["MMAF", "MMA"]]],
 ["Pop Culture",[["POPM", "Pop Art / Maximalist"], ["GRFT", "Graffiti & Street Art"], ["HUMR", "Humor & Quirky"], ["SRRL", "Surreal"]]],
 ["Healthcare",[["MTRN", "Maternity Clinic"], ["DNTL", "Dental"], ["HART", "Heart"], ["HLTH", "Healthcare General"]]],
 ["Vastu & Feng Shui",[["VHRS", "Seven Running Horses"], ["VWTR", "Waterfall"], ["VPHX", "Phoenix"], ["VLTS", "Lotus"], ["VKOI", "Koi Fish"], ["VBUD", "Buddha (Vastu)"], ["VTRE", "Tree of Life"], ["VPCK", "Peacock"], ["VGEN", "General Vastu"], ["VSUN", "Sunrise"], ["VYNT", "Shri Yantra"]]],
 ["Traditional",[["PICH", "Pichwai"], ["SHNJ", "Shreenath Ji"], ["MDHB", "Madhubani"], ["KERM", "Kerala Mural"], ["MUGL", "Mughal Ethnic"], ["BNRS", "Banaras Ghat"], ["KLGT", "Kalighat"], ["WRLI", "Warli"], ["GOND", "Gond"], ["PTCH", "Pattachitra"], ["KLMK", "Kalamkari"], ["TNJR", "Tanjore Style"], ["PHAD", "Phad"], ["RJPM", "Rajput / Pahari Miniature"], ["MYSR", "Mysore Painting"], ["CHRL", "Cheriyal Scroll"], ["DOOR", "Rajasthani Doors & Jharokha"], ["DANC", "Indian Classical Dance"]]],
 ["Religious",[["KRSN", "Krishna"], ["RDKR", "Radha Krishna"], ["BLKR", "Bal Krishna"], ["RDHA", "Radha"], ["SHIV", "Shiva"], ["SHPV", "Shiv Parivar"], ["GNSH", "Ganesha"], ["LKSM", "Lakshmi"], ["LKGN", "Lakshmi Ganesh"], ["LGST", "Lakshmi Ganesh Saraswati"], ["SRSW", "Saraswati"], ["RAMA", "Ram / Ram Lala"], ["RMDB", "Ram Darbar"], ["STRM", "Sita Ram"], ["HNMN", "Hanuman"], ["DRGA", "Durga / Devi"], ["KALI", "Kali"], ["SNTM", "Santoshi Maa"], ["VSNU", "Vishnu / Vishnu Lakshmi"], ["GNGA", "Ganga Maiya"], ["SHNI", "Shani Dev"], ["NVGR", "Navgraha"], ["VSWK", "Vishwakarma"], ["SAIB", "Sai Baba"], ["KTSY", "Khatu Shyam"], ["JHLL", "Jhulelal"], ["NKRB", "Neem Karoli Baba"], ["SWMN", "Swaminarayan"], ["TRPB", "Tirupati Balaji"], ["MRGN", "Murugan"], ["AYPA", "Ayyappa"], ["MNKS", "Meenakshi"], ["VSHD", "Vaishno Devi"], ["BUDH", "Buddha"], ["MHVR", "Mahavir / Jain"], ["SIKH", "Sikhism"], ["JSMM", "Jesus / Mother Mary"], ["ISLM", "Islamic Calligraphy"], ["AMBK", "Ambedkar"], ["SPRT", "Spiritual General"], ["MHBT", "Mahabharata"], ["GLDT", "Golden Temple"], ["JGNT", "Jagannath"], ["RMND", "Ram Mandir Ayodhya"], ["NTRJ", "Nataraja"], ["OMSY", "Om & Sacred Symbols"], ["SHLK", "Sanskrit / Shloka Calligraphy"], ["GITA", "Gita Updesh"], ["KEDR", "Kedarnath / Char Dham"], ["ASHT", "Ashtalakshmi"], ["DSHV", "Dashavatar"], ["GRNK", "Guru Nanak / Sikh Gurus"], ["SURY", "Surya Dev"], ["MECC", "Mecca & Madina"]]],
 ["India States",[["PNJB", "Punjab"], ["RJST", "Rajasthan"], ["HRYA", "Haryana"], ["ODIS", "Odisha"], ["ASSM", "Assam"], ["HMPR", "Himachal Pradesh"], ["UTRK", "Uttarakhand"], ["UTPR", "Uttar Pradesh"], ["MDPR", "Madhya Pradesh"], ["MHRA", "Maharashtra"], ["GUJR", "Gujarat"], ["GOAA", "Goa"], ["KERL", "Kerala"], ["TMND", "Tamil Nadu"], ["KRNT", "Karnataka"], ["ANPR", "Andhra Pradesh"], ["TLNG", "Telangana"], ["WBNG", "West Bengal"], ["BIHR", "Bihar"], ["JHKD", "Jharkhand"], ["CHTG", "Chhattisgarh"], ["SIKM", "Sikkim"], ["ARNC", "Arunachal Pradesh"], ["NGLD", "Nagaland"], ["MNPR", "Manipur"], ["MZRM", "Mizoram"], ["TRPR", "Tripura"], ["MGHL", "Meghalaya"], ["DLHI", "Delhi"], ["JMKS", "Jammu & Kashmir"], ["LDKH", "Ladakh"], ["PDCH", "Puducherry"], ["ANDM", "Andaman & Nicobar"]]],
 ["Hotel Destinations",[["JAIP", "Jaipur"], ["UDAI", "Udaipur"], ["JODH", "Jodhpur"], ["JSLM", "Jaisalmer"], ["AGRA", "Agra"], ["VRNS", "Varanasi"], ["AMRT", "Amritsar"], ["RSHK", "Rishikesh–Haridwar"], ["SHML", "Shimla"], ["MNLI", "Manali"], ["MSRE", "Dehradun–Mussoorie"], ["NNTL", "Nainital"], ["LEHL", "Leh–Ladakh"], ["DRJL", "Darjeeling"], ["GNTK", "Gangtok"], ["SHLG", "Shillong"], ["KZRG", "Guwahati–Kaziranga"], ["PURI", "Puri"], ["GOAH", "Goa"], ["MUMB", "Mumbai"], ["PUNE", "Pune"], ["MTAB", "Mount Abu"], ["BHUJ", "Rann of Kutch–Bhuj"], ["KOCH", "Kochi"], ["MNNR", "Munnar"], ["OOTY", "Ooty"], ["MYSU", "Mysuru"], ["CORG", "Coorg"], ["CRBT", "Jim Corbett"], ["RNTH", "Ranthambore"], ["DELH", "Delhi"], ["BLRU", "Bengaluru"]]]
];

export const VALID_CODES = new Set(STRUCTURE.flatMap(([g,items])=>items.map(([c])=>c)));

export function authorized(request, env){
  const key = request.headers.get('x-admin-key') || '';
  return env.ADMIN_PASSWORD && key === env.ADMIN_PASSWORD;
}
export function getCookie(request, name){
  const c = request.headers.get('Cookie') || '';
  const m = c.match(new RegExp('(?:^|;\\s*)'+name+'=([^;]+)'));
  return m ? decodeURIComponent(m[1]) : null;
}
export async function sha256hex(s){
  const d = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s));
  return [...new Uint8Array(d)].map(b=>b.toString(16).padStart(2,'0')).join('');
}
export async function adminCookieOK(request, env){
  const v = getCookie(request, 'ack');
  if(!v || !env.ADMIN_PASSWORD) return false;
  return v === await sha256hex(env.ADMIN_PASSWORD + '|ack');
}
export async function customerOK(request, env){
  const tok = getCookie(request, 'catk');
  if(!tok) return false;
  const row = await env.DB.prepare('SELECT id FROM customers WHERE token=?1').bind(tok).first().catch(()=>null);
  return !!row;
}
export async function viewerOK(request, env){
  if(authorized(request, env)) return true;
  if(await adminCookieOK(request, env)) return true;
  return await customerOK(request, env);
}
export async function hashPass(pw, saltHex){
  const enc = new TextEncoder();
  const salt = saltHex
    ? Uint8Array.from(saltHex.match(/../g).map(h=>parseInt(h,16)))
    : crypto.getRandomValues(new Uint8Array(16));
  const key = await crypto.subtle.importKey('raw', enc.encode(pw), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({name:'PBKDF2', salt, iterations:100000, hash:'SHA-256'}, key, 256);
  const hex = a => [...new Uint8Array(a.buffer||a)].map(b=>b.toString(16).padStart(2,'0')).join('');
  return hex(salt) + '$' + hex(bits);
}
export function json(data, status=200){
  return new Response(JSON.stringify(data), {
    status, headers:{'Content-Type':'application/json','Cache-Control':'no-store'}
  });
}
