function keyPressed() {
  if (key === 'T') {
    mygame.player.throwing = !mygame.player.throwing;
  }

  if (key == 'K') {
    mygame.kfunction();
  }

  if (key === 'S') {
    mygame.sfunction();
  }

  if (key == 'M') {
    mygame.mfunction();
  }

  if (key === 'B') {
    mygame.bfunction();
  }

  if (key === 'R') {
    mygame.replay(mygame.envs.record);
  }

  if (keyCode === RETURN) {
    mygame.returnfunction();
  }

  if (keyCode === LEFT_ARROW) {
    mygame.leftfunction();
  }

  if (keyCode === RIGHT_ARROW) {
    mygame.rightfunction();
  }

/*
 *   if (key == 'C') {
 *     if (mygame.envs.timeStop) {
 *       return;
 *     }
 * 
 *     if (mygame.envs.intro) {return;}
 * 
 *     if (mygame.envs.level < mygame.envs.maxLevel) {
 *       if (mygame.envs.bricks.length !== 0) {
 *         mygame.player.life = mygame.player.life <= 0 ? mygame.player.life : 1;
 *         alert('\u8B66\u544A:\u4E0D\u8981\u4E82\u4F86!')
 *         // life = 10;
 *         // start = true;
 *         // level++;
 *       } else {
 *         mygame.player.life = mygame.envs.defaultLife;
 *         mygame.envs.start = true;
 *         mygame.envs.level++;
 *       }
 *     } else {
 *       mygame.envs.start = true;
 *       mygame.envs.maxAttained = true;
 *     }
 *   }
 */

  if (key === 'N') {
    mygame.nfunction();
  }

  if (key === 'J') {
    mygame.jfunction();
  }

  if (key === 'V') {
    mygame.vfunction();
  }

  if (key === 'D') {
    mygame.dfunction();
  }
}

mygame.startover = function() {
  mygame.player.life = mygame.envs.defaultLife;
  mygame.envs.balls        = [];
  mygame.envs.pills        = [];
  mygame.envs.bricks       = [];
  mygame.envs.rotbricks    = [];
  mygame.envs.unbreakables = [];
  mygame.envs.obs          = [];
  mygame.envs.level = 1;
  mygame.envs.maxAttained = false;
  mygame.envs.intro = false;
  mygame.envs.start = true;
  mygame.envs.superDuper = false;
  mygame.player.width = width/6;
  mygame.player.halfWidth = mygame.player.width/2;

  mygame.envs.playAnimeOrNot = true;
  // setTimeout(mygame.endAnime, 5000);
  // mygame.envs.mysize = width/10;
  // mygame.envs.diff = height/10;
  // mygame.envs.vshift = height/3 - mygame.constants.defaultWidth/2;
  // mygame.envs.hshift = width/3 - mygame.constants.defaultHeight/2;
  // reset(mygame.envs.diff, mygame.envs.vshift, mygame.envs.hshift, mygame.envs.mysize, mygame.envs.defaultWidth, mygame.envs.defaultHeight);
}

mygame.kfunction = function () {
  if (!mygame.envs.recording) {
    mygame.envs.record.push(("k " + mygame.envs.time.toString()));
  }

  if (mygame.envs.intro) {
    return;
  }

  if (mygame.envs.timeStop) {
    return;
  }

  if (mygame.envs.k === 0) {
    mygame.player.choose_direction();
  } else if (mygame.envs.k === 1) {
    mygame.player.show_direction = false;
    mygame.player.eject(mygame.player.direction);
    mygame.player.direction = mygame.player.defaultDirection;
  } else {
    alert("not implemented behaviour!")
  }

  mygame.envs.k = (mygame.envs.k === 0) ? 1 : 0;
}

mygame.sfunction = function () {
  if (!mygame.envs.recording) {
    mygame.envs.record.push(("s "+mygame.envs.time.toString()));
  }
  if (mygame.envs.playAnimeOrNot || mygame.envs.intro) {return;}
  mygame.envs.timeStop = !mygame.envs.timeStop;
}

mygame.mfunction = function () {
  if (!mygame.envs.recording) {
    mygame.envs.record.push(("m "+mygame.envs.time.toString()));
  }
  if (mygame.envs.timeStop) {
    return;
  }
  mygame.envs.superDuper = false;

  var val = prompt('\u9078\u64C7\u95DC\u5361', mygame.envs.maxLevel);
  if (isNaN(parseFloat(val))) {return;}

  mygame.player.life = mygame.envs.defaultLife;
  mygame.envs.playAnimeOrNot = false;
  mygame.envs.timing = 0;
  mygame.envs.itemNo = 0;
  mygame.envs.balls        = [];
  mygame.envs.pills        = [];
  mygame.envs.bricks       = [];
  mygame.envs.blacks       = [];
  mygame.envs.obs          = [];
  mygame.envs.whites       = [];
  mygame.envs.unbreakables = [];
  mygame.envs.level = parseFloat(val);
  mygame.envs.maxAttained = false;
  mygame.envs.intro = false;
  mygame.envs.start = true;
  mygame.envs.superDuper = false;
  mygame.player.width = width/6;
  mygame.player.halfWidth = mygame.player.width/2;
}

mygame.bfunction = function () {
  if (!mygame.envs.recording) {
    mygame.envs.record.push(("b "+mygame.envs.time.toString()));
  }
  if (mygame.envs.timeStop) {return;}
  if (mygame.envs.superDuper | (mygame.envs.level === 0)) {
    var bs = mygame.envs.balls;
    var l = bs.length;
    for (var i = 0; i < l; i++) {
      bs[i].shape = mygame.constants.bigBall;
      bs[i].radius = mygame.envs.bigRadius;
      bs[i].bigBall = true;
    }
  }
}

mygame.returnfunction = function () {
  if (!mygame.envs.recording) {
    mygame.envs.record.push(("r "+mygame.envs.time.toString()));
  }
  if (mygame.envs.timeStop) {
    return;
  }

  if (mygame.envs.intro) {
    mygame.startover();
  } else if (mygame.envs.playAnimeOrNot) {
    mygame.envs.playAnimeOrNot = false;
    mygame.envs.timing         = 0;
    mygame.envs.animeNo        = 0;
  } else {
    if (mygame.envs.level <= mygame.envs.maxLevel) {
      if (mygame.envs.bricks.length !== 0) {
        // mygame.player.life = mygame.player.life <= 0 ? mygame.player.life : 1;
        alert('\u8B66\u544A:\u4E0D\u8981\u4E82\u4F86!')
      } else {
         if (mygame.envs.level < mygame.envs.maxLevel) {
           mygame.player.life = mygame.envs.defaultLife;
           mygame.envs.start = true;
           mygame.envs.level += (mygame.envs.level === 8 || mygame.envs.level === 8.5) ? .5 : 1;
         } else {
           mygame.envs.start = true;
           mygame.envs.maxAttained = true;
         }
      }
    } else {
      mygame.envs.start = true;
      mygame.envs.maxAttained = true;
    }
  }
}

mygame.nfunction = function () {
  if (!mygame.envs.recording) {
    mygame.envs.record.push(("n "+mygame.envs.time.toString()));
  }
  if (mygame.envs.timeStop) {
    return;
  }

  mygame.player.vx           = 0;
  mygame.player.vy           = 0;
  mygame.player.x            = width/2 - mygame.player.halfWidth;
  mygame.envs.bricks         = [];
  mygame.envs.rotbricks      = [];
  mygame.envs.balls          = [];
  mygame.envs.pills          = [];
  mygame.envs.blacks         = [];
  mygame.envs.whites         = [];
  mygame.envs.unbreakables   = [];
  mygame.envs.obs            = [];
  mygame.envs.intro          = true;
  mygame.envs.playAnimeOrNot = false;
  mygame.envs.timing         = 0;
  mygame.envs.itemNo         = 0;
  mygame.envs.animeNo        = 0;
}

mygame.jfunction = function () {
  if (!mygame.envs.recording) {
    mygame.envs.record.push(("j "+mygame.envs.time.toString()));
  }
  if (mygame.envs.timeStop) {
    return;
  }

  mygame.player.jumpingDown = true;
  mygame.player.vy = 5;
  setTimeout(mygame.jreleasefunction, 500);
}

mygame.jreleasefunction = function () {
  mygame.player.jumpingUp = true;
  mygame.player.vy = -5;
}

mygame.vfunction = function () {
  if (!mygame.envs.recording) {
    mygame.envs.record.push("v "+mygame.envs.time.toString());
  }
  if (mygame.envs.intro) {return;}
  mygame.envs.superDuper = !mygame.envs.superDuper;
}

mygame.dfunction = function () {
  if (!mygame.envs.recording) {
    mygame.envs.record.push("d "+mygame.envs.time.toString());
  }
  if (mygame.envs.intro) {return;}
  var val = prompt('\u4f60\u89ba\u5f97\u594e\u4f51\u5e25\u55ce\uff1f', '\u4F10\u4F10\u4F10\u4F10\u4F10\u6728\u5DE5');
  if (val === '\u6211\u89ba\u5f97\u594e\u4f51\u5f88\u5e25') {
    mygame.player.width     = width * 6;
    mygame.player.halfWidth = width * 3;
    mygame.player.height    = 40;
    mygame.envs.superDuper  = true;
  }
}

mygame.leftfunction = function () {
  if (!mygame.envs.recording) {
    mygame.envs.record.push("left "+mygame.envs.time.toString());
  }
  if (mygame.envs.intro) {return;}
  if (mygame.envs.timeStop) {return;}
  mygame.player.vx = (mygame.player.vx < 0) ? 0 : -5;
}

mygame.rightfunction = function () {
  if (!mygame.envs.recording) {
    mygame.envs.record.push("right "+mygame.envs.time.toString());
  }
  if (mygame.envs.intro) {return;}
  if (mygame.envs.timeStop) {return;}
  mygame.player.vx = (mygame.player.vx > 0) ? 0 : 5;
}

mygame.mousefunction = function (mx) {
  return function () {
    mouseX = mx;
  }
}

// ARCHIVE

// function keyReleased () {
    // if (mygame.envs.timeStop) {
      // return;
    // }

  // if (key === 'J') {
    // mygame.player.jumpingUp = true;
    // mygame.player.vy = -5;
  // }

  // if (key === 'K') {
    // mygame.player.show_direction = false;
    // mygame.player.eject(mygame.player.direction);
    // mygame.player.direction = mygame.player.defaultDirection;
  // }
// }

// function touchStarted () {
  // if (mygame.envs.timeStop) {
    // return;
  // }

  // var mx = mouseX;
  // var my = mouseY;

  // var boundary = width/10;
  // var j1 = height*3/4;

  // if (mx <= boundary && j1 <= my) {
    // mygame.envs.moving = !mygame.envs.moving;
  // }
 // }

// function touchEnded () {
  // mygame.envs.moving = false;
// }
