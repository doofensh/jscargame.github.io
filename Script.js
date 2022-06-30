const score = document.querySelector('.score');
const startWindow = document.querySelector('.startWindow');
const gameArea = document.querySelector('.gameArea');


startWindow.addEventListener('click', letsPlay);

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

let player = {speed: 7, score: 0};

let keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
};
function keyDown(e) {
    e.preventDefault();
    keys[e.key] = true;
    // console.log(e.key);
    // console.log(keys);
}

function keyUp(e) {
    e.preventDefault();
    keys[e.key] = false;
    // console.log(e.key);
    // console.log(keys);
}

function collision(a, b){
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();

    return !((aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) || 
            (aRect.right < bRect.left) || (aRect.left > bRect.right))
}


function moveLine(){
    let line = document.querySelectorAll('.line');
    
    line.forEach(function(val){
                
        if(val.y > 700){
            val.y -= 750
        }            
        val.y += player.speed;
        val.style.top = val.y +"px";
    })
}

function stopGame(){
    player.start = false;
    startWindow.classList.remove('hide');

    startWindow.innerHTML = "Game Over.<br>" + "You Scored: " + player.score + "<br> Click again to restart."
}

function moveDushmanCar(car){
    let dushman = document.querySelectorAll('.dushman');
    
    dushman.forEach(function(val){
        
        if(collision(car, val)) {
            console.log(`BOOM!!`);
            stopGame();
        }

        if(val.y > 750){
            val.y = -300
            val.style.left = Math.floor(Math.random() * 350) + "px";
        }            
        val.y += player.speed;
        val.style.top = val.y +"px";
    })
}


function startGame(){
    let car = document.querySelector('.car');
    let road = gameArea.getBoundingClientRect();

    moveLine();
    moveDushmanCar(car);

    if(player.start){

        if(keys.ArrowUp && player.y > (road.top + 140) ) player.y -= player.speed;
        if(keys.ArrowDown && player.y < (road.bottom - 90) ) player.y += player.speed;
        if(keys.ArrowLeft && player.x > 0) player.x -= player.speed;
        if(keys.ArrowRight && player.x < (road.width - 50) ) player.x += player.speed;

        car.style.top = player.y + "px";
        car.style.left = player.x + "px";

        window.requestAnimationFrame(startGame);

        player.score++;
        score.innerHTML = "Score: " + player.score;
    }
}

function letsPlay(){
    // gameArea.classList.remove('hide');
    startWindow.classList.add('hide');
    gameArea.innerHTML = "";

    player.start = true;
    player.score = 0;

    window.requestAnimationFrame(startGame);

    for(let x = 0; x<5; x++){
        
        let roadLine = document.createElement('div');
        roadLine.setAttribute('class', 'line');
        roadLine.y = (x*150);
        roadLine.style.top = roadLine.y +"px";
        gameArea.appendChild(roadLine);
    }

    let car = document.createElement('div');
    car.setAttribute('class', 'car');

    gameArea.appendChild(car);

    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    // console.log("Position left: "+ car.offsetLeft);    
    // console.log("Position Top: "+ car.offsetTop);

    for(let x = 0; x<3; x++){
        
        let enemyCars = document.createElement('div');
        enemyCars.setAttribute('class', 'dushman');
        enemyCars.y = ((x+1)* 350) * -1;
        enemyCars.style.top = enemyCars.y +"px";
        enemyCars.style.backgroundColor = randomColor();
        enemyCars.style.left = Math.floor(Math.random() * 350) + "px";
        gameArea.appendChild(enemyCars);
    }
}

function randomColor(){

    function color(){
        let hex = Math.floor(Math.random() * 256).toString(16);
        return("0" + String(hex)).substr(-2);
    }
console.log("randomColor: "+color());
    return "#" + color() + color() + color();
}