# NextJS Introduction

## Introduction

- `npm install next@12.1.0` : 버전 12 사용
- `npx create-next-app@12 {--typescript}`
  - 최신 버전 사용 시 `npx create-next-app@latest --ts`
- `cd {projecct명}`
- `npm run dev`

## Framwwork Overview

### Library vs Framework

- pages/index.js -> home
- library: 개발자로서 필요할 때 자유롭게 사용하는 것
- framework: 규칙에 따라 입력 후 코드를 불러오는 것

### Pages

- pages 내부 파일명이 url이 된다.
- component 이름은 중요하지 않지만, `export default`여야 한다.
- `import react from 'react'` 필요하지 않음. `useState`, `useEffect`와 같은 react method가 필요하면 import

### Static Pre Rendering

- pre-rendering: next.js의 소스코드에는 실제 HTML이 있기 때문에, 자바스크립트가 비활성화 되어 있더라도 유저는 HTML을 볼 수 있다. 그 후 react.js가 클라이언트로 전송되었을 때, react.js 앱이 된다.
- cf) client-side rendering: 브라우저는 유저가 보는 HTML인 빈 <div>만 가져오고, 자바스크립트, react 등 모든 것을 fetch한 후에 UI가 보임

### Routing

- 파일명 수정 후 import 에러 나는 경우가 있다. 삭제 후 재생성 하였는데, 다른 방법도 찾아봐야겠다.
- anchor 태그 사용 시, 페이지 이동할 때 새로고침 된다. 대신 `Link` 사용
  - 버전에 따라 다음과 같은 에러가 발생한다. Link 태그에 `legacyBehavior` 추가
  ```bash
    Error: Invalid <Link> with <a> child. Please remove <a> or use <Link legacyBehavior>.
    Learn more: https://nextjs.org/docs/messages/invalid-new-link-with-extra-anchor
  ```
  - `Link`에는 `href`만, `className, style` 등은 모두 anchor 태그에 입력

### CSS Modules

1. 태그에 style 적용
2. modules 사용

- NavBar.module.css 작성 후 NavBar.js에서 import
  - 클래스 이름 충돌 없이 재사용 가능
  - `import styles from "../NavBar.module.css`
  - 1. `className={styles.nav}`와 같이 사용
  - 2. `className={router.pathname === "/" ? styles.active : ""}`
  ```javaScript
    - 3.
      <a className={[
        styles.link,
        router.pathname === "/about" ? styles.active : "",
        ].join(" ")}>About</a>
  ```

3. styles jsx

- Next.js 고유의 방법
- index.js에서 anchor 태그에 style을 주더라도 NavBar의 a 태그에 영향을 주지 않는다.
- 스타일은 컴포넌트 내부로 한정됨. 다른 컴포넌트에 같은 클래스 명이 있더라도 영향을 주지 않는다.
- 태그 이름, 혹은 클래스 이름으로 사용 가능

### Custom App

- global styles 적용
  - `global` prop 추가
  - home 클릭 시 잘 적용되지만, about 클릭 시 about.js를 렌더링하는데 about.js에는 css가 존재하지 않기 때문에 제대로 적용되지 않는다.
- App Component : 어떤 컴포넌트의 청사진. NextJS가 모든 페이지를 렌더링할 수 있게 해준다.
  - 이름은 반드시 `_app.js`
  - Component, pageProps 두 개의 파라미터 - `App({Component, pageProps})`
  - 모든 컴포넌트에 대해 적용된다.
- 컴포넌트에서 global css 파일을 import 할 수 없지만, `_app.js`에서는 import 가능
  - `import "../styles/global.css";`

## Practice Project

### Fetching Data

- public 내부의 파일들을 사용할 때, `<img src='/vercel.svg'/>`와 같이 파일 이름만 쓰면 된다.

### Redirect and Rewrite

- next.config.js

- Redirection
  - source, destination, permanent 추가
    - source 입력 시 destination으로 url 변경됨.
    - 유저도 redirect된 사실을 알게 된다.
- Rewrite
  - 유저를 redirect하지만, url이 변하지 않는다.
- `.env` 파일을 통해 API_KEY를 저장하고, 불러오는 방식으로 사용 가능
  - gitignore 등록

### Server Side Rendering

- page가 유저에게 보여지기 전에 props를 받아오는 function을 만드는 것
  - 유저가 접속했을 때 모든 데이터가 페이지에 들어있고, 유저가 로딩 중인 화면을 보지 않기를 바랄 때
  - `props` 반환
- 버전 13부터 getServerSideProps 대신에 fetch에 옵션 값('no-store')을 주어 SSR을 구현

### Dynamic Routes | Movie Detail

- `[변수명].js`로 파일 생성 -> `/{폴더명}/{변수}`의 주소를 가짐
- Navigating - router hook 사용
- `as` 옵션을 통해 masking

### Catch All
