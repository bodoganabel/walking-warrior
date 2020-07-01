// if (LineBuilder.wordFits(word)) {
//     LineBuilder.pushWord(word)
// } else {
//     let line = LineBuilder.createLine();
//     TextBuilder.writeLine(0, 0, line);
// }

class LineBuilder {

    constructor() {
        this.words = []
        this.charLimit = 55 //max chars per line 
        this.charCount = 0
    }

    createLine() {
        let wordsToJoin = this.words
        this.charCount = 0;
        this.words = []
        return wordsToJoin.join(' ')
    }

    wordFits(word) {
        return this.charCount + word.length < this.charLimit
    }

    pushWord (word) {
        this.words.push(word)
        this.charCount += word.length + 1
    }


}
