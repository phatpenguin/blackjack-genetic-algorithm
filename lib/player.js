var utils = require('../utils/csutil');
var _ = utils._;

//takes a function that determines when to hit, stand, etc
//returns a Map
function _getNewPlayer(strategy) {
    return (_.isFunction(strategy))
        ? _.i.Map([['hand', _.i.OrderedMap()], ['strategy', _.i.Record(strategy)], ['isDealer', false]])
        : undefined;
}

module.exports = {
    getNewPlayer: _getNewPlayer
};