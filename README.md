# Vacman

## Description

Vacman is a game where the player (which can be selected from 4 classes) has to collect some small objects (people) in order to win the game. There will also be four enemies (vaccines) that will try to get the player and kill it. These enemies can be defeated using four special objects (mutations) that will be in the four corners of the map, when you get one of these objects the enemies become vulnerable to the player. However, the enemies only are defeated during some time, after that they respawn. This time is calculated based on the objects collected. The score is also calculated based on the objects collected and the enemies defeated. The player has three lives to defeat the game.
After this first screen there is a second boss level screen ...

## MVP (DOM - CANVAS)

- Game has one player that moves vertically and horizontally
- The four enemies pursue the player until they kill it
- The player has three lives
- The player has to collect objects to win the game
- The player can defeat the enemies for some time if it collect special objects
- ...

## Backlog

- Add scoreboard
- Extra boss level if screen one is completed

## Data structure

# main.js

- buildSplashScreen () {}
- buildGameScreen () {}
- buildGameOverScreen () {}
- buildWinScreen () {}
- buildBossLevelScreen () {}

# game.js

- Game () {}
- starLoop () {}
- checkCollisions () {}
- addEnemy () {}
- clearCanvas () {}
- updateCanvas () {}
- drawCanvas () {}
- GameOver () {}

# player.js

- Player () {
  this.x;
  this.y;
  this.speed;
  ...
  }
- draw () {}
- move () {}
- checkCollision () {}
  ...

# enemy.js

- Enemy () {
  this.x;
  this.y;
  ...
  }
- draw () {}
- move () {}
- checkCollision () {}
  ...

# object.js

- Object () {
  this.x;
  this.y;
  ...
  }
- draw () {}
- checkCollision () {}
  ...

# special-object.js

- SpecialObject () {
  this.x;
  this.y;
  ...
  }
- draw () {}
- checkCollision () {}
  ...

## States y States Transitions

Definition of the different states and their transition (transition functions)

- splashScreen
- gameScreen
- gameoverScreen
- winScreen
- bossLevelScreen

## Task

- main - buildDom
- main - buildSplashScreen
- main - addEventListener
- main - buildGameScreen
- main - buildGameOverScreen
- main - buildWinScreen
- main - buildBossLevelScreen
- game - startLoop
- game - buildCanvas
- game - updateCanvas
- game - drawCanvas
- player - draw
- player - move
- game - addPlayer
- enemy - draw
- enemy - move
- game - addEnemy
- object - draw
- game - addObject
- specialObject - draw
- game - addSpecialObject
- game - checkCollision
- game - GameOver
- game - Win
- game - bossLevel
  ...

## Additional Links

### Trello

[Link url](https://trello.com)

### Git

URls for the project repo and deploy
[Link Repo](https://github.com/)
[Link Deploy](https://....github.io/.../)

### Slides

[Link Slides.com](http://slides.com)
