/**
 * Site-wide configuration and resume content.
 * Resume content is localized: `resume.en` and `resume.ko`.
 * Project entries live as Markdown under `src/content/projects/` (en) and
 * `src/content/projects-ko/` (ko).
 */

export const site = {
  name: 'Hyunjae Lee',
  nameKo: '이현재',
  url: 'https://hyunjae-lee.github.io',
};

export const links = {
  github: 'https://github.com/hyunjae-lee',
  linkedin: 'https://www.linkedin.com/in/hyunjaedev',
  email: 'mailto:hyunjae@kaist.ac.kr',
};

// Avatar (from GitHub), served locally for speed/reliability.
export const avatar = '/profile.jpg';

const resumeEn = {
  title: 'Hyunjae Lee — Information Security Engineer',
  tagline:
    'Securing how an institution uses AI and the web — LLM guardrails measured, not assumed; vulnerability assessment, TLS automation, and WAF at campus scale.',
  bio: 'There is such a world to see.',
  role: 'Information Security Engineer',
  location: 'Daejeon, Republic of Korea',
  available: 'Information Security Team · KAIST',

  summary:
    'Information Security Engineer at KAIST, working where ' +
    '<span class="font-semibold text-accent-600 dark:text-accent-400">AI security</span> meets day-to-day security operations. ' +
    'As principal investigator of a 2026 research project, I built a research prototype of an ' +
    '<strong class="text-zinc-900 dark:text-zinc-100">LLM guardrail gateway</strong> aligned with the NIS N2SF framework and validated it on a ' +
    '<strong class="text-zinc-900 dark:text-zinc-100">205-prompt evaluation set</strong> — missed attacks ' +
    '<strong class="text-zinc-900 dark:text-zinc-100">30% → 0%</strong>, benign false blocks 2.6% → 0%, at ~6 ms per inspection without a GPU. ' +
    'In web security I run the campus ' +
    '<strong class="text-zinc-900 dark:text-zinc-100">web vulnerability assessment</strong> (99.4% of mandated targets), ' +
    'operate the WAF, and built ' +
    '<strong class="text-zinc-900 dark:text-zinc-100">certificate automation</strong> in production with zero certificate expiries. ' +
    'Before that I led security governance — ' +
    '<strong class="text-zinc-900 dark:text-zinc-100">100+ security reviews a year</strong> with the NIS and MSIT and the MSIT security &amp; privacy audit — ' +
    'and spent five years on core academic systems, including a key role in a ' +
    '<strong class="text-zinc-900 dark:text-zinc-100">~USD 130M</strong> next-generation information-system program. ' +
    'Earlier work spans ' +
    '<strong class="text-zinc-900 dark:text-zinc-100">cloud-native infrastructure (Docker, Kubernetes)</strong>, machine learning, and an IEEE paper and patent in applied security.',

  now: [
    { title: 'Agent tool-execution control', text: 'Extending the guardrail from inspecting words to inspecting actions — policy enforcement for AI agents’ tool calls and MCP servers (OWASP LLM06).' },
    { title: 'Red-teaming my own guardrail', text: 'An automated Korean jailbreak and prompt-injection generator, plus re-measurement on a held-out set written by someone else.' },
    { title: 'LLM-assisted vulnerability triage, on-prem', text: 'Testing a local LLM on scanner findings and code review against the current knowledge-base baseline — measured, with no data leaving the institution.' },
    { title: 'Offensive fundamentals', text: 'Web exploitation labs, malware analysis and reverse engineering, and IDS rule writing — turning defenses I build into attacks I can test.' },
  ],

  experience: [
    {
      period: '2020 — Present',
      role: 'Engineer (기술원)',
      org: 'KAIST',
      location: 'Daejeon, KR',
      phases: [
        {
          period: 'Jul 2026 — Present',
          focus: 'Information Security Team · Web Security',
          points: [
            'Principal investigator of a staff research project on secure generative-AI adoption (completed; not deployed to production): built a research prototype of an institutional LLM guardrail gateway (8 outbound / 6 inbound inspection stages, RAG clearance control, canary tokens) mapped to the NIS N2SF AI architecture, and a 205-prompt evaluation set with a CI gate — missed attacks 30% → 0%, benign false blocks 2.6% → 0%, ~6 ms per inspection without a GPU.',
            'Ran the H2 2026 campus web vulnerability assessment under the MSIT plan: 99.4% coverage of mandated targets, closing the commercial scanner’s gaps with nuclei self-scans; delivered individual remediation guidance to owners of affected sites and tracked rescans.',
            'Built campus-wide certificate automation (in production since May 2026): a one-command ACME installer, self-updating agent, four-point certificate fingerprint checks, and DNS-01 delegation for closed servers — zero certificate expiries.',
            'Designing SafeWeb, a self-service security portal (scan request, automatic ownership verification, offline Korean remediation reports, rescans), with a verifiable data boundary for AI-assisted development.',
            'Wrote threat-intelligence triage criteria for malicious-URL IoCs (graded evidence, verdicts separated from blocking scope), and turned the KISA critical-infrastructure guide into 47 remotely assessable server-baseline checks.',
            'Operate and tune the Web Application Firewall (WAF), balancing web-layer attack blocking against false positives.',
          ],
        },
        {
          period: 'Jul 2025 — Jul 2026',
          focus: 'Information Security Team · Governance',
          points: [
            'Led 100+ security reviews (보안성검토) per year across KAIST’s major IT initiatives — including AI/Cloud-based services and external integrations — in collaboration with the National Intelligence Service (NIS) and the Ministry of Science and ICT (MSIT), applying relevant laws, guidelines, and security standards.',
            'Led the response to the MSIT information-security & privacy audit — driving root-cause analysis, formal objections, and supplementary evidence — which raised the institution’s official security-evaluation result, and hardened internal controls to prevent recurrence.',
            'Ran regular and unannounced security-posture inspections (실태점검·불시감찰) across all departments, surfacing non-compliance and latent vulnerabilities before they became incidents.',
            'Anchored reviews and audits in the NIS Cybersecurity Guidelines (국가정보원 사이버보안 기본지침), assessing architecture, access control, and data protection against national standards.',
            'Operated media-security controls (secure USB, media-control system, magnetic data erasure), planned and personally delivered practitioner training, and managed security policy and budget.',
          ],
        },
        {
          period: '2020 — Jul 2025',
          focus: 'Information Development Team · Academic Systems',
          points: [
            'Served as a core working-level member of the ~USD 130M, 3-year Next-Generation Integrated Information System — deeply involved in designing the academic module (curriculum, course registration, classes, graduation) and driving verification, testing, and production deployment to a successful launch.',
            'Reviewed and modernized 1,400+ common and major-specific graduation requirements across departments (CS, EE, Mechanical, and more), re-basing complex rules onto the next-generation system and resolving policy–system mismatches.',
            'Redesigned graduation-assessment exception handling and the logic for internships, special lectures, and substitute courses; improved thesis-review management (proposal, defense, external committees), eliminating recurring errors.',
            'Built security and privacy into the academic module: designed and verified role-based access control (student, faculty, department, registrar), encryption and on-screen/print masking of personal identifiers, privacy-impact-assessment requirements and personal-data access logging, and remediation of pre-launch vulnerability findings under secure-coding rules.',
            'During the transition-aligned graduation season, processed 2,000+ graduations and degree conferrals without disruption, and built new degree certificate / name / number issuance features that improved record accuracy and administrative trust.',
          ],
        },
      ],
    },
    {
      period: 'Jan — Jun 2020',
      role: 'Researcher',
      org: 'TmaxSoft',
      location: 'Seongnam, KR',
      points: [
        'Developed and maintained enterprise products built on Tomcat (WAS) and the Spring Framework.',
        'Migrated legacy products to cloud-native infrastructure (Hyper Cloud) using Docker and Kubernetes.',
      ],
    },
    {
      period: 'Jul — Aug 2019',
      role: 'Data Scientist',
      org: 'Head Start',
      location: 'San Jose, CA',
      points: [
        'Built and evaluated machine-learning models as a data scientist during a summer internship in Silicon Valley.',
      ],
    },
    {
      period: '2018 — 2019',
      role: 'Undergraduate Research Assistant',
      org: 'Distributed Platforms & Security Lab, Chung-Ang University',
      location: 'Seoul, KR',
      points: [
        'Applied-security research that led to an IEEE publication and a patent (see Publications).',
      ],
    },
  ],

  education: [
    {
      period: '2013 — 2020',
      title: 'B.S., Computer Science & Engineering',
      org: 'Chung-Ang University',
      location: 'Seoul, KR',
      link: 'https://www.cau.ac.kr/',
    },
    {
      period: '2018 — 2019',
      title: 'Information Systems (Exchange)',
      org: 'ECE Paris',
      location: 'Paris, FR',
      link: 'https://www.ece.fr/',
    },
  ],

  skills: [
    {
      group: 'AI Security',
      items: [
        'LLM Guardrails',
        'Prompt Injection Defense',
        'RAG Access Control',
        'AI Red-Team Evaluation',
        'OWASP LLM Top 10 · MITRE ATLAS',
        'N2SF · AI Governance',
      ],
    },
    {
      group: 'Security',
      items: [
        'Web Vulnerability Assessment (nuclei)',
        'SSL/TLS · PKI · ACME',
        'Web Application Firewall (WAF)',
        'Threat Intelligence · IoC Triage',
        'Malware Analysis · MITRE ATT&CK',
        'Security Review · Audit · Policy',
      ],
    },
    {
      group: 'AI / Machine Learning',
      items: ['Machine Learning', 'Deep Learning', 'LLMs & Generative AI', 'Korean NER (ONNX)', 'AI Coding Agents'],
    },
    { group: 'Cloud & Infrastructure', items: ['Docker', 'Kubernetes', 'CI/CD', 'Linux · Windows Server', 'DNS'] },
    { group: 'Systems & Development', items: ['Python', 'FastAPI', 'Java', 'Spring Framework', 'Enterprise Systems'] },
  ],

  certifications: [
    {
      name: 'Engineer Information Processing (정보처리기사)',
      issuer: 'Ministry of Science and ICT, Republic of Korea',
      date: 'Sep 2024',
    },
    {
      name: 'OPIc — English: Advanced Low (AL) · Highest Grade',
      issuer: 'ACTFL',
      date: 'Dec 2025',
      note: 'AL is the highest level awarded on OPIc · valid through Dec 2027',
    },
    { name: 'Cloud Computing 101 (클라우드 컴퓨팅 기초)' },
  ],

  training: [
    {
      name: 'Local LLM Deployment and Practical Application',
      issuer: 'Cyber Security Training Center (사이버안보훈련센터)',
      date: 'Jun 2026',
      hours: '21 hrs',
    },
    {
      name: 'Security Review of Public IT Projects (정보화사업 보안성 검토)',
      issuer: 'Cyber Security Training Center (사이버안보훈련센터)',
      date: 'May 2026',
      hours: '7 hrs',
    },
  ],

  languages: [
    { name: 'Korean', level: 'Native' },
    { name: 'English', level: 'Professional Working', badge: 'OPIc AL · highest grade' },
    { name: 'Spanish', level: 'Elementary' },
    { name: 'French', level: 'Elementary' },
  ],

  honors: [
    {
      text: 'Special Commendation, KAIST — Next-Generation Integrated Information System (2025)',
      project: 'kaist-next-gen-information-system',
    },
    {
      text: 'Bronze Prize — 2019 SW Challenge, Korea Software Industry Association (HighlightU)',
      image: '/awards/sw-challenge-bronze-2019.jpg',
      project: 'highlightu',
    },
    {
      text: 'Excellence Award — 2019 DaVinci SW TECH-FAIR, Chung-Ang University',
      image: '/awards/davinci-tech-fair-2019.jpg',
    },
  ],

  publications: [
    {
      type: 'Paper',
      title:
        'Recipient-Oriented Transaction for Preventing Double Spending Attacks in Private Blockchain',
      venue: 'IEEE SECON 2018 · with M. Shin, K. S. Kim, Y. Kang, J. Kim',
      link: 'https://ieeexplore.ieee.org/document/8397151/',
    },
    {
      type: 'Patent',
      title:
        'Recipient-oriented transaction verification method and apparatus for preventing double spending',
      venue: 'KR 10-2018-0089040 · 2018',
    },
  ],
};

const resumeKo: typeof resumeEn = {
  title: 'Hyunjae Lee — 정보보안 엔지니어',
  tagline:
    '기관이 AI와 웹을 안전하게 쓰도록 — 추정이 아니라 측정으로 검증한 LLM 가드레일, 그리고 캠퍼스 규모의 취약점 점검·TLS 자동화·WAF.',
  bio: 'There is such a world to see.',
  role: '정보보안 엔지니어',
  location: '대한민국 대전',
  available: '정보보안팀 · KAIST',

  summary:
    '<span class="font-semibold text-accent-600 dark:text-accent-400">AI 보안</span>과 현장 보안 운영이 만나는 지점에서 일하는 KAIST 정보보안 엔지니어입니다. ' +
    '2026년 직원 현장연구(연구 프로젝트)의 연구책임자로 국가정보원 N2SF 구성도에 대응하는 ' +
    '<strong class="text-zinc-900 dark:text-zinc-100">LLM 가드레일 게이트웨이</strong> 프로토타입을 구현하고, ' +
    '<strong class="text-zinc-900 dark:text-zinc-100">평가셋 205문항</strong>으로 실증해 놓친 공격 ' +
    '<strong class="text-zinc-900 dark:text-zinc-100">30% → 0%</strong>, 정상 질의 오차단 2.6% → 0%를 달성했습니다(검사당 약 6ms, GPU 없음). ' +
    '웹 보안에서는 교내 ' +
    '<strong class="text-zinc-900 dark:text-zinc-100">웹 취약점 정기 점검</strong>(계획 대상 99.4% 점검)과 WAF를 운영하고, ' +
    '인증서 만료 0건으로 운영 중인 ' +
    '<strong class="text-zinc-900 dark:text-zinc-100">인증서 자동화 체계</strong>를 직접 만들었습니다. ' +
    '그전에는 국가정보원·과학기술정보통신부와 협력해 ' +
    '<strong class="text-zinc-900 dark:text-zinc-100">연 100건 이상의 보안성 검토</strong>와 과기정통부 정보보안·개인정보 감사 대응을 이끌었고, ' +
    '5년간 핵심 학사 시스템을 운영하며 ' +
    '<strong class="text-zinc-900 dark:text-zinc-100">약 USD 130M</strong> 규모 차세대 정보시스템 구축의 핵심 실무를 맡았습니다. ' +
    '그 이전에는 ' +
    '<strong class="text-zinc-900 dark:text-zinc-100">클라우드 네이티브 인프라(Docker, Kubernetes)</strong>, 머신러닝, 그리고 응용 보안 분야 IEEE 논문·특허 경험이 있습니다.',

  now: [
    { title: 'AI 에이전트 도구 실행 통제', text: '질의·응답 검사에서 행동 검사로 — AI 에이전트의 도구 호출과 MCP 서버에 정책을 적용하도록 가드레일을 확장합니다(OWASP LLM06).' },
    { title: '내 가드레일을 직접 공격하기', text: '한국어 탈옥·프롬프트 인젝션 자동 생성기를 만들고, 규칙 작성에 관여하지 않은 제3자의 시험지로 다시 측정합니다.' },
    { title: '로컬 LLM 기반 취약점 트리아지', text: '점검 결과와 코드 리뷰에 기관 내부 LLM을 적용해 지식베이스 기반 방식과 비교 측정합니다. 데이터는 기관 밖으로 나가지 않습니다.' },
    { title: '공격 보안 기본기', text: '웹 익스플로잇 실습, 악성코드 분석·리버싱, 탐지 룰 작성 — 만든 방어를 직접 공격해 볼 수 있도록.' },
  ],

  experience: [
    {
      period: '2020 — 현재',
      role: '기술원 (Engineer)',
      org: 'KAIST',
      location: '대한민국 대전',
      phases: [
        {
          period: '2026.07 — 현재',
          focus: '정보보안팀 · 웹 보안',
          points: [
            '직원 현장연구 「생성형 AI 도입을 위한 보안 프레임워크 및 가드레일 실증 연구」 연구책임자(연구 프로젝트 완료, 기관 운영 환경 미적용) — 국가정보원 N2SF AI 연계체계에 대응하는 기관 전용 LLM 가드레일 게이트웨이 프로토타입(송신 8단계·수신 6단계, RAG 권한 통제, 카나리아 토큰)와 평가셋 205문항·배포 게이트를 구축하여 놓친 공격 30%→0%, 정상 질의 오차단 2.6%→0%, 검사당 약 6ms(GPU 없음)를 실증.',
            '2026 하반기 과기정통부 계획에 따른 교내 웹 취약점 정기 점검 운영 — 계획 대상 점검률 99.4%, 상용 스캐너 미점검분은 nuclei 자체점검으로 해소, 취약 사이트 담당자에게 개별 조치 안내 및 재점검 관리.',
            '교내 인증서 자동화 체계 구축·운영(2026.05~) — 명령 한 줄 ACME 설치, 자가 업데이트 에이전트, 인증서 4지점 지문 대조, 80번을 열 수 없는 서버를 위한 DNS-01 위임 설계. 인증서 만료 0건.',
            '셀프서비스 웹 보안포털(SafeWeb) 설계 — 점검 신청, 서버 소유권 자동 확인, 외부 반출 없는 오프라인 한글 조치 리포트, 재점검 대조. AI 보조 개발에 검증 가능한 데이터 경계 적용.',
            '악성 URL IoC에 대한 위협 인텔리전스 판정 기준 수립(근거 등급화, 판정과 차단 범위 분리), KISA 주요정보통신기반시설 가이드를 원격 판정 가능한 서버 보안 기준 47개 항목으로 설계.',
            '웹 방화벽(WAF) 운영·튜닝 — 웹 계층 공격 차단과 오탐 최소화의 균형 유지.',
          ],
        },
        {
          period: '2025.07 — 2026.07',
          focus: '정보보안팀 · 거버넌스',
          points: [
            'KAIST 주요 정보화사업(AI·클라우드 기반 서비스 및 외부 연계 포함)에 대해 국가정보원(NIS)·과학기술정보통신부(MSIT)와 협력하여 연 100건 이상의 보안성 검토를 수행하고, 관련 법·지침·보안 기준을 적용.',
            '과기정통부 주관 정보보안·개인정보 감사에 대응 — 지적사항 원인 분석, 이의신청, 보완자료 작성을 주도하여 기관 정보보안 평가 등급을 상향하고, 재발 방지를 위한 내부 통제를 강화.',
            '전 부서 대상 정기·불시 보안 실태점검(실태점검·불시감찰)을 수행하여 규정 미준수와 잠재 취약점을 사고 이전에 발굴.',
            '모든 검토·감사를 국가정보원 사이버보안 기본지침에 기반해 아키텍처·접근통제·데이터 보호를 국가 기준에 맞춰 평가.',
            '매체 보안 통제(보안 USB, 매체제어 시스템, 저장매체 자성소거)를 운영하고, 실무자 교육을 직접 기획·진행했으며, 보안 정책과 예산을 관리.',
          ],
        },
        {
          period: '2020 — 2025.07',
          focus: '정보개발팀 · 학사 시스템',
          points: [
            '약 USD 130M 규모, 3년간 진행된 차세대 통합정보시스템의 핵심 실무자로서 학사 모듈(교과과정·수강신청·수업·졸업) 설계에 깊이 관여하고, 검증·테스트·운영 배포까지 성공적으로 완수.',
            '전산·전기전자·기계 등 여러 학과의 공통·전공 졸업요건 1,400건 이상을 검토·현행화하여 차세대 시스템에 재정비하고, 오랜 제도–시스템 불일치를 해소.',
            '졸업사정 예외처리와 인턴십·특강·대체교과목 반영 로직을 재설계하고, 논문 심사 관리(프로포절·디펜스·외부 심사위원)를 개선하여 반복 오류를 제거.',
            '학사 모듈의 보안·개인정보 보호 설계 — 역할(학생·교수·학과·학사팀)별 권한·접근통제 설계와 검증, 고유식별정보 등 개인정보 암호화와 화면·출력물 마스킹, 개인정보 영향평가 요건과 개인정보 처리 접속기록 반영, 오픈 전 보안 취약점 점검 결과 조치와 시큐어코딩 적용.',
            '차세대 전환과 맞물린 졸업 시즌에 2,000명 이상의 졸업 확정·학위 수여를 무중단으로 처리하고, 학위기·학위명·학위번호 발급 기능을 신규 구축하여 학적 정확성과 행정 신뢰도를 제고.',
          ],
        },
      ],
    },
    {
      period: '2020.01 — 2020.06',
      role: '연구원',
      org: 'TmaxSoft',
      location: '경기도 성남',
      points: [
        'Tomcat(WAS)과 Spring 프레임워크 기반 엔터프라이즈 제품을 개발·유지보수.',
        '레거시 제품을 Docker·Kubernetes를 사용해 클라우드 네이티브 인프라(Hyper Cloud)로 전환.',
      ],
    },
    {
      period: '2019.07 — 2019.08',
      role: '데이터 사이언티스트',
      org: 'Head Start',
      location: '미국 새너제이',
      points: ['실리콘밸리 여름 인턴십 기간 동안 데이터 사이언티스트로서 머신러닝 모델을 구축·평가.'],
    },
    {
      period: '2018 — 2019',
      role: '학부 연구원',
      org: '중앙대학교 분산플랫폼·보안 연구실',
      location: '서울',
      points: ['응용 보안 연구를 수행하여 IEEE 논문 게재와 특허 등록으로 이어짐(논문·특허 참고).'],
    },
  ],

  education: [
    {
      period: '2013 — 2020',
      title: '컴퓨터공학 학사',
      org: '중앙대학교',
      location: '서울',
      link: 'https://www.cau.ac.kr/',
    },
    {
      period: '2018 — 2019',
      title: '정보시스템 (교환학생)',
      org: 'ECE Paris',
      location: '프랑스 파리',
      link: 'https://www.ece.fr/',
    },
  ],

  skills: [
    {
      group: 'AI 보안',
      items: ['LLM 가드레일', '프롬프트 인젝션 방어', 'RAG 권한 통제', 'AI 레드팀 평가', 'OWASP LLM Top 10 · MITRE ATLAS', 'N2SF · AI 거버넌스'],
    },
    {
      group: '보안',
      items: ['웹 취약점 점검(nuclei)', 'SSL/TLS · PKI · ACME', '웹 방화벽(WAF)', '위협 인텔리전스 · IoC 판정', '악성코드 분석 · MITRE ATT&CK', '보안성검토 · 감사 · 정책'],
    },
    {
      group: 'AI / 머신러닝',
      items: ['머신러닝', '딥러닝', 'LLM · 생성형 AI', '한국어 NER(ONNX)', 'AI 코딩 에이전트'],
    },
    { group: '클라우드 · 인프라', items: ['Docker', 'Kubernetes', 'CI/CD', 'Linux · Windows Server', 'DNS'] },
    { group: '시스템 · 개발', items: ['Python', 'FastAPI', 'Java', 'Spring Framework', '엔터프라이즈 시스템'] },
  ],

  certifications: [
    {
      name: '정보처리기사',
      issuer: '과학기술정보통신부',
      date: '2024.09',
    },
    {
      name: 'OPIc — 영어: Advanced Low (AL) · 최고 등급',
      issuer: 'ACTFL',
      date: '2025.12',
      note: 'AL은 OPIc에서 부여하는 최고 등급 · 2027.12까지 유효',
    },
    { name: 'Cloud Computing 101 (클라우드 컴퓨팅 기초)' },
  ],

  training: [
    { name: '로컬 LLM 구축 및 실무 적용', issuer: '사이버안보훈련센터', date: '2026.06', hours: '21시간' },
    { name: '정보화사업 보안성 검토', issuer: '사이버안보훈련센터', date: '2026.05', hours: '7시간' },
  ],

  languages: [
    { name: '한국어', level: '모국어' },
    { name: '영어', level: '업무상 능숙', badge: 'OPIc AL · 최고 등급' },
    { name: '스페인어', level: '초급' },
    { name: '프랑스어', level: '초급' },
  ],

  honors: [
    {
      text: 'KAIST 특별표창 — 차세대 통합정보시스템 구축 (2025)',
      project: 'kaist-next-gen-information-system',
    },
    {
      text: 'SW 챌린지 동상 — 한국소프트웨어산업협회, 2019 (HighlightU)',
      image: '/awards/sw-challenge-bronze-2019.jpg',
      project: 'highlightu',
    },
    {
      text: '우수상 — 2019 다빈치 SW TECH-FAIR, 중앙대학교',
      image: '/awards/davinci-tech-fair-2019.jpg',
    },
  ],

  publications: [
    {
      type: '논문',
      title:
        'Recipient-Oriented Transaction for Preventing Double Spending Attacks in Private Blockchain',
      venue: 'IEEE SECON 2018 · 공저 M. Shin, K. S. Kim, Y. Kang, J. Kim',
      link: 'https://ieeexplore.ieee.org/document/8397151/',
    },
    {
      type: '특허',
      title:
        'Recipient-oriented transaction verification method and apparatus for preventing double spending',
      venue: 'KR 10-2018-0089040 · 2018',
    },
  ],
};

export const resume = { en: resumeEn, ko: resumeKo };
