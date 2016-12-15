var datastore = (function datatore() {
    var store = Redux.createStore(updateState);

    // define all actions the ui can take.

    function changeColour(colour, newColour) {
        var action = {
            "type": "update colour",
            "colour": colour,
            "newColour": newColour
        };

        store.dispatch(action);
    }

    var changePrimaryColour = changeColour.bind(null, "primary colour");
    var changeSecondaryColour = changeColour.bind(null, "secondary colour");
    var changeTertiaryColour = changeColour.bind(null, "tertiary colour");
    var subscribe = store.subscribe;
    var getState = store.getState;

    // define how each action modifies the state of the app.

    // define how to change a colour

    function updateSavedColours(oldColours, action) {
        var output = {};

        output.primaryColour = oldColours.primaryColour;
        output.secondaryColour = oldColours.secondaryColour;
        output.tertiaryColour = oldColours.tertiaryColour;

        switch(action.colour) {
        case "primary colour":
            output.primaryColour = action.newColour;
            return output;

        case "secondary colour":
            output.secondaryColour = action.newColour;
            return output;

        case "teriary colour":
            output.tertiaryColour = action.newColour;
            return output;
        }


    }

    function updateState(state, action) {
        var defaultOutput = {
            "primaryColour": "#55f",
            "secondaryColour": "#000",
            "tertiaryColour": "#000"
        };

        switch(action.type) {
        case "update colour":
            return updateSavedColours(state, action);

        default:
            return defaultOutput;
        }

    }
    
    return {changePrimaryColour,changeSecondaryColour,changeTertiaryColour,subscribe,getState};

})();