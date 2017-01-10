function unbrick (x, y, hsize, vsize, coe, charge, range, speed) {
  var sp = speed || 0;
  var newBrick = magBrick(x, y, hsize, vsize, 0.9, charge, range);
  newBrick.source = mygame.constants.unbreakable;
  // newBrick.vx = 1;
  // newBrick.vy = 1;

  newBrick.representation = function () {
    if (this.charge < 0) {
      fill(142, 180, 235);
    } else {
      fill(0,157,255);
    }
    rect(this.x, this.y, this.width, this.height);
  }

  return newBrick;

}
