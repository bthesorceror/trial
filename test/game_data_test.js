var test     = require('tape');
var GameData = require('../lib/game_data');

test('GameData', function(t) {
  var fixture = require('./fixtures/response_1');
  var data    = new GameData(fixture);

  t.test('#get', function(t) {

    t.test('returns correct tile', function(t) {
      t.plan(1);
      t.equal(data.get({y: 6, x: 5}), '@1', 'equal correct tile');
    });

    t.test('returns correct tile', function(t) {
      t.plan(1);
      t.equal(data.get({y: 7, x: 14}), '$-', 'equal correct tile');
    });
  });

  t.test('#getMines', function(t) {

    t.test('returns list of mines', function(t) {
      t.plan(1);

      var expected = [
        {point: { y: 7,  x: 3 },  tile: '$4'},
        {point: { y: 10, x: 3 },  tile: '$4'},
        {point: { y: 7,  x: 8 },  tile: '$4'},
        {point: { y: 10, x: 8 },  tile: '$4'},
        {point: { y: 7,  x: 9 },  tile: '$4'},
        {point: { y: 10, x: 9 },  tile: '$4'},
        {point: { y: 7,  x: 14 }, tile: '$-'},
        {point: { y: 10, x: 14 }, tile: '$-'}
      ];

      t.deepEqual(data.getMines(), expected, 'equal all mines');
    });
  });

  t.test('#getTakeableMines', function(t) {

    t.test('returns list of takeable mines', function(t) {
      t.plan(1);

      var expected = [
        {point: { y: 7,  x: 14 }, tile: '$-'},
        {point: { y: 10, x: 14 }, tile: '$-'}
      ];

      t.deepEqual(data.getTakeableMines(), expected, 'equal takeable mines');
    });
  });
});
