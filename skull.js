import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";

import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";

import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();


const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1,1000);

const renderer = new THREE.WebGLRenderer(
    { alpha: true
    , antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);

renderer.outputEncoding = THREE.sRGBEncoding;


document.getElementById('human-skull').appendChild(renderer.domElement);

let object;

let objectToRender = 'skull'

let mouseX = 0

let mouseY = 0

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const loader = new GLTFLoader();

loader.load(
    
    `low_poly_human_skull/scene.gltf`,

    function(gltf){
        object = gltf.scene;
        scene.add(object);
        
        object.scale.set(3,3,3);

        object.position.set(0,-1,5);
    }
    ,

    function (xhr){
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },

    function (error){
        console.log(error);
    }
)

camera.position.z = objectToRender === 'skull' ? 30 : 100;

camera.lookAt(0, 0, 0);

const topLight = new THREE.DirectionalLight(0xffffff, 2);

topLight.position.set(500,500,500)

topLight.castShadow = true;

const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);

const fillLight = new THREE.DirectionalLight(0xffffff, 1);

scene.add(topLight)

scene.add(ambientLight)

scene.add(fillLight)

document.addEventListener("mousemove", (event) => {
    mouseX = event.clientX
    mouseY = event.clientY
});

function animate(){
    requestAnimationFrame(animate);

    if(object && objectToRender === "skull"){
        object.rotation.y = -3 + mouseX / window.innerWidth * 10
        object.rotation.x = -1.2 + mouseY * 10 / window.innerHeight;
    }

    controls.update();
    renderer.render(scene,camera)
}

window.addEventListener("resize",function(){
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight)
})

animate();

const stars = new THREE.BufferGeometry();

const starsCount = 5555;

const positions = []

for(let i = 0; i < starsCount; i++){
    positions.push(
        (Math.random() - 0.5) * 2000,
        (Math.random() - 0.5) * 2000,
        (Math.random() - 0.5) * 2000
    )
};

stars.setAttribute('position',new THREE.Float32BufferAttribute(positions, 3));

const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 1.5,
    transparent: true,
    opacity: 0.8
})

const starss = new THREE.Points(
    stars,
    starMaterial
)

scene.add(starss)


document.addEventListener("keydown", (event) => {

    if(event.key === "Escape" || event.key === "m"){

        window.location.href = "index.html";
    }
});

