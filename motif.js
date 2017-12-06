mygame.source = {
  elastic : function (restitution) {
    this.restitution = restitution || 0.9;
  },
  magnet : function (electron) {
    this.electron = electron || 0.5;
  }
};

mygame.constants = {
  elastic : 'elastic',
  dynamic : 'dynamic', // affected by gravity
  basic : 'basic', // not touched upon by gravity
  magnet : 'magnet', // Hooray!
  unbreakable : 'unbreakable', // literally, unbreakable
  blackHole : 'black hole',
  whiteHole : 'white hole',
  defaultShape : 'rectangle',
  smallBall : 'small ball',
  bigBall : 'big ball',
  defaultWidth : 50, // for bricks
  defaultHeight : 25,
  defaultBricksLife : 30, // the default life for bricks
};

mygame.objects = {
  init : function (w, h, source, target, shape, charge, range) {
    this.target = target || mygame.constants.basic;
    this.source = source || mygame.constants.elastic;

    this.width = w || mygame.constants.defaultWidth;
    this.height = h || mygame.constants.defaultHeight;
    this.radius = this.width;

    this.charge = charge || 0;
    this.charged = this.charge !== 0;
    this.magnetRange = range || 0;
    this.magnetized = false;

    this.shape = shape || mygame.constants.defaultShape;
    this.isBall = this.shape !== mygame.constants.defaultShape;

    this.halfWidth = this.width/2;
    this.halfHeight = this.height/2;

    var source = mygame.source[this.source];
    source.call(this);

    this.x = 0;
    this.y = 0;

    this.vx = 0;
    this.vy = 0;

    this.ax = 0;
    this.ay = 0;

    this.updateShape();
  },

  updateShape : function () {
    this.halfWidth = this.width/2;
    this.halfHeight = this.height/2;
  },

  midX : function () {
    return this.x + this.halfWidth;
  },

  midY : function () {
    return this.y + this.halfHeight;
  },

  upper : function () {
    return this.y;
  },

  left : function () {
    return this.x;
  },

  lower : function () {
    return this.y + this.height;
  },

  right : function () {
    return this.x + this.width;
  },

  setPos : function (posx, posy) {
    this.x = posx;
    this.y = posy;
  },

  updatePos : function () {
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

    if (this.target === 'basic') {
      // this.vx += this.ax;
      // this.vy += this.ay;
    } else if (this.target === 'dynamic') {
      // this.vx += this.ax; - mygame.envs.gravity;
      this.vy += this.ay + mygame.envs.gravity;
    } else {
      // console.log('NOT IMPLEMENTED YET!');
    }
  },

  representation : function () {
    // implementation depends upon specific objects.
  }
};

mygame.nonEmptyHom = function (obj1, obj2) {
  // We assume X is always a ball, and Y is always a rectangle.

  // maybe the brick is rotated
  if (typeof obj2.angle === 'undefined') {
    return mygame.ball_normal_rect_intersection(obj1, obj2);
  } else {
    var fake_ball = Object.assign({}, obj1);
    var angle = obj2.angle;
    var old_x = fake_ball.x - obj2.midX();
    var old_y = fake_ball.y - obj2.midY();
    fake_ball.x = obj2.midX() + rotation(-angle, old_x, old_y, 0);
    fake_ball.y = obj2.midY() + rotation(-angle, old_x, old_y, 2);
     return mygame.ball_normal_rect_intersection(fake_ball, obj2);
  }
};

function rotation (angle, oldx, oldy, row_index) {
  var rotation_matrix = [cos(angle), -sin(angle), sin(angle), cos(angle)];
  return rotation_matrix[row_index] * oldx + rotation_matrix[row_index+1] * oldy;
}

function lineIntersection (x1, y1, x2, y2, x3, y3, x4, y4) {
  var dir1 = turnDir(x1, y1, x2, y2, x3, y3);
  var dir2 = turnDir(x1, y1, x2, y2, x4, y4);
  var dir3 = turnDir(x1, y1, x3, y3, x4, y4);
  var dir4 = turnDir(x2, y2, x3, y3, x4, y4);

  return dir1 != dir2 && dir3 != dir4;
}

function turnDir (x1, y1, x2, y2, x3, y3) {
  var detectionFactor = ((y3 - y1) * (x2 - x1)) - ((x3 - x1) * (y2 - y1));
  if (detectionFactor > 0) {return 1;}
  else if (detectionFactor < 0) {return -1;}
  else {return 0;}
}

mygame.Hom = function (X, Y) {
  if (typeof Y.angle === 'undefined') {
    if (!Y.charged) {
      elasticMapping(X, Y);
    } else {
      magneticMapping(X, Y);
    }
  } else {
    var fake_ball = Object.assign({}, X);
    var angle = Y.angle;
    var old_x = fake_ball.x - Y.midX();
    var old_y = fake_ball.y - Y.midY();
    fake_ball.x = Y.midX() + rotation(-angle, old_x, old_y, 0);
    fake_ball.y = Y.midY() + rotation(-angle, old_x, old_y, 2);
    fake_ball.vx = rotation(-angle, fake_ball.vx, fake_ball.vy, 0);
    fake_ball.vy = rotation(-angle, fake_ball.vx, fake_ball.vy, 2);
    if (!Y.charged) {
      elasticMapping(fake_ball, Y);
    } else {
      magneticMapping(fake_ball, Y);
    }
    X.x = Y.midX() + rotation(angle, fake_ball.x - Y.midX(), fake_ball.y - Y.midY(), 0);
    X.y = Y.midX() + rotation(angle, fake_ball.x - Y.midX(), fake_ball.y - Y.midY(), 2);
    X.vx = rotation(angle, fake_ball.vx, fake_ball.vy, 0);
    X.vy = rotation(angle, fake_ball.vx, fake_ball.vy, 2);

  }
}

function elasticMapping (X, Y) {
  // We assume X is always a ball, and Y is always a rectangle.

  var x1 = X.x;
  var y1 = X.y;
  var x2 = Y.midX();
  var y2 = Y.midY();
  var epsilon = 0.1;

  var dx = abs((x2 - x1)/Y.halfWidth);
  var dy = abs((y2 - y1)/Y.halfHeight);

  if (abs(dx - dy) < epsilon) {
    X.vx *= -Y.restitution;
    X.vy *= -Y.restitution;
  } else if (dx > dy) {
    X.vx *= -Y.restitution;
  } else {
    X.vy *= -Y.restitution;
  }
}

// Here X is the ball attracted by the charged rectangle Y

function magneticMapping (X, Y) {
  var q = Y.charge;
  var v = createVector(X.x - Y.midX(), X.y - Y.midY());
  var d = v.magSq();

  v.normalize();
  v.x *= q/d;
  v.y *= q/d;
  X.vx += v.x;
  X.vy += v.y;
}

// We assume joueur is the player and collidables is either balls or pills.

mygame.motif = function (joueur, collidables) {
  var l = collidables.length;

  // mygame.envs.hittedArray = [];
  // for (var i = l - 1; i >= 0; i--) {
    // mygame.envs.hittedArray.push([]);
  // }
  outer:
  for (var i = l - 1; i >= 0; i--) {
    var coli = collidables[i];
    if (coli.offscreen()) {
      if ((!coli.noMinus) & (!mygame.envs.superDuper)) {
        mygame.player.life--;
      }
      collidables.splice(i, 1);
      // for (var j = 0; j < mygame.envs.hittedArray.length; j++) {
        // mygame.envs.hittedArray[j] = [];
        // for (var k = j + 1; k < mygame.envs.hittedArray.length; k++) {
          // mygame.envs.hittedArray[j].push(false);
        // }
      // }
      /*
       * if (collidables.length !== 0 && i !== l - 1) {
       *   for (var j = i - 1; j >= 0; j++) {
       *     if (typeof mygame.envs.hittedArray[j] === 'undefined') {}
       *     else {
       *       mygame.envs.hittedArray[j].splice(i - j - 1, 1);
       *     }
       *   }
       *   mygame.envs.hittedArray.splice(i, 1);
       * }
       */
      continue;
    }
    coli.boundary();
    if (coli.eaten) {
      collidables.splice(i, 1);
      continue;
    }

    var bris = mygame.envs.bricks;
    var m    = bris.length;
    for (var j = m - 1; j >= 0; j--) {
      // bris[j].ballHits = [];
      // for (var k = 0; k < l; l++) {
        // bris[j].ballHits.push(false);
      // }
      // console.log('ya');
      // return;
      if (mygame.nonEmptyHom(coli, bris[j])) {
        if (!bris[j].ballHits[i] || (bris[j].source === mygame.constants.magnet)) {
          mygame.Hom(coli, bris[j]);
          bris[j].ballHits[i] = true;
        }
        if ((bris[j].source === mygame.constants.magnet) && coli.magnetized) {
          continue;
        }
        if (typeof bris[j].effect === 'undefined' || bris[j].life > 1) {}
        else {bris[j].eject();}
        if (bris[j].invisible) {}
        else if (bris[j].life === 1) {
          bris.splice(j, 1);
        } else {
          bris[j].life--;
          // alert('wrong');
        }
        if (coli.has_effect) {
          coli.dealEffect();
          break;
        }
        continue;
      }
      bris[j].ballHits[i] = false;
    }

    var bris = mygame.envs.rotbricks;
    var m    = bris.length;

    for (var j = m - 1; j >= 0; j--) {
      if (mygame.nonEmptyHom(coli, bris[j])) {
        if (coli.has_effect) {
          coli.dealEffect();
        }
        mygame.Hom(coli, bris[j]);
      } 
    }

    var bris = mygame.envs.unbreakables;
    var m    = bris.length;

    for (var j = m - 1; j >= 0; j--) {
      if (mygame.nonEmptyHom(coli, bris[j])) {
        // if (coli.has_effect) {
          // coli.dealEffect();
        // }
        mygame.Hom(coli, bris[j]);
      } 
    }

    var bris = mygame.envs.obs;
    var m    = bris.length;

    for (var j = m - 1; j >= 0; j--) {
      if (mygame.nonEmptyHom(coli, bris[j])) {
        if (coli.has_effect) {
          coli.dealEffect();
        }
        mygame.Hom(coli, bris[j]);
      } 
    }

    bris = mygame.envs.whites;
    m    = bris.length;

    for (var j = m - 1; j >= 0; j--) {
      if (mygame.nonEmptyHom(coli, bris[j])) {
        mygame.Hom(coli, bris[j]);
      } 
    }

    bris = mygame.envs.mysterious_holes;
    m    = bris.length;

    for (var j = m - 1; j >= 0; j--) {
      if (mygame.nonEmptyHom(coli, bris[j])) {
        mygame.Hom(coli, bris[j]);
      }
    }

    var holes = mygame.envs.blacks;
    var outs  = mygame.envs.whites;
    var m     = holes.length;

    for (var j = m - 1; j >= 0; j--) {
      // determine if it is in the hole first
      var d = dist(coli.x, coli.y, holes[j].x, holes[j].y);
      if (d < holes[j].radius - 2) {
        var out = outs[j];
        coli.setPos(out.x + coli.vx, out.y + coli.vy);
        continue outer;
      }
      // then determine if it is attracted
      if (mygame.nonEmptyHom(coli, holes[j])) {
        mygame.Hom(coli, holes[j]);
       }
    }
  }
};

mygame.ball_collide = function (balls_list) {
  var len = balls_list.length;
  mygame.envs.hittedArray = [];
  for (var i = len - 1; i >= 0; i--) {
    mygame.envs.hittedArray.push([]);
  }
  for (var i = 0; i < len; i++) {
    for (var j = i + 1; j < len; j++) {
      mygame.envs.hittedArray[i].push(false);

      // Detect if two balls are hitted
      // if (typeof mygame.envs.hittedArray[i] === 'undefined') {
        // mygame.envs.hittedArray[i] = [];
        // break;
      // }
      // if (typeof mygame.envs.hittedArray[i][j - i - 1] === 'undefined') {
        // mygame.envs.hittedArray[i][j - i - 1] = false;
        // break;
      // }
      /*
       * if (typeof mygame.envs.hittedArray[i][j - i - 1] === 'undefined') {
       *   continue;
       * }
       */

      // Basic Setup
      var one_ball = balls_list[i];
      var two_ball = balls_list[j];
      var mass_one = (one_ball.bigBall) ? 1 : 0;
      var mass_two = (two_ball.bigBall) ? 1 : 0;
      var mass_dif = mass_one - mass_two;

      var nor = dist(one_ball.x, one_ball.y, two_ball.x, two_ball.y);

      if (one_ball.no_collide || two_ball.no_collide) {
        continue;
      }

      if (nor >= (one_ball.radius + two_ball.radius)*2/3) {
        mygame.envs.hittedArray[i][j - i - 1] = false;
        continue;
      }
      if (mygame.envs.hittedArray[i][j - i - 1]) {
        continue;
      }
      mygame.envs.hittedArray[i][j - i - 1] = true;

      // place the balls back
      one_ball.x -= one_ball.vx/2;
      one_ball.y -= one_ball.vy/2;
      two_ball.x -= two_ball.vx/2;
      two_ball.y -= two_ball.vy/2;

      // Tangent and normal
      var unx = (two_ball.x - one_ball.x) / nor;
      var uny = (two_ball.y - one_ball.y) / nor;
      var utx = -uny;
      var uty =  unx;

      // velocities
      var vn_one = unx * one_ball.vx + uny * one_ball.vy;
      var vn_two = unx * two_ball.vx + uny * two_ball.vy;
      var vt_one = utx * one_ball.vx + uty * one_ball.vy;
      var vt_two = utx * two_ball.vx + uty * two_ball.vy;

      switch (mass_dif) {
        case 0:
          one_ball.vx = vt_one * utx + vn_two * unx;
          one_ball.vy = vt_one * uty + vn_two * uny;
          two_ball.vx = vt_two * utx + vn_one * unx;
          two_ball.vy = vt_two * uty + vn_one * uny;
          break;
        case 1:
          one_ball.vx = vt_one * utx + (2*vn_one/3 + vn_two/3  ) * unx;
          one_ball.vy = vt_one * uty + (2*vn_one/3 + vn_two/3  ) * uny;
          two_ball.vx = vt_two * utx + (5*vn_one/3 - 2*vn_two/3) * unx;
          two_ball.vy = vt_two * uty + (5*vn_one/3 - 2*vn_two/3) * uny;
          break;
        case -1:
          one_ball.vx = vt_one * utx + (5*vn_one/3 - 2*vn_two/3) * unx;
          one_ball.vy = vt_one * uty + (5*vn_one/3 - 2*vn_two/3) * uny;
          two_ball.vx = vt_two * utx + (2*vn_one/3 + vn_two/3  ) * unx;
          two_ball.vy = vt_two * uty + (2*vn_one/3 + vn_two/3  ) * uny;
          break;
        default:
          console.log('STRANGE BEHAVIOUR!');
          break;
      }
    }
  }
}

mygame.check_bricks = function (bricks_list) {
  var l = bricks_list.length;
  for (var i = l - 1; i > -1; i--) {
    if (bricks_list[i].off) {
      mygame.player.life = 0;
    }
    if (bricks_list[i].life === 0) {
      bricks_list.splice(i, 1);
    }
  }
}

mygame.ball_normal_rect_intersection = function (obj1, obj2) {
  // We assume X is always a ball, and Y is always a rectangle.

  if (obj1.shape === mygame.constants.smallBall) {
    if (obj1.invisible) {
      if (obj1.y < mygame.player.upper()) {return false;}
      else {
        var b = (obj1.x > mygame.player.left()) && (obj1.x < mygame.player.right());
        if (b) {obj1.eaten = true;}

        return b;
      }
    }

    if (obj1.x < obj2.left() || obj1.x > obj2.right() || obj1.y > obj2.lower() || obj1.y < obj2.upper()) {
      if (obj2.charged) {
        var d  = dist(obj1.x, obj1.y, obj2.midX(), obj2.midY());
        if (d < obj2.magnetRange) {
          obj1.magnetized = true;
          return true;
        } else {
          obj1.magnetized = false;
          return false;
        }
      } else {
        obj1.magnetized = false;
        return false;
      }
    }
    
    return true;
  } else if (obj1.shape === mygame.constants.bigBall) {
    if (obj1.invisible) {
      if (obj1.y < mygame.player.upper()) {return false;}
      else {
        var b = (obj1.x > mygame.player.left()) && (obj1.x < mygame.player.right());
        if (b) {
          obj1.eaten = true;
        }

        return b;
      }
    }

    var rect0x = obj2.left();
    var rect0y = obj2.lower();
    var rect1x = obj2.left();
    var rect1y = obj2.upper();
    var rect2x = obj2.right();
    var rect2y = obj2.upper();
    var rect3x = obj2.right();
    var rect3y = obj2.lower();
    var epsilon = 1;
    var adjust = obj1.radius/2 + epsilon;

    var inter1 = lineIntersection(rect0x - adjust, rect0y + adjust, rect1x - adjust, rect1y - adjust, obj1.x, obj1.y, obj1.x + obj1.vx, obj1.y + obj1.vy);
    var inter2 = lineIntersection(rect1x - adjust, rect1y - adjust, rect2x + adjust, rect2y - adjust, obj1.x, obj1.y, obj1.x + obj1.vx, obj1.y + obj1.vy);
    var inter3 = lineIntersection(rect2x + adjust, rect2y - adjust, rect3x + adjust, rect3y + adjust, obj1.x, obj1.y, obj1.x + obj1.vx, obj1.y + obj1.vy);
    var inter4 = lineIntersection(rect3x + adjust, rect3y + adjust, rect0x - adjust, rect0y + adjust, obj1.x, obj1.y, obj1.x + obj1.vx, obj1.y + obj1.vy);

    if (inter1 || inter2 || inter3 || inter4) {
      return true;
    } else {
        if (obj2.charged) {
          var d  = dist(obj1.x, obj1.y, obj2.midX(), obj2.midY());

          if (d < obj2.magnetRange) {
            obj1.magnetized = true;
            return true;
          } else {
            obj1.magnetized = false;
            return false;
          }
        } else {
          obj1.magnetized = false;
          return false;
        }
    }
  }

  console.log('two strange shapes: ' + obj1.shape + ' and ' + obj2.shape);
  return false;

}
