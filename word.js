//should ONLY require letters.js
var Letter = require("./letter");
var choicedWord = "hooover damn";

function Word(word){
    this.word = word;
    this.letterAct = [];
    this.lettersSpray = function(spreader){
        lets = spreader.split("");
        var wordShower = "";
        for(i = 0; i < lets.length; i++){
            letterPass = new Letter(lets[i]);
            letterPass.letter.letterChecker(" ");
            this.letterAct.push(letterPass);
            wordShower += letterPass.letter.swapper;
        }
        console.log(wordShower);
    };
    this.charChecker = function(guessered){
        var wordShower = "";
        for(i = 0; i < this.letterAct.length; i++){
            this.letterAct[i].letter.letterChecker(guessered);
            wordShower += this.letterAct[i].letter.swapper;
        }
        console.log(wordShower);
    } 
};

newFunk = function(getIt){
    activeWord = new Word(getIt);
    activeWord.lettersSpray(getIt);
    console.log(activeWord);
    activeWord.charChecker("o");
    activeWord.charChecker('h');
    activeWord.charChecker('v');
    activeWord.charChecker('e');
    activeWord.charChecker('r');
    activeWord.charChecker('d');
    activeWord.charChecker('a');
    activeWord.charChecker('m');
    activeWord.charChecker('n');
    
}
// activeWord.letterChecker(activeWord.word, "o");
newFunk(choicedWord);

