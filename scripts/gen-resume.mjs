/**
 * Generate the one-page resume PDFs offered for download on the home page.
 *
 *   npm run resume
 *
 * Writes public/resume/hyunjae-lee-resume-ko.pdf (이력서) and
 * public/resume/hyunjae-lee-resume-en.pdf (Resume) by printing a fixed A4
 * HTML template with headless Chrome. The PDF is a condensed, print-first
 * version of the resume in src/config.ts — when the resume changes, update the
 * copy below too and re-run. The script fails if either PDF spills past one page.
 */
import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, readFileSync, rmSync, statSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const CHROME = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
].find((p) => {
  try { statSync(p); return true; } catch { return false; }
});
if (!CHROME) {
  console.error('Chrome not found — install Chrome or edit the CHROME list in scripts/gen-resume.mjs.');
  process.exit(1);
}

const contact = {
  email: 'hyunjae@kaist.ac.kr',
  site: 'hyunjae-lee.github.io',
  github: 'github.com/hyunjae-lee',
  linkedin: 'linkedin.com/in/hyunjaedev',
};

const content = {
  ko: {
    file: 'hyunjae-lee-resume-ko.pdf',
    lang: 'ko',
    name: '이현재',
    nameAlt: 'Hyunjae Lee',
    title: '정보보안 엔지니어 · AI 보안',
    location: '대전',
    summary:
      'AI 보안과 현장 보안 운영이 만나는 지점에서 일합니다. 국가정보원 N2SF 구성도에 대응하는 <b>LLM 가드레일 게이트웨이</b>를 연구책임자로 구현·실증했고, 약 1,200개 웹사이트의 <b>취약점 정기 점검</b>과 <b>인증서 자동화</b>를 운영합니다. 그전에는 국정원·과기정통부와 함께 <b>연 100건 이상의 보안성 검토</b>를 이끌었고, 약 USD 130M 규모 차세대 정보시스템 구축의 핵심 실무를 맡았습니다.',
    metrics: [
      ['30% → 0%', 'LLM 가드레일 공격 미탐 (평가셋 205문항)'],
      ['99.4%', '웹 취약점 점검률 (과기정통부 계획 대상)'],
      ['0건', '인증서 만료 (서버 73대 · 자동 갱신 109건)'],
      ['100+/년', '국정원·과기정통부 협력 보안성 검토'],
    ],
    h: { exp: '경력', skills: '기술', edu: '학력', cert: '자격 · 어학', pub: '논문 · 특허', honors: '수상' },
    experience: [
      {
        org: 'KAIST', role: '기술원', period: '2020 — 현재',
        phases: [
          {
            label: '정보보안팀 · 웹 보안 / AI 보안', period: '2026.07 — 현재',
            points: [
              '<b>생성형 AI 가드레일 실증 연구 연구책임자</b>(3인) — 송신 8·수신 6단계 검사, RAG 권한 통제, 카나리아 토큰. 평가셋 205문항과 배포 게이트로 공격 미탐 30%→0%, 정상 오차단 2.6%→0%, 검사당 6ms(GPU 없음). OWASP LLM Top 10 대응.',
              '<b>교내 웹 취약점 정기 점검</b> 운영 — 도메인 약 1,200개, 계획 대상 99.4% 점검, 상용 스캐너 공백은 nuclei 자체점검으로 해소, 취약 사이트 62개(상 214·중 832건) 조치 안내.',
              '<b>인증서 자동화 체계</b> 설계·구축·운영 — ACME 1줄 설치, 자가 업데이트 에이전트, 4지점 지문 대조, DNS-01 위임. 서버 73대, 자동 갱신 109건, 만료 0건.',
              '셀프서비스 보안포털 설계, 악성 URL IoC 약 9,500건 판정 기준 수립, KISA 가이드 기반 서버 보안 기준 47항목 자동 판정 설계, WAF 운영.',
            ],
          },
          {
            label: '정보보안팀 · 거버넌스', period: '2025.07 — 2026.07',
            points: [
              'AI·클라우드 서비스 포함 주요 정보화사업 <b>보안성 검토 연 100건 이상</b>(국정원·과기정통부 협력, 국가정보원 사이버보안 기본지침 기반).',
              '과기정통부 정보보안·개인정보 감사 대응 주도 — 원인 분석·이의신청·보완자료로 <b>기관 평가 등급 상향</b>. 전 부서 실태점검·불시감찰, 매체 보안, 실무자 교육.',
            ],
          },
          {
            label: '정보개발팀 · 학사 시스템', period: '2020 — 2025.07',
            points: [
              '약 USD 130M·3년 <b>차세대 통합정보시스템</b> 학사 모듈 핵심 실무 — 졸업요건 1,400건 이상 현행화, 전환기 졸업 2,000명 이상 무중단 처리(KAIST 특별표창).',
            ],
          },
        ],
      },
      { org: 'TmaxSoft', role: '연구원', period: '2020.01 — 06', points: ['Spring 기반 엔터프라이즈 제품 개발, Docker·Kubernetes 클라우드 네이티브 전환.'] },
      { org: 'Head Start (미국 새너제이)', role: '데이터 사이언티스트 인턴', period: '2019.07 — 08', points: ['머신러닝 모델 구축·평가.'] },
      { org: '중앙대 분산플랫폼·보안 연구실', role: '학부 연구원', period: '2018 — 2019', points: ['블록체인 이중지불 방지 연구 — IEEE 논문, 특허.'] },
    ],
    skills: [
      ['AI 보안', 'LLM 가드레일 · 프롬프트 인젝션 방어 · RAG 권한 통제 · AI 레드팀 평가(promptfoo, garak) · OWASP LLM Top 10 · MITRE ATLAS · N2SF'],
      ['보안', '웹 취약점 점검(nuclei, AppScan) · TLS/PKI/ACME · WAF · 위협 인텔리전스 · 악성코드 분석 · ATT&CK · 보안성검토 · 감사'],
      ['개발 · 인프라', 'Python · FastAPI · Java/Spring · Docker · Kubernetes · CI/CD · Linux/Windows Server · DNS · ONNX(한국어 NER)'],
    ],
    education: [
      ['중앙대학교 컴퓨터공학 학사', '2013 — 2020'],
      ['ECE Paris 정보시스템 교환학생', '2018 — 2019'],
    ],
    certs: ['정보처리기사 (2024)', 'OPIc 영어 AL — 최고 등급 (2025)', '영어 업무 능숙 · 스페인어·프랑스어 초급'],
    pubs: [
      'Recipient-Oriented Transaction for Preventing Double Spending Attacks in Private Blockchain — IEEE SECON 2018',
      '특허 KR 10-2018-0089040 — 이중지불 방지를 위한 수신자 중심 트랜잭션 검증 방법 및 장치',
    ],
    honors: ['KAIST 특별표창 — 차세대 통합정보시스템 (2025)', 'SW 챌린지 동상 — 한국소프트웨어산업협회 (2019)', '다빈치 SW TECH-FAIR 우수상 — 중앙대 (2019)'],
  },
  en: {
    file: 'hyunjae-lee-resume-en.pdf',
    lang: 'en',
    name: 'Hyunjae Lee',
    nameAlt: '이현재',
    title: 'Information Security Engineer · AI Security',
    location: 'Daejeon, Korea',
    summary:
      'I work where AI security meets day-to-day security operations. As principal investigator I built and validated an <b>LLM guardrail gateway</b> aligned with Korea’s NIS N2SF framework, and I run <b>web vulnerability assessment</b> and <b>certificate automation</b> across ~1,200 university websites. Before that I led <b>100+ security reviews a year</b> with the NIS and MSIT, and played a key role in a ~USD 130M next-generation information-system program.',
    metrics: [
      ['30% → 0%', 'missed attacks, LLM guardrail (205-prompt eval set)'],
      ['99.4%', 'web assessment coverage of mandated targets'],
      ['0', 'certificate expiries (73 servers, 109 auto-renewals)'],
      ['100+/yr', 'security reviews with the NIS and MSIT'],
    ],
    h: { exp: 'Experience', skills: 'Skills', edu: 'Education', cert: 'Certifications · Languages', pub: 'Publications · Patent', honors: 'Honors' },
    experience: [
      {
        org: 'KAIST', role: 'Engineer', period: '2020 — Present',
        phases: [
          {
            label: 'Information Security Team · Web & AI Security', period: 'Jul 2026 — Present',
            points: [
              '<b>Principal investigator, generative-AI guardrail field study</b> (team of 3): 8 outbound / 6 inbound inspection stages, RAG clearance control, canary tokens. A 205-prompt eval set with a CI gate took missed attacks 30%→0% and false blocks 2.6%→0% at 6 ms per check, no GPU. Mapped to OWASP LLM Top 10.',
              'Ran the <b>campus web vulnerability assessment</b>: ~1,200 domains, 99.4% of mandated targets, scanner gaps closed with nuclei self-scans; remediation guidance for 62 affected sites (214 high, 832 medium).',
              'Designed, built, and operate <b>certificate automation</b>: one-command ACME installer, self-updating agent, four-point fingerprint checks, DNS-01 delegation. 73 servers, 109 auto-renewals, zero expiries.',
              'Designed a self-service security portal, IoC triage criteria for ~9,500 malicious URLs, and 47 automated server-baseline checks from the KISA guide; operate the WAF.',
            ],
          },
          {
            label: 'Information Security Team · Governance', period: 'Jul 2025 — Jul 2026',
            points: [
              '<b>100+ security reviews a year</b> of major IT projects, including AI and cloud services, with the NIS and MSIT under the national cybersecurity guidelines.',
              'Led the MSIT security & privacy audit response (root-cause analysis, objections, evidence), <b>raising the institution’s rating</b>; ran inspections, media security, and staff training.',
            ],
          },
          {
            label: 'Information Development Team · Academic Systems', period: '2020 — Jul 2025',
            points: [
              'Core member of a ~USD 130M, 3-year <b>next-generation information system</b>: modernized 1,400+ graduation rules; 2,000+ graduations processed through the cutover without disruption (KAIST Special Commendation).',
            ],
          },
        ],
      },
      { org: 'TmaxSoft', role: 'Researcher', period: 'Jan — Jun 2020', points: ['Spring-based enterprise products; cloud-native migration with Docker and Kubernetes.'] },
      { org: 'Head Start, San Jose CA', role: 'Data Scientist Intern', period: 'Jul — Aug 2019', points: ['Built and evaluated machine-learning models.'] },
      { org: 'Distributed Platforms & Security Lab, Chung-Ang Univ.', role: 'Undergraduate Researcher', period: '2018 — 2019', points: ['Blockchain double-spending research: IEEE paper and patent.'] },
    ],
    skills: [
      ['AI Security', 'LLM guardrails · prompt-injection defense · RAG access control · AI red-team evaluation (promptfoo, garak) · OWASP LLM Top 10 · MITRE ATLAS · N2SF'],
      ['Security', 'Web vulnerability assessment (nuclei, AppScan) · TLS/PKI/ACME · WAF · threat intelligence · malware analysis · ATT&CK · security review & audit'],
      ['Dev · Infra', 'Python · FastAPI · Java/Spring · Docker · Kubernetes · CI/CD · Linux/Windows Server · DNS · ONNX (Korean NER)'],
    ],
    education: [
      ['B.S. Computer Science & Engineering, Chung-Ang University', '2013 — 2020'],
      ['Information Systems (Exchange), ECE Paris', '2018 — 2019'],
    ],
    certs: ['Engineer Information Processing (2024)', 'OPIc English AL — highest grade (2025)', 'Korean native · English professional · Spanish, French elementary'],
    pubs: [
      'Recipient-Oriented Transaction for Preventing Double Spending Attacks in Private Blockchain — IEEE SECON 2018',
      'Patent KR 10-2018-0089040 — Recipient-oriented transaction verification for preventing double spending',
    ],
    honors: ['KAIST Special Commendation — next-generation system (2025)', 'Bronze Prize, SW Challenge — KOSA (2019)', 'Excellence Award, DaVinci SW TECH-FAIR (2019)'],
  },
};

const esc = (s) => s; // copy above is trusted, hand-written HTML

function html(c) {
  const list = (pts) => `<ul>${pts.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>`;
  const exp = c.experience
    .map((e) => {
      const head = `<div class="row"><div><span class="org">${e.org}</span> <span class="role">${e.role}</span></div><div class="period">${e.period}</div></div>`;
      if (e.phases) {
        return `<div class="job">${head}${e.phases
          .map((ph) => `<div class="phase"><div class="row"><div class="plabel">${ph.label}</div><div class="period">${ph.period}</div></div>${list(ph.points)}</div>`)
          .join('')}</div>`;
      }
      return `<div class="job small">${head}${list(e.points)}</div>`;
    })
    .join('');

  return `<!doctype html><html lang="${c.lang}"><head><meta charset="utf-8"><title>${c.name} — Resume</title>
<style>
  @page { size: A4; margin: 0; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: 210mm; }
  body {
    font-family: 'Pretendard', 'Malgun Gothic', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Segoe UI', Arial, sans-serif;
    color: #27272a; font-size: 8.4pt; line-height: 1.42; padding: 11mm 13mm 9mm;
    -webkit-print-color-adjust: exact; print-color-adjust: exact;
    word-break: ${c.lang === 'ko' ? 'keep-all' : 'normal'};
  }
  b { font-weight: 650; color: #18181b; }
  header { display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 2px solid #4f46e5; padding-bottom: 3mm; }
  h1 { font-size: 21pt; letter-spacing: -0.02em; color: #09090b; line-height: 1.1; }
  h1 small { font-size: 11pt; font-weight: 400; color: #a1a1aa; margin-left: 2mm; }
  .title { margin-top: 1mm; font-size: 10pt; font-weight: 600; color: #4f46e5; }
  .contact { text-align: right; font-size: 7.8pt; color: #52525b; line-height: 1.55; }
  .summary { margin-top: 3mm; font-size: 8.6pt; color: #3f3f46; }
  .metrics { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2mm; margin-top: 3mm; }
  .metric { border: 1px solid #e0e7ff; background: #eef2ff; border-radius: 1.5mm; padding: 1.8mm 2.2mm; }
  .metric .v { font-size: 12pt; font-weight: 700; color: #4338ca; line-height: 1.15; }
  .metric .l { font-size: 7pt; color: #52525b; line-height: 1.3; margin-top: 0.6mm; }
  h2 { margin-top: 3.6mm; margin-bottom: 1.4mm; font-size: 8pt; letter-spacing: 0.12em; text-transform: uppercase; color: #4f46e5; font-weight: 700; display: flex; align-items: center; gap: 2mm; }
  h2::after { content: ''; flex: 1; height: 1px; background: #e4e4e7; }
  .row { display: flex; justify-content: space-between; align-items: baseline; gap: 3mm; }
  .period { font-size: 7.6pt; color: #71717a; white-space: nowrap; }
  .org { font-weight: 700; font-size: 9pt; color: #09090b; }
  .role { color: #52525b; font-size: 8.2pt; }
  .job + .job { margin-top: 1.6mm; }
  .phase { margin-top: 1.2mm; padding-left: 2.6mm; border-left: 1.5px solid #e0e7ff; }
  .plabel { font-weight: 600; font-size: 8.2pt; color: #3f3f46; }
  ul { margin-top: 0.5mm; padding-left: 3.4mm; }
  li { margin-top: 0.4mm; }
  li::marker { color: #6366f1; }
  .job.small ul { margin-top: 0.2mm; }
  .skills { display: grid; grid-template-columns: max-content 1fr; gap: 0.8mm 3mm; }
  .skills dt { font-weight: 650; color: #18181b; }
  .two { display: grid; grid-template-columns: 1fr 1fr; gap: 0 7mm; }
  .plain { list-style: none; padding-left: 0; }
  .plain li { margin-top: 0.4mm; }
  .edu li { display: flex; justify-content: space-between; gap: 2mm; }
</style></head><body>
<header>
  <div>
    <h1>${c.name}<small>${c.nameAlt}</small></h1>
    <div class="title">${c.title}</div>
  </div>
  <div class="contact">${contact.email}<br>${contact.site}<br>${contact.github} · ${contact.linkedin}<br>${c.location}</div>
</header>
<p class="summary">${c.summary}</p>
<div class="metrics">${c.metrics.map(([v, l]) => `<div class="metric"><div class="v">${v}</div><div class="l">${l}</div></div>`).join('')}</div>
<h2>${c.h.exp}</h2>
${exp}
<h2>${c.h.skills}</h2>
<dl class="skills">${c.skills.map(([g, i]) => `<dt>${g}</dt><dd>${i}</dd>`).join('')}</dl>
<div class="two">
  <div>
    <h2>${c.h.edu}</h2>
    <ul class="plain edu">${c.education.map(([t, p]) => `<li><span>${t}</span><span class="period">${p}</span></li>`).join('')}</ul>
    <h2>${c.h.cert}</h2>
    <ul class="plain">${c.certs.map((x) => `<li>${x}</li>`).join('')}</ul>
  </div>
  <div>
    <h2>${c.h.pub}</h2>
    <ul class="plain">${c.pubs.map((x) => `<li>${x}</li>`).join('')}</ul>
    <h2>${c.h.honors}</h2>
    <ul class="plain">${c.honors.map((x) => `<li>${x}</li>`).join('')}</ul>
  </div>
</div>
</body></html>`;
}

const OUT = resolve('public/resume');
mkdirSync(OUT, { recursive: true });
const work = mkdtempSync(join(tmpdir(), 'resume-'));
let failed = false;

for (const c of Object.values(content)) {
  const src = join(work, `${c.lang}.html`);
  writeFileSync(src, html(c), 'utf8');
  if (process.env.RESUME_HTML_DIR) writeFileSync(join(process.env.RESUME_HTML_DIR, c.lang + '.html'), html(c), 'utf8');
  const out = join(OUT, c.file);
  execFileSync(CHROME, [
    '--headless=new', '--disable-gpu', '--no-pdf-header-footer',
    `--print-to-pdf=${out}`, pathToFileURL(src).href,
  ], { stdio: ['ignore', 'pipe', 'pipe'] });
  const pdf = readFileSync(out, 'latin1');
  const pages = (pdf.match(/\/Type\s*\/Page[^s]/g) || []).length;
  console.log(`${c.file}: ${pages} page(s), ${(statSync(out).size / 1024).toFixed(0)} KB`);
  if (pages !== 1) failed = true;
}

rmSync(work, { recursive: true, force: true });
if (failed) {
  console.error('A resume spilled past one page — tighten the copy above.');
  process.exit(1);
}
