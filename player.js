function myPlayer() {
  var player = Object.create(mygame.objects);
  player.init(width/6, 20);
  player.padding = height/10;
  player.jumpingDown = false;
  player.jumpingUp = false;
  player.jumpStopAt = height - player.height - player.padding;
  // player.charged = true;
  // player.charge = -1000;
  // player.magnetRange = 100;
  player.setPos(width/2 - player.halfWidth, height - player.padding - player.height);

  player.representation = function () {
    fill(255);
    rect(this.x, this.y, this.width, this.height);
    if (this.show_direction) {
      strokeWeight(5);
      if (mygame.player.throwing) {
        stroke(200,200,0);
      } else {
        stroke(200,0,0);
      }
      line(this.x + this.width/2, this.y, this.x+ this.width/2 + 60*cos(this.direction), this.y - 60*sin(this.direction));
      this.choose_direction();
      strokeWeight(1);
      stroke(0);
    }
  };

  player.updatePos = function () {
    if (!mygame.envs.mobile) {
      mygame.envs.record.push("mouse " + mygame.envs.time.toString() + " " + mouseX.toString());
      this.x = mouseX - this.halfWidth;
      this.vx = this.x - this.oldx;
      this.oldx = this.x;
    } else {
      this.x += this.vx;
      this.x  = (this.x < 0) ? 0 : this.x;
      this.x  = (this.x > width*17/20) ? width*17/20 : this.x;
    }

    if (this.jumpingDown) {
      if (this.lower() < height) {
        this.y += this.vy;
      } else {
        this.jumpingDown = false;
      }
    }

    if (this.jumpingUp) {
      if (this.y < this.jumpStopAt) {
        this.jumpingUp = false;
        this.jumpingDown = false;
        this.vy = 0;
        this.y = this.jumpStopAt + 0;
      } else {
        this.y += this.vy;
      }
    }
  };

  player.life                   = mygame.envs.defaultLife;
  player.oldx                   = player.x;
  player.oldy                   = player.y;
  player.vx                     = 0;
  player.vy                     = 0;
  player.show_direction         = false;
  player.defaultDirection       = 30;
  player.direction              = 30;
  player.throwing               = false;
  player.laser_ability          = false;
  player.character              = mygame.character();
  player.character.skill.status = 'off';

  player.choose_direction = function () {
    this.show_direction = true;
    this.direction      = (this.direction <= 180 - this.defaultDirection) ? this.direction + 2 : this.defaultDirection;
  }

  player.eject = function (direction) {
    if (this.throwing) {
      var new_ball = mygame.thrower(this.midX(), this.upper() - this.height);
    } else if (this.laser_ability) {
      var new_ball = mygame.laser_ball(this.midX(), this.upper() - this.height);
    } else {
      var new_ball = ball(this.midX(), this.upper() - this.height);
    }
    new_ball.vx  = 5*cos(direction);
    new_ball.vy  = -5*sin(direction);
    mygame.envs.balls.push(new_ball);
    mygame.comb_hitted_information();
    this.life -= (this.throwing) ? 1 : 0;
    // mygame.comb_hitted_information();
  };

  return player;
}

mygame.comb_hitted_information = function () {
  // var len     = mygame.envs.balls.length;
  var bris    = mygame.envs.bricks;
  var bri_len = bris.length;
  // for (var i = 0; i < len - 1; i++) {
    // mygame.envs.hittedArray[i].push(false);
  // }
  // mygame.envs.hittedArray[len - 1] = [];

  for (var i = 0; i < bri_len; i++) {
    bris[i].ballHits.push(false);
  }

  var rot_bris    = mygame.envs.rotbricks;
  var rot_bri_len = rot_bris.length;
  // for (var i = 0; i < len - 1; i++) {
    // mygame.envs.hittedArray[i].push(false);
  // }
  // mygame.envs.hittedArray[len - 1] = [];

  for (var i = 0; i < rot_bri_len; i++) {
    rot_bris[i].ballHits.push(false);
  }
}
