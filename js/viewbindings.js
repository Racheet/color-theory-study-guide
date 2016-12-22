var view = (function(){

    function showPrimaryColourAs(colour) {
        console.log("primary colour:",colour);
        changeTopBoxColour(colour); 
        setBackgroundGradientTo(colour); 
    }


    function showSecondaryColourAs(colour) {
        console.log("secondary colour:",colour);
        changeLogoColour(colour);
        changeNavItemsColour(colour);

    }


    function showTertiaryColourAs(colour) {
        console.log("tertiary colour:",colour);
        changeCircleColour(colour);

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

    function changeSubtitle(copy) {
        var subtile = document.querySelector("#subtitle");
        subtile.textContent = copy.toString();
    }
    
    function changeDescription(newChildren) {
        var description = document.querySelector("#task-description");
        Array.from(description.children).forEach( node => description.removeChild(node) ); 
        newChildren.forEach( text =>  { 
            var li = document.createElement("li");
            var span = document.createElement("span");
            li.appendChild(span);
            span.textContent = text.toString();
            description.appendChild(li);
        });
    }
    
    
    // functions for adding elements to the UI

    function addColourOption(isOneColourTest = true,colour) {
        var colourBoxList = document.querySelector("#choice-of-colours ul#list-of-colours");
        var li = document.createElement("li");
        var box = document.createElement("div");
        box.classList.add("colour-box");
        box.style.backgroundColor = colour.toString();
        box.dataset.colour = colour.toString();

        li.appendChild(box);
        colourBoxList.appendChild(li);

        box.addEventListener("click",clickOnBox.bind(null,box,isOneColourTest));
    }
    
    function addSubmitButton() {
        var colourBoxList = document.querySelector("#choice-of-colours ul#list-of-colours");
        var li = document.createElement("li");
        var button = utility.createButton("select");
        
        li.style.position = "absolute";
        li.appendChild(button);
        colourBoxList.appendChild(li); 
        
        return button;
    }

    // functions for removing elements from the UI

    function clearColourOptions() {
        var colourBoxList = document.querySelector("#choice-of-colours ul#list-of-colours");
        Array.from(colourBoxList.children).forEach( node => colourBoxList.removeChild(node) ); 
    }
    
    function deselectAllColourBoxes() {
        var colourBoxList = document.querySelector("#choice-of-colours ul#list-of-colours");
        Array.from(colourBoxList.querySelectorAll("div")).forEach( div => div.classList.remove("selected-colour-box","secondary-colour","tertiary-colour") ); 
        datastore.setSecondaryColour("#fff");
        datastore.setTertiaryColour("#fff");
    }
    
     function deselectFirstColourBox() {
        var firstColourBoxList = document.querySelectorAll("#choice-of-colours ul#list-of-colours div.secondary-colour");
        Array.from(firstColourBoxList).forEach( div => div.classList.remove("selected-colour-box","secondary-colour") ); 
        datastore.changeSecondaryColour("#000");
    }   
    
     function deselectSecondColourBox() {
        var secondColourBoxList = document.querySelectorAll("#choice-of-colours ul#list-of-colours div.tertiary-colour");
        Array.from(secondColourBoxList).forEach( div => div.classList.remove("selected-colour-box","tertiary-colour") ); 
        datastore.changeTertiaryColour("#000");
    }
    // click handlers
    
    function selectFirstBox(box) {
        deselectFirstColourBox();
        box.classList.add("selected-colour-box","secondary-colour");
        datastore.changeSecondaryColour(box.dataset.colour);
    }

    function selectSecondBox(box) {
        deselectSecondColourBox();
        box.classList.add("selected-colour-box","tertiary-colour");
        datastore.changeTertiaryColour(box.dataset.colour);
    }
    
    function clickOnBox(box,isOneColourTest = true) {
        var colourBoxList = document.querySelectorAll("#choice-of-colours ul#list-of-colours li div");
        var isFirstBoxSet = Array.from(colourBoxList).some( div => div.classList.contains("secondary-colour"));
        var isClickOnFirstBox = box.classList.contains("secondary-colour");
        var isClickOnSecondBox = box.classList.contains("tertiary-colour");
        
        if (isClickOnFirstBox) { return deselectFirstColourBox(); }
        if (isClickOnSecondBox) { return deselectSecondColourBox(); }
        if (isOneColourTest) { return selectFirstBox(box); }
        if (isFirstBoxSet) { return selectSecondBox(box); }
        
        return selectFirstBox(box);
    }
  
    function bindLightboxToRibbon () {
        var ribbon = document.querySelector("aside#colour-wheel");
        ribbon.addEventListener("click",lightbox.open);
    }
    
    // setup
    
    bindLightboxToRibbon();
    
    return {clearColourOptions,addColourOption,addSubmitButton,changeSubtitle,changeDescription};
})();