const CARD = 'card';
const CARD_FRONT = 'card-front';
const CARD_BACK = 'card-back';
const ICON = 'icon';



function createDeckScreen(deck) {
    let board = document.getElementById("board");
    board.innerHTML = '';   // clear the board

    for (let card of deck) {

        // creates card div
        let cardElement = document.createElement('div');
        cardElement.id = card.id;
        cardElement.classList.add(CARD);
        cardElement.dataset.icon = card.icon;   // for comparison with other cards

        // creates front of card subdiv
        let cardFrontFace = document.createElement('div');
        cardFrontFace.classList.add(CARD_FRONT);
        let cardIconElement = document.createElement('img');
        cardIconElement.classList.add(ICON);
        cardIconElement.src = "./assetts/images/" + card.icon + ".png";
        cardFrontFace.appendChild(cardIconElement);

        // creates back of card subdiv
        let cardBackFace = document.createElement('div');
        cardBackFace.classList.add(CARD_BACK);
        cardBackFace.innerHTML = "&lt;/&gt;";

        // add subdivs card faces to div card
        cardElement.appendChild(cardFrontFace);
        cardElement.appendChild(cardBackFace);

        // add click listener to card and to the board
        cardElement.addEventListener('click', flipCardScreen);
        board.appendChild(cardElement);
    }
}

function flipCardScreen() {

    if (game.setCard(this.id)) {

        this.classList.add('flip');

        if (game.card2) {

            if (game.isMatch()) {
                if (game.isGameOver()) {
                    let restartScreen = document.getElementById("restart-screen");

                    restartScreen.style.display = "flex";
                }
                game.clearAuxCards();
            } else {
                let card1Screen = document.getElementById(game.card1.id);
                let card2Screen = document.getElementById(game.card2.id);

                setTimeout(() => {
                    card1Screen.classList.remove('flip');
                    card2Screen.classList.remove('flip');
                    game.unflipAuxCards();
                }, 1000);
            }
        }

    }

}

function restartGame() {
    game.createDeck();
    createDeckScreen(game.deck);

    let restartScreen = document.getElementById("restart-screen");
    restartScreen.style.display = "none";
}

function startGame() {
    game.createDeck();
    createDeckScreen(game.deck);
}

startGame();

