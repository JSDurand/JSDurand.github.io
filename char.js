// Character model

mon_jeu.createChar = function (matA, matB) {
  // some constants
var shouldersDistance = 0.3*0.5,
    upperArmLength    = 0.3*0.4,
    lowerArmLength    = 0.3*0.4,
    upperArmSize      = 0.3*0.2,
    lowerArmSize      = 0.3*0.2,
    neckLength        = 0.3*0.1,
    headRadius        = 0.3*0.25,
    upperBodyLength   = 0.3*0.6,
    pelvisLength      = 0.3*0.4,
    upperLegLength    = 0.3*0.5,
    upperLegSize      = 0.3*0.2,
    lowerLegSize      = 0.3*0.2,
    lowerLegLength    = 0.3*0.5;

  // shapes
  var headShape          = new p2.Circle({ radius: headRadius }),
      upperArmShapeLeft  = new p2.Box({
        width: upperArmLength,
        height: upperArmSize,
        material: matB
      }),
      upperArmShapeRight = new p2.Box({
        width: upperArmLength,
        height: upperArmSize,
        material: matB
      }),
      lowerArmShapeLeft  = new p2.Box({
        width: lowerArmLength,
        height: lowerArmSize,
        material: matB
      }),
      lowerArmShapeRight = new p2.Box({
        width: lowerArmLength,
        height: lowerArmSize,
        material: matB
      }),
      upperBodyShape     = new p2.Box({
        width: shouldersDistance,
        height: upperBodyLength,
        material: matB
      }),
      pelvisShape        = new p2.Box({
        width: shouldersDistance,
        height: pelvisLength,
        material: matB
      }),
      upperLegShapeLeft  = new p2.Box({
        width: upperLegSize,
        height: upperLegLength,
        material: matB
      }),
      upperLegShapeRight = new p2.Box({
        width: upperLegSize,
        height: upperLegLength,
        material: matB
      }),
      // lowerLegShapeLeft  = new p2.Circle({
        // radius: lowerLegLength/2,
        // material: matB
      // }),
      // lowerLegShapeRight = new p2.Circle({
        // radius: lowerLegLength/2,
        // material: matB
      // });
      lowerLegShapeLeft  = new p2.Box({
        width: lowerLegSize,
        height: lowerLegLength
      }),
      lowerLegShapeRight = new p2.Box({
        width: lowerLegSize,
        height: lowerLegLength
      });

  // the object to return
  var char_obj = {};
  char_obj.bodys = [];
  char_obj.constraints = [];

  // bodys
  // Enums for convenience
  char_obj.body_order = {
    LOWER_LEFT_LEG  : 0,
    LOWER_RIGHT_LEG : 1,
    UPPER_LEFT_LEG  : 2,
    UPPER_RIGHT_LEG : 3,
    PELVIS          : 4,
    UPPER_BODY      : 5,
    HEAD            : 6,
    UPPER_LEFT_ARM  : 7,
    UPPER_RIGHT_ARM : 8,
    LOWER_LEFT_ARM  : 9,
    LOWER_RIGHT_ARM : 10
  };
  char_obj.cons_order = {
    NECK           : 0,
    LEFT_KNEE      : 1,
    RIGHT_KNEE     : 2,
    LEFT_HIP       : 3,
    RIGHT_HIP      : 4,
    SPINE          : 5,
    LEFT_SHOULDER  : 6,
    RIGHT_SHOULDER : 7,
    LEFT_ELBOW     : 8,
    RIGHT_ELBOW    : 9
  };
  // Lower legs
  var lowerLeftLeg = new p2.Body({
    mass: 1,
    position: [-shouldersDistance/2,lowerLegLength / 2],
  });
  var lowerRightLeg = new p2.Body({
    mass: 1,
    position: [shouldersDistance/2,lowerLegLength / 2],
  });
  lowerLeftLeg.addShape(lowerLegShapeLeft);
  lowerRightLeg.addShape(lowerLegShapeRight);
  char_obj.bodys.push(lowerLeftLeg, lowerRightLeg);
  // Upper legs
  var upperLeftLeg = new p2.Body({
    mass: 1,
    position: [-shouldersDistance/2,lowerLeftLeg.position[1]+lowerLegLength/2+upperLegLength / 2],
  });
  var upperRightLeg = new p2.Body({
    mass: 1,
    position: [shouldersDistance/2,lowerRightLeg.position[1]+lowerLegLength/2+upperLegLength / 2],
  });
  upperLeftLeg.addShape(upperLegShapeLeft);
  upperRightLeg.addShape(upperLegShapeRight);
  char_obj.bodys.push(upperLeftLeg, upperRightLeg);
  // Pelvis
  var pelvis = new p2.Body({
    mass: 1,
    position: [0, upperLeftLeg.position[1]+upperLegLength/2+pelvisLength/2],
  });
  pelvis.addShape(pelvisShape);
  char_obj.bodys.push(pelvis);
  // Upper body
  var upperBody = new p2.Body({
    mass: 1,
    position: [0,pelvis.position[1]+pelvisLength/2+upperBodyLength/2],
  });
  upperBody.addShape(upperBodyShape);
  char_obj.bodys.push(upperBody);
  // Head
  var head = new p2.Body({
    mass: 1,
    position: [0,upperBody.position[1]+upperBodyLength/2+headRadius+neckLength],
  });
  head.addShape(headShape);
  char_obj.bodys.push(head);
  // Upper arms
  var upperLeftArm = new p2.Body({
    mass: 1,
    position: [-shouldersDistance/2-upperArmLength/2, upperBody.position[1]+upperBodyLength/2],
  });
  var upperRightArm = new p2.Body({
    mass: 1,
    position: [shouldersDistance/2+upperArmLength/2, upperBody.position[1]+upperBodyLength/2],
  });
  upperLeftArm.addShape(upperArmShapeLeft);
  upperRightArm.addShape(upperArmShapeRight);
  char_obj.bodys.push(upperLeftArm, upperRightArm);
  // lower arms
  var lowerLeftArm = new p2.Body({
    mass: 1,
    position: [ upperLeftArm.position[0] - lowerArmLength/2 - upperArmLength/2,
                upperLeftArm.position[1]],
  });
  var lowerRightArm = new p2.Body({
    mass: 1,
    position: [ upperRightArm.position[0] + lowerArmLength/2 + upperArmLength/2,
                upperRightArm.position[1]],
  });
  lowerLeftArm.addShape(lowerArmShapeLeft);
  lowerRightArm.addShape(lowerArmShapeRight);
  char_obj.bodys.push(lowerLeftArm, lowerRightArm);
  // Neck joint
  var neckJoint = new p2.RevoluteConstraint(head, upperBody, {
    localPivotA: [0,-headRadius-neckLength/2],
    localPivotB: [0,upperBodyLength/2],
  });
  neckJoint.setLimits(-Math.PI / 8, Math.PI / 8);
  char_obj.constraints.push(neckJoint);
  // Knee joints
  var leftKneeJoint = new p2.RevoluteConstraint(lowerLeftLeg, upperLeftLeg, {
    localPivotA           : [0, lowerLegLength/2],
    localPivotB           : [0,-upperLegLength/2],
  });
  var rightKneeJoint= new p2.RevoluteConstraint(lowerRightLeg, upperRightLeg, {
    localPivotA           : [0, lowerLegLength/2],
    localPivotB           : [0,-upperLegLength/2],
  });
  leftKneeJoint.setLimits(-Math.PI / 8, Math.PI / 8);
  rightKneeJoint.setLimits(-Math.PI / 8, Math.PI / 8);
  char_obj.constraints.push(leftKneeJoint, rightKneeJoint);
  // Hip joints
  var leftHipJoint = new p2.RevoluteConstraint(upperLeftLeg, pelvis, {
    localPivotA: [0, upperLegLength/2],
    localPivotB: [-shouldersDistance/2,-pelvisLength/2],
  });
  var rightHipJoint = new p2.RevoluteConstraint(upperRightLeg, pelvis, {
    localPivotA: [0, upperLegLength/2],
    localPivotB: [shouldersDistance/2,-pelvisLength/2],
  });
  leftHipJoint.setLimits(-Math.PI/8, Math.PI/8);
  rightHipJoint.setLimits(-Math.PI/8, Math.PI/8);
  char_obj.constraints.push(leftHipJoint, rightHipJoint);
  // Spine
  var spineJoint = new p2.RevoluteConstraint(pelvis, upperBody, {
    localPivotA: [0,pelvisLength/2],
    localPivotB: [0,-upperBodyLength/2],
  });
  spineJoint.setLimits(-Math.PI / 8, Math.PI / 8);
  char_obj.constraints.push(spineJoint);
  // Shoulders
  var leftShoulder = new p2.RevoluteConstraint(upperBody, upperLeftArm, {
    localPivotA:[-shouldersDistance/2, upperBodyLength/2],
    localPivotB:[upperArmLength/2,0],
  });
  var rightShoulder= new p2.RevoluteConstraint(upperBody, upperRightArm, {
    localPivotA:[shouldersDistance/2,  upperBodyLength/2],
    localPivotB:[-upperArmLength/2,0],
  });
  leftShoulder.setLimits(-Math.PI / 3, Math.PI / 3);
  rightShoulder.setLimits(-Math.PI / 3, Math.PI / 3);
  char_obj.constraints.push(leftShoulder, rightShoulder);
  // Elbow joint
  var leftElbowJoint = new p2.RevoluteConstraint(lowerLeftArm, upperLeftArm, {
    localPivotA: [lowerArmLength/2, 0],
    localPivotB: [-upperArmLength/2,0],
  });
  var rightElbowJoint= new p2.RevoluteConstraint(lowerRightArm, upperRightArm, {
    localPivotA:[-lowerArmLength/2,0],
    localPivotB:[upperArmLength/2,0],
  });
  leftElbowJoint.setLimits(-Math.PI / 8, Math.PI / 8);
  rightElbowJoint.setLimits(-Math.PI / 8, Math.PI / 8);
  char_obj.constraints.push(leftElbowJoint, rightElbowJoint);

  // jump method
  char_obj.jumping = 0;

  // run method
  char_obj.running = 0;
  char_obj.run = function () {
    // console.log((direction > 0) ? 'forward' : 'backword');
    if (this.running > 0) { // forward
      for (var i = 0; i < this.bodys.length; i++) {
        this.bodys[i].force[0] = 5;
      }
    } else if (this.running < 0) {
      for (var i = 0; i < this.bodys.length; i++) {
        this.bodys[i].force[0] = -5;
      }
    }
  };

  return char_obj;
}
