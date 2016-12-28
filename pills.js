function pill(x, y, effect) {
  var newPill = brick(x, y, mygame.constants.defaultWidth, mygame.constants.defaultHeight);
  newPill.effect = effect || 'None';
  newPill.radius = 30;

  newPill.representation = function () {
    fill(255,128,0);
    rect(this.x, this.y, this.width, this.height);
  };

  newPill.eject = function () {
    var realPill = ball(x + newPill.radius, y, newPill.radius, 0, 0);
    realPill.vx = 0;
    realPill.vy = 0;
    realPill.representation = function () {
      fill(0,255,255);
      ellipse(this.x, this.y, this.radius*1.5, this.radius*0.8);
      fill(255,0,0);
      textSize(10);
      textAlign(CENTER);
      text(newPill.effect, realPill.left(), realPill.y + newPill.radius);
      textAlign(LEFT);
    };

    realPill.effect = newPill.effect;
    realPill.noMinus = true; // Don't subtract score
    realPill.eaten = false;

    realPill.dealEffect = function () {
      switch (this.effect) {
        case 'BIG BALL':
          var bs = mygame.envs.balls;
          var l = bs.length;
          for (var i = 0; i < l; i++) {
            bs[i].shape = mygame.constants.bigBall;
            bs[i].radius = mygame.envs.bigRadius;
            bs[i].bigBall = true;
          }
          break;
        case 'ENLARGE':
          mygame.player.width *= 1.5;
          mygame.player.halfWidth = mygame.player.width/2;
          break;
        case 'LASER':
          mygame.displayLaserAt = this.x;
          mygame.displayLaser = true;
          setTimeout(mygame.stopLaser, 500);
          break;
        default:
          console.log('EFFECT NOT IMPLEMENTED: ' + this.effect);
          break;
      }
    };

    realPill.invisible = true;

    mygame.envs.pills.push(realPill);
  };

  return newPill;
}

mygame.stopLaser = function () {
  mygame.displayLaser = false;
}


// function pill(x, y, effect) {
  // var obj = new Brick(x, y, mygame.hBaseSize, mygame.vBaseSize);
  // obj.effect = effect || 'None';

  // obj.r = 30;

  // obj.eject = function (kind) {
    // var newPill = new Ball(x + obj.r, y, obj.r, createVector(0, 0));

    // newPill.show = function () {
      // fill(0,255,255);
      // ellipse(this.x, this.y, this.r, this.r);
      // fill(255,0,0);
      // textSize(10);
      // text(kind, newPill.x - 20, newPill.y + obj.r);
    // }
    // newPill.effect = kind;

    // newPill.noMinus = true;

    // newPill.dealEffect = function () {
      // switch (this.effect) {
        // case 'BIG BALL':
          // mygame.bigBall = true;
          // break;
        // case 'ENLARGE':
          // mygame.player.pingWidth *= 1.05;
          // break;
        // case 'LASER':
          // mygame.displayLaserAt = this.x;
          // mygame.displayLaser = true;
          // setTimeout(mygame.stopLaser, 500);
          // break;
        // default:
          // console.log('EFFECT NOT IMPLEMENTED: ' + this.effect);
      // }
    // }

    // newPill.invisible = true;

    // mygame.balls.push(newPill);
  // }

  // return obj;
// }

// mygame.displayLaser = function () {

// }
