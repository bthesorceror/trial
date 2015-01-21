module.exports = GameData;

function indexToPoint(index, size) {
  var x = Math.floor(index / (size * 2));
  var y = (index % (size * 2)) / 2;
  return { x: x, y: y };
}

function GameData(json) {
  this.json = json;
}

GameData.prototype.get = function(point) {
  var board = this.board();
  var size = board.size * 2;
  var loc = (point.x * size) + (point.y * 2);
  return board.tiles[loc] + board.tiles[loc + 1];
}

GameData.prototype.getMines = function() {
  var board = this.board();
  var size  = board.size;
  var regex = /\$[\-1-4]/g

  var results = [];
  var match;

  while (match = regex.exec(board.tiles)) {
    results.push(match);
  }

  return results.map(function(result) {
    var point = indexToPoint(result.index, size);
    var tile  = this.get(point);
    return { point: point, tile: tile };
  }.bind(this));
}

GameData.prototype.getTakeableMines = function() {
  var mines = this.getMines();
  var hero  = this.hero();

  return mines.filter(function(mine) {
    return mine.tile != ('$' + hero.id);
  });
}

GameData.prototype.hero = function() {
  if (!this._hero) {
    this._hero = this.json.hero;
  }
  return this._hero;
}

GameData.prototype.board = function() {
  if (!this._board) {
    this._board = this.json.game.board;
  }
  return this._board;
}
