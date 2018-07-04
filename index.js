var Word = require("./word");
var inquirer = require("inquirer");
var Choiced = require("./word-list");
var choicedArray = Choiced.choices;
var wordsGuessed = [];
var letterGuessed = [];
var guessLeft = 10;

function gameStarter (){
    var randomizer = Math.floor(Math.random() * choicedArray.length);
    var chosenOne = choicedArray[randomizer];
    if(wordsGuessed.includes(chosenOne)){
        setTimeout(function(){
            gameStarter();
        }, 0);
        return;
    }
    letterGuessed = [];
    var wordGetter = new Word(chosenOne);
    wordGetter.lettersSpray(chosenOne);
    repeater(wordGetter);
}

function repeater(wordHere){
    inquirer.prompt([
        {
            name: "lettered",
            message: "\x1b[37m Guess a letter!",
            validate: function(input){ 
                var validInput = /^[A-Za-z]+$/;
                var inputSplitter = input.split("");   
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
        
        function letterWriter(){
            wordHere.charChecker(answer.lettered)
        };
        for(i = 0; i < wordHere.letterAct.length; i++){
            if(answer.lettered.toLowerCase() === wordHere.letterAct[i].letter.letter.toLowerCase()){
                console.log("\x1b[32m CORRECT!! Congratulations!")
                letterGuessed.push(answer.lettered);
                letterWriter();
                var writeTheLetters = letterGuessed.join(", ");
                console.log("\x1b[33m Letters Guessed: " + writeTheLetters);
                wordFinishChecker(wordHere);
                return;
            } else if(i === wordHere.letterAct.length - 1 && guessLeft > 1){
                guessLeft--;
                console.log(`\x1b[31m INCORRECT!! Too bad I guess. Better luck next time.
${guessLeft} guess(es) remaining`);
                letterGuessed.push(answer.lettered);
                letterWriter();
                var writeTheLetters = letterGuessed.join(", ");
                console.log("\x1b[33m Letters Guessed: " + writeTheLetters);
                repeater(wordHere);
            } else if (guessLeft === 1){
                console.log("Oops, game over");
                gameContinue();
                return;
            }
        }
    });
};

function wordFinishChecker(objPass){
    for(i = 0; i < objPass.letterAct.length; i++){
        if(objPass.letterAct[i].letter.letterGuessed === false){
            repeater(objPass);
            return;
        }
    }
    wordsGuessed.push(objPass.word);
    if(wordsGuessed.length === choicedArray.length){
        console.log(`\x1b[32m Words guessed: ${wordWriter}
Wow. . . You're pretty much a god at this huh?
Or you played this way too much. . .
(Or you cheated. . . kidding!)        
Anywho, CONGRATULATIONS! YOU GUESSED ALL THE WORDS I HAVE!! CRAZY!
THAT'S LIKE ${choicedArray.length} WORDS!!
I don't have any special rewards, but you can play again if you like!`);
        gameContinue();
        return;
    }
    var wordWriter = wordsGuessed.join(", ");
    console.log(`\x1b[32m YES!! Word has been guessed! Congratulations!!
Number of words guessed: ${wordsGuessed.length}
Words guessed so far: ${wordWriter}
Guesses remaining: ${guessLeft}, good luck!`);
    gameStarter();
    return;
};

function gameContinue(){
    inquirer.prompt([
        {
            name: "continue",
            message: "Play again?",
            type: "confirm"
        }
    ]).then(answer =>{
        if(answer.continue){
            wordsGuessed = [];
            guessLeft = 10;
            setTimeout(function(){
                gameStarter();
            }, 0);
        } else {
            return;
        }
    })
};

gameStarter();