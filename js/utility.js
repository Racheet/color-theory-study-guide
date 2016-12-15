var utility = (function() {

    function distanceBetweenTwoColours(colour1,colour2) {
        var hue1 = parseInt(getHue(colour1));
        var hue2 = parseInt(getHue(colour2));
        var smaller = Math.min(hue1,hue2);
        var larger = Math.max(hue1,hue2);
        var distance = larger - smaller;
        
        return distance < 180? distance :  360 - distance; 
    }
 
    function stripSimilarColours(arr){
        
        arr.sort((colour1, colour2) => parseInt(getHue(colour2)) - parseInt(getHue(colour1)));
        
        return arr.reduce( function (memo,next,index) {
            var firstColour, secondColour;
            var tooClose = 30;

            if (memo.length === 0) {return [next];};

            firstColour = utility.getHue(memo[memo.length - 1]);
            secondColour = utility.getHue(next);

            return Math.abs(firstColour - secondColour) < tooClose? memo : memo.concat(next);
            
        },[]);
    }
    
    function createButton(caption) {
        var button = document.createElement("button");
        
        button.classList.add("btn","btn-7", "btn-7h");
        button.textContent = caption.toString();
        
        return button;
    }
    
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

    return {getHue,getSaturation,getLightness,generateGradientFrom,distanceBetweenTwoColours,stripSimilarColours,parseViaChromath,createButton};

})()