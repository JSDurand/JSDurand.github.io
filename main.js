/*
 * Bricks game ... or not.
 */

var app = new p2.WebGLRenderer(function(){
  mon_jeu.monde = new p2.World({
    gravity : [0,-3]
  });
  this.setWorld(mon_jeu.monde);

  var ground_mat = new p2.Material();
  var ball_mat   = new p2.Material();

  // Contact
  var ground_ball_contact = new p2.ContactMaterial(ground_mat, ball_mat,
    {friction: 30});

  mon_jeu.monde.addContactMaterial(ground_ball_contact);

  // Add ground
  var ground_body = new p2.Body({ position: [0, -1] });
  ground_body.addShape(new p2.Plane({ material: ground_mat }));
  mon_jeu.monde.addBody(ground_body);

  // add player
  mon_jeu.player = mon_jeu.createChar(ground_mat, ball_mat);

  // add enemy
  mon_jeu.enemy = mon_jeu.createChar(ground_mat, ball_mat);

  for (var i = 0; i < mon_jeu.player.bodys.length; i++) {
    mon_jeu.monde.addBody(mon_jeu.player.bodys[i]);
    mon_jeu.player.bodys[i].position[0] -= 1;
  }

  for (var i = 0; i < mon_jeu.player.constraints.length; i++)
    mon_jeu.monde.addConstraint(mon_jeu.player.constraints[i]);

  // add enemy
  mon_jeu.enemy = mon_jeu.createChar(ground_mat, ball_mat);

  for (var i = 0; i < mon_jeu.enemy.bodys.length; i++) {
    mon_jeu.monde.addBody(mon_jeu.enemy.bodys[i]);
    mon_jeu.enemy.bodys[i].position[0] += 1;
  }

  for (var i = 0; i < mon_jeu.enemy.constraints.length; i++)
    mon_jeu.monde.addConstraint(mon_jeu.enemy.constraints[i]);

  this.followBody = mon_jeu.player.bodys[mon_jeu.player.body_order.PELVIS];
  mon_jeu.monde.on('postStep', function(evenement) {
    if (mon_jeu.player.jumping === 1) {
      mon_jeu.player.bodys[mon_jeu.player.body_order.HEAD].applyForce([
        0,100
      ]);
      mon_jeu.player.bodys[mon_jeu.player.body_order.HEAD].applyForce([
        0,100
      ]);
    } else if (mon_jeu.player.jumping === -1) {
      mon_jeu.player.bodys[mon_jeu.player.body_order.HEAD].applyForce([
        0,-100
      ]);
      mon_jeu.player.bodys[mon_jeu.player.body_order.HEAD].applyForce([
        0,-100
      ]);
    }

    if (mon_jeu.player.running !== 0) {
      mon_jeu.player.run();
    }
  });

  this.on('keydown', function(evenement) {
    switch (evenement.keyCode) {
      case 72: // H
        mon_jeu.player.running = -1;
        break;
      case 74: // J
        mon_jeu.player.jumping = 1;
        break;
      case 75: // K
        mon_jeu.player.jumping = -1;
        break;
      case 76: // L
        mon_jeu.player.running = 1;
        break;
      default:
        break;
    }
  }).on('keyup', function(evenement) {
    switch (evenement.keyCode) {
      case 72:
        mon_jeu.player.running = 0;
      case 74:
        mon_jeu.player.jumping = 0;
        break;
      case 75:
        mon_jeu.player.jumping = 0;
      case 76:
        mon_jeu.player.running = 0;
      default:
        break;
    }
  });
});
