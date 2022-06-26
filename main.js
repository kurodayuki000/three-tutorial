import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

let scene, camera, renderer, pointLight, controls;

window.addEventListener("load", () => init() );

const init = () => {
  //シーンを追加
  scene = new THREE.Scene();

  //カメラを追加
  camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, +500);

  //レンダラーを追加
  renderer = new THREE.WebGLRenderer({ alpha: true });
  document.body.appendChild(renderer.domElement);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.render(scene, camera);

  //テクスチャを追加
  let textures = new THREE.TextureLoader().load("./textures/earth.jpg");

  ///ジオメトリを作成
  let ballFGeometry = new THREE.SphereGeometry(100, 64, 32);
  //マテリアルを作成
  let ballMarerial = new THREE.MeshPhysicalMaterial({ map: textures });
  //メッシュ化
  let ballMesh = new THREE.Mesh(ballFGeometry, ballMarerial);
  scene.add(ballMesh);

  //並行光源を追加
  let directionalLight = new THREE.DirectionalLight(0xffffff, 2);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  //ポイント光源
  pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(-200, -200, -200);
  scene.add(pointLight);

  //ポイント光源がどこにあるか特定する
  let pointLightHelper = new THREE.PointLightHelper(pointLight, 30);
  scene.add(pointLightHelper);

  //マウス操作ができるように
  controls = new OrbitControls(camera, renderer.domElement);

  window.addEventListener("resize", onWindowResize );
  animate();
};

//ブラウザのリサイズに対応
const onWindowResize = () => {
  //レンラーのサイズを随時更新
  renderer.setSize(window.innerWidth, window.innerHeight);

  //カメラのアスペクト比を正す
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

const animate = () => {
  //ポイント光源を巡回させる
  pointLight.position.set(
    200 * Math.sin(Date.now() / 500),
    // 1656222333822
    200 * Math.sin(Date.now() / 1000),
    200 * Math.cos(Date.now() / 500)
  );
  //レンダリング
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};
