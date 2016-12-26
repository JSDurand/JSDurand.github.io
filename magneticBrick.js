function magBrick (x, y, hsize, vsize, coe, charge, range) {
  var newBrick = brick(x, y, hsize, vsize, coe);
  newBrick.charge = charge || 0;
  newBrick.charged = charge !== 0;
  newBrick.magnetRange = range || 0;
  newBrick.source = mygame.constants.magnet;
  newBrick.representation = function () {
    fill(255,0,64);
    rect(this.x, this.y, this.width, this.height);
  }

  return newBrick;
}
