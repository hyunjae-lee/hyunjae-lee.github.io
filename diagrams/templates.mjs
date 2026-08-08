/**
 * Diagram layout. Text comes from `strings.mjs` — never hard-code copy here.
 *
 * Both diagrams are drawn on a fixed pixel canvas: boxes are absolutely
 * positioned HTML, connectors are one SVG overlay. That keeps the Korean and
 * English renders pixel-identical in structure even when the text lengths differ.
 */

const C = {
  ink: '#18181b',
  muted: '#71717a',
  faint: '#a1a1aa',
  rule: '#e4e4e7',
  line: '#3f3f46',

  teal: '#0d7a63',
  tealBg: '#e9f6f1',
  tealBd: '#86ccb4',

  amber: '#b45f13',
  amberBg: '#fdf3e7',
  amberBd: '#dda75f',

  blue: '#24457a',
  blueBg: '#eaf0fa',
  blueBd: '#a9bddd',

  violet: '#5b3ea8',
  violetBg: '#f1edfb',
  violetBd: '#bcaae7',

  gray: '#3f3f46',
  grayBg: '#f4f4f5',
  grayBd: '#d4d4d8',
};

const TONE = {
  teal: [C.teal, C.tealBg, C.tealBd],
  amber: [C.amber, C.amberBg, C.amberBd],
  blue: [C.blue, C.blueBg, C.blueBd],
  violet: [C.violet, C.violetBg, C.violetBd],
  gray: [C.gray, C.grayBg, C.grayBd],
};

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Shared page chrome + typography. */
function shell({ w, h, body, svg }) {
  return `<!doctype html>
<meta charset="utf-8">
<style>
  @page { size: ${w}px ${h}px; margin: 0; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { background: #fff; }
  body {
    width: ${w}px; height: ${h}px; position: relative;
    font-family: 'Noto Sans KR', 'Segoe UI', system-ui, sans-serif;
    color: ${C.ink};
    -webkit-font-smoothing: antialiased;
    text-rendering: geometricPrecision;
    /* keep backgrounds when Chrome renders this to PDF */
    -webkit-print-color-adjust: exact; print-color-adjust: exact;
  }
  .abs { position: absolute; }
  svg.wires { position: absolute; inset: 0; width: ${w}px; height: ${h}px; pointer-events: none; }

  .h1 { font-size: 34px; font-weight: 700; letter-spacing: -0.6px; }
  .h2 { font-size: 17px; color: ${C.muted}; letter-spacing: -0.2px; }

  /* Section labels sit on top of the SVG connector overlay and knock a gap out
     of any wire passing behind them — otherwise a wire strikes through the text. */
  .sect { font-size: 13px; font-weight: 700; letter-spacing: 0.3px; color: ${C.muted};
          z-index: 2; background: #fff; padding: 0 10px; }

  .box { border-radius: 10px; border: 1.5px solid; display: flex; flex-direction: column;
         align-items: center; justify-content: center; text-align: center; padding: 0 16px; }
  .box .t { font-size: 19px; font-weight: 700; letter-spacing: -0.3px; }
  .box .s { font-size: 13.5px; color: ${C.muted}; margin-top: 5px; }
  .box .f { font-size: 13px; font-weight: 600; margin-top: 9px; padding-top: 9px;
            border-top: 1px solid; width: 100%; }

  .badge { font-size: 11.5px; font-weight: 700; letter-spacing: 0.2px;
           border-radius: 999px; padding: 3px 10px; display: inline-block; }

  .wlab { font-size: 13px; font-weight: 600; }
  .wlab .p { font-weight: 700; }

  .tbl { width: 100%; border-collapse: collapse; font-size: 13px; }
  .tbl th { text-align: left; font-size: 11.5px; font-weight: 600; color: ${C.faint};
            padding: 0 8px 8px 0; border-bottom: 1px solid ${C.rule}; }
  .tbl td { padding: 8px 8px 8px 0; border-bottom: 1px solid #f4f4f5; color: ${C.gray};
            white-space: nowrap; }
  .tbl td.port { font-weight: 700; }

  .foot { font-size: 12px; color: ${C.faint}; }
</style>
<body>
${body}
<svg class="wires" xmlns="http://www.w3.org/2000/svg">
  <defs>
    ${['dark:' + C.line, 'teal:' + C.teal, 'amber:' + C.amber, 'violet:' + C.violet]
      .map((d) => {
        const [k, col] = d.split(':');
        return `<marker id="ah-${k}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0,1 L9,5 L0,9 z" fill="${col}"/></marker>`;
      })
      .join('\n    ')}
  </defs>
${svg}
</svg>
</body>`;
}

const stroke = { dark: C.line, teal: C.teal, amber: C.amber, violet: C.violet };

/** Orthogonal polyline with an arrowhead at the end. */
function wire(points, tone = 'dark', { arrow = true, dash = false } = {}) {
  const d = points.map(([x, y], i) => `${i ? 'L' : 'M'}${x},${y}`).join(' ');
  return `<path d="${d}" fill="none" stroke="${stroke[tone]}" stroke-width="1.6"${
    dash ? ' stroke-dasharray="5 5"' : ''
  }${arrow ? ` marker-end="url(#ah-${tone})"` : ''}/>`;
}

function box(x, y, w, h, tone, title, sub, foot) {
  const [fg, bg, bd] = TONE[tone];
  return `<div class="abs box" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;background:${bg};border-color:${bd}">
    <div class="t" style="color:${fg}">${esc(title)}</div>
    ${sub ? `<div class="s">${esc(sub)}</div>` : ''}
    ${foot ? `<div class="f" style="color:${fg};border-color:${bd}">${esc(foot)}</div>` : ''}
  </div>`;
}

function sectionLabel(x, y, w, text, color = C.muted) {
  // The label is shifted left by its own padding so the glyphs still start at x.
  return `<div class="abs sect" style="left:${x - 10}px;top:${y}px;color:${color}">${esc(text)}</div>
  <div class="abs" style="left:${x}px;top:${y + 24}px;width:${w}px;height:1px;background:${C.rule}"></div>`;
}

/* ------------------------------------------------------------------ *
 * 1. Architecture
 * ------------------------------------------------------------------ */
export function archHtml(s) {
  const a = s.arch;
  const W = 1800, H = 1444;
  const MX = 60, MR = 1120;          // main column
  const SX = 1180, SW = 560;         // sidebar

  const html = [];
  const wires = [];

  // Header
  html.push(`<div class="abs h1" style="left:${MX}px;top:52px">${esc(a.title)}</div>`);
  html.push(`<div class="abs h2" style="left:${MX}px;top:102px">${esc(a.subtitle)}</div>`);
  html.push(`<div class="abs" style="left:${MX}px;top:150px;width:${1740 - MX}px;height:2px;background:${C.ink}"></div>`);

  // --- Service band -------------------------------------------------
  html.push(sectionLabel(MX, 186, MR - MX, a.bandService, C.blue));

  html.push(box(400, 232, 380, 84, 'gray', a.user, a.userSub));
  wires.push(wire([[590, 316], [590, 362]], 'dark'));
  html.push(`<div class="abs wlab" style="left:602px;top:330px;color:${C.muted}">${esc(a.lblService)}</div>`);

  const gwY = 362, gwH = 112;
  html.push(box(MX, gwY, MR - MX, gwH, 'blue', a.gwWaf, a.gwWafSub));
  html.push(
    `<div class="abs badge" style="left:${MR - 292}px;top:${gwY + 14}px;background:${C.amberBg};color:${C.amber};border:1px solid ${C.amberBd}">${esc(a.wafBadge)}</div>`
  );

  wires.push(wire([[300, gwY + gwH], [300, 520]], 'dark'));
  html.push(box(MX, 520, 605, 90, 'blue', a.dcWaf, a.dcWafSub));

  // group captions
  html.push(sectionLabel(MX, 636, 605, a.groupDc, C.faint));
  html.push(sectionLabel(830, 636, MR - 830, a.groupGw, C.faint));

  const srvY = 692, srvH = 148;
  html.push(box(MX, srvY, 290, srvH, 'teal', a.srvA, a.srvASub, a.srvAFoot));
  html.push(box(375, srvY, 290, srvH, 'teal', a.srvB, a.srvBSub, a.srvBFoot));
  html.push(box(830, srvY, 290, srvH, 'teal', a.srvC, a.srvCSub, a.srvCFoot));

  wires.push(wire([[205, 610], [205, srvY]], 'dark'));
  wires.push(wire([[520, 610], [520, srvY]], 'dark'));
  wires.push(wire([[975, gwY + gwH], [975, srvY]], 'dark'));

  // --- ACME band ----------------------------------------------------
  html.push(sectionLabel(MX, 886, MR - MX, a.bandAcme, C.teal));

  const bus = 950;
  wires.push(wire([[205, srvY + srvH], [205, bus]], 'teal', { arrow: false }));
  wires.push(wire([[520, srvY + srvH], [520, bus]], 'teal', { arrow: false }));
  wires.push(wire([[975, srvY + srvH], [975, bus]], 'teal', { arrow: false }));
  wires.push(`<path d="M205,${bus} H975" fill="none" stroke="${C.teal}" stroke-width="1.6"/>`);

  const caY = 1016, caH = 128;
  wires.push(wire([[500, bus], [500, caY]], 'teal'));
  html.push(`<div class="abs wlab" style="left:512px;top:${bus + 12}px;color:${C.teal}">${esc(a.lblOrder)}</div>`);
  wires.push(wire([[940, bus], [940, caY]], 'violet'));
  html.push(`<div class="abs wlab" style="left:952px;top:${bus + 12}px;color:${C.violet}">${esc(a.lblReport)}</div>`);

  html.push(box(300, caY, 400, caH, 'teal', a.ca, a.caSub, a.caFoot));
  html.push(box(760, caY, 360, caH, 'violet', a.portal, a.portalSub, a.portalFoot));

  // Ownership check: Let's Encrypt -> gateway WAF, up the left rail.
  wires.push(wire([[300, caY + 64], [28, caY + 64], [28, gwY + 56], [MX, gwY + 56]], 'amber'));
  html.push(`<div class="abs wlab" style="left:120px;top:${caY + 30}px;color:${C.amber}">${esc(a.lblValidate)}</div>`);

  html.push(`<div class="abs" style="left:${MX}px;top:1214px;width:${MR - MX}px;height:1px;background:${C.rule}"></div>`);
  html.push(`<div class="abs" style="left:${MX}px;top:1236px;width:${MR - MX}px;font-size:14.5px;font-weight:600">${esc(a.footnote)}</div>`);
  html.push(`<div class="abs foot" style="left:${MX}px;top:1266px;width:${MR - MX};max-width:${MR - MX}px">${esc(a.footnoteSub)}</div>`);

  // --- Sidebar ------------------------------------------------------
  html.push(sectionLabel(SX, 186, SW, a.legendTitle));
  a.legend.forEach(([kind, text], i) => {
    const y = 224 + i * 33;
    let mark;
    if (kind.startsWith('line-')) {
      const col = { 'line-dark': C.line, 'line-amber': C.amber, 'line-teal': C.teal }[kind];
      mark = `<div class="abs" style="left:${SX}px;top:${y + 9}px;width:46px;height:2px;background:${col}"></div>`;
    } else {
      const [, bg, bd] = kind === 'swatch-blue' ? TONE.blue : TONE.teal;
      mark = `<div class="abs" style="left:${SX}px;top:${y + 1}px;width:46px;height:19px;border-radius:4px;background:${bg};border:1.5px solid ${bd}"></div>`;
    }
    html.push(mark);
    html.push(`<div class="abs" style="left:${SX + 62}px;top:${y}px;font-size:13.5px;color:${C.gray}">${esc(text)}</div>`);
  });

  html.push(sectionLabel(SX, 410, SW, a.portsTitle));
  const rows = a.ports
    .map(([f, t, p, u, tone]) => {
      const col = tone === 'amber' ? C.amber : tone === 'teal' ? C.teal : C.ink;
      return `<tr><td>${esc(f)}</td><td>${esc(t)}</td><td class="port" style="color:${col}">${esc(p)}</td><td style="color:${C.muted}">${esc(u)}</td></tr>`;
    })
    .join('');
  html.push(`<div class="abs" style="left:${SX}px;top:446px;width:${SW}px">
    <table class="tbl"><thead><tr>${a.portsHead.map((h) => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${rows}</tbody></table>
  </div>`);

  html.push(sectionLabel(SX, 852, SW, a.stepsTitle));
  a.steps.forEach(([n, t, d, tone], i) => {
    const y = 892 + i * 70;
    const [fg, bg, bd] = TONE[tone];
    html.push(`<div class="abs" style="left:${SX}px;top:${y}px;width:26px;height:26px;border-radius:999px;background:${bg};border:1.5px solid ${bd};color:${fg};font-size:13px;font-weight:700;display:flex;align-items:center;justify-content:center">${esc(n)}</div>`);
    html.push(`<div class="abs" style="left:${SX + 40}px;top:${y + 1}px;font-size:14.5px;font-weight:700">${esc(t)}</div>`);
    html.push(`<div class="abs foot" style="left:${SX + 40}px;top:${y + 25}px;width:${SW - 40}px;line-height:1.5">${esc(d)}</div>`);
  });

  const sy = 1244;
  html.push(`<div class="abs" style="left:${SX}px;top:${sy}px;width:${SW}px;border-radius:10px;background:${C.tealBg};border:1.5px solid ${C.tealBd};padding:16px 18px 18px">
    <div style="font-size:15px;font-weight:700;color:${C.teal}">${esc(a.summaryTitle)}</div>
    ${a.summary.map((l) => `<div style="font-size:13px;color:${C.gray};margin-top:8px;line-height:1.45">· ${esc(l)}</div>`).join('')}
  </div>`);

  html.push(`<div class="abs foot" style="left:${SX}px;top:1414px">${esc(s.org)}</div>`);

  return { w: W, h: H, html: shell({ w: W, h: H, body: html.join('\n'), svg: wires.join('\n') }) };
}

/* ------------------------------------------------------------------ *
 * 2. Sequence
 * ------------------------------------------------------------------ */
export function seqHtml(s) {
  const q = s.seq;
  const W = 1800;
  const MX = 60, MW = 1740 - 60;
  const N = q.lanes.length;
  const lane = (i) => MX + (MW / N) * (i + 0.5);

  const html = [];
  const wires = [];

  html.push(`<div class="abs h1" style="left:${MX}px;top:52px">${esc(q.title)}</div>`);
  html.push(`<div class="abs h2" style="left:${MX}px;top:102px">${esc(q.subtitle)}</div>`);
  html.push(`<div class="abs" style="left:${MX}px;top:150px;width:${MW}px;height:2px;background:${C.ink}"></div>`);

  const headY = 188, headH = 92;
  q.lanes.forEach(([t, sub, tone], i) => {
    html.push(box(lane(i) - 155, headY, 310, headH, tone, t, sub));
  });

  let y = headY + headH + 46;
  const phase = (text, tone) => {
    const [fg, bg] = TONE[tone];
    html.push(`<div class="abs" style="left:${MX}px;top:${y}px;width:${MW}px;height:36px;border-radius:7px;background:${bg};display:flex;align-items:center;padding:0 16px;font-size:14.5px;font-weight:700;color:${fg}">${esc(text)}</div>`);
    y += 36 + 26;
  };

  const numbered = (n, text, color) =>
    `<span style="color:${color};font-weight:700">${esc(n)}</span> ${esc(text)}`;

  // Bands are driven by each step's `p` index, not by matching step numerals —
  // so inserting or renumbering a step can't silently move a phase boundary.
  let curPhase = -1;

  q.steps.forEach((st) => {
    if (st.p !== curPhase) {
      const [title, tone] = q.phases[st.p];
      phase(title, tone);
      curPhase = st.p;
    }

    const [fg, bg, bd] = TONE[st.tone];

    if (st.kind === 'self') {
      const h = st.sub ? 78 : 60;
      const x = lane(st.lane) - 155;
      html.push(`<div class="abs" style="left:${x}px;top:${y}px;width:440px;height:${h}px;border-radius:9px;background:${bg};border:1.5px solid ${bd};display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 14px">
        <div style="font-size:15px;font-weight:600;color:${C.ink}">${numbered(st.n, st.text, fg)}</div>
        ${st.sub ? `<div class="foot" style="margin-top:5px">${esc(st.sub)}</div>` : ''}
      </div>`);
      y += h + 26;
    } else {
      const x1 = lane(st.from), x2 = lane(st.to);
      const left = Math.min(x1, x2);
      wires.push(wire([[x1, y + 26], [x2, y + 26]], st.tone));
      html.push(`<div class="abs" style="left:${left + 16}px;top:${y}px;font-size:15px;font-weight:600">${numbered(st.n, st.text, fg)}${
        st.port ? `<span style="color:${fg};font-weight:700;margin-left:10px">${esc(st.port)}</span>` : ''
      }</div>`);
      y += 56;
    }
  });

  // Lifelines stop here — they must not run through the summary panels below.
  const lifelineEnd = y - 4;

  y += 14;
  html.push(`<div class="abs" style="left:${MX}px;top:${y}px;width:${MW}px;height:84px;border-radius:10px;background:${C.tealBg};border:1.5px solid ${C.tealBd};padding:15px 20px">
    <div style="font-size:16px;font-weight:700;color:${C.teal}">${esc(q.closingTitle)}</div>
    <div class="foot" style="margin-top:6px">${esc(q.closingSub)}</div>
  </div>`);
  y += 84 + 20;

  html.push(`<div class="abs" style="left:${MX}px;top:${y}px;width:${MW}px;height:84px;border-radius:10px;background:${C.violetBg};border:1.5px solid ${C.violetBd};padding:15px 20px">
    <div style="font-size:16px;font-weight:700;color:${C.violet}">${esc(q.alertTitle)}</div>
    <div class="foot" style="margin-top:6px">${esc(q.alertSub)}</div>
  </div>`);
  y += 84 + 34;

  q.lanes.forEach((_, i) => {
    wires.push(
      `<path d="M${lane(i)},${headY + headH} V${lifelineEnd}" fill="none" stroke="${C.grayBd}" stroke-width="1.4" stroke-dasharray="5 6"/>`
    );
  });

  html.push(`<div class="abs" style="left:${MX}px;top:${y}px;width:${MW}px;height:1px;background:${C.rule}"></div>`);
  html.push(`<div class="abs" style="left:${MX}px;top:${y + 20}px;font-size:14.5px;font-weight:600">${esc(q.footnote)}</div>`);
  html.push(`<div class="abs foot" style="left:${MX}px;top:${y + 20}px;width:${MW}px;text-align:right">${esc(q.footnoteRight)}</div>`);

  const H = y + 76;
  return { w: W, h: H, html: shell({ w: W, h: H, body: html.join('\n'), svg: wires.join('\n') }) };
}
