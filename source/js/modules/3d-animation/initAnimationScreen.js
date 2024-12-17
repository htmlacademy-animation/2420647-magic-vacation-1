import { Scene3d } from "./3d-scene";

export const scene = new Scene3d({
  elementId: `animation-screen-3d`,
  cameraConfig: { fov: 35, positionZ: 1000, near: 1, far: 5500 },
  enableAnimation: true,
});
