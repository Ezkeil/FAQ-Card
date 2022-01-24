//Call function
document.addEventListener("DOMContentLoaded", () => {
    const qaPairs = new Map();
    var key, value;
    const questionArr = Array.from(document.getElementsByClassName('question'));
    const answerArr = Array.from(document.getElementsByClassName('answer'));
    for(let i = 0; i < questionArr.length; i++){
        key = questionArr[i].getAttribute('id');
        value = answerArr[i].getAttribute('id');
        qaPairs.set(key, value);
    }
    
    qaPairs.forEach((value, key) =>{
        let button = document.getElementById(key); 
        let arrow = button.lastElementChild;
        let card = document.getElementById(value);
        button.addEventListener('click', (event) =>{
            event.preventDefault();
            qaPairs.forEach((valueElse, keyElse) => {
                let buttonElse = document.getElementById(keyElse);
                let arrowElse = buttonElse.lastElementChild;
                let cardElse = document.getElementById(valueElse);
                if(window.getComputedStyle(cardElse).display === 'block'){
                    deactivate(buttonElse, arrowElse);
                    slideUp(cardElse);
                }
            })
            slideToggle(card, button, arrow);
        })
    })
    
});

//Question state control
function activate(questionElement, imageElement, duration = 250){
    questionElement.style.fontWeight = '900';
    let padding = window.getComputedStyle(imageElement).paddingTop;
    imageElement.style.paddingBottom = padding;
    imageElement.style.removeProperty('padding-top');
    imageElement.style.transitionDuration = duration + 'ms';
    imageElement.style.transitionProperty = 'ease-out, transform';
    imageElement.style.transform = 'rotate(180deg)';
    window.setTimeout(function() {
        imageElement.style.removeProperty('transition-duration');
        imageElement.style.removeProperty('transition-property');
    },duration)
}

function deactivate(questionElement, imageElement, duration = 250){
    questionElement.style.removeProperty('font-weight');
    imageElement.style.removeProperty('padding-bottom');
    imageElement.style.transitionDuration = duration + 'ms';
    imageElement.style.transitionProperty = 'ease-out, transform';
    imageElement.style.transform = 'rotate(360deg)';
    window.setTimeout(function() {
        imageElement.style.removeProperty('transition-duration');
        imageElement.style.removeProperty('transition-property');
    },duration)
}

//Slide animation
function slideToggle (answerElement, questionElement, imageElement, duration = 250) {

    if (window.getComputedStyle(answerElement).display === 'none') {
        slideDown(answerElement, duration);
        activate(questionElement, imageElement, duration);
    } 
    else {
        slideUp(answerElement, duration);
        // deactivate(questionElement, imageElement, duration);
    }
}


function slideUp(element, duration = 250) {
    element.style.height = element.offsetHeight + 'px';
    element.style.transitionProperty = `height, padding`;
    element.style.transitionDuration = duration + 'ms';
    element.offsetHeight; //???? why is this need to be written
    element.style.overflow = 'hidden';
    element.style.height = 0;
    element.style.paddingTop = 0;
    element.style.paddingBottom = 0;
    window.setTimeout(function () {
        element.style.display = 'none';
        element.style.removeProperty('height');
        element.style.removeProperty('padding-top');
        element.style.removeProperty('padding-bottom');
        element.style.removeProperty('overflow');
        element.style.removeProperty('transition-duration');
        element.style.removeProperty('transition-property');
    }, duration)
}

   
 function slideDown(element, duration = 250) {
    element.style.removeProperty('display');
    let display = window.getComputedStyle(element).display;

    if (display === 'none') 
        display = 'block';

    element.style.display = display;
    let height = element.offsetHeight;
    element.style.overflow = 'hidden';
    element.style.height = 0;
    element.style.paddingTop = 0;
    element.style.paddingBottom = 0;
    element.offsetHeight; // = 0
    element.style.transitionProperty = `height, padding`;
    element.style.transitionDuration = duration + 'ms';
    element.style.height = height + 'px';
    element.style.removeProperty('padding-top');
    element.style.removeProperty('padding-bottom');
    window.setTimeout(function () {
        element.style.removeProperty('height');
        element.style.removeProperty('overflow');
        element.style.removeProperty('transition-duration');
        element.style.removeProperty('transition-property');
    }, duration)
}


