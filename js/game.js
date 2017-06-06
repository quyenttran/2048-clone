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

function transpose(board) {
  var newBoard = ""
    for(var i = 0; i < 4; i++) {
      newBoard += board[i]
      newBoard += board[i+4]
      newBoard += board[i+8]
      newBoard += board[i+12]
    }
  return newBoard;
}

function Game(board = generateBoard()) {
  this.board = board;
  this.transposedBoard = transpose(board);
}

Game.prototype.toString = function() {
  newString = ""
  for (var i = 0; i < this.board.length; i += 4) {
    newString += (this.board.substring(i,i+4) + "\n")
  }
  return newString;
}

Game.prototype.getRow = function(rowNumber) {
  var maxPosition = (rowNumber * 4) - 1
  var rowString = ""
  for (var i = maxPosition; i > maxPosition-4; i--) {
    rowString += this.board[i]
  }
  var array = rowString.split("").reverse();
  for (var j=0; j < array.length; j++) {
    array[j] = parseInt(array[j]);
  }
  return array;
}

Game.prototype.getColumn = function(colNumber) {
  var maxPosition = (colNumber * 4) - 1
  var colString = ""
  for (var i = maxPosition; i > maxPosition-4; i--) {
    colString += this.transposedBoard[i]
  }
  var array = colString.split("").reverse();
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
  var newBoardString = ""
  for (var i = 1; i <= 4; i++) {
    newBoardString += moveUp(this.getColumn(i)).join("")
  }
  return newBoardString;
}

Game.prototype.allDown = function() {
  var newBoardString = ""
  for (var i = 1; i <= 4; i++) {
    newBoardString += moveDown(this.getColumn(i)).join("")
  }
  return newBoardString;
}

Game.prototype.allLeft = function() {
  var newBoardString = ""
  for (var i = 1; i <= 4; i++) {
    newBoardString += moveLeft(this.getRow(i)).join("")
  }
  return newBoardString;
}

Game.prototype.allRight = function() {
  var newBoardString = ""
  for (var i = 1; i <= 4; i++) {
    newBoardString += moveRight(this.getRow(i)).join("")
  }
  return newBoardString;
}

Game.prototype.move = function(direction) {
  if (direction === 'up') {
    this.allUp();
  } else if (direction === 'down') {
    this.allDown();
  } else if (direction === 'left') {
    this.allLeft();
  } else {
    this.allRight();
  }
}

Game.prototype.determineNumber = function() {
  for (var i = 1; i <= 11; i++) {
    if (this.board.includes(Math.pow(2,i).toString())) {
      return Math.pow(2,i)
    }
  }
}

function rand(myArray) {
  return myArray[Math.floor(Math.random() * myArray.length)];
}

function randomIndex(string) {
  var indices = [];
  for(var i=0; i<string.length;i++) {
    if (string[i] === "0") indices.push(i);
    }
  return rand(indices);
}

Game.prototype.randomAdd = function() {
  var position = randomIndex(this.board);
  this.board = this.board.substr(0, position) + this.determineNumber() + this.board.substr(position + 1)
  return this.board;
}


