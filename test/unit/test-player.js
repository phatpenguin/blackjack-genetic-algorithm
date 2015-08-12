var config = require('../../test-config');
var player = require('../../lib/player');

var utils = require('../../utils/csutil');
var _ = utils._;

exports.newPlayerWithNoStrategyIsUndefined = function (test) {
    test.expect(1);

    test.equal(player.getNewPlayer(), undefined);

    test.done();
};

exports.newPlayerWithSameStrategyIsNotSameObject = function(test) {
    test.expect(1);

    test.notEqual(player.getNewPlayer(config.testFunction), player.getNewPlayer(config.testFunction)); //is not the same object

    test.done();
}

exports.newPlayer = function(test) {
    test.expect(1);

    test.deepEqual(player.getNewPlayer(config.testFunction), player.getNewPlayer(config.testFunction));

    test.done();
}

//exports.x = function(test) {
//
//
//    test.ok(player.getNewPlayer(config.testFunction).has('hand'));
//    test.ok(player.getNewPlayer(config.testFunction).has('strategy'));
//
//    test.ok(_.i.OrderedMap.isOrderedMap(player.getNewPlayer(config.testFunction).get('hand')));
//    test.ok(_.isFunction(player.getNewPlayer(config.testFunction).get('strategy')));
//
//    test.notDeepEqual(player.getNewPlayer(function (x) { return x; }).get('strategy'), player.getNewPlayer(function (x) { return x; }).get('strategy')); //2 different players with the same strategy (not the same function) are similar, not equal
//    test.equal(player.getNewPlayer(function (x) { return x; }).get('strategy')(2), player.getNewPlayer(function (x) { return x; }).get('strategy')(2)); //anonymous strategy functions return same values when similar
//
//    test.done();
//}