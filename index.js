var Word = require("./word");
var inquirer = require("inquirer");
var Choiced = require("./word-list");
var choicedArray = Choiced.choices;
var wordsGuessed = [];
var letterGuessed = [];
var guessLeft = 10;

gameStarter = function(conti){
    randomizer = Math.floor(Math.random() * choicedArray.length);
    chosenOne = choicedArray[randomizer];
    validKeyPress = "";
    // validKey();
    if(conti){
        wordsGuessed = [];
        letterGuessed = [];
        guessLeft = 10;
        var wordGetter = new Word(chosenOne);
        wordGetter.lettersSpray(chosenOne);
        repeater(wordGetter);
    } else {
        letterGuessed = [];
        var wordGetter = new Word(chosenOne);
        wordGetter.lettersSpray(chosenOne);
        repeater(wordGetter);
    }
}

repeater = function(wordHere){
    inquirer.prompt([
        {
            name: "lettered",
            message: "\x1b[37m Guess a letter!",
            validate: function(input){ 
                var validInput = /^[A-Za-z]+$/;
                inputSplitter = input.split("");   
                if(!input){
                    return "You must input something."
                } else if (letterGuessed.includes(input.toLowerCase()) || letterGuessed.includes(input.toUpperCase())) {
                    return "You already guessed this letter."
                } else if (input.match(validInput) && inputSplitter.length === 1){
                    return true;
                }
                return "You must input a single letter."
            }
        }
    ]).then(answer =>{
        letterWriter = function(){
            wordHere.charChecker(answer.lettered)
        };
        for(i = 0; i < wordHere.letterAct.length; i++){
            if(answer.lettered.toLowerCase() === wordHere.letterAct[i].letter.letter.toLowerCase()){
                console.log("\x1b[32m CORRECT!! Congratulations!")
                letterGuessed.push(answer.lettered);
                letterWriter();
                console.log("\x1b[33m Letters Guessed: " + letterGuessed);
                repeater(wordHere);
                return;
            } else if(i === wordHere.letterAct.length - 1 && guessLeft > 1){
                guessLeft--;
                console.log(`\x1b[31m INCORRECT!! Too bad I guess. Better luck next time.
${guessLeft} guess(es) remaining`);
                letterGuessed.push(answer.lettered);
                letterWriter();
                console.log("\x1b[33m Letters Guessed: " + letterGuessed);
                repeater(wordHere);
            } else if (guessLeft === 1){
                console.log("Oops");
                gameContinue();
                return;
            }
        }
    });
}

gameContinue = function(){
    inquirer.prompt([
        {
            name: "continue",
            message: "Continue?",
            type: "confirm"
        }
    ]).then(answer =>{
        if(answer.continue){
            gameStarter(true);
        } else {
            return;
        }
    })
};

gameStarter();
//FgRed = "\x1b[31m"
//FgGreen = "\x1b[32m"
//Reset = "\x1b[0m"
//FgWhite = "\x1b[37m"
//FgBlue = "\x1b[34m"

// console.log("\x1b[31m Hello World!");
// console.log("hi");
// console.log("\x1b[32m hello again! ");
// console.log("\x1b[37m hello");