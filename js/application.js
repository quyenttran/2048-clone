$(document).ready(function() {
  var game = new Game();
  game.display();

  console.log(game.board);
  Mousetrap.bind('left', function() {
    game.board = game.move('left');
    game.board = game.randomAdd();
    console.log(game.board);
    game.display();
  })

  Mousetrap.bind('right', function() {
    game.board = game.move('right');
    game.board = game.randomAdd();
    console.log(game.board);
    game.display();
  })

  Mousetrap.bind('up', function() {
    game.board = game.move('up');
    game.board = game.randomAdd();
    console.log(game.board);
    game.display();
  })

  Mousetrap.bind('down', function() {
    game.board = game.move('down');
    game.board = game.randomAdd();
    console.log(game.board);
    game.display();
  })
});
