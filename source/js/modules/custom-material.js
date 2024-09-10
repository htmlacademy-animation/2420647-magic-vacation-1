import vertexShader from "./shaders/custom-vertex-shader.glsl";
import fragmentShader from "./shaders/custom-fragment-shader.glsl";

export default (texture, arg) => ({
  uniforms: {
    map: {
      value: texture,
    },
    options: {
      value: arg,
    },
  },
  vertexShader,
  fragmentShader,
});
