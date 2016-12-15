// utility functions

function getHue(colour){
    var wrappedColour = parseViaChromath(colour);
    return wrappedColour.toHSLObject().h;
}

function getSaturation(colour){
    var wrappedColour = parseViaChromath(colour);
    return parseInt(wrappedColour.toHSLObject().s * 100).toString() + "%";
}

function getLightness(colour){
    var wrappedColour = parseViaChromath(colour);
    return parseInt(wrappedColour.toHSLObject().l * 100).toString() + "%";
}

function generateGradientFrom(colour) {
    var hue = getHue(colour);
    var saturation = getSaturation(colour);
    var gradientRange = 5;
    var standardGradient = `radial-gradient(circle at top center, hsl(${Math.max(hue-gradientRange,0)},${saturation},100%), hsl(${Math.min(hue+gradientRange,360)},${saturation},85%))`;
    return standardGradient;
}

function parseViaChromath(colour){
    var colourValues; 
     if (/hsl/.test(colour)) {
       colourValues = colour.match(/hsl\((\d{1,3}),\s*(\d{1,3})%,\s*(\d{1,3})%\s*\)/).slice(1);
       return Chromath.hsl(colourValues[0],colourValues[1],colourValues[2]);
    }
    return new Chromath(colour);
}