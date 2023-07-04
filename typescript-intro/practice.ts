// // Hash Map
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