/**
 * Site-wide configuration and placeholder content.
 * Edit these values to personalize the site — pages read from here.
 */

export const site = {
  name: 'Hyunjae Lee',
  nameKo: '이현재',
  title: 'Hyunjae Lee — 정보보안 · 인프라 엔지니어',
  tagline: '안전하고 견고한 인프라를 설계하고 운영합니다.',
  taglineEn: 'Designing and operating secure, resilient infrastructure.',
  url: 'https://hyunjae-lee.github.io',
  locale: 'ko',
};

export const links = {
  github: 'https://github.com/hyunjae-lee',
  linkedin: 'https://www.linkedin.com/in/hyunjae-lee',
  email: 'mailto:hello@example.com',
};

export const nav = [
  { href: '/', label: 'Home' },
  { href: '/about/', label: 'About' },
  { href: '/projects/', label: 'Projects' },
];

/** Placeholder project cards — replace with real work. */
export const projects = [
  {
    title: '사내 인프라 모니터링 파이프라인',
    titleEn: 'Infra Monitoring Pipeline',
    description:
      '분산 로그·메트릭 수집과 알림 자동화를 구축해 장애 감지 시간을 단축한 프로젝트입니다.',
    tags: ['Prometheus', 'Grafana', 'Alerting'],
    href: '#',
    year: '2024',
  },
  {
    title: '제로 트러스트 접근 통제 도입',
    titleEn: 'Zero Trust Access Control',
    description:
      '내부 서비스에 대한 최소 권한 원칙과 다단계 인증을 적용해 공격 표면을 축소했습니다.',
    tags: ['IAM', 'MFA', 'Security'],
    href: '#',
    year: '2023',
  },
  {
    title: '컨테이너 이미지 취약점 스캐닝',
    titleEn: 'Container Image Scanning',
    description:
      'CI 파이프라인에 이미지 취약점 스캔을 통합해 배포 전 위험을 자동으로 차단했습니다.',
    tags: ['CI/CD', 'Trivy', 'DevSecOps'],
    href: '#',
    year: '2023',
  },
];
