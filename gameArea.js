function updateGameArea() {
    ctx.clearRect(0, 0, mycanvas.width, mycanvas.height);
    //Adding audio
    backgroundMusic.play();
    backgroundMusic.volume = 0.2;
    //Canvas definition
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, mycanvas.width, mycanvas.height);
    walls.forEach((wall) => {
        wall.draw();
    });
    specialCollects.forEach(specialCollect => {
        if (specialCollect.collected === false) specialCollect.draw();
        specialCollect.checkcollision(mainPlayer);
        specialCollect.collect(mainPlayer);
        specialCollect.updateScore(mainPlayer, 2000);
        if (specialCollect.mutate === true){
            enemies.forEach(enemy => {
                enemy.scared = true;
            });
            ghostScaredAudio.play();
            //Time in which enemies can be killed and run away
            setTimeout(() => {
                enemies.forEach(enemy => {
                    enemy.scared = false;
                });
                specialCollect.mutate = false;
            }, 8000);
        };
    });
    collects.forEach(collect => {
        if (collect.collected === false) collect.draw();
        collect.checkcollision(mainPlayer);
        collect.collect(mainPlayer);
        collect.updateScore(mainPlayer, 50);
    });
    //Points
    ctx.fillStyle = "white";
    ctx.font = "24px 'Press Start 2P'"
    ctx.fillText(`HIGH SCORE`, 1030, 40);
    ctx.fillText(points, 1200, 80);
    ctx.fillText("1UP", 1320, 40);
    ctx.fillText("LIVES", 1150, 120);
    ctx.fillText(lives, 1200, 160);
    //Player
    mainPlayer.draw();
    if(upArrow){
        mainPlayer.moveUp(walls);
    } else if(downArrow){
        mainPlayer.moveDown(walls);
    } else if(leftArrow){
        mainPlayer.moveLeft(walls);
    } else if(rightArrow){
        mainPlayer.moveRight(walls);
    };
    walls.forEach(wall => {
        mainPlayer.checkcollision(wall);
    });
    //Enemies
    enemies.forEach(enemy => {
        enemy.draw();
        walls.forEach(wall => {
            enemy.checkcollision(wall);
        });
        if (pointsRestart >= 1750 || enemies[0].home === false){
            if(enemies[0].home === true){
                enemies[0].x = 480;
                enemies[0].y = 230;
                enemies[0].home = false;
            };
            if (enemies[0].scared === true && enemies[0].dead === false){
                enemies[0].scare(mainPlayer, walls);
                if (enemies[0].x >= 976) enemies[0].x = 0;
                if (enemies[0].x <= 0) enemies[0].x = 975;
            } else if (enemies[0].scared === false && enemies[0].dead === false){
                enemies[0].updateAngleX(mainPlayer, walls);
                enemies[0].updateAngleY(mainPlayer, walls);
                if (enemies[0].x >= 976) enemies[0].x = 0;
                if (enemies[0].x <= 0) enemies[0].x = 975;
            } else if (enemies[0].dead === true){
                enemies[0].death(walls);
                if (enemies[0].x >= 976) enemies[0].x = 0;
                if (enemies[0].x <= 0) enemies[0].x = 975;
            };
        };
        if (pointsRestart >= 3500 || enemies[1].home === false){
            if(enemies[1].home === true){
                enemies[1].x = 480;
                enemies[1].y = 230;
                enemies[1].home = false;
            };
            if (enemies[1].scared === true && enemies[1].dead === false){
                enemies[1].scare(mainPlayer, walls);
                if (enemies[1].x >= 976) enemies[1].x = 0;
                if (enemies[1].x <= 0) enemies[1].x = 975;
            } else if (enemies[1].scared === false && enemies[1].dead === false) {
                enemies[1].updateAngleX(mainPlayer, walls);
                enemies[1].updateAngleY(mainPlayer, walls);
                if (enemies[1].x >= 976) enemies[1].x = 0;
                if (enemies[1].x <= 0) enemies[1].x = 975;
            } else if (enemies[1].dead === true){
                enemies[1].death(walls);
                if (enemies[1].x >= 976) enemies[1].x = 0;
                if (enemies[1].x <= 0) enemies[1].x = 975;
            };
        };
        if (pointsRestart >= 5250 || enemies[2].home === false){
            if(enemies[2].home === true){
                enemies[2].x = 480;
                enemies[2].y = 230;
                enemies[2].home = false;
            };
            if (enemies[2].scared === true && enemies[2].dead === false){
                enemies[2].scare(mainPlayer, walls);
                if (enemies[2].x >= 976) enemies[2].x = 0;
                if (enemies[2].x <= 0) enemies[2].x = 975;
            } else if (enemies[2].scared === false && enemies[2].dead === false) {
                enemies[2].updateAngleX(mainPlayer, walls);
                enemies[2].updateAngleY(mainPlayer, walls);
                if (enemies[2].x >= 976) enemies[2].x = 0;
                if (enemies[2].x <= 0) enemies[2].x = 975;
            }else if (enemies[2].dead === true){
                enemies[2].death(walls);
                if (enemies[2].x >= 976) enemies[2].x = 0;
                if (enemies[2].x <= 0) enemies[2].x = 975;
            };
        };
        if (pointsRestart >= 7000 || enemies[3].home === false){
            if(enemies[3].home === true){
                enemies[3].x = 480;
                enemies[3].y = 230;
                enemies[3].home = false;
            };
            if (enemies[3].scared === true && enemies[3].dead === false){
                enemies[3].scare(mainPlayer, walls);
                if (enemies[3].x >= 976) enemies[3].x = 0;
                if (enemies[3].x <= 0) enemies[3].x = 975;
            } else if (enemies[3].scared === false && enemies[3].dead === false) {
                enemies[3].updateAngleX(mainPlayer, walls);
                enemies[3].updateAngleY(mainPlayer, walls);
                if (enemies[3].x >= 976) enemies[3].x = 0;
                if (enemies[3].x <= 0) enemies[3].x = 975;
            } else if (enemies[3].dead === true){
                enemies[3].death(walls);
                if (enemies[3].x >= 976) enemies[3].x = 0;
                if (enemies[3].x <= 0) enemies[3].x = 975;
            };
        };
        if (mainPlayer.checkcollision(enemies[0])){
            if (enemies[0].scared === true) enemies[0].dead = true;
        };
        if (mainPlayer.checkcollision(enemies[1])){
            if (enemies[1].scared === true) enemies[1].dead = true;
        };
        if (mainPlayer.checkcollision(enemies[2])){
            if (enemies[2].scared === true) enemies[2].dead = true;
        };
        if (mainPlayer.checkcollision(enemies[3])){
            if (enemies[3].scared === true) enemies[3].dead = true;
        };
        if (mainPlayer.checkcollision(enemy)){
            if (enemy.scared === false) {
                losingLifeAudio.play();
                lives--;
                pointsRestart = 0;
                upArrow = false;
                downArrow = false;
                leftArrow = false;
                rightArrow = false;
                enemy.scared = false;
                backgroundMusic.pause();
                if (lives < 0){
                    losing();
                } else {
                    clearInterval(intervalId);
                    restart();
                };
            };
        };
        //Boss level
        if (points >= 18600){
            //Restart some variables
            upArrow = false;
            downArrow = false;
            leftArrow = false;
            rightArrow = false;
            //Sound
            backgroundMusic.pause();
            playerMovingAudio.pause();
            bossLevelAudio.play();
            bossLevelAudio.volume = 0.6;       
            //Player
            if (pickedPathogen === 'virusPl'){
                mainPlayerBoss = new PlayerBoss(virusImg, 480, mycanvas.height - 100);
            } else if (pickedPathogen === 'bacteriaPl'){
                mainPlayerBoss = new PlayerBoss(bacteriaImg, 480, mycanvas.height - 100);
            } else if (pickedPathogen === 'nanovirusPl'){
                mainPlayerBoss = new PlayerBoss(nanovirusImg, 480, mycanvas.height - 100);
            } else if (pickedPathogen === 'protozoaPl'){
                mainPlayerBoss = new PlayerBoss(protozoaImg, 480, mycanvas.height - 100);
            };
            //Enemies
            bossEnemy = new Boss(enemyDoctor, 340, 10);
            //Interval
            if (intervalBoss) clearInterval(intervalBoss);
            clearInterval(intervalId);
            intervalBoss = setInterval(() => {
                requestAnimationFrame(bossLevelArea);
            }, 20);
        };
    });
};