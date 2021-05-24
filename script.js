const startGameBtn = document.querySelector('.start');
const gameContainer = document.querySelector('.game-container');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const messageElement = document.querySelector('.message');
const secretNumber = document.querySelector('.number');
const number1 = document.getElementById('number--0');
const number2 = document.getElementById('number--1');
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');
const score0Element = document.getElementById('score--0');
const score1Element = document.getElementById('score--1');
let random = Math.trunc(Math.random() * 20 + 1)
// secretNumber.textContent = random;
let activePlayer, playing, scores;
function init() {
    random = Math.trunc(Math.random() * 20 + 1)

    activePlayer = 0;
    playing = true;
    scores = [0, 0];
    score0Element.textContent = 0;
    score1Element.textContent = 0;
    player0Element.classList.remove('player--winner');
    player1Element.classList.remove('player--winner');
    player0Element.classList.add('player--active');
    player1Element.classList.remove('player--active');
    displayMessage("Start guessing...")
    setDefault()
}
init()
//display Message
function displayMessage(message) {
    messageElement.textContent = message;
}

startGameBtn.addEventListener('click', startGame);
function startGame() {
    gameContainer.style.opacity = 1;
    startGameBtn.classList.add('hidden')
}
function switchPlayer() {
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0Element.classList.toggle('player--active');
    player1Element.classList.toggle('player--active');

}

btnRoll.addEventListener('click', generateNumber);
function generateNumber() {

    if (playing) {
        if (Number(document.getElementById(`number--${activePlayer}`).value) === random) {
            displayMessage('Correct Number 👏')
            scores[activePlayer]++;
            document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer]
            random = Math.trunc(Math.random() * 20 + 1);


            if (scores[activePlayer] === 3) {
                playing = false;
                document
                    .querySelector(`.player--${activePlayer}`)
                    .classList.add('player--winner');
                document
                    .querySelector(`.player--${activePlayer}`)
                    .classList.remove('player--active');
                displayMessage(`player ${activePlayer + 1} won🎉`)

            }

        } else {
            displayMessage(Number(document.getElementById(`number--${activePlayer}`).value) > random ? "Too high😕" : "Too low😕")
            switchPlayer();
            setDefault()

        }
    }
}

function setDefault() {
    number1.value = "";
    number2.value = "";
}
btnNew.addEventListener('click', init);