//Function called when the boss is defeated and the game won
function winning(){
    cancelAnimationFrame(intervalBoss);
    clearInterval(intervalBoss);
    bossLevelAudio.pause();
    //Calling the high score function
    updateHighScores();
    highScoreScreen.style.display = 'block';
    mycanvas.style.display = 'none';
    //Restart variables for another game
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
    gameOver = false;
    bossHealth = 360;
    mainPlayerBoss = 0;
    shooting = [];
    bossEnemy = 0;
    shootingBoss = [];
};