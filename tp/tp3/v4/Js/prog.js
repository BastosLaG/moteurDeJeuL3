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

// Initialisez un tableau d'objets 3D
let objects = [];

// Fonction pour ajouter un objet à la scène
function addObject(geom, xc, yc, zc) {
  let material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
  let newObj = new THREE.Mesh(geom, material);
  newObj.position.set(xc, yc, zc);
  objects.push(newObj);
  scene.add(newObj);
}

// Créez différents objets 3D en utilisant la fonction addObject

// Box
let widthBox = 1.0, heightBox = 1.0, depthBox = 1.0;
addObject(new THREE.BoxGeometry(widthBox, heightBox, depthBox), -6.0, 3.0, 0.0);

// Circle
let radiusCircle = 1.0, sgtCircle = 20;
addObject(new THREE.CircleGeometry(radiusCircle, sgtCircle), -3.0, 3.0, 0.0);

// Cone
let radiusCone = 1.0, heightCone = 1, radSgtCone = 32;
addObject(new THREE.ConeGeometry(radiusCone, heightCone, radSgtCone), 0.0, 3.0, 0.0);

// Cylinder
let radiusTopCylinder = 1.0, radiusBotCylinder = 0.5;
let heightCylinder = 1.0, radialSgtCylinder = 10;
addObject(new THREE.CylinderGeometry(radiusTopCylinder, radiusBotCylinder, heightCylinder, radialSgtCylinder), 3.0, 3.0, 0.0);

// Dodecahedron
let radiusDodecahedron = 1.0, detailDodecahedron = 0;
addObject(new THREE.DodecahedronGeometry(radiusDodecahedron, detailDodecahedron), 6.0, 3.0, 0.0);

// Icosahedron
let radiusIcosahedron = 1.0, detailIcosahedron = 0;
addObject(new THREE.IcosahedronGeometry(radiusIcosahedron, detailIcosahedron), -6.0, 0.0, 0.0);

// Lathe
let ptsLathe = [];
for (let i = 0; i < 5; i++) {
  ptsLathe.push(new THREE.Vector2(Math.sin(i * 0.2) * 0.8 + 0.1, i * 0.1));
}
addObject(new THREE.LatheGeometry(ptsLathe), -3.0, 0.0, 0.0);

// Octahedron
let radiusOctahedron = 1.0, detailOctahedron = 0;
addObject(new THREE.OctahedronGeometry(radiusOctahedron, detailOctahedron), 0.0, 0.0, 0.0);

// Plane
let widthPlane = 1.0, heightPlane = 1.0;
addObject(new THREE.PlaneGeometry(widthPlane, heightPlane), 3.0, 0.0, 0.0);

// Polyhedron
let verticesPolyhedron = [-1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1, -1, -1, 1, 1, -1, 1, 1, -1, -1, 1, 1, 1];
let indicesFacesPolyhedron = [
  2, 1, 0, 0, 3, 2,
  0, 4, 7, 7, 3, 0,
  0, 1, 5, 5, 4, 0,
  1, 2, 6, 6, 5, 1,
  2, 3, 7, 7, 6, 2,
  4, 5, 6, 6, 7, 4
];
addObject(new THREE.PolyhedronGeometry(verticesPolyhedron, indicesFacesPolyhedron, 1, 1), 6.0, 0.0, 0.0);

// Ring
let innerRadiusRing = 0.6, outerRadiusRing = 1.0, thetaSgtRing = 10;
addObject(new THREE.RingGeometry(innerRadiusRing, outerRadiusRing, thetaSgtRing), -6.0, -3.0, 0.0);

// Tetrahedron
let radiusTetrahedron = 1.0, detailTetrahedron = 0;
addObject(new THREE.TetrahedronGeometry(radiusTetrahedron, detailTetrahedron), -3.0, -3.0, 0.0);

// Torus
let radiusTorus = 0.7, tubeTorus = 0.3, radialSgtTorus = 10;
let tubularSgtTorus = 20;
addObject(new THREE.TorusGeometry(radiusTorus, tubeTorus, radialSgtTorus, tubularSgtTorus), 0.0, -3.0, 0.0);

// Torus Knot
let radiusTorusKnot = 0.6, tubeTorusKnot = 0.2;
let tubularSgtTorusKnot = 40, radialSgtTorusKnot = 10;
addObject(new THREE.TorusKnotGeometry(radiusTorusKnot, tubeTorusKnot, tubularSgtTorusKnot, radialSgtTorusKnot), 3.0, -3.0, 0.0);

// Sphere
let radiusSphere = 1.0, widthSphere = 10, heightSphere = 10;
addObject(new THREE.SphereGeometry(radiusSphere, widthSphere, heightSphere), 6.0, -3.0, 0.0);

// Positionnez la caméra
camera.position.set(0, 0, 7);

// Faites en sorte que la caméra regarde vers l'origine
camera.lookAt(0, 0, 0);

// Fonction appelée lors du redimensionnement de la fenêtre
function onWindowResize() {
  width = window.innerWidth;
  height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

// Variables pour la gestion de l'animation
let previousTimeStamp = undefined;
let updateTime = 20, elapsed = updateTime + 1;

// Fonction d'animation principale
function update(timestamp) {
  if (previousTimeStamp !== undefined) {
    elapsed = timestamp - previousTimeStamp;
  }

  if (elapsed > updateTime) {
    previousTimeStamp = timestamp;
    // Rotation des objets 3D
    for (let i = 0; i < objects.length; i++) {
      objects[i].rotation.x += 0.01;
      objects[i].rotation.y += 0.01;
    }
  }

  // Rendu de la scène avec la caméra
  renderer.render(scene, camera);

  // Demande une nouvelle frame d'animation
  requestAnimationFrame(update);
}

// Écouteur d'événement pour le redimensionnement de la fenêtre
window.addEventListener('resize', onWindowResize, false);

// Démarrez l'animation
requestAnimationFrame(update);
