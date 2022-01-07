# Vacman

## Description

Vacman is a game where the player (which can be selected from 4 classes) has to collect some small objects (people) in order to score and win the game. There will also be four enemies (vaccines) that will try to get the player and kill it. These enemies can be defeated using four special objects (mutations) that will be in the four corners of the map, when you get one of these objects the enemies become vulnerable to the player for a period of time. However, the enemies only are defeated during some time, after that they respawn. This time is calculated based on the objects collected. The score is also calculated based on the objects collected and the enemies defeated. The player has three lives to defeat the game and after this first screen there is a second boss level screen.
In the boss level, the player has to shoot down an enemy (doctor) to win the game.

## MVP (DOM - CANVAS)

- Game has one player that moves vertically and horizontally using arrow keys.
- The four enemies pursue the player until they kill it.
- The player has three lives.
- The player has to collect objects to score and win the game.
- The player can defeat the enemies for some time if it collect special objects.
- The extra boss level is played when the player collects every object in the first screen.

## Backlog

- Improve the algorith for the enemies to pursue the player, maybe using A\* or Dijstra.

## Data structure

# script.js

- Selectors
- Variables
- Images
- Audios
- Classes:
  - Wall () {
    this.x;
    this.y;
    this.width;
    this.height;
    this.color;
    this.gate;
    }
    - draw () {}
  - Collectable () {
    this.img;
    this.x;
    this.y;
    this.width;
    this.height;
    this.collected;
    this.notScored;
    this.mutate;
    }
    - draw () {}
    - checkcollision (object) {}
    - collect (object)
    - updateScore(object, score)
  - Player extends Collectable () {
    super(img, x, y);
    this.width;
    this.height;
    this.speedX;
    this.speedY;
    }
    - moveRight (objects) {}
    - moveLeft (objects) {}
    - moveUp (objects) {}
    - moveDown (objects) {}
  - Enemy extends Player () {
    super(img, x, y);
    this.width;
    this.height;
    this.speedX;
    this.speedY;
    this.dx;
    this.dy;
    this.distance;
    this.angle;
    this.home;
    this.scared;
    this.dead;
    }
    - updateAngleX (player, objects) {}
    - updateAngleY (player, objects) {}
    - updateAngleScaredX (player, objects) {}
    - updateAngleScaredY (player, objects) {}
    - scare (player, objects) {}
    - transportHome () {}
    - death (objects) {}
  - PlayerBoss extends Collectable () {
    super(img, x, y);
    this.width;
    this.height;
    this.speedX;
    this.speedY;
    }
    - moveRight (objects) {}
    - moveLeft () {}
    - moveUp () {}
    - moveDown () {}
  - Shoot extends Collectable () {
    super(img, x, y);
    this.width;
    this.height;
    }
  - Boss extends Collectable () {
    super(img, x, y);
    this.width;
    this.height;
    this.speedX;
    this.hit;
    }
    - randomMovement (objects) {}
    - drawHealthBar () {}
    - decreaseHealth () {}
- Event listeners

# splashScreen.js

- startSplashScreen () {}

# gameScreen.js

- gameScreen () {}

# gameArea.js

- updateGameArea () {}

# bossLevel.js

- bossLevelArea () {}

# winning.js

- winning () {}

# losing.js

- losing () {}

# score.js

- saveHighScore (index) {}
- updateHighScores () {}

# restart.js

- restart () {}

## States y States Transitions

Definition of the different states and their transition (transition functions)

- splashScreen
- selectPlayerScreen
- gameScreen
- highScoreScreen
- gameoverScreen
- winScreen
- bossLevelScreen

## Task

- script - buildDom
- script - buildSplashScreen
- script - addEventListener
- script - buildGameScreen
- script - buildGameOverScreen
- script - buildWinScreen
- script - buildBossLevelScreen
- game - startLoop
- game - buildCanvas
- game - updateCanvas
- game - drawCanvas
- wall - draw
- collectable - draw
- collectable - checkcollision
- collectable - collect
- collectable - updateScore
- game - addCollectable
- game - addSpecialCollectable
- player - draw
- player - move
- game - addPlayer
- enemy - draw
- enemy - move
- enemy - scare
- enemy - transportHome
- enemy - death
- game - addEnemy
- game - checkCollision
- game - GameOver
- game - bossLevel
- playerBoss - draw
- playerBoss - move
- game - addPlayerBoss
- shoot - draw
- game - addShoot
- boss - draw
- boss - move
- boss - drawHealthBar
- boss - decreaseHealth
- game - checkCollision
- game - Win
- game - GameOver
- game - updateScore
- game - restart

### Trello

[Link Trello](https://trello.com/b/WlTZA7Xk/vacman-game)

### Git

URLs for the project repo and deploy
[Link Repo](https://github.com/RaAlMer/vacman-game)
[Link Deploy](https://raalmer.github.io/vacman-game/)

### Slides

[Link Slides.com](https://slides.com/raalmer/vacman-game)
