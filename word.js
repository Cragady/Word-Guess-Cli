var Letter = require("./letter");

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
            wordShower += letterPass.letter.swapper + " ";
        }
        console.log("\x1b[34m" + wordShower + "\n");
    };
    this.charChecker = function(guessered){
        var wordShower = "";
        for(i = 0; i < this.letterAct.length; i++){
            this.letterAct[i].letter.letterChecker(guessered);
            wordShower += this.letterAct[i].letter.swapper + " ";
        }
        console.log(wordShower);
    } 
};
module.exports = Word;