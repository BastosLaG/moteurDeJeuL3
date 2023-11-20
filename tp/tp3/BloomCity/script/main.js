import * as THREE from 'three';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { FirstPersonControls  } from 'three/addons/controls/FirstPersonControls.js';

let renardMixer;
const renardSpeed = 0.01;
const renardDirection = new THREE.Vector3(1, 0, 0);
let skybox;
let fly = false;

//Load 3D models
const loader = new GLTFLoader();

loader.load('https://willbbhm.github.io/BloomCity/assets/models/japnessStore/scene.gltf', function (gltf) {
    const foodcenter = gltf.scene;
    foodcenter.position.set(0, -1, 0);
    scene.add(foodcenter);
}, undefined, function (error) {
    console.error(error);
});

loader.load('https://willbbhm.github.io/BloomCity/assets/models/japnessStore/scene.gltf', function (gltf) {
    const foodleft = gltf.scene;
    foodleft.position.set(-8, -1, 0);
    scene.add(foodleft);
}, undefined, function (error) {
    console.error(error);
});

loader.load('https://willbbhm.github.io/BloomCity/assets/models/japnessStore/scene.gltf', function (gltf) {
    const foodright = gltf.scene;
    foodright.position.set(8, -1, 0);
    scene.add(foodright);
}, undefined, function (error) {
    console.error(error);
});

loader.load('https://willbbhm.github.io/BloomCity/assets/models/SkyboxNight/scene.gltf', function (gltf) {
    skybox = gltf.scene;
    skybox.position.set(0, 0, 0);
    skybox.scale.set(15, 15, 15);
    scene.add(skybox);
}, undefined, function (error) {
    console.error(error);
});

loader.load('https://willbbhm.github.io/BloomCity/assets/models/renardWalk/scene.gltf', function (gltf) {
    const renard = gltf.scene;
    renard.position.set(0, -0.8, 3);
    renard.rotation.set(0, -1.5, 0);
    scene.add(renard);

    renardMixer = new THREE.AnimationMixer(renard);
    const clips = gltf.animations;
    const action = renardMixer.clipAction(clips[0]);
    action.play();
}, undefined, function (error) {
    console.error(error);
});

//Function spécifique
function updateRenardAnimation() {
    if (renardMixer) {
        renardMixer.update(0.01);
        const renard = renardMixer._root;

        if (renard.position.x > 4 || renard.position.x < -4) {
            renard.rotation.y *= -1;
            renardDirection.x *= -1; // Inverser la direction sur l'axe x
        }
        
        renard.position.addScaledVector(renardDirection, renardSpeed);
    }
}

function resetCameraPosition() {
    camera.position.set(0, 0, 5);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
}

//Sections init
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();


renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

camera.position.z = 5;

// Mouvement de la caméra en fonction de la souris
const controls = new FirstPersonControls (camera, renderer.domElement);
controls.movementSpeed = 5;
controls.lookSpeed = 0.1;

renderer.autoClear = false;
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
composer.addPass(bloomPass)

const pointLight = new THREE.PointLight(0xffffff, 10);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

const streetLight = new THREE.PointLight(0xffffcc, 1, 20); // Couleur jaune pâle, intensité 1, distance d'éclairage 20
streetLight.position.set(3, 1.6, 1.55); // Position du lampadaire
scene.add(streetLight);

const streetLightLeft = new THREE.PointLight(0xffffcc, 1, 20); // Couleur jaune pâle, intensité 1, distance d'éclairage 20
streetLightLeft.position.set(-5, 1.6, 1.55); // Position du lampadaire
scene.add(streetLightLeft);

const streetLightRight = new THREE.PointLight(0xffffcc, 1, 20); // Couleur jaune pâle, intensité 1, distance d'éclairage 20
streetLightRight.position.set(11, 1.6, 1.55); // Position du lampadaire
scene.add(streetLightRight);

const particles = new Array(1000).fill().map(() => {
	const color = Math.random() * 0xffffff;
    const particle = new THREE.Mesh(
        new THREE.SphereGeometry(0.015, 32, 32),
        new THREE.MeshStandardMaterial({ color: color, emissive: color, emissiveIntensity: 10 })
    );
    particle.originalX = (Math.random() - 0.5) * 10;
    particle.originalY = (Math.random() - 0.5) * 10;
    particle.originalZ = (Math.random() - 0.5) * 10;
    particle.position.set(particle.originalX, particle.originalY, particle.originalZ);

    // Ajouter des propriétés de mouvement individuelles
    particle.speedX = Math.random() * 0.1;
    particle.speedY = Math.random() * 0.1;
    particle.speedZ = Math.random() * 0.1;

    scene.add(particle);
    return particle;
});

const animateStreetLight = function () {
    const time = Date.now() * 0.001;
    const intensity = 0.5 + Math.sin(time) * 0.5; // Oscillation d'intensité
    streetLight.intensity = intensity;
    streetLightLeft.intensity = intensity;
    streetLightRight.intensity = intensity;
};

const particleLimit = 22; // Définissez la taille de la zone limitée

const animateParticles = function () {
    particles.forEach((particle) => {
        const time = Date.now() * 0.0005;

        // Mise à jour de la position des particules
        particle.position.x = particle.originalX + Math.sin(time * particle.speedX) * 5;
        particle.position.y = particle.originalY + Math.cos(time * particle.speedY) * 5;
        particle.position.z = particle.originalZ + Math.sin(time * particle.speedZ) * 5;

        // Vérification et correction si la particule dépasse la zone limitée
        if (particle.position.x > particleLimit) {
            particle.position.x = particleLimit;
            particle.speedX *= -1; // Inversion de la direction
        } else if (particle.position.x < -particleLimit) {
            particle.position.x = -particleLimit;
            particle.speedX *= -1;
        }

        if (particle.position.y > particleLimit) {
            particle.position.y = particleLimit;
            particle.speedY *= -1;
        } else if (particle.position.y < -particleLimit) {
            particle.position.y = -particleLimit;
            particle.speedY *= -1;
        }

        if (particle.position.z > particleLimit) {
            particle.position.z = particleLimit;
            particle.speedZ *= -1;
        } else if (particle.position.z < -particleLimit) {
            particle.position.z = -particleLimit;
            particle.speedZ *= -1;
        }
    });
};

const animate = function () {
    requestAnimationFrame(animate);
    if (fly != false)
    {
        controls.update(0.01);
    }
    else
    {
        resetCameraPosition();
    }
    updateRenardAnimation()
    animateParticles();
    animateStreetLight()
    if (skybox) {
        skybox.rotation.x += 0.0001; 
        skybox.rotation.y += 0.0001; 
        skybox.rotation.z += 0.0001; 
    }
    renderer.render(scene, camera);
    composer.render();
};

animate();





//Sections menu
const gui = new dat.GUI();
const settings = {
	Radius: 0.015,
    FlyMode: false,
};
gui.add(settings, "Radius", 0, 0.1, 0.0001).onChange(function(e) {
	particles.forEach((particle) => {
		particle.geometry = new THREE.SphereGeometry(e, 32, 32);
	});
});

gui.add(settings, "FlyMode").onChange(function(value) {
    fly = value;
});

