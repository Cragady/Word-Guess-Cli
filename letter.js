//this does NOT require any other files
function Letter(letIn){
    // this.letterAct =[];
    // var lets = word.split("");
    // for(i = 0; i < lets.length; i++){
    //     this.letterAct.push({
    this.letter = {
        letter: letIn, 
        letterGuessed: false,
        letterChecker: function(letterGuessIn){
            this.writeWord(letterGuessIn);
            if(this.letterGuessed === true){
                this.swapper = this.letter;
            } else {
                this.swapper =  "_";
            }
            console.log(this.swapper);
        },
        writeWord: function(letterGuessIn){
            if(this.letter === letterGuessIn){
                this.letterGuessed = true;
            }
        }
    }
    //     });
    // }

    // this.letterChecker = function(word, letter){
    //     var wordShow = "";
    //     for(i = 0; i < word.word.length; i++){
    //         if(word.letterAct[i].letterGuessed === true){
    //             wordShow += word.letterAct[i].letter;
    //         } else {
    //             wordShow += "_";
    //         };
    //     }
    //     this.writeWord(word, letter);
    //     console.log(wordShow);
    // }
    // this.writeWord = function(word, letter){
    //     for(i = 0; i < word.word.length; i++){
    //         if(word.letterAct[i].letter === letter){
    //             word.letterAct[i].letterGuessed = true;
    //             console.log(word);
    //         }
    //     }
    // }
};
module.exports = Letter;

hoover = new Letter("h");

guessedSoFar = "h";
hoover.letter.letterChecker(guessedSoFar);
// letterLooper = function(inputLet, letterReturn){
//     returner = "";
    
//     return guessedSoFar = letterReturn;
// }

// letterLooper("o", guessedSoFar);
// letterLooper("h");
// letterLooper("z");