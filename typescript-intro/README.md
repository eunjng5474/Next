# Typescript

## Overview

### Types of TS part 1

```TypeScript
  // 변수 선언 시 타입을 명시적 정의하거나, 추론
  let a: boolean = false
  let b = "hello"   // b가 string 타입이라고 추론
  b = 1 // 불가


  let a : number[] = [1. 2]

  const player : {
    name: string,
    age?: number  // optional -> number | undefined
  } = {
    name: "nico"
  }

  if(player.age < 10 ) {}   // player.age가 undefined일 수 있기 때문에 에러
  if(player.age && player.age < 10) {}


  // Alias
  type Player = {
    name: string,
    age?: number
  }

  const playerNico : Player = {
    name: "nico"
  }
  const playerLynn : Player = {
    name: "lynn",
    age: 12
  }

  // Player 타입을 return하도록
  function playerMaker(name: string) : Player {
    return {
      name
    }
  }
  const playerMaker2 = (name: string) : Player => ({name})

  const nico = playerMaker("nico")
  nico.age = 12   // Player type을 지정하면 가능

```

### Types of TS part 2

```TypeScript
  // readonly -> 수정 불가(immutability)
  type Player = {
    readonly name: String
    age?: number
  }

  const numbers: readonly number[] = [1, 2, 3, 4]
  numbers.push(1) // 불가

  // Tuple
  const player: [string, number, boolean] = ["nico", 1, true]
  player[0] = 1  // 불가

  // any: 아무 타입 -> typescript의 보호장치 비활성화. 사용 비권장
  // undefined: 선언X, 할당X
  // null: 선언O, 할당X
```

### Types of TS part 2

```TypeScript
// unknown : 변수의 타입을 미리 알지 못할 때
  let a: unknown; // 작업 전 변수의 타입을 먼저 확인해야 한다.

  if(typeof a === 'number') {
    let b = a + 1
  }
  if(typeof a === "string") {
    let b = a.toUpperCase();
  }

// void : 아무것도 return하지 않는 함수 대상으로 사용
function hello() {
  console.log('x')
}

// never : 함수가 return하지 않을 때
function hello(): never {
  throw new Error("XXX")
  // return하지 않고 오류 발생시킴
}

function hello2(name: string|number) {
  if(typeof name === 'string') {
    name // string
  } else if (typeof name === 'number') {
    name // number
  } else {
    name  // never
  }
}
```

## Functions

### Call Signatures

- 함수의 파라미터와 반환 타입 지정

```TypeScript
  function add1(a:number, b:number) {
    return a + b
  }
  function add2 = (a:number, b:number) => a+b

  // 함수의 call signature 타입 만들기
  type Add = (a:number, b:number) => number;
  const add: Add = (a, b) => a+b;
  // const add: Add = (a, b) => {a+b};로 할 경우,
  /* function add(a, b) {
    a+b;
  } */
  // 위와 같이 반환값이 아닌 함수 내부 내용으로 처리되어 void로 처리된다.
```

### Overloaing

- 함수가 여러 개의 다른 call signatures를 가질 때

```TypeScript
  type Add = {
    (a: number, b: number) : number
    (a: number, b: string) : number
  }

  const add: Add = (a, b) => {
    if(typeof b === 'string') return a
    return a + b
  }
  // 파라미터 개수가 다를 때
  type Add2 = {
    (a: number, b: number) : number
    (a: number, b: number, c: number) : number
  }

  const add2: Add = (a, b, c?:number) => {
    if(c) return a + b + c
    return a + b
  }

  add2(1, 2)
  add2(1, 2, 3)


  type Config = {
    path: string,
    state: object
  }

  type Push = {
    (path: string) : void
    (config: Config) : void
  }

  const push: Push = (config) => {
    if(typeof config === 'string') console.log(config)
    else {
      console.log(config.path, config.state)
    }
  }
  // config: string | Config가 아닌 void로 뜬다면
  // npx tsc --init
```

### Polymorphism(다형성)

- concrete type: number, boolean, void, ...
- generic: 타입의 placeholder. 타입스크립트가 타입을 유추.
  - call signature를 작성할 때, 확실한 타입을 모를 경우 사용
  - 선언 시점이 아니라 생성 시점에 타입을 명시하여 하나의 타입만이 아닌 다양한 타입을 사용할 수 있도록 하는 기법

```TypeScript
  type SuperPrint = {
    <TypePlaceholber>(arr: TypePlaceholber[]): TypePlaceholber   // generic
    // TypePlaceholer 대신 T, V 등 다른 단어도 가능. 대문자로 시작하도록 하기
  }

  const superPrint: SuperPrint = (arr) => {
    arr.forEach(i => console.log(i))
  }

  const a = superPrint([1, 2, 3, 4])    // const a : number
  const b = superPrint([true, false, true])   // const b : boolean
  const c = superPrint([1, 2, false, true, "hello"])
  // const c : string | number | boolean
```

### Generics Recap

```TypeScript
  type SuperPrint = <T, M>(a: T[], b:M) => T  // 두 개의 파라미터

  const superPrint: SuperPrint = (a) => a[0]

  const a = superPrint([1, 2, 3, 4], "x")
  const b = superPrint([true, false, true], 1)
  const c = superPrint([1, 2, false, true, "hello"], [])
```

### Conclusions

```TypeScript
  function superPrint<V>(a: V[]) {
    return a[0]
  }

  const a = superPrint<number>([1, 2, 3, 4])
  // 이런식으로 명시 가능하지만, 할 필요 없음
  const b = superPrint([true, false, true])
  const c = superPrint([1, 2, false, true, "hello"])


  type Player<E> = {
    name: string
    extraInfo: E
  }
  type NicoExtra = {
    favFood:string
  }
  // type NicoPlayer = Player<{ favFood: string }>
  type NicoPlayer = Player<NicoExtra>

  // 위와 같이 type 명시 후, Player<{favFood:string}> 자리에 NicoPlayer 가능
  const nico: Player<{favFood:string}> = {
    name: "nico",
    extraInfo: {
      favFood: "kimchi"
    }
  }

  const lynn: Player<null> = {
    name: "lynn",
    extraInfo: null
  }

  // function printAllNumbers(arr: number[]) {}
  function printAllNumbers(arr: Array<number>) {} // generic을 사용해 위와 동일
```

## Classes and Interfaces

### Classes and Hash Map

      　　　선언한 클래스 내　  상속받은 클래스 내　   인스턴스

private 　 　　　 O 　　　　　　　 X 　　　　　 X
protected 　　 　 O 　　　　　　　 O 　　　　　 X
public 　　　　　 O 　　　　　　　 O 　　　　　 O

```TypeScript
// 추상 클래스: 다른 클래스가 상속받을 수 있는 클래스. 직접 인스턴스 생성 불가
// 추상 메서드: 추상 클래스를 상속받는 클래스들이 반드시 구현해야하는 메서드
  // - call signature만 가짐
  abstract class User {
    constructor(
      private firstName: string,
      public lastName: string,
      protected nickname: string
    ) {}
    abstract getNickName():void   // 추상 메서드

    private getFullName() {
      return `${this.firstName} ${this.lastName}`
    }
  }
  class Player extends User {
    // 추상 메서드를 구현해야 한다
    getNickName() {
      console.log(this.nickname)  // private이면 불가, protected면 가능
    }
  }

  const nico = new Player("nico", "las", "니꼬")
  nico.getFullName()  // private이므로 불가
  nico.nickname    // protected -> 불가


// Hash Map
type Words = {
  [key:string]: string
}

class Dict {
  private words: Words
  constructor(){
    // constructor에서 수동으로 초기화
    this.words = {}
  }
  // 단어 추가를 위한 메서드
  add(word: Word){
    if(this.words[word.term] === undefined) {
      this.words[word.term] = word.def
    }
  }
  def(term:string){
    return this.words[term]
  }
  update(word: Word){
    if(this.words[word.term] !== undefined) {
      this.words[word.term] = word.def
    }
  }
  del(term: string) {
    if(this.words[term] !== undefined) {
      delete this.words[term]
    }
  }
}

class Word {
  constructor(
    public term: string,
    public def: string
  ) {}
}

const kimchi = new Word("kimchi", "super cool food")
const pizza = new Word("pizza", "nice food")

const dict = new Dict()

dict.add(kimchi)
dict.add(pizza)
console.log("kimchi: ", dict.def("kimchi"))
console.log("pizza: ", dict.def("pizza"))

dict.update(new Word("kimchi", "very incredible super food"))
console.log("update kimchi: ", dict.def("kimchi"))

dict.del("pizza")
console.log("delete pizza", dict.def("pizza"))
console.log("not delete kimchiu", dict.def("kimchi"))
```

### Interfaces

```TypeScript
  class Word {
    constructor(
      public readonly term: string,
      public readonly def: string
    ) {}
  }

  // type
  type Team = "red" | "blue" | "yellow"
  type Health = 1 | 5 | 10

  // type Player = {
    // nickname: string,
    // team: Team,
    // health: Health
  // }

  interface Player {
    nickname: string,
    team: Team,
    health: Health
  }

  const nico: Player = {
    nickname: "nico",
    team: "blue",
    health: 10
  }

  ///////
  interface User {
    name: string
  }
  // interface는 상속 가능
  interface Player extends User {
  }

  type User2 = {
    name: string
  }
  type Player2 = User2 & {
  }

  const nico: Player = {
    name: "nico"
  }

  ////////
  interface User {
    name: string
  }
  interface User {
    lastName: string
  }
  interface User {
    health: number
  }
  // interface는 이렇게 가능. type은 불가
  const nico: User = {
    name: "nico",
    lastName: "n",
    health: 10
  }
```

- type의 용도
  - 특정 값이나 객체의 값에 대한 타입 지정 가능
  - type alias 만들 수 있다
  - 타입을 특정한 값을 가지도록 제한 가능
  - type이 interface에 비해 더 다양한 목적으로 사용 가능
- interface: 오브젝트의 모양을 타입스크립트에게 설명해주기 위해서만 사용되는 키워드

```TypeScript
// interface -> js로 컴파일되지 않는다. ts에만 있음
  interface User {
    firstName: string,
    lastName: string,
    sayHi(name:string):string
    fullName():string
  }
  interface Human {
    health: number
  }

  // 인터페이스를 상속할 때는 property를 private으로 만들지 못한다.
  // User에서 public이었으므로 Player에서도 public이어야 한다.9
  class Player implements User, Human {
    constructor(
      public firstName: string,
      public lastName: string,
      public health: number
    ){}
    fullName(){
      return `${this.firstName} ${this.lastName}`
    }
    sayHi(name:string){
      return `Hello ${name}. My name is ${this.fullName()}`
    }
  }

  // 인터페이스를 타입으로 쓸 수 있다.
  function makeUser(user: User){
    return {
      firstName: "nico",
      lastName: "las",
      fullName: () => "xx",
      sayHi: (name) => "string"
    }
  }
  makeUser(
    firstName: "nico",
    lastName: "las",
    fullName: () => "xx",
    sayHi: (name) => "string"
  )

// 추상클래스 -> js로 컴파일됨
  // abstract class User {
  //   constructor(
  //     protected firstName: string,
  //     protected lastName: string
  //   ) {}
  //   abstract sayHi(name:string): string
  //   abstract fullName(): string
  // }
  // class Player extends User {
    // fullName(){
    //   return `${this.firstName} ${this.lastName}`
    // }
    // sayHi(name:string){
    //   return `Hello ${name}. My name is ${this.fullName()}`
    // }
  // }
```

### Polymorphism

```TypeScript
// Generics를 통해 전달 가능
  // Storage는 이미 정의되어 있기 때문에 여기서 Storage 선언 시 오버라이딩
  interface SStorage<T> {
    [key:string]: T
  }

  class LocalStorage<T> {
    private storage: SStorage<T> = {}
    // Create
    set(key:string, value:T){
      if(this.storage[key] !== undefined){
        return console.log(`${key}가 이미 존재합니다.`)
      }
      this.storage[key] = value
    }
    // Delete
    remove(key:string){
      if(this.storage[key] === undefined){
        return console.log(`${key}가 존재하지 않습니다.`)
      }
      delete this.storage[key]
    }
    // Read
    get(key:string):T {
      if(this.storage[key] === undefined){
        return console.log(`${key}가 존재하지 않습니다.`)
      }
      return this.storage[key]
    }
    // Update
    update(key:string, value:T){
      if(this.storage[key] !== undefined) {
        this.storage[key] = value
      } else {
        console.log(`${key}가 존재하지 않아 새로 생성합니다.`)
        this.storage[key] = value
      }
    }
    clear(){
      this.storage = {}
    }
  }

  const stringsStorage = new LocalStorage<string>()
  stringsStorage.get("ket")
  stringsStorage.set("hello", "how are you?")

  const booleansStorage = new LocalStorage<boolean>()
  booleansStorage.get("xxx")
  booleansStorage.set("hello", true)
```
