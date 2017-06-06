var generateBoard = function(){
    var startArray = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    var index = Math.floor(Math.random() * 16)
    startArray[index] = this.randomNumber()
    var index2 = Math.floor(Math.random() * 16)
    startArray[index2] = this.randomNumber()
    this.board = startArray
  }

var parseBoard = function(board) {
  var i = 0
  var new_arr = []
  while (i < board.length - 1) {
    this.board.push(board.slice(0,4))
    i++
  }
}


var Game = function(board) {
  this.board = []
  this.randomNumber = function() { return _.sample([2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,4]) }
  this.generateBoard = generateBoard
  this.parseBoard = parseBoard
  this.toString = function(board) { return this.board.join("") }

  if (board === undefined) {
    this.generateBoard()
  } else {
    this.parseBoard(board)
  }
}

//split board into 4 horizontal arrays

Game.prototype.horizontalState = function() {
  var placeholder = []

  placeholder.push(this.board.slice(0,4))
  placeholder.push(this.board.slice(4,8))
  placeholder.push(this.board.slice(8,12))
  placeholder.push(this.board.slice(12,16))
  console.log(placeholder)
  return placeholder
}

Game.prototype.verticalState = function() {
  var self = this;
  var placeholder = []
  var row1 = []
  var row2 = []
  var row3 = []
  var row4 = []
  this.horizontalState().forEach(function(row){
     row1.push(row[0])
     row2.push(row[1])
     row3.push(row[2])
     row4.push(row[3])
  })
  placeholder.push(row1)
  placeholder.push(row2)
  placeholder.push(row3)
  placeholder.push(row4)

  console.log(row1)
  console.log(row2)
  console.log(row3)
  console.log(row4)
  console.log(placeholder)
  return placeholder
}

Game.prototype.move = function() {
  var gameState = []
  var self = this;
  Mousetrap.bind('up', function() {
    //verticalState
    // run moveboard
  return "up"
})
  Mousetrap.bind('down', function() {
  var moveDown = []
    if (gameState.length === 4) {
        self.verticalState(gameState).forEach(function(row){
        moveDown.push(self.collapse(row))
        console.log(moveDown)
  })
      } else {self.verticalState(self.board).forEach(function(row){
     moveDown.push(self.collapse(row))
     console.log(moveDown)

  })}

  gameState = moveDown
  self.board = gameState
  gameState.forEach(function(row) {
   console.log(row)
  } )
  console.log(gameState)
})
  Mousetrap.bind('left', function() {
   var moveLeft = []
    if (gameState.length === 4) {
        self.horizontalState(gameState).forEach(function(row){
        moveLeft.push(self.collapse(row))
        console.log(moveLeft)
  })
      } else {self.horizontalState(self.board).forEach(function(row){
     moveLeft.push(self.collapse(row))
     console.log(moveLeft)
  })}

  gameState = moveLeft
  self.board = gameState
  gameState.forEach(function(row) {
   console.log(row)
  } )
  console.log(gameState)
})
  Mousetrap.bind('right', function() {
    var moveRight = []
    if (gameState.length === 4) {
        self.horizontalState(gameState).forEach(function(row){
        moveRight.push(self.collapse(row).reverse())
  })
      } else {self.horizontalState(self.board).forEach(function(row){
        moveRight.push(self.collapse(row).reverse())
  })}

  gameState = moveRight
  self.board = gameState
  gameState.forEach(function(row) {
   console.log(row)
  } )
  console.log(gameState)
})

}

Game.prototype.collapse = function(row){
  row = _.reject(row, function(number){
    return number === 0
  })
  var new_row = []
  for(var i = 0; i < row.length; i++){
    if(row[i] === row[i+1] && row[i+1] !== 0) {
      new_row.push(row[i] + row[i+1]);
      row[i+1] = 0
    } else if(row[i] !== 0) {
      new_row.push(row[i])
    }
  }
  while(new_row.length < 4){
    new_row.push(0)
  }
  return new_row;
}

// default collapse right:

g = new Game();
g.generateBoard();
g.toString();
g.move();



// array = [8,2,0,4]
// g.collapse(array);
// // expect [0,8,2,4]
// // just a shift.

// array = [0,0,2,2]
// //expect [0,0,0,4]
// //single collapse.

// array = [0,2,2,4]
// //expect [0,0,4,4]
// //just a single collapse with a matching number.

// array = [2,4,8,2]
// //expect [2,4,8,2]
// //no collapses or matching numbers.

// array = [0,0,0,0]
// //expect [0,0,0,0]
// //no shifts or collapses as there are no numbers.





