// I shall create a character system.
// Different characters can choose various different professions, and
// different professions can choose various different skills.
// This will make the game more diverse and playable, I hope.

mygame.character = function () {
  return {
    skill   : {},
    level   : 1,
    defense : 0,
    attack  : 0,
  };
}

// kind is an integer representing different professions
mygame.newProfession = function (kind) {
  return {
    name: "profession name",
    skills: {},
  };
}

// mygame.all_skills.magnet = {a:1};

mygame.explosion = function () {
  mygame.player.throwing = !mygame.player.throwing;
}
