var config = require('../../test-config');
var card = require('../../lib/card');

var utils = require('../../utils/csutil');
var _ = utils._;

exports.getNewCard = function (test) {
    test.expect(8);

    test.equal(card.getNewCard(), undefined);
    test.equal(card.getNewCard('', config.testSuit), undefined);
    test.equal(card.getNewCard(config.testRank, ''), undefined);
    test.equal(card.getNewCard('', ''), undefined);

    test.ok(card.getNewCard(config.testRank, config.testSuit).has('suit'));
    test.ok(card.getNewCard(config.testRank, config.testSuit).has('rank'));

    test.notEqual(card.getNewCard(config.testRank, config.testSuit), card.getNewCard(config.testRank, config.testSuit));
    test.deepEqual(card.getNewCard(config.testRank, config.testSuit), card.getNewCard(config.testRank, config.testSuit));

    test.done();
};

exports.getSuits = function (test) {
    test.expect(6);

    test.ok(_.i.List.isList(card.getSuits()));
    test.equal(card.getSuits().size, 4);

    test.ok(card.getSuits().contains('hearts'));
    test.ok(card.getSuits().contains('clubs'));
    test.ok(card.getSuits().contains('spades'));
    test.ok(card.getSuits().contains('diamonds'));

    test.done();
};

exports.isValidSuit = function(test) {
    test.expect(1);

    test.ok(card.getSuits().every(card.isValidSuit));

    test.done();
};

exports.getRanks = function(test) {
    test.expect(15);

    test.ok(_.i.List.isList(card.getRanks()));
    test.equal(card.getRanks().size, 13);

    test.ok(card.getRanks().contains('a'));
    test.ok(card.getRanks().contains('2'));
    test.ok(card.getRanks().contains('3'));
    test.ok(card.getRanks().contains('4'));
    test.ok(card.getRanks().contains('5'));
    test.ok(card.getRanks().contains('6'));
    test.ok(card.getRanks().contains('7'));
    test.ok(card.getRanks().contains('8'));
    test.ok(card.getRanks().contains('9'));
    test.ok(card.getRanks().contains('10'));
    test.ok(card.getRanks().contains('j'));
    test.ok(card.getRanks().contains('q'));
    test.ok(card.getRanks().contains('k'));

    test.done();
};

exports.isValidRank = function(test) {
    test.expect(1);

    test.ok(card.getRanks().every(card.isValidRank));

    test.done();
};

exports.isValidCard = function(test) {
    test.expect(1);

    test.ok(card.getSuits().map(
        function(suit) {
            return card.getRanks().map(
                function(rank){
                    return card.getNewCard(rank, suit);
                }
            )
        }
    ).flatten(true).every(card.isValidCard));

    test.done();
};
