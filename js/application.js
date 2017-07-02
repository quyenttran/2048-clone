$(document).ready(function() {
  var game = new Game();
  game.display();

  console.log(game.board);
  Mousetrap.bind('left', function() {
    game.move('left');
    game.randomAdd();
    console.log(game.board);
    game.display();
  })

  Mousetrap.bind('right', function() {
    game.move('right');
    game.randomAdd();
    console.log(game.board);
    game.display();
  })

  Mousetrap.bind('up', function() {
    game.move('up');
    game.randomAdd();
    console.log(game.board);
    game.display();
  })

  Mousetrap.bind('down', function() {
    game.move('down');
    game.randomAdd();
    console.log(game.board);
    game.display();
  })
});
