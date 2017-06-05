describe("256 Game", function() {
  var game;
  var row1;
  var row2;
  var row3;
  var row4;

  beforeEach(function() {
    game = new Game();
    row1 = ["2", "0", "4", "8"];
    row2 = ["0", "0", "2", "2"];
    row3 = ["4", "8", "8", "0"];
    row4 = ["0", "2", "2", "2"];
  });

  it("should move right and not add", function() {
    game.move(row1);
    expect(game.row1).toEqual(["0", "2", "4", "8"]);
  });

  it("should move right and add last 2 digits", function() {
    game.move(row2);
    expect(game.row2).toEqual(["0", "0", "0", "4"]);
  });

  it("should move right and add middle 2 digits", function() {
    game.move(row1);
    expect(game.row1).toEqual(["0", "0", "4", "16"]);
  });

  it("should move right, add 2 first digits, not third, ", function() {
    game.move(row1);
    expect(game.row1).toEqual(["0", "0", "2", "4"]);
  });
  
})
