// Sélectionnez le canevas HTML par son ID
let cnv = document.querySelector('#myCanvas');

// Créez un objet de rendu WebGL avec des paramètres, y compris l'antialiasing
let renderer = new THREE.WebGLRenderer({ canvas: cnv, antialias: true });
// Définissez la taille du rendu pour correspondre à la fenêtre du navigateur
renderer.setSize(window.innerWidth, window.innerHeight);
// Créez une scène 3D pour contenir tous les objets
let scene = new THREE.Scene();

// Créez une lumière
let lumière = new THREE.PointLight(0x555555);
// Ajoutez la caméra à la scène
scene.add(lumière);

// Créez une caméra perspective avec des paramètres
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
// Définissez la position de la caméra
camera.position.set(0, 0, 4);
// Faites en sorte que la caméra regarde un point précis
camera.lookAt(0, 0, 0);
// Ajoutez la caméra à la scène
scene.add(camera);

// Chargez une texture pour la sphère à partir d'un fichier image
let texture = new THREE.TextureLoader().load("assets/balle.jpg");
// Créez un matériau de base pour la sphère en utilisant la texture
let material = new THREE.MeshBasicMaterial({ map: texture });
// Créez une géométrie de sphère avec des paramètres
let geometry = new THREE.SphereGeometry(1.0, 20, 20);
// Créez un objet de sphère en combinant la géométrie et le matériau
let sphere = new THREE.Mesh(geometry, material);
// Ajoutez la sphère à la scène
scene.add(sphere);


// Créez un matériau de base pour la sphère en utilisant la texture
let material_back = new THREE.MeshBasicMaterial({ color: 0x00ff00});
// Créez une géométrie de sphère avec des paramètres
let geometry_back = new THREE.BoxGeometry(100000, 0.01, 100000);
// Créez un objet de sphère en combinant la géométrie et le matériau
let background = new THREE.Mesh(geometry_back, material_back);
background.position.y -= 2
// Ajoutez la sphère à la scène
scene.add(background);


// Créez un matériau de base pour la sphère en utilisant la texture
let material_ciel = new THREE.MeshBasicMaterial({ color: 0x00aaff});
// Créez une géométrie de sphère avec des paramètres
let geometry_ciel = new THREE.BoxGeometry(1000000, 10000, -100);
// Créez un objet de sphère en combinant la géométrie et le matériau
let ciel = new THREE.Mesh(geometry_ciel, material_ciel);
// Ajoutez la sphère à la scène
scene.add(ciel);



// Fonction appelée lors du redimensionnement de la fenêtre
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Variables pour la gestion de l'animation
let previousTimeStamp = undefined;
let updateTime = 20, elapsed = updateTime + 1;
let velocity = 50, speed = 0.5, rotation = 0.01;

// Fonction pour mettre à jour et rendre la scène
function update(timestamp) {
  if (previousTimeStamp !== undefined) {
    elapsed = timestamp - previousTimeStamp;
  }
  if (elapsed > updateTime) {
    previousTimeStamp = timestamp;
    sphere.rotation.x += rotation;
    sphere.rotation.z += rotation;
    if (sphere.position.y < 0 && velocity < 0.01) {speed = 0; rotation = 0;}
    if (sphere.position.y > velocity) { speed = -(speed + 0.01);}
    if (sphere.position.y < 0){ speed = -speed; velocity = velocity / 1.5; }
    sphere.position.y += speed;
    sphere.position.z -= speed;    
  }
  camera.lookAt(sphere.position.x, sphere.position.y, sphere.position.z);

  renderer.render(scene, camera);
  requestAnimationFrame(update);
}

// Écoutez les événements de redimensionnement de la fenêtre
window.addEventListener('resize', onWindowResize, false);

// Démarrez l'animation en appelant la fonction update
requestAnimationFrame(update);
