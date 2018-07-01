//this does NOT require any other files
function Letter(word){
    this.letterAct =[];
    this.word = word;
    var lets = word.split("");
    for(i = 0; i < lets.length; i++){
        this.letterAct.push({letter: lets[i], letterGuessed: false});
    }
};

var horse = new Letter("horse");

console.log(horse);