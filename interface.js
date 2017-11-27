function startInterface () {
  background(0);
  var xcenter = width/2;
  var ycenter = height/2;
  var bwidth  = width/20;
  var bheight = height/20;
  var t_inter = height/10;
  var t_base  = height*7/20;

  if (mygame.envs.bricks.length !== 0) {
    mygame.clear();
  }

  textSize(40);
  textAlign(LEFT);
  fill(255, 0, 0);
  text('\u6253\u78DA\u584A\u904A\u6232', xcenter-110, height/10);
  fill(255,128,0);
  for (var i = 0; i < 5; i++) {
    rect(xcenter-250+100*i, height/5, bwidth, bheight);
  }
  fill(0,255,0);
  for (var i = 0; i < 5; i++) {
    rect(xcenter-250+100*i, height*4/5, bwidth, bheight);
  }
  fill(142, 180, 235);
  for (var i = 1; i < 3; i++) {
    rect(xcenter-250, height/5+height*i/5, bwidth, bheight);
  }
  fill(255,0,64);
  for (var i = 1; i < 3; i++) {
    rect(xcenter+150, height/5+height*i/5, bwidth, bheight);
  }
  fill(95,128,224);
  textSize(30);
  textAlign(CENTER);
  // text('ENTER', xcenter-100, ycenter-100);
  text('\uFF2A \u8df3\u8e8d', xcenter-100, t_base+t_inter);
  text(' \uFF2B\u767C\u5C04', xcenter-100, t_base+2*t_inter);
  text(' N \u91CD\u4F86', xcenter-100, t_base+3*t_inter);
  textSize(40);
  text('\u8f38\u5165\u9375', xcenter+50, t_base+t_inter);
  text('\u555f\u52d5',xcenter+50,t_base+3*t_inter);
  textSize(30);
  text('\u6309\uff33\u66ab\u505c',xcenter-20,t_base)
  text('\u6309\uff2d\u8df3\u95dc',xcenter-20,t_base+4*t_inter);
  // text('\u76e1\n\u60c5\n\u73a9', xcenter+50, ycenter-80);
  // text('Let us break bricks!\nPress r to start!\nPress n to see this again!\nAnd press k to launch bullets!', xcenter, ycenter - 75);
  textAlign(LEFT);
}

function basicInterface () {
  var boundary1 = width/10;
  var boundary2 = width*9/10;
  var j1 = height/5;
  var j2 = height*7/20;

  fill(255,0,0);
  rect(0,j1,boundary1,j2-j1);
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
  } else if (mygame.envs.animeNo === 2) {
    mygame.twoAnime(timingRate, invRate, firstCri, secondCri, thirdCri);
    textAlign(LEFT);
    mygame.envs.timing++;
    return;
  } else if (mygame.envs.animeNo === 3) {
    mygame.threeAnime(timingRate, invRate, firstCri, secondCri, thirdCri);
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

mygame.twoAnime = function(timingRate, invRate, firstCri, secondCri, thirdCri) {
  text('\u70ba\u4e86\u61c9\u5c0d\u6a5f\u5668\u4eba\u7684\u9032\u653b\uff0c\u5927\u5bb6\u5408\u8cc7\u8cfc\u8cb7\u4e86\u4e00\u9846\u70b8\u5f48\uff01',width/2,height*invRate);

  if (mygame.envs.timing > firstCri) {
    var oneTime = mygame.envs.timing - firstCri;
    var oneRate = (oneTime < 200) ? oneTime / 200 : 1;
    oneRate = 1 - oneRate;
    textSize(60 * oneRate);
    text('\u76f8\u4fe1\u6a5f\u5668\u4eba\u6703\u843d\u8352\u800c\u9003\u7684\uff01',width/2,height*oneRate);
  }
  if (mygame.envs.timing > secondCri) {
    oneTime = mygame.envs.timing - secondCri;
    oneRate = (oneTime < 200) ? oneTime / 200 : 1;
    oneRate = 1 - oneRate;
    textSize(60 * oneRate);
    text('\u9019\u662f\u78da\u584a\u570b\u7684\u5bbf\u547d\u8207\u69ae\u8000',width/2,height*oneRate);
  }
  if (mygame.envs.timing > thirdCri) {
    oneTime = mygame.envs.timing - thirdCri;
    oneRate = (oneTime < 200) ? oneTime / 200 : 1;
    oneRate = 1 - oneRate;
    textSize(60 * oneRate);
    text('\u4e00\u5207\u90fd\u662f\u70ba\u4e86\u78da\u584a\uff01', width/2, height*oneRate);
  }
}

mygame.threeAnime = function(timingRate, invRate, firstCri, secondCri, thirdCri) {
  text('\u4f60\u4ee5\u70ba\u7d50\u675f\u4e86\u55ce\uff1f\u592a\u5929\u771f\u60f9\uff01',width/2,height*invRate);

  if (mygame.envs.timing > firstCri) {
    var oneTime = mygame.envs.timing - firstCri;
    var oneRate = (oneTime < 200) ? oneTime / 200 : 1;
    oneRate = 1 - oneRate;
    textSize(60 * oneRate);
    text('\u6a5f\u5668\u4eba\u638c\u63e1\u4e86\u6700\u65b0\u79d1\u6280\uff0c\u8b93\u78da\u584a\u6389\u4e0b\u4f86\u4e86\uff01',width/2,height*oneRate);
  }
  if (mygame.envs.timing > secondCri) {
    oneTime = mygame.envs.timing - secondCri;
    oneRate = (oneTime < 200) ? oneTime / 200 : 1;
    oneRate = 1 - oneRate;
    textSize(60 * oneRate);
    text('\u5728\u6253\u78da\u584a\u524d\uff0c\u5148\u9003\u547d\u53bb\u5427\uff5e\uff01',width/2,height*oneRate);
  }
  if (mygame.envs.timing > thirdCri) {
    oneTime = mygame.envs.timing - thirdCri;
    oneRate = (oneTime < 200) ? oneTime / 200 : 1;
    oneRate = 1 - oneRate;
    textSize(60 * oneRate);
    text('\u60f3\u8fa6\u6cd5\u7e7c\u7e8c\u73a9\u5427\uff0c\u557e\u54aa \u003e\u002e\u005e', width/2, height*oneRate);
  }
}
