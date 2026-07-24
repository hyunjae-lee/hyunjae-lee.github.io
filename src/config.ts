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
    'Hardening web services and enterprise systems — vulnerability assessment, TLS, and WAF — with a strong command of modern AI/ML.',
  bio: 'There is such a world to see.',
  role: 'Information Security Engineer',
  location: 'Daejeon, Republic of Korea',
  available: 'Information Security Team · KAIST',

  summary:
    'Information Security Engineer at KAIST. My current focus (since July 2026) is ' +
    '<span class="font-semibold text-accent-600 dark:text-accent-400">web security</span> — ' +
    '<strong class="text-zinc-900 dark:text-zinc-100">web application vulnerability assessment</strong>, ' +
    '<strong class="text-zinc-900 dark:text-zinc-100">SSL/TLS certificate management</strong>, and ' +
    '<strong class="text-zinc-900 dark:text-zinc-100">Web Application Firewall (WAF)</strong> operations. ' +
    'Before that I led information-security governance — ' +
    '<strong class="text-zinc-900 dark:text-zinc-100">100+ annual security reviews</strong> of KAIST’s major IT initiatives in ' +
    'collaboration with the <strong class="text-zinc-900 dark:text-zinc-100">NIS and MSIT</strong>, plus ' +
    '<strong class="text-zinc-900 dark:text-zinc-100">MSIT-led security &amp; privacy audits</strong> grounded in the national ' +
    '<strong class="text-zinc-900 dark:text-zinc-100">Cybersecurity Guidelines</strong> — and spent five years operating core academic ' +
    'systems, including a key working-level role in a <strong class="text-zinc-900 dark:text-zinc-100">~USD 130M</strong> ' +
    'next-generation information-system program, with earlier experience migrating enterprise products to ' +
    '<strong class="text-zinc-900 dark:text-zinc-100">cloud-native infrastructure (Docker, Kubernetes)</strong>. I also bring a ' +
    '<span class="font-semibold text-accent-600 dark:text-accent-400">professional command of modern AI/ML</span> — from classical ' +
    'machine learning to <strong class="text-zinc-900 dark:text-zinc-100">LLM-based tooling</strong> — and apply it to automate and ' +
    'sharpen security work.',

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
            'Lead web application vulnerability assessment and analysis — identifying and validating flaws, prioritizing by risk, and coordinating remediation with service owners.',
            'Manage the SSL/TLS certificate lifecycle across web services — issuance, renewal, and deployment — enforcing strong cryptographic configurations and preventing expiry-driven outages.',
            'Designing and building an automated internal PKI — a private ACME CA (step-ca) — so server certificates issue and renew hands-off, eliminating manual network-team requests and expiry outages.',
            'Operate and tune the Web Application Firewall (WAF), maintaining rule sets and policies that block web-layer attacks while minimizing false positives.',
            'Apply automation and AI-assisted analysis to accelerate vulnerability triage and anomaly detection.',
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
      group: 'Security',
      items: [
        'Web Vulnerability Assessment',
        'SSL/TLS & PKI',
        'Web Application Firewall (WAF)',
        'Security Audit & Review',
        'Policy & Governance',
      ],
    },
    {
      group: 'AI / Machine Learning',
      items: ['Machine Learning', 'Deep Learning', 'LLMs & Generative AI', 'Applied AI for Security'],
    },
    { group: 'Cloud & Infrastructure', items: ['Docker', 'Kubernetes'] },
    { group: 'Systems & Development', items: ['Java', 'Python', 'Spring Framework', 'Enterprise Systems'] },
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
    '웹 서비스와 엔터프라이즈 시스템을 견고하게 — 취약점 점검, TLS, WAF, 그리고 탄탄한 AI/ML 역량까지.',
  bio: 'There is such a world to see.',
  role: '정보보안 엔지니어',
  location: '대한민국 대전',
  available: '정보보안팀 · KAIST',

  summary:
    '<span class="font-semibold text-accent-600 dark:text-accent-400">웹 보안</span>을 중심으로 일하는 KAIST 정보보안 엔지니어입니다. ' +
    '현재(2026년 7월~)는 <strong class="text-zinc-900 dark:text-zinc-100">웹 애플리케이션 취약점 점검·분석</strong>, ' +
    '<strong class="text-zinc-900 dark:text-zinc-100">SSL/TLS 인증서 관리</strong>, ' +
    '<strong class="text-zinc-900 dark:text-zinc-100">웹 방화벽(WAF) 운영</strong>을 담당합니다. ' +
    '그전에는 정보보안 거버넌스를 이끌며, 국가정보원(NIS)·과학기술정보통신부(MSIT)와 협력해 KAIST 주요 정보화사업에 대한 ' +
    '<strong class="text-zinc-900 dark:text-zinc-100">연 100건 이상의 보안성 검토</strong>를 수행하고, 국가 ' +
    '<strong class="text-zinc-900 dark:text-zinc-100">사이버보안 기본지침</strong>에 기반한 ' +
    '<strong class="text-zinc-900 dark:text-zinc-100">과기정통부 주관 정보보안·개인정보 감사</strong>에 대응했습니다. ' +
    '또한 5년간 핵심 학사 시스템을 운영하며 <strong class="text-zinc-900 dark:text-zinc-100">약 USD 130M</strong> 규모의 ' +
    '차세대 정보시스템 구축에 핵심 실무자로 참여했고, 이전에는 엔터프라이즈 제품을 ' +
    '<strong class="text-zinc-900 dark:text-zinc-100">클라우드 네이티브 인프라(Docker, Kubernetes)</strong>로 전환한 경험이 있습니다. ' +
    '아울러 고전 머신러닝부터 <strong class="text-zinc-900 dark:text-zinc-100">LLM 기반 도구</strong>까지 ' +
    '<span class="font-semibold text-accent-600 dark:text-accent-400">현대 AI/ML에 대한 전문적 이해와 숙련도</span>를 갖추고, ' +
    '이를 보안 업무의 자동화와 고도화에 활용합니다.',

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
            '웹 애플리케이션 취약점 점검·분석을 주도 — 취약점 식별·검증, 위험도 기반 우선순위화, 서비스 담당자와의 조치 협업.',
            'SSL/TLS 인증서 수명주기 관리 — 발급·갱신·배포, 강력한 암호화 설정 적용, 만료로 인한 장애 예방.',
            '사설 ACME 인증기관(step-ca) 기반 사내 인증서 자동화(PKI)를 설계·구축 — 서버 인증서를 무인 발급·갱신하여 통신팀 반복 요청과 만료 장애를 제거.',
            '웹 방화벽(WAF) 운영·튜닝 — 웹 계층 공격을 차단하는 룰셋·정책을 유지하며 오탐을 최소화.',
            '자동화와 AI 보조 분석을 활용해 취약점 트리아지와 이상 탐지를 가속.',
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
      group: '보안',
      items: ['웹 취약점 점검', 'SSL/TLS · PKI', '웹 방화벽(WAF)', '보안감사 · 보안성검토', '정책 · 거버넌스'],
    },
    {
      group: 'AI / 머신러닝',
      items: ['머신러닝', '딥러닝', 'LLM · 생성형 AI', '보안 응용 AI'],
    },
    { group: '클라우드 · 인프라', items: ['Docker', 'Kubernetes'] },
    { group: '시스템 · 개발', items: ['Java', 'Python', 'Spring Framework', '엔터프라이즈 시스템'] },
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
