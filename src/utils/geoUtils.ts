// Geographic mathematical calculations, name resolution and world country mapping
import { COUNTRIES_DATA, DEFAULT_COUNTRY_DATA } from '../data/countries';
import { CountryData, FlightArcData } from '../types';

export const VIETNAM_COORDINATES = {
  lat: 14.0583,
  lng: 108.2772,
  altitude: 2.1
};

/**
 * Calculates the great-circle distance between two points on the Earth's surface in kilometers using the Haversine formula.
 */
export function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's mean radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

/**
 * Formats a number with dot separator (e.g. 1000000 -> 1.000.000)
 */
export function formatNumberVi(num: number): string {
  return num.toLocaleString('vi-VN');
}

/**
 * Creates Flight Arc data from Vietnam to target Country
 */
export function createVietnamFlightArc(targetCountry: CountryData): FlightArcData {
  const vn = COUNTRIES_DATA.vietnam || { lat: 14.0583, lng: 108.2772 };
  const distanceKm = calculateDistanceKm(vn.lat, vn.lng, targetCountry.lat, targetCountry.lng);
  // Average commercial jet cruise speed ~ 850 km/h + 0.5h takeoff/landing
  const flightHours = Math.round((distanceKm / 850 + 0.5) * 10) / 10;

  return {
    startLat: vn.lat,
    startLng: vn.lng,
    endLat: targetCountry.lat,
    endLng: targetCountry.lng,
    fromName: 'Việt Nam 🇻🇳',
    toName: `${targetCountry.nameVi} ${targetCountry.flag}`,
    distanceKm,
    flightHours,
    color: ['#ef4444', '#06b6d4']
  };
}

/**
 * Calculates bearing and relative direction between two geographical points
 */
export function getRelativeDirection(
  originLat: number,
  originLng: number,
  targetLat: number,
  targetLng: number,
  mode: '4_cardinal' | '8_ordinal' = '8_ordinal'
): { code: string; labelVi: string; arrow: string; bearing: number } {
  const dLng = ((targetLng - originLng) * Math.PI) / 180;
  const lat1 = (originLat * Math.PI) / 180;
  const lat2 = (targetLat * Math.PI) / 180;

  const y = Math.sin(dLng) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
  let bearing = (Math.atan2(y, x) * 180) / Math.PI;
  bearing = (bearing + 360) % 360;

  if (mode === '4_cardinal') {
    if (bearing >= 45 && bearing < 135) return { code: 'E', labelVi: 'Phía Đông', arrow: '→', bearing };
    if (bearing >= 135 && bearing < 225) return { code: 'S', labelVi: 'Phía Nam', arrow: '↓', bearing };
    if (bearing >= 225 && bearing < 315) return { code: 'W', labelVi: 'Phía Tây', arrow: '←', bearing };
    return { code: 'N', labelVi: 'Phía Bắc', arrow: '↑', bearing };
  } else {
    if (bearing >= 22.5 && bearing < 67.5) return { code: 'NE', labelVi: 'Phía Đông Bắc', arrow: '↗', bearing };
    if (bearing >= 67.5 && bearing < 112.5) return { code: 'E', labelVi: 'Phía Đông', arrow: '→', bearing };
    if (bearing >= 112.5 && bearing < 157.5) return { code: 'SE', labelVi: 'Phía Đông Nam', arrow: '↘', bearing };
    if (bearing >= 157.5 && bearing < 202.5) return { code: 'S', labelVi: 'Phía Nam', arrow: '↓', bearing };
    if (bearing >= 202.5 && bearing < 247.5) return { code: 'SW', labelVi: 'Phía Tây Nam', arrow: '↙', bearing };
    if (bearing >= 247.5 && bearing < 292.5) return { code: 'W', labelVi: 'Phía Tây', arrow: '←', bearing };
    if (bearing >= 292.5 && bearing < 337.5) return { code: 'NW', labelVi: 'Phía Tây Bắc', arrow: '↖', bearing };
    return { code: 'N', labelVi: 'Phía Bắc', arrow: '↑', bearing };
  }
}

/**
 * Returns pedagogical description of relative direction of a country compared to Vietnam
 */
export function getDirectionFromVietnam(targetCountry: CountryData): { text: string; arrow: string } {
  if (targetCountry.id === 'vietnam') {
    return { text: 'Trung tâm quan sát', arrow: '📍' };
  }

  // 1. Check pedagogical explicit override
  if (targetCountry.relativeDirectionFromVietnam) {
    const dir = targetCountry.relativeDirectionFromVietnam;
    let arrow = '🧭';
    if (dir.includes('Bắc') && dir.includes('Đông')) arrow = '↗';
    else if (dir.includes('Bắc') && dir.includes('Tây')) arrow = '↖';
    else if (dir.includes('Nam') && dir.includes('Đông')) arrow = '↘';
    else if (dir.includes('Nam') && dir.includes('Tây')) arrow = '↙';
    else if (dir.includes('Bắc')) arrow = '↑';
    else if (dir.includes('Nam')) arrow = '↓';
    else if (dir.includes('Đông')) arrow = '→';
    else if (dir.includes('Tây')) arrow = '←';
    return { text: `${targetCountry.nameVi} nằm về ${dir.toLowerCase()} của Việt Nam.`, arrow };
  }

  // 2. Computed direction
  const vn = COUNTRIES_DATA.vietnam || { lat: 14.0583, lng: 108.2772 };
  const calc = getRelativeDirection(vn.lat, vn.lng, targetCountry.lat, targetCountry.lng, '8_ordinal');
  return {
    text: `${targetCountry.nameVi} nằm về ${calc.labelVi.toLowerCase()} của Việt Nam.`,
    arrow: calc.arrow
  };
}

/**
 * Converts 2-letter ISO country code to Flag Emoji
 */
export function getCountryFlagEmoji(iso2: string): string {
  if (!iso2 || typeof iso2 !== 'string') return '🌐';
  const cleanIso = iso2.trim().toUpperCase();
  if (cleanIso.length === 2 && /^[A-Z]{2}$/.test(cleanIso)) {
    const codePoints = cleanIso.split('').map(c => 127397 + c.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  }
  return '🌐';
}

/**
 * Normalizes text for robust geographical matching including full Vietnamese diacritics support
 */
export function normalizeGeoString(str: string): string {
  if (!str || typeof str !== 'string') return '';
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f\u1dc0-\u1dff\u20d0-\u20ff\ufe20-\ufe2f]/g, '') // remove combining accents
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'd')
    .replace(/[.,/#!$%^&*;:{}=\-_`~()?"'’]/g, ' ') // replace punctuation with space
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Dictionary of ISO3 codes, ISO2 codes, abbreviations and English name variations
 */
export const COUNTRY_ALIASES: Record<string, string> = {
  // === ISO-3 CODES ===
  vnm: 'vietnam',
  jpn: 'japan',
  chn: 'china',
  kor: 'south_korea',
  prk: 'north_korea',
  tha: 'thailand',
  sgp: 'singapore',
  ind: 'india',
  fra: 'france',
  gbr: 'united_kingdom',
  deu: 'germany',
  ita: 'italy',
  egy: 'egypt',
  usa: 'united_states',
  can: 'canada',
  bra: 'brazil',
  aus: 'australia',
  rus: 'russia',
  zaf: 'south_africa',
  lao: 'laos',
  khm: 'cambodia',
  arg: 'argentina',
  idn: 'indonesia',
  mys: 'malaysia',
  phl: 'philippines',
  mmr: 'myanmar',
  brn: 'brunei',
  mng: 'mongolia',
  sau: 'saudi_arabia',
  are: 'uae',
  tur: 'turkey',
  esp: 'spain',
  nld: 'netherlands',
  che: 'switzerland',
  grc: 'greece',
  mex: 'mexico',
  per: 'peru',
  nzl: 'new_zealand',
  ken: 'kenya',
  mdg: 'madagascar',
  chl: 'chile',
  col: 'colombia',
  cub: 'cuba',
  swe: 'sweden',
  nor: 'norway',
  mar: 'morocco',
  tza: 'tanzania',
  npl: 'nepal',

  // === ISO-2 CODES (Only map unambiguous 2-letter uppercase codes via strict check) ===
  vn: 'vietnam',
  jp: 'japan',
  cn: 'china',
  kr: 'south_korea',
  kp: 'north_korea',
  th: 'thailand',
  sg: 'singapore',
  in: 'india',
  fr: 'france',
  gb: 'united_kingdom',
  uk: 'united_kingdom',
  de: 'germany',
  it: 'italy',
  eg: 'egypt',
  us: 'united_states',
  ca: 'canada',
  br: 'brazil',
  au: 'australia',
  ru: 'russia',
  za: 'south_africa',
  la: 'laos',
  kh: 'cambodia',
  ar: 'argentina',
  id: 'indonesia',
  my: 'malaysia',
  ph: 'philippines',
  mm: 'myanmar',
  bn: 'brunei',
  mn: 'mongolia',
  sa: 'saudi_arabia',
  ae: 'uae',
  tr: 'turkey',
  es: 'spain',
  nl: 'netherlands',
  ch: 'switzerland',
  gr: 'greece',
  mx: 'mexico',
  pe: 'peru',
  nz: 'new_zealand',
  ke: 'kenya',
  mg: 'madagascar',
  cl: 'chile',
  co: 'colombia',
  cu: 'cuba',
  se: 'sweden',
  no: 'norway',
  ma: 'morocco',
  tz: 'tanzania',
  np: 'nepal',

  // === NAME VARIATIONS, NATURAL EARTH & VIETNAMESE STRINGS ===
  'viet nam': 'vietnam',
  'vietnam': 'vietnam',
  'việt nam': 'vietnam',
  'socialist republic of vietnam': 'vietnam',
  'cong hoa xa hoi chu nghia viet nam': 'vietnam',
  'cộng hòa xã hội chủ nghĩa việt nam': 'vietnam',
  
  'japan': 'japan',
  'nippon': 'japan',
  'nhat ban': 'japan',
  'nhật bản': 'japan',
  'nhat': 'japan',
  'nhật': 'japan',
  
  'china': 'china',
  'peoples republic of china': 'china',
  "people's republic of china": 'china',
  'trung quoc': 'china',
  'trung quốc': 'china',
  'trung hoa': 'china',
  'trung': 'china',
  
  'south korea': 'south_korea',
  'republic of korea': 'south_korea',
  'korea, south': 'south_korea',
  'korea south': 'south_korea',
  'korea': 'south_korea',
  'han quoc': 'south_korea',
  'hàn quốc': 'south_korea',
  'nam trieu tien': 'south_korea',
  'nam triều tiên': 'south_korea',

  'north korea': 'north_korea',
  'dem rep korea': 'north_korea',
  'democratic peoples republic of korea': 'north_korea',
  "democratic people's republic of korea": 'north_korea',
  'korea, north': 'north_korea',
  'korea north': 'north_korea',
  'trieu tien': 'north_korea',
  'triều tiên': 'north_korea',
  'bac trieu tien': 'north_korea',
  'bắc triều tiên': 'north_korea',

  'united states': 'united_states',
  'united states of america': 'united_states',
  'the united states': 'united_states',
  'the united states of america': 'united_states',
  'america': 'united_states',
  'u s a ': 'united_states',
  'hoa ky': 'united_states',
  'hoa kỳ': 'united_states',
  'mỹ': 'united_states',
  'nuoc my': 'united_states',
  'nước mỹ': 'united_states',

  'united kingdom': 'united_kingdom',
  'the united kingdom': 'united_kingdom',
  'great britain': 'united_kingdom',
  'the united kingdom of great britain and northern ireland': 'united_kingdom',
  'england': 'united_kingdom',
  'britain': 'united_kingdom',
  'anh': 'united_kingdom',
  'nuoc anh': 'united_kingdom',
  'nước anh': 'united_kingdom',
  'vuong quoc anh': 'united_kingdom',
  'vương quốc anh': 'united_kingdom',

  'russia': 'russia',
  'russian federation': 'russia',
  'nga': 'russia',
  'nuoc nga': 'russia',
  'nước nga': 'russia',
  'lien bang nga': 'russia',
  'liên bang nga': 'russia',

  'germany': 'germany',
  'federal republic of germany': 'germany',
  'deutschland': 'germany',
  'duc': 'germany',
  'đức': 'germany',
  'nuoc duc': 'germany',
  'nước đức': 'germany',

  'france': 'france',
  'french republic': 'france',
  'phap': 'france',
  'pháp': 'france',
  'nuoc phap': 'france',
  'nước pháp': 'france',

  'italy': 'italy',
  'italian republic': 'italy',
  'italia': 'italy',
  'y': 'italy',
  'ý': 'italy',
  'nuoc y': 'italy',
  'nước ý': 'italy',

  'spain': 'spain',
  'kingdom of spain': 'spain',
  'espana': 'spain',
  'tay ban nha': 'spain',
  'tây ban nha': 'spain',

  'netherlands': 'netherlands',
  'the netherlands': 'netherlands',
  'holland': 'netherlands',
  'kingdom of the netherlands': 'netherlands',
  'ha lan': 'netherlands',
  'hà lan': 'netherlands',

  'switzerland': 'switzerland',
  'swiss confederation': 'switzerland',
  'thuy si': 'switzerland',
  'thụy sĩ': 'switzerland',

  'greece': 'greece',
  'hellenic republic': 'greece',
  'hellas': 'greece',
  'hy lap': 'greece',
  'hy lạp': 'greece',

  'turkey': 'turkey',
  'republic of turkey': 'turkey',
  'turkiye': 'turkey',
  'republic of turkiye': 'turkey',
  'tho nhi ky': 'turkey',
  'thổ nhĩ kỳ': 'turkey',

  'saudi arabia': 'saudi_arabia',
  'kingdom of saudi arabia': 'saudi_arabia',
  'a rap xe ut': 'saudi_arabia',
  'ả rập xê út': 'saudi_arabia',

  'uae': 'uae',
  'united arab emirates': 'uae',
  'the united arab emirates': 'uae',
  'the uae': 'uae',
  'cac tieu vuong quoc a rap thong nhat': 'uae',
  'các tiểu vương quốc ả rập thống nhất': 'uae',

  'egypt': 'egypt',
  'arab republic of egypt': 'egypt',
  'ai cap': 'egypt',
  'ai cập': 'egypt',

  'south africa': 'south_africa',
  'republic of south africa': 'south_africa',
  'nam phi': 'south_africa',

  'kenya': 'kenya',
  'republic of kenya': 'kenya',
  'ke-ni-a': 'kenya',
  'kê-ni-a': 'kenya',

  'madagascar': 'madagascar',
  'republic of madagascar': 'madagascar',
  'ma-da-gat-xca': 'madagascar',
  'ma-đa-gát-xca': 'madagascar',

  'morocco': 'morocco',
  'kingdom of morocco': 'morocco',
  'ma-roc': 'morocco',
  'ma-rốc': 'morocco',

  'tanzania': 'tanzania',
  'united republic of tanzania': 'tanzania',
  'tan-da-ni-a': 'tanzania',

  'nepal': 'nepal',
  'federal democratic republic of nepal': 'nepal',
  'ne-pan': 'nepal',
  'nê-pan': 'nepal',

  'mongolia': 'mongolia',
  'mong co': 'mongolia',
  'mông cổ': 'mongolia',

  'indonesia': 'indonesia',
  'republic of indonesia': 'indonesia',
  'in-do-ne-xi-a': 'indonesia',
  'in-đô-nê-xi-a': 'indonesia',

  'malaysia': 'malaysia',
  'ma-lai-xi-a': 'malaysia',

  'philippines': 'philippines',
  'the philippines': 'philippines',
  'republic of the philippines': 'philippines',
  'phi-lip-pin': 'philippines',

  'thailand': 'thailand',
  'kingdom of thailand': 'thailand',
  'siam': 'thailand',
  'thai lan': 'thailand',
  'thái lan': 'thailand',
  'xiem': 'thailand',

  'singapore': 'singapore',
  'republic of singapore': 'singapore',
  'xin-ga-po': 'singapore',

  'india': 'india',
  'republic of india': 'india',
  'bharat': 'india',
  'an do': 'india',
  'ấn độ': 'india',

  'laos': 'laos',
  'lao pdr': 'laos',
  'lao p d r': 'laos',
  "lao people's democratic republic": 'laos',
  'lao peoples democratic republic': 'laos',
  'lào': 'laos',

  'cambodia': 'cambodia',
  'kingdom of cambodia': 'cambodia',
  'campuchia': 'cambodia',
  'cam-pu-chia': 'cambodia',

  'myanmar': 'myanmar',
  'republic of the union of myanmar': 'myanmar',
  'burma': 'myanmar',
  'mi-an-ma': 'myanmar',

  'brunei': 'brunei',
  'brunei darussalam': 'brunei',
  'bru-nay': 'brunei',
  'bru-nây': 'brunei',

  'australia': 'australia',
  'commonwealth of australia': 'australia',
  'uc': 'australia',
  'úc': 'australia',
  'nuoc uc': 'australia',
  'nước úc': 'australia',

  'new zealand': 'new_zealand',
  'aotearoa': 'new_zealand',
  'niu di-lan': 'new_zealand',
  'niu di-lân': 'new_zealand',

  'canada': 'canada',
  'ca-na-da': 'canada',
  'ca-na-đa': 'canada',

  'mexico': 'mexico',
  'united mexican states': 'mexico',
  'me-hi-co': 'mexico',
  'mê-hi-cô': 'mexico',

  'brazil': 'brazil',
  'brasil': 'brazil',
  'federative republic of brazil': 'brazil',
  'bra-xin': 'brazil',

  'argentina': 'argentina',
  'argentine republic': 'argentina',
  'ac-hen-ti-na': 'argentina',
  'ác-hen-ti-na': 'argentina',

  'chile': 'chile',
  'republic of chile': 'chile',
  'chi-le': 'chile',
  'chi-lê': 'chile',

  'colombia': 'colombia',
  'republic of colombia': 'colombia',
  'co-lom-bi-a': 'colombia',
  'cô-lôm-bi-a': 'colombia',

  'peru': 'peru',
  'republic of peru': 'peru',
  'pe-ru': 'peru',
  'pê-ru': 'peru',

  'cuba': 'cuba',
  'republic of cuba': 'cuba',
  'cu-ba': 'cuba',

  'sweden': 'sweden',
  'kingdom of sweden': 'sweden',
  'thuy dien': 'sweden',
  'thụy điển': 'sweden',

  'norway': 'norway',
  'kingdom of norway': 'norway',
  'na uy': 'norway',

  'poland': 'poland',
  'ba lan': 'poland',

  'portugal': 'portugal',
  'bo dao nha': 'portugal',
  'bồ đào nha': 'portugal',

  'austria': 'austria',
  'ao': 'austria',
  'áo': 'austria',
  'nuoc ao': 'austria',
  'nước áo': 'austria',

  'belgium': 'belgium',
  'bi': 'belgium',
  'bỉ': 'belgium',
  'nuoc bi': 'belgium',
  'nước bỉ': 'belgium',

  'denmark': 'denmark',
  'dan mach': 'denmark',
  'đan mạch': 'denmark',

  'finland': 'finland',
  'phan lan': 'finland',
  'phần lan': 'finland',

  'czechia': 'czechia',
  'czech republic': 'czechia',
  'sec': 'czechia',
  'séc': 'czechia',
  'cong hoa sec': 'czechia',
  'cộng hòa séc': 'czechia',

  'taiwan': 'taiwan',
  'dai loan': 'taiwan',
  'đài loan': 'taiwan',

  'timor-leste': 'timor_leste',
  'timor leste': 'timor_leste',
  'east timor': 'timor_leste',
  'dong timor': 'timor_leste',
  'đông timor': 'timor_leste',

  'iceland': 'iceland',
  'bang dao': 'iceland',
  'băng đảo': 'iceland',

  'ireland': 'ireland',
  'ai-len': 'ireland',
  'ai len': 'ireland',

  'ukraine': 'ukraine',
  'u-crai-na': 'ukraine',

  'vatican': 'vatican',
  'vatican city': 'vatican',
  'toa thanh vatican': 'vatican',
  'tòa thánh vatican': 'vatican'
};

/**
 * Information record for all international countries and territories
 */
export interface WorldCountryInfo {
  nameVi: string;
  nameEn: string;
  capitalVi: string;
  continentVi: string;
  continentId: CountryData['continentId'];
  iso2: string;
  flag: string;
}

/**
 * Master catalog of 200+ countries with accurate Vietnamese names, capitals, and continents
 */
export const WORLD_COUNTRIES_CATALOG: Record<string, WorldCountryInfo> = {
  // === CHÂU Á ===
  afghanistan: { nameVi: 'Afghanistan (Áp-ga-ni-xtan)', nameEn: 'Afghanistan', capitalVi: 'Kabul', continentVi: 'Châu Á', continentId: 'asia', iso2: 'AF', flag: '🇦🇫' },
  armenia: { nameVi: 'Armenia (Ác-mê-ni-a)', nameEn: 'Armenia', capitalVi: 'Yerevan', continentVi: 'Châu Á', continentId: 'asia', iso2: 'AM', flag: '🇦🇲' },
  azerbaijan: { nameVi: 'Azerbaijan (A-déc-bai-gian)', nameEn: 'Azerbaijan', capitalVi: 'Baku', continentVi: 'Châu Á', continentId: 'asia', iso2: 'AZ', flag: '🇦🇿' },
  bahrain: { nameVi: 'Bahrain (Ba-ren)', nameEn: 'Bahrain', capitalVi: 'Manama', continentVi: 'Châu Á', continentId: 'asia', iso2: 'BH', flag: '🇧🇭' },
  bangladesh: { nameVi: 'Bangladesh (Băng-la-đét)', nameEn: 'Bangladesh', capitalVi: 'Dhaka', continentVi: 'Châu Á', continentId: 'asia', iso2: 'BD', flag: '🇧🇩' },
  bhutan: { nameVi: 'Bhutan (Bu-tan)', nameEn: 'Bhutan', capitalVi: 'Thimphu', continentVi: 'Châu Á', continentId: 'asia', iso2: 'BT', flag: '🇧🇹' },
  brunei: { nameVi: 'Brunei (Bru-nây)', nameEn: 'Brunei', capitalVi: 'Bandar Seri Begawan', continentVi: 'Châu Á', continentId: 'asia', iso2: 'BN', flag: '🇧🇳' },
  cambodia: { nameVi: 'Campuchia', nameEn: 'Cambodia', capitalVi: 'Phnom Penh', continentVi: 'Châu Á', continentId: 'asia', iso2: 'KH', flag: '🇰🇭' },
  china: { nameVi: 'Trung Quốc', nameEn: 'China', capitalVi: 'Bắc Kinh (Beijing)', continentVi: 'Châu Á', continentId: 'asia', iso2: 'CN', flag: '🇨🇳' },
  cyprus: { nameVi: 'Síp (Cyprus)', nameEn: 'Cyprus', capitalVi: 'Nicosia', continentVi: 'Châu Á', continentId: 'asia', iso2: 'CY', flag: '🇨🇾' },
  georgia: { nameVi: 'Georgia (Gióc-gi-a)', nameEn: 'Georgia', capitalVi: 'Tbilisi', continentVi: 'Châu Á', continentId: 'asia', iso2: 'GE', flag: '🇬🇪' },
  india: { nameVi: 'Ấn Độ', nameEn: 'India', capitalVi: 'New Delhi', continentVi: 'Châu Á', continentId: 'asia', iso2: 'IN', flag: '🇮🇳' },
  indonesia: { nameVi: 'Indonesia', nameEn: 'Indonesia', capitalVi: 'Jakarta', continentVi: 'Châu Á', continentId: 'asia', iso2: 'ID', flag: '🇮🇩' },
  iran: { nameVi: 'Iran (I-ran)', nameEn: 'Iran', capitalVi: 'Tehran', continentVi: 'Châu Á', continentId: 'asia', iso2: 'IR', flag: '🇮🇷' },
  iraq: { nameVi: 'Iraq (I-rắc)', nameEn: 'Iraq', capitalVi: 'Baghdad', continentVi: 'Châu Á', continentId: 'asia', iso2: 'IQ', flag: '🇮🇶' },
  israel: { nameVi: 'Israel (I-xra-en)', nameEn: 'Israel', capitalVi: 'Jerusalem', continentVi: 'Châu Á', continentId: 'asia', iso2: 'IL', flag: '🇮🇱' },
  japan: { nameVi: 'Nhật Bản', nameEn: 'Japan', capitalVi: 'Tokyo', continentVi: 'Châu Á', continentId: 'asia', iso2: 'JP', flag: '🇯🇵' },
  jordan: { nameVi: 'Jordan (Gióc-đan)', nameEn: 'Jordan', capitalVi: 'Amman', continentVi: 'Châu Á', continentId: 'asia', iso2: 'JO', flag: '🇯🇴' },
  kazakhstan: { nameVi: 'Kazakhstan (Ca-dắc-xtan)', nameEn: 'Kazakhstan', capitalVi: 'Astana', continentVi: 'Châu Á', continentId: 'asia', iso2: 'KZ', flag: '🇰🇿' },
  kuwait: { nameVi: 'Kuwait (Cô-oét)', nameEn: 'Kuwait', capitalVi: 'Kuwait City', continentVi: 'Châu Á', continentId: 'asia', iso2: 'KW', flag: '🇰🇼' },
  kyrgyzstan: { nameVi: 'Kyrgyzstan (Cơ-rơ-gư-xtan)', nameEn: 'Kyrgyzstan', capitalVi: 'Bishkek', continentVi: 'Châu Á', continentId: 'asia', iso2: 'KG', flag: '🇰🇬' },
  laos: { nameVi: 'Lào', nameEn: 'Laos', capitalVi: 'Viêng Chăn (Vientiane)', continentVi: 'Châu Á', continentId: 'asia', iso2: 'LA', flag: '🇱🇦' },
  lebanon: { nameVi: 'Li-băng (Lebanon)', nameEn: 'Lebanon', capitalVi: 'Beirut', continentVi: 'Châu Á', continentId: 'asia', iso2: 'LB', flag: '🇱🇧' },
  malaysia: { nameVi: 'Malaysia', nameEn: 'Malaysia', capitalVi: 'Kuala Lumpur', continentVi: 'Châu Á', continentId: 'asia', iso2: 'MY', flag: '🇲🇾' },
  maldives: { nameVi: 'Maldives (Man-đi-vơ)', nameEn: 'Maldives', capitalVi: 'Malé', continentVi: 'Châu Á', continentId: 'asia', iso2: 'MV', flag: '🇲🇻' },
  mongolia: { nameVi: 'Mông Cổ', nameEn: 'Mongolia', capitalVi: 'Ulaanbaatar', continentVi: 'Châu Á', continentId: 'asia', iso2: 'MN', flag: '🇲🇳' },
  myanmar: { nameVi: 'Myanmar (Mi-an-ma)', nameEn: 'Myanmar', capitalVi: 'Naypyidaw', continentVi: 'Châu Á', continentId: 'asia', iso2: 'MM', flag: '🇲🇲' },
  nepal: { nameVi: 'Nepal (Nê-pan)', nameEn: 'Nepal', capitalVi: 'Kathmandu', continentVi: 'Châu Á', continentId: 'asia', iso2: 'NP', flag: '🇳🇵' },
  north_korea: { nameVi: 'Triều Tiên', nameEn: 'North Korea', capitalVi: 'Bình Nhưỡng (Pyongyang)', continentVi: 'Châu Á', continentId: 'asia', iso2: 'KP', flag: '🇰🇵' },
  oman: { nameVi: 'Oman (Ô-man)', nameEn: 'Oman', capitalVi: 'Muscat', continentVi: 'Châu Á', continentId: 'asia', iso2: 'OM', flag: '🇴🇲' },
  pakistan: { nameVi: 'Pakistan (Pa-ki-xtan)', nameEn: 'Pakistan', capitalVi: 'Islamabad', continentVi: 'Châu Á', continentId: 'asia', iso2: 'PK', flag: '🇵🇰' },
  palestine: { nameVi: 'Palestine (Pa-le-xtin)', nameEn: 'Palestine', capitalVi: 'Ramallah / Đông Jerusalem', continentVi: 'Châu Á', continentId: 'asia', iso2: 'PS', flag: '🇵🇸' },
  philippines: { nameVi: 'Philippines', nameEn: 'Philippines', capitalVi: 'Manila', continentVi: 'Châu Á', continentId: 'asia', iso2: 'PH', flag: '🇵🇭' },
  qatar: { nameVi: 'Qatar (Ca-ta)', nameEn: 'Qatar', capitalVi: 'Doha', continentVi: 'Châu Á', continentId: 'asia', iso2: 'QA', flag: '🇶🇦' },
  saudi_arabia: { nameVi: 'Ả Rập Xê Út', nameEn: 'Saudi Arabia', capitalVi: 'Riyadh', continentVi: 'Châu Á', continentId: 'asia', iso2: 'SA', flag: '🇸🇦' },
  singapore: { nameVi: 'Singapore', nameEn: 'Singapore', capitalVi: 'Singapore', continentVi: 'Châu Á', continentId: 'asia', iso2: 'SG', flag: '🇸🇬' },
  south_korea: { nameVi: 'Hàn Quốc', nameEn: 'South Korea', capitalVi: 'Seoul', continentVi: 'Châu Á', continentId: 'asia', iso2: 'KR', flag: '🇰🇷' },
  sri_lanka: { nameVi: 'Sri Lanka (Xri Lan-ca)', nameEn: 'Sri Lanka', capitalVi: 'Colombo', continentVi: 'Châu Á', continentId: 'asia', iso2: 'LK', flag: '🇱🇰' },
  syria: { nameVi: 'Syria (Xi-ri)', nameEn: 'Syria', capitalVi: 'Damascus', continentVi: 'Châu Á', continentId: 'asia', iso2: 'SY', flag: '🇸🇾' },
  taiwan: { nameVi: 'Đài Loan', nameEn: 'Taiwan', capitalVi: 'Đài Bắc (Taipei)', continentVi: 'Châu Á', continentId: 'asia', iso2: 'TW', flag: '🇹🇼' },
  tajikistan: { nameVi: 'Tajikistan (Ta-gi-ki-xtan)', nameEn: 'Tajikistan', capitalVi: 'Dushanbe', continentVi: 'Châu Á', continentId: 'asia', iso2: 'TJ', flag: '🇹🇯' },
  thailand: { nameVi: 'Thái Lan', nameEn: 'Thailand', capitalVi: 'Bangkok', continentVi: 'Châu Á', continentId: 'asia', iso2: 'TH', flag: '🇹🇭' },
  timor_leste: { nameVi: 'Đông Timor (Timor-Leste)', nameEn: 'Timor-Leste', capitalVi: 'Dili', continentVi: 'Châu Á', continentId: 'asia', iso2: 'TL', flag: '🇹🇱' },
  turkey: { nameVi: 'Thổ Nhĩ Kỳ (Türkiye)', nameEn: 'Turkey', capitalVi: 'Ankara', continentVi: 'Châu Á', continentId: 'asia', iso2: 'TR', flag: '🇹🇷' },
  turkmenistan: { nameVi: 'Turkmenistan (Tuốc-mê-ni-xtan)', nameEn: 'Turkmenistan', capitalVi: 'Ashgabat', continentVi: 'Châu Á', continentId: 'asia', iso2: 'TM', flag: '🇹🇲' },
  uae: { nameVi: 'Các Tiểu Vương quốc Ả Rập Thống nhất (UAE)', nameEn: 'United Arab Emirates', capitalVi: 'Abu Dhabi', continentVi: 'Châu Á', continentId: 'asia', iso2: 'AE', flag: '🇦🇪' },
  uzbekistan: { nameVi: 'Uzbekistan (U-dơ-bê-ki-xtan)', nameEn: 'Uzbekistan', capitalVi: 'Tashkent', continentVi: 'Châu Á', continentId: 'asia', iso2: 'UZ', flag: '🇺🇿' },
  vietnam: { nameVi: 'Việt Nam', nameEn: 'Vietnam', capitalVi: 'Hà Nội', continentVi: 'Châu Á', continentId: 'asia', iso2: 'VN', flag: '🇻🇳' },
  yemen: { nameVi: 'Yemen (Y-ê-men)', nameEn: 'Yemen', capitalVi: 'Sana\'a', continentVi: 'Châu Á', continentId: 'asia', iso2: 'YE', flag: '🇾🇪' },

  // === CHÂU ÂU ===
  albania: { nameVi: 'Albania (An-ba-ni)', nameEn: 'Albania', capitalVi: 'Tirana', continentVi: 'Châu Âu', continentId: 'europe', iso2: 'AL', flag: '🇦🇱' },
  austria: { nameVi: 'Nước Áo (Austria)', nameEn: 'Austria', capitalVi: 'Vienna (Viên)', continentVi: 'Châu Âu', continentId: 'europe', iso2: 'AT', flag: '🇦🇹' },
  belarus: { nameVi: 'Belarus (Bê-la-rút)', nameEn: 'Belarus', capitalVi: 'Minsk', continentVi: 'Châu Âu', continentId: 'europe', iso2: 'BY', flag: '🇧🇾' },
  belgium: { nameVi: 'Nước Bỉ (Belgium)', nameEn: 'Belgium', capitalVi: 'Brussels', continentVi: 'Châu Âu', continentId: 'europe', iso2: 'BE', flag: '🇧🇪' },
  bosnia_and_herzegovina: { nameVi: 'Bosnia & Herzegovina', nameEn: 'Bosnia and Herzegovina', capitalVi: 'Sarajevo', continentVi: 'Châu Âu', continentId: 'europe', iso2: 'BA', flag: '🇧🇦' },
  bulgaria: { nameVi: 'Bulgaria (Bung-ga-ri)', nameEn: 'Bulgaria', capitalVi: 'Sofia', continentVi: 'Châu Âu', continentId: 'europe', iso2: 'BG', flag: '🇧🇬' },
  croatia: { nameVi: 'Croatia (Crô-a-ti-a)', nameEn: 'Croatia', capitalVi: 'Zagreb', continentVi: 'Châu Âu', continentId: 'europe', iso2: 'HR', flag: '🇭🇷' },
  czechia: { nameVi: 'Cộng hòa Séc (Czechia)', nameEn: 'Czech Republic', capitalVi: 'Prague (Pra-ha)', continentVi: 'Châu Âu', continentId: 'europe', iso2: 'CZ', flag: '🇨🇿' },
  denmark: { nameVi: 'Đan Mạch (Denmark)', nameEn: 'Denmark', capitalVi: 'Copenhagen', continentVi: 'Châu Âu', continentId: 'europe', iso2: 'DK', flag: '🇩🇰' },
  estonia: { nameVi: 'Estonia (E-xtô-ni-a)', nameEn: 'Estonia', capitalVi: 'Tallinn', continentVi: 'Châu Âu', continentId: 'europe', iso2: 'EE', flag: '🇪🇪' },
  finland: { nameVi: 'Phần Lan (Finland)', nameEn: 'Finland', capitalVi: 'Helsinki', continentVi: 'Châu Âu', continentId: 'europe', iso2: 'FI', flag: '🇫🇮' },
  france: { nameVi: 'Nước Pháp (France)', nameEn: 'France', capitalVi: 'Paris', continentVi: 'Châu Âu', continentId: 'europe', iso2: 'FR', flag: '🇫🇷' },
  germany: { nameVi: 'Nước Đức (Germany)', nameEn: 'Germany', capitalVi: 'Berlin', continentVi: 'Châu Âu', continentId: 'europe', iso2: 'DE', flag: '🇩🇪' },
  greece: { nameVi: 'Hy Lạp (Greece)', nameEn: 'Greece', capitalVi: 'Athens', continentVi: 'Châu Âu', continentId: 'europe', iso2: 'GR', flag: '🇬🇷' },
  hungary: { nameVi: 'Hungary (Hung-ga-ri)', nameEn: 'Hungary', capitalVi: 'Budapest', continentVi: 'Châu Âu', continentId: 'europe', iso2: 'HU', flag: '🇭🇺' },
  iceland: { nameVi: 'Băng Đảo (Iceland)', nameEn: 'Iceland', capitalVi: 'Reykjavik', continentVi: 'Châu Âu', continentId: 'europe', iso2: 'IS', flag: '🇮🇸' },
  ireland: { nameVi: 'Ai-len (Ireland)', nameEn: 'Ireland', capitalVi: 'Dublin', continentVi: 'Châu Âu', continentId: 'europe', iso2: 'IE', flag: '🇮🇪' },
  italy: { nameVi: 'Nước Ý (Italy)', nameEn: 'Italy', capitalVi: 'Rome', continentVi: 'Châu Âu', continentId: 'europe', iso2: 'IT', flag: '🇮🇹' },
  latvia: { nameVi: 'Latvia (Lát-vi-a)', nameEn: 'Latvia', capitalVi: 'Riga', continentVi: 'Châu Âu', continentId: 'europe', iso2: 'LV', flag: '🇱🇻' },
  lithuania: { nameVi: 'Lithuania (Lít-va)', nameEn: 'Lithuania', capitalVi: 'Vilnius', continentVi: 'Châu Âu', continentId: 'europe', iso2: 'LT', flag: '🇱🇹' },
  luxembourg: { nameVi: 'Luxembourg (Lúc-xăm-bua)', nameEn: 'Luxembourg', capitalVi: 'Luxembourg City', continentVi: 'Châu Âu', continentId: 'europe', iso2: 'LU', flag: '🇱🇺' },
  moldova: { nameVi: 'Moldova (Môn-đô-va)', nameEn: 'Moldova', capitalVi: 'Chisinau', continentVi: 'Châu Âu', continentId: 'europe', iso2: 'MD', flag: '🇲🇩' },
  montenegro: { nameVi: 'Montenegro (Môn-tê-nê-grô)', nameEn: 'Montenegro', capitalVi: 'Podgorica', continentVi: 'Châu Âu', continentId: 'europe', iso2: 'ME', flag: '🇲🇪' },
  netherlands: { nameVi: 'Hà Lan (Netherlands)', nameEn: 'Netherlands', capitalVi: 'Amsterdam', continentVi: 'Châu Âu', continentId: 'europe', iso2: 'NL', flag: '🇳🇱' },
  north_macedonia: { nameVi: 'Bắc Macedonia', nameEn: 'North Macedonia', capitalVi: 'Skopje', continentVi: 'Châu Âu', continentId: 'europe', iso2: 'MK', flag: '🇲🇰' },
  norway: { nameVi: 'Na Uy (Norway)', nameEn: 'Norway', capitalVi: 'Oslo', continentVi: 'Châu Âu', continentId: 'europe', iso2: 'NO', flag: '🇳🇴' },
  poland: { nameVi: 'Ba Lan (Poland)', nameEn: 'Poland', capitalVi: 'Warsaw (Vác-sa-va)', continentVi: 'Châu Âu', continentId: 'europe', iso2: 'PL', flag: '🇵🇱' },
  portugal: { nameVi: 'Bồ Đào Nha (Portugal)', nameEn: 'Portugal', capitalVi: 'Lisbon', continentVi: 'Châu Âu', continentId: 'europe', iso2: 'PT', flag: '🇵🇹' },
  romania: { nameVi: 'Romania (Ru-ma-ni)', nameEn: 'Romania', capitalVi: 'Bucharest', continentVi: 'Châu Âu', continentId: 'europe', iso2: 'RO', flag: '🇷🇴' },
  russia: { nameVi: 'Nước Nga (Russia)', nameEn: 'Russia', capitalVi: 'Moscow (Mát-xcơ-va)', continentVi: 'Châu Âu', continentId: 'europe', iso2: 'RU', flag: '🇷🇺' },
  serbia: { nameVi: 'Serbia (Xéc-bi)', nameEn: 'Serbia', capitalVi: 'Belgrade', continentVi: 'Châu Âu', continentId: 'europe', iso2: 'RS', flag: '🇷🇸' },
  slovakia: { nameVi: 'Slovakia (Xlô-va-ki-a)', nameEn: 'Slovakia', capitalVi: 'Bratislava', continentVi: 'Châu Âu', continentId: 'europe', iso2: 'SK', flag: '🇸🇰' },
  slovenia: { nameVi: 'Slovenia (Xlô-ven-ni-a)', nameEn: 'Slovenia', capitalVi: 'Ljubljana', continentVi: 'Châu Âu', continentId: 'europe', iso2: 'SI', flag: '🇸🇮' },
  spain: { nameVi: 'Tây Ban Nha (Spain)', nameEn: 'Spain', capitalVi: 'Madrid', continentVi: 'Châu Âu', continentId: 'europe', iso2: 'ES', flag: '🇪🇸' },
  sweden: { nameVi: 'Thụy Điển (Sweden)', nameEn: 'Sweden', capitalVi: 'Stockholm', continentVi: 'Châu Âu', continentId: 'europe', iso2: 'SE', flag: '🇸🇪' },
  switzerland: { nameVi: 'Thụy Sĩ (Switzerland)', nameEn: 'Switzerland', capitalVi: 'Bern', continentVi: 'Châu Âu', continentId: 'europe', iso2: 'CH', flag: '🇨🇭' },
  ukraine: { nameVi: 'Ukraine (U-crai-na)', nameEn: 'Ukraine', capitalVi: 'Kyiv', continentVi: 'Châu Âu', continentId: 'europe', iso2: 'UA', flag: '🇺🇦' },
  united_kingdom: { nameVi: 'Vương quốc Anh (UK)', nameEn: 'United Kingdom', capitalVi: 'London', continentVi: 'Châu Âu', continentId: 'europe', iso2: 'GB', flag: '🇬🇧' },
  vatican: { nameVi: 'Tòa thánh Vatican', nameEn: 'Vatican City', capitalVi: 'Vatican', continentVi: 'Châu Âu', continentId: 'europe', iso2: 'VA', flag: '🇻🇦' },

  // === CHÂU PHI ===
  algeria: { nameVi: 'Algeria (An-giê-ri)', nameEn: 'Algeria', capitalVi: 'Algiers', continentVi: 'Châu Phi', continentId: 'africa', iso2: 'DZ', flag: '🇩🇿' },
  angola: { nameVi: 'Angola (Ăng-gô-la)', nameEn: 'Angola', capitalVi: 'Luanda', continentVi: 'Châu Phi', continentId: 'africa', iso2: 'AO', flag: '🇦🇴' },
  benin: { nameVi: 'Benin (Bê-nanh)', nameEn: 'Benin', capitalVi: 'Porto-Novo', continentVi: 'Châu Phi', continentId: 'africa', iso2: 'BJ', flag: '🇧🇯' },
  botswana: { nameVi: 'Botswana (Bốt-xoa-na)', nameEn: 'Botswana', capitalVi: 'Gaborone', continentVi: 'Châu Phi', continentId: 'africa', iso2: 'BW', flag: '🇧🇼' },
  burkina_faso: { nameVi: 'Burkina Faso', nameEn: 'Burkina Faso', capitalVi: 'Ouagadougou', continentVi: 'Châu Phi', continentId: 'africa', iso2: 'BF', flag: '🇧🇫' },
  burundi: { nameVi: 'Burundi (Bu-run-đi)', nameEn: 'Burundi', capitalVi: 'Gitega', continentVi: 'Châu Phi', continentId: 'africa', iso2: 'BI', flag: '🇧🇮' },
  cameroon: { nameVi: 'Cameroon (Ca-mơ-run)', nameEn: 'Cameroon', capitalVi: 'Yaoundé', continentVi: 'Châu Phi', continentId: 'africa', iso2: 'CM', flag: '🇨🇲' },
  cape_verde: { nameVi: 'Cabo Verde (Mũi Xanh)', nameEn: 'Cape Verde', capitalVi: 'Praia', continentVi: 'Châu Phi', continentId: 'africa', iso2: 'CV', flag: '🇨🇻' },
  central_african_republic: { nameVi: 'Cộng hòa Trung Phi', nameEn: 'Central African Republic', capitalVi: 'Bangui', continentVi: 'Châu Phi', continentId: 'africa', iso2: 'CF', flag: '🇨🇫' },
  chad: { nameVi: 'Chad (Sát)', nameEn: 'Chad', capitalVi: 'N\'Djamena', continentVi: 'Châu Phi', continentId: 'africa', iso2: 'TD', flag: '🇹🇩' },
  congo_brazzaville: { nameVi: 'Cộng hòa Congo', nameEn: 'Republic of the Congo', capitalVi: 'Brazzaville', continentVi: 'Châu Phi', continentId: 'africa', iso2: 'CG', flag: '🇨🇬' },
  congo_kinshasa: { nameVi: 'Cộng hòa Dân chủ Congo (DRC)', nameEn: 'Democratic Republic of the Congo', capitalVi: 'Kinshasa', continentVi: 'Châu Phi', continentId: 'africa', iso2: 'CD', flag: '🇨🇩' },
  cote_divoire: { nameVi: 'Bờ Biển Ngà (Côte d\'Ivoire)', nameEn: 'Ivory Coast', capitalVi: 'Yamoussoukro', continentVi: 'Châu Phi', continentId: 'africa', iso2: 'CI', flag: '🇨🇮' },
  djibouti: { nameVi: 'Djibouti (Gi-bu-ti)', nameEn: 'Djibouti', capitalVi: 'Djibouti City', continentVi: 'Châu Phi', continentId: 'africa', iso2: 'DJ', flag: '🇩🇯' },
  egypt: { nameVi: 'Ai Cập (Egypt)', nameEn: 'Egypt', capitalVi: 'Cairo', continentVi: 'Châu Phi', continentId: 'africa', iso2: 'EG', flag: '🇪🇬' },
  equatorial_guinea: { nameVi: 'Guinea Xích Đạo', nameEn: 'Equatorial Guinea', capitalVi: 'Malabo', continentVi: 'Châu Phi', continentId: 'africa', iso2: 'GQ', flag: '🇬🇶' },
  eritrea: { nameVi: 'Eritrea (Ê-ri-tơ-ri-a)', nameEn: 'Eritrea', capitalVi: 'Asmara', continentVi: 'Châu Phi', continentId: 'africa', iso2: 'ER', flag: '🇪🇷' },
  eswatini: { nameVi: 'Eswatini (Xoa-di-len)', nameEn: 'Eswatini', capitalVi: 'Mbabane', continentVi: 'Châu Phi', continentId: 'africa', iso2: 'SZ', flag: '🇸🇿' },
  ethiopia: { nameVi: 'Ethiopia (Ê-ti-ô-pi-a)', nameEn: 'Ethiopia', capitalVi: 'Addis Ababa', continentVi: 'Châu Phi', continentId: 'africa', iso2: 'ET', flag: '🇪🇹' },
  gabon: { nameVi: 'Gabon (Ga-bông)', nameEn: 'Gabon', capitalVi: 'Libreville', continentVi: 'Châu Phi', continentId: 'africa', iso2: 'GA', flag: '🇬🇦' },
  gambia: { nameVi: 'Gambia (Găm-bi-a)', nameEn: 'Gambia', capitalVi: 'Banjul', continentVi: 'Châu Phi', continentId: 'africa', iso2: 'GM', flag: '🇬🇲' },
  ghana: { nameVi: 'Ghana (Gha-na)', nameEn: 'Ghana', capitalVi: 'Accra', continentVi: 'Châu Phi', continentId: 'africa', iso2: 'GH', flag: '🇬🇭' },
  guinea: { nameVi: 'Guinea (Ghi-nê)', nameEn: 'Guinea', capitalVi: 'Conakry', continentVi: 'Châu Phi', continentId: 'africa', iso2: 'GN', flag: '🇬🇳' },
  guinea_bissau: { nameVi: 'Guinea-Bissau', nameEn: 'Guinea-Bissau', capitalVi: 'Bissau', continentVi: 'Châu Phi', continentId: 'africa', iso2: 'GW', flag: '🇬🇼' },
  kenya: { nameVi: 'Kenya (Kê-ni-a)', nameEn: 'Kenya', capitalVi: 'Nairobi', continentVi: 'Châu Phi', continentId: 'africa', iso2: 'KE', flag: '🇰🇪' },
  lesotho: { nameVi: 'Lesotho (Lê-xô-thô)', nameEn: 'Lesotho', capitalVi: 'Maseru', continentVi: 'Châu Phi', continentId: 'africa', iso2: 'LS', flag: '🇱🇸' },
  liberia: { nameVi: 'Liberia (Li-bê-ri-a)', nameEn: 'Liberia', capitalVi: 'Monrovia', continentVi: 'Châu Phi', continentId: 'africa', iso2: 'LR', flag: '🇱🇷' },
  libya: { nameVi: 'Libya (Li-bi)', nameEn: 'Libya', capitalVi: 'Tripoli', continentVi: 'Châu Phi', continentId: 'africa', iso2: 'LY', flag: '🇱🇾' },
  madagascar: { nameVi: 'Madagascar (Ma-đa-gát-xca)', nameEn: 'Madagascar', capitalVi: 'Antananarivo', continentVi: 'Châu Phi', continentId: 'africa', iso2: 'MG', flag: '🇲🇬' },
  malawi: { nameVi: 'Malawi (Ma-la-uy)', nameEn: 'Malawi', capitalVi: 'Lilongwe', continentVi: 'Châu Phi', continentId: 'africa', iso2: 'MW', flag: '🇲🇼' },
  mali: { nameVi: 'Mali (Ma-li)', nameEn: 'Mali', capitalVi: 'Bamako', continentVi: 'Châu Phi', continentId: 'africa', iso2: 'ML', flag: '🇲🇱' },
  mauritania: { nameVi: 'Mauritania (Mô-ri-ta-ni)', nameEn: 'Mauritania', capitalVi: 'Nouakchott', continentVi: 'Châu Phi', continentId: 'africa', iso2: 'MR', flag: '🇲🇷' },
  mauritius: { nameVi: 'Mauritius (Mô-ri-xơ)', nameEn: 'Mauritius', capitalVi: 'Port Louis', continentVi: 'Châu Phi', continentId: 'africa', iso2: 'MU', flag: '🇲🇺' },
  morocco: { nameVi: 'Morocco (Ma-rốc)', nameEn: 'Morocco', capitalVi: 'Rabat', continentVi: 'Châu Phi', continentId: 'africa', iso2: 'MA', flag: '🇲🇦' },
  mozambique: { nameVi: 'Mozambique (Mô-dăm-bích)', nameEn: 'Mozambique', capitalVi: 'Maputo', continentVi: 'Châu Phi', continentId: 'africa', iso2: 'MZ', flag: '🇲🇿' },
  namibia: { nameVi: 'Namibia (Na-mi-bi-a)', nameEn: 'Namibia', capitalVi: 'Windhoek', continentVi: 'Châu Phi', continentId: 'africa', iso2: 'NA', flag: '🇳🇦' },
  niger: { nameVi: 'Niger (Ni-giê)', nameEn: 'Niger', capitalVi: 'Niamey', continentVi: 'Châu Phi', continentId: 'africa', iso2: 'NE', flag: '🇳🇪' },
  nigeria: { nameVi: 'Nigeria (Ni-giê-ri-a)', nameEn: 'Nigeria', capitalVi: 'Abuja', continentVi: 'Châu Phi', continentId: 'africa', iso2: 'NG', flag: '🇳🇬' },
  rwanda: { nameVi: 'Rwanda (Ru-an-đa)', nameEn: 'Rwanda', capitalVi: 'Kigali', continentVi: 'Châu Phi', continentId: 'africa', iso2: 'RW', flag: '🇷🇼' },
  senegal: { nameVi: 'Senegal (Xê-nê-gan)', nameEn: 'Senegal', capitalVi: 'Dakar', continentVi: 'Châu Phi', continentId: 'africa', iso2: 'SN', flag: '🇸🇳' },
  sierra_leone: { nameVi: 'Sierra Leone (Xi-ê-ra Lê-ôn)', nameEn: 'Sierra Leone', capitalVi: 'Freetown', continentVi: 'Châu Phi', continentId: 'africa', iso2: 'SL', flag: '🇸🇱' },
  somalia: { nameVi: 'Somalia (Xô-ma-li)', nameEn: 'Somalia', capitalVi: 'Mogadishu', continentVi: 'Châu Phi', continentId: 'africa', iso2: 'SO', flag: '🇸🇴' },
  south_africa: { nameVi: 'Nam Phi (South Africa)', nameEn: 'South Africa', capitalVi: 'Pretoria / Cape Town', continentVi: 'Châu Phi', continentId: 'africa', iso2: 'ZA', flag: '🇿🇦' },
  south_sudan: { nameVi: 'Nam Sudan (South Sudan)', nameEn: 'South Sudan', capitalVi: 'Juba', continentVi: 'Châu Phi', continentId: 'africa', iso2: 'SS', flag: '🇸🇸' },
  sudan: { nameVi: 'Sudan (Xu-đăng)', nameEn: 'Sudan', capitalVi: 'Khartoum', continentVi: 'Châu Phi', continentId: 'africa', iso2: 'SD', flag: '🇸🇩' },
  tanzania: { nameVi: 'Tanzania (Tan-da-ni-a)', nameEn: 'Tanzania', capitalVi: 'Dodoma', continentVi: 'Châu Phi', continentId: 'africa', iso2: 'TZ', flag: '🇹🇿' },
  togo: { nameVi: 'Togo (Tô-gô)', nameEn: 'Togo', capitalVi: 'Lomé', continentVi: 'Châu Phi', continentId: 'africa', iso2: 'TG', flag: '🇹🇬' },
  tunisia: { nameVi: 'Tunisia (Tuy-ni-di)', nameEn: 'Tunisia', capitalVi: 'Tunis', continentVi: 'Châu Phi', continentId: 'africa', iso2: 'TN', flag: '🇹🇳' },
  uganda: { nameVi: 'Uganda (U-gan-đa)', nameEn: 'Uganda', capitalVi: 'Kampala', continentVi: 'Châu Phi', continentId: 'africa', iso2: 'UG', flag: '🇺🇬' },
  zambia: { nameVi: 'Zambia (Dăm-bi-a)', nameEn: 'Zambia', capitalVi: 'Lusaka', continentVi: 'Châu Phi', continentId: 'africa', iso2: 'ZM', flag: '🇿🇲' },
  zimbabwe: { nameVi: 'Zimbabwe (Dim-ba-bu-ê)', nameEn: 'Zimbabwe', capitalVi: 'Harare', continentVi: 'Châu Phi', continentId: 'africa', iso2: 'ZW', flag: '🇿🇼' },

  // === BẮC MỸ ===
  bahamas: { nameVi: 'Bahamas (Ba-ha-ma)', nameEn: 'Bahamas', capitalVi: 'Nassau', continentVi: 'Bắc Mỹ', continentId: 'north_america', iso2: 'BS', flag: '🇧🇸' },
  belize: { nameVi: 'Belize (Bê-li-xê)', nameEn: 'Belize', capitalVi: 'Belmopan', continentVi: 'Bắc Mỹ', continentId: 'north_america', iso2: 'BZ', flag: '🇧🇿' },
  canada: { nameVi: 'Canada (Ca-na-đa)', nameEn: 'Canada', capitalVi: 'Ottawa', continentVi: 'Bắc Mỹ', continentId: 'north_america', iso2: 'CA', flag: '🇨🇦' },
  costa_rica: { nameVi: 'Costa Rica (Cốt-xta Ri-ca)', nameEn: 'Costa Rica', capitalVi: 'San José', continentVi: 'Bắc Mỹ', continentId: 'north_america', iso2: 'CR', flag: '🇨🇷' },
  cuba: { nameVi: 'Cuba (Cu-ba)', nameEn: 'Cuba', capitalVi: 'La Habana (Havana)', continentVi: 'Bắc Mỹ', continentId: 'north_america', iso2: 'CU', flag: '🇨🇺' },
  dominican_republic: { nameVi: 'Cộng hòa Dominica', nameEn: 'Dominican Republic', capitalVi: 'Santo Domingo', continentVi: 'Bắc Mỹ', continentId: 'north_america', iso2: 'DO', flag: '🇩🇴' },
  el_salvador: { nameVi: 'El Salvador (En Xan-va-đo)', nameEn: 'El Salvador', capitalVi: 'San Salvador', continentVi: 'Bắc Mỹ', continentId: 'north_america', iso2: 'SV', flag: '🇸🇻' },
  greenland: { nameVi: 'Đảo Greenland (Grơn-len)', nameEn: 'Greenland', capitalVi: 'Nuuk', continentVi: 'Bắc Mỹ', continentId: 'north_america', iso2: 'GL', flag: '🇬🇱' },
  guatemala: { nameVi: 'Guatemala (Goa-tê-ma-la)', nameEn: 'Guatemala', capitalVi: 'Guatemala City', continentVi: 'Bắc Mỹ', continentId: 'north_america', iso2: 'GT', flag: '🇬🇹' },
  haiti: { nameVi: 'Haiti (Ha-i-ti)', nameEn: 'Haiti', capitalVi: 'Port-au-Prince', continentVi: 'Bắc Mỹ', continentId: 'north_america', iso2: 'HT', flag: '🇭🇹' },
  honduras: { nameVi: 'Honduras (Hôn-đu-rát)', nameEn: 'Honduras', capitalVi: 'Tegucigalpa', continentVi: 'Bắc Mỹ', continentId: 'north_america', iso2: 'HN', flag: '🇭🇳' },
  jamaica: { nameVi: 'Jamaica (Gia-mai-ca)', nameEn: 'Jamaica', capitalVi: 'Kingston', continentVi: 'Bắc Mỹ', continentId: 'north_america', iso2: 'JM', flag: '🇯🇲' },
  mexico: { nameVi: 'Mexico (Mê-hi-cô)', nameEn: 'Mexico', capitalVi: 'Mexico City', continentVi: 'Bắc Mỹ', continentId: 'north_america', iso2: 'MX', flag: '🇲🇽' },
  nicaragua: { nameVi: 'Nicaragua (Ni-ca-ra-goa)', nameEn: 'Nicaragua', capitalVi: 'Managua', continentVi: 'Bắc Mỹ', continentId: 'north_america', iso2: 'NI', flag: '🇳🇮' },
  panama: { nameVi: 'Panama (Pa-na-ma)', nameEn: 'Panama', capitalVi: 'Panama City', continentVi: 'Bắc Mỹ', continentId: 'north_america', iso2: 'PA', flag: '🇵🇦' },
  puerto_rico: { nameVi: 'Puerto Rico', nameEn: 'Puerto Rico', capitalVi: 'San Juan', continentVi: 'Bắc Mỹ', continentId: 'north_america', iso2: 'PR', flag: '🇵🇷' },
  trinidad_and_tobago: { nameVi: 'Trinidad & Tobago', nameEn: 'Trinidad and Tobago', capitalVi: 'Port of Spain', continentVi: 'Bắc Mỹ', continentId: 'north_america', iso2: 'TT', flag: '🇹🇹' },
  united_states: { nameVi: 'Hoa Kỳ (Mỹ / USA)', nameEn: 'United States', capitalVi: 'Washington D.C.', continentVi: 'Bắc Mỹ', continentId: 'north_america', iso2: 'US', flag: '🇺🇸' },

  // === NAM MỸ ===
  argentina: { nameVi: 'Argentina (Ác-hen-ti-na)', nameEn: 'Argentina', capitalVi: 'Buenos Aires', continentVi: 'Nam Mỹ', continentId: 'south_america', iso2: 'AR', flag: '🇦🇷' },
  bolivia: { nameVi: 'Bolivia (Bô-li-vi-a)', nameEn: 'Bolivia', capitalVi: 'Sucre / La Paz', continentVi: 'Nam Mỹ', continentId: 'south_america', iso2: 'BO', flag: '🇧🇴' },
  brazil: { nameVi: 'Brazil (Bra-xin)', nameEn: 'Brazil', capitalVi: 'Brasília', continentVi: 'Nam Mỹ', continentId: 'south_america', iso2: 'BR', flag: '🇧🇷' },
  chile: { nameVi: 'Chile (Chi-lê)', nameEn: 'Chile', capitalVi: 'Santiago', continentVi: 'Nam Mỹ', continentId: 'south_america', iso2: 'CL', flag: '🇨🇱' },
  colombia: { nameVi: 'Colombia (Cô-lôm-bi-a)', nameEn: 'Colombia', capitalVi: 'Bogotá', continentVi: 'Nam Mỹ', continentId: 'south_america', iso2: 'CO', flag: '🇨🇴' },
  ecuador: { nameVi: 'Ecuador (Ê-cu-a-đo)', nameEn: 'Ecuador', capitalVi: 'Quito', continentVi: 'Nam Mỹ', continentId: 'south_america', iso2: 'EC', flag: '🇪🇨' },
  guyana: { nameVi: 'Guyana (Gai-a-na)', nameEn: 'Guyana', capitalVi: 'Georgetown', continentVi: 'Nam Mỹ', continentId: 'south_america', iso2: 'GY', flag: '🇬🇾' },
  paraguay: { nameVi: 'Paraguay (Pa-ra-goay)', nameEn: 'Paraguay', capitalVi: 'Asunción', continentVi: 'Nam Mỹ', continentId: 'south_america', iso2: 'PY', flag: '🇵🇾' },
  peru: { nameVi: 'Peru (Pê-ru)', nameEn: 'Peru', capitalVi: 'Lima', continentVi: 'Nam Mỹ', continentId: 'south_america', iso2: 'PE', flag: '🇵🇪' },
  suriname: { nameVi: 'Suriname (Xu-ri-nam)', nameEn: 'Suriname', capitalVi: 'Paramaribo', continentVi: 'Nam Mỹ', continentId: 'south_america', iso2: 'SR', flag: '🇸🇷' },
  uruguay: { nameVi: 'Uruguay (U-ru-goay)', nameEn: 'Uruguay', capitalVi: 'Montevideo', continentVi: 'Nam Mỹ', continentId: 'south_america', iso2: 'UY', flag: '🇺🇾' },
  venezuela: { nameVi: 'Venezuela (Vê-nê-duê-la)', nameEn: 'Venezuela', capitalVi: 'Caracas', continentVi: 'Nam Mỹ', continentId: 'south_america', iso2: 'VE', flag: '🇻🇪' },

  // === CHÂU ĐẠI DƯƠNG ===
  australia: { nameVi: 'Australia (Nước Úc)', nameEn: 'Australia', capitalVi: 'Canberra', continentVi: 'Châu Đại Dương', continentId: 'oceania', iso2: 'AU', flag: '🇦🇺' },
  fiji: { nameVi: 'Fiji (Phi-gi)', nameEn: 'Fiji', capitalVi: 'Suva', continentVi: 'Châu Đại Dương', continentId: 'oceania', iso2: 'FJ', flag: '🇫🇯' },
  new_zealand: { nameVi: 'New Zealand (Niu Di-lân)', nameEn: 'New Zealand', capitalVi: 'Wellington', continentVi: 'Châu Đại Dương', continentId: 'oceania', iso2: 'NZ', flag: '🇳🇿' },
  papua_new_guinea: { nameVi: 'Papua New Guinea', nameEn: 'Papua New Guinea', capitalVi: 'Port Moresby', continentVi: 'Châu Đại Dương', continentId: 'oceania', iso2: 'PG', flag: '🇵🇬' },
  solomon_islands: { nameVi: 'Quần đảo Solomon', nameEn: 'Solomon Islands', capitalVi: 'Honiara', continentVi: 'Châu Đại Dương', continentId: 'oceania', iso2: 'SB', flag: '🇸🇧' },
  vanuatu: { nameVi: 'Vanuatu (Va-nu-a-tu)', nameEn: 'Vanuatu', capitalVi: 'Port Vila', continentVi: 'Châu Đại Dương', continentId: 'oceania', iso2: 'VU', flag: '🇻🇺' },
  samoa: { nameVi: 'Samoa (Xa-moa)', nameEn: 'Samoa', capitalVi: 'Apia', continentVi: 'Châu Đại Dương', continentId: 'oceania', iso2: 'WS', flag: '🇼🇸' },
  antarctica: { nameVi: 'Châu Nam Cực (Antarctica)', nameEn: 'Antarctica', capitalVi: 'Trạm nghiên cứu Quốc tế', continentVi: 'Châu Nam Cực', continentId: 'antarctica', iso2: 'AQ', flag: '🇦🇶' }
};

/**
 * Resolves a natural earth or external GeoFeature into a clean country id key
 */
export function resolveCountryKey(input: string): string | undefined {
  if (!input || typeof input !== 'string') return undefined;
  const raw = input.trim();
  if (!raw || raw === '-99') return undefined;

  const lower = raw.toLowerCase();
  const normalized = normalizeGeoString(raw);

  // 1. Direct ID in COUNTRIES_DATA
  if (COUNTRIES_DATA[lower]) return lower;
  if (COUNTRIES_DATA[normalized]) return normalized;

  // 2. Direct match in COUNTRY_ALIASES
  if (COUNTRY_ALIASES[lower]) return COUNTRY_ALIASES[lower];
  if (COUNTRY_ALIASES[normalized]) return COUNTRY_ALIASES[normalized];

  // 3. Catalog match
  if (WORLD_COUNTRIES_CATALOG[lower]) return lower;
  if (WORLD_COUNTRIES_CATALOG[normalized]) return normalized;

  // 4. Clean abbreviations
  let cleaned = normalized
    .replace(/\bdem rep\b/g, 'democratic republic')
    .replace(/\brep\b/g, 'republic')
    .replace(/\bis\b/g, 'islands')
    .replace(/\bisl\b/g, 'islands')
    .replace(/\bst\b/g, 'saint')
    .replace(/\bs\b/g, 'south')
    .replace(/\bn\b/g, 'north')
    .replace(/\beq\b/g, 'equatorial')
    .replace(/\bherz\b/g, 'herzegovina')
    .replace(/\bcentral african rep\b/g, 'central african republic')
    .replace(/\s+/g, ' ')
    .trim();

  if (COUNTRY_ALIASES[cleaned]) return COUNTRY_ALIASES[cleaned];
  if (WORLD_COUNTRIES_CATALOG[cleaned]) return cleaned;

  // 5. Check if matches key in catalog
  for (const [catKey, catInfo] of Object.entries(WORLD_COUNTRIES_CATALOG)) {
    if (
      normalizeGeoString(catInfo.nameEn) === cleaned ||
      normalizeGeoString(catInfo.nameVi) === cleaned ||
      normalizeGeoString(catInfo.nameEn) === normalized ||
      normalizeGeoString(catInfo.nameVi) === normalized ||
      catInfo.iso2.toLowerCase() === lower
    ) {
      return catKey;
    }
  }

  return undefined;
}

/**
 * Finds country in database by code, ISO name or Vietnamese name
 */
export function matchCountryData(idOrName: string): CountryData | undefined {
  if (!idOrName || typeof idOrName !== 'string') return undefined;
  const raw = idOrName.trim();
  if (!raw || raw === '-99') return undefined;

  const key = resolveCountryKey(raw);
  if (key && COUNTRIES_DATA[key]) {
    return COUNTRIES_DATA[key];
  }

  // Exact comparison across registered countries
  const norm = normalizeGeoString(raw);
  const lower = raw.toLowerCase();
  for (const country of Object.values(COUNTRIES_DATA)) {
    if (
      country.id.toLowerCase() === lower ||
      country.code.toLowerCase() === lower ||
      normalizeGeoString(country.nameVi) === norm ||
      normalizeGeoString(country.nameEn) === norm ||
      country.nameVi.toLowerCase() === lower ||
      country.nameEn.toLowerCase() === lower
    ) {
      return country;
    }
  }

  // Check catalog for key match or name match
  if (key && WORLD_COUNTRIES_CATALOG[key]) {
    return createDynamicCountryFromFeature(key);
  }

  for (const [catKey, catInfo] of Object.entries(WORLD_COUNTRIES_CATALOG)) {
    if (
      catKey.toLowerCase() === lower ||
      catInfo.iso2.toLowerCase() === lower ||
      normalizeGeoString(catInfo.nameVi) === norm ||
      normalizeGeoString(catInfo.nameEn) === norm ||
      catInfo.nameVi.toLowerCase() === lower ||
      catInfo.nameEn.toLowerCase() === lower
    ) {
      return createDynamicCountryFromFeature(catKey);
    }
  }

  return undefined;
}

/**
 * Generates an educational CountryData object for any polygon feature on the globe
 */
export function createDynamicCountryFromFeature(
  nameStr: string,
  iso2?: string,
  iso3?: string,
  continent?: string,
  centerLat?: number,
  centerLng?: number
): CountryData {
  const norm = normalizeGeoString(nameStr || '');
  const key = resolveCountryKey(nameStr) || resolveCountryKey(iso3 || '') || resolveCountryKey(iso2 || '') || norm.replace(/\s+/g, '_').slice(0, 30);
  
  // Check if catalog has detailed info
  const cat = WORLD_COUNTRIES_CATALOG[key];

  const code = (iso2 && iso2 !== '-99' ? iso2 : (cat ? cat.iso2 : (iso3 || 'UN'))).toUpperCase();
  const flag = cat ? cat.flag : getCountryFlagEmoji(code);
  const nameVi = cat ? cat.nameVi : (nameStr || 'Quốc gia trên Trái Đất');
  const nameEn = cat ? cat.nameEn : (nameStr || 'Country');
  const capital = cat ? cat.capitalVi : 'Đang cập nhật';

  let continentNameVi = cat ? cat.continentVi : 'Châu lục trên Trái Đất';
  let continentId: CountryData['continentId'] = cat ? cat.continentId : 'asia';

  if (!cat) {
    const contLower = (continent || '').toLowerCase();
    if (contLower.includes('europe') || contLower.includes('âu')) {
      continentId = 'europe';
      continentNameVi = 'Châu Âu';
    } else if (contLower.includes('africa') || contLower.includes('phi')) {
      continentId = 'africa';
      continentNameVi = 'Châu Phi';
    } else if (contLower.includes('north america') || contLower.includes('bắc mỹ')) {
      continentId = 'north_america';
      continentNameVi = 'Bắc Mỹ';
    } else if (contLower.includes('south america') || contLower.includes('nam mỹ')) {
      continentId = 'south_america';
      continentNameVi = 'Nam Mỹ';
    } else if (contLower.includes('oceania') || contLower.includes('đại dương') || contLower.includes('australia')) {
      continentId = 'oceania';
      continentNameVi = 'Châu Đại Dương';
    } else if (contLower.includes('antarctica') || contLower.includes('nam cực')) {
      continentId = 'antarctica';
      continentNameVi = 'Châu Nam Cực';
    } else {
      continentId = 'asia';
      continentNameVi = 'Châu Á';
    }
  }

  return {
    ...DEFAULT_COUNTRY_DATA,
    id: key,
    code,
    nameEn,
    nameVi,
    flag,
    capital,
    continent: continentNameVi,
    continentId,
    lat: centerLat ?? 0,
    lng: centerLng ?? 0,
    population: 'Đang cập nhật',
    populationNum: 0,
    area: 'Đang cập nhật',
    areaNum: 0,
    language: 'Đang cập nhật',
    climate: 'Đang cập nhật',
    currency: 'Đang cập nhật',
    shortDescription: 'Thông tin chi tiết về quốc gia này đang được cập nhật.',
    natureHighlights: ['Thông tin chi tiết về quốc gia này đang được cập nhật.'],
    cultureHighlights: ['Thông tin chi tiết về quốc gia này đang được cập nhật.'],
    foodHighlights: ['Thông tin chi tiết về quốc gia này đang được cập nhật.'],
    funFacts: ['Thông tin chi tiết về quốc gia này đang được cập nhật.'],
    landmarks: []
  };
}
