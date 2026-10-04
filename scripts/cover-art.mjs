const TEAMS = {
  colts: "#002c5f",
  commanders: "#5a1414",
  cowboys: "#041e42",
  texans: "#a71930",
  rams: "#003594",
  eagles: "#004c54",
  patriots: "#002244",
  bills: "#c60c30",
  padres: "#2f241d",
  brewers: "#12284b",
  yankees: "#0c2340",
  rays: "#092c5c",
  dodgers: "#005a9c",
  clemson: "#f56600",
  miami: "#005030",
  lsu: "#461d7c",
  mcneese: "#00573f",
  florida: "#0021a5",
  missouri: "#f1b82d",
  iowa: "#ffcd00",
  packers: "#203731",
  buccaneers: "#a71930",
  "texas tech": "#cc0000",
  colorado: "#cfb87c",
  arkansas: "#9d2235",
  "texas a": "#500000",
  indiana: "#990000",
  rutgers: "#cc0033",
  kentucky: "#0033a0",
  "south carolina": "#73000a",
  washington: "#4b2e83",
  usc: "#990000",
  byu: "#002e5d",
  tcu: "#4d1979",
  argentina: "#74acdf",
  mexico: "#006847",
  spain: "#c60b1e",
  czechia: "#11457e",
  "burkina faso": "#009e49",
};

function hash(text) {
  let value = 2166136261;
  for (const char of text) {
    value ^= char.charCodeAt(0);
    value = Math.imul(value, 16777619);
  }
  return value >>> 0;
}

function pick(seed, list) {
  return list[(seed >>> 0) % list.length];
}

function teamColor(name, fallback) {
  const key = Object.keys(TEAMS).find((team) => name.includes(team));
  return key ? TEAMS[key] : fallback;
}

function sceneKind(post) {
  const blob = `${post.query} ${post.headline}`.toLowerCase();
  if (/stab|fight with|attack/.test(blob)) return "stage";
  if (/padres|brewers|yankees|rays|dodgers|baseball|inning|alds|nlds/.test(blob)) return "baseball";
  if (/argentina|mexico|méxico|spain|czechia|burkina|sullivan|soccer|futbol/.test(blob)) return "soccer";
  if (/hockey|puck|overtime goal/.test(blob)) return "hockey";
  if (/basketball|wnba|nba/.test(blob)) return "basketball";
  if (
    /colts|commanders|cowboys|texans|rams|eagles|patriots|bills|clemson|miami|lsu|mcneese|florida|missouri|iowa|packers|buccaneers|texas tech|colorado|arkansas|rutgers|indiana|kentucky|carolina|washington|usc|byu|tcu|football|nfl/.test(
      blob,
    )
  ) {
    return "football";
  }
  return "desk";
}

function footballVariant(post) {
  const blob = `${post.query} ${post.headline}`.toLowerCase();
  if (/out as|injury|questionable|ruled out|knee/.test(blob)) return "bench";
  if (/blowout|beatdown|blitz|ground game|rush/.test(blob)) return "tracks";
  if (/comeback|late|stop|ekes|win over/.test(blob)) return "line";
  return "helmets";
}

function sides(query) {
  const parts = query.toLowerCase().split(/\s+vs\.?\s+|\s+-\s+/);
  return [parts[0] ?? query, parts[1] ?? ""];
}

function sky(seed, left, right) {
  return `
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${pick(seed, ["#141820", "#1b2430", "#10141c", "#241810"])}"/>
        <stop offset="1" stop-color="${pick(seed >> 3, ["#2a3340", "#101820", "#3a2418"])}"/>
      </linearGradient>
      <radialGradient id="glow" cx="70%" cy="18%" r="40%">
        <stop offset="0" stop-color="${right}" stop-opacity="0.55"/>
        <stop offset="1" stop-color="${right}" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="1280" height="720" fill="url(#sky)"/>
    <rect width="1280" height="720" fill="url(#glow)"/>
    <g fill="${left}" opacity="0.9">
      <path d="M0 250 C 200 180, 420 320, 640 240 C 860 160, 1080 300, 1280 210 L 1280 720 L 0 720 Z"/>
    </g>`;
}

function lights(seed) {
  const spots = [180, 420, 860, 1100];
  return spots
    .map((x, index) => {
      const on = (seed >> index) & 1;
      return `<g opacity="${on ? 0.9 : 0.35}">
        <rect x="${x}" y="78" width="46" height="18" rx="3" fill="#d7dde8"/>
        <polygon points="${x},96 ${x + 46},96 ${x - 30},250 ${x + 76},250" fill="#fff4d2" opacity="0.16"/>
      </g>`;
    })
    .join("");
}

function frame(inner) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
<defs>
  <filter id="grain">
    <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2"/>
    <feColorMatrix type="saturate" values="0"/>
    <feComponentTransfer><feFuncA type="linear" slope="0.18"/></feComponentTransfer>
  </filter>
</defs>
${inner}
<rect width="1280" height="720" filter="url(#grain)"/>
</svg>`;
}

function football(post) {
  const seed = hash(post.slug);
  const [home, away] = sides(post.query);
  const left = teamColor(home, pick(seed, ["#123055", "#5a1414", "#0e3b2e", "#3a2418"]));
  const right = teamColor(away, pick(seed >> 4, ["#c4552a", "#d7a441", "#7d1d3f", "#1d4e89"]));
  const variant = footballVariant(post);
  const bowl = `${sky(seed, "#0c1218", right)}
    ${lights(seed)}
    <ellipse cx="640" cy="560" rx="520" ry="90" fill="#1d3d28"/>
    <ellipse cx="640" cy="545" rx="430" ry="62" fill="#245236"/>`;

  if (variant === "bench") {
    return frame(`${bowl}
      <rect x="180" y="470" width="920" height="36" rx="6" fill="#2a2118"/>
      <g transform="translate(430 390)">
        <ellipse cx="70" cy="78" rx="78" ry="28" fill="#000" opacity="0.25"/>
        <path d="M20 70 Q70 10 120 70 L110 92 Q70 40 30 92 Z" fill="${left}"/>
        <path d="M38 62 Q70 28 102 62" fill="none" stroke="#111" stroke-width="8"/>
      </g>`);
  }

  if (variant === "tracks") {
    return frame(`${bowl}
      <path d="M250 620 C 400 540, 560 560, 760 470 C 900 410, 1040 430, 1160 360" fill="none" stroke="#c4a574" stroke-width="18" stroke-linecap="round" opacity="0.8"/>
      <ellipse cx="1160" cy="360" rx="34" ry="16" fill="${right}"/>`);
  }

  if (variant === "line") {
    return frame(`${bowl}
      <rect x="160" y="500" width="960" height="10" fill="#f4f1ea"/>
      <g transform="translate(760 430) rotate(-18)">
        <ellipse cx="0" cy="0" rx="54" ry="32" fill="#6b3a22"/>
        <path d="M-30 0 H30" stroke="#f4f1ea" stroke-width="4"/>
      </g>`);
  }

  return frame(`${bowl}
    <g transform="translate(390 400)">
      <ellipse cx="70" cy="90" rx="80" ry="26" fill="#000" opacity="0.28"/>
      <path d="M16 78 Q70 8 124 78 L112 104 Q70 36 28 104 Z" fill="${left}"/>
      <path d="M34 66 Q70 28 106 66" fill="none" stroke="#111" stroke-width="10"/>
    </g>
    <g transform="translate(760 400)">
      <ellipse cx="70" cy="90" rx="80" ry="26" fill="#000" opacity="0.28"/>
      <path d="M16 78 Q70 8 124 78 L112 104 Q70 36 28 104 Z" fill="${right}"/>
      <path d="M34 66 Q70 28 106 66" fill="none" stroke="#111" stroke-width="10"/>
    </g>`);
}

function baseball(post) {
  const seed = hash(post.slug);
  const blob = `${post.query} ${post.headline}`.toLowerCase();
  const roof = /roof/.test(blob);
  const quiet = /shut|perfect|escape/.test(blob);
  const [home, away] = sides(post.query);
  const left = teamColor(home, "#12284b");
  const right = teamColor(away, "#c4552a");
  return frame(`${sky(seed, left, right)}
    ${roof ? `<path d="M80 180 H1200 L1100 250 H180 Z" fill="#1a1e24" opacity="0.85"/>` : lights(seed)}
    <path d="M220 620 L640 430 L1060 620 Z" fill="#1f6b3a"/>
    <path d="M220 620 L640 430 L1060 620 Z" fill="none" stroke="#f4f1ea" stroke-width="4"/>
    <circle cx="${quiet ? 640 : 760}" cy="${quiet ? 500 : 470}" r="16" fill="#f4f1ea"/>
    <rect x="600" y="560" width="80" height="14" fill="#f4f1ea"/>`);
}

function soccer(post) {
  const seed = hash(post.slug);
  const blob = `${post.query} ${post.headline}`.toLowerCase();
  const many = /thrash|seven|7 |blow|score/.test(blob);
  const [home, away] = sides(post.query);
  const left = teamColor(home, "#0e3b2e");
  const right = teamColor(away, "#c60b1e");
  const balls = many
    ? `<circle cx="860" cy="470" r="22" fill="#f4f1ea"/><circle cx="910" cy="500" r="22" fill="#f4f1ea"/><circle cx="820" cy="505" r="22" fill="#f4f1ea"/>`
    : `<circle cx="760" cy="500" r="28" fill="#f4f1ea"/><path d="M760 476 L748 492 H772 Z" fill="#222"/>`;
  return frame(`${sky(seed, left, right)}
    ${lights(seed)}
    <rect x="0" y="540" width="1280" height="180" fill="#1c6b38"/>
    <rect x="250" y="300" width="14" height="250" fill="#f4f1ea"/>
    <rect x="980" y="300" width="14" height="250" fill="#f4f1ea"/>
    <path d="M264 314 H966 V536 H264 Z" fill="none" stroke="#f4f1ea" stroke-width="6"/>
    ${balls}`);
}

function stage() {
  return frame(`
    <rect width="1280" height="720" fill="#14080c"/>
    <rect x="0" y="0" width="180" height="720" fill="#6e1420"/>
    <rect x="1100" y="0" width="180" height="720" fill="#6e1420"/>
    <ellipse cx="640" cy="250" rx="220" ry="40" fill="#f2d48a" opacity="0.25"/>
    <rect x="600" y="300" width="16" height="220" fill="#222"/>
    <circle cx="608" cy="292" r="28" fill="#2a2a2a"/>
    <rect x="430" y="520" width="420" height="18" fill="#3a2418"/>`);
}

function hockey(post) {
  const seed = hash(post.slug);
  return frame(`${sky(seed, "#0e1a24", "#c4552a")}
    <rect x="0" y="430" width="1280" height="290" fill="#d5e4ee"/>
    <rect x="860" y="300" width="180" height="130" fill="none" stroke="#b9c4ce" stroke-width="8"/>
    <path d="M868 308 H1032 V422 H868 Z" fill="none" stroke="#f4f1ea" stroke-width="3"/>
    <circle cx="620" cy="520" r="18" fill="#161616"/>`);
}

function basketball(post) {
  const seed = hash(post.slug);
  return frame(`${sky(seed, "#241018", "#7d1d3f")}
    <rect x="0" y="460" width="1280" height="260" fill="#8a4b2a"/>
    <rect x="860" y="150" width="18" height="220" fill="#d7dde8"/>
    <rect x="760" y="150" width="220" height="12" fill="#d7dde8"/>
    <path d="M800 162 Q870 230 940 162" fill="none" stroke="#f4f1ea" stroke-width="4"/>
    <circle cx="870" cy="210" r="26" fill="#c4552a"/>`);
}

function desk(post) {
  const seed = hash(post.slug);
  const wood = pick(seed, ["#3a2418", "#2a2118", "#1d2430"]);
  return frame(`
    <rect width="1280" height="720" fill="#12151b"/>
    <rect x="0" y="420" width="1280" height="300" fill="${wood}"/>
    <rect x="160" y="180" width="420" height="250" fill="#1a1e24"/>
    <circle cx="860" cy="250" r="70" fill="#e7c27a" opacity="0.85"/>
    <rect x="848" y="320" width="24" height="120" fill="#222"/>`);
}

export function paintCover(post) {
  const kind = sceneKind(post);
  if (kind === "baseball") return baseball(post);
  if (kind === "soccer") return soccer(post);
  if (kind === "stage") return stage();
  if (kind === "football") return football(post);
  if (kind === "hockey") return hockey(post);
  if (kind === "basketball") return basketball(post);
  return desk(post);
}
