const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const startBtn = document.getElementsByClassName('btn__reset')[0];
const buttons = qwerty.querySelectorAll('button');
const livesTotal = document.querySelectorAll('.tries');
let missed = 0;

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
    document.getElementById('overlay').style.display = 'none';
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
const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);

function checkLetter(btn) {
    const letterSelect = btn.innerText;
    const letterAll = document.getElementsByClassName("letter");
    const letterArray = Array.from(letterAll);
    let match = null;
    for (each of letterArray) {
        // console.log('from phrase: ' + each.innerText, 'letter you chose: ' + letterSelect);
        if (each.innerText === letterSelect) {
            match = letterSelect;
            each.className += ' show';
        }
    }
    return match;
}

qwerty.addEventListener('click', (e) => {
    const button = e.target;
    if (button.tagName === 'BUTTON' && button.className !== 'chosen') {
        button.className = 'chosen';
        button.setAttribute('disabled', 'true');
        const letterFound = checkLetter(button);
        console.log(letterFound);
        if (!letterFound) {
            missed += 1;
            // livesRemain.lastElementChild.setAttribute('src', 'images/lostHeart.png');
        }
        console.log(missed +' missed guesses');
    }
});