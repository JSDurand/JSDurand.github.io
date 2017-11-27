// a primitive game record system

mygame.replay = function (record) {
  mygame.envs.recording = true;
  var l = record.length;
  for (var i = 0; i < l; i++) {
    var obj       = mygame.envs.record[i].split(" ");
    var func      = mygame.decode(obj[0]);
    var t         = parseInt(obj[1]);
    var last_time = t;
    if (obj.length < 3) {
      setTimeout(func, t);
    } else {
      setTimeout(func(obj[2]), t);
    }
  }
  mygame.envs.record = [];
  setTimeout(function(){alert("last motion replayed!");}, last_time + 1000);
  setTimeout(function(){mygame.envs.recording = false;mygame.envs.time=0;}, last_time + 1000);
}

mygame.decode = function (str) {
  switch (str) {
    case "k" :
      return mygame.kfunction;
      break;
    case "n" :
      return mygame.nfunction;
      break;
    case "j" :
      return mygame.jfunction;
      break;
    case "s" :
      return mygame.sfunction;
      break;
    case "r" :
      return mygame.returnfunction;
      break;
    case "m" :
      return mygame.mfunction;
      break;
    case "left" :
      return mygame.leftfunction;
      break;
    case "right" :
      return mygame.rightfunction;
      break;
    case "mouse" :
      return mygame.mousefunction;
      break;
    default :
      alert("invalid record!");
      return;
      break;
  }
}
