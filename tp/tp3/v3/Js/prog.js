// Sélectionnez le canevas HTML avec l'ID "myCanvas"
let cnv = document.querySelector('#myCanvas');

// Créez un rendu WebGL en utilisant le canevas sélectionné
let renderer = new THREE.WebGLRenderer({ canvas: cnv, antialias: true });

// Obtenez la largeur et la hauteur de la fenêtre
let width = window.innerWidth;
let height = window.innerHeight;

// Définissez la taille du rendu WebGL
renderer.setSize(width, height);

// Créez une scène 3D
let scene = new THREE.Scene();

// Créez une caméra perspective
let camera = new THREE.PerspectiveCamera(75, width / height, 1, 1000);

// Ajoutez la caméra à la scène
scene.add(camera);

// Définissez le nombre de secteurs et de piles pour la sphère
let nbSector = 100;
let nbStack = 5;

// Initialisez un tableau pour stocker les points
let points = [];

// Calculez les étapes de secteur et de pile
let sectorStep = 2 * Math.PI / nbSector;
let stackStep = Math.PI / nbStack;

// Initialisez l'angle theta
let theta = -Math.PI;

// Créez des points pour former une sphère
for (let i = 0; i < nbSector; i++) {
  let phi = -Math.PI / 2;
  for (let j = 0; j < nbStack; j++) {
    let x = Math.cos(theta) * Math.cos(phi);
    let y = Math.sin(theta) * Math.cos(phi);
    let z = Math.sin(phi);
    let x2 = Math.cos(theta + sectorStep) * Math.cos(phi);
    let y2 = Math.sin(theta + sectorStep) * Math.cos(phi);
    let z2 = Math.sin(phi);
    let x3 = Math.cos(theta) * Math.cos(phi + stackStep);
    let y3 = Math.sin(theta) * Math.cos(phi + stackStep);
    let z3 = Math.sin(phi + stackStep);
    let x4 = Math.cos(theta + sectorStep) * Math.cos(phi + stackStep);
    let y4 = Math.sin(theta + sectorStep) * Math.cos(phi + stackStep);
    let z4 = Math.sin(phi + stackStep);

    points.push(new THREE.Vector3(x, y, z));
    points.push(new THREE.Vector3(x2, y2, z2));
    points.push(new THREE.Vector3(x, y, z));
    points.push(new THREE.Vector3(x3, y3, z3));

    phi += stackStep;
  }

  theta += sectorStep;
}

// Créez une géométrie en utilisant les points
let geometry = new THREE.BufferGeometry().setFromPoints(points);

// Créez un matériau pour la sphère
let material = new THREE.MeshBasicMaterial({ color: 0xffffff });

// Créez une sphère en utilisant la géométrie et le matériau
let mySphere = new THREE.Line(geometry, material);

// Ajoutez la sphère à la scène
scene.add(mySphere);

// Définissez la position de la caméra
camera.position.set(0, 0, 2);
camera.lookAt(0, 0, 0);

// Fonction pour gérer le redimensionnement de la fenêtre
function onWindowResize() {
  width = window.innerWidth;
  height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

// Initialisez des variables pour la gestion des animations
let previousTimeStamp = undefined;
let updateTime = 20;
let elapsed = updateTime + 1;

// Fonction pour mettre à jour la scène et faire tourner la sphère
function update(timestamp) {
  if (previousTimeStamp !== undefined) {
    elapsed = timestamp - previousTimeStamp;
  }
  if (elapsed > updateTime) {
    previousTimeStamp = timestamp;
    mySphere.rotation.x += 0.001;
    mySphere.rotation.y += 0.001;
  }
  renderer.render(scene, camera);
  requestAnimationFrame(update);
}

// Écouteur d'événements pour le redimensionnement de la fenêtre
window.addEventListener('resize', onWindowResize, false);

// Démarrez l'animation en appelant la fonction "update" de manière récursive
requestAnimationFrame(update);
