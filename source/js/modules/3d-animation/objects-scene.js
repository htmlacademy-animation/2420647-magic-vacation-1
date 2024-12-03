import * as THREE from "three";
import { Pyramid } from "./3d-objects/pyramid";
import { Lantern } from "./3d-objects/lantern";
import { Snowman } from "./3d-objects/snowman";

export class ObjectsScene extends THREE.Group {
  constructor() {
    super();
    this.constructChildren();
  }
  constructChildren() {
    this.addPyramid();
    this.addLantern();
    this.addSnowman();
  }
  addPyramid() {
    const pyramid = new Pyramid();
    pyramid.position.set(0, -30, 0);
    this.add(pyramid);
  }

  addLantern() {
    const lantern = new Lantern();
    lantern.position.set(200, -100, 0);
    this.add(lantern);
  }

  addSnowman() {
    const snowman = new Snowman();
    snowman.position.set(-200, 0, 0);
    this.add(snowman);
  }
}
