$(document).ready(function() {
  var game = new Game
  console.log(game.toString());
  Mousetrap.bind('left', function(){
    game.moveLeft();
    console.log(game.toString());
  })
  Mousetrap.bind('right', function(){
    game.moveRight();
    console.log(game.toString());
  })
  Mousetrap.bind('up', function(){
    game.moveUp();
    console.log(game.toString());
  })
  Mousetrap.bind('down', function(){
    game.moveDown();
    console.log(game.toString());
  })
});
