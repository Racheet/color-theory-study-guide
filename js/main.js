function isAnswerCorrect(targetColour) {
    var currentColours = datastore.getState();
    
    return currentColours.secondaryColour === targetColour;
    
}

function stripSimilarColours(memo,next,index) {
        var firstColour, secondColour;
        var tooClose = 30;
        
        if (memo.length === 0) {return [next];};
        
        firstColour = utility.getHue(memo[memo.length - 1]);
        secondColour = utility.getHue(next);
        
        return Math.abs(firstColour - secondColour) < tooClose? memo : memo.concat(next);
}

function runTest(primaryColour,targetColour) {
    
    view.clearColourOptions();

    var colourOptions = [];
    var button;

    datastore.changePrimaryColour(primaryColour);

    for(let i = 0, limit = Math.max(5, Math.random() * 29); i <= limit; i++) {
            colourOptions.push(colourGenerator.generateRandomColourFromSeed(primaryColour));
    }
    
    colourOptions.sort((colour1, colour2) => parseInt(utility.getHue(colour2)) - parseInt(utility.getHue(colour1)));
    colourOptions = colourOptions.reduce(stripSimilarColours, []);
    colourOptions.push(targetColour);
    colourOptions.sort((colour1, colour2) => parseInt(utility.getHue(colour2)) - parseInt(utility.getHue(colour1)));
    
    colourOptions.forEach(view.addColourOption);
    
    button = view.addSubmitButton();
    button.addEventListener("click",validator.generateButtonClickHandler(button,isAnswerCorrect.bind(null,targetColour)),false);
}

function runComplementaryColourTest() {
   var newPrimaryColour = colourGenerator.generateRandomColour();
   var newComplementaryColour = colourGenerator.generateComplementaryColourFromSeed(newPrimaryColour);
    
   function taskDescription(){
       var output = [];
       output.push(document.createElement("p"));
       output.push(document.createElement("p"));
       output[0].textContent = "Complementary colours are two colours that sit directly opposite each other on the colour wheel.";
       output[1].textContent = "When used together, they make each other look more intense.";
       return output;
   }
   
   view.changeSubtitle("Select A Complementary Colour");
   view.changeDescription(taskDescription());
   runTest(newPrimaryColour,newComplementaryColour);
}

runComplementaryColourTest();