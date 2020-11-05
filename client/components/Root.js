//import three.js
const THREE = require('three');

//export stateless React component
export default function Root() {
  return null;
}

const container = document.querySelector('#container');

// To display anything we need three things
// camera
// renderer
// scene

// create renderer
const renderer = new THREE.WebGLRenderer();

// set the size of the renderer
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

renderer.setSize(WIDTH, HEIGHT);

// create a camera
// first set up its attributes
const VIEW_ANGLE = 45;
const ASPECT = WIDTH / HEIGHT;
const NEAR = 0.1;
const FAR = 10000;

// then instantiate the camera
const camera =
new THREE.PerspectiveCamera(
    VIEW_ANGLE,
    ASPECT,
    NEAR,
    FAR
);

// set its position
camera.position.set( 0, 0, 500 );

// create the scene
const scene = new THREE.Scene();

// set the background color - black
// how to change the background color?
scene.background = new THREE.Color( 0x000 );

// add the camera to the scene
scene.add(camera);

// attach the renderer to the DOM elem
container.appendChild(renderer.domElement);

// Create a sphere
// Three.js uses geometric meshes to create primitive 3D shapes like spheres, cubes, cylinders, etc.

// sphere attributes
const RADIUS = 200;
const SEGMENTS = 50;
const RINGS = 50;

// becaues we want to texture the sphere with an image of the earth
// create a group that will hold the sphere and its texture meshed together
const globe = new THREE.Group();
scene.add(globe);

// create our sphere and its texture, and mesh them together using three.js’s TextureLoader
var loader = new THREE.TextureLoader();

// loader.load( 'land_ocean_ice_cloud_2048.jpg', function ( texture ) {
loader.load( 'slavetrademaplarge.jpg', function ( texture ) {
  //create the sphere
  var sphere = new THREE.SphereGeometry( RADIUS, SEGMENTS, RINGS );

  //map the texture to the material. Read more about materials in three.js docs
  var material = new THREE.MeshBasicMaterial( { map: texture, overdraw: 0.5 } );

  //create a new mesh with sphere geometry. 
  var mesh = new THREE.Mesh( sphere, material );

  //add mesh to globe group
  globe.add(mesh);
} );

globe.position.z = -300;

// Create light
const pointLight =
new THREE.PointLight(0xFFFFFF);

// position the light
pointLight.position.x = 10;
pointLight.position.y = 50;
pointLight.position.z = 400;

// add the light to the scene
scene.add(pointLight);

function update () {

  //Render:
  renderer.render(scene, camera);
  // Schedule the next frame:
  requestAnimationFrame(update);  
}
// Schedule the first frame:
requestAnimationFrame(update);

//Rotate on Arrow Key Press

//setting up our rotation based on arrow key
function animationBuilder(direction) {
  return function animateRotate() {
    switch (direction) {
      case 'up':
        globe.rotation.x -= 0.2;
        break;
      case 'down':
        globe.rotation.x += 0.2;
        break;
      case 'left':
        globe.rotation.y -= 0.2;
        break;
      case 'right':
        globe.rotation.y += 0.2;
        break;
      default:
        break;
    }
  }
}

// store animation call in directions object
var animateDirection = {
  up: animationBuilder('up'),
  down: animationBuilder('down'),
  left: animationBuilder('left'),
  right: animationBuilder('right')
}

// define the listener function we want to occur after a key has been pressed
function checkKey(e) {
  e = e || window.event;
  e.preventDefault();
 
  //based on keycode, trigger appropriate animation:
  if (e.keyCode == '38') {
    animateDirection.up();
  } else if (e.keyCode == '40') {
    animateDirection.down();
  } else if (e.keyCode == '37') {
    animateDirection.left();
  } else if (e.keyCode == '39') {
    animateDirection.right();
  }
}

// on key press invoke the above listener
document.onkeydown = checkKey;

