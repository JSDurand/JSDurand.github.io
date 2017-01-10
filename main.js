/*
 * Bricks game ... or not.
 */

var app = new p2.WebGLRenderer(function(){
  mon_jeu.monde = new p2.World({
    gravity : [0,-5]
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

  var char_obj = mon_jeu.createChar(ground_mat, ball_mat);

  for (var i = 0; i < char_obj.bodys.length; i++)
    mon_jeu.monde.addBody(char_obj.bodys[i]);

  for (var i = 0; i < char_obj.constraints.length; i++)
    mon_jeu.monde.addConstraint(char_obj.constraints[i]);

  this.followBody = char_obj.bodys[0];
  // mon_jeu.monde.on('postStep', function(evenement) {
    // ball_body.angularForce = .1;
  // });

  // this.on('keydown', function(evenement) {
    // switch (evenement.keyCode) {
      // case 72:
        // console.log('H is pressed');
        // break;
      // case 76:
        // console.log('L is pressed');
        // break;
      // default:
        // break;
    // }
  // });
});
