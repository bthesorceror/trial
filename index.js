var bot  = require('./lib/bot');
var Game = require('./lib/game');

function play(apiKey, options) {
  var game = new Game(apiKey, bot, options);

  var progress;

  game.on('started', function() {
    progress = require('progress-bar').create(process.stdout);
    progress.format = '$bar; $percentage;% played.';
  });

  game.on('progress', function(percent) {
    progress.update(percent);
  });

  game.on('finished', function() {
    console.log('\nGame is now finished!');
  });

  game.on('error', function(err) {
    console.log('\n' + err);
  });

  game.start();
}

play(process.argv[2], { training: process.argv[3] });
