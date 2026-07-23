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
    'Securing large-scale systems through audits, reviews, and sound policy — grounded in years of building the infrastructure underneath.',
  bio: 'There is such a world to see.',
  url: 'https://hyunjae-lee.github.io',
  locale: 'en',
};

export const links = {
  github: 'https://github.com/hyunjae-lee',
  linkedin: 'https://www.linkedin.com/in/hyunjaedev',
  email: 'mailto:hyunjae@kaist.ac.kr',
  personal:
    'https://grove-gazelle-23b.notion.site/HyunjaeLee-80af4b603f5b488590a7eb779b6e4038',
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
    'Information Security Engineer at KAIST. Since July 2025 I have been on the Information Security team, where I lead security audits and reviews, ' +
    'govern storage and removable-media security, and drive the institution’s information-security policies and guidelines. ' +
    'Before that I spent five years operating core academic systems — including a key working-level role in a ~USD 130M next-generation information-system program — ' +
    'with earlier experience migrating enterprise products to cloud-native infrastructure (Docker, Kubernetes, Istio).',

  experience: [
    {
      period: '2020 — Present',
      role: 'Engineer (기술원)',
      org: 'KAIST',
      location: 'Daejeon, KR',
      points: [
        'Information Security Team (since Jul 2025): lead internal information-security audits, assessing systems and controls against policy and driving remediation.',
        'Perform security reviews (보안성검토) of new and changed systems before deployment — architecture, access control, and data protection.',
        'Govern storage and removable-media security: portable-media controls, data-at-rest handling, and secure disposal.',
        'Author and revise the institution’s information-security policies, standards, and guidelines.',
        'IT Team (2020–2025): operated the Academic Affairs and Graduation Management systems and was a core working-level member for the academic module of a ~USD 130M Next-Generation Integrated Information System.',
      ],
    },
    {
      period: 'Jan — Jun 2020',
      role: 'Researcher',
      org: 'TmaxSoft',
      location: 'Seongnam, KR',
      points: [
        'Developed and maintained enterprise products built on Tomcat (WAS) and the Spring Framework.',
        'Migrated legacy products to cloud-native infrastructure (Hyper Cloud) using Docker, Kubernetes, Envoy, and Istio.',
      ],
    },
    {
      period: 'Jul — Aug 2019',
      role: 'Data Scientist',
      org: 'Head Start',
      location: 'San Jose, CA',
      points: ['Summer data-science internship in Silicon Valley.'],
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
  ] as Array<{ period: string; title: string; org: string; location: string; link?: string }>,

  // Grouped skills read cleaner on a resume than one long list.
  skills: [
    {
      group: 'Security',
      items: [
        'Security Audit',
        'Security Review (보안성검토)',
        'Data & Media Protection',
        'Policy & Governance',
        'Risk & Compliance',
      ],
    },
    { group: 'Cloud & Infrastructure', items: ['Docker', 'Kubernetes', 'Istio', 'Envoy'] },
    { group: 'Systems & Development', items: ['Java', 'Spring Framework', 'Enterprise Systems'] },
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
    'Excellence Award — 2019 DaVinci SW TECH-FAIR',
    'Award by the Dean, College of Software, Chung-Ang University',
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
