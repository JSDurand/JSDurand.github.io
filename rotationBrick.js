// make the bricks rotate!

function rotationBrick (x, y, hsize, vsize, coe) {
  var bri = brick(x, y, hsize, vsize, coe);
  bri.angle = 0;

  bri.updatePos = function () {
    this.angle += 1;
 }

  bri.representation = function () {
    var midx = this.midX();
    var midy = this.midY();
    translate(midx, midy);
    rotate(this.angle);
    fill(0,255,0);
    rect(-1*this.halfWidth, -1*this.halfHeight, this.width, this.height);
    fill(255,0,0);
    textSize(this.height*2/3);
    var textWidth = mygame.can.canvas.getContext('2d').measureText(this.life).width;
    text(this.life, -textWidth/2, this.height/4);
    rotate(-1*this.angle);
    translate(-1*midx, -1*midy);
  }


  return bri;
}
