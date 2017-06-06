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
  return shuffle(array)
}

function transpose(board) {
  var newBoard = ""
    for(var i = 0; i < 4; i++) {
      newBoard += board[i]
      newBoard += board[i+4]
      newBoard += board[i+8]
      newBoard += board[i+12]
    }
  return newBoard.split("");
}

function Game(board = generateBoard()) {
  this.board = board;
  this.transposedBoard = transpose(board);
}

Game.prototype.toString = function() {
  var newString = ""
  newString += this.board.slice(0,4).join("") + "\n"
  newString += this.board.slice(4,8).join("") + "\n"
  newString += this.board.slice(8,12).join("") + "\n"
  newString += this.board.slice(12,16).join("") + "\n"
  return newString
}


Game.prototype.getRow = function(rowNumber) {
  var maxPosition = (rowNumber * 4) - 1
  var rowString = []
  for (var i = maxPosition; i > maxPosition-4; i--) {
    rowString.push(this.board[i])
  }
  var array = rowString.reverse();
  for (var j=0; j < array.length; j++) {
    array[j] = parseInt(array[j]);
  }
  return array;
}

Game.prototype.getColumn = function(colNumber) {
  var maxPosition = (colNumber * 4) - 1
  var colString = []
  for (var i = maxPosition; i > maxPosition-4; i--) {
    colString.push(this.transposedBoard[i])
  }
  var array = colString.reverse();
  for (var j=0; j < array.length; j++) {
    array[j] = parseInt(array[j]);
  }
  return array;
}

// remove all zeros from array
function removeZeroes(row) {
  return row.filter(function(number) {
    return number !== 0
  })
}

// adds zeros to the front of array
function unshift(row) {
  while (row.length != 4) {
    row.unshift(0)
  }
  return row;
}

// functions to move direction
function moveRight(row) {
  row = removeZeroes(row)
  var lastIndex = row.length - 1
  for (var i = lastIndex; i >= 0; i--) {
    if (row[i] === row[i-1]) {
      row[i] = row[i] + row[i-1]
      row.splice(i-1, 1)
    }
  }
  return unshift(row);
}

function moveLeft(row) {
  row = row.reverse();
  row = moveRight(row);
  return row.reverse();
}

function moveDown(col) {
  return moveRight(col);
}

function moveUp(col) {
  return moveLeft(col);
}

Game.prototype.allUp = function() {
  var newBoardString = []
  for (var i = 1; i <= 4; i++) {
    newBoardString = newBoardString.concat(moveUp(this.getColumn(i)))
  }
  return newBoardString;
}

Game.prototype.allDown = function() {
  var newBoardString = []
  for (var i = 1; i <= 4; i++) {
    newBoardString = newBoardString.concat(moveDown(this.getColumn(i)))
  }
  return newBoardString;
}

Game.prototype.allLeft = function() {
  var newBoardString = []
  for (var i = 1; i <= 4; i++) {
    newBoardString = newBoardString.concat(moveLeft(this.getRow(i)))
  }
  return newBoardString;
}

Game.prototype.allRight = function() {
  var newBoardString = []
  for (var i = 1; i <= 4; i++) {
    newBoardString = newBoardString.concat(moveRight(this.getRow(i)))
  }
  return newBoardString;
}

Game.prototype.move = function(direction) {
  if (direction === 'up') {
    this.board = this.allUp();
  } else if (direction === 'down') {
    this.board = this.allDown();
  } else if (direction === 'left') {
    this.board = this.allLeft();
  } else {
    this.board = this.allRight();
  }
  return this.board;
}

Game.prototype.determineNumber = function() {
  for (var i = 1; i <= 11; i++) {
    if (this.board.includes(Math.pow(2,i).toString())) {
      return Math.pow(2,i).toString();
    }
  }
}

function rand(myArray) {
  return myArray[Math.floor(Math.random() * myArray.length)];
}

function randomIndex(array) {
  var indices = [];
  for(var i=0; i<array.length;i++) {
    if (array[i] === "0") {indices.push(i)};
    }
  return rand(indices);
}

Game.prototype.randomAdd = function() {
  var position = randomIndex(this.board);
  console.log(position)
  this.board[position] = this.determineNumber()
  return this.board;
}

Game.prototype.display = function() {
  this.board.forEach(function(number, index) {
    var indexString = index.toString();
    $(".board").find(".cell-" + indexString).html(number)
  })
}


