var _ = require('lodash');
var utils = require('./utils/csutil');

function Player(algorithm) {  //tuple - first = hand (list of cards), rest = algorithm
    return [
        [],
        algorithm //a function that determines when to hit, stand, etc
    ];
}

function Card(rank, suit) {
    return {
        rank: rank,
        suit: suit,
        values: _getRankValues(rank),
        visible: false
    }
}

function _getSuits(){
    return ['hearts', 'clubs', 'spades', 'diamonds'];
}

function _getRanks(){
    return ['a', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'j', 'q', 'k'];
}

function _getAllOfSuit(suit){
    return _.map(_getRanks(),
        function(rank) {
            return new Card(rank, suit);
        }
    )
}

function _shuffleDeck(deck, times) {
    return ((typeof times !== 'undefined') && typeof times === 'number' && times === 0)
        ? deck
        : _shuffleDeck(_.shuffle(deck), ((times && typeof times === 'number') ? times : 1) - 1);
}

function _getNewDeck(){
    return _.flatten(_.map(_getSuits(), _getAllOfSuit));
}

function _validRank(rank){
    return _.includes(_getRanks(), rank);
}

function _getRankValues(rank) {
    switch(rank) {
        case 'a':
            return [1, 11];
        case 'j':
        case 'q':
        case 'k':
            return [10];
        default:
            return [parseInt(rank)];
    }
}

function _getHandValues(hand) {

}

function _getVisibleHandValues(hand) {

}

function _addCardToHand(card, hand) { //returns a hand with the card added (face down if it is the first **visible=false**, face up otherwise **visible=true***)
    utils.log('***_addCardToHand*** hand: ' + utils.toString(hand));
    return (_.isArray(hand))
        ? _.flattenDeep([_.cloneDeep(hand), _.cloneDeep(card)])
        : [_.cloneDeep(card)];
}

function _dealOne(deck, player) { //returns a tuple - first = deck, rest = player
    return [_.rest(deck), [_addCardToHand(_.first(deck), _.cloneDeep(_.first(player))), _.last(player)]];
}

function _dealAll(deck, players){ //returns a tuple - first = deck, rest = list of players
    utils.log('***dealAll*** hand: ' + utils.toString(_.rest(_dealOne(deck, _.first(players)))));
    return (players.length === 1)
        ? _dealOne(deck, _.first(players))
        : [
            _.first(_dealAll(_.first(_dealOne(deck, _.first(players))), _.rest(players))),
            _.flatten([
                _.rest(_dealOne(deck, _.first(players))),
                _.rest(_dealAll(_.first(_dealOne(deck, _.first(players))), _.rest(players)))
            ])
        ]
}

function _dealStartingHand(deck, players){
    return _dealAll(_.first(_dealAll(deck, players)), _.last(_dealAll(deck, players)));
}

utils.log(_dealStartingHand(_shuffleDeck(_getNewDeck()), [new Player(), new Player(), new Player()]));