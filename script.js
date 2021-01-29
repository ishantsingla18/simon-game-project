var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ['red', 'blue', 'green', 'yellow'];
var flag = false;
var level = 0;

$(window).keydown(() => {
    if(!flag) {
        nextSequence();
        flag = true;
    }
})

function nextSequence() {
    $('h1').text(`Level ${level}`);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    gamePattern.push(randomChosenColor);
    level++;
    console.log(gamePattern);
}

$('.btn').click((e) => {
    var userChosenColour = e.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    $(`#${e.target.id}`).addClass('pressed');
    setTimeout(() => {
        $(`#${e.target.id}`).removeClass('pressed');
    }, 100);
    checkAnswer(userClickedPattern.length-1);
})

function playSound(color) {
    var audio = new Audio(`sounds/${color}.mp3`);
    audio.play();
}

function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if(currentLevel === gamePattern.length-1) {
            userClickedPattern = [];
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }
    else {
        userClickedPattern = [];
        playSound('wrong');
        $('body').addClass('game-over');
        setTimeout(() => {
            $('body').removeClass('game-over')
        }, 200);
        $('h1').text("GameOver, Press Any Key to Restart");
        level = 0;
        gamePattern = [];
        flag = false;
    }
}