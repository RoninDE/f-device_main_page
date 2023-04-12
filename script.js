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

function shiftImages(isForward) {
    for (i = 0; i < index.length; i++) {
        index[i] = isForward ? (index[i] + 1) : (index[i] - 1);
    }
    properIndex();
    updateSrc();
    console.log(index);
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

function updateSrc() {
    document.querySelector('.hiddenImg').setAttribute('src', imgArray[index[0]]);
    document.querySelector('.leftImg').setAttribute('src', imgArray[index[1]]);
    document.querySelector('.mainImg').setAttribute('src', imgArray[index[2]]);
    document.querySelector('.rightImg').setAttribute('src', imgArray[index[3]]);
}

function createCarousel() {
    
    createImageBox('hiddenImg');
    createImageBox('leftImg');
    createImageBox('rightImg');
    createImageBox('mainImg');
    updateSrc();

    createButton('shiftLeft', 0);

    createButton('shiftRight', 1);

}

createCarousel();