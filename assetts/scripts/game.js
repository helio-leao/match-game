let game = {

    icons: [
        'bootstrap',
        'css',
        'electron',
        'firebase',
        'html',
        'javascript',
        'jquery',
        'mongo',
        'node',
        'react'
    ],

    deck: null,

    card1: null,
    card2: null,
    lockedGame: false,

    createDeck: function () {
        this.deck = [];

        //creates deck
        for (let i = 0; i < this.icons.length; i++)
            this.deck.push(this.createCard(100 + i, this.icons[i]));

        // creates duplicate half of deck
        for (let i = 0; i < this.icons.length; i++)
            this.deck.push(this.createCard(100 + i + this.icons.length, this.icons[i]));

        this.shuffleDeck();
    },

    createCard: function (id, icon) {
        return {
            id: id,
            icon: icon,
            flipped: false
        };
    },

    shuffleDeck: function () {
        let auxDeck = [];

        while (this.deck.length > 0) {
            let drawnCardIndex = Math.floor(Math.random() * this.deck.length);

            auxDeck.push(this.deck[drawnCardIndex])

            this.deck.splice(drawnCardIndex, 1);
        }

        this.deck = auxDeck;
    },

    setCard: function (id) {

        let card = this.deck.filter(card => card.id == id)[0];

        if (card.flipped || this.lockedGame) {
            return false;
        }

        if (!this.card1) {
            this.card1 = card;
            this.card1.flipped = true;
            return true;
        } else {
            this.card2 = card;
            this.card2.flipped = true;
            this.lockedGame = true;
            return true;
        }

    },

    isMatch: function () {
        if (!this.card1 || !this.card2) {
            return false;
        }

        return this.card1.icon == this.card2.icon;
    },

    unflipAuxCards: function () {
        this.card1.flipped = false;
        this.card2.flipped = false;
        this.clearAuxCards();
    },

    isGameOver: function () {
        return this.deck.filter(card => !card.flipped) == 0;
    },
 
    clearAuxCards: function () {
        this.card1 = null;
        this.card2 = null;
        this.lockedGame = false;
    }
}