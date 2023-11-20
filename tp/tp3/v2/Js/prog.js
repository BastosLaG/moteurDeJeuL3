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

// Créez un tableau pour stocker des sphères
let spheres = [];

// Fonction pour ajouter une sphère à la scène
function addSphere(radius, nbStack, xc, yc, zc) {
  let geometry = new THREE.SphereGeometry(radius, 100, nbStack);
  let material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
  let newSphere = new THREE.Mesh(geometry, material);
  newSphere.position.set(xc, yc, zc);
  spheres.push(newSphere);
  scene.add(newSphere);
}

// Ajoutez 5 sphères à la scène en utilisant une boucle
for (let i = 0; i < 5; i++) {
  addSphere(1.0 + 0.2 * i, 2 + i, -1.5 + 1.5 * i, 0.0, -1 * i);
}

// Définissez la position de la caméra
camera.position.set(1, 0, 4);
camera.lookAt(1, 0, 0);

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
let updateTime = 20, elapsed = updateTime + 1;

// Fonction pour mettre à jour la scène et les sphères
function update(timestamp) {
  if (previousTimeStamp != undefined) {
    elapsed = timestamp - previousTimeStamp;
  }
  if (elapsed > updateTime) {
    previousTimeStamp = timestamp;
    for (let i = 0; i < 5; i++) {
      spheres[i].rotation.x += 0.01 + 0.001 * i;
      spheres[i].rotation.y += 0.01 + 0.001 * i;
    }
  }
  renderer.render(scene, camera);
  requestAnimationFrame(update);
}

// Écouteur d'événements pour le redimensionnement de la fenêtre
window.addEventListener('resize', onWindowResize, false);

// Démarrez l'animation en appelant la fonction "update" de manière récursive
requestAnimationFrame(update);
