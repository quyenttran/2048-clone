var Game = function() {
  this.board = '2000000000000000'
  this.rows = this.board.match(/.{1,4}/g)
  this.columns = generateColumns()
}

Game.prototype.generateColumns = function() {
  var columns = []
  for (var i = 0; i < 4; i++) {
    var column = []
    this.rows.forEach(function(row){
      column.push(row[i])
    })
    columns.push(column)
  }
}

Game.prototype.toString = function() {
  var newBoard = this.board.match(/.{1,4}/g)
  return newBoard.join('\n')
}

Game.prototype.move = function(direction) {
  if (direction === 'left') { this.moveLeft() }
  else if (direction === 'right') { this.moveRight() }
  else if (direction === 'up') { this.moveUp() }
  else if (direction === 'down') { this.moveDown() }
}

Game.prototype.moveLeft = function() {
  var newRows = [];
  this.rows.forEach(row) {
    var newRow = this.shiftNumbers(row)
    newRows.unshift(newRow)
  }
  this.board = newRows.join('')
}

Game.prototype.moveRight = function() {
  var newRows = [];
  this.rows.forEach(row) {
    var newRow = this.shiftNumbers(row.reverse())
    newRows.unshift(newRow)
  }
  this.board = newRows.join('')
}

Game.prototype.moveUp = function() {
  var newColumns = []
  this.columns.forEach(column) {
      var newColumn = this.shiftNumbers(column)
      newColumns.unshift(newColumn)
    }
  this.board = makeBoardFromColumns(newColumns).join('')
}

Game.prototype.moveDown = function() {
  var newColumns = []
  this.columns.forEach(column) {
      var newColumn = this.shiftNumbers(column.reverse())
      newColumns.unshift(newColumn)
    }
  this.board = makeBoardFromColumns(newColumns).join('')
}


Game.prototype.shiftNumbers = function(rowOrColumn) {
  var zeroes = []
  var newColumn = []
  rowOrColumn.forEach(value, index) {
    var gotAllZeroes = false
    if (value === "0" && gotAllZeroes === false) {
      zeroes.push(value)
    }
    else if (value === "0" && gotAllZeroes === true) {
      newColumn.unshift(value)
    }
    else {
      newColumn.unshift(value);
      gotAllZeroes = true;
    }
  }
  for (var i = 0; i < zeroes.length(); i++) {
    newColumn.unshift('0')
  }
  return newColumn
}

Game.prototype.makeBoardFromColumns = function(columns) {
  var rows = []
  for (var i = 0; i < 4; i++) {
    var row = []
    columns.forEach(function(column){
      row.push(column[i])
    })
    rows.push(row)
  }
}
