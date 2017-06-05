function shuffle(array) {
  var i = 0, j = 0, temp = null

  for (i=array.length-1; i> 0; i -= 1) {
    j = Math.floor(Math.random() * (i+1))
    temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array;
}

function generateBoard() {
  var string = "2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0"
  var array = string.split(",")
  return shuffle(array).join("")
}

function Game(board = generateBoard()) {
  this.board = board;
}

Game.prototype.toString = function() {
  this.substring(0,3)
}

Game.prototype.toString = function() {
  newString = ""
  for (var i = 0; i < this.board.length; i += 4) {
    newString += (this.board.substring(i,i+4) + "\n")
  }
  return newString;
}
