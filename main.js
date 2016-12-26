var mygame = {};

mygame.envs = {
  balls : [],
  pills : [],
  bricks : [],
  level : 0,
  defaultLife : 10,
  gravity : 0.02,
  coefficientWal : 1.1,
  maximum : 15,
  maxLevel : 7,
  maxAttained : false,
  start : false,
  intro : true,
  bigRadius : 40,
  superDuper : true, // controls super duper behaviour
  unbreakables : [],
  blacks : [],
  whites : [],
  obs : [],
  finishExplain : false,
  randomAgain : false,
  timeStop : false,
  playAnimeOrNot : false,
  timing : 0,
  itemNo : 0,
  animeNo : 0,
  hittedArray : []
};

function setup () {
  mygame.can = createCanvas(1000,700);
  mygame.centerCanvas();

  mygame.player = myPlayer();

  mygame.envs.mysize = width/10;
  mygame.envs.diff = height/10;
  mygame.envs.vshift = height/3 - mygame.constants.defaultWidth/2;
  mygame.envs.hshift = width/3 - mygame.constants.defaultHeight/2;

  // levelSystem(mygame.envs.level, mygame.envs.diff, mygame.envs.vshift, mygame.envs.hshift, mygame.envs.mysize, mygame.constants.defaultWidth, mygame.constants.defaultHeight);

  setTimeout(randoming, 1500);
  angleMode(DEGREES);
}

function draw() {
  if (mygame.envs.intro) {
    startInterface();
  } else if (mygame.envs.bricks.length == 0) {
    if (!mygame.envs.start) {
      winner();
    } else if (!mygame.envs.maxAttained) {
      nextLevel();
    } else {
      allPass();
    }
  } else if (mygame.player.life <= 0) {
    death();
  } else {
    gameLoop();
  }
}

mygame.centerCanvas = function () {
  var x = (windowWidth - width)/2;
  var y = (windowHeight - height)/2;
  mygame.can.position(x, y);
}

function windowResized () {
  mygame.centerCanvas();
}
