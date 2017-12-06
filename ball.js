function ball(x, y, r, vx, vy) {
  var newBall = Object.create(mygame.objects);
  newBall.init(0, 0, mygame.constants.elastic, mygame.constants.dynamic, mygame.constants.smallBall);
  newBall.setPos(x, y);

  newBall.xhitted      = false;
  newBall.yhitted      = false;
  newBall.playerHitted = false;
  newBall.has_effect   = false;
  newBall.no_collide   = false;
  newBall.laser        = false;

  newBall.noMinus   = false;
  newBall.invisible = false;
  newBall.radius    = r || 15;
  newBall.bigBall   = false;
  newBall.vx        = vx || 5;
  newBall.vy        = vy || -5;

  newBall.representation = function () {
    fill(255,0,0);
    ellipse(this.x, this.y, this.radius, this.radius);
  };

  newBall.offscreen = function () {
    if (this.y > height) {
      return true;
    } else {
      return false;
    }
  };

  newBall.boundary = function() {
    if (this.x < 0) {
      this.xhitted = true;
      this.x = 0;
    } else if (this.x > width) {
      this.xhitted = true;
      this.x = width;
    } else {
      this.xhitted = false;
    }

    if (this.y < 0) {
      this.yhitted = true;
      this.y = 0;
    } else if (mygame.nonEmptyHom(this, mygame.player)) {
      // this.y = mygame.player.upper() - this.radius/2;
      this.hitPlayerReaction();
    } else if (this.offscreen()){
      this.yhitted = true;
    } else {
      this.yhitted = false;
    }

    if (this.xhitted) {
      this.vx *= -mygame.envs.coefficientWal;
    }

    if (this.yhitted) {
      this.vy *= -1;
    }

    if (this.playerHitted) {
      this.vx += mygame.player.vx;
      this.vy += mygame.player.vy;
      if (mygame.player.charged) {
        var q = mygame.player.charge;
        var v = createVector(this.x - mygame.player.midX(), this.y - mygame.player.midY());
        var d = v.magSq();
        v.normalize();
        v.x  *= q/d;
        v.y  *= q/d;
        this.vx += v.x;
        this.vy += v.y;
        if (this.y > mygame.player.upper()) {
          this.vy = -1 * abs(this.vy);
        }
      } else {
        this.vy *= -1;
      }
      this.playerHitted = false;
    }
  }

  newBall.hitPlayerReaction = function () {
    if (typeof this.effect === 'undefined') {
      this.playerHitted = true; 
      // this.yhitted = true;
    } else {
      this.dealEffect();
    }
  }

  return newBall;
}

mygame.laser_ball = function (x, y, r, vx, vy) {
  var temp_ball        = ball(x, y, r, vx, vy);
  temp_ball.displayLaser   = false;
  temp_ball.displayLaserAt = x + vx;
  temp_ball.has_effect     = true; // this is a laser ball.
  temp_ball.dealEffect     = function () {
    var x               = this.x + this.vx;
    this.displayLaser   = true;
    this.displayLaserAt = x;
    setTimeoutWithClosure(stopLaserBall, temp_ball, 1500);
    for (var i = mygame.envs.bricks.length - 1; i >= 0; i--) {
      var bri = mygame.envs.bricks[i];
      if (abs(bri.midX() - x) < bri.halfWidth && !bri.invisible) {
        mygame.envs.bricks[i].life--;
        // mygame.envs.bricks.splice(i, 1);
      }
    }
  }
  temp_ball.updatePos = function () {
    if (this.vx > mygame.envs.maximum) {this.vx = mygame.envs.maximum;}
    else if (this.vx < -mygame.envs.maximum) {
      this.vx = -mygame.envs.maximum;
    }

    if (this.vy > mygame.envs.maximum) {this.vy = mygame.envs.maximum;}
    else if (this.vy < -mygame.envs.maximum) {
      this.vy = -mygame.envs.maximum;
    }

    this.x += this.vx;
    this.y += this.vy;

    if (this.target === 'basic') {}
    else if (this.target === 'dynamic') {
      this.vy += this.ay + mygame.envs.gravity;
    } else {}

    if (this.displayLaser) {
      var x = this.displayLaserAt;
      stroke(255,0,0);
      strokeWeight(5);
      line(x, 0, x, height);
      strokeWeight(1);
      noStroke();
    }
  }
  return temp_ball;
}

function stopLaserBall(b) {
  b.displayLaser = false;
}
