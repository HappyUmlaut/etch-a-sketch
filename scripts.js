clearButton = document.getElementById('clear');
resizeButton = document.getElementById('resize')
startButton = document.getElementById('start');

resizeButton.addEventListener('click',changeFlag);
resizeButton.addEventListener('click',generateSquareGrid);
clearButton.addEventListener('click',cleanGrid);
startButton.addEventListener('click',addListener);
window.addEventListener('resize',modifyGridPercentages);
let lastGridDefinition;
let flag = 0;
let blackOpacity = 0;
let blackOpacityFlag = true;

let divsPerSide = 16;
generateSquareGrid(16);

function changeFlag(){
    flag = 1;
}

function addListener(){
    if(document.getElementById('black/white').checked){
        document.querySelectorAll('.grid').forEach(item => {
            item.addEventListener('mouseenter', event =>{
                item.classList.add('grid--black');
            })
        })  
    }else if(document.getElementById('rainbow').checked){
        document.querySelectorAll('.grid').forEach(item => {
            item.addEventListener('mouseenter', event =>{
                changeDivBackground(item);
            })
        })
    }else if(document.getElementById('grayscale').checked){
        document.querySelectorAll('.grid').forEach(item => {
            item.addEventListener('mouseenter', event =>{
                changeDivColorGrayscale(item);
            })
        })
    } 
}

function removeListener(){
    let mydiv;
    divs__width = calculateDivsDimensions(lastGridDefinition);
    
    container = document.querySelector('.container');
    for(let x = 0; x<lastGridDefinition; x++){   
        for (let i=0; i<divsPerSide; i++){
            mydiv = document.createElement('div');
            mydiv.className = 'grid';
            mydiv.style.width = divs__width +'%';
            mydiv.style.height = divs__width +'%';
            container.appendChild(mydiv);
        }
    }  
}

function generateSquareGrid(divs__width){
    let mydiv;
    clear();
    createStartButton();
    if(divs__width!==16){
        divs__width = calculateDivsDimensions();
    } else {
        divs__width = calculateDivsDimensions(16);
    }
    lastGridDefinition = divsPerSide;
    container = document.querySelector('.container');
    for(let x = 0; x<divsPerSide; x++){   
        for (let i=0; i<divsPerSide; i++){
            mydiv = document.createElement('div');
            mydiv.className = 'grid';
            mydiv.style.width = divs__width +'%';
            mydiv.style.height = divs__width +'%';
            container.appendChild(mydiv);
        }
    }
}

function modifyGridPercentages() {
    let divs__width__percentage = 0; // Percentage for
    let container__width_noBorders;
    let numberOfChilds = container.childElementCount;
    let child;    
    container = document.querySelector('.container');
    container__width = container.offsetWidth;
    container__width_noBorders = container__width - divsPerSide*2;
    divs__width = container__width_noBorders/divsPerSide;
    divs__width__percentage = divs__width*100/container__width;
    for(let i=0; i<numberOfChilds; i++) {
        child = container.childNodes[i];
        child.style.width = divs__width__percentage +'%';
        child.style.height = child.clientWidth +'px';
    }
}



function calculateDivsDimensions(divsPerSide){
    let divs__width__percentage = 0; // Percentage for
            //the div width without the borders
    let container__width_noBorders;
    if(lastGridDefinition  && flag===0){
        divsPerSide = lastGridDefinition;
    }else if(divsPerSide!==16){
        divsPerSide = askUserGridSize();
    } 
    container = document.querySelector('.container');
    container__width = container.offsetWidth;
    container__width_noBorders = container__width - divsPerSide*2;
    divs__width = container__width_noBorders/divsPerSide;
    divs__width__percentage = divs__width*100/container__width;
    flag = 0;
    return divs__width__percentage;
}


function clear(){
    container = document.querySelector('.container');
    while(container.firstChild){
        container.removeChild(container.firstChild);
    }
}

function createStartButton(){
    let startButton = document.getElementById('start')
    startButton.style.opacity = 100;
}

function cleanGrid(){
    clear();
    let container = document.querySelector('.container');
    let numberOfChilds = container.childElementCount;
    let child;

    for(let i=0; i<numberOfChilds; i++) {
        child = container.childNodes[i];
        child.classList.remove('grid--black');
    }
    removeListener();
}

function askUserGridSize(){
    divsPerSide = prompt('Enter new side length for grid',
            '16');
    while (divsPerSide>100){
        divsPerSide = prompt('Our limit is 100 squares per side.' + 
                'Please choose a smaller definition.')
    }
    return divsPerSide;
}

function randomRGB(){
    return Math.random()*266;
}

function changeDivBackground(myDiv){
    let r;
    let g;
    let b;
    let rgb;
    r = randomRGB();
    g = randomRGB();
    b = randomRGB();
    rgb = 'rgb(' + r +',' + g +',' + b +')'
    myDiv.style.backgroundColor = rgb;
}

function changeDivColorGrayscale(myDiv){
    let rgb;
    rgba = 'rgba(0,0,0,' + blackOpacity + ')';
    myDiv.style.backgroundColor = rgba;
    if (blackOpacityFlag){
        blackOpacity += 0.1;
        if (blackOpacity>=1){
            blackOpacityFlag = false;
        }
    } else{
        blackOpacity -= 0.1;
        if (blackOpacity<=0){
            blackOpacityFlag = true;
        }
    }
}





