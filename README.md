# 이둥이네 닭갈비 — 로컬 개발용

2026-09-25 작업본. HTML, CSS, JavaScript로 만든 정적 사이트입니다.
로고 크기·간격 조정 및 카카오맵 약도 연결 작업을 포함합니다.
이 파일 묶음은 현재 작업 코드이며, 기존 사이트에 배포된 버전과 다를 수 있습니다.

## 내 컴퓨터에서 실행

1. Node.js와 Git을 설치합니다. Node.js 22 이상을 사용하세요.
2. 이 폴더를 VS Code에서 엽니다.
3. VS Code 터미널에서 실행합니다.

```bash
npm run dev
```

브라우저에서 http://localhost:3000 을 엽니다.
외부 npm 패키지가 없어 `npm install`은 필요하지 않습니다.
파일을 수정하고 저장한 다음 브라우저를 새로고침하면 변경 내용이 보입니다.
HTML 파일을 더블클릭해서 여는 대신 위 명령을 사용하세요(JSON 정보 로딩에 필요).
종료는 터미널에서 Ctrl+C입니다.

포트가 사용 중이면 다음처럼 실행합니다.

```bash
npm run dev -- --port 3001
```

## 파일별 수정 위치

| 파일 | 역할 |
| --- | --- |
| public/index.html | 메인 페이지 구성과 문구 |
| public/styles.css | 색상, 크기, 간격, 반응형 레이아웃 |
| public/app.js | 메뉴, 모달, 매장 정보 표시 등 동작 |
| public/content.json | 메뉴, 가격, 주소, 영업시간 등 데이터 |
| public/assets/ | 로고, 매장 사진, 음식 시안 이미지, 폰트 |
| public/kakao-map.html | 카카오맵 공식 약도 삽입 페이지 |
| public/franchise.html | 가맹 안내 준비 페이지 |
| public/meal-kit.html | 밀키트 판매 준비 페이지 |
| server.mjs | 로컬 확인용 서버(운영 백엔드가 아님) |
| build.mjs | 배포 파일을 dist 폴더로 복사 |

대표 메뉴 데이터와 전체 메뉴판(catalog)에 같은 메뉴가 있으면 두 항목을 함께 수정하세요.
전화번호는 아직 null입니다. 확인한 번호를 넣어야 전화 연결이 활성화됩니다.
지도에는 기존 등록 상호인 '춘천쌍둥이닭갈비 본점'이 표시됩니다.
카카오맵 로딩에는 인터넷 연결이 필요합니다. 해당 매장의 공개 약도 식별자가 포함되어 있으며 비밀 API 키는 아닙니다.
음식 이미지는 생성 시안입니다. 실제 음식 사진으로 교체할 때 관련 캡션도 함께 수정하세요.
결제, 주문 접수, 예약 저장 기능은 없습니다.

## GitHub 저장소

공개 저장소: https://github.com/jhlee-inu/idungi-web
사이트 소스와 자산을 관리하는 저장소입니다. 기존 Sites 배포 설정과 인증 정보는 포함하지 않습니다.

```bash
git remote -v
```

위 명령으로 연결된 저장소 주소를 확인할 수 있습니다.

## GitHub에 올라간 다음 다른 컴퓨터에서 받기

```bash
git clone https://github.com/jhlee-inu/idungi-web.git
cd idungi-web
code .
npm run dev
```

작업 전 최신 내용을 받으려면 `git pull`, 수정 후 올리려면 아래 명령을 사용합니다.

```bash
git add .
git commit -m "Update website"
git push
```

Work와 로컬 파일은 자동 동기화되지 않습니다. Work에서 이어서 수정할 때 이 GitHub 저장소 주소와 작업할 브랜치를 알려주세요.
GitHub push만으로 현재 Sites 사이트가 자동 배포되지는 않습니다.

## 빌드 및 확인 범위

```bash
node --check public/app.js
npm run build
```

빌드 결과는 `dist/`에 생성됩니다. dist를 직접 수정하지 마세요.
빌드는 필수 파일 존재와 JSON 파싱을 검사합니다. 화면 배치나 외부 지도 로딩까지 검증하는 테스트는 아닙니다.
로고·지도 변경본은 실제 브라우저 표시를 별도로 확인해야 합니다.
