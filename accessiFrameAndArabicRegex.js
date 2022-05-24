let arabicMutationObserver = () => {
    let config = { 
        attributes: true, 
        childList: true, 
        subtree: true 
    };

    let callback = () => {
        // These two lines are the key to accessing the document found within an embedded iframe
        var currentFrame = document.getElementById('quiz-embed');       
        var currentDocument = currentFrame.contentWindow.document;  
    
        
        if(currentDocument != null){
        console.log('CALLBACK SUCCESSFULLY TRIGGERED');

        let learningEmbed = currentDocument.querySelector('.learning-embed');

        if(learningEmbed != null){
            learningEmbed.style.textAlign = 'right';
            return;
        } 
        }
        
    };


    new MutationObserver(() => {
        let actTitleEl = document.querySelector('[data-test="activity-title"]');

        if(actTitleEl !== null){
        console.log('ACTIVITY DETECTED')
        let preTitleEl = document.querySelector('.uk-text-small');
        
        // This is a regex to determine if any arabic characters exist in any given string
        let regex = /[\u0600-\u06ff]|[\u0750-\u077f]|[\ufb50-\ufbc1]|[\ufbd3-\ufd3f]|[\ufd50-\ufd8f]|[\ufd92-\ufdc7]|[\ufe70-\ufefc]|[\uFDF0-\uFDFD]/;
        // This checks a string to the regex
        if(regex.test(actTitleEl.textContent)){
            actTitleEl.style.float = 'right';
            preTitleEl.style.textAlign = 'right';
            callback();
        }
        } 
    }).observe(document, config)
}

arabicMutationObserver();