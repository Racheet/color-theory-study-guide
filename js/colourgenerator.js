var colourGenerator = (function() {
    
    function generateRandomColourFromSeed(initialColour) {
        initialColour = initialColour || datastore.getState().primaryColour;
        var hue = utility.getHue(initialColour);
        var saturation = utility.getSaturation(initialColour);
        var lightness = utility.getLightness(initialColour);

        return `hsl(${ parseInt(Math.random() * 360) }, ${ saturation }, ${ lightness })`
    }

    function generateComplementaryColourFromSeed(initialColour) {
        initialColour = initialColour || datastore.getState().primaryColour;
        var wrappedColour = utility.parseViaChromath(initialColour);
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

    return {generateRandomColourFromSeed,generateComplementaryColourFromSeed,generateRandomColour};
    
})()
