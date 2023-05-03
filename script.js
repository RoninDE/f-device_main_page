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
let imgIndexArray = [imgArray.length-1, 0, 1, 2];


let boxArray = [];
let leftImg, mainImg, rightImg, hiddenImg;
let leftStyle, mainStyle, rightStyle, hiddenStyle, spareStyle; 
console.log(boxArray);

function createCarousel() {
    
    appendImgBoxes();
    boxArray = [leftImg, mainImg, rightImg, hiddenImg] = [document.querySelector('.leftImg'),
                                                          document.querySelector('.mainImg'),
                                                          document.querySelector('.rightImg'),
                                                          document.querySelector('.hiddenImg')];
    setSrc();
    console.log(imgIndexArray);
    setStyles();
    leftStyle = leftImg.style.transform;
    mainStyle = mainImg.style.transform;
    rightStyle = rightImg.style.transform;
    hiddenStyle = hiddenImg.style.transform;
    console.log(rightImg, document.querySelector('.rightImg'));

    console.log(leftStyle);
    appendButtons();
}

/*create and append*/ {
function createButton(buttonName, isForward) {
    let newButton = document.createElement('button');
    newButton.className = buttonName;
    newButton.addEventListener('click', function() {shiftImages(isForward);});
    return newButton;
}

function appendButtons() {
    leftButton = createButton('shiftLeft', 0);
    container.appendChild(leftButton); 

    rightButton = createButton('shiftRight', 1);
    container.appendChild(rightButton); 
}

function createImageBox(boxclass) {
    let box = document.createElement('img');
    box.setAttribute('class', boxclass);
    return box;
    
}

function appendImgBoxes() {
    hiddenBox = createImageBox('hiddenImg');
    container.appendChild(hiddenBox);

    leftBox = createImageBox('leftImg');
    container.appendChild(leftBox);

    rightBox = createImageBox('rightImg');
    container.appendChild(rightBox);

    mainBox = createImageBox('mainImg');
    container.appendChild(mainBox);

}
}

function setSrc() {
    for (i = 0; i < 4; i++) {
        boxArray[i].setAttribute('src', imgArray[imgIndexArray[i]]);
    }
    // leftImg.setAttribute('src', imgArray[imgIndexArray[0]]);
    // mainImg.setAttribute('src', imgArray[imgIndexArray[1]]);
    // rightImg.setAttribute('src', imgArray[imgIndexArray[2]]);
    // hiddenImg.setAttribute('src', imgArray[imgIndexArray[3]]);
}

function updateHidden() {
    hiddenImg.setAttribute('src', imgArray[imgIndexArray[3]]);

}

function setProperIndex() {
    for (i = 0; i < imgIndexArray.length; i++) {
        if (imgIndexArray[i] >= imgArray.length) 
            imgIndexArray[i] = imgIndexArray[i] % imgArray.length
        else if (imgIndexArray[i] < 0) 
            imgIndexArray[i] = (imgArray.length + imgIndexArray[i]) % imgArray.length;
    }

}

function setStyles() {
    leftImg.style.transform = "scale(1) translate(-200px)";
    mainImg.style.transform = "scale(1.5) translate(0px)";
    rightImg.style.transform = "scale(1) translate(200px)";
    hiddenImg.style.transform = "scale(0.5) translate(0px)";
    leftImg.style.zIndex = "2";
    mainImg.style.zIndex = "3";
    rightImg.style.zIndex = "2";
    hiddenImg.style.zIndex = "1";
    for (i = 0; i < 4; i++) {
        boxArray[i].style.transition = '500ms';
    }
}

function changeImageStyles(isForward) {
    let spareStyleTransform;
    if (isForward) {
        spareStyleTransform = rightImg.style.transform;
        rightImg.style.transform = mainImg.style.transform;
        mainImg.style.transform = leftImg.style.transform;
        leftImg.style.transform = hiddenImg.style.transform;
        hiddenImg.style.transform = spareStyleTransform;

        spareStyleZIndex = rightImg.style.zIndex;
        rightImg.style.zIndex = mainImg.style.zIndex;
        mainImg.style.zIndex = leftImg.style.zIndex;
        leftImg.style.zIndex = hiddenImg.style.zIndex;
        hiddenImg.style.zIndex = spareStyleZIndex;
    } else {
        spareStyleTransform = leftImg.style.transform;
        leftImg.style.transform = mainImg.style.transform;
        mainImg.style.transform = rightImg.style.transform;
        rightImg.style.transform = hiddenImg.style.transform;
        hiddenImg.style.transform = spareStyleTransform;

        spareStyleZIndex = leftImg.style.zIndex;
        leftImg.style.zIndex = mainImg.style.zIndex;
        mainImg.style.zIndex = rightImg.style.zIndex;
        rightImg.style.zIndex = hiddenImg.style.zIndex;
        hiddenImg.style.zIndex = spareStyleZIndex;
        
    }
}

function changeClasses(isForward) {
    let spareLink;
    if (isForward) {
        spareLink = rightImg;
        rightImg = mainImg;
        mainImg = leftImg;
        leftImg = hiddenImg;
        hiddenImg = spareLink;
    } else {
       spareLink = leftImg;
        leftImg = mainImg;
        mainImg = rightImg;
        rightImg = hiddenImg;
        hiddenImg = spareLink;
    }
}

/*unused functions*/ {
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

    let id = null;
    let scale = 0;
    let pos = 0;
    let initPos= mainImg.getBoundingClientRect();
    console.log(initPos.left);
    clearInterval(id);
    id = setInterval(move, 5);
    function move() {
      if (scale == 0.5) {
        clearInterval(id);
      } else if (pos == 200) {
        clearInterval(id);
      } else if (pos == -200) {
        clearInterval(id);
      } else {
        scale += 0.005;
        isForward ? pos += 2 : pos -= 2;
        mainImg.style.left = initPos.left + pos + 'px';
        mainImg.style.scale = 1.5 - scale;
      }
    }
  }

function changeZIndex(isForward) {
    if (isForward) {
        // document.querySelector('.hiddenImg-animate-forward').style.zIndex = 2;
        document.querySelector('.mainImg-animate-forward').style.zIndex = 2;
        document.querySelector('.leftImg-animate-forward').style.zIndex = 1;
        document.querySelector('.rightImg-animate-forward').style.zIndex = 3;
    } else {
        // document.querySelector('.hiddenImg-animate-backward').style.zIndex = 2;
        document.querySelector('.mainImg-animate-backward').style.zIndex = 2;
        document.querySelector('.leftImg-animate-backward').style.zIndex = 3;
        document.querySelector('.rightImg-animate-backward').style.zIndex = 1;
    }
}
function pauseAnimation() {
    document.querySelector('.leftImg').style.animationPlayState = 'paused, paused';
    document.querySelector('.mainImg').style.animationPlayState = 'paused, paused';
    document.querySelector('.rightImg').style.animationPlayState = 'paused, paused';
    document.querySelector('.hiddenImg').style.animationPlayState = 'paused, paused';
}

function runAnimation(isForward) {
    if (isForward) {
        document.querySelector('.leftImg').style.animationPlayState = 'running, paused';
        document.querySelector('.mainImg').style.animationPlayState = 'running, paused';
        document.querySelector('.rightImg').style.animationPlayState = 'running, paused';
        document.querySelector('.hiddenImg').style.animationPlayState = 'running, paused';
    } else {
        document.querySelector('.leftImg').style.animationPlayState = 'paused, running';
        document.querySelector('.mainImg').style.animationPlayState = 'paused, running';
        document.querySelector('.rightImg').style.animationPlayState = 'paused, running';
        document.querySelector('.hiddenImg').style.animationPlayState = 'paused, running';
    }
}

// function animate(isForward) {
    // addAnimationClass(isForward);
    // changeZIndex(isForward);
    // setTimeout(() => {changeZIndex(isForward)}, 250);
    // setTimeout(() => {
    //     changeImageClass(isForward);
    //     setTimeout(removeAnimationClass(isForward));
    //     }, 500);

// }
}

function shiftImages(isForward) {
    imgIndexArray = imgIndexArray.map((i) => isForward ? i - 1 : i + 1);
    setProperIndex();
    // setSrc();
    changeImageStyles(isForward);
    changeClasses(isForward);
    // updateHidden();

    console.log(imgIndexArray);
}




createCarousel();