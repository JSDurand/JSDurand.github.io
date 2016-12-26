function myPlayer() {
  var player = Object.create(mygame.objects);
  player.init(width/6, 20);
  player.padding = height/10;
  player.jumpingDown = false;
  player.jumpingUp = false;
  player.jumpStopAt = height - player.height - player.padding;
  player.setPos(width/2 - player.halfWidth, height - player.padding - player.height);

  player.representation = function () {
    fill(255);
    rect(this.x, this.y, this.width, this.height);
  };

  player.updatePos = function () {
    this.x = mouseX - this.halfWidth;
    this.vx = this.x - this.oldx;
    this.oldx = this.x;

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

  player.life = mygame.envs.defaultLife;
  player.oldx = player.x;
  player.oldy = player.y;
  player.vx   = 0;
  player.vy   = 0;

  player.eject = function () {
    mygame.envs.balls.push(ball(this.midX(), this.upper() - this.height));
    var len = mygame.envs.balls.length;
    var bris = mygame.envs.bricks;
    var bri_len = bris.length;
    for (var i = 0; i < len - 1; i++) {
      mygame.envs.hittedArray[i].push(false);
    }
    mygame.envs.hittedArray[len - 1] = [];

    for (var i = 0; i < bri_len; i++) {
      bris[i].ballHits[len - 1] = false;
    }
  };

  return player;
}
