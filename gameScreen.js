//Function to draw the main board screen
function gameScreen(){
    ctx.clearRect(0, 0, mycanvas.width, mycanvas.height);
    // Player declared
    if (pickedPathogen === 'virusPl'){
        mainPlayer = new Player(virusImg, 480, 495);
        gameoverImg.src = "../images/virus.png";
    } else if (pickedPathogen === 'bacteriaPl'){
        mainPlayer = new Player(bacteriaImg, 480, 495);
        gameoverImg.src = "../images/bacteria.png";
    } else if (pickedPathogen === 'nanovirusPl'){
        mainPlayer = new Player(nanovirusImg, 480, 495);
        gameoverImg.src = "../images/nanovirus.png";
    } else if (pickedPathogen === 'protozoaPl'){
        mainPlayer = new Player(protozoaImg, 480, 495);
        gameoverImg.src = "../images/protozoa.png";
    };
    // Enemies declared
    enemies = [
        new Enemy(vaccineImg, 460, 290),
        new Enemy(vaccineImg, 400, 290),
        new Enemy(vaccineImg, 520, 290),
        new Enemy(vaccineImg, 580, 290)
    ];
    gameOver = false;
    //Display page
    splashScreen.style.display = 'none';
    gameOverScreen.style.display = 'none';
    selectPlayerScreen.style.display = 'none';
    winScreen.style.display = 'none';
    highScoreScreen.style.display = 'none';
    mycanvas.style.display = 'block';
    //Sound
    backgroundMusic.play();
    backgroundMusic.volume = 0.2;
    gameStartBtnAudio.play();
    //Start game
    intervalId = setInterval(() => {
        requestAnimationFrame(updateGameArea);
    }, 20);
};