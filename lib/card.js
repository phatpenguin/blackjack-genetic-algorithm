var R = require('ramda');

const _getSuits = R.always(['hearts', 'clubs', 'spades', 'diamonds']);

const _getRanks = R.always([
    {name: 'A', value: [1, 11]},
    {name: '2', value: 2},
    {name: '3', value: 3},
    {name: '4', value: 4},
    {name: '5', value: 5},
    {name: '6', value: 6},
    {name: '7', value: 7},
    {name: '8', value: 8},
    {name: '9', value: 9},
    {name: '10', value: 10},
    {name: 'J', value: 10},
    {name: 'Q', value: 10},
    {name: 'K', value: 10}
]);

function _getCard(rank, suit) {
    R.assoc('suit', suit, rank);
}

module.exports = {
    getSuits: _getSuits,
    getRanks: _getRanks,
    getCard: _getCard
};