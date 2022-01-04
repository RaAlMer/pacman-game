function restart(){
    // Values
    if (pickedPathogen === null) {
        alert('Please pick a pathogen!');
    } else {
        if (pickedPathogen === 'virusPl'){
            mainPlayer = new Player(virusImg, 480, 495);
        } else if (pickedPathogen === 'bacteriaPl'){
            mainPlayer = new Player(bacteriaImg, 480, 495);
        } else if (pickedPathogen === 'nanovirusPl'){
            mainPlayer = new Player(nanovirusImg, 480, 495);
        } else if (pickedPathogen === 'protozoaPl'){
            mainPlayer = new Player(protozoaImg, 480, 495);
        };
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
        mycanvas.style.display = 'block';
        //Start game
        intervalId = setInterval(() => {
            requestAnimationFrame(updateGameArea);
        }, 20);
    };
};