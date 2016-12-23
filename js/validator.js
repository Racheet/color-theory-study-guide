var validator = (function() {
    
    function successfulActivation(button) {
            button.classList.add("btn-success");
            button.classList.remove("btn-error");
    }
    
    function unsuccessfulActivation(button) {
            button.classList.add("btn-error");
            button.classList.remove("btn-success");
            setTimeout( () => button.classList.remove("btn-error"),1000);
    }
    
    function generateButtonClickHandler(button,predicate) {
        
        return function buttonClickHandler(e) {
           if (typeof predicate === "function" && predicate()) {
               successfulActivation(button);
           } else {
               unsuccessfulActivation(button);
           }
        };
    }
    
    
    
    return {generateButtonClickHandler};
})()