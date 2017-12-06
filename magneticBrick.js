function magBrick (x, y, hsize, vsize, coe, charge, range) {
  var newBrick = brick(x, y, hsize, vsize, coe);
  newBrick.charge = charge || 0;
  newBrick.charged = charge !== 0;
  newBrick.magnetRange = range || 0;
  newBrick.source = mygame.constants.magnet;
  newBrick.representation = function () {
    fill(255,0,64);
    rect(this.x, this.y, this.width, this.height);
    fill(0);
    textSize(this.height*2/3);
    var life_text = (this.invisible) ? "\u221E" : this.life.toString();
    var textWidth = mygame.can.canvas.getContext('2d').measureText(life_text).width;
    text(life_text, this.midX() - textWidth/2, this.midY() + this.height/4);
  }

  return newBrick;
}
