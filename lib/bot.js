function getRandomValue(array) {
  var index = Math.floor(Math.random() * (array.length - 1));
  return array[index];
}

module.exports = function(heroId, game) {
  var value = getRandomValue(['Stay', 'North', 'South', 'East', 'West']);
  return value;
}

