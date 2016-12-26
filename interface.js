function startInterface () {
  background(0);
  var xcenter = width/2;
  var ycenter = height/2;

  if (mygame.envs.bricks.length !== 0) {
    mygame.clear();
  }

  textSize(40);
  textAlign(LEFT);
  fill(255, 0, 0);
  text('\u6253\u78DA\u584A\u904A\u6232', xcenter-110, 100);
  fill(255,128,0);
  for (var i = 0; i < 5; i++) {
    rect(xcenter-250+100*i, 150, 50, 30);
  }
  fill(0,255,0);
  for (var i = 0; i < 5; i++) {
    rect(xcenter-250+100*i, 500, 50, 30);
  }
  fill(142, 180, 235);
  for (var i = 0; i < 2; i++) {
    rect(xcenter-250, 275+100*i, 50, 30);
  }
  fill(255,0,64);
  for (var i = 0; i < 2; i++) {
    rect(xcenter+150, 275+100*i, 50, 30);
  }
  fill(95,128,224);
  textSize(30);
  textAlign(CENTER);
  // text('ENTER', xcenter-100, ycenter-100);
  text('\uFF2A \u8df3\u8e8d', xcenter-100, ycenter-50);
  text(' \uFF2B\u767C\u5C04', xcenter-100, ycenter);
  text(' N \u91CD\u4F86', xcenter-100, ycenter+50);
  textSize(40);
  text('\u8f38\u5165\u9375', xcenter+50, ycenter-40);
  text('\u555f\u52d5',xcenter+50,ycenter+50);

  // text('\u76e1\n\u60c5\n\u73a9', xcenter+50, ycenter-80);
  // text('Let us break bricks!\nPress r to start!\nPress n to see this again!\nAnd press k to launch bullets!', xcenter, ycenter - 75);
  textAlign(LEFT);
}

mygame.playAnime = function () {
  if (mygame.envs.timing > 800/3) {
    mygame.envs.timing         = 0;
    mygame.envs.itemNo         = 0;
    mygame.envs.playAnimeOrNot = false;
    mygame.envs.animeNo        = 0;
  }

  var timingRate = (mygame.envs.timing < 200) ? mygame.envs.timing / 200 : 1;
  var invRate    = 1 - timingRate;
  var firstCri   = 80/3;
  var secondCri  = 160/3;
  var thirdCri   = 240/3;
  // var fromColor = color(0);
  // var toColor   = color(0,0,255);
  // var colorToFill = lerpColor(fromColor, toColor, timingRate);
  // var fromColor = color(0,0,255);
  // var toColor = color(18, 158, 80);
  // fill(255,255,0);
  fill('#5DCFF5');
  textAlign(CENTER);
  textSize(60 * invRate);
  if (mygame.envs.animeNo === 1) {
    mygame.oneAnime(timingRate, invRate, firstCri, secondCri, thirdCri);
    textAlign(LEFT);
    mygame.envs.timing++;
    return;
  }
  text('\u5728\u5f88\u4e45\u5f88\u4e45\u4ee5\u524d',width/2,height*invRate);
  if (mygame.envs.timing > firstCri) {
    var oneTime = mygame.envs.timing - firstCri;
    var oneRate = (oneTime < 200) ? oneTime / 200 : 1;
    oneRate = 1 - oneRate;
    textSize(60 * oneRate);
    text('\u6709\u4e00\u500b\u559c\u611b\u6253\u78da\u584a\u7684\u570b\u5bb6',width/2,height*oneRate);
  }
  if (mygame.envs.timing > secondCri) {
    oneTime = mygame.envs.timing - secondCri;
    oneRate = (oneTime < 200) ? oneTime / 200 : 1;
    oneRate = 1 - oneRate;
    textSize(60 * oneRate);
    text('\u4ed6\u5011\u6bcf\u5929\u60a0\u9592\u5730\u6253\u78da\u584a\uff01',width/2,height*oneRate);
  }
  if (mygame.envs.timing > thirdCri) {
    oneTime = mygame.envs.timing - thirdCri;
    oneRate = (oneTime < 200) ? oneTime / 200 : 1;
    oneRate = 1 - oneRate;
    textSize(60 * oneRate);
    text('\u6e96\u5099\u597d\u56c9\uff01', width/2, height*oneRate);
  }
  /*
   * switch (mygame.envs.itemNo) {
   *   case 0:
   *     text('\u5728\u5f88\u4e45\u5f88\u4e45\u4ee5\u524d', width/2, height/2);
   *     continuePlay();
   *     break;
   *   case 1:
   *     text('\u6709\u4e00\u500b\u559c\u611b\u6253\u78da\u584a\u7684\u570b\u5bb6',width/2,height/2);
   *     continuePlay();
   *     break;
   *   case 2:
   *     text('\u4ed6\u5011\u6bcf\u5929\u60a0\u9592\u5730\u6253\u78da\u584a\uff01',width/2,height/2);
   *     continuePlay();
   *     break;
   *   default:
   *     text('\u6e96\u5099\u597d\u56c9\uff01',width/2,height/2);
   *     mygame.envs.itemNo = -1;
   *     break;
   * }
   */
  mygame.envs.timing++;
  textAlign(LEFT);

  /*
   * function continuePlay() {
   *   if (mygame.envs.timing > 200 && mygame.envs.itemNo > -1) {
   *     mygame.envs.timing  = 0;
   *     mygame.envs.itemNo += 1;
   *   }
   * }
   */
}

mygame.oneAnime = function(timingRate, invRate, firstCri, secondCri, thirdCri) {
  text('\u4f46\u662f\u90aa\u60e1\u7684\u6a5f\u5668\u4eba\u51fa\u73fe\u60f9\uff01',width/2,height*invRate);
  if (mygame.envs.timing > firstCri) {
    var oneTime = mygame.envs.timing - firstCri;
    var oneRate = (oneTime < 200) ? oneTime / 200 : 1;
    oneRate = 1 - oneRate;
    textSize(60 * oneRate);
    text('\u4ed6\u5011\u6d3e\u51fa\u4e86\u795e\u5947\u7684\u9b54\u6cd5\u78da\u584a',width/2,height*oneRate);
  }
  if (mygame.envs.timing > secondCri) {
    oneTime = mygame.envs.timing - secondCri;
    oneRate = (oneTime < 200) ? oneTime / 200 : 1;
    oneRate = 1 - oneRate;
    textSize(60 * oneRate);
    text('\u8a66\u5716\u5e72\u64fe\u4eba\u5011\u4eab\u53d7\u6253\u78da\u584a\u7684\u904e\u7a0b\uff01',width/2,height*oneRate);
  }
  if (mygame.envs.timing > thirdCri) {
    oneTime = mygame.envs.timing - thirdCri;
    oneRate = (oneTime < 200) ? oneTime / 200 : 1;
    oneRate = 1 - oneRate;
    textSize(60 * oneRate);
    text('\u70ba\u4e86\u78da\u584a\u596e\u6230\u5427\uff01\uff01\uff01', width/2, height*oneRate);
  }
}

