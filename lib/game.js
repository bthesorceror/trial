var util         = require('util');
var EventEmitter = require('events').EventEmitter;
var request      = require('./request');

module.exports = Game;

util.inherits(Game, EventEmitter);

function Game(apiKey, bot, options) {
  options = options || {};

  EventEmitter.call(this);
  this.apiKey   = apiKey;
  this.bot      = bot;
  this.training = options.training;
}

Game.prototype.startUrl = function() {
  if (this.training) {
    return 'http://vindinium.org/api/training';
  }

  return 'http://vindinium.org/api/arena';
}

Game.prototype.handle = function(json) {
  if (json.game.finished) {
    this.emit('progress', 1.0);
    this.emit('finished');
  } else {
    var percent = json.game.turn / json.game.maxTurns;
    this.emit('progress', percent);
    this.play(json);
  }
}

Game.prototype.request = function(url, params, cb) {
  request(url, params, function(err, json) {
    if (err) {
      return this.emit('error', 'Game failed to complete.');
    }

    cb(json);
  }.bind(this));
}

Game.prototype.play = function(json) {
  var url = json.playUrl;
  var move = this.bot(10, json.game);

  this.request(url, { key: this.apiKey, dir: move }, function(json) {
    this.handle(json);
  }.bind(this));
}

Game.prototype.start = function() {
  this.request(this.startUrl(), {key: this.apiKey}, function(json) {
    console.log(json.viewUrl);
    this.emit('started');
    this.handle(json);
  }.bind(this));
}
