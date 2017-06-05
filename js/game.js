var Game = function(board) {

   if (board === undefined) {
      this.randomNumber = function() {
    return _.sample([2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2])
  }

  this.generateBoard = function(){
    var startArray = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    var index = Math.floor(Math.random() * 15)
    startArray[index] = this.randomNumber()
    var index = Math.floor(Math.random() * 15)
    startArray[index] = this.randomNumber()
    this.board = startArray
  }
   }else {this.board = board}

  this.toString = function(board) {
     return this.board.split("")
  }
}

