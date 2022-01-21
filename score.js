//Function to save the high score reached and ask for the name of the player
function saveHighScore(index) {
    namePlayer = prompt("WHAT'S YOUR NAME PLAYER?");
    highScores.splice(index, 0 , {
        name: namePlayer.slice(0, 7).toUpperCase(),
        score: points
    });
    highScores.pop();
};
//Function to update the high scores list
function updateHighScores() {
    if (points >= highScores[0].score) {
        saveHighScore(0);
    } else if (points >= highScores[1].score) {
        saveHighScore(1);
    } else if (points >= highScores[2].score) {
        saveHighScore(2);
    };
    highScoreList.innerHTML = ''
    highScores.forEach((elem) => {
        let li = document.createElement('li');
        li.innerHTML = `${elem.name} - ${elem.score}`;
        highScoreList.appendChild(li);
    });
};