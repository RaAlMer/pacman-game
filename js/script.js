//Selectors
let splashScreen = document.getElementById('start-page');
let playBtn = document.querySelectorAll('.play-btn');

//Variables

//Images
//Classes
const virusImg = new Image();
virusImg.src = "../images/virus.png";
const bacteriaImg = new Image();
bacteriaImg.src = "../images/bacteria.png";
const protozoaImg = new Image();
protozoaImg.src = "../images/protozoa.png";
const nanovirusImg = new Image();
nanovirusImg.src = "../images/nanovirus.png";
//Collectables
const humanImg = new Image();
humanImg.src = "../images/human.png";
const mutationImg = new Image();
mutationImg.src = "../images/mutation.png";
//Enemy
const vaccineImg = new Image();
vaccineImg.src = "../images/vaccine.png";

//Audios

//Canvas
const mycanvas = document.getElementById('my-canvas');
let ctx = mycanvas.getContext('2d');
ctx.fillStyle = "black";
ctx.fillRect(0, 0, mycanvas.width, mycanvas.height);

//Walls
class Wall {
    constructor(x, y, width, height, color){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }
    draw(){
        ctx.lineWidth = 3;
        ctx.strokeStyle = this.color;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
};

class Player {
    constructor(x, y, width, height, color){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }
    draw(){
        ctx.lineWidth = 3;
        ctx.strokeStyle = this.color;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
};

const wallThikness = 10;
const outerWalls = [
    new Wall(40, 3, 920, wallThikness, "blue"),
    new Wall(40, mycanvas.height - wallThikness - 2, 920, wallThikness, "blue"),
    new Wall(40, 3, wallThikness, 207, "blue"),
    new Wall(950, 3, wallThikness, 207, "blue"),
    new Wall(40, 200, 184, wallThikness, "blue"),
    new Wall(776, 200, 184, wallThikness, "blue"),
    new Wall(40, 423, wallThikness, 280, "blue"),
    new Wall(950, 423, wallThikness, 280, "blue"),
    new Wall(40, 423, 184, wallThikness, "blue"),
    new Wall(776, 423, 184, wallThikness, "blue"),
    new Wall(214, 200, wallThikness, 95, "blue"),
    new Wall(776, 200, wallThikness, 95, "blue"),
    new Wall(214, 338, wallThikness, 95, "blue"),
    new Wall(776, 338, wallThikness, 95, "blue"),
    new Wall(40, 285, 184, wallThikness, "blue"),
    new Wall(776, 285, 184, wallThikness, "blue"),
    new Wall(40, 338, 184, wallThikness, "blue"),
    new Wall(776, 338, 184, wallThikness, "blue")
];

const innerWalls = [
    new Wall(93, 56, 131, 43, "blue"),
    new Wall(466, 13, 66, 86, "blue"),
    new Wall(267, 56, 156, 43, "blue"),
    new Wall(774, 56, 131, 43, "blue"),
    new Wall(575, 56, 156, 43, "blue"),
    new Wall(93, 142, 131, 15, "blue"),
    new Wall(774, 142, 131, 15, "blue"),
    new Wall(267, 142, 45, 153, "blue"),
    new Wall(686, 142, 45, 153, "blue"),
    new Wall(267, 215, 140, 10, "blue"),
    new Wall(591, 215, 140, 10, "blue"),
    new Wall(356, 142, 287, 30, "blue"),
    new Wall(450, 142, 98, 83, "blue"),
    new Wall(267, 338, 45, 95, "blue"),
    new Wall(686, 338, 45, 95, "blue"),
    new Wall(356, 403, 287, 30, "blue"),
    new Wall(450, 403, 98, 83, "blue"),
    new Wall(267, 476, 131, 10, "blue"),
    new Wall(600, 476, 131, 10, "blue"),
    new Wall(93, 476, 131, 10, "blue"),
    new Wall(774, 476, 131, 10, "blue"),
    new Wall(136, 476, 88, 100, "blue"),
    new Wall(774, 476, 88, 100, "blue"),
    new Wall(40, 529, 53, 50, "blue"),
    new Wall(908, 529, 53, 50, "blue"),
    new Wall(93, 622, 305, 23, "blue"),
    new Wall(603, 622, 305, 23, "blue"),
    new Wall(267, 529, 45, 116, "blue"),
    new Wall(686, 529, 45, 116, "blue"),
    new Wall(356, 529, 287, 50, "blue"),
    new Wall(450, 529, 98, 116, "blue"),
    new Wall(356, 268, 10, 92, "blue"),
    new Wall(633, 268, 10, 92, "blue"),
    new Wall(356, 268, 118, 10, "blue"),
    new Wall(525, 268, 118, 10, "blue"),
    new Wall(474, 268, 50, 10, "yellow"),
    new Wall(356, 350, 287, 10, "blue"),
];

outerWalls.forEach((wall) => {
    wall.draw();
})
innerWalls.forEach((wall) => {
    wall.draw();
})