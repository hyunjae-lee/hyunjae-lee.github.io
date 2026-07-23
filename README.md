# hyunjae-lee.github.io

개인 포트폴리오 사이트 — **Astro + Tailwind CSS**로 만든 미니멀 정적 사이트.

## 요구 사항

- **Node.js 18.20+ / 20.3+ / 22+** (LTS 권장)
- npm (Node 설치 시 함께 제공)

> 현재 환경에는 Node.js가 설치되어 있지 않습니다. [nodejs.org](https://nodejs.org/)에서
> LTS 버전을 설치한 뒤 아래 명령을 실행하세요.

## 로컬 개발

```bash
npm install      # 의존성 설치 (최초 1회)
npm run dev      # http://localhost:4321 에서 개발 서버 실행
```

| 명령 | 설명 |
| --- | --- |
| `npm run dev` | 개발 서버 (`localhost:4321`) |
| `npm run build` | 정적 사이트를 `dist/` 로 빌드 |
| `npm run preview` | 빌드 결과 로컬 미리보기 |

## 구조

```
src/
├─ config.ts              # 이름·링크·프로젝트 등 콘텐츠 (여기부터 수정)
├─ layouts/BaseLayout.astro
├─ components/            # Header, Footer, ThemeToggle, ProjectCard
├─ pages/                 # index(홈) / about / projects
├─ content/blog/          # 블로그(향후 확장용, 구조만 준비)
└─ styles/global.css      # Tailwind + 다크모드 변수
```

## 콘텐츠 수정

- 이름·소개·소셜 링크·프로젝트 카드 → **`src/config.ts`**
- 경력·스킬 → **`src/pages/about.astro`**
- 색상/폰트(포인트 컬러 등) → **`src/styles/global.css`**

## 배포 (GitHub Pages)

`main` 브랜치에 push하면 GitHub Actions가 자동으로 빌드·배포합니다.

**최초 1회 설정:** GitHub 저장소 → **Settings → Pages → Build and deployment →
Source** 를 **GitHub Actions** 로 지정하세요.

워크플로우: [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)

## 다크 모드

- 우측 상단 토글 버튼으로 전환하며 선택은 `localStorage`에 저장됩니다.
- 최초 방문 시에는 OS 설정(`prefers-color-scheme`)을 따릅니다.
