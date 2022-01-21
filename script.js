//Selectors
let splashScreen = document.getElementById('start-page'); //Screen where the game starts
let playBtnStart = document.querySelectorAll('.play-btn-start'); //Button to start the game in the first screen
let playBtn = document.querySelectorAll('.play-btn'); //Button to restart the game in the rest of screens
let playBtnNext = document.querySelectorAll('.play-btn-next'); //Button to go from the scores to the end screen
let gameOverScreen = document.getElementById('game-over-page'); //Game over screen
let selectPlayerScreen = document.getElementById('select-player-page'); //Screen to select player
let virusBtn = document.getElementById('virusPlayer');  //Selects the virus as player
let bacteriaBtn = document.getElementById('bacteriaPlayer'); //Selects the bacteria as player
let nanovirusBtn = document.getElementById('nanovirusPlayer'); //Selects the nanovirus as player
let protozoaBtn = document.getElementById('protozoaPlayer'); //Selects the protozoa as player
let gameoverImg = document.getElementById('virus-gameover'); //Game over image
let winScreen = document.getElementById('win-page'); //Winning screen
let highScoreList = document.getElementById('highScoreTable'); //High score list in the HTML
let highScoreScreen = document.getElementById('high-score-page'); //High score screen
//Variables
let pickedPathogen = null;
let mainPlayer = 0;
let intervalId = 0;
let upArrow = false;
let downArrow = false;
let leftArrow = false;
let rightArrow = false;
let points = 0;
let pointsRestart = 0;
let lives = 2;
let enemies = [];
let outOfBox = 0;
let highScores = [];
let namePlayer = "";
let gameOver = false;
//Boss variables
let mainPlayerBoss = 0;
let intervalBoss = 0;
let shooting = [];
let bossEnemy = 0;
let bossHealth = 360;
let shootingBoss = [];
let intervalBossShoot = 0;
//Images
//Classes
const virusImg = new Image();
virusImg.src = './images/virus.png';
const bacteriaImg = new Image();
bacteriaImg.src = "./images/bacteria.png";
const protozoaImg = new Image();
protozoaImg.src = "./images/protozoa.png";
const nanovirusImg = new Image();
nanovirusImg.src = "./images/nanovirus.png";
//Collectables
const humanImg = new Image();
humanImg.src = "./images/human.png";
const mutationImg = new Image();
mutationImg.src = "./images/mutation.png";
//Enemy
const vaccineImg = new Image();
vaccineImg.src = "./images/vaccine.png";
const vaccineImgDeath = new Image();
vaccineImgDeath.src = "./images/vaccineDead.png";
//BossLevel
//Shooting
const shootingVirus = new Image();
shootingVirus.src = './images/shootingVirus.png';
const enemyDoctor = new Image();
enemyDoctor.src = './images/plagueDoctor.png';
const shootingVaccine = new Image();
shootingVaccine.src = './images/shootingVaccine.png';
//Audios
let backgroundMusic = new Audio('./audio/arcade_music.wav');
let losingLifeAudio = new Audio('./audio/lifeLostPlayer.wav');
let gameStartBtnAudio = new Audio('./audio/game_start.wav');
let gameOverAudio = new Audio('./audio/game_over.wav');
let winAudio = new Audio('./audio/win_sound.mp3');
let playerMovingAudio = new Audio('./audio/player_moving.mp3');
let playerSelectAudio = new Audio('./audio/player_select.mp3');
let ghostScaredAudio = new Audio('./audio/ghostScaredFalse.wav');
let bossLevelAudio = new Audio('./audio/bossLevelBg.wav');
let coughShootAudio = new Audio('./audio/coughSound.mp3');
let enemyShootAudio = new Audio('./audio/shootEnemySound.wav');
let bossPainAudio = new Audio('./audio/bossPainAudio.wav');
//Canvas
const mycanvas = document.getElementById('my-canvas');
let ctx = mycanvas.getContext('2d');
//Classes
class Wall { //Creates the different walls inside the game board
    constructor(x, y, width, height, color, gate){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.gate = gate;
    };
    draw(){
        ctx.lineWidth = 3;
        ctx.strokeStyle = this.color;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    };
};
class Collectable { //Creates the different collectables inside the game board
    constructor(img, x, y, width, height) {
        this.img = img;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.collected = false;
        this.notScored = true;
        this.mutate = false; //If it's a special collectable
    };
    draw(){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    };
    checkcollision(object) { //Checks the collision with the collectable
        return (
          this.x < object.x + object.width &&
          this.x + this.width > object.x &&
          this.y < object.y + object.height &&
          this.y + this.height > object.y
        );
    };
    collect(object){ //Collects the collectable
        if (this.checkcollision(object)) {
            this.collected = true;
            ctx.clearRect(this.x, this.y, this.width, this.height);
            ctx.fillStyle = "black";
            ctx.fillRect(this.x, this.y, this.width, this.height);
            this.mutate = true;
        };
    };
    updateScore(object, score){ //Updates the score of the player
        if ((this.checkcollision(object)) && (this.notScored === true)){
            points += score;
            pointsRestart += score;
            this.notScored = false;
            playerMovingAudio.play();
            playerMovingAudio.volume = 0.6;
        };
    };
};
class Player extends Collectable { //Creates the main player
    constructor(img, x, y){
        super(img, x, y);
        this.width = 36;
        this.height = 36;
        this.speedX = 4;
        this.speedY = 4;
    };
    moveRight(objects) { //Moves right the player checking if there are obstacles
        this.x += this.speedX;
        objects.forEach(object => {
            if (this.checkcollision(object)) {
                this.x -= this.speedX;
            } else if (this.x >= 976){
                this.x = 0;
            };
        });
      };
    moveLeft(objects) { //Moves left the player checking if there are obstacles
        this.x -= this.speedX;
        objects.forEach(object => {
            if (this.checkcollision(object)) {
                this.x += this.speedX;
            } else if (this.x <= 0){
                this.x = 975;
            };
        });
    };
    moveUp(objects) { //Moves up the player checking if there are obstacles
        this.y -= this.speedY;
        objects.forEach(object => {
            if (this.checkcollision(object)) this.y += this.speedY;
        });
    };
    moveDown(objects) { //Moves down the player checking if there are obstacles
        this.y += this.speedY;
        objects.forEach(object => {
            if (this.checkcollision(object)) this.y -= this.speedY;
        });
    };
};
class Enemy extends Player { //Creates the enemies
    constructor(img, x, y){
        super(img, x, y);
        this.width = 36;
        this.height = 36;
        this.speedX = 0.4;
        this.speedY = 0.4;
        this.dx = 0;
        this.dy = 0;
        this.distance = 0;
        this.angle = 0;
        this.home = true;
        this.scared = false;
        this.dead = false;
    };
    updateAngleX(player, objects){ //Pathfinding algorithm in x axis
        this.dx = player.x - this.x;
        this.dy = player.y - this.y;
        this.distance = Math.sqrt((this.dx*this.dx) + (this.dy*this.dy));
        this.angle = Math.atan2(this.dy,this.dx);
        this.x += Math.cos(this.angle) * this.speedX;
        objects.forEach(object => {
            if ((this.dead === false || object.color === "blue") && this.checkcollision(object)){
                if (this.dy > 0){
                    this.y += this.speedY;
                    this.x -= Math.cos(this.angle) * this.speedX;
                    if (this.checkcollision(object)) this.y -= this.speedY;
                } else if (this.dy < 0){
                    this.y -= this.speedY;
                    this.x -= Math.cos(this.angle) * this.speedX;
                    if (this.checkcollision(object)) this.y += this.speedY;
                };
            };
        });
    };
    updateAngleY(player, objects){ //Pathfinding algorithm in y axis
        this.dx = player.x - this.x;
        this.dy = player.y - this.y;
        this.distance = Math.sqrt((this.dx*this.dx) + (this.dy*this.dy));
        this.angle = Math.atan2(this.dy,this.dx);
        this.y += Math.sin(this.angle) * this.speedY;
        objects.forEach(object => {
            if ((this.dead === false || object.color === "blue") && this.checkcollision(object)){
                if (this.dx > 0){
                    this.x += this.speedX;
                    this.y -= Math.sin(this.angle) * this.speedY;
                    if (this.checkcollision(object)) this.x -= this.speedX;
                } else if (this.dx < 0){
                    this.x -= this.speedX;
                    this.y -= Math.sin(this.angle) * this.speedY;
                    if (this.checkcollision(object)) this.x += this.speedX;
                };
            };
        });
    };
    updateAngleScaredX(player, objects){ //Pathfinding algorithm in x axis when the enemy is scared of the player
        this.dx = this.x - player.x;
        this.dy = this.y - player.y;
        this.distance = Math.sqrt((this.dx*this.dx) + (this.dy*this.dy));
        this.angle = Math.atan2(this.dy,this.dx);
        this.x += Math.cos(this.angle) * this.speedX;
        objects.forEach(object => {
            if ((this.dead === false || object.gate === false) && this.checkcollision(object)){
                if (this.dy > 0){
                    this.y += this.speedY;
                    this.x -= Math.cos(this.angle) * this.speedX;
                    if (this.checkcollision(object)) this.y -= this.speedY;
                } else if (this.dy < 0){
                    this.y -= this.speedY;
                    this.x -= Math.cos(this.angle) * this.speedX;
                    if (this.checkcollision(object)) this.y += this.speedY;
                };
            };
        });
    };
    updateAngleScaredY(player, objects){ //Pathfinding algorithm in y axis when the enemy is scared of the player
        this.dx = this.x - player.x;
        this.dy = this.y - player.y;
        this.distance = Math.sqrt((this.dx*this.dx) + (this.dy*this.dy));
        this.angle = Math.atan2(this.dy,this.dx);
        this.y += Math.sin(this.angle) * this.speedY;
        objects.forEach(object => {
            if ((this.dead === false || object.gate === false) && this.checkcollision(object)){
                if (this.dx > 0){
                    this.x += this.speedX;
                    this.y -= Math.sin(this.angle) * this.speedY;
                    if (this.checkcollision(object)) this.x -= this.speedX;
                } else if (this.dx < 0){
                    this.x -= this.speedX;
                    this.y -= Math.sin(this.angle) * this.speedY;
                    if (this.checkcollision(object)) this.x += this.speedX;
                };
            };
        });
    };
    scare(player, objects){ //When enemies are scared
        this.updateAngleScaredX(player, objects);
        this.updateAngleScaredY(player, objects);
    };
    transportHome (){ //Gets the enemy home
        this.x = 480;
        this.y = 290;
    };
    death(objects){ //When the enemy dies
        outOfBox = new Player("", 480, 224);
        if (this.x > 481 || this.x < 479 || this.y > 225 || this.y < 223){
            this.img = vaccineImgDeath;
            this.draw();
            this.speedX = 0.8;
            this.speedY = 0.8;
            this.updateAngleX(outOfBox, objects);
            this.updateAngleY(outOfBox, objects);
        } else if (this.x <= 481 && this.x >= 479 && this.y <= 225 && this.y >= 223){
            this.transportHome();
        };
        if (this.x <= 481 && this.x >= 479 && this.y <= 291 && this.y >= 289){
            this.img = vaccineImg;
            this.draw();
            points += 300;
            this.dead = false;
            this.scared = false;
            this.home = true;
            pointsRestart = 0;
            this.speedX = 0.4;
            this.speedY = 0.4;
        };
    };
};
//Boss level classes
class PlayerBoss extends Collectable { //Creates main player in the boss level
    constructor(img, x, y){
        super(img, x, y);
        this.width = 40;
        this.height = 40;
        this.speedX = 15;
        this.speedY = 15;
    };
    moveRight(objects) { //Moves right the player
        this.x += this.speedX;
        objects.forEach(object => {
            if (this.checkcollision(object)) this.x -= this.speedX;
        });
      };
    moveLeft() { //Moves left the player
        this.x -= this.speedX;
        if (this.x <= 0) this.x += this.speedX;
    };
    moveUp() { //Moves up the player
        this.y -= this.speedY;
        if (this.y <= 400) this.y += this.speedY;
    };
    moveDown() { //Moves down the player
        this.y += this.speedY;
        if (this.y >= 670) this.y -= this.speedY;
    };
};
class Shoot extends Collectable{ //Creates the shoots from the player and boss
    constructor(img, x, y){
        super(img, x, y);
        this.width = 10;
        this.height = 10;
    };
};
class Boss extends Collectable { //Creates the boss in the boss level
    constructor(img, x, y){
        super(img, x, y);
        this.width = 240;
        this.height = 240;
        this.speedX = 4;
        this.hit = false;
    };
    randomMovement(objects){
        this.x -= this.speedX;
        objects.forEach(object => {
            if (this.x <= -10){
                this.speedX *= -1;
            } else if (this.checkcollision(object)){
                this.speedX *= -1;
            };
        });
    };
    drawHealthBar() {
        ctx.lineWidth = 3;
        ctx.strokeStyle = "white";
        ctx.strokeRect(mycanvas.width - 380, mycanvas.height - 400, 360, 50);
        ctx.fillStyle = "black";
        ctx.fillRect(mycanvas.width - 380, mycanvas.height - 400, 360, 50);
        if (bossHealth >= 252){
            ctx.fillStyle = "green";
        } else if (bossHealth >= 144){
            ctx.fillStyle = "orange";
        } else {
            ctx.fillStyle = "red";
        };
        ctx.fillRect(mycanvas.width - 380, mycanvas.height - 400, bossHealth, 50);
      };
      decreaseHealth(){
          if (this.hit === true){
            bossHealth -= 20;
            points += 200;
            bossPainAudio.play();
            if (this.speedX < 0){
                this.speedX -= 0.2;
            } else if (this.speedX > 0){
                this.speedX += 0.2;
            };            
            this.hit = false;
          };
      };
};
//Walls
const outerWallThickness = 10;
const walls = [
    //Outer walls
    new Wall(0, 0, mycanvas.width - 400, outerWallThickness, "blue", false),
    new Wall(0, mycanvas.height - outerWallThickness, mycanvas.width - 400, outerWallThickness, "blue", false),
    new Wall(0, 0, outerWallThickness, 210, "blue", false),
    new Wall(mycanvas.width - outerWallThickness - 400, 0, outerWallThickness, 210, "blue", false),
    new Wall(0, 210 - outerWallThickness, 200, outerWallThickness, "blue", false),
    new Wall(800, 210 - outerWallThickness, 200, outerWallThickness, "blue", false),
    new Wall(0, 420, outerWallThickness, 280, "blue", false),
    new Wall(mycanvas.width - outerWallThickness - 400, 420, outerWallThickness, 280, "blue", false),
    new Wall(0, 420, 200, outerWallThickness, "blue", false),
    new Wall(800, 420, 200, outerWallThickness, "blue", false),
    new Wall(200 - outerWallThickness, 210 - outerWallThickness, outerWallThickness, 90, "blue", false),
    new Wall(800, 210 - outerWallThickness, outerWallThickness, 90, "blue", false),
    new Wall(200 - outerWallThickness, 340, outerWallThickness, 90, "blue", false),
    new Wall(800, 340, outerWallThickness, 90, "blue", false),
    new Wall(0, 280, 200, outerWallThickness, "blue", false),
    new Wall(800, 280, 200, outerWallThickness, "blue", false),
    new Wall(0, 340, 200, outerWallThickness, "blue", false),
    new Wall(800, 340, 200, outerWallThickness, "blue", false),
    //Inner walls
    new Wall(60, 60, 140, 30, "blue", false),
    new Wall(480, 0, 40, 90, "blue", false),
    new Wall(250, 60, 180, 30, "blue", false),
    new Wall(800, 60, 140, 30, "blue", false),
    new Wall(570, 60, 180, 30, "blue", false),
    new Wall(60, 140, 140, 10, "blue", false),
    new Wall(800, 140, 140, 10, "blue", false),
    new Wall(250, 140, 60, 150, "blue", false),
    new Wall(690, 140, 60, 150, "blue", false),
    new Wall(250, 200, 160, 20, "blue", false),
    new Wall(590, 200, 160, 20, "blue", false),
    new Wall(360, 140, 280, 10, "blue", false),
    new Wall(460, 140, 80, 80, "blue", false),
    new Wall(250, 340, 60, 90, "blue", false),
    new Wall(690, 340, 60, 90, "blue", false),
    new Wall(360, 400, 280, 30, "blue", false),
    new Wall(460, 400, 80, 90, "blue", false),
    new Wall(250, 480, 160, 10, "blue", false),
    new Wall(590, 480, 160, 10, "blue", false),
    new Wall(60, 480, 140, 10, "blue", false),
    new Wall(800, 480, 140, 10, "blue", false),
    new Wall(140, 480, 60, 100, "blue", false),
    new Wall(800, 480, 60, 100, "blue", false),
    new Wall(0, 540, 90, 40, "blue", false),
    new Wall(910, 540, 90, 40, "blue", false),
    new Wall(60, 630, 350, 10, "blue", false),
    new Wall(590, 630, 350, 10, "blue", false),
    new Wall(250, 540, 60, 100, "blue", false),
    new Wall(690, 540, 60, 100, "blue", false),
    new Wall(360, 540, 280, 40, "blue", false),
    new Wall(460, 540, 80, 100, "blue", false),
    new Wall(360, 270, 10, 80, "blue", false),
    new Wall(630, 270, 10, 80, "blue", false),
    new Wall(360, 270, 115, 10, "blue", false),
    new Wall(525, 270, 115, 10, "blue", false),
    new Wall(474, 270, 50, 10, "yellow", true),
    new Wall(360, 340, 280, 10, "blue", false)
];
const bossLevelWall = [
    new Wall(mycanvas.width - outerWallThickness - 400, 0, outerWallThickness, mycanvas.height, "blue", false)
]
// Collectables
const specialCollects = [
    new Collectable(mutationImg, 20, 60, 30, 30),
    new Collectable(mutationImg, 950, 60, 30, 30),
    new Collectable(mutationImg, 20, 500, 30, 30),
    new Collectable(mutationImg, 950, 500, 30, 30)
];
const collects = [
    new Collectable(humanImg, 60, 502, 15, 20),
    new Collectable(humanImg, 90, 502, 15, 20),
    new Collectable(humanImg, 120, 502, 15, 20),
    new Collectable(humanImg, 870, 502, 15, 20),
    new Collectable(humanImg, 900, 502, 15, 20),
    new Collectable(humanImg, 930, 502, 15, 20),
    new Collectable(humanImg, 30, 594, 15, 20),
    new Collectable(humanImg, 60, 594, 15, 20),
    new Collectable(humanImg, 90, 594, 15, 20),
    new Collectable(humanImg, 120, 594, 15, 20),
    new Collectable(humanImg, 150, 594, 15, 20),
    new Collectable(humanImg, 180, 594, 15, 20),
    new Collectable(humanImg, 210, 594, 15, 20),
    new Collectable(humanImg, 330, 594, 15, 20),
    new Collectable(humanImg, 360, 594, 15, 20),
    new Collectable(humanImg, 390, 594, 15, 20),
    new Collectable(humanImg, 420, 594, 15, 20),
    new Collectable(humanImg, 570, 594, 15, 20),
    new Collectable(humanImg, 600, 594, 15, 20),
    new Collectable(humanImg, 630, 594, 15, 20),
    new Collectable(humanImg, 660, 594, 15, 20),
    new Collectable(humanImg, 780, 594, 15, 20),
    new Collectable(humanImg, 810, 594, 15, 20),
    new Collectable(humanImg, 840, 594, 15, 20),
    new Collectable(humanImg, 870, 594, 15, 20),
    new Collectable(humanImg, 900, 594, 15, 20),
    new Collectable(humanImg, 930, 594, 15, 20),
    new Collectable(humanImg, 960, 594, 15, 20),
    new Collectable(humanImg, 210, 62, 15, 20),
    new Collectable(humanImg, 450, 62, 15, 20),
    new Collectable(humanImg, 540, 62, 15, 20),
    new Collectable(humanImg, 770, 62, 15, 20),
    new Collectable(humanImg, 106, 544, 15, 20),
    new Collectable(humanImg, 210, 544, 15, 20),
    new Collectable(humanImg, 330, 544, 15, 20),
    new Collectable(humanImg, 660, 544, 15, 20),
    new Collectable(humanImg, 770, 544, 15, 20),
    new Collectable(humanImg, 880, 544, 15, 20),
    new Collectable(humanImg, 210, 200, 15, 20),
    new Collectable(humanImg, 210, 240, 15, 20),
    new Collectable(humanImg, 210, 280, 15, 20),
    new Collectable(humanImg, 210, 320, 15, 20),
    new Collectable(humanImg, 210, 360, 15, 20),
    new Collectable(humanImg, 210, 400, 15, 20),
    new Collectable(humanImg, 770, 200, 15, 20),
    new Collectable(humanImg, 770, 240, 15, 20),
    new Collectable(humanImg, 770, 280, 15, 20),
    new Collectable(humanImg, 770, 320, 15, 20),
    new Collectable(humanImg, 770, 360, 15, 20),
    new Collectable(humanImg, 770, 400, 15, 20)
];
//Recursive functions to create some collectables
function drawCollect1 (x){
    if (x > 450){
        return
    };
    collects.push(new Collectable(humanImg, x, 22, 15, 20));
    return drawCollect1(x + 30);
};
function drawCollect2 (x){
    if (x > 960){
        return
    };
    collects.push(new Collectable(humanImg, x, 22, 15, 20));
    return drawCollect2(x + 30);
};
function drawCollect3 (x){
    if (x > 960){
        return
    };
    collects.push(new Collectable(humanImg, x, 102, 15, 20));
    return drawCollect3(x + 30);
};
function drawCollect4 (x){
    if (x > 210){
        return
    };
    collects.push(new Collectable(humanImg, x, 162, 15, 20));
    return drawCollect4(x + 30);
};
function drawCollect5 (x){
    if (x > 420){
        return
    };
    collects.push(new Collectable(humanImg, x, 162, 15, 20));
    return drawCollect5(x + 30);
};
function drawCollect6 (x){
    if (x > 660){
        return
    };
    collects.push(new Collectable(humanImg, x, 162, 15, 20));
    return drawCollect6(x + 30);
};
function drawCollect7 (x){
    if (x > 980){
        return
    };
    collects.push(new Collectable(humanImg, x, 162, 15, 20));
    return drawCollect7(x + 30);
};
function drawCollect8 (x){
    if (x > 420){
        return
    };
    collects.push(new Collectable(humanImg, x, 444, 15, 20));
    return drawCollect8(x + 30);
};
function drawCollect9 (x){
    if (x > 960){
        return
    };
    collects.push(new Collectable(humanImg, x, 444, 15, 20));
    return drawCollect9(x + 30);
};
function drawCollect10 (x){
    if (x > 450){
        return
    };
    collects.push(new Collectable(humanImg, x, 502, 15, 20));
    return drawCollect10(x + 30);
};
function drawCollect11 (x){
    if (x > 780){
        return
    };
    collects.push(new Collectable(humanImg, x, 502, 15, 20));
    return drawCollect11(x + 30);
};
function drawCollect12 (x){
    if (x > 960){
        return
    };
    collects.push(new Collectable(humanImg, x, 654, 15, 20));
    return drawCollect12(x + 30);
};
drawCollect1(30);
drawCollect2(540);
drawCollect3(30);
drawCollect4(30);
drawCollect5(330);
drawCollect6(570);
drawCollect7(780);
drawCollect8(30);
drawCollect9(570);
drawCollect10(210);
drawCollect11(540);
drawCollect12(30);
// Highscores
highScores = [
    {
        name: 'EEE',
        score: 00000
    },
    {
        name: 'LLL',
        score: 00000
    },
    {
        name: 'III',
        score: 00000
    }
];
//Shooting from enemy boss
if (intervalBossShoot){
    clearInterval(intervalBossShoot);
};
intervalBossShoot = setInterval(() => {
    shootingBoss.push(new Shoot(shootingVaccine, bossEnemy.x + 120, bossEnemy.y + 220));
}, 400);
//Listener to run game
window.addEventListener('load', () => {
    startSplashScreen();
    //Event listeners
    playBtn.forEach(e => {
        e.addEventListener('click', () => {
            //Clear the intervals if they were running
            clearInterval(intervalId);
            cancelAnimationFrame(intervalId);
            clearInterval(intervalBoss);
            cancelAnimationFrame(intervalBoss);
            if (pickedPathogen === null) { //If no player is selected
                alert('Please pick a pathogen!');
            } else {
                gameScreen(); //If it's selected starts the game
            };
        });
    });
    //Listener to recognize the arrow keys to play and the space to shoot in the boss level
    document.addEventListener("keydown", (event) => {
        switch (event.keyCode) {
        case 38:
            upArrow = true;
            downArrow = false;
            leftArrow = false;
            rightArrow = false;
            break;
        case 40:
            upArrow = false;
            downArrow = true;
            leftArrow = false;
            rightArrow = false;
            break;
        case 37:
            upArrow = false;
            downArrow = false;
            leftArrow = true;
            rightArrow = false;
            break;
        case 39:
            upArrow = false;
            downArrow = false;
            leftArrow = false;
            rightArrow = true;
            break;
        case 32:
            coughShootAudio.play();
            shooting.push(new Shoot(shootingVirus, mainPlayerBoss.x + 16, mainPlayerBoss.y));
        };
    });
    playBtnStart.forEach(e => {
        e.addEventListener('click', () => {
            //Audios
            gameStartBtnAudio.play();
            //Display page
            splashScreen.style.display = 'none';
            gameOverScreen.style.display = 'none';
            winScreen.style.display = 'none';
            selectPlayerScreen.style.display = 'block';
            gameOver = false;
        });
    });
    playBtnNext.forEach(e => {
        e.addEventListener('click', () => {
            if (gameOver === true){
                //Audios
                gameStartBtnAudio.play();
                gameOverAudio.play();
                // Display page
                highScoreScreen.style.display = 'none';
                splashScreen.style.display = 'none';
                gameOverScreen.style.display = 'block';
            } else {
                //Audios
                gameStartBtnAudio.play();
                winAudio.play();
                //Display page
                highScoreScreen.style.display = 'none';
                splashScreen.style.display = 'none';
                winScreen.style.display = 'block';
            };
        });
    });
    //Buttons to choose the player
    virusBtn.addEventListener('click', () => {
        pickedPathogen = 'virusPl';
        playerSelectAudio.play();
    });
    bacteriaBtn.addEventListener('click', () => {
        pickedPathogen = 'bacteriaPl';
        playerSelectAudio.play();
    });
    nanovirusBtn.addEventListener('click', () => {
        pickedPathogen = 'nanovirusPl';
        playerSelectAudio.play();
    });
    protozoaBtn.addEventListener('click', () => {
        pickedPathogen = 'protozoaPl';
        playerSelectAudio.play();
    });
});