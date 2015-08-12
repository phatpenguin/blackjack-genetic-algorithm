var config = require('../../test-config');
var deck = require('../../lib/deck');
var card = require('../../lib/card');

var utils = require('../../utils/csutil');
var _ = utils._;

exports.getNewDeck = function (test) {
    test.expect(3);

    test.ok(deck.getNewDeck().size === 52);

    test.ok(card.getSuits().every(function(suit) { return (deck.getNewDeck().filter(function(card) { return (card.get('suit') === suit); }).size === card.getRanks().size) }));
    test.ok(card.getRanks().every(function(rank) { return (deck.getNewDeck().filter(function(card) { return (card.get('rank') === rank); }).size === card.getSuits().size) }));

    test.done();
}