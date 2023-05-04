const imgArray = [
    'images/1.jpg',
    'images/2.jpg',
    'images/3.jpg',
    'images/4.jpg',
    'images/5.jpg',
    'images/6.jpg',
    'images/7.jpg',
];
const container = document.querySelector('.imgCarousel');
const leftImgTransform = "scale(1) translate(-200px)";
const mainImgTransform = "scale(1.5) translate(0px)";
const rightImgTransform = "scale(1) translate(200px)";
const hiddenImgTransform = "scale(0.5) translate(0px)";

const positions = ['left', 'main', 'right', 'hidden'];

const carouselImagesCount = 3;
const animationDuration = 300;

let images = [];
let leftImg, mainImg, rightImg, hiddenImg;
let mainSrcIndex;

let animationTimeout;

function createCarousel() {
    const imgElems = createImages(carouselImagesCount + 1);
    images = [...imgElems];
    for (i = 0; i < carouselImagesCount + 1; i++) {
        images[i].setAttribute('src', imgArray[getValidIndex(imgArray.length, i - 1)]);
    }
    mainSrcIndex = 0;
    matchStylesToImages(images, positions);
    appendImages(container, images);
    console.log(images);
    appendButtons();
}

/*create and append*/ {
function createButton(buttonName, isForward) {
    let newButton = document.createElement('button');
    newButton.className = buttonName;
    newButton.addEventListener('click', () => shiftImages(isForward));

    return newButton;
}

function appendButtons() {
    leftButton = createButton('shiftLeft', 0);
    container.appendChild(leftButton); 

    rightButton = createButton('shiftRight', 1);
    container.appendChild(rightButton); 
}

function createImageElement() {
    let box = document.createElement('img');

    return box;
}

function createImages(n) {
    return new Array(n).fill('').map(() => createImageElement());
}

function appendImages(target, imgs) {
    imgs.forEach(img => target.appendChild(img));
}
}

function setImagePositions(img, pos = 'left' | 'right' | 'main' | 'hidden', isForward = true) {
    switch (pos) {
        case 'left':
            img.style.transform = leftImgTransform;
            img.style.zIndex = isForward ? 3 : 2;
            break;
        case 'main':
            img.style.transform = mainImgTransform;
            img.style.zIndex = 4;
            break;
        case 'right':
            img.style.transform = rightImgTransform;
            img.style.zIndex = isForward ? 2 : 3;
            break;
        case 'hidden':
            img.style.transform = hiddenImgTransform;
            img.style.zIndex = 1;
            break;
    }
}

function getValidIndex(length, i) {
    return i >=0 ? i % length : Math.abs(i + length) % length;
}

function shiftArrayItems(array, n) {
    const arrayCopy = [...array];

    for (let i = 0; i < array.length; i++) {
        array[i] = arrayCopy[getValidIndex(array.length, i + n)];
    }

    return array;
}

function matchStylesToImages(imgs, pos, isForward) {
    imgs.forEach((img, index) => {setImagePositions(img, pos[index], isForward);
                                  img.style.transition = `${animationDuration}ms`;
                                 }
    );
}

function changeImageStyles(isForward) {
    shiftArrayItems(positions, isForward ? -1 : 1);
    matchStylesToImages(images, positions, isForward);
}

function updateHidden(src) {
    const hiddenIndex = positions.findIndex(x => x === 'hidden');
    images[hiddenIndex].setAttribute('src', src);
}

function shiftImages(isForward) {
    if (animationTimeout) {
        return;
    }

    const newHiddenSrcIndex = getValidIndex(imgArray.length, mainSrcIndex + (isForward ? 2 : -2));
    const newHiddenSrc = imgArray[newHiddenSrcIndex];
    mainSrcIndex += isForward ? 1 : -1;
        console.log(mainSrcIndex, newHiddenSrcIndex);
        updateHidden(newHiddenSrc);
        changeImageStyles(isForward);
    
    animationTimeout = setTimeout(() => {
        animationTimeout = undefined;
    }, animationDuration + 5);

}

createCarousel();