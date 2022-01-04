function losing(){
    gameOver = true;
    bossLevelAudio.pause();
    updateHighScores();
    highScoreScreen.style.display = 'block';
    mycanvas.style.display = 'none';
    //Restart variables
    specialCollects.forEach(specialCollect => {
        specialCollect.collected = false;
        specialCollect.notScored = true;
    });
    collects.forEach(collect => {
        collect.collected = false;
        collect.notScored = true;
    });
    lives = 2;
    points = 0;
    pointsRestart = 0;
    upArrow = false;
    downArrow = false;
    leftArrow = false;
    rightArrow = false;
    bossHealth = 360;
    mainPlayerBoss = 0;
    shooting = [];
    bossEnemy = 0;
    shootingBoss = [];
    clearInterval(intervalId);
};