function brick(x, y, hsize, vsize, coe) {
  var newBrick = Object.create(mygame.objects);
  newBrick.init(hsize, vsize, mygame.constants.elastic, mygame.constants.basic);

  newBrick.setPos(x, y);
  newBrick.off = false;
  newBrick.representation = function () {
    fill(0,255,0);
    rect(this.x, this.y, this.width, this.height);
  }

  newBrick.ballHits = [];

  /*
   * var len = mygame.envs.balls.length;
   * for (var i = 0; i < len - 1; i++) {
   *   newBrick.ballHits[i] = false;
   * }
   */

  return newBrick;
}

function falling_brick(x, y, hsize, vsize, coe) {
  var newBrick = Object.create(mygame.objects);
  newBrick.init(hsize, vsize, mygame.constants.elastic, mygame.constants.basic);

  newBrick.setPos(x, y);
  newBrick.representation = function () {
    fill(0,255,0);
    rect(this.x, this.y, this.width, this.height);
  }
  newBrick.off = false;
  newBrick.updatePos = function() {
    this.vy += mygame.envs.gravity;
    this.y  += this.vy;

    if (this.y > height) {
      this.off = true;
    }
  }

  newBrick.ballHits = [];

  return newBrick;
}
  // this.x = x;
  // this.y = y;
  // this.hsize = hsize;
  // this.vsize = vsize;

  // this.coefficientRes = coe || 0.9;

  // this.show = function() {
    // fill(0,255,0);
    // rect(this.x, this.y, this.hsize, this.vsize)
  // }

  // var h = this.hsize;
  // var v = this.vsize;

  // this.hits = hittedOrNot;

// function hittedOrNot (bri, bal) {
  // if (bal.invisible) {
    // return false;
  // }

  // var rect0x = bri.x;
  // var rect0y = bri.y + bri.vsize;
  // var rect1x = bri.x;
  // var rect1y = bri.y;
  // var rect2x = bri.x + bri.hsize;
  // var rect2y = bri.y;
  // var rect3x = bri.x + bri.hsize;
  // var rect3y = bri.y + bri.vsize;
  // var epsilon = 1;
  // var adjust = bal.r/2 + epsilon;

  // var inter1 = lineIntersection(rect0x - adjust, rect0y + adjust, rect1x - adjust, rect1y - adjust, bal.x, bal.y, bal.x + bal.v.x, bal.y + bal.v.y);
  // var inter2 = lineIntersection(rect1x - adjust, rect1y - adjust, rect2x + adjust, rect2y - adjust, bal.x, bal.y, bal.x + bal.v.x, bal.y + bal.v.y);
  // var inter3 = lineIntersection(rect2x + adjust, rect2y - adjust, rect3x + adjust, rect3y + adjust, bal.x, bal.y, bal.x + bal.v.x, bal.y + bal.v.y);
  // var inter4 = lineIntersection(rect3x + adjust, rect3y + adjust, rect0x - adjust, rect0y + adjust, bal.x, bal.y, bal.x + bal.v.x, bal.y + bal.v.y);

  // return inter1 || inter2 || inter3 || inter4;
// }

// function lineIntersection (x1, y1, x2, y2, x3, y3, x4, y4) {
  // var dir1 = turnDir(x1, y1, x2, y2, x3, y3);
  // var dir2 = turnDir(x1, y1, x2, y2, x4, y4);
  // var dir3 = turnDir(x1, y1, x3, y3, x4, y4);
  // var dir4 = turnDir(x2, y2, x3, y3, x4, y4);

  // return dir1 != dir2 && dir3 != dir4;
// }

// function turnDir (x1, y1, x2, y2, x3, y3) {
  // var detectionFactor = ((y3 - y1) * (x2 - x1)) - ((x3 - x1) * (y2 - y1));
  // if (detectionFactor > 0) {return 1;}
  // else if (detectionFactor < 0) {return -1;}
  // else {return 0;}
// }
