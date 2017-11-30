function hole (x, y, radius, color) {
  var newHole = Object.create(mygame.objects);
  var typeOfHole;
  color = color || 'black';
  if (color === 'black') {
    typeOfHole = mygame.constants.blackHole;
  } else if (color === 'white') {
    typeOfHole = mygame.constants.whiteHole;
  }

  newHole.init(0, 0, mygame.constants.elastic, mygame.constants.basic, mygame.constants.smallBall);
  newHole.source = typeOfHole;
  newHole.setPos(x, y);
  newHole.radius = radius || 50;
  if (newHole.source === mygame.constants.whiteHole) {
    newHole.charge = 1000;
    newHole.charged = true;
    newHole.magnetRange = 100;
  } else {
    newHole.charge = -1000;
    newHole.charged = true;
    newHole.magnetRange = 500;
  }

  newHole.representation = function () {
    if (newHole.source === mygame.constants.blackHole) {
      fill(100);
    } else {
      fill(255);
    }
    ellipse(this.x, this.y, this.radius, this.radius);
  }

  newHole.death = false;

  return newHole;
}
