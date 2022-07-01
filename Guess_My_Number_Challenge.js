'use strict';
var question;
var low = 1;
var high = 20;
var confirmLimit;
var CurrentLimit;
var score = 20;
var highscore = 0;
var dist = 4;
var secretNumber = Math.floor(Math.random()*20+1);
var rang1 = 5;
var rang2 = 15;

askForLimit();

function setLimits(){
    low = Number(prompt('Enter Lower Limit in Number Only...!'));
    if(low){
    high = Number(prompt('Enter Higher Limit in Number Only...!'));
    }
    score = high - low;
    dist = Math.floor(score/4);
    document.querySelector('.score').textContent = score;
    secretNumber = Math.trunc(Math.random()*(high-low+1)+low);
    rang1 = Math.floor(secretNumber - dist); 
    rang2 = Math.floor(secretNumber + dist);
    document.querySelector('.between').innerHTML = `(Between ${low} and ${high})`;
}

function askForLimit(){
    question = confirm('Current Limit is 1 to 20, Do you wanna Change it...?');
    if(question == true){
        setLimits();
    }
}

document.querySelector('.check').addEventListener('click', function(){
    occureEvent();
    const guess = document.getElementById("guess").placeholder = document.getElementById("guess").value;
    document.querySelector('.guess').value = "";})

document.querySelector('.again').addEventListener('click', function(){
    playAgain();
})
document.querySelector('.again').classList.add('hidden');
document.querySelector('.reset').classList.add('hidden');
document.querySelector('.reset').addEventListener('click', function(){
    reset();
    highscore = 0;
    document.querySelector('.highscore').textContent = highscore;
})

document.addEventListener('keydown', function(event){
    if(event.key == 'Enter'){
        occureEvent();
        const guess = document.querySelector('.guess').placeholder = document.querySelector('.guess').value;
        document.querySelector('.guess').value = "";
    }
})

function DisplayMessage(msg){
    document.querySelector('.message').textContent = msg;
}

function NoNumber(){
    DisplayMessage('No number !');
    document.querySelector('.again').classList.add('hidden');
    document.querySelector('.guess').style.border = '4px solid white';
}

function success (){
    document.querySelector('.number').textContent = secretNumber;
    DisplayMessage('correct number !');
    document.querySelector('.guess').classList.add('hidden');
    document.querySelector('.check').classList.add('hidden');
    document.querySelector('.again').classList.remove('hidden');
    document.querySelector('.reset').classList.remove('hidden');
    document.querySelector('body').style.backgroundColor = 'rgb(0, 212, 254)';
    document.querySelector('.number').style.width = '30rem';
    if(score > highscore){
        highscore = score;
        document.querySelector('.highscore').textContent = highscore;
    }
}

function LostGame(){
    document.querySelector('.score').textContent = 0;
    DisplayMessage('You Lost the Game !');
    document.querySelector('.guess').classList.add('hidden');
    document.querySelector('.check').classList.add('hidden');
    document.querySelector('.reset').classList.remove('hidden');
    document.querySelector('.again').classList.remove('hidden');
}

function playAgain(){
    document.querySelector('.reset').classList.add('hidden');
    secretNumber = Math.trunc(Math.random()*(high-low+1)+low);
    document.querySelector('.score').textContent = high - low;
    DisplayMessage('Start Guessing... !');
    document.querySelector('.guess').classList.remove('hidden');
    document.querySelector('.check').classList.remove('hidden');
    document.querySelector('.again').classList.add('hidden');
    document.querySelector('.number').textContent = '?';
    document.querySelector('.guess').value = '';
    document.querySelector('body').style.backgroundColor = '#222';
    document.querySelector('.number').style.width = '15rem';
    document.querySelector('.guess').style.border = '4px solid white';
    score = high - low + 1;
    document.querySelector('.score').textContent = score;
    const guess = document.getElementById("guess").placeholder = '';
}

function invalid(){
    DisplayMessage(`Please Enter no between ${low} and ${high}`);
    document.querySelector('.guess').style.border = '4px solid red';
    document.querySelector('.again').classList.add('hidden');
}

function occureEvent(){
    const guess = Number(document.querySelector('.guess').value);
    
    if(isNaN(guess) &&  guess.trim() == "") {
        NoNumber();
        document.querySelector('.guess').style.border = '4px solid red';
    }
    else if((guess > high) || (guess < low)){
        invalid();
    }else if(guess == secretNumber){
        success();
    }else if(guess !== secretNumber){
        if(score > 1){
            limits(guess, rang1, rang2);
            score--;
            document.querySelector('.score').textContent = score;
            document.querySelector('.guess').style.border = '4px solid white';
        }
        else{
            LostGame();
        }
    }
}

function limits(guess, rang1, rang2){
    if(guess < rang1){
        document.querySelector('.message').textContent = 'Too Low !';
    }else if(guess > rang2){
        document.querySelector('.message').textContent = 'Too High !';
    }else if (guess >= rang1 && guess < secretNumber) {
        document.querySelector('.message').textContent = 'Near Too Low !';
    }else if (guess <= rang2 && guess > secretNumber) {
        document.querySelector('.message').textContent = 'Near Too High !';
    }
}

function reset(){
    setLimits()
    document.querySelector('.score').textContent = high - low;
    DisplayMessage('Start Guessing... !');
    document.querySelector('.guess').classList.remove('hidden');
    document.querySelector('.check').classList.remove('hidden');
    document.querySelector('.again').classList.add('hidden');
    document.querySelector('.number').textContent = '?';
    document.querySelector('.guess').value = '';
    document.querySelector('body').style.backgroundColor = '#222';
    document.querySelector('.number').style.width = '15rem';
    document.querySelector('.guess').style.border = '4px solid white';
    const guess = document.getElementById("guess").placeholder = '';
    document.querySelector('.reset').classList.add('hidden');
}
