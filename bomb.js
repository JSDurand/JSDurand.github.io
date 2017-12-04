function bomb(x, y, radius) {
  var newBomb = brick(x, y, mygame.constants.defaultWidth, mygame.constants.defaultHeight);

  newBomb.radius = radius || 30;
  newBomb.representation = function() {
    fill(228,54,158);
    rect(this.x, this.y, this.width, this.height);
    fill(0);
    textSize(this.height*2/3);
    var textWidth = mygame.can.canvas.getContext('2d').measureText(this.life).width;
    text(this.life, this.midX() - textWidth/2, this.midY() + this.height/4);
  };
  newBomb.effect    = 'BOMB';
  newBomb.invisible = true;
  newBomb.eject     = function() {
    // var thisBomb = this;
    // this.charge = 20000;
    // this.magnetRange = 100;
    // this.charged = true;
    // this.eject = function () {};
    // this.representation = function () {};
    this.invisible = false;
    for (var i = 0; i < 30; i++) {
      var bullet = ball(this.midX() + newBomb.radius * cos(i*12), this.midY() + newBomb.radius*sin(i*12), 15, 0, 0);
      bullet.vx      = 20 * cos(i*12);
      bullet.vy      = 20 * sin(i*12);
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

mygame.thrower = function (x, y, radius) {
  var newBall        = ball(x, y, radius, 0, 0);
  newBall.protected  = false;
  newBall.generation = 1;
  newBall.representation = function () {
    fill(255,255,0);
    ellipse(this.x, this.y, this.radius, this.radius);
  }
  newBall.has_effect = true; // this is a bomb.
  newBall.dealEffect = function () {
    var thisBall = this;
    if (this.generation < 4 && !this.protected) {
      var old_generation = this.generation;
      this.generation = 4;
      this.eaten = true;
      // setTimeout(function () {thisBall.eaten = true;}, 2000);
      // var tempHole = hole(this.x, this.y, 10, 'white');
      // tempHole.representation = function () {return;};
      // setTimeout(function () {tempHole.death = true;}, 1000);
      // var newBrick = brick(this.x, this.y, 100, 100, 0.9);
      // newBrick.charge = 20000;
      // newBrick.magnetRange = 100;
      // newBrick.charged = true;
      // newBrick.representation = function () {return;};
      // newBrick.invisible = true;
      // mygame.envs.mysterious_holes.push(tempHole);
      // setTimeout(function () {newBrick.invisible = false;}, 1000);
      for (var i = 0; i < 30; i++) {
        var bullet = mygame.thrower(this.x + this.radius * cos(i*12), this.y + this.radius*sin(i*12), 15, 0, 0);
        bullet.generation = 4;
        bullet.protected  = true;
        bullet.vx         = 20 * cos(i*12);
        bullet.vy         = 20 * sin(i*12);
        bullet.noMinus    = true; // Don't subtract score
        bullet.eaten      = false;

        // bullet.representation = function() {
          // fill('#075ef4');
          // ellipse(this.x, this.y, this.radius, this.radius);
        // }
        setTimeout(function () {bullet.protected = false;}, 1500);

        mygame.envs.balls.push(bullet);
      }
    }
  };
  return newBall;
};
