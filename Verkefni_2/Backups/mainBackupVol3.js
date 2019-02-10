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
camera.position.set(-128, 149, -100);
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

// /Almennt setup

// Floor

// let groundMesh = new THREE.Mesh(
//   new THREE.BoxGeometry(100, .1, 100),
//   new THREE.ShadowMaterial({
//     color: 0xeeeeee,
//     opacity: 0.5
//   })
// );
// groundMesh.receiveShadow = true;
// scene.add(groundMesh);

// A basic material that shows the geometry wireframe.
var shadowMaterial = new THREE.ShadowMaterial({
  color: 0xeeeeee
});
shadowMaterial.opacity = 1;
var groundMesh = new THREE.Mesh(
  new THREE.BoxGeometry(1000, .1, 1000),
  shadowMaterial
);
groundMesh.receiveShadow = true;
scene.add(groundMesh);
var shapeOne = new THREE.Mesh(
  new THREE.OctahedronGeometry(10, 1),
  new THREE.MeshStandardMaterial({
    color: 0xff0051,
    flatShading: true,
    metalness: 0,
    roughness: 0.8
  })
);
shapeOne.position.y += 10;
shapeOne.rotateZ(Math.PI / 3);
shapeOne.castShadow = true;
scene.add(shapeOne);

// let shadowMaterial = new THREE.ShadowMaterial({
//   color: 0x000000
// });
// shadowMaterial.opacity = 1;
// var groundMesh = new THREE.Mesh(
//   new THREE.PlaneGeometry(10000, 10000),
//   shadowMaterial
// );
// plane.position.y = 0;
// plane.rotateX(-Math.PI / 2);
// plane.receiveShadow = true;
// scene.add(plane);
//
// let shadowMaterial = new THREE.ShadowMaterial({
//   color: 0x000000
// });
// shadowMaterial.opacity = 0.5;
// let groundMesh = new THREE.Mesh(
//   new THREE.BoxGeometry(1000, .1, 1000),
//   shadowMaterial
// );
// groundMesh.receiveShadow = true;
// scene.add(groundMesh);
// /Floor

// Custom

let Chungus = function() {
  THREE.Group.apply(this, arguments);

  this.rotationSpeed = Math.random() * 0.02 + 0.005;
  this.rotationPosition = Math.random();

  const gltfLoader = new THREE.GLTFLoader();
  const url = 'models/big_chungus/scene.gltf';
  gltfLoader.load(url, (gltf) => {
    root = gltf.scene;
    // root.castShadow = true;
    // root.receiveShadow = true;
    this.add(root);
  });
}

Chungus.prototype = Object.create(THREE.Group.prototype);
Chungus.prototype.constructor = Chungus;

Chungus.prototype.updatePosition = function() {
  this.rotationPosition += this.rotationSpeed;
  this.rotation.y = (Math.sin(this.rotationPosition));
};

big_chungus = new Chungus();
console.log(big_chungus);
big_chungus.position.x = 0;
big_chungus.position.y = 85;
big_chungus.position.z = 0;
big_chungus.castShadow = true;
big_chungus.receiveShadow = true;
rotateObject(big_chungus, 0, 120, 0)
console.log(big_chungus);
scene.add(big_chungus);

// /Custom

function rotateObject(object, degreeX = 0, degreeY = 0, degreeZ = 0) {
  object.rotateX(THREE.Math.degToRad(degreeX));
  object.rotateY(THREE.Math.degToRad(degreeY));
  object.rotateZ(THREE.Math.degToRad(degreeZ));
}


// Ljós
let ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambientLight);

// Add a point light that will cast shadows
// let pointLight = new THREE.PointLight(0xffffff, 1);
// pointLight.position.set(25, 50, 25);
// pointLight.castShadow = true;
// pointLight.shadow.mapSize.width = 1024;
// pointLight.shadow.mapSize.height = 1024;
// scene.add(pointLight);

let sun = new THREE.DirectionalLight(0xffffff, 1.0);
// sun.target = big_chungus;
// sun.castShadow = true;
sun.position.x = 0
sun.position.y = 400
// sun.position.set(25, 50, 25);
sun.castShadow = true;
sun.shadow.mapSize.width = 1024;
sun.shadow.mapSize.height = 1024;
scene.add(sun);

// /Ljós

// Run

let controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.target = new THREE.Vector3(0, 100, 0);
controls.maxPolarAngle = Math.PI / 2;
controls.minDistance = 50;
controls.maxDistance = 220;
controls.addEventListener('change', () => {
  renderer.render(scene, camera);
});

let renderLoop = () => {
  // Update camera position based on the controls
  controls.update();
  big_chungus.updatePosition();

  // Re-render the scene
  renderer.render(scene, camera);

  // Loop
  requestAnimationFrame(renderLoop);
}

// Init
requestAnimationFrame(renderLoop);