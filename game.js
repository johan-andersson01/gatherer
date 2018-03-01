/* esversion: 6 */

let canvas = document.getElementById("canvas");
let cc = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let playerX = 100;
let playerY = 100;
playerSpriteSize = 20;
projectileSpriteSize = 10;
let keyMap = {};
let objects = new Map();
collectedCount = 0;

onkeydown = onkeyup = function(e){
    e = e || event;
    keyMap[e.key] = e.type == 'keydown';

}

const resetCanvas = () => {
    cc.fillStyle = "white";
    cc.fillRect(0,0,canvas.width, canvas.height);
}

const updatePlayerPosition = () => {
    let step = 2;
    if (keyMap['w'] && playerY > playerSpriteSize/2) playerY -= step;
    if (keyMap['s'] && playerY < canvas.height - playerSpriteSize) playerY += step;
    if (keyMap['a'] && playerX > playerSpriteSize/2) playerX -= step;
    if (keyMap['d'] && playerX < canvas.width - playerSpriteSize) playerX += step;
}


const drawObjects = () => {
    cc.fillStyle = "grey";
    for ([coord, val] of objects) {
        coord = coord.split('-');
        let x = parseInt(coord[0]);
        let y = parseInt(coord[1]);
        cc.fillRect(x - playerSpriteSize/2, y - playerSpriteSize/2, playerSpriteSize, playerSpriteSize);
    }
    cc.fillStyle = "black";
    cc.fillRect(playerX - playerSpriteSize/2, playerY - playerSpriteSize/2, playerSpriteSize, playerSpriteSize);
    let stats = "Collected: " + collectedCount;
    cc.fillText(stats,10,20);
}

const spawnRandom = () => {
    let r = Math.round(Math.random()-0.49)
    if (r == 1) {
        let rx = Math.round(Math.random()*canvas.width);
        let ry = Math.round(Math.random()*canvas.height);
        let coord = rx + '-' + ry;
        objects.set(coord, 1);
    }
}

const checkCollisions = () => {
    toDelete = []
    for ([coord, val] of objects) {
        pos = coord.split('-');
        let x = parseInt(pos[0]);
        let y = parseInt(pos[1]);
        if (Math.abs(x-playerX) < playerSpriteSize && Math.abs(y-playerY) < playerSpriteSize) {
            toDelete.push(coord);
        }
    }
    // console.log(toDelete.length)
    toDelete.forEach(function(item, index, array) {
        objects.delete(item);
        collectedCount++;
      });
}

const run = () => {
    resetCanvas();
    spawnRandom();
    updatePlayerPosition();
    checkCollisions();
    drawObjects();
};

window.onload = () => {
    let refresherID = setInterval(function() {
        run();
    }, 1);
};