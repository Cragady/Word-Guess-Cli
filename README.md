**Purpose**

To create a command line application that utilizes constructors stored in separate javascript files alongside the node package module `inquirer` for the purpose of a word guessing game.

The constructors are referenced by using node's `require`. A javascript file named `words-list` is also referenced, `words-list` stores random words to be randomly chosen by `index.js`.

**Installation/Keys**

`package.json` specifies the npm dependency required for this application to work. Run `npm install` on the command line, OR `npm install <package name(s) here>` for functionality.

**Word Guess Demo**
<img src="gifs-pics/word-guess-functioning.gif" width="700" height="500" alt="Word Guess Demo">

**letter.js**

Constructs a letter object. This stores the letter, if the letter has been guessed as a value, a function that displays the letter or `_` depending on if the letter has been guessed, and a function that changes the boolean value stored if the letter has been guessed.

**word.js**

`word.js` references `letter.js` to construct a new object for every letter in the word that is passed to `word.js`'s constructor. Each letter object is pushed to an array here to keep track of each letter's object. `function Word()` stores the word, the letter objects, has the functions `lettersSpray()` and `charChecker()`.

  * **lettersSpray()**
  Runs the `Letter()` constructor on each letter of the word passed to it, stores the object in the array `letterAct` and then runs the function `letterChecker()` in each letter object then logs the values returned from each letter to display something like this: `_ _ _ _ _   _ _ _   _ _ _ _ _` for a blank letter.

  * **charChecker()**
  Checks the guessed letter passed to it and changes the character to reflect the underlying letter if the guess is correct, then logs the result to the console. It would display something like this: `_ _ s s _   _ _ _   _ s s _ _` if s was passed to `charChecker()` and was correct.

**index.js**
`index.js` runs the game utilizing the `inquirer` npm and recursion so the user can keep playing the game until the user decides to stop playing.
  * **functions**
    *  gameStarter()
    *  repeater()
    *  wordFinishChecker()
    *  gameContinue()

  * **gameStarter()**

    Has a randomizer that is put into the index slot for a variable that requires the `word-list.js` (where all the words are stored) to select a word at random to pass as an argument in `repeater()` and `lettersSpray()` after being passed as an argument for the constructor stored in `word.js`. 

  * **repeater()**

    Prompts the user for their guess. The prompt has a `validate()` function that makes sure the user can't have any non alphabetic characters as a guess, that there is an input, that there isn't more than one character in the input, and makes sure that the input hasn't previously been inputted for the same word.

    As it is so aptly named, this repeats. Every time the user enters a guess, it is called again; `repeater()` calls itself until the user guesses the word correctly, loses the game, or runs out of words to guess. The only case `repeater()` does not call itself is when the user guesses a letter correctly. When the user guesses the word correctly, `wordFinishChecker()` is called. `wordFinishChecker()` will call `repeater()` if the word hasn't been fully guessed.

* **wordFinishChecker**

  When the word is fully guessed, the completed word is pushed to `wordsGuessed`. If there are still words to guess, `gameStarter()` will be called to initialize a new word. If there are no more words to be guessed, `gameStarter()` is called if the user, for some reason, wants to play the entire game again.

* **gameContinue()**

  Resets variables that keeps track of words guessed correctly, guesses remaining, and letters guessed in the event of a game over or guessing all of the words. Restarts the Game. If the user selects no, the application is exited.


**Problem**

If the array that feeds the words to the index.js file is too big, the game breaks when all but one word have been guessed.