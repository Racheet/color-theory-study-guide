

function runTest(primaryColour,targetColours,isAnswerCorrect,isOneColourTest) {
    
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
    colourOptions.forEach(view.addColourOption.bind(null,isOneColourTest));
    
    button = view.addSubmitButton();
    button.addEventListener("click",validator.generateButtonClickHandler(button,isAnswerCorrect.bind(null,targetColours)),false);
}

function runComplementaryColourTest() {
   var newPrimaryColour = colourGenerator.generateRandomColour();
   var newComplementaryColour = colourGenerator.generateComplementaryColourFromSeed(newPrimaryColour);
   var isOneColourTest = true;
    
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
   runTest(newPrimaryColour,[newComplementaryColour],isComplementaryColour,isOneColourTest);
}


function runSplitComplementaryColourTest() {
    var newPrimaryColour = colourGenerator.generateRandomColour();
    var newSplitComplementaryColours = colourGenerator.generateSplitComplementaryColoursFromSeed(newPrimaryColour);
    var isOneColourTest = false;

    function isSplitComplementaryColour(targetColours) {
        var currentColours = datastore.getState();
        var primaryColour = currentColours.primaryColour;
        var secondaryColour = currentColours.secondaryColour;
        var tertiaryColour = currentColours.tertiaryColour;
        var distanceBetweenPrimaryAndSecondaryColours = utility.distanceBetweenTwoColours(primaryColour, secondaryColour);
        var distanceBetweenPrimaryAndTertiaryColours = utility.distanceBetweenTwoColours(primaryColour, tertiaryColour);
        var distanceBetweenSecondaryAndTertiaryColours = utility.distanceBetweenTwoColours(secondaryColour, tertiaryColour);
        var tooSmall = 125; // degrees around the colour wheel
        var tooFar = 170; // degrees around the colour wheel
        var properSeparation = 15; // degrees around the colour wheel

        var isSecondaryColourRight = distanceBetweenPrimaryAndSecondaryColours > tooSmall && distanceBetweenPrimaryAndSecondaryColours < tooFar;
        var isTertiaryColourRight = distanceBetweenPrimaryAndTertiaryColours > tooSmall && distanceBetweenPrimaryAndTertiaryColours < tooFar;

        var areSecondaryAndTertiaryColoursDifferent = distanceBetweenSecondaryAndTertiaryColours > properSeparation;

        return isSecondaryColourRight && isTertiaryColourRight && areSecondaryAndTertiaryColoursDifferent;
    }
    
    function taskDescription(){
       var output = [];
       output.push("A Split Complementary colour scheme uses the two colours that sit on either side of the complementary colour.");
       output.push("This provides the same strong visual contrast as a complementary colour harmony.");
       output.push("A split complementary colour scheme is often a safe choice, since it provides visual tension without being overwhelming.");
       return output;
   }

    view.changeSubtitle("Select split complementary colours");
    view.changeDescription(taskDescription());
    runTest(newPrimaryColour, newSplitComplementaryColours, isSplitComplementaryColour, isOneColourTest);
}

function runTriadicColourTest() {
    var newPrimaryColour = colourGenerator.generateRandomColour();
    var newTriadicColours = colourGenerator.generateTriadicColoursFromSeed(newPrimaryColour);
    var isOneColourTest = false;

    function isTriadicColour(targetColours) {
        var currentColours = datastore.getState();
        var primaryColour = currentColours.primaryColour;
        var secondaryColour = currentColours.secondaryColour;
        var tertiaryColour = currentColours.tertiaryColour;
        var distanceBetweenPrimaryAndSecondaryColours = utility.distanceBetweenTwoColours(primaryColour, secondaryColour);
        var distanceBetweenPrimaryAndTertiaryColours = utility.distanceBetweenTwoColours(primaryColour, tertiaryColour);
        var distanceBetweenSecondaryAndTertiaryColours = utility.distanceBetweenTwoColours(secondaryColour, tertiaryColour);
        var tooSmall = 100; // degrees around the colour wheel
        var tooFar = 140; // degrees around the colour wheel
        var properSeparation = 40; // degrees around the colour wheel

        var isSecondaryColourRight = distanceBetweenPrimaryAndSecondaryColours > tooSmall && distanceBetweenPrimaryAndSecondaryColours < tooFar;
        var isTertiaryColourRight = distanceBetweenPrimaryAndTertiaryColours > tooSmall && distanceBetweenPrimaryAndTertiaryColours < tooFar;

        var areSecondaryAndTertiaryColoursDifferent = distanceBetweenSecondaryAndTertiaryColours > properSeparation;

        return isSecondaryColourRight && isTertiaryColourRight && areSecondaryAndTertiaryColoursDifferent;
    }
    
    function taskDescription(){
       var output = [];
       output.push("A triadic colour scheme uses colours that are evenly spaced around the colour wheel.");
       output.push("Triadic colour schemes are very vibrant, they are best used very desaturated to avoid being overwhelming.");
       output.push("The other way to use triads is to allow one colour to dominate and use the other two for accent.");
       return output;
   }

    view.changeSubtitle("Select triadic colours");
    view.changeDescription(taskDescription());
    runTest(newPrimaryColour, newTriadicColours, isTriadicColour, isOneColourTest);
}



function runAnalogousColourTest() {
   var newPrimaryColour = colourGenerator.generateRandomColour();
   var newAnalogousColours = colourGenerator.generateAnalogousColoursFromSeed(newPrimaryColour);
   var isOneColourTest = true;
    
    function isAnalogousColour(targetColours) {
        var currentColours = datastore.getState();
        var primaryColour = currentColours.primaryColour;
        var secondaryColour = currentColours.secondaryColour;
        var distanceBetweenColours = utility.distanceBetweenTwoColours(primaryColour,secondaryColour);
        var tooSmall = 5; // degrees around the colour wheel
        var tooFar = 60; // degrees around the colour wheel

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
   runTest(newPrimaryColour,newAnalogousColours,isAnalogousColour,isOneColourTest);
}


function runANewTest() {
    var availableTests = [];
    var randomPick;  
    
    availableTests.push(runComplementaryColourTest);
    availableTests.push(runSplitComplementaryColourTest);
    availableTests.push(runTriadicColourTest);
    availableTests.push(runAnalogousColourTest);
    
    
    randomPick = Math.floor(Math.random() * availableTests.length);
    
    availableTests[randomPick]();
    
}

runANewTest();