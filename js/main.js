

function runTest(primaryColour,targetColours,isAnswerCorrect) {
    
    view.clearColourOptions();

    var colourOptions = [];
    var button;

    datastore.changePrimaryColour(primaryColour);

    targetColours.forEach( targetColour => colourOptions.push(targetColour) );
    
    for(let i = 0, limit = Math.max(5, Math.random() * 29); i <= limit; i++) {
            colourOptions.push(colourGenerator.generateRandomColourFromSeed(primaryColour));
    }
    
    colourOptions = utility.stripSimilarColours(colourOptions); 
    colourOptions = utility.shuffleArray(colourOptions);
    colourOptions.forEach(view.addColourOption);
    
    button = view.addSubmitButton();
    button.addEventListener("click",validator.generateButtonClickHandler(button,isAnswerCorrect.bind(null,targetColours)),false);
}

function runComplementaryColourTest() {
   var newPrimaryColour = colourGenerator.generateRandomColour();
   var newComplementaryColour = colourGenerator.generateComplementaryColourFromSeed(newPrimaryColour);
    
   function isComplementaryColour(targetColours) {
        var currentColours = datastore.getState();
        var primaryColour = currentColours.primaryColour;
        var secondaryColour = currentColours.secondaryColour;
        var distanceBetweenColours = utility.distanceBetweenTwoColours(primaryColour,secondaryColour);
        var tooSmall = 160; // degrees around the colour wheel
        var tooFar = 185; // degrees around the colour wheel

        return  distanceBetweenColours > tooSmall && distanceBetweenColours < tooFar;
   }
    
   function taskDescription(){
       var output = [];
       output.push("Complementary colours are two colours that sit directly opposite each other on the colour wheel.");
       output.push("When used together, they make each other look more intense.");
       return output;
   }
   
   view.changeSubtitle("Select a complementary colour");
   view.changeDescription(taskDescription());
   runTest(newPrimaryColour,[newComplementaryColour],isComplementaryColour);
}

function runAnalogousColourTest() {
   var newPrimaryColour = colourGenerator.generateRandomColour();
   var newAnalogousColours = colourGenerator.generateAnalogousColoursFromSeed(newPrimaryColour);
    
    function isAnalogousColour(targetColours) {
        var currentColours = datastore.getState();
        var primaryColour = currentColours.primaryColour;
        var secondaryColour = currentColours.secondaryColour;
        var distanceBetweenColours = utility.distanceBetweenTwoColours(primaryColour,secondaryColour);
        var tooSmall = 0; // degrees around the colour wheel
        var tooFar = 70; // degrees around the colour wheel

        return  distanceBetweenColours > tooSmall && distanceBetweenColours < tooFar;
    }
   
   function taskDescription(){
       var output = [];
       output.push("Analogous colours are two colours that sit alongside each other on the colour wheel.");
       output.push("When used together, they match well and produce a serene and pleasing effect.");
       return output;
   }
   
   view.changeSubtitle("Select an analogous colour");
   view.changeDescription(taskDescription());
   runTest(newPrimaryColour,newAnalogousColours,isAnalogousColour);
}


function runANewTest() {
    var availableTests = [];
    var randomPick;  
    
    availableTests.push(runComplementaryColourTest);
    availableTests.push(runAnalogousColourTest);
    
    
    randomPick = Math.floor(Math.random() * availableTests.length);
    
    availableTests[randomPick]();
    
}

runANewTest();