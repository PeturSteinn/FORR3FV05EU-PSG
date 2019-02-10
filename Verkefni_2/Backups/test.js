// Athuga ef stuðningur er fyrir WebGL2
if (!WEBGL.isWebGL2Available()) {
  // document.body.appendChild(WEBGL.getWebGL2ErrorMessage());
  console.log("Stuðningur er ekki til fyrir WebGL2!");
} else {
  console.log("Stuðningur er til fyrir WebGL2!");
}

// Almennt setup
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 30, 50);
camera.up = new THREE.Vector3(0, 1, 0);
// camera.lookAt(new THREE.Vector3(0, 10, 0))
let canvas = document.createElement('canvas');
let context = canvas.getContext('webgl2');
let renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  context: context,
  antialiasing: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xddf6ff);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);




// Skugga-material búið til, skugginn verður með litinn #a6b8bf og opacity .4
let shadowMaterial = new THREE.ShadowMaterial({
  color: 0xa6b8bf,
  opacity: .4
});

// Jörð búin til úr þunnum kassa og fær skugga-material
let groundMesh = new THREE.Mesh(
  new THREE.BoxGeometry(100, .1, 100),
  shadowMaterial
);
groundMesh.receiveShadow = true; // Jörðin má birta skugga
scene.add(groundMesh);

// A simple geometric shape with a flat material
let tube = new THREE.Mesh(
  new THREE.CylinderGeometry(2, 2, 30, 32),
  new THREE.MeshStandardMaterial({
    color: 0xEF8354,
    roughness: 0.8,
    metalness: 0
  })
);
tube.position.y += 15;
// tube.rotateZ(Math.PI / 3);
tube.castShadow = true;
this.rotationSpeed = Math.random() * 0.02 + 0.005;
// this.rotationPosition = Math.random();
scene.add(tube);

let cube = new THREE.Mesh(
  new THREE.BoxGeometry(10, 10, 10),
  new THREE.MeshStandardMaterial({
    color: 0x4F5D75,
    metalness: 0
  })
);
cube.position.x = 20;
cube.position.y += 5;
cube.position.z = -10;
cube.castShadow = true;
scene.add(cube);

// Ljós

// Ambient ljós sem lýsir alltsaman aðeins
let ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

// Add a point light that will cast shadows
// let sun = new THREE.sun(0xffffff, 1);
// Add a point light that will cast shadows
let pointLight = new THREE.PointLight(0xffffff, 1.0);
pointLight.position.set(25, 50, 25);
pointLight.castShadow = true;
pointLight.shadow.mapSize.width = 1024;
pointLight.shadow.mapSize.height = 1024;
scene.add(pointLight);

const rotateItem = (item) => {
  item.rotationPosition += item.rotationSpeed;
  // item.rotation.y = (Math.sin(this.rotationPosition));
}

// Render the scene/camera combnation
renderer.render(scene, camera);

let controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.target = new THREE.Vector3(0, 15, 0);
controls.maxPolarAngle = Math.PI / 2;
controls.minDistance = 50;
controls.maxDistance = 220;
controls.addEventListener('change', () => {
  renderer.render(scene, camera);
});

let renderLoop = () => {
  // Update camera position based on the controls
  controls.update();
  tube.rotation.x += .04;
  tube.rotation.z += .04;

  // rotateItem(tube);

  // Re-render the scene
  renderer.render(scene, camera);

  // Loop
  requestAnimationFrame(renderLoop);
}

// Init
requestAnimationFrame(renderLoop);