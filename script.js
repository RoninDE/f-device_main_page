let imgArray = [
    'images/cat1.jpg',
    'images/cat2.jpg',
    'images/cat3.jpg',
    'images/cat4.jpg',
    'images/cat5.png',
    'images/cat6.png',
    'images/cat7.png',
];
let container = document.querySelector('.imgCarousel');
let index = [imgArray.length-1, 0, 1, 2];

function properIndex() {
    for (i = 0; i < index.length; i++) {
        if (index[i] >= imgArray.length) 
            index[i] = index[i] % imgArray.length
        else if (index[i] < 0) 
            index[i] = (imgArray.length + index[i]) % imgArray.length;
    }

};
function addAnimationClass(isForward) {
    if (isForward) {
        document.querySelector('.hiddenImg').classList.add('hiddenImg-animate-forward');
        document.querySelector('.mainImg').classList.add('mainImg-animate-forward');
        document.querySelector('.leftImg').classList.add('leftImg-animate-forward');
        document.querySelector('.rightImg').classList.add('rightImg-animate-forward');
    } else {
        document.querySelector('.hiddenImg').classList.add('hiddenImg-animate-backward');
        document.querySelector('.mainImg').classList.add('mainImg-animate-backward');
        document.querySelector('.leftImg').classList.add('leftImg-animate-backward');
        document.querySelector('.rightImg').classList.add('rightImg-animate-backward');
    }
}

function removeAnimationClass(isForward) {
    if (isForward) {
        document.querySelector('.hiddenImg').classList.remove('hiddenImg-animate-forward');
        document.querySelector('.mainImg').classList.remove('mainImg-animate-forward');
        document.querySelector('.leftImg').classList.remove('leftImg-animate-forward');
        document.querySelector('.rightImg').classList.remove('rightImg-animate-forward');
    } else {
        document.querySelector('.hiddenImg').classList.remove('hiddenImg-animate-backward');
        document.querySelector('.mainImg').classList.remove('mainImg-animate-backward');
        document.querySelector('.leftImg').classList.remove('leftImg-animate-backward');
        document.querySelector('.rightImg').classList.remove('rightImg-animate-backward');
    }
}

function changeImageClass(isForward) {
    if (isForward) {
        document.querySelector('.hiddenImg-animate-forward').className = 'rightImg';
        document.querySelector('.mainImg-animate-forward').className = 'leftImg';
        document.querySelector('.leftImg-animate-forward').className = 'hiddenImg';
        document.querySelector('.rightImg-animate-forward').className = 'mainImg';
    } else {
        document.querySelector('.hiddenImg-animate-backward').className = 'leftImg';
        document.querySelector('.mainImg-animate-backward').className = 'rightImg';
        document.querySelector('.leftImg-animate-backward').className = 'mainImg';
        document.querySelector('.rightImg-animate-backward').className = 'hiddenImg';
    }
}

function animate(isForward) {
    addAnimationClass(isForward);
    setTimeout(changeImageClass, 500, isForward);
    setTimeout(removeAnimationClass, 500, isForward);
}
                


function shiftImages(isForward) {
    for (i = 0; i < index.length; i++) {
        index[i] = isForward ? (index[i] + 1) : (index[i] - 1);
    }
    properIndex();
    animate(isForward);
    setTimeout(updateHidden, 500);
    // console.log(index);
}

function createButton(buttonName, isForward) {
    let newButton = document.createElement('button');
    newButton.className = buttonName;
    newButton.addEventListener('click', function() {shiftImages(isForward);});
    container.appendChild(newButton); 
}

function createImageBox(boxclass) {
    let box = document.createElement('img');
    box.setAttribute('class', boxclass);
    container.appendChild(box);
}

function setSrc() {
    document.querySelector('.leftImg').setAttribute('src', imgArray[index[0]]);
    document.querySelector('.mainImg').setAttribute('src', imgArray[index[1]]);
    document.querySelector('.rightImg').setAttribute('src', imgArray[index[2]]);
    document.querySelector('.hiddenImg').setAttribute('src', imgArray[index[3]]);
}

function updateHidden() {
    document.querySelector('.hiddenImg').setAttribute('src', imgArray[index[3]]);

}

function createCarousel() {
    
    createImageBox('hiddenImg');
    createImageBox('leftImg');
    createImageBox('rightImg');
    createImageBox('mainImg');
    setSrc();

    createButton('shiftLeft', 0);

    createButton('shiftRight', 1);

}

createCarousel();