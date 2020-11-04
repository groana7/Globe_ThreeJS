// //import three.js
// const THREE = require('three');

// //export stateless React component
// export default function Root() {
//   return null;
// }

// const container = document.querySelector('#app');

// // To display anything we need three things
// // camera
// // renderer
// // scene

// // create renderer
// const renderer = new THREE.WebGLRenderer();

// // set the size of the renderer
// const WIDTH = window.innerWidth;
// const HEIGHT = window.innerHeight;
// renderer.setSize(WIDTH, HEIGHT);

// // create a camera
// // first set up its attributes
// const VIEW_ANGLE = 45;
// const ASPECT = WIDTH / HEIGHT;
// const NEAR = 0.1;
// const FAR = 10000;

// // then instantiate the camera
// const camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);

// // set its position
// camera.position.set(0, 0, 500);

// // create the scene
// const scene = new THREE.Scene();

// // set the background color - black
// // how to change the background color?
// scene.background = new THREE.Color(0x000);

// // add the camera to the scene
// scene.add(camera);

// // attach the renderer to the DOM elem
// container.appendChild(renderer.domElement);

// // Create a sphere
// // Three.js uses geometric meshes to create primitive 3D shapes like spheres, cubes, cylinders, etc.

// // sphere attributes
// const RADIUS = 200;
// const SEGMENTS = 50;
// const RINGS = 50;

// // becaues we want to texture the sphere with an image of the earth
// // create a group that will hold the sphere and its texture meshed together
// const globe = new THREE.Group();
// scene.add(globe);

// // create our sphere and its texture, and mesh them together using three.js’s TextureLoader
// var loader = new THREE.TextureLoader();

// loader.load('land_ocean_ice_cloud_2048.jpg', function (texture) {
//   // Create the sphere
//   var sphere = new THREE.SphereGeometry(RADIUS, SEGMENTS, RINGS);
//   // Map the texture to the material.
//   var material = new THREE.MeshBasicMaterial({ map: texture, overdraw: 0.5 });
//   // Create a new mesh with sphere geometry.
//   var mesh = new THREE.Mesh(sphere, material);

//   // Add mesh to globe
//   globe.add(mesh);
// });

// globe.position.z = -300;

// // Create light
// const pointLight = new THREE.PointLight(0xffffff);

// // position the light
// pointLight.position.x = 10;
// pointLight.position.y = 50;
// pointLight.position.z = 400;

// // add the light to the scene
// scene.add(pointLight);
