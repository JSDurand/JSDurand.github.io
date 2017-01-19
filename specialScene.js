function death () {
  background(0);
  fill(255,0,0);
  textSize(40);
  text("\u4F60\u5DF2\u7D93\u6B7B\u4E86!!\n\u95DC\u5361: " + mygame.envs.level + "\n\u6309 N \u91cd\u4f86", width/5, height/2);
}

function allPass () {
  background(0);
  fill(0,255,255);
  textSize(40);
  text("\u606d\u559c\u7834\u95dc!\n\u5466\u547c!", width/2 - 150, height/2);
}

function nextLevel () {
  levelSystem(mygame.envs.level, mygame.envs.diff, mygame.envs.vshift, mygame.envs.hshift, mygame.envs.mysize, mygame.envs.hBaseSize, mygame.envs.vBaseSize);
  mygame.envs.start = false;
}

function winner () {
  background(0);
  fill(0,0,255);
  textSize(40);
  text("\u606d\u559c!\n\u95DC\u5361: " + mygame.envs.level + "\n\u6309 ENTER \u7e7c\u7e8c", width/5, height/2);
}
