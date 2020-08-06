clearButton = document.getElementById('clear');
resizeButton = document.getElementById('resize')
startButton = document.getElementById('start');

resizeButton.addEventListener('click',changeFlag);
resizeButton.addEventListener('click',generateSquareGrid);
clearButton.addEventListener('click',cleanGrid);
startButton.addEventListener('click',addListener);
let lastGridDefinition;
let flag = 0;

let divsPerSide = 16;
generateSquareGrid(16);

function changeFlag(){
    flag = 1;
}

function addListener(){
    document.querySelectorAll('.grid').forEach(item => {
        item.addEventListener('mouseenter', event =>{
            item.classList.add('grid--black');
        })
    })    
}

function removeListener(){
    let mydiv;
    divs__width = calculateDivsDimensions(lastGridDefinition);
    
    container = document.querySelector('.container');
    for(let x = 0; x<lastGridDefinition; x++){   
        for (let i=0; i<divsPerSide; i++){
            mydiv = document.createElement('div');
            mydiv.className = 'grid';
            mydiv.style.width = divs__width +'px';
            mydiv.style.height = divs__width +'px';
            container.appendChild(mydiv);
        }
    }  
}



function calculateDivsDimensions(divsPerSide){
    if(lastGridDefinition  && flag===0){
        divsPerSide = lastGridDefinition;
    }else if(divsPerSide!==16){
        divsPerSide = askUserGridSize();
    } 
    container = document.querySelector('.container');
    container__width = container.offsetWidth;
    divs__width = container__width/divsPerSide;
    divs__width = divs__width - 2 // Toma en cuenta el borde de cada div
    console.log(flag);
    flag = 0;
    return divs__width;
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
            mydiv.style.width = divs__width +'px';
            mydiv.style.height = divs__width +'px';
            container.appendChild(mydiv);
        }
    }
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





