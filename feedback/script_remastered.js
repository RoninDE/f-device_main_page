const imgArray = [
    'images/cat1.jpg',
    'images/cat2.jpg',
    'images/cat3.jpg',
    'images/cat4.jpg',
    'images/cat5.png',
    'images/cat6.png',
    'images/cat7.png',
];
const container = document.querySelector('.imgCarousel');
const leftImgTransform = "translate(-200px) scale(1)";
const mainImgTransform = "translate(0px) scale(1.5)";
const rightImgTransform = "translate(200px) scale(1)";
const hiddenImgTransform = "translate(0px) scale(0.5)";

const carouselSlidesCount = 3;
const animationDuration = 500;

let images = [];
let leftImg, mainImg, rightImg, hiddenImg;

const rolesPositions = ['left', 'hidden', 'right', 'main'];

let hiddenSrcIndex;
let animationTimeout;

function createCarousel() {
    
    const imgElems = createImages(4);
    images = [...imgElems];
    for (i = 0; i < carouselSlidesCount + 1; i++) {
        images[i].setAttribute('src', imgArray[i]);
    }
    hiddenSrcIndex = carouselSlidesCount;
    setDefaultStyles();
    appendImages(container, images);
    appendButtons();
}

/*create and append*/ 
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

function createImageBox() {
    let box = document.createElement('img');

    return box;
}

function createImages(n) {
   return new Array(n).fill('').map(() => createImageBox());
}

function appendImages(target, imgs) {
    imgs.forEach(img => target.appendChild(img));
}

function getValidOffsetableIndex(length, i) {
   return i >= 0 ? i % length : (length + i) % length;
}

function setImageStyles(img, type = 'left' | 'right' | 'main' | 'hidden', isForward = true) {
    switch (type) {
        case 'left':
            img.style.transform = leftImgTransform;
            img.style.zIndex = isForward ? 4 : 3;
            break;
        case 'right':
            img.style.transform = rightImgTransform;
            img.style.zIndex = isForward ? 3 : 4;
            break;
        case 'main':
            img.style.transform = mainImgTransform;
            img.style.zIndex = 5;
            break;
        case 'hidden':
            img.style.transform = hiddenImgTransform;
            img.style.zIndex = 1;
            break;
    }
}

function moveArrayItemsBySteps(array, n) {
    const arrayCopy = [...array];

    for (let i = 0; i < array.length; i++) {
        array[i] = arrayCopy[getValidOffsetableIndex(array.length, i + n)];
    }

    return array;
}

function matchStyles(imgs, roles, isForward) {
    imgs.forEach((img, index) => setImageStyles(img, roles[index], isForward));
}

function setDefaultStyles() {
    matchStyles(images, rolesPositions);

    images.forEach(img => {
        img.style.transition = `transform ${animationDuration}ms`;
    });
}

function updateHidden(src) {
    const hiddenIndex = rolesPositions.findIndex(v => v === 'hidden');

    images[hiddenIndex].setAttribute('src', src);
}

function changeImageStyles(isForward) {
    moveArrayItemsBySteps(rolesPositions, isForward ? 1 : -1);
    matchStyles(images, rolesPositions, isForward);
}

function shiftImages(isForward) {
    if (animationTimeout) {
        return;
    }

    hiddenSrcIndex += isForward ? 1 : -1;
    const newHiddenSrcIndex = getValidOffsetableIndex(imgArray.length, hiddenSrcIndex);
    const newHiddenSrc = imgArray[newHiddenSrcIndex];
    console.log(hiddenSrcIndex, newHiddenSrcIndex);
    updateHidden(newHiddenSrc);
    changeImageStyles(isForward);

    animationTimeout = setTimeout(() => {
        animationTimeout = undefined;
    }, animationDuration + 5);
}

function trot(n = 1) {
    if (timeout) {
        clearTimeout(timeout);
        
    } else {
        n *= 2;
        console.log(n);
    }

    timeout = setTimeout(() => {
        console.log(n);
    }, 200)

    

}

createCarousel();