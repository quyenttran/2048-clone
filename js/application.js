$(document).ready(function() {
  var updateColors = function() {
    var allCells = document.getElementsByClassName("cell")
    console.log(allCells)
    console.log(allCells.length)
    for (var i = 0; i < allCells.length; i++) {
    var node = allCells[i];
    var currentText = node.childNodes[0].nodeValue;
    if (currentText === 0) {
      node.style.backgroundColor = "blue";
    }
  }
}
});
