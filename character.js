// I shall create a character system.
// Different characters can choose various different professions, and
// different professions can choose various different skills.
// This will make the game more diverse and playable, I hope.

function character () {
  return {
    profession : {},
    level      : 1,
    defense    : 0,
    attack     : 0,
  };
}

// kind is an integer representing different professions
function newProfession (kind) {
  return {
    name: "profession name",
    skills: {},
  };
}

// mygame.all_skills.magnet = {a:1};
