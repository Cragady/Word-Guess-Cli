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
                writeTheLetters = letterGuessed.join(", ");
                console.log("\x1b[33m Letters Guessed: " + writeTheLetters);
                wordFinishChecker(wordHere);
                return;
            } else if(i === wordHere.letterAct.length - 1 && guessLeft > 1){
                guessLeft--;
                console.log(`\x1b[31m INCORRECT!! Too bad I guess. Better luck next time.
${guessLeft} guess(es) remaining`);
                letterGuessed.push(answer.lettered);
                letterWriter();
                writeTheLetters = letterGuessed.join(", ");
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

wordFinishChecker = function(objPass){
    for(i = 0; i < objPass.letterAct.length; i++){
        if(objPass.letterAct[i].letter.letterGuessed === false){
            repeater(objPass);
            return;
        }
    }
    wordsGuessed.push(objPass.word);
    if(wordsGuessed.length === choicedArray.length){
        console.log(`\x1b[32m Wow. . . You're pretty much a god at this huh?
Or you played this way too much. . .
(Or you cheated. . . kidding!)        
Anywho, CONGRATULATIONS! YOU GUESSED ALL THE WORDS I HAVE!! CRAZY!
THAT'S LIKE ${choicedArray.length} WORDS!!
I don't have any special rewards, but you can play again if you like!`);
        gameContinue();
        return;
    }
    console.log("This was hit");
    var wordWriter = wordsGuessed.join(", ");
    console.log(`\x1b[32m YES!! Word has been guessed! Congratulations!!
Number of words guessed: ${wordsGuessed.length}
Words guessed so far: ${wordWriter}
Guesses remaining: ${guessLeft}, good luck!`);
    gameStarter();
};

gameContinue = function(){
    inquirer.prompt([
        {
            name: "continue",
            message: "Play again?",
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