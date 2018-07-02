var Word = require("./word");
var inquirer = require("inquirer");
var Choiced = require("./word-list");
var choicedArray = Choiced.choices;
var wordsGuessed = [];
var guessLeft = 10;

gameStarter = function(conti){
    randomizer = Math.floor(Math.random() * choicedArray.length);
    chosenOne = choicedArray[randomizer];
    validKeyPress = "";
    // validKey();
    if(conti){
        wordsGuessed = [];
        guessLeft = 10;
        var wordGetter = new Word(chosenOne);
        wordGetter.lettersSpray(chosenOne);
        repeater(wordGetter);
    } else {
        var wordGetter = new Word(chosenOne);
        wordGetter.lettersSpray(chosenOne);
        repeater(wordGetter);
    }
}

repeater = function(wordHere){
    inquirer.prompt([
        {
            name: "lettered",
            message: "Guess a letter!",
            validate: function(input){ 
                var validInput = /^[A-Za-z]+$/;
                inputSplitter = input.split("");   
                if(!input){
                    return "You must input something."
                } else if (input.match(validInput) && inputSplitter.length === 1){
                    return true;
                }
                return "You must input a single letter."
            }
        }
    ]).then(answer =>{
        wordHere.charChecker(answer.lettered);
        repeater(wordHere);
    });
}

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