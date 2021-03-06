function gameLoop () {
  background(0);

  if (mygame.envs.timeStop) {
    mygame.player.representation();
    for (var i = 0; i < mygame.envs.balls.length; i++) {
      mygame.envs.balls[i].representation();
    }
    for (var i = 0; i < mygame.envs.bricks.length; i++) {
      mygame.envs.bricks[i].representation();
    }
    for (var i = 0; i < mygame.envs.rotbricks.length; i++) {
      mygame.envs.rotbricks[i].representation();
    }
    for (var i = 0; i < mygame.envs.pills.length; i++) {
      mygame.envs.pills[i].representation();
    }
    for (var i = 0; i < mygame.envs.unbreakables.length; i++) {
      mygame.envs.unbreakables[i].representation();
    }
    for (var i = mygame.envs.blacks.length - 1; i >= 0; i--) {
      mygame.envs.blacks[i].representation();
    }
    for (var i = mygame.envs.whites.length - 1; i >= 0; i--) {
      mygame.envs.whites[i].representation();
    }
    for (var i = 0; i < mygame.envs.obs.length; i++) {
      mygame.envs.obs[i].representation();
    }

    mygame.showScore();

    return;
  }

  if (mygame.envs.playAnimeOrNot) {
    mygame.playAnime();
    return;
  }

  mygame.player.updatePos();
  mygame.player.representation();

  if (mygame.envs.randomAgain) {
    mygame.envs.whites = myshuffle(mygame.envs.whites);
    mygame.envs.randomAgain = false;
    setTimeout(randoming, 1500);
  }

  mygame.motif(mygame.player, mygame.envs.balls);
  mygame.motif(mygame.player, mygame.envs.pills);
  mygame.ball_collide(mygame.envs.balls);
  mygame.check_bricks(mygame.envs.bricks);

  mygame.collidables = mygame.envs.bricks.concat(mygame.envs.pills, mygame.envs.balls, mygame.envs.unbreakables, mygame.envs.blacks, mygame.envs.whites, mygame.envs.obs, mygame.envs.rotbricks);

  for (var i = mygame.collidables.length - 1; i >= 0; i--) {
    mygame.collidables[i].updatePos();
    mygame.collidables[i].representation();
  }

  for (var i = mygame.envs.mysterious_holes.length - 1; i >= 0; i--) {
    if (mygame.envs.mysterious_holes[i].death) {
      mygame.envs.mysterious_holes.splice(i);
    } else {
      mygame.envs.mysterious_holes[i].representation();
    }
  }

  if (mygame.displayLaser) {
    var x = mygame.displayLaserAt;
    stroke(255,0,0);
    strokeWeight(5);
    line(x, 0, x, height);
    strokeWeight(1);
    noStroke();
    for (var i = mygame.envs.bricks.length - 1; i >= 0; i--) {
      var bri = mygame.envs.bricks[i];
      if (abs(bri.midX() - x) < bri.halfWidth && !bri.invisible) {
        mygame.envs.bricks.splice(i, 1);
      }
    }
  }

  mygame.showScore();
}

function randoming () {
  mygame.envs.randomAgain = true;
}

function myshuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

mygame.showScore = function () {
  fill(255,255,0);

  textSize(width/40);

  if (mygame.envs.timeStop) {
    text("\u6642\u9593\u66ab\u505c!", width*17/20, height/20);
  }
  // text("direction:\t" + mygame.player.direction + "bool:\t" + mygame.player.show_direction, 50, 300);

  text("\u95dc\u5361:\t" + mygame.envs.level + "\n\u751f\u547d:\t" + mygame.player.life + "\n\u5834\u4e0a\u7684\u7403:\t" + mygame.envs.balls.length + "\nSkill:\t" + mygame.player.character.skill.status , width/20, width/20);
}
