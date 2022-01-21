//Function that creates the boss level
function bossLevelArea (){
    ctx.clearRect(0, 0, mycanvas.width, mycanvas.height);
    //Canvas definition
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, mycanvas.width, mycanvas.height);
    //Wall
    bossLevelWall.forEach((wall) => {
        wall.draw();
    });
    //Player drawing and moving checking collision with wall
    mainPlayerBoss.draw();
    if(upArrow){
        mainPlayerBoss.moveUp();
        upArrow = false;
    } else if(downArrow){
        mainPlayerBoss.moveDown();
        downArrow = false;
    } else if(leftArrow){
        mainPlayerBoss.moveLeft();
        leftArrow = false;
    } else if(rightArrow){
        mainPlayerBoss.moveRight(bossLevelWall);
        rightArrow = false;
    };
    bossLevelWall.forEach(wall => {
        mainPlayerBoss.checkcollision(wall);
    });
    //Points written on the canvas, also the boss health and lives left
    ctx.fillStyle = "white";
    ctx.font = "24px 'Press Start 2P'"
    ctx.fillText(`HIGH SCORE`, 1030, 40);
    ctx.fillText(points, 1200, 80);
    ctx.fillText("1UP", 1320, 40);
    ctx.fillText("LIVES", 1150, 120);
    ctx.fillText(lives, 1200, 160);
    ctx.fillText("BOSS HEALTH", mycanvas.width - 380, mycanvas.height - 420);
    //Shooting from the main player
    shooting.forEach((shoot) => {
        shoot.draw();
        shoot.y -= 4;
    });
    //Boss drawing and movement checking collision with the wall
    bossEnemy.draw();
    bossEnemy.randomMovement(bossLevelWall);
    bossLevelWall.forEach(wall => {
        bossEnemy.checkcollision(wall);
    });
    bossEnemy.drawHealthBar();
    //Shooting from the boss
    shootingBoss.forEach((shoot) => {
        shoot.draw();
        shoot.y += 4;
        enemyShootAudio.play();
    });
    //Collision between boss and player shooting
    bossEnemy.decreaseHealth();
    shooting.forEach((shoot, i) => {
        if (shoot.checkcollision(bossEnemy)){
            bossEnemy.hit = true;
            shooting.splice(i, 1);
        };
    });
    //Collision between player and boss shooting
    shootingBoss.forEach((shoot, i) => {
        if (shoot.checkcollision(mainPlayerBoss)){
            shootingBoss.splice(i, 1);
            lives--;
            losingLifeAudio.play();
        }
    });
    //Losing boss level
    if (lives < 0) losing();
    //Winning boss level
    if (bossHealth <= 0){
        points += 5000;
        winning();
    };
};