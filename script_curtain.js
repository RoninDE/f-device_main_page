const curtainContainer = document.querySelector('.imgCurtain');
const imageArray = ['images/curtain-1.jpg',
                    'images/curtain-2.jpg'];


let topImg, bottomImg, leftBorder, rightBorder;

function createCurtain() {
    const images = createImages(2, imageArray, ['bottom', 'top']);
    // const imageContainers = createImageContainers(['bottom', 'top']);
    
    // imageContainers[0].appendChild(images[0]);
    // imageContainers[1].appendChild(images[1]);
    
    // curtainContainer.appendChild(imageContainers[0]);
    // curtainContainer.appendChild(imageContainers[1]);
    curtainContainer.appendChild(images[0]);
    curtainContainer.appendChild(images[1]);
    
    topImg = document.querySelector('.top');
    bottomImg = document.querySelector('.bottom');
    
    topImg.addEventListener('mousemove', moveCurtain);

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

// function createImageContainers(classNames) {
//     let imgContainers = new Array(classNames.length);
//     for (i = 0; i < classNames.length; i++) {
//         imgContainers[i] = document.createElement('div');
//         imgContainers[i].className = classNames[i];
//     }

//     return imgContainers;
// }

function moveCurtain(e) {
    
    leftBorder = bottomImg.getBoundingClientRect().left;
    // rightBorder = bottomImg.getBoundingClientRect().right;
    
    topImg.style.left = `${leftBorder}px`;
    topImg.style.width = `${e.clientX - leftBorder}px`;
    
}

createCurtain();