// Install three.js by running npm install three, and then import it
const THREE = require('three');

//export stateless React component
export default function Root() {
  return null;
}

// Get the DOM element in which you want to attach the scene
const container = document.querySelector('#container');

// To display anything we need three things
// renderer
// camera
// scene

// create RENDERER
// WebGL (Web Graphics Library) renders interactive 2 and 3D graphics in the browser.
const renderer = new THREE.WebGLRenderer();

// set the size of the renderer
const WIDTH = window.outerWidth;
const HEIGHT = window.outerHeight;

renderer.setSize(WIDTH, HEIGHT);

// CAMERA
// first set up its attributes
const VIEW_ANGLE = 45;
const ASPECT = WIDTH / HEIGHT;
const NEAR = 0.1;
const FAR = 10000;

// then instantiate the camera
const camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);

// set its position
camera.position.set(0, 0, 500);

// SCENE
const scene = new THREE.Scene();

// set the background color
scene.background = THREE.ImageUtils.loadTexture(
  '_starfield background created in photoshop 2048x2048 this can be used.png'
);

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

/* 
We call the load method, which takes in our image url (here’s the image I used) as the first argument, and a function that: 1) creates a sphere with the predefined attributes, 2) maps the texture to the material (read more here about materials in the three.js docs), 3) creates a mesh of our sphere and the material, and 4) adds the mesh to our globe group.
*/

loader.load('vintage_map.jpg', function (texture) {
  //create the sphere
  var sphere = new THREE.SphereGeometry(RADIUS, SEGMENTS, RINGS);

  // map the texture to the material.
  var material = new THREE.MeshPhongMaterial();
  material.map = THREE.ImageUtils.loadTexture('vintage_map.jpg');
  material.bumpMap = THREE.ImageUtils.loadTexture('16_bit_dem_large.JPG');
  material.bumpScale = 3.0;

  //create a new mesh with sphere geometry.
  var mesh = new THREE.Mesh(sphere, material);

  // add mesh to globe group
  globe.add(mesh);
});

// position the sphere backwards (along the z axis) so that we can see it
globe.position.z = -300;

// Create light
const pointLight = new THREE.PointLight(0xffffff);

// position the light
pointLight.position.x = 10;
pointLight.position.y = 50;
pointLight.position.z = 400;

// add the light to the scene
scene.add(pointLight);

function update() {
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
  };
}

// store animation call in directions object
//  a directions object in which we’ll store the appropriate animation call per direction
var animateDirection = {
  up: animationBuilder('up'),
  down: animationBuilder('down'),
  left: animationBuilder('left'),
  right: animationBuilder('right'),
};

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

// Rotate on mouse movement
// setup an array that stores the previous mouse position with the start value at the center of the page
var lastMove = [window.outerWidth / 2, window.outerHeight / 2];

// define a listener function to fire when the mouse moves
function rotateOnMouseMove(e) {
  e = e || window.event;

  //calculate difference between current and last mouse position
  const moveX = e.clientX - lastMove[0];
  const moveY = e.clientY - lastMove[1];
  //rotate the globe based on distance of mouse moves (x and y)
  globe.rotation.y += moveX * 0.005;
  globe.rotation.x += moveY * 0.005;

  //store new position in lastMove
  lastMove[0] = e.clientX;
  lastMove[1] = e.clientY;
}

// on mousedown call addMouseOver
document.addEventListener('mousedown', addMouseOver);
document.addEventListener('mouseup', removeMouseOver);

// while mouseover run function rotateOnMouseMove
function addMouseOver() {
  document.addEventListener('mousemove', rotateOnMouseMove);
}

// on mouseup remove the event lisener form mouseover
const removeMouseOver = () => {
  document.removeEventListener('mousemove', rotateOnMouseMove);
};
