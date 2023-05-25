const curtainContainer = document.querySelector('.imgCurtain');

let topImg, bottomImg, curtain, curtainWrapper, leftBorder, rightBorder;

function createCurtain() {

    bottomImg = document.createElement('img');
    bottomImg.className = 'bottom';
    bottomImg.setAttribute('src', 'images/curtain-4.jpg');
    bottomImg.setAttribute('draggable', 'false');

    topImg = document.createElement('img');
    topImg.className = 'top';
    topImg.setAttribute('src', 'images/curtain-3.jpg');
    topImg.setAttribute('draggable', 'false');
    topImg.style.width = `0px`
    
    curtain = document.createElement('img');
    curtain.className = 'curtain';
    curtain.setAttribute('src', 'images/curtain.svg');
    curtain.setAttribute('draggable', 'false');
    curtain.style.transform = 'translate(-6px)';

    curtainWrapper = document.createElement('div');
    curtainWrapper.className = 'wrapper';

    curtainContainer.appendChild(curtainWrapper);
    curtainWrapper.appendChild(bottomImg);
    curtainWrapper.appendChild(topImg);
    curtainWrapper.appendChild(curtain);
    
    curtainWrapper.addEventListener('mousedown', addListener);

}


function createImages(n, srcArray, classNames) {
    let imgs = new Array(n)
    for (i = 0; i < n; i++) {
        imgs[i] = document.createElement('img');
        imgs[i].setAttribute('src', srcArray[i]);
        imgs[i].className = classNames[i];
    };

    return imgs;
}

function addListener() {
    curtainWrapper.addEventListener('mousemove', moveCurtain);
}

function removeListener() {
    curtainWrapper.removeEventListener('mousemove', moveCurtain);

}
function moveCurtain(e) {
    let curtainWidth = curtain.getBoundingClientRect().width;
    let wrapperLeft = curtainWrapper.getBoundingClientRect().left;
 
    rightBorder = bottomImg.getBoundingClientRect().right;
    leftBorder = bottomImg.getBoundingClientRect().left;
    curtain.style.removeProperty('transform');

    if ((e.clientX >= leftBorder) && (e.clientX <= rightBorder)) {
        curtain.style.left = `${e.clientX - curtainWidth/2 - wrapperLeft}px`;
        topImg.style.width = `${e.clientX -leftBorder}px`;

    }

    curtainWrapper.addEventListener('mouseup', removeListener);
    
}

createCurtain();