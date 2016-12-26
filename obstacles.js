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
  }

  ob_brick.updatePos = function() {
    this.x = this.cx + this.radius * cos(this.timing*2);
    this.y = this.cy + this.radius * sin(this.timing*2);
    this.timing = (this.timing > 180) ? 0 : this.timing + 1;
  }

  return ob_brick;
}
