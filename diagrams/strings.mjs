/**
 * Diagram copy, in both languages.
 *
 * Keeping Korean and English side by side in one file is deliberate: the two
 * diagrams must stay structurally identical, and drift is obvious here.
 * Edit text only — the layout lives in `templates.mjs`.
 */

export const strings = {
  ko: {
    lang: 'ko',
    org: 'KAIST 정보보안팀',

    arch: {
      title: '웹 인증서 자동화 · 전체 구조와 통신 경로',
      subtitle: '공인 인증서(Let’s Encrypt)를 각 웹서버가 스스로 발급하고 갱신한다',

      bandService: '서비스 트래픽 · WAF 경유',
      bandAcme: '인증서 자동화 · ACME HTTP-01',

      user: '외부 · 내부 사용자',
      userSub: '브라우저',

      gwWaf: '기관 관문 WAF',
      gwWafSub: '공인 와일드카드 인증서 *.kaist.ac.kr · 개인키 상주',
      wafBadge: 'ACME 챌린지 경로 패스스루 · 80',

      dcWaf: '전산실 전용 WAF',
      dcWafSub: '공인 와일드카드 인증서 · 개인키 상주',

      groupDc: '전산실 WAF 하위',
      groupGw: '관문 WAF 직속',

      srvA: '웹서버 A',
      srvASub: 'Nginx',
      srvAFoot: 'certbot · 자동 갱신',

      srvB: '웹서버 B',
      srvBSub: 'Apache',
      srvBFoot: 'certbot · 자동 갱신',

      srvC: '웹서버 C',
      srvCSub: 'IIS · Windows',
      srvCFoot: 'win-acme · 확장 예정',

      ca: 'Let’s Encrypt',
      caSub: '공인 인증기관 · ACME',
      caFoot: '별도 신뢰 설정 불필요',

      portal: '관리 포털',
      portalSub: '기관 SSO 연동',
      portalFoot: 'tracer 보고 수집 · 만료 알림',

      lblService: '443',
      lblOrder: '발급 주문 443',
      lblReport: 'tracer 보고 443',
      lblValidate: '소유 확인 80',

      legendTitle: '범례',
      legend: [
        ['line-dark', '서비스 트래픽 · WAF 경유'],
        ['line-amber', '소유 확인 · 외부에서 인바운드'],
        ['line-teal', '발급 · 갱신 · 상태 보고'],
        ['swatch-blue', '공인 와일드카드 보유 구간'],
        ['swatch-teal', '공인 인증서 · ACME 자동화 구간'],
      ],

      portsTitle: '통신 포트',
      portsHead: ['출발지', '목적지', '포트', '용도'],
      ports: [
        ['사용자', '관문 WAF', '443', '서비스', ''],
        ['관문 WAF', '전산실 WAF', '443', '전달', ''],
        ['WAF', '원본 웹서버', '443', '재암호화', ''],
        ['Let’s Encrypt', '관문 WAF', '80', '소유 확인', 'amber'],
        ['관문 WAF', '원본 웹서버', '80', '챌린지 패스스루', 'amber'],
        ['웹서버', 'Let’s Encrypt', '443', '발급 · 갱신', 'teal'],
        ['웹서버', '공용 DNS', '53', '이름 해석', 'teal'],
        ['웹서버', '관리 포털', '443', 'tracer 보고', 'teal'],
        ['웹서버', 'NTP', '123', '시각 동기', ''],
        ['관리자', '관리 포털', '443', 'SSO · 현황 조회', ''],
      ],

      stepsTitle: '흐름 설명',
      steps: [
        ['1', '개인키 생성 · 발급 주문', '웹서버가 개인키를 직접 만들고 Let’s Encrypt에 주문 (아웃바운드 443)', 'teal'],
        ['2', '챌린지 토큰 게시', '/.well-known/acme-challenge/ 경로에 확인 값을 올린다', 'teal'],
        ['3', '소유 확인', 'Let’s Encrypt가 80으로 접속 · WAF가 원본으로 패스스루', 'amber'],
        ['4', '발급 · 설치', '인증서 수신 후 설치 · reload · 갱신 타이머 등록', 'teal'],
        ['5', '상태 보고', 'tracer가 버전과 만료일을 주간 보고 · 10일 미보고 시 stale', 'teal'],
      ],

      summaryTitle: '사설 CA 없이, 공인 인증서로',
      summary: [
        '개인키는 서버 밖으로 나가지 않는다',
        '담당자 작업은 명령 1줄 · 이후 무관리',
        'Root CA 배포 · 신뢰 설정 단계가 통째로 사라진다',
      ],

      footnote: '인증서 발급·갱신은 각 웹서버가 Let’s Encrypt와 직접 수행한다.',
      footnoteSub:
        '소유 확인만 외부에서 80으로 들어오며, 관문 WAF가 /.well-known/acme-challenge/ 경로를 원본으로 통과시킨다.',
    },

    seq: {
      title: '인증서 자동 발급 · 갱신 통신 순서',
      subtitle: '웹서버가 관리 포털 · Let’s Encrypt · 공용 DNS와 주고받는 전 과정',

      lanes: [
        ['웹서버', '담당자가 작업하는 서버', 'gray'],
        ['관문 WAF', '공인 와일드카드 보유', 'blue'],
        ['Let’s Encrypt', '공인 인증기관 · ACME', 'teal'],
        ['공용 DNS', '외부에서 조회', 'gray'],
        ['관리 포털', '기관 SSO · 현황 관리', 'violet'],
      ],

      // [title, tone] — a step's `p` indexes into this, so inserting a step
      // never breaks the band boundaries.
      phases: [
        ['1단계 · 최초 1회 — 설치 스크립트 내려받기', 'amber'],
        ['2단계 · 인증서 발급 — ACME HTTP-01', 'teal'],
        ['3단계 · 자동 갱신 · 상태 가시성', 'violet'],
      ],

      steps: [
        { n: '①', p: 0, kind: 'self', lane: 0, text: '담당자가 명령 1줄 실행', tone: 'amber' },
        { n: '②', p: 0, kind: 'arrow', from: 0, to: 4, text: '설치 스크립트 · 등록 토큰 요청', port: '443', tone: 'amber' },
        { n: '③', p: 0, kind: 'arrow', from: 4, to: 0, text: '스크립트 · 토큰 응답', port: '', tone: 'amber' },
        { n: '④', p: 0, kind: 'self', lane: 0, text: '개인키 생성 · 서버 내부 보관', sub: '외부 반출 없음', tone: 'amber' },

        { n: '⑤', p: 1, kind: 'arrow', from: 0, to: 2, text: '인증서 발급 주문', port: '443', tone: 'teal' },
        { n: '⑥', p: 1, kind: 'arrow', from: 2, to: 0, text: '챌린지 토큰 응답', port: '', tone: 'teal' },
        { n: '⑦', p: 1, kind: 'self', lane: 0, text: '/.well-known/acme-challenge/ 에 토큰 게시', tone: 'teal' },
        { n: '⑧', p: 1, kind: 'arrow', from: 2, to: 3, text: '도메인 주소 조회', port: '53', tone: 'teal' },
        { n: '⑨', p: 1, kind: 'arrow', from: 3, to: 2, text: '관문 WAF 주소 응답', port: '', tone: 'teal' },
        { n: '⑩', p: 1, kind: 'arrow', from: 2, to: 1, text: '챌린지 요청', port: '80', tone: 'amber' },
        { n: '⑪', p: 1, kind: 'arrow', from: 1, to: 0, text: 'WAF가 원본으로 패스스루', port: '80', tone: 'amber' },
        { n: '⑫', p: 1, kind: 'arrow', from: 0, to: 1, text: '토큰 응답', port: '', tone: 'amber' },
        { n: '⑬', p: 1, kind: 'arrow', from: 1, to: 2, text: 'WAF가 응답 전달', port: '', tone: 'amber' },
        { n: '⑭', p: 1, kind: 'arrow', from: 2, to: 0, text: '검증 성공 · 인증서 발급', port: '', tone: 'teal' },
        { n: '⑮', p: 1, kind: 'self', lane: 0, text: '설치 · reload · 갱신 타이머 등록', tone: 'teal' },

        { n: '⑯', p: 2, kind: 'arrow', from: 0, to: 4, text: 'tracer 주간 보고 — 버전 · 만료일 · 갱신 상태', port: '443', tone: 'violet' },
      ],

      closingTitle: '만료 30일 전 ⑤ ~ ⑮ 를 스스로 반복한다 · 담당자 개입 없음',
      closingSub: '① ~ ④ 는 서버를 새로 설치할 때만 다시 수행한다',

      alertTitle: 'tracer가 10일 이상 보고하지 않으면 stale 경고',
      alertSub: '인증서가 만료되기 전에, 갱신하는 주체가 멈췄다는 사실을 먼저 잡아낸다',

      footnote: '⑩ ~ ⑬ 만 관문 WAF를 경유하고, 나머지는 웹서버가 직접 통신한다.',
      footnoteRight: 'Windows · IIS는 win-acme로 동일 흐름 확장 예정',
    },
  },

  en: {
    lang: 'en',
    org: 'KAIST Information Security Team',

    arch: {
      title: 'Web Certificate Automation — Architecture & Traffic Paths',
      subtitle: 'Every web server issues and renews its own publicly trusted (Let’s Encrypt) certificate',

      bandService: 'Service traffic · through the WAF',
      bandAcme: 'Certificate automation · ACME HTTP-01',

      user: 'External · internal users',
      userSub: 'Browser',

      gwWaf: 'Gateway WAF',
      gwWafSub: 'Public wildcard certificate *.kaist.ac.kr · private key resident',
      wafBadge: 'ACME challenge path passthrough · 80',

      dcWaf: 'Data-center WAF',
      dcWafSub: 'Public wildcard certificate · private key resident',

      groupDc: 'Behind the data-center WAF',
      groupGw: 'Directly behind the gateway WAF',

      srvA: 'Web server A',
      srvASub: 'Nginx',
      srvAFoot: 'certbot · auto-renewing',

      srvB: 'Web server B',
      srvBSub: 'Apache',
      srvBFoot: 'certbot · auto-renewing',

      srvC: 'Web server C',
      srvCSub: 'IIS · Windows',
      srvCFoot: 'win-acme · planned',

      ca: 'Let’s Encrypt',
      caSub: 'Public CA · ACME',
      caFoot: 'No trust setup needed',

      portal: 'Management portal',
      portalSub: 'Institutional SSO',
      portalFoot: 'Collects tracer reports · expiry alerts',

      lblService: '443',
      lblOrder: 'Order 443',
      lblReport: 'tracer report 443',
      lblValidate: 'Validation 80',

      legendTitle: 'Legend',
      legend: [
        ['line-dark', 'Service traffic · through the WAF'],
        ['line-amber', 'Ownership validation · inbound from outside'],
        ['line-teal', 'Issuance · renewal · status reporting'],
        ['swatch-blue', 'Holds the public wildcard certificate'],
        ['swatch-teal', 'Public certificate · ACME automation'],
      ],

      portsTitle: 'Communication ports',
      portsHead: ['From', 'To', 'Port', 'Purpose'],
      ports: [
        ['User', 'Gateway WAF', '443', 'Service', ''],
        ['Gateway WAF', 'Data-center WAF', '443', 'Forwarding', ''],
        ['WAF', 'Origin web server', '443', 'Re-encryption', ''],
        ['Let’s Encrypt', 'Gateway WAF', '80', 'Ownership validation', 'amber'],
        ['Gateway WAF', 'Origin web server', '80', 'Challenge passthrough', 'amber'],
        ['Web server', 'Let’s Encrypt', '443', 'Issuance / renewal', 'teal'],
        ['Web server', 'Public DNS', '53', 'Name resolution', 'teal'],
        ['Web server', 'Management portal', '443', 'tracer report', 'teal'],
        ['Web server', 'NTP', '123', 'Time sync', ''],
        ['Admin', 'Management portal', '443', 'SSO · dashboard', ''],
      ],

      stepsTitle: 'How it flows',
      steps: [
        ['1', 'Generate key · order', 'The server creates its own private key and orders from Let’s Encrypt (outbound 443)', 'teal'],
        ['2', 'Publish the challenge', 'It serves the token under /.well-known/acme-challenge/', 'teal'],
        ['3', 'Prove ownership', 'Let’s Encrypt connects on 80 · the WAF passes it through to the origin', 'amber'],
        ['4', 'Issue · install', 'The certificate is installed, the service reloads, a renewal timer is set', 'teal'],
        ['5', 'Report status', 'tracer reports version and expiry weekly · stale after 10 silent days', 'teal'],
      ],

      summaryTitle: 'Public certificates, no private CA',
      summary: [
        'The private key never leaves the server',
        'One command for the admin, then nothing',
        'Root CA distribution and trust setup disappear entirely',
      ],

      footnote: 'Each web server issues and renews directly with Let’s Encrypt.',
      footnoteSub:
        'Only the ownership check arrives from outside on port 80, and the gateway WAF passes /.well-known/acme-challenge/ through to the origin.',
    },

    seq: {
      title: 'Certificate issuance & renewal — communication sequence',
      subtitle: 'Everything the web server exchanges with the portal, Let’s Encrypt, and public DNS',

      lanes: [
        ['Web server', 'The server the admin works on', 'gray'],
        ['Gateway WAF', 'Holds the public wildcard', 'blue'],
        ['Let’s Encrypt', 'Public CA · ACME', 'teal'],
        ['Public DNS', 'Queried from outside', 'gray'],
        ['Management portal', 'Institutional SSO · fleet view', 'violet'],
      ],

      // [title, tone] — a step's `p` indexes into this, so inserting a step
      // never breaks the band boundaries.
      phases: [
        ['Step 1 · once — fetch the installer', 'amber'],
        ['Step 2 · issuance — ACME HTTP-01', 'teal'],
        ['Step 3 · automatic renewal & visibility', 'violet'],
      ],

      steps: [
        { n: '①', p: 0, kind: 'self', lane: 0, text: 'Admin runs one command', tone: 'amber' },
        { n: '②', p: 0, kind: 'arrow', from: 0, to: 4, text: 'Request installer · enrollment token', port: '443', tone: 'amber' },
        { n: '③', p: 0, kind: 'arrow', from: 4, to: 0, text: 'Installer · token returned', port: '', tone: 'amber' },
        { n: '④', p: 0, kind: 'self', lane: 0, text: 'Generate private key, keep it on the server', sub: 'never leaves the host', tone: 'amber' },

        { n: '⑤', p: 1, kind: 'arrow', from: 0, to: 2, text: 'Order a certificate', port: '443', tone: 'teal' },
        { n: '⑥', p: 1, kind: 'arrow', from: 2, to: 0, text: 'Challenge token returned', port: '', tone: 'teal' },
        { n: '⑦', p: 1, kind: 'self', lane: 0, text: 'Serve the token at /.well-known/acme-challenge/', tone: 'teal' },
        { n: '⑧', p: 1, kind: 'arrow', from: 2, to: 3, text: 'Resolve the domain', port: '53', tone: 'teal' },
        { n: '⑨', p: 1, kind: 'arrow', from: 3, to: 2, text: 'Gateway WAF address returned', port: '', tone: 'teal' },
        { n: '⑩', p: 1, kind: 'arrow', from: 2, to: 1, text: 'Challenge request', port: '80', tone: 'amber' },
        { n: '⑪', p: 1, kind: 'arrow', from: 1, to: 0, text: 'WAF passes it to the origin', port: '80', tone: 'amber' },
        { n: '⑫', p: 1, kind: 'arrow', from: 0, to: 1, text: 'Token served', port: '', tone: 'amber' },
        { n: '⑬', p: 1, kind: 'arrow', from: 1, to: 2, text: 'WAF returns the response', port: '', tone: 'amber' },
        { n: '⑭', p: 1, kind: 'arrow', from: 2, to: 0, text: 'Validated · certificate issued', port: '', tone: 'teal' },
        { n: '⑮', p: 1, kind: 'self', lane: 0, text: 'Install · reload · set the renewal timer', tone: 'teal' },

        { n: '⑯', p: 2, kind: 'arrow', from: 0, to: 4, text: 'tracer weekly report — version · expiry · renewal state', port: '443', tone: 'violet' },
      ],

      closingTitle: 'It repeats ⑤ – ⑮ on its own, 30 days before expiry · no admin involvement',
      closingSub: '① – ④ run again only when the server is rebuilt',

      alertTitle: 'No tracer report for 10 days raises a stale warning',
      alertSub: 'Catches the thing that renews failing, before the certificate itself expires',

      footnote: 'Only ⑩ – ⑬ traverse the gateway WAF; everything else the server does directly.',
      footnoteRight: 'Windows · IIS to follow the same flow via win-acme',
    },
  },
};
