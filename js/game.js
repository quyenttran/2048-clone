Mousetrap.bind('up', function() {
  newGame.move("up");
})

Mousetrap.bind('down', function() {
  newGame.move("down");
})

Mousetrap.bind('left', function() {
  newGame.move("left");
})

Mousetrap.bind('right', function() {
  newGame.move("right");
})

function Game(tiles) {
  this.board = tiles || makeBoard();
  this.noLeft = false;
  this.noRight = false;
  this.noUp = false;
  this.noDown = false;
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
      if (arrayEqual(this.board, originalBoard)) {
        this.noUp = true
      } else {
        this.noUp = false;
      }
      break;
    case "right":
      this.moveRight(this.board);
      if (arrayEqual(this.board, originalBoard)) {
        this.noRight = true
      } else {
        this.noRight = false;
      }
      break;
    case "down":
      if (arrayEqual(this.board, originalBoard)) {
        this.noDown = true
      } else {
        this.noDown = false;
      }
      this.moveDown(this.board);
      break;
    case "left":
      if (arrayEqual(this.board, originalBoard)) {
        this.noLeft = true
      } else {
        this.noLeft = false;
      }
      this.moveLeft(this.board);
      break;
  }
  if (this.noLeft && this.noRight && this.noUp && this.noDown )
    alert("You suck")

  if (!arrayEqual(this.board, originalBoard)) {
    this.spawnBlock();
    this.noUp = false;
    this.noDown = false;
    this.noRight = false;
    this.noLeft = false;
  }


  this.visualizeBoard()

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

var arrayEqual = function(arr1, arr2) {
    if(arr1.length !== arr2.length)
        return false;
    for(var i = arr1.length; i--;) {
        if(arr1[i] !== arr2[i])
            return false;
    }
    return true;
}

Game.prototype.visualizeBoard = function() {
  $board = $('.board')
  this.board.forEach(function(cell, index) {
    cellClass = 'div.cell' + index
    $(cellClass).html(cell)
  })
    updateColors();

}

  var updateColors = function() {
    var allCells = document.getElementsByClassName("cell")
    for (var i = 0; i < allCells.length; i++) {
      var $node = $(".cell" + i);
      var value = $node.text();
      console.log(value)
      if (value === "2") {
        $(".cell" + i).css("background-color", "#ff8656");
      } else if (value === "4") {
        $(".cell" + i).css("background-color", "#ffc956");
      } else if (value === "8") {
        $(".cell" + i).css("background-color", "#f3ff56");
      } else if (value === "16") {
        $(".cell" + i).css("background-color", "#9fff56");
      } else if (value === "32") {
        $(".cell" + i).css("background-color", "#56ff83");
      } else if (value === "64") {
        $(".cell" + i).css("background-color", "#56ffcc");
      } else if (value === "128") {
        $(".cell" + i).css("background-color", "#56d1ff");
      } else if (value === "256") {
        $(".cell" + i).css("background-color", "#5672ff");
      } else if (value === "512") {
        $(".cell" + i).css("background-color", "#b256ff");
      } else {
        $(".cell" + i).css("background-color", "black");
      }
  }
}


newGame = new Game();
newGame.board = makeBoard();
newGame.visualizeBoard();

