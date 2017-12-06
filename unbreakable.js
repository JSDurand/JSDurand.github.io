function unbrick (x, y, hsize, vsize, coe, charge, range, speed) {
  var sp = speed || 0;
  var newBrick       = magBrick(x, y, hsize, vsize, 0.9, charge, range);
  newBrick.source    = mygame.constants.unbreakable;
  newBrick.invisible = true;
  // newBrick.vx = 1;
  // newBrick.vy = 1;

  newBrick.representation = function () {
    if (this.charge < 0) {
      fill(142, 180, 235);
    } else {
      fill(0,157,255);
    }
    rect(this.x, this.y, this.width, this.height);
    fill(255,0,0);
    textSize(this.height*2/3);
    var life_text = (this.invisible) ? "\u221E" : this.life.toString();
    var textWidth = mygame.can.canvas.getContext('2d').measureText(life_text).width;
    text(life_text, this.midX() - textWidth/2, this.midY() + this.height/4);
  }

  return newBrick;

}
