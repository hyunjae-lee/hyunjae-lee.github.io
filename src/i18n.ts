export type Lang = 'en' | 'ko';
export const languages: Lang[] = ['en', 'ko'];
export const defaultLang: Lang = 'en';

/** UI strings (non-resume). Resume content lives in config.ts under resume[lang]. */
export const ui: Record<Lang, Record<string, string>> = {
  en: {
    'nav.home': 'Home',
    'nav.projects': 'Projects',
    'nav.blog': 'Blog',
    'resume.pdfKo': '이력서 (국문)',
    'resume.pdfEn': 'Resume (EN)',
    'blog.title': 'Blog',
    'blog.intro': 'Field notes from security work — methods, write-ups, and what I learned. Most posts are written in Korean.',
    'blog.empty': 'No posts yet.',
    'blog.otherLang': 'Korean',
    'action.backToBlog': '← Back to blog',
    'action.relatedProject': 'Related project →',
    'section.experience': 'Experience',
    'section.about': 'About',
    'section.writing': 'Recent writing',
    'section.allPosts': 'All posts →',
    'section.credentials': 'Credentials',
    'hero.download': 'Download resume',
    'hero.contact': 'Contact',
    'section.now': 'Now building',
    'section.selected': 'Selected work',
    'section.allProjects': 'All projects →',
    'section.skills': 'Skills',
    'section.languages': 'Languages',
    'section.certifications': 'Certifications',
    'section.training': 'Training',
    'section.publications': 'Publications & Patents',
    'section.honors': 'Honors & Awards',
    'section.education': 'Education',
    'contact.title': 'Get in touch',
    'contact.blurb':
      'Interested in security, infrastructure, or a possible collaboration? I’m always happy to connect.',
    'action.viewCertificate': 'view certificate',
    'action.viewProject': 'view project →',
    'action.readMore': 'Read more →',
    'action.backToProjects': '← Back to projects',
    'label.inProgress': 'In progress',
    'label.live': 'Live ↗',
    'label.source': 'Source ↗',
    'projects.title': 'Projects',
    'projects.intro': 'A selection of things I’ve built — across security, systems, and applied AI.',
    'projects.empty': 'No projects published yet.',
    'a11y.skip': 'Skip to content',
    'a11y.langSwitch': 'Read this page in Korean',
    'dialog.image': 'Enlarged image',
    'dialog.close': 'Close',
    'lightbox.hint': 'Scroll to pan · tap outside or press Esc to close',
    'lang.switchLabel': 'KR',
    'notFound.tag': '404',
    'notFound.title': 'Page not found',
    'notFound.body': 'The page you’re looking for doesn’t exist or has moved.',
    'notFound.home': 'Back home',
  },
  ko: {
    'nav.home': '홈',
    'nav.projects': '프로젝트',
    'nav.blog': '블로그',
    'resume.pdfKo': '이력서 (국문)',
    'resume.pdfEn': 'Resume (영문)',
    'blog.title': '블로그',
    'blog.intro': '보안 실무에서 남긴 기록 — 방법론, 분석 노트, 그리고 배운 것들.',
    'blog.empty': '아직 글이 없습니다.',
    'blog.otherLang': 'English',
    'action.backToBlog': '← 블로그로 돌아가기',
    'action.relatedProject': '관련 프로젝트 →',
    'section.experience': '경력',
    'section.about': '소개',
    'section.writing': '최근 글',
    'section.allPosts': '전체 글 →',
    'section.credentials': '자격 · 교육',
    'hero.download': '이력서 내려받기',
    'hero.contact': '연락처',
    'section.now': '지금 준비 중',
    'section.selected': '주요 프로젝트',
    'section.allProjects': '전체 프로젝트 →',
    'section.skills': '기술',
    'section.languages': '언어',
    'section.certifications': '자격증',
    'section.training': '교육 이수',
    'section.publications': '논문 · 특허',
    'section.honors': '수상 · 표창',
    'section.education': '학력',
    'contact.title': '연락하기',
    'contact.blurb': '보안, 인프라, 또는 협업에 관심 있으신가요? 언제든 편하게 연락 주세요.',
    'action.viewCertificate': '상장 보기',
    'action.viewProject': '프로젝트 보기 →',
    'action.readMore': '자세히 보기 →',
    'action.backToProjects': '← 프로젝트로 돌아가기',
    'label.inProgress': '진행 중',
    'label.live': '라이브 ↗',
    'label.source': '소스 ↗',
    'projects.title': '프로젝트',
    'projects.intro': '보안, 시스템, 그리고 응용 AI 전반에 걸쳐 진행한 작업들입니다.',
    'projects.empty': '아직 공개된 프로젝트가 없습니다.',
    'a11y.skip': '본문으로 건너뛰기',
    'a11y.langSwitch': 'Read this page in English',
    'dialog.image': '확대한 이미지',
    'dialog.close': '닫기',
    'lightbox.hint': '드래그하여 이동 · 바깥을 탭하거나 Esc로 닫기',
    'lang.switchLabel': 'EN',
    'notFound.tag': '404',
    'notFound.title': '페이지를 찾을 수 없습니다',
    'notFound.body': '찾으시는 페이지가 없거나 이동되었습니다.',
    'notFound.home': '홈으로',
  },
};

export const navItems = [
  { key: 'nav.home', path: '/' },
  { key: 'nav.projects', path: '/projects/' },
  { key: 'nav.blog', path: '/blog/' },
];

export function t(lang: Lang, key: string): string {
  return ui[lang][key] ?? ui.en[key] ?? key;
}

/** Prefix a root-relative path for the given locale ('/x' -> '/ko/x' for ko). */
export function localizePath(path: string, lang: Lang): string {
  const clean = '/' + path.replace(/^\/+/, '');
  if (lang === defaultLang) return clean;
  return ('/' + lang + clean).replace(/\/+$/, '/') === '/' ? `/${lang}/` : `/${lang}${clean}`;
}

/** The same page in the other language, derived from the current pathname. */
export function alternatePath(pathname: string, current: Lang): string {
  const other: Lang = current === 'en' ? 'ko' : 'en';
  // Strip any existing locale prefix to get the canonical (en) path.
  let base = pathname.replace(/^\/(ko|en)(?=\/|$)/, '');
  if (base === '') base = '/';
  if (!base.startsWith('/')) base = '/' + base;
  // Blog posts exist in one language only — switch to the other locale's blog index instead.
  if (/^\/blog\/[^/]+/.test(base)) base = '/blog/';
  if (other === defaultLang) return base;
  return base === '/' ? `/${other}/` : `/${other}${base}`;
}
