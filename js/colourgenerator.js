var colourGenerator = (function() {
    
    function generateRandomColourFromSeed(initialColour) {
        initialColour = initialColour || datastore.getState().primaryColour;
        var hue = utility.getHue(initialColour);
        var saturation = utility.getSaturation(initialColour);
        var lightness = utility.getLightness(initialColour);

        return `hsl(${ parseInt(Math.random() * 361) }, ${ saturation }, ${ lightness })`
    }

    function generateComplementaryColourFromSeed(initialColour) {
        initialColour = initialColour || datastore.getState().primaryColour;
        var wrappedColour = utility.parseViaChromath(initialColour);
        var complement = wrappedColour.complement().toString();

        return complement;

    }
    
    function generateSplitComplementaryColoursFromSeed(initialColour) {
        initialColour = initialColour || datastore.getState().primaryColour;
        var wrappedColour = utility.parseViaChromath(initialColour);
        var splitComplement = wrappedColour.splitcomplement().map( colour => colour.toString() );

        return splitComplement.slice(1);

    }   
    
    function generateTriadicColoursFromSeed(initialColour) {
        initialColour = initialColour || datastore.getState().primaryColour;
        var wrappedColour = utility.parseViaChromath(initialColour);
        var triadicColours = wrappedColour.triad().map( colour => colour.toString() );

        return triadicColours.slice(1);

    }   
 
    function generateAnalogousColoursFromSeed(initialColour) {
        initialColour = initialColour || datastore.getState().primaryColour;
        var wrappedColour = utility.parseViaChromath(initialColour);
        var analogousColours = wrappedColour.analogous(2).map( colour => colour.toString() );

        return analogousColours.slice(1);

    }
    
    function generateRandomColour() {
        var hue = parseInt(Math.random() * 360); 
        var saturation = parseInt(70 + Math.random() * 30) + "%";
        var lightness = parseInt(30 + Math.random() * 40) + "%";

        var output = `hsl(${ hue }, ${ saturation }, ${ lightness })`

        return output;
    }

    return {
        generateRandomColourFromSeed,
        generateComplementaryColourFromSeed,
        generateSplitComplementaryColoursFromSeed,
        generateTriadicColoursFromSeed,
        generateAnalogousColoursFromSeed,
        generateRandomColour
    };
    
})()
