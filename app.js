const overlay = document.getElementById('overlay');
const headline = document.querySelector('.title');
const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const startBtn = document.getElementsByClassName('btn__reset')[0];
const buttons = qwerty.querySelectorAll('button');
const livesObject = document.getElementsByClassName('tries')[0].parentElement;
let missed = 0;
let win = false;

const phrases = [
    'it aint over til its over',
    'a penny saved is a penny earned',
    'he who is resistant to change is destined to perish',
    'spare the rod spoil the child',
    'speak of the devil',
    'like father like son',
    'its a dog eat dog food world'
];

//remove div to start game
startBtn.addEventListener('click', () => {
    overlay.style.display = 'none';
});

function getRandomPhraseAsArray(arr) {
    const randomNumber = Math.floor(Math.random() * arr.length);
    const randomSelection = arr[randomNumber];
    const selection = randomSelection.split('');
    return selection;
};

//parses phrase into a new <li> and adds the class "letter" if charachter is not a space
function addPhraseToDisplay(arr) {
    const ul = phrase.firstElementChild
    function addLI(text){
        const newLI = document.createElement('li');
        newLI.innerText = text;
        return newLI;
    }
    for (each of arr) {
        const letter = addLI(each);
        ul.append(letter);
        if (each !== ' ') {
            letter.className += ' letter';
        } else if (each === ' ') {
            letter.className += ' space';
        }
    }
};

//choose a phrase and display gameboard
let phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);

function checkLetter(btn) {
    const letterSelect = btn.innerText;
    const letterAll = document.getElementsByClassName("letter");
    const letterArray = Array.from(letterAll);
    let match = null;
    for (each of letterArray) {
        if (each.innerText === letterSelect) {
            match = letterSelect;
            each.className += ' show';
        }
    }
    return match;
}

//swaps the leftmost live heart with a grey heart
function swapHeart() {
    i = 6-missed;
    const heartImg = livesObject.querySelector(`:nth-child(${i})`).lastElementChild;
    heartImg.setAttribute('src', 'images/lostHeart.png');
}

function newGame () {
    for (each of buttons) {
        each.removeAttribute('disabled');
        each.removeAttribute('class');
    }
    phrase.firstElementChild.innerHTML = '';
    phraseArray = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(phraseArray);
    missed = 0;
    for (each of livesObject.children) {
        each.firstElementChild.setAttribute('src', 'images/liveHeart.png')
    }
}

//display overlay with win/lose status
function results(score) {
    if (score) {
        overlay.className = 'win';
        headline.innerText = "Congratulations! You've won!";
    }
    if (!score) {
        overlay.className = 'lose';
        headline.innerHTML = 'Sorry, you lost!<br>Better luck next time!';
    }
    overlay.style.display = 'flex';
    startBtn.innerText = 'start a new game';
    newGame();
}

function checkWin() {
    const hiddenLetters = document.querySelectorAll('.letter');
    const revealedLetters = document.querySelectorAll('.show');
    if (hiddenLetters.length === revealedLetters.length) {
        win = true;
        results(win);
    }
    if (missed > 4) {
        win = false;
        results(win);
    }
}

//click letter and check for match and win/lose
qwerty.addEventListener('click', (e) => {
    const button = e.target;
    if (button.tagName === 'BUTTON' && button.className !== 'chosen') {
        button.className = 'chosen';
        button.setAttribute('disabled', 'true');
        const letterFound = checkLetter(button);
        console.log(letterFound);
        if (!letterFound) {
            missed += 1;
            swapHeart();
        }
        console.log(missed +' missed guesses');
    }
    checkWin();
});

