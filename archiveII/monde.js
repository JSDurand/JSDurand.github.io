function initialise(that) {
  mon_jeu.monde = new p2.World({
    gravity : [0,-10]
  });
  that.setWorld(mon_jeu.monde);
}
// Create the world
var monde = new p2.World({
  gravity : [0,-10]
});
// this.setWorld(monde);

var ground    = new p2.Material();
var brick_mat = new p2.Material();
var ball_mat  = new p2.Material();

// Contact
var brick_ball_contact = new p2.ContactMaterial(brick_mat, ball_mat,
  {friction: 30});

monde.addContactMaterial(brick_ball_contact);

// Add ground
var ground_body = new p2.Body({ position: [0, -2] });
ground_body.addShape(new p2.Plane({ material: ground }));
monde.addBody(ground_body);
