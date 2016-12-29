function bomb(x, y, radius) {
  var newBomb = brick(x, y, mygame.constants.defaultWidth, mygame.constants.defaultHeight);

  newBomb.radius = radius || 30;
  newBomb.representation = function() {
    fill(228,54,158);
    rect(this.x, this.y, this.width, this.height);
  };
  newBomb.effect    = 'BOMB';
  newBomb.invisible = true;
  newBomb.eject     = function() {
    var thisBomb = this;
    this.charge = 20000;
    this.magnetRange = 100;
    this.charged = true;
    this.eject = function () {};
    setTimeout(function() {thisBomb.invisible = false;}, 1000);
    for (var i = 0; i < 30; i++) {
      var bullet = ball(this.midX() + newBomb.radius * cos(i*12), this.midY() + newBomb.radius*sin(i*12), 15, 0, 0);
      bullet.vx      = 0;
      bullet.vy      = 0;
      bullet.noMinus = true; // Don't subtract score
      bullet.eaten   = false;

      bullet.representation = function() {
        fill('#075ef4');
        ellipse(this.x, this.y, this.radius, this.radius);
      }

      mygame.envs.balls.push(bullet);
    }
  };

  return newBomb;
}
