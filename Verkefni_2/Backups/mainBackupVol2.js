// Athuga ef stuðningur er fyrir WebGL2
if (!WEBGL.isWebGL2Available()) {
  // document.body.appendChild(WEBGL.getWebGL2ErrorMessage());
  console.log("Stuðningur er ekki til fyrir WebGL2!");
} else {
  console.log("Stuðningur er til fyrir WebGL2!");
}

// Almennt setup
let geometry, material;
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 30, 50);
camera.lookAt(new THREE.Vector3(0, 15, 0))
let canvas = document.createElement('canvas');
let context = canvas.getContext('webgl2');
let renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  context: context,
  antialiasing: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xfff6e6);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

// /Almennt setup

// Ljós
let ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambientLight);

// Add a point light that will cast shadows
let pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(25, 50, 25);
pointLight.castShadow = true;
pointLight.shadow.mapSize.width = 1024;
pointLight.shadow.mapSize.height = 1024;
scene.add(pointLight);

// /Ljós

// Objects

let groundMesh = new THREE.Mesh(
  new THREE.BoxGeometry(100, .1, 100),
  new THREE.ShadowMaterial({
    color: 0xeeeeee,
    opacity: 0.5
  })
);
groundMesh.receiveShadow = true;
scene.add(groundMesh);

/*
let shapeOne = new THREE.Mesh(
  new THREE.OctahedronGeometry(10, 1),
  new THREE.MeshStandardMaterial({
    color: 0xff0051,
    flatShading: true,
    metalness: 0,
    roughness: 0.8
  })
);
shapeOne.position.x += 30;
shapeOne.position.y += 10;
shapeOne.position.z -= 30;
shapeOne.rotateZ(Math.PI / 3);
shapeOne.castShadow = true;
scene.add(shapeOne);

let shapeTwo = new THREE.Mesh(
  new THREE.OctahedronGeometry(5, 1),
  new THREE.MeshStandardMaterial({
    color: 0x47689b,
    flatShading: true,
    metalness: 0,
    roughness: 0.8
  })
);
shapeTwo.position.y += 5;
shapeTwo.position.x += 45;
shapeTwo.rotateZ(Math.PI / 5);
shapeTwo.castShadow = true;
scene.add(shapeTwo);
*/
// /Objects

// Custom

const addNoise = (geometry, noiseX, noiseY, noiseZ) => {

  noiseX = noiseX || 2;
  noiseY = noiseY || noiseX;
  noiseZ = noiseZ || noiseY;

  // loop through each vertix in the geometry and move it randomly
  for (let i = 0; i < geometry.vertices.length; i++) {
    let v = geometry.vertices[i];
    v.x += -noiseX / 2 + Math.random() * noiseX;
    v.y += -noiseY / 2 + Math.random() * noiseY;
    v.z += -noiseZ / 2 + Math.random() * noiseZ;
  }

  return geometry;
}

let Chungus = function() {
  THREE.Group.apply(this, arguments);

  this.rotationSpeed = Math.random() * 0.02 + 0.005;
  this.rotationPosition = Math.random();

  const gltfLoader = new THREE.GLTFLoader();
  const url = 'models/big_chungus/scene.gltf';
  gltfLoader.load(url, (gltf) => {
    root = gltf.scene;
    root.castShadow = true;
    root.receiveShadow = true;
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
big_chungus.position.x += 20;
big_chungus.position.y += 10;
big_chungus.position.z += 10;
scene.add(big_chungus);

console.log(big_chungus);

let Decoration = function() {

  // Run the Group letructor with the given arguments
  THREE.Group.apply(this, arguments);

  this.rotationSpeed = Math.random() * 0.02 + 0.005;
  this.rotationPosition = Math.random();

  // A random color assignment
  let colors = ['#ff0051', '#f56762', '#a53c6c', '#f19fa0', '#72bdbf', '#47689b'];

  // The main bauble is an Octahedron
  let bauble = new THREE.Mesh(
    addNoise(new THREE.OctahedronGeometry(12, 1), 2),
    // new THREE.OctahedronGeometry(12, 1),
    new THREE.MeshStandardMaterial({
      color: colors[Math.floor(Math.random() * colors.length)],
      flatShading: true,
      metalness: 0,
      roughness: 0.8,
      refractionRatio: 0.25
    })
  );
  bauble.castShadow = true;
  bauble.receiveShadow = true;
  bauble.rotateZ(Math.random() * Math.PI * 2);
  bauble.rotateY(Math.random() * Math.PI * 2);
  this.add(bauble);

  // A cylinder to represent the top attachement
  let shapeOne = new THREE.Mesh(
    addNoise(new THREE.CylinderGeometry(4, 6, 10, 6, 1), 0.5),
    new THREE.MeshStandardMaterial({
      color: 0xf8db08,
      flatShading: true,
      metalness: 0,
      roughness: 0.8,
      refractionRatio: 0.25
    })
  );
  shapeOne.position.y += 8;
  shapeOne.castShadow = true;
  shapeOne.receiveShadow = true;
  this.add(shapeOne);

  // A Torus to represent the top hook
  let shapeTwo = new THREE.Mesh(
    addNoise(new THREE.TorusGeometry(2, 1, 6, 4, Math.PI), 0.2),
    new THREE.MeshStandardMaterial({
      color: 0xf8db08,
      flatShading: true,
      metalness: 0,
      roughness: 0.8,
      refractionRatio: 0.25

    })
  );
  shapeTwo.position.y += 13;
  shapeTwo.castShadow = true;
  shapeTwo.receiveShadow = true;
  this.add(shapeTwo);

};

Decoration.prototype = Object.create(THREE.Group.prototype);
Decoration.prototype.constructor = Decoration;

Decoration.prototype.updatePosition = function() {
  this.rotationPosition += this.rotationSpeed;
  this.rotation.y = (Math.sin(this.rotationPosition));
};


let decorations = [];

decoOne = new Decoration();
decoOne.position.x += 20;
decoOne.position.y += 10;
decoOne.position.z += 10;
decorations.push(decoOne);
// scene.add(decoOne);

decoTwo = new Decoration();
decoTwo.position.x -= 10;
decoTwo.position.y += 10;
decoTwo.position.z -= 10;
decorations.push(decoTwo);
// scene.add(decoTwo)




// /Custom

// Run
/*
renderer.render(scene, camera);
let controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.target = new THREE.Vector3(0, 15, 0);
controls.maxPolarAngle = Math.PI / 2;
controls.addEventListener('change', function() {
  renderer.render(scene, camera);
});
*/
let controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.target = new THREE.Vector3(0, 15, 0);
// controls.maxPolarAngle = Math.PI / 2;
// controls.minDistance = 50;
// controls.maxDistance = 220;
controls.addEventListener('change', function() {
  renderer.render(scene, camera);
});
console.log(decorations);
let renderLoop = () => {
  // Update camera position based on the controls
  controls.update();

  // for (var i = 0; i < decorations.length; i++) {
  //   decorations[i].updatePosition();
  //   // console.log(decorations[i].rotationPosition);
  //   // console.log(decorations[i].rotation.y);
  // }
  big_chungus.updatePosition();

  // this.rotationPosition += this.rotationSpeed;
  // this.rotation.y = (Math.sin(this.rotationPosition));

  // Re-render the scene
  renderer.render(scene, camera);

  // Loop
  requestAnimationFrame(renderLoop);
}

// Init
requestAnimationFrame(renderLoop);