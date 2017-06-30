var Game = function() {

  this.board = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  this.rows = this.generateRows()
  this.columns = this.generateColumns()
}

Game.prototype.generateRows = function() {
  var arrays = [], size = 4;
  arrays.push(this.board.slice(0,4))
  arrays.push(this.board.slice(4,8))
  arrays.push(this.board.slice(8,12))
  arrays.push(this.board.slice(12,16))

  console.log(arrays)
  return arrays
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
  return columns
}

Game.prototype.toString = function() {
  return this.rows.join('\n')
}

Game.prototype.move = function(direction) {
  if (direction === 'left') { this.moveLeft() }
  else if (direction === 'right') { this.moveRight() }
  else if (direction === 'up') { this.moveUp() }
  else if (direction === 'down') { this.moveDown() }
}

Game.prototype.moveLeft = function() {
  for(var i = 0; i < this.rows.length; i++){
    this.rows[i] = this.collapse(this.rows[i].reverse()).reverse()
  }
  this.regenerateBoardFromRows(this.rows)
}

Game.prototype.moveRight = function() {
  for(var i = 0; i < this.rows.length; i++){
    this.rows[i] = this.collapse(this.rows[i])
  }
  this.regenerateBoardFromRows(this.rows)
}

Game.prototype.moveUp = function() {
  for(var i = 0; i < this.columns.length; i++){
    this.columns[i] = this.collapse(this.columns[i].reverse()).reverse()
  }
  this.regenerateBoardFromColumns(this.columns)
}

Game.prototype.moveDown = function() {
  for(var i = 0; i < this.columns.length; i++){
    this.columns[i] = this.collapse(this.columns[i])
  }
this.regenerateBoardFromColumns(this.columns)
}

Game.prototype.regenerateBoardFromRows = function(rows) {
  this.board = _.flatten(this.rows)
  this.assignValue()
  this.rows = this.generateRows()
  this.columns = this.generateColumns()
  this.visualizeBoard()
}

Game.prototype.regenerateBoardFromColumns = function(columns) {
  var newRows = []
  for (var i = 0; i < 4; i++) {
    var row = []
    columns.forEach(function(column){
      row.push(column[i])
    })
    newRows.push(row)
  }
  this.board = _.flatten(newRows)
  this.assignValue()
  this.rows = this.generateRows()
  this.columns = this.generateColumns()
  this.visualizeBoard()
}

Game.prototype.assignValue = function() {
  var randomNumberArray = []
  this.board.forEach(function(value, index) {
    if(value === 0){
      randomNumberArray.push(index)
    }
  })
  this.board[(_.sample(randomNumberArray))] = this.randomNumber()
}

Game.prototype.randomNumber = function(){
  return _.sample([2,2,2,2,2,2,2,2,2,2,4])
}

Game.prototype.collapse = function(row) {
  var zeroLessRow = _.reject(row, function(num){ return num === 0 })
  var finalRow = [];
  for(var i = 0; i < zeroLessRow.length; i++){
    if(zeroLessRow[i] === zeroLessRow[i+1]){
      zeroLessRow[i+1] = zeroLessRow[i+1] + zeroLessRow[i+1]
      finalRow.push(zeroLessRow[i+1])
      zeroLessRow[i] = 0
      i++
      }
      else if(zeroLessRow[i] != 0) {
        finalRow.push(zeroLessRow[i])
      }
    }
  while(finalRow.length < row.length) {
    finalRow.unshift(0)
  }
  return finalRow
}

Game.prototype.visualizeBoard = function() {
  $board = $('.board')
  this.board.forEach(function(cell, index) {
    cellClass = 'div.cell' + index
    $(cellClass).html(cell)
  })
}
