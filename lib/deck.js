var R = require('ramda');
var chance = require('chance');

var card = require('./card');

function _getDeck(ranks, suits) {
    return R.map(rank => R.map(suit => card.getCard(rank, suit), suits), ranks)
}

function _shuffleDeck(deck) {
    return chance.shuffle(deck);
}

module.exports = {
    deck: _getDeck(card.getRanks(), card.getSuits()),
    shuffle: _shuffleDeck
};