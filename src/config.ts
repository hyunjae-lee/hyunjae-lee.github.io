/**
 * Site-wide configuration and resume content.
 * Edit these values to personalize the site — pages read from here.
 * Project entries live as Markdown files under `src/content/projects/`.
 */

export const site = {
  name: 'Hyunjae Lee',
  nameKo: '이현재',
  title: 'Hyunjae Lee — Security & Infrastructure Engineer',
  tagline:
    'Keeping critical systems secure and reliable — from security audits and policy to cloud-native infrastructure.',
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

export const nav = [
  { href: '/', label: 'Home' },
  { href: '/projects/', label: 'Projects' },
];

/**
 * Resume content, from your LinkedIn profile.
 * Kept here so the home page stays a clean template you can edit in one place.
 */
export const resume = {
  role: 'Security & Infrastructure Engineer',
  location: 'Daejeon, Republic of Korea',
  available: 'Engineer at KAIST',

  summary:
    'Engineer at KAIST, currently on the Information Security team — leading security audits and reviews and driving information-security policy. ' +
    'For five years I operated core academic systems, including a key working-level role in a ~USD 130M next-generation information-system program. ' +
    'My background also spans cloud-native infrastructure (Docker, Kubernetes, Istio) and applied research in blockchain security.',

  experience: [
    {
      period: '2020 — Present',
      role: 'Engineer (기술원)',
      org: 'KAIST',
      location: 'Daejeon, KR',
      points: [
        'Information Security Team (2025–present): lead security audits and reviews, manage storage and removable-media security, and drive the development and revision of information-security policies and guidelines.',
        'IT Team (2020–2025): operated the Academic Affairs and Graduation Management systems, and served as a core working-level member for the academic module of a ~USD 130M Next-Generation Integrated Information System.',
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
        'Researched blockchain security; the work led to an IEEE publication and a patent on preventing double-spending in private blockchains.',
      ],
    },
  ],

  education: [
    {
      period: '2013 — 2020',
      title: 'B.S., Computer Science & Engineering',
      org: 'Chung-Ang University',
      location: 'Seoul, KR',
    },
    {
      period: '2018 — 2019',
      title: 'Information Systems (Exchange)',
      org: 'ECE Paris',
      location: 'Paris, FR',
    },
  ],

  // Grouped skills read cleaner on a resume than one long list.
  skills: [
    { group: 'Security', items: ['Security Audit', 'Security Review', 'InfoSec Policy', 'Compliance'] },
    { group: 'Cloud & Infrastructure', items: ['Docker', 'Kubernetes', 'Istio', 'Envoy'] },
    { group: 'Development', items: ['Java', 'Spring Framework', 'Software Development'] },
    { group: 'Focus Areas', items: ['Machine Learning', 'Blockchain Security'] },
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
      note: 'Valid through Dec 2027',
    },
    {
      name: 'Cloud Computing 101 (클라우드 컴퓨팅 기초)',
    },
  ] as Array<{ name: string; issuer?: string; date?: string; note?: string }>,

  languages: [
    { name: 'Korean', level: 'Native' },
    { name: 'English', level: 'Professional Working (OPIc AL)' },
    { name: 'Spanish', level: 'Elementary' },
    { name: 'French', level: 'Elementary' },
  ],

  honors: [
    'Excellence Award — 2019 DaVinci SW TECH-FAIR',
    'Award by the Dean, College of Software, Chung-Ang University',
  ],

  // Real entries from your profile. Venue/number can be refined anytime.
  publications: [
    {
      type: 'Paper',
      title:
        'Recipient-Oriented Transaction for Preventing Double Spending Attacks in Private Blockchain',
      venue: 'IEEE, 2018',
      link: 'https://ieeexplore.ieee.org/document/8397151/',
    },
    {
      type: 'Patent',
      title:
        'Recipient-oriented transaction verification method and apparatus for preventing double spending',
      venue: 'Patent',
    },
  ] as Array<{ type: string; title: string; venue?: string; link?: string }>,
};
