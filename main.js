var mygame = {};

mygame.envs = {
  balls : [],
  pills : [],
  bricks : [],
  rotbricks: [],
  level : 0,
  defaultLife : 10,
  gravity : 0.02,
  coefficientWal : 1.1,
  maximum : 15,
  maxLevel : 9,
  maxAttained : false,
  start : false,
  intro : true,
  bigRadius : 40,
  superDuper : true, // controls super duper behaviour
  unbreakables : [],
  blacks : [],
  whites : [],
  mysterious_holes : [], // mysterious holes to aid the game function
  obs : [],
  finishExplain : false,
  randomAgain : false,
  timeStop : false,
  playAnimeOrNot : false,
  timing : 0,
  itemNo : 0,
  animeNo : 0,
  hBaseSize : 50,
  vBaseSize : 25,
  hittedArray : [],
  k : 0,
  time : 0,
  record : [],
  recording : false,
};

mygame.envs.mobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

/*
 * function preload() {
 *   myfont = loadFont('Georgia',fontReady);
 *   myfont = loadFont('./DFLIYX1B.TTF');
 * }
 */

/*
 * function fontReady (font) {
 *   textFont(font);
 * }
 */

function setup () {
  mygame.can = createCanvas(windowWidth*4/5, windowHeight);
  mygame.centerCanvas();

  mygame.player = myPlayer();

  mygame.envs.mysize = width/10;
  mygame.envs.diff = height/10;
  mygame.envs.vshift = height/3 - mygame.constants.defaultWidth/2;
  mygame.envs.hshift = width/3 - mygame.constants.defaultHeight/2;

  setTimeout(randoming, 1500);
  frameRate(30);
  angleMode(DEGREES);
}

function draw() {
  mygame.envs.time += 30;
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
