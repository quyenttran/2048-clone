$(document).ready(function() {
  var game = new Game
  
  Mousetrap.bind('left', function(){
    game.moveLeft();
  })
  
  Mousetrap.bind('right', function(){
    game.moveRight();
  })
  
  Mousetrap.bind('up', function(){
    game.moveUp();
  })
  
  Mousetrap.bind('down', function(){
    game.moveDown();
  })
});
