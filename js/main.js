function isAnswerCorrect() {
    var currentColours = datastore.getState();
    var complementaryColour = colourGenerator.generateComplementaryColourFromSeed(currentColours.primaryColour);
    
    return currentColours.secondaryColour === complementaryColour;
    
}

function stripSimilarColours(memo,next,index) {
        var firstColour, secondColour;
        var tooClose = 35;
        
        if (memo.length === 0) {return [next];};
        
        firstColour = utility.getHue(memo[memo.length - 1]);
        secondColour = utility.getHue(next);
        
        return Math.abs(firstColour - secondColour) < tooClose? memo : memo.concat(next);
        
        
}

function resetColourOptions() {
    
    view.clearColourOptions();

    var colourOptions = []
    var primaryColour = datastore.getState().primaryColour;
    var complementaryColour = colourGenerator.generateComplementaryColourFromSeed(primaryColour);
    var button;

    colourOptions.push(complementaryColour);

    for(let i = 0, limit = Math.max(5, Math.random() * 29); i <= limit; i++) {
            colourOptions.push(colourGenerator.generateRandomColourFromSeed(primaryColour));
    }
    
    colourOptions.sort((colour1, colour2) => parseInt(utility.getHue(colour2)) - parseInt(utility.getHue(colour1)));
    colourOptions = colourOptions.reduce(stripSimilarColours, []);
    
    colourOptions.forEach(view.addColourOption);
    
    button = view.addSubmitButton();
    button.addEventListener("click",validator.generateButtonClickHandler(button,isAnswerCorrect),false);
}

datastore.changePrimaryColour(colourGenerator.generateRandomColour());
resetColourOptions();