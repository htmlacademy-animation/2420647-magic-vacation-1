import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
const objectsConfig = {
  watermelon: {
    type: `gltf`,
    path: `./3d/module-6/scene-0-objects/watermelon.gltf`,
  },
  suitcase: {
    type: `gltf`,
    path: `./3d/module-6/scene-0-objects/suitcase.gltf`,
  },
  airplane: {
    type: `obj`,
    path: `./3d/module-6/scene-0-objects/airplane.obj`,
  },
};
const objLoad = (path, onLoad) => {
  const loaderObj = new OBJLoader();
  loaderObj.load(path, onLoad);
};
const gtlfLoad = (path, onLoad) => {
  const loaderGltf = new GLTFLoader();
  loaderGltf.load(path, onLoad);
};
const onLoad = (obj3d, material, callback) => {
  if (material) {
    obj3d.traverse((child) => {
      if (child.isMesh) {
        child.material = material;
      }
    });
  }
  if (typeof callback === `function`) {
    callback.call(null, obj3d);
  }
};
export const objectLoader = (key, material, callback) => {
  const params = objectsConfig[key];
  if (!params) {
    return;
  }
  const onGltfComplete = (gltf) => {
    if (!gltf.scene) {
      return;
    }
    onLoad(gltf.scene, material, callback);
  };
  switch (params.type) {
    case `gltf`:
      gtlfLoad(params.path, onGltfComplete);
      break;
    default:
      objLoad(params.path, (model) => onLoad(model, material, callback));
      break;
  }
};
