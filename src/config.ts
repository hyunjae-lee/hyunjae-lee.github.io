/**
 * Site-wide configuration and resume content.
 * Edit these values to personalize the site — pages read from here.
 * Project entries live as Markdown files under `src/content/projects/`.
 */

export const site = {
  name: 'Hyunjae Lee',
  nameKo: '이현재',
  title: 'Hyunjae Lee — Information Security Engineer',
  tagline:
    'Hardening web services and enterprise systems — vulnerability assessment, TLS, and WAF — with a strong command of modern AI/ML.',
  bio: 'There is such a world to see.',
  url: 'https://hyunjae-lee.github.io',
  locale: 'en',
};

export const links = {
  github: 'https://github.com/hyunjae-lee',
  linkedin: 'https://www.linkedin.com/in/hyunjaedev',
  email: 'mailto:hyunjae@kaist.ac.kr',
};

// Avatar (from GitHub), served locally for speed/reliability.
export const avatar = '/profile.jpg';

export const nav = [
  { href: '/', label: 'Home' },
  { href: '/projects/', label: 'Projects' },
];

/**
 * Resume content, from your LinkedIn profile.
 * Kept here so the home page stays a clean template you can edit in one place.
 */
export const resume = {
  role: 'Information Security Engineer',
  location: 'Daejeon, Republic of Korea',
  available: 'Information Security Team · KAIST',

  summary:
    'Information Security Engineer at KAIST. My current focus (since July 2026) is web security — web application vulnerability assessment, ' +
    'SSL/TLS certificate management, and Web Application Firewall (WAF) operations. Before that I led information-security governance — ' +
    '100+ annual security reviews of KAIST’s major IT initiatives in collaboration with the NIS and MSIT, plus MSIT-led security and ' +
    'privacy audits grounded in the national Cybersecurity Guidelines — and spent five years operating core academic systems, including a ' +
    'key working-level role in a ~USD 130M next-generation information-system program, with earlier experience migrating enterprise products to cloud-native ' +
    'infrastructure (Docker, Kubernetes). I also bring a professional command of modern AI/ML — from classical machine learning to ' +
    'LLM-based tooling — and apply it to automate and sharpen security work.',

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
            'Operate and tune the Web Application Firewall (WAF), maintaining rule sets and policies that block web-layer attacks while minimizing false positives.',
            'Apply automation and AI-assisted analysis to accelerate vulnerability triage and anomaly detection.',
          ],
        },
        {
          period: 'Jul 2025 — Jul 2026',
          focus: 'Information Security Team · Governance',
          points: [
            'Led 100+ security reviews (보안성검토) per year across KAIST’s major IT initiatives — including AI-enabled systems and commercial cloud-service adoption — in direct collaboration with the National Intelligence Service (NIS) and the Ministry of Science and ICT (MSIT).',
            'Conducted information-security and personal-data-protection audits under the Ministry of Science and ICT (MSIT), evaluating controls, compliance, and risk across the institution.',
            'Anchored every review and audit in the NIS Cybersecurity Guidelines (국가정보원 사이버보안 기본지침), applying its control baselines to assess architecture, access control, and data protection against national standards.',
            'Governed storage and removable-media security, and developed and revised the institution’s information-security policies, standards, and guidelines.',
          ],
        },
        {
          period: '2020 — Jul 2025',
          focus: 'IT Team · Academic Systems',
          points: [
            'Operated the Academic Affairs and Graduation Management systems, ensuring reliability of mission-critical services.',
            'Served as a core working-level member for the academic module of a ~USD 130M Next-Generation Integrated Information System.',
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
  ] as Array<{
    period: string;
    role: string;
    org: string;
    location: string;
    points?: string[];
    phases?: Array<{ period: string; focus: string; points: string[] }>;
  }>,

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
  ] as Array<{ period: string; title: string; org: string; location: string; link?: string }>,

  // Grouped skills read cleaner on a resume than one long list.
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
      name: 'OPIc — English: Advanced Low (AL)',
      issuer: 'ACTFL',
      date: 'Dec 2025',
      note: 'Highest OPIc rating · valid through Dec 2027',
    },
    {
      name: 'Cloud Computing 101 (클라우드 컴퓨팅 기초)',
    },
  ] as Array<{ name: string; issuer?: string; date?: string; note?: string }>,

  languages: [
    { name: 'Korean', level: 'Native' },
    { name: 'English', level: 'Professional Working · OPIc AL (highest rating)' },
    { name: 'Spanish', level: 'Elementary' },
    { name: 'French', level: 'Elementary' },
  ],

  honors: [
    'Special Commendation, KAIST — Next-Generation Integrated Information System (2025)',
    'Bronze Prize — 2019 SW Challenge, Korea Software Industry Association (HighlightU)',
    'Excellence Award — 2019 DaVinci SW TECH-FAIR, Chung-Ang University',
  ],

  // Academic output from earlier research — kept as a credential.
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
  ] as Array<{ type: string; title: string; venue?: string; link?: string }>,
};
