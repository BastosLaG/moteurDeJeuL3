import * as THREE from 'three';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { FirstPersonControls  } from 'three/addons/controls/FirstPersonControls.js';

let shrekMixer;
let shrekSpeed = 0.01;
let shrekDirection = new THREE.Vector3(1, 0, 0);
let skybox;
let fly = false;

//Load 3D models
let loader = new GLTFLoader();

loader.load('./assets/ground/scene.gltf', function (gltf) {
    let sol = gltf.scene;
    sol.scale.set(20, 20, 20);
    sol.position.set(0, -8, -1);
    scene.add(sol);
    console.log("scene added")
}, undefined, function (error) {
    console.error(error);
});

loader.load('./assets/fence/scene.gltf', function (gltf) {
    let barriere = gltf.scene;
    let i = 0;
    barriere.scale.set(0.1, 0.1, 0.1);
    for (let i = 0; i < 10; i++){
        barriere.position.set(i, 0, 0);
        scene.add(barriere);
    }
    console.log("scene added")
}, undefined, function (error) {
    console.error(error);
});

loader.load('./assets/city_building/scene.gltf', function (gltf) {
    let foodcenter = gltf.scene;
    foodcenter.position.set(0, 0, -10);
    foodcenter.scale.set(0.05, 0.05, 0.05);
    scene.add(foodcenter);
}, undefined, function (error) {
    console.error(error);
});

loader.load('./assets/city_building/scene.gltf', function (gltf) {
    let foodleft = gltf.scene;
    foodleft.position.set(8, 0, -5);
    foodleft.scale.set(0.05, 0.05, 0.05);

    scene.add(foodleft);
}, undefined, function (error) {
    console.error(error);
});

loader.load('./assets/city_building/scene.gltf', function (gltf) {
    let foodright = gltf.scene;
    foodright.position.set(-8, 0, -5);
    foodright.scale.set(0.05, 0.05, 0.05);
    scene.add(foodright);
}, undefined, function (error) {
    console.error(error);
});

loader.load('./assets/skybox/scene.gltf', function (gltf) {
    skybox = gltf.scene;
    skybox.position.set(0, 0, 0);
    skybox.scale.set(20, 20, 20);
    scene.add(skybox);
}, undefined, function (error) {
    console.error(error);
});

loader.load('./assets/shrek_walk_cycle/scene.gltf', function (gltf) {
    let shrek = gltf.scene;
    shrek.position.set(0, -0.8, 3);
    shrek.rotation.set(0, 1.5, 0);
    scene.add(shrek);

    shrekMixer = new THREE.AnimationMixer(shrek);
    let clips = gltf.animations;
    let action = shrekMixer.clipAction(clips[1]);
    action.play();
}, undefined, function (error) {
    console.error(error);
});

//Function spécifique
function updateshrekAnimation() {
    if (shrekMixer) {
        shrekMixer.update(0.01);
        let shrek = shrekMixer._root;
        if (shrek.position.x > 4 || shrek.position.x < -4) {
            shrek.rotation.y *= -1;
            shrekDirection.x *= -1; 
        }
        shrek.position.addScaledVector(shrekDirection, shrekSpeed);
    }
}

function resetCameraPosition() {
    camera.position.set(0, 3, 10);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
}

//Sections init
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
let renderer = new THREE.WebGLRenderer();

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

camera.position.z = 5;

// Mouvement de la caméra en fonction de la souris
let controls = new FirstPersonControls (camera, renderer.domElement);
controls.movementSpeed = 5;
controls.lookSpeed = 0.1;

renderer.autoClear = false;
let composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

let bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
composer.addPass(bloomPass)

let pointLight = new THREE.PointLight(0xffffff, 10);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

let streetLight = new THREE.PointLight(0xffffcc, 1, 20); // Couleur jaune pâle, intensité 1, distance d'éclairage 20
streetLight.position.set(3, 1.6, 1.55); // Position du lampadaire
scene.add(streetLight);

let streetLightLeft = new THREE.PointLight(0xffffcc, 1, 20); // Couleur jaune pâle, intensité 1, distance d'éclairage 20
streetLightLeft.position.set(-5, 1.6, 1.55); // Position du lampadaire
scene.add(streetLightLeft);

let streetLightRight = new THREE.PointLight(0xffffcc, 1, 20); // Couleur jaune pâle, intensité 1, distance d'éclairage 20
streetLightRight.position.set(11, 1.6, 1.55); // Position du lampadaire
scene.add(streetLightRight);

let particles = new Array(1000).fill().map(() => {
	let color = Math.random() * 0xffffff;
    let particle = new THREE.Mesh(
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

let animateStreetLight = function () {
    let time = Date.now() * 0.001;
    let intensity = 0.5 + Math.sin(time) * 0.5; // Oscillation d'intensité
    streetLight.intensity = intensity;
    streetLightLeft.intensity = intensity;
    streetLightRight.intensity = intensity;
};

let particleLimit = 22; // Définissez la taille de la zone limitée

let animateParticles = function () {
    particles.forEach((particle) => {
        let time = Date.now() * 0.0005;

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

let animate = function () {
    requestAnimationFrame(animate);
    if (fly != false)
    {
        controls.update(0.01);
    }
    else
    {
        resetCameraPosition();
    }
    updateshrekAnimation()
    animateParticles();
    animateStreetLight()
    if (skybox) {
        skybox.rotation.x += 0.0001; 
    }
    renderer.render(scene, camera);
    composer.render();
};

animate();

//Sections menu
let gui = new dat.GUI();
let settings = {
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

