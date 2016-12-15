var view = (function(){

    function showPrimaryColourAs(colour) {
        console.log("primary colour:",colour);
        changeTopBoxColour(colour); 
        setBackgroundGradientTo(colour); 
    }


    function showSecondaryColourAs(colour) {
        console.log("secondary colour:",colour);
        changeLogoColour(colour);
        changeCircleColour(colour);
        changeNavItemsColour(colour);

    }


    function showTertiaryColourAs(colour) {
        console.log("tertiary colour:",colour);

    }

    function render() {
        var colours = datastore.getState();
        showPrimaryColourAs(colours.primaryColour);
        showSecondaryColourAs(colours.secondaryColour);
        showTertiaryColourAs(colours.tertiaryColour);
    }

    datastore.subscribe(render);
    render();



    // functions for updating individual UI elements
    function changeTopBoxColour(colour) {
        var topBox = document.querySelector("#primary-colour > .colour-box");
        topBox.style.backgroundColor = colour.toString();
    }

    function changeLogoColour(colour) {
        var logo = document.querySelector("figure nav .logo");
        logo.style.backgroundColor = colour.toString();
    }

    function changeCircleColour(colour) {
        var circle = document.querySelector("figure svg circle");
        circle.style.fill = colour.toString();

    }

    function changeNavItemsColour(colour) {
        var navItems = document.querySelectorAll("figure nav .nav-item");
        navItems.forEach( (navItem) => navItem.style.backgroundColor = colour.toString()  );

    }

    function setBackgroundGradientTo(colour) {
        var wireframe = document.querySelector("#colour-visualiser");
        wireframe.style.backgroundImage = utility.generateGradientFrom(colour); 
    }

    // functions for adding elements to the UI

    function addColourOption(colour) {
        var colourBoxList = document.querySelector("#choice-of-colours ul");
        var li = document.createElement("li");
        var box = document.createElement("div");
        box.classList.add("colour-box");
        box.style.backgroundColor = colour.toString();
        box.dataset.colour = colour.toString();

        li.appendChild(box);
        colourBoxList.appendChild(li);

        box.addEventListener("click",datastore.changeSecondaryColour.bind(null,box.dataset.colour));
    }
    
    function addSubmitButton() {
        var colourBoxList = document.querySelector("#choice-of-colours ul");
        var li = document.createElement("li");
        var button = utility.createButton("select");
        
        li.style.position = "absolute";
        li.appendChild(button);
        colourBoxList.appendChild(li); 
        
        return button;
    }

    // functions for removing elements from the UI

    function clearColourOptions() {
        var colourBoxList = document.querySelector("#choice-of-colours ul");
        Array.from(colourBoxList.children).forEach( node => colourBoxList.removeChild(node) ); 
    }

    return {clearColourOptions,addColourOption,addSubmitButton};
})();