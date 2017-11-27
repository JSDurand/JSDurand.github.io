function keyPressed() {
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

  if (keyCode === RETURN) {
    mygame.returnfunction();
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

function touchStarted () {
  if (mygame.envs.timeStop) {
    return;
  }

  var mx = mouseX;
  var my = mouseY;

  var boundary1 = width/10;
  var boundary2 = width*9/10;

  var j1 = height/5;
  var j2 = height*7/20;

  // if (mx <= boundary1 && j1 <= my && my <= j2) {
    // mygame.returnfunction();
  // }
 }

// function touchEnded () {
  // if (mygame.player.show_direction) {
    // mygame.player.show_direction = false;
    // mygame.player.eject(mygame.player.direction);
    // mygame.player.direction = mygame.player.defaultDirection;
  // }
// }

mygame.startover = function() {
  mygame.player.life = mygame.envs.defaultLife;
  mygame.envs.balls        = [];
  mygame.envs.pills        = [];
  mygame.envs.bricks       = [];
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
  if (mygame.envs.playAnimeOrNot || mygame.envs.intro) {return;}
  mygame.envs.timeStop = !mygame.envs.timeStop;
}

mygame.mfunction = function () {
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
  if (mygame.envs.timeStop) {
    return;
  }

  mygame.envs.bricks         = [];
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
  if (mygame.envs.intro) {return;}
  mygame.envs.superDuper = !mygame.envs.superDuper;
}

mygame.dfunction = function () {
  if (mygame.envs.intro) {return;}
  var val = prompt('\u4f60\u89ba\u5f97\u594e\u4f51\u5e25\u55ce\uff1f', '\u4F10\u4F10\u4F10\u4F10\u4F10\u6728\u5DE5');
  if (val === '\u6211\u89ba\u5f97\u594e\u4f51\u5f88\u5e25') {
    mygame.player.width     = width * 6;
    mygame.player.halfWidth = width * 3;
    mygame.player.height    = 40;
    mygame.envs.superDuper  = true;
  }
}
