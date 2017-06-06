Mousetrap.bind('up', function() {
  newGame.move("up");
})

function Game(tiles) {
  this.board = tiles || makeBoard();
}

Game.prototype.toString = function() {
  var boardString = "\n";
  for (var i = 0; i < 13; i += 4) {
    boardString += this.board.slice(i, i + 4) + '\n';
  }
  return boardString;
}

Game.prototype.move = function(direction) {
  var originalBoard = this.board;
  switch(direction) {
    case "up":
      this.moveUp(this.board);
      break;
    case "right":
      this.moveRight(this.board);
      break;
    case "down":
      this.moveDown(this.board);
      break;
    case "left":
      this.moveLeft(this.board);
      break;
  }
  if (this.board !== originalBoard)
    this.spawnBlock();

  console.log(direction + this.toString());
}

Game.prototype.moveRight = function(board) {
  var rows = makeRows(board);
  var newBoard = [];
  for (var i = 0; i < 4; i++) {
    newBoard.push(collapseAndAdd(rows[i]));
  }

  this.board = [].concat.apply([], newBoard);
}

Game.prototype.moveLeft = function(board) {
  var rows = makeRows(board);
  var newBoard = [];
  for (var i = 0; i < 4; i++) {
    var reversedRow = (rows[i].reverse())
    newBoard.push(collapseAndAdd(reversedRow));
    newBoard[i].reverse();
  }

  this.board = [].concat.apply([], newBoard);
}

Game.prototype.moveDown = function(board) {
  var cols = makeCols(board);
  var newBoard = [];
  var newerBoard = [];
  console.log("cols are " + cols)
  for (var i = 0; i < 4; i++) {
    newBoard.push(collapseAndAdd(cols[i]));
  }
  newBoard = [].concat.apply([], newBoard);
  for(var k = 0; k < newBoard.length - 1; k++){
    newerBoard.push(newBoard[(k*4)%15])
  }
  newerBoard.push(newBoard[15])
  this.board = [].concat.apply([], newerBoard);
}

Game.prototype.moveUp = function(board) {
  var cols = makeCols(board);
  var newBoard = [];
  var newerBoard = [];
  console.log("cols are " + cols)
  for (var i = 0; i < 4; i++) {
    var reversedCol = (cols[i].reverse())
    newBoard.push(collapseAndAdd(cols[i]));
    newBoard[i].reverse();
  }
  newBoard = [].concat.apply([], newBoard);
  for(var k = 0; k < newBoard.length - 1; k++){
    newerBoard.push(newBoard[(k*4)%15])
  }
  newerBoard.push(newBoard[15])
  this.board = [].concat.apply([], newerBoard);
}



Game.prototype.spawnBlock = function() {
  var isZero = false;
  while (!isZero) {
    var index = Math.floor ( Math.random() * this.board.length )
    var element = this.board[index]
    if (element === 0) {
      this.board[index] = 2;
      isZero = true;
    }
  }
}

var makeRows = function(board) {
  var rows = []
  for (var i = 0; i < 13; i += 4) {
    rows.push(board.slice(i, i + 4))
  }
  return rows;
}

var makeCols = function(board) {
  var cols = []
  for (var i = 0; i < 4; i++) {
    var newArray = []
    newArray.push(board[i])
    newArray.push(board[i + 4])
    newArray.push(board[i + 8])
    newArray.push(board[i + 12])
    cols.push(newArray)
  }
  return cols;
}


var collapseAndAdd = function(row) {
  var newRow = collapse(row);
  newRow = addSame(newRow);
  newRow = collapse(newRow);

  return newRow;
}

var collapse = function(row) {
  for(var i = 3; i >= 0; i--) {
    for(var j = i - 1; j >= 0; j--) {
      if (row[i] === 0) {
        row[i] = row[j];
        row[j] = 0;
      }
    }
  }
  return row;
}

var addSame = function(row) {
  for(var i = 3; i >= 0; i--) {
    if (row[i] == row[i - 1]) {
      row[i] = row[i] * 2;
      row[i - 1] = 0;
    }
  }
  return row;
}

var makeBoard = function() {
  var board = [];
  var possible = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2]

  for (var i = 0; i < 16; i++)
    board.push((possible.splice(Math.floor(Math.random() * possible.length), 1))[0])

  return board
}

newGame = new Game();
newGame.board = makeBoard();
newGame.move("right")
newGame.move("right")
newGame.move("right")
newGame.move("left")
newGame.move("left")
newGame.move("left")
newGame.move("left")
console.log("first down")
newGame.move("down")
newGame.move("down")
newGame.move("down")
console.log("first up")
newGame.move("up")
newGame.move("up")
newGame.move("up")
newGame.toString();



console.log(collapseAndAdd([4, 4, 4, 2]))
