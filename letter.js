function Letter(letIn){
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
        },
        writeWord: function(letterGuessIn){
            if(this.letter === letterGuessIn || this.letter === " "){
                this.letterGuessed = true;
            }
        }
    }
};
module.exports = Letter;