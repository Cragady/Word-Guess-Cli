//should ONLY require letters.js
var Letter = require("./letter");
var choicedWord = "hooover";
var activeWord;

function Word(word){
    this.word = word;
    wordPass = new Letter(word);
    this.letterAct = wordPass.letterAct;
    this.letterChecker = wordPass.letterChecker;
    this.writeWord = wordPass.writeWord;    
};

newFunk = function(getIt){
    activeWord = new Word(getIt);
}
// activeWord.letterChecker(activeWord.word, "o");
newFunk(choicedWord);
console.log(activeWord.letterAct);

