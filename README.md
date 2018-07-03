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