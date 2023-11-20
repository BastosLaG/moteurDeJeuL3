// Sélectionnez le canevas HTML par son ID
let cnv = document.querySelector('#myCanvas');

// Créez un objet de rendu WebGL avec des paramètres, y compris l'antialiasing
let renderer = new THREE.WebGLRenderer({ canvas: cnv, antialias: true });

// Définissez la taille du rendu pour correspondre à la fenêtre du navigateur
renderer.setSize(window.innerWidth, window.innerHeight);

// Créez une scène 3D pour contenir tous les objets
let scene = new THREE.Scene();

// Créez une caméra perspective avec des paramètres
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);

// Définissez la position de la caméra
camera.position.set(0, 0, 4);

// Faites en sorte que la caméra regarde un point précis
camera.lookAt(0, 0, 0);

// Ajoutez la caméra à la scène
scene.add(camera);

// Créez une géométrie de sphère avec des paramètres
let geometry = new THREE.SphereGeometry(1.0, 20, 20);

// Chargez une texture pour la sphère à partir d'un fichier image
let texture = new THREE.TextureLoader().load("assets/planet.png");

// Créez un matériau de base pour la sphère en utilisant la texture
let material = new THREE.MeshBasicMaterial({ map: texture });

// Créez un objet de sphère en combinant la géométrie et le matériau
let sphere = new THREE.Mesh(geometry, material);

// Ajoutez la sphère à la scène
scene.add(sphere);

// Fonction appelée lors du redimensionnement de la fenêtre
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Variables pour la gestion de l'animation
let previousTimeStamp = undefined;
let updateTime = 20, elapsed = updateTime + 1;

// Fonction pour mettre à jour et rendre la scène
function update(timestamp) {
  if (previousTimeStamp !== undefined) {
    elapsed = timestamp - previousTimeStamp;
  }
  if (elapsed > updateTime) {
    previousTimeStamp = timestamp;
    sphere.rotation.x += 0.01;
    sphere.rotation.z += 0.01;
  }
  renderer.render(scene, camera);
  requestAnimationFrame(update);
}

// Écoutez les événements de redimensionnement de la fenêtre
window.addEventListener('resize', onWindowResize, false);

// Démarrez l'animation en appelant la fonction update
requestAnimationFrame(update);
