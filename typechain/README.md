# Typescript Blockchain

## Tsconfig.json

### Targets

- `npm init -y`
- `npm i -D typescript`
- src/index.ts
- touch tsconfig.json
  - target: ES6 (대부분의 node.js와 브라우저가 ES6 지원)

### Lib Configuration

- lib : 타입스크립트에게 어떤 API를 사용하고, 어떤 환경에서 코드를 실행하는지를 지정

### Declaration Files

- \*.d.ts 파일을 통해서 js를 ts 파일에서 사용

### JSDoc

- js파일을 ts의 체크를 받도록 하기 위해 `//@ts-check`를 js 파일 첫줄에 추가
- `/**`로 자동완성되는 JSDoc 주석을 통해 js파일에 type 정보 제공

```javaScript
// @ts-check
/**
 * Initializes the project
 * @param {object} config
 * @param {boolean} config.debug
 * @param {string} config.url
 * @returns boolean
 */

export function init(config){
  return true
}
```

## Blocks

- `npm i -D ts-node`
- `npm i nodemon`
  - 자동 커맨드 재시작
- package.json 수정
  ```javascript
    "scripts": {
      "build": "tsc",
      "dev": "nodemon --exec ts-node src/index.ts",
      "start": "node build/index.js"
    },
  ```
- `npm run dev`를 통해 ts 파일 실행

## DefinitelyTyped

- ts type 정의를 위한 레포지토리
  - ts로 만들어지지 않은 패키지를 받았는데 타입 정의가 없을 때의 방법
- `npm i -D @types/node`
