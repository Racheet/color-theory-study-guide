function isAnswerCorrect() {
    var currentColours = datastore.getState();
    var complementaryColour = colourGenerator.generateComplementaryColourFromSeed(currentColours.primaryColour);
    
    return currentColours.secondaryColour === complementaryColour;
    
}


function resetColourOptions() {
    
    view.clearColourOptions();

    var colourOptions = []
    var primaryColour = datastore.getState().primaryColour;
    var complementaryColour = colourGenerator.generateComplementaryColourFromSeed(primaryColour);
    var button;

    colourOptions.push(complementaryColour);

    for(let i = 0, limit = Math.max(2, Math.random() * 14); i <= limit; i++) {
            colourOptions.push(colourGenerator.generateRandomColourFromSeed(primaryColour));
    }
    
    colourOptions.sort((colour1, colour2) => parseInt(utility.getHue(colour2)) - parseInt(utility.getHue(colour1)));
    colourOptions.forEach(view.addColourOption);
    
    button = view.addSubmitButton();
    button.addEventListener("click",validator.generateButtonClickHandler(button,isAnswerCorrect),false);
}

datastore.changePrimaryColour(colourGenerator.generateRandomColour());
resetColourOptions();