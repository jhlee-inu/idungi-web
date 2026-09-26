# 이둥이네 닭갈비 웹사이트

React + JavaScript + Vite로 구성한 매장 소개 사이트입니다.
기존 화면, 메뉴 데이터, 로고·매장 사진 및 카카오맵 약도를 유지하면서 컴포넌트 구조로 이전했습니다.

## 로컬 실행

Node.js 22.12 이상이 필요합니다.

```bash
git clone https://github.com/jhlee-inu/idungi-web.git
cd idungi-web
npm ci
npm run dev
```

브라우저에서 http://localhost:3000 을 엽니다. 파일을 저장하면 Vite가 변경 사항을 반영합니다.
포트가 사용 중이면 터미널에 표시되는 주소로 접속하거나 `npm run dev -- --port 3001`을 사용하세요.
최초 설치 후 의존성이 바뀌지 않았다면 `npm run dev`만 실행하면 됩니다.

## React 전환 브랜치 받기

기존 로컬 작업은 먼저 커밋한 뒤 아래 명령을 실행하세요.

```bash
git fetch origin
git switch --track origin/refactor/react-js
npm ci
npm run dev
```

이미 같은 이름의 로컬 브랜치가 있으면 `git switch refactor/react-js`를 사용하세요.
이 브랜치가 main에 병합된 뒤에는 main에서 `git pull`하여 작업할 수 있습니다.

## 구조와 수정 위치

| 경로 | 역할 |
| --- | --- |
| src/main.jsx | React 시작점, 전역 CSS 로드 |
| src/App.jsx | 현재 페이지 선택 및 공통 레이아웃 |
| src/pages/HomePage.jsx | 메인 페이지 섹션 조합 |
| src/pages/FranchisePage.jsx | 가맹 안내 준비 페이지 |
| src/pages/MealKitPage.jsx | 밀키트 판매 준비 페이지 |
| src/components/Header.jsx, Footer.jsx, BrandLogo.jsx | 공통 헤더·푸터·로고 |
| src/components/Hero.jsx, BrandStory.jsx, NextChapter.jsx | 메인 소개·브랜드 이야기·확장 안내 |
| src/components/MenuSection.jsx | 메뉴 필터와 상세창 상태 |
| src/components/MenuDialog.jsx, MenuCatalog.jsx | 상세창 및 전체 메뉴판 |
| src/components/VisitSection.jsx, VisitGallery.jsx, KakaoMap.jsx | 매장 정보·주소 복사·사진·지도 |
| src/components/PreparationPage.jsx | 가맹·밀키트 준비 페이지의 공통 틀 |
| src/data/content.json | 메뉴·가격·주소·영업시간 등 매장 데이터 |
| src/styles/global.css | 기존 디자인과 반응형 스타일 |
| public/assets/ | 사진·로고·폰트 |
| public/kakao-map.html | 카카오맵 공식 약도 전용 문서 |
| src/test/ | 주요 사용자 동작 회귀 테스트 |
| vite.config.js | 개발·빌드·테스트 설정 |

JSX는 JavaScript 안에서 화면 구조를 표현하는 React 문법입니다. TypeScript는 사용하지 않습니다.
메인 화면은 메뉴와 매장 정보를 먼저 보여주고, 그 아래에 브랜드 이야기와 준비 중인 소식을 배치합니다.
가맹·밀키트 페이지는 각각의 내용 객체를 공통 페이지 틀에 전달합니다.
메뉴 필터와 선택 메뉴, 모바일 메뉴 및 복사 안내는 React 상태로 관리합니다.
외부 라이브러리 연동과 포커스 처리를 제외하고 기존 DOM 생성·수정 스크립트는 제거했습니다.

### HTML 파일이 남는 이유

루트의 index.html, franchise.html, meal-kit.html은 각각 React를 불러오는 작은 진입 파일입니다.
실제 화면은 src의 JSX 컴포넌트에서 수정합니다.
기존 .html 링크를 유지하고 정적 호스팅에서도 각 페이지를 직접 열 수 있도록 Vite 다중 페이지 빌드를 사용합니다.
별도의 React Router나 서버 rewrite 설정은 필요하지 않습니다.

카카오맵 공식 약도 로더는 document.write를 사용하므로 public/kakao-map.html 안에 격리했습니다.
React의 KakaoMap 컴포넌트가 iframe으로 이 문서를 표시하며, 외부 서비스 로딩에는 인터넷 연결이 필요합니다.
약도 식별자는 공개 삽입용 값이며 비밀 API 키가 아닙니다.

## 데이터·기능 상태

- 대표 메뉴와 전체 메뉴판에 같은 메뉴가 있으면 두 항목을 함께 수정하세요.
- 전화번호는 아직 null입니다. 확인한 번호를 넣으면 전화 연결이 표시됩니다.
- 지도에는 기존 등록 상호인 '춘천쌍둥이닭갈비 본점'이 표시됩니다.
- 음식 이미지는 AI 시안입니다. 실제 음식 사진으로 교체할 때 안내 캡션도 함께 수정하세요.
- 가맹·밀키트는 준비 페이지이며 주문·결제·예약 접수 백엔드는 없습니다.
- 기존 noindex/robots 설정은 유지했습니다. 실제 서비스 공개와 검색 노출 설정은 별도 작업입니다.

## 검증 및 빌드

```bash
npm test
npm run build
npm run preview
```

테스트는 메뉴 필터, 메뉴별 상세 내용, 모달 닫기·포커스 복귀, 전체 메뉴판,
모바일 탐색, 주소 복사 성공·실패, 전화 링크 및 각 페이지 선택을 검사합니다.
jsdom은 실제 브라우저가 아니므로 모달의 기본 동작 일부를 모사합니다.
실제 브라우저의 반응형 배치와 카카오맵 외부 로딩은 별도로 확인해야 합니다.

빌드 결과는 dist/이며 이 폴더 전체를 정적 호스팅에 배포할 수 있습니다.
dist/와 node_modules/는 Git에 올리지 않습니다. package-lock.json은 함께 관리합니다.
GitHub에 push해도 현재 Sites 사이트에 자동 배포되지는 않습니다.
Work와 VS Code의 코드는 GitHub에서 commit/push/pull로 주고받습니다.

## 참고

- [Vite 공식 시작 안내](https://vite.dev/guide/)
- [React 공식 시작 안내](https://react.dev/learn)
