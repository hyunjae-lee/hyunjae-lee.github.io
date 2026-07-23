/**
 * Site-wide configuration and resume content.
 * Edit these values to personalize the site — pages read from here.
 * Project entries live as Markdown files under `src/content/projects/`.
 */

export const site = {
  name: 'Hyunjae Lee',
  nameKo: '이현재',
  title: 'Hyunjae Lee — Infrastructure & Security Engineer',
  tagline: 'Building secure, resilient systems that scale.',
  taglineKo: '안전하고 견고한 시스템을 설계하고 운영합니다.',
  url: 'https://hyunjae-lee.github.io',
  locale: 'en',
};

export const links = {
  github: 'https://github.com/hyunjae-lee',
  linkedin: 'https://www.linkedin.com/in/hyunjaedev',
  email: 'mailto:hyunjae@kaist.ac.kr',
};

export const nav = [
  { href: '/', label: 'Home' },
  { href: '/projects/', label: 'Projects' },
];

/**
 * Resume content. This is placeholder — replace with your real history.
 * Kept here so the home page stays a clean template you can edit in one place.
 */
export const resume = {
  role: 'Infrastructure & Security Engineer',
  location: 'Daejeon, South Korea',
  available: 'Open to new opportunities',

  // 2–3 sentence intro, first person. Sets the tone of the whole page.
  summary:
    'I design and operate infrastructure with security built in from the start. ' +
    'My focus is reliability, automation, and reducing risk before it reaches production — ' +
    'turning complex systems into ones a team can trust and reason about.',

  experience: [
    {
      period: '2022 — Present',
      role: 'Infrastructure & Security Engineer',
      org: 'Company A',
      location: 'Seoul, KR',
      points: [
        'Led cloud infrastructure operations and built Infrastructure-as-Code automation, cutting provisioning time significantly.',
        'Established security policies and a vulnerability-response process adopted across engineering teams.',
        'Reduced mean-time-to-detect for incidents by rolling out centralized logging, metrics, and alerting.',
      ],
    },
    {
      period: '2019 — 2022',
      role: 'Systems Engineer',
      org: 'Company B',
      location: 'Seoul, KR',
      points: [
        'Operated on-prem servers and networking, and stood up the team’s first monitoring stack.',
        'Standardized incident response and backup/recovery procedures.',
      ],
    },
  ],

  education: [
    {
      period: '2015 — 2019',
      title: 'B.S. in Computer Science',
      org: 'KAIST',
      location: 'Daejeon, KR',
    },
  ],

  // Grouped skills read cleaner on a resume than one long list.
  skills: [
    { group: 'Infrastructure', items: ['Linux', 'Kubernetes', 'Terraform', 'AWS', 'Docker'] },
    { group: 'Security', items: ['IAM', 'Zero Trust', 'Vulnerability Mgmt', 'DevSecOps'] },
    { group: 'Observability', items: ['Prometheus', 'Grafana', 'ELK'] },
    { group: 'Languages', items: ['Python', 'Go', 'Bash', 'TypeScript'] },
  ],
};
