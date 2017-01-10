  // tete body
  var tete_body = new p2.Body({ position: [0, tete_height], mass : .05 });
  tete_body.addShape(new p2.Circle({radius : tete_radius}), [0, 0], Math.PI/2);
  char_obj.bodys.push(tete_body);
  // body body
  var body_body = new p2.Body({position: [0, tete_height - body_height/2], mass: 1});
  body_body.addShape(new p2.Box({
    width: body_width,
    height: body_height,
    material: matB
  }));
  char_obj.bodys.push(body_body);
  // left arm body
  var left_arm_body = new p2.Body({position: [-body_width/2, tete_height - body_height/2], mass: .5});
  left_arm_body.addShape(new p2.Capsule({
    length: left_arm_length,
    radius: left_arm_radius,
    material: matB
  }), [0, 0]);
  char_obj.bodys.push(left_arm_body);
  // right arm body
  var right_arm_body = new p2.Body({position: [body_width/2, tete_height - body_height/2], mass: .5});
  right_arm_body.addShape(new p2.Capsule({
    length: right_arm_length,
    radius: right_arm_radius,
    material: matB
  }), [0, 0]);
  char_obj.bodys.push(right_arm_body);

  // constraints
  var tete_body_constraint = new p2.RevoluteConstraint(tete_body, body_body,
    {
      localPivotA: [0, -(tete_radius + .025)],
      localPivotB: [0, body_height+.025]
    });

  var left_arm_body_constraint = new p2.RevoluteConstraint(body_body, left_arm_body,
    {
      localPivotA: [-shoulder_length, body_height/2],
      localPivotB: [shoulder_length, 0]
    });
  left_arm_body_constraint.setLimits(-Math.PI/3, Math.PI/3);

  var right_arm_body_constraint = new p2.RevoluteConstraint(body_body, right_arm_body,
    {
      localPivotA: [shoulder_length, body_height/2],
      localPivotB: [-shoulder_length, 0]
    });
  right_arm_body_constraint.setLimits(-Math.PI/3, Math.PI/3);
  char_obj.constraints.push(tete_body_constraint, left_arm_body_constraint,
    right_arm_body_constraint);
