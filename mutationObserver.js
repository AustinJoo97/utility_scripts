let changeFlag = false;

let checkIfNodeAvailable = () => {
    let targetNode = document.querySelector('#someTag');

    let config = { 
        attributes: true, 
        childList: true, 
        subtree: true 
    };

    function callback(mutationList, observer){
        let someVar = document.getElementById('someElementID') || null;

        if(someVar != null && someVar.contentWindow.document.querySelector('.someElementClass') != null){
            let splitXofX = someVar.contentWindow.document.querySelector('.someElementClass').innerText.split(' ');

            if(splitXofX[0] == splitXofX[splitXofX.length-1] && changeFlag == false){
                changeButton();
            } else {
                changeFlag = false;
            }
        }
    }

    function changeButton(){
        document.querySelector('.someClassToChange').innerText = 'Some New Value';

        changeFlag = true;
    }

    let observer = new MutationObserver(callback)

    observer.observe(targetNode, config);
}

checkIfNodeAvailable();


//Alternative
let alternateMutationObserver = () => {
    let config = { 
        attributes: true, 
        childList: true, 
        subtree: true 
    };
    
    let callback = () => {
        console.log('console logging')
    };
    
    
    new MutationObserver(() => {
        let someElement = document.querySelector('someElement');
    
        if(someElement !== null){
            callback()
        } 
    }).observe(document, {subtree: true, childList: true});
    //}).observe(document, config)
}

alternateMutationObserver();