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
let lastIndex = imgArray.length-1;
let index = [lastIndex, 0, 1];

function createButton(buttonName) {
    let newButton = document.createElement('button');
    newButton.setAttribute('type', 'button');
    newButton.setAttribute('class', buttonName);
    newButton.setAttribute('onclick', `${buttonName}()`);
    container.appendChild(newButton); 
}

function createImageBox(boxclass) {
    let box = document.createElement('img');
    box.setAttribute('class', boxclass);
    box.setAttribute('width', '200px');
    box.setAttribute('height', '200px');
    container.appendChild(box);
}

function addSrc() {
    document.querySelector('.leftImg').setAttribute('src', imgArray[index[0]]);
    document.querySelector('.mainImg').setAttribute('src', imgArray[index[1]]);
    document.querySelector('.rightImg').setAttribute('src', imgArray[index[2]]);
}
function insertPictures() {
    createImageBox('leftImg');
    createImageBox('mainImg');
    createImageBox('rightImg');
    addSrc();
    
}

function shiftLeft() {
    for (i=0; i<index.length; i++) {
        index[i] -= 1;
        if (index[i] < 0) index[i] = lastIndex;
    }
    addSrc();
}
function shiftRight() {
    for (i=0; i<index.length; i++) {
        index[i] += 1;
        if (index[i] > lastIndex) index[i] = 0;
    }
    addSrc();
}

function createCarousel() {
    
    insertPictures();

    createButton('shiftLeft');

    createButton('shiftRight');

}

createCarousel();