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

// Sívalningur búinn til, splæst saman geometry og material
let cylinder = new THREE.Mesh(
  new THREE.CylinderGeometry(2, 2, 30, 32),
  new THREE.MeshStandardMaterial({
    color: 0xEF8354,
    roughness: 0.8,
    metalness: 0
  })
);
cylinder.position.y += 15;
cylinder.castShadow = true; // Kastar af sér skugga
scene.add(cylinder);

// Kassi búinn til, hjálpar manni að sjá fyrir sér hvar jörðin er
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

// Umhverfisljós sem lýsir allt upp aðeins
let ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

// Kastari sem býr til skuggana
let pointLight = new THREE.PointLight(0xffffff, 1.0);
pointLight.position.set(25, 50, 25);
pointLight.castShadow = true; // Ljósið hefur þann eiginleika að gera skugga
pointLight.shadow.mapSize.width = 1024;
pointLight.shadow.mapSize.height = 1024;
scene.add(pointLight);

// Stýringar svo hægt sé að hreyfa sig um
let controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.target = new THREE.Vector3(0, 15, 0); // Beina myndavélinni á uppgefinn vigur
controls.maxPolarAngle = Math.PI / 2; // Ekki er hægt að fara með myndavélina neðra en núll gráður
controls.minDistance = 50; // Takmörk á því hvað er hægt að zooma langt inn
controls.maxDistance = 220; // Takmörk á því hvað er hægt að zooma langt út

// Stanslaust framkallað nýja ramma
let renderLoop = () => {
  controls.update();
  cylinder.rotation.x += .04; // Rotation um x ásinn
  cylinder.rotation.z += .09;

  // Nýr rammi renderaður á skjáinn miðað við hvar
  // myndavélin er og hvað er að gerast í senunni
  renderer.render(scene, camera);

  // Keyra nýann ramma
  requestAnimationFrame(renderLoop);
}

// Init
renderLoop();