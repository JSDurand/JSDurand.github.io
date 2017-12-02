function obstacles(x, y, hsize, vsize, coe) {
  var ob_brick = brick(x, y, hsize, vsize, coe);
  ob_brick.invisible = true;
  ob_brick.timing = 0;
  ob_brick.radius = 200;
  ob_brick.cx = x;
  ob_brick.cy = y;

  ob_brick.representation = function() {
    fill('#6215E8');
    rect(this.x, this.y, this.width, this.height);
    fill(255,0,0);
    textSize(this.height*2/3);
    var textWidth = mygame.can.canvas.getContext('2d').measureText(this.life).width;
    text(this.life, this.midX() - textWidth/2, this.midY() + this.height/4);
  }

  ob_brick.updatePos = function() {
    this.x = this.cx + this.radius * cos(this.timing*2);
    this.y = this.cy + this.radius * sin(this.timing*2);
    this.timing = (this.timing > 180) ? 0 : this.timing + 1;
  }

  ob_brick.square_route = function (length) {
    this.updatePos = function () {
      changex = 0;
      changey = 0;
      if (this.timing < 45) {
        changex = length;
      } else if (45 <= this.timing && this.timing < 90) {
        changey = length;
      } else if (90 <= this.timing && this.timing < 135) {
        changex = -length;
      } else if (135 <= this.timing && this.timing < 180) {
        changey = -length;
      }

      this.x += changex;
      this.y += changey;

      this.timing = (this.timing >= 180) ? 0 : this.timing + 1;

    }
  }

  return ob_brick;
}
