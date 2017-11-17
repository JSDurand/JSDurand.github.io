function levelSystem (num, diff, vshift, hshift, mysize, hBaseSize, vBaseSize) {
  switch (num) {
    case 1:
      reset(diff, vshift, hshift, mysize, hBaseSize, vBaseSize);
      break;
    case 2:
      var number = 3;

      mygame.clear();

      for (var i = 0; i < number; i++) {
        var base = vshift + diff * i;
        for (var j = 0; j < number; j++) {
          mygame.envs.bricks.push(brick(hshift + 2*mysize * j, base, hBaseSize, vBaseSize, 2*(10*i+j)/25));
          // mygame.envs.bricks.push(new Brick(hshift + mysize * j, base, hBaseSize, vBaseSize, 2*(10*i+j)/25));
        }
      }
      break;
    case 3:
      var number = 3;
      var pillNumber = 3;

      mygame.clear();

      for (var i = 0; i < number; i++) {
        var base = vshift + diff * i;
        for (var j = 0; j < number; j++) {
          mygame.envs.bricks.push(brick(hshift + mysize * j, base, hBaseSize, vBaseSize, 2*(10*i+j)/25));
        }
      }
      for (var i = 0; i < pillNumber; i++) {
        mygame.envs.bricks.push(pill(width/6, vshift + mysize * i/2, 'ENLARGE'));
        if (i === 0) {
          mygame.envs.bricks.push(pill(width*5/6 - 75, vshift + mysize * i/2, 'BIG BALL'));
        } else {
          mygame.envs.bricks.push(pill(width*5/6 - 75, vshift + mysize * i/2, 'LASER'))
        }
      }
      break;
    case 4:
      var baseH = height/5;
      mygame.clear();

      for (var i = 1; i < 3; i++) {
        mygame.envs.bricks.push(brick(width/5+mysize*i, baseH, hBaseSize, vBaseSize, 0.5+i/10));
        mygame.envs.bricks.push(brick(width/5+mysize*i, baseH + 200, hBaseSize, vBaseSize, 0.5+i/10));
      }
      for (var i = 4; i < 6; i++) {
        mygame.envs.bricks.push(brick(width/5+mysize*i, baseH, hBaseSize, vBaseSize, 0.5+i/10));
        mygame.envs.bricks.push(brick(width/5+mysize*i, baseH + 200, hBaseSize, vBaseSize, 0.5+i/10));
      }
      mygame.envs.bricks.push(magBrick(width/5+mysize*3, baseH + 100, hBaseSize, vBaseSize, 0.9, 1000, 150));
      mygame.envs.bricks.push(pill(width/2, baseH, 'ENLARGE'));
      mygame.envs.bricks.push(pill(width/2, baseH + 200, 'BIG BALL'));
      mygame.envs.bricks.push(magBrick(width/5+mysize*3, baseH + 200, hBaseSize, vBaseSize, 0.9, 500, 50));
      mygame.envs.bricks.push(magBrick(width/5, baseH, hBaseSize, vBaseSize, 0.9, 500, 50));
      mygame.envs.bricks.push(magBrick(width/5 + mysize*6, baseH, hBaseSize, vBaseSize, 0.9, 500, 50));
      mygame.envs.bricks.push(magBrick(width/5, baseH + 200, hBaseSize, vBaseSize, 0.9, 500, 50));
      mygame.envs.bricks.push(magBrick(width/5 + mysize*6, baseH + 200, hBaseSize, vBaseSize, 0.9, 500, 50));
      break;
    case 5:
      var baseH = height/5;
      mygame.clear();
      mygame.player.height = 20;
      mygame.player.halfHeight = 10;

      mygame.envs.unbreakables.push(unbrick(width/5, baseH, hBaseSize, vBaseSize, 0.9, -500, 150));
      mygame.envs.unbreakables.push(unbrick(width/5, baseH + 200, hBaseSize, vBaseSize, 0.9, -500, 150));
      mygame.envs.unbreakables.push(unbrick(width/5+3*mysize, baseH, hBaseSize, vBaseSize, 0.9, 3000, 150));
      mygame.envs.bricks.push(pill(width/5+3*mysize, baseH+60, 'ENLARGE'));
      mygame.envs.bricks.push(pill(width/5+3*mysize, baseH+120, 'LASER'));
      mygame.envs.unbreakables.push(unbrick(width/5+3*mysize, baseH + 200, hBaseSize, vBaseSize, 0.9, 3000, 150));
      mygame.envs.unbreakables.push(unbrick(width/5+6*mysize, baseH, hBaseSize, vBaseSize, 0.9, -500, 150));
      mygame.envs.unbreakables.push(unbrick(width/5+6*mysize, baseH + 200, hBaseSize, vBaseSize, 0.9, -500, 150));

      for (var i = 1; i < 3; i++) {
        mygame.envs.bricks.push(brick(width/5+mysize*i, baseH, hBaseSize, vBaseSize, 0.5+i/10));
        mygame.envs.bricks.push(brick(width/5+mysize*i, baseH+100, hBaseSize, vBaseSize, 0.5+i/10));
        mygame.envs.bricks.push(brick(width/5+mysize*i, baseH + 200, hBaseSize, vBaseSize, 0.5+i/10));
      }
      for (var i = 4; i < 6; i++) {
        mygame.envs.bricks.push(brick(width/5+mysize*i, baseH, hBaseSize, vBaseSize, 0.5+i/10));
        mygame.envs.bricks.push(brick(width/5+mysize*i, baseH+100, hBaseSize, vBaseSize, 0.5+i/10));
        mygame.envs.bricks.push(brick(width/5+mysize*i, baseH + 200, hBaseSize, vBaseSize, 0.5+i/10));
      }
      break;
    case 6:
      var baseH = height/5;
      var startPos = width/5 -25;
      mygame.clear();

      for (var i = 1; i < 6; i++) {
        mygame.envs.bricks.push(brick(startPos+mysize*i, baseH, hBaseSize, vBaseSize, 0.5+i/10));
        mygame.envs.bricks.push(brick(startPos+mysize*i, baseH + 200, hBaseSize, vBaseSize, 0.5+i/10));
      }
      for (var i = 1; i < 3; i++) {
        mygame.envs.unbreakables.push(unbrick(startPos+mysize*i, baseH + 50, hBaseSize, vBaseSize, 0.9, 1500, 100));
        mygame.envs.unbreakables.push(unbrick(startPos+mysize*i, baseH + 150, hBaseSize, vBaseSize, 0.9, 1500, 100));
        mygame.envs.bricks.push(brick(startPos+mysize*i, baseH + 100, hBaseSize, vBaseSize, 0.9));
      }
      mygame.envs.unbreakables.push(unbrick(startPos+3*mysize, baseH+50, hBaseSize, vBaseSize, 0.9, 1500, 150))
      mygame.envs.unbreakables.push(unbrick(startPos+3*mysize, baseH+150, hBaseSize, vBaseSize, 0.9, 1500, 150))
      // mygame.envs.bricks.push(pill(startPos+mysize*3, baseH + 100, 'ENLARGE'));
      for (var i = 4; i < 6; i++) {
        mygame.envs.unbreakables.push(unbrick(startPos+mysize*i, baseH + 50, hBaseSize, vBaseSize, 0.9, 1500, 100));
        mygame.envs.unbreakables.push(unbrick(startPos+mysize*i, baseH + 150, hBaseSize, vBaseSize, 0.9, 1500, 100));
        mygame.envs.bricks.push(brick(startPos+mysize*i, baseH + 100, hBaseSize, vBaseSize, 0.9));
      }
      mygame.envs.bricks.push(pill(width/2-25, baseH + 100, 'ENLARGE'));
      mygame.envs.whites.push(hole(startPos+75, baseH-50, 50, 'white'));
      mygame.envs.whites.push(hole(startPos, baseH+115, 50, 'white'));
      mygame.envs.whites.push(hole(startPos + mysize*5.5, baseH-50, 50, 'white'));
      mygame.envs.whites.push(hole(startPos + mysize*6.5, baseH+115, 50, 'white'));
      mygame.envs.blacks.push(hole(width/2, baseH-75, 50, 'black'));
      mygame.envs.blacks.push(hole(startPos+75, baseH+260, 50, 'black'));
      mygame.envs.blacks.push(hole(startPos+5.5*mysize, baseH+260, 50, 'black'));
      mygame.envs.blacks.push(hole(width/2, baseH+300, 50, 'black'));
      break;
    case 7:
      mygame.envs.animeNo = 1;
      mygame.envs.timing = 0;
      mygame.envs.playAnimeOrNot = true;
      var baseH = height/5;
      mygame.clear();
      mygame.player.height = 20;
      mygame.player.halfHeight = 10;

      for (var i = 0; i < 2; i++) {
        mygame.envs.bricks.push(brick(width/10+mysize*i, baseH, hBaseSize, vBaseSize, 0.5+i/10));
        mygame.envs.bricks.push(brick(width/10+mysize*i, baseH+100, hBaseSize, vBaseSize, 0.5+i/10));
        mygame.envs.bricks.push(brick(width/10+mysize*i, baseH + 200, hBaseSize, vBaseSize, 0.5+i/10));
      }
      for (var i = 6; i < 8; i++) {
        mygame.envs.bricks.push(brick(width/5+mysize*i, baseH, hBaseSize, vBaseSize, 0.5+i/10));
        mygame.envs.bricks.push(brick(width/5+mysize*i, baseH+100, hBaseSize, vBaseSize, 0.5+i/10));
        mygame.envs.bricks.push(brick(width/5+mysize*i, baseH + 200, hBaseSize, vBaseSize, 0.5+i/10));
      }
      var ob = obstacles(width*9/24, height/3, 100, 40, 1.2);
      ob.square_route(5);
      mygame.envs.obs.push(ob);
      // var invbrick_one = brick(width/2-100, height/2-100, 100, 50, 0.9);
      // invbrick_one.invisible = true;
      // mygame.envs.bricks.push(invbrick_one);
      break;
    case 8:
      mygame.envs.animeNo = 2;
      mygame.envs.timing = 0;
      mygame.envs.playAnimeOrNot = true;
      var baseH = height/5;
      var startPos = width/5 -25;
      mygame.clear();
      // var temp = brick(width/3, height/3, hBaseSize, vBaseSize, 0.9);
      // temp.invisible = true;
      var ob_one = obstacles(width*7/24, height*7/24-15, hBaseSize, vBaseSize, 1.2);
      var ob_two = obstacles(width*2/3, height/3, hBaseSize, vBaseSize, 1.2);
      ob_one.radius = 60;
      ob_two.radius = 60;
      ob_one.square_route(2);

      for (var i = 1; i < 6; i++) {
        mygame.envs.bricks.push(brick(startPos+mysize*i, baseH, hBaseSize, vBaseSize, 0.5+i/10));
        mygame.envs.bricks.push(brick(startPos+mysize*i, baseH + 200, hBaseSize, vBaseSize, 0.5+i/10));
      }
      
      mygame.envs.bricks.push(bomb(width/2-25, height/2-140, 50));
      // mygame.envs.bricks.push(temp);
      mygame.envs.obs.push(ob_one);
      mygame.envs.obs.push(ob_two);
      break;
    case 8.5:
      mygame.envs.animeNo = 3;
      mygame.envs.timing = 0;
      mygame.envs.playAnimeOrNot = true;
      var baseH = height/5;
      var startPos = width/5 -25;
      mygame.clear();
      mygame.envs.bricks.push(falling_brick(width/2-hBaseSize/2, 20, hBaseSize, vBaseSize, 0.9));
      break;
    case 0:
      mygame.player.width = width * 6;
      mygame.player.halfWidth = width * 3;
      mygame.player.height = 40;
      mygame.envs.superDuper = true;

      var startx = width/3;
      var starty = height/4;
      var stepx  = 2*width/15;
      var stepy  = 2*height/8;
      var invbrick_one = brick(startx+100, starty+stepy/2, stepx/3, stepy/4, 0.9);
      // var invbrick_two = brick(startx, starty-stepy/2, stepx/3, stepy/4, 0.9);
      // var invbrick_three = brick(startx+stepx, starty+stepy, stepx/3, stepy/4, 0.9);
      // var invbrick_four = brick(startx-stepx, starty+stepy, stepx/3, stepy/4, 0.9);
      invbrick_one.invisible = true;
      // invbrick_two.invisible = true;
      // invbrick_three.invisible = true;
      // invbrick_four.invisible = true;
      mygame.envs.bricks.push(invbrick_one);
      mygame.envs.bricks.push(bomb(width*2/3, height*2/3, 50));
      // mygame.envs.obs.push(obstacles(width/2-20, height/2-50, 100, 40, 1.1));
      // mygame.envs.bricks.push(invbrick_two);
      // mygame.envs.bricks.push(invbrick_three);
      // mygame.envs.bricks.push(invbrick_four);
      break;

      // for (var i = 0; i < 5; i++) {
        // mygame.envs.unbreakables.push(unbrick(startx+i*stepx, starty, stepx, stepy, 0.9, -1500, 100));
        // mygame.envs.unbreakables.push(unbrick(startx, starty+i*stepx, stepx, stepy, 0.9, -1500, 100));
        // mygame.envs.unbreakables.push(unbrick(startx+4*stepx, starty+i*stepx, stepx, stepy, 0.9, -1500, 100));
        // mygame.envs.unbreakables.push(unbrick(startx+i*stepx, starty+4*stepx, stepx, stepy, 0.9, -1500, 100));
      // }
    default:
      console.log('NOT IMPLEMENTED!');
      break;
  }
}

function reset(diff, vshift, hshift, mysize, hBaseSize, vBaseSize) {
  var number = 3;

  mygame.envs.bricks = [];
  mygame.clear();

  for (var i = 0; i < number; i++) {
    var base = vshift + diff * i;
    for (var j = 0; j < number; j++) {
      mygame.envs.bricks.push(brick(hshift + mysize * j, base, hBaseSize, vBaseSize));
    }
  }
}

mygame.clear = function () {
  mygame.envs.bricks = [];
  mygame.envs.unbreakables = [];
  mygame.envs.balls = [];
  mygame.envs.pills = [];
  mygame.envs.blacks = [];
  mygame.envs.whites = [];
  mygame.envs.obs = [];
  mygame.player.life = mygame.envs.defaultLife;
  mygame.player.width = width/6;
  mygame.player.halfWidth = mygame.player.width/2;
  mygame.player.height = 20;
  mygame.player.halfHeight = 10;
}
