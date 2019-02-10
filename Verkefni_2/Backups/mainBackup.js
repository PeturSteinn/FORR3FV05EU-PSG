if (!WEBGL.isWebGL2Available()) {
  // document.body.appendChild(WEBGL.getWebGL2ErrorMessage());
  console.log("WebGL2 er ekki available");
} else {
  console.log("WebGL2 er available");
}

// const material = new THREE.ShaderMaterial({
//   vertexShader: document.getElementById('vs').textContent.trim(),
//   fragmentShader: document.getElementById('fs').textContent.trim()
// });

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const canvas = document.createElement('canvas');
const context = canvas.getContext('webgl2');
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  context: context,
  alpha: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(20, 20, 20);
// const material = new THREE.MeshBasicMaterial({
//   color: 0x00ff00
// });
const material = new THREE.MeshPhongMaterial({
  color: 0xfd59d7
});
// const material = new THREE.MeshNormalMaterial();


const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 100;

var light = new THREE.PointLight(0xFFFF00);
light.position.set(0, 0, 50);
scene.add(light);

// so many lights
var light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 1, 0);
scene.add(light);

var light = new THREE.DirectionalLight(0xffffff, 0.5);
light.position.set(0, -1, 0);
scene.add(light);

var light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 0, 0);
scene.add(light);

var light = new THREE.DirectionalLight(0xffffff, 0.5);
light.position.set(0, 0, 1);
scene.add(light);

var light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 0, -1);
scene.add(light);

var light = new THREE.DirectionalLight(0xffffff, 0.5);
light.position.set(-1, 0, 0);
scene.add(light);

// for (var i = 0, l = geometry.vertices.length; i < l; i++) {
//   // we'll move the x & y position of each vertice by a random amount
//   geometry.vertices[i].x += -10 + Math.random() * 20;
//   geometry.vertices[i].y += -10 + Math.random() * 20;
// }

cube.rotation.x += 0.9;
cube.rotation.y -= 0.9;

function animate() {

  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  // cube.position.x += 0.1;
  // cube.position.y += 0.1;
  // cube.position.z -= 0.1;

  camera.updateProjectionMatrix();

  renderer.render(scene, camera);
}

requestAnimationFrame(animate)


// dat gui
var gui = new dat.GUI();
var cameraGui = gui.addFolder("camera position");
cameraGui.add(camera.position, 'x');
cameraGui.add(camera.position, 'y');
cameraGui.add(camera.position, 'z');
cameraGui.open();

var cameraGui = gui.addFolder("camera projection");
cameraGui.add(camera, "fov");
cameraGui.open();

var lightGui = gui.addFolder("light position");
lightGui.add(light.position, 'x');
lightGui.add(light.position, 'y');
lightGui.add(light.position, 'z');
lightGui.open();

var cubeGui = gui.addFolder("cube position");
cubeGui.add(cube.position, 'x');
cubeGui.add(cube.position, 'y');
cubeGui.add(cube.position, 'z');
cubeGui.open();