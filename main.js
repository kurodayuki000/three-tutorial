import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const canvas = document.getElementById("canvas");

//シーン
const scene = new THREE.Scene();

//サイズ
const sizes = {
  width: innerWidth,
  height: innerHeight
}

//カメラ
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  3000
  );

camera.position.set(0, 500, 1000);
scene.add(camera);

//レンダラー
const renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(window.devicePixelRatio);

// envimage
const urls = [
  "./envimage/right.png",
  "./envimage/left.png",
  "./envimage/up.png",
  "./envimage/down.png",
  "./envimage/front.png",
  "./envimage/back.png"
];

const loder = new THREE.CubeTextureLoader();
scene.background = loder.load(urls);

//controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(500);

//cubecamera
const cubeCamera = new THREE.CubeCamera(1, 1000, cubeRenderTarget);
scene.add(cubeCamera);

//object
// const material = new THREE.MeshBasicMaterial({
//   envMap: cubeRenderTarget.texture,
//   reflectivity: 1
// });
// const geometry = new THREE.SphereGeometry(350, 50, 50);
// const sphere = new THREE.Mesh(geometry,material);
// scene.add(sphere);

const animation = () => {
  controls.update();
  cubeCamera.update(renderer, scene);
  renderer.render(scene, camera);
  window.requestAnimationFrame(animation);
}

animation();

