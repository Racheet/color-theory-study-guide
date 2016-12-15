function generateRandomColourFromSeed(initialColour) {
    initialColour = initialColour || datastore.getState().primaryColour;
    var hue = getHue(initialColour);
    var saturation = getSaturation(initialColour);
    var lightness = getLightness(initialColour);

    return `hsl(${ parseInt(Math.random() * 360) }, ${ saturation }, ${ lightness })`
}

function generateComplementaryColourFromSeed(initialColour) {
    initialColour = initialColour || datastore.getState().primaryColour;
    var wrappedColour = parseViaChromath(initialColour);
    var complement = wrappedColour.complement().toString();

    return complement;

}


function generateRandomColour() {
    var hue = parseInt(Math.random() * 360); 
    var saturation = parseInt(Math.random() * 100) + "%";
    var lightness = parseInt(Math.random() * 100) + "%";
   
    var output = `hsl(${ hue }, ${ saturation }, ${ lightness })`
    
    return output;
}


function resetColourOptions() {
    
    view.clearColourOptions();

    var colourOptions = []

    for(let i = 0, limit = Math.max(2, Math.random() * 14); i <= limit; i++) {
            colourOptions.push(generateRandomColourFromSeed());
            console.log("colour",i + 1,"of",parseInt(limit + 1),"is",colourOptions[i]);
    }

    colourOptions.push(generateComplementaryColourFromSeed());
    colourOptions.sort((colour1, colour2) => parseInt(getHue(colour2)) - parseInt(getHue(colour1)));

    colourOptions.forEach(view.addColourOption);
}

datastore.changePrimaryColour(generateRandomColour());
resetColourOptions();