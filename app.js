var R = require('ramda');
var util = require('util');
var deck = require('./lib/deck');

function _run() {
    console.log(util.inspect(deck));
    var d2 = deck.shuffle(deck.deck)
    console.log(util.inspect(d2));
}

module.exports = {
    run: _run
}