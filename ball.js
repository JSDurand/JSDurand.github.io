function ball(x, y, r, vx, vy) {
  var newBall = Object.create(mygame.objects);
  newBall.init(0, 0, mygame.constants.elastic, mygame.constants.dynamic, mygame.constants.smallBall);
  newBall.setPos(x, y);

  newBall.xhitted      = false;
  newBall.yhitted      = false;
  newBall.playerHitted = false;
  newBall.has_effect   = false;
  newBall.no_collide   = false;

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
