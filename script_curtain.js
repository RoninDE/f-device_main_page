const curtainContainer = document.querySelector('.imgCurtain');

let topImg, bottomImg, curtain, curtainWrapper, leftBorder, rightBorder;

function createCurtain() {

    bottomImg = createElem('img', 'bottom', 'images/sin-2.svg')
    topImg = createElem('img', 'top', 'images/sin-1.svg')
    curtain = createElem('div', 'curtain')
    curtainWrapper = createElem('div', 'wrapper')
    
    
    curtainWrapper.appendChild(bottomImg);
    curtainWrapper.appendChild(topImg);
    curtainWrapper.appendChild(curtain);
    curtainContainer.appendChild(curtainWrapper);
    
    let offset = 70;
    curtain.style.left = `${offset}%`;
    topImg.style.width = `${bottomImg.getBoundingClientRect().width * offset/100 + 
                            curtain.getBoundingClientRect().width*0.5}px`;
    
    curtain.addEventListener('mousedown', addListener);

}

function createElem(type, className, src) {
    let elem = document.createElement(type);
    elem.className = className;
    if (src) {
        elem.setAttribute('src', src)
    };

    return elem;
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