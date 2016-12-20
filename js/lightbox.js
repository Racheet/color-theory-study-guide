var lightbox = (function lightbox() {

    var config =  {
        unsafeMessage:[ 
        "<aside>",
            "<h2>The Colour Wheel</h2>",
            "<p>The colour wheel is a tool for selecting harmonious combinations of colour.</p>",
            "<p>By learning to place colours on the wheel, you\'ll become better at selecting pairs of colours that look good together.</p>",
            '<img src="/img/colourwheel_big.svg" />',
         "</aside>"].join("")
       };

    
    vex.defaultOptions.className = "vex-theme-default";

    function open() {
        vex.dialog.alert(config);
    }




    return {
        open
    };
}());