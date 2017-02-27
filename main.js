if (!Detector.webgl) Detector.addGetWebGLMessage();

var radius = 6371;
var tilt = 0.0;
var rotationSpeed = 0.02;


var MARGIN = 0;
var SCREEN_HEIGHT = window.innerHeight - MARGIN * 2;
var SCREEN_WIDTH = window.innerWidth;

var container, stats;
var camera, controls, scene, renderer;
var geometry, meshPlanet, meshClouds, meshMoon, planeGeometry, meshPlane;
var dirLight, pointLight, ambientLight;


var CANVAS_W = window.innerWidth + (window.innerWidth * .20);
var CANVAS_H = window.innerHeight + (window.innerHeight * .20);
var MESH_DIMS = 60;
var canvasAspect = CANVAS_W / CANVAS_H;

var noise = new ImprovedNoise();
var displayTime = Math.random() * 10;
var noisePos = Math.random() * 1000;

var camera, scene, renderer;
var plane, material, texture, planeGeometry;
var gui;
var normalsHelper;
var canvas, ctx;

var textureLoader = new THREE.TextureLoader();

var d, dPlanet, dMoon, dMoonVec = new THREE.Vector3();

var clock = new THREE.Clock();

var guiParams = {
    rippleSpeed: 5, //15
    rippleSize: 5, //1.2
    rippleDepth: 170, //110
    tiltAmount: 1,
    normals: false,
    bigSeconds: false,
    showDate: true,
    showPM: true,
    stats: false
};


function init() {
    //init Canvas
    canvas = document.createElement('canvas');
    canvas.width = CANVAS_W;
    canvas.height = CANVAS_H;
    ctx = canvas.getContext('2d');


    //three init
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.setClearColor( 0x000000, 0 );
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.sortObjects = false;

    // container = document.createElement('div');
    // document.body.appendChild(container);

    //            camera = new THREE.PerspectiveCamera(25, SCREEN_WIDTH / SCREEN_HEIGHT, 50, 1e7);
    //            camera.position.z = radius * 5;

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 1300;

    scene = new THREE.Scene();

    controls = new THREE.FlyControls(camera, container);

    controls.movementSpeed = 50;
    controls.domElement = container;
    controls.rollSpeed = Math.PI / 24;
    controls.autoForward = false;
    //            controls.dragToLook = true;


    texture = new THREE.Texture(canvas);
    texture.minFilter = texture.magFilter = THREE.LinearFilter;



    //////////////////////////////////// plane //////////////////////////////////////////

    //            mesh = new THREE.Texture(canvas);


    var materialPlane = new THREE.MeshPhongMaterial({
        map: textureLoader.load("refscover-full.jpg"),
        shininess: 0
    });

    //            planeGeometry = new THREE.PlaneGeometry(7000, 5000, 60, 60);
    planeGeometry = new THREE.PlaneGeometry(CANVAS_W, CANVAS_H, MESH_DIMS, MESH_DIMS);
    meshPlane = new THREE.Mesh(planeGeometry, materialPlane);
    meshPlane.scale.set(3, 3, 1);
    //            meshPlane.position.set(radius * 5, 0, 0);
    meshPlane.rotation.z = tilt;
    scene.add(meshPlane);


    //            materialPlane.minFilter = materialPlane.magFilter = THREE.LinearFilter;
    perturbVerts();

    //normals helper
    normalsHelper = new THREE.FaceNormalsHelper(meshPlane, 10, 0xffffff, 1);
    scene.add(normalsHelper);
    normalsHelper.visible = false;


    //////////////////////////////////// lights //////////////////////////////////////////
    scene.add(new THREE.AmbientLight(0xffffff));


    container.appendChild(renderer.domElement);

    stats = new Stats();
    container.appendChild(stats.domElement);

    onParamsChange();

    window.addEventListener('resize', onWindowResize, false);

    renderer.render(scene, camera);
    //                animate();

}


function perturbVerts() {

    planeGeometry.vertices.forEach(function (vert) {
        vert.z = getZPos(vert);
    });

    planeGeometry.verticesNeedUpdate = true;
    planeGeometry.computeFaceNormals();
    planeGeometry.computeVertexNormals();
    planeGeometry.normalsNeedUpdate = true;

}

function getZPos(vert) {

    //get vert z-posns from mr perlin
    var noiseScale = guiParams.rippleSize / 1000;
    var zpos = noise.noise(vert.x * noiseScale + noisePos,
        vert.y * noiseScale + noisePos, 0) * guiParams.rippleDepth;
    return zpos;
}


function onParamsChange() {
    normalsHelper.visible = guiParams.normals;
    stats.domElement.style.display = guiParams.stats ? 'block' : 'none';
    perturbVerts();
}

function onWindowResize(event) {

    SCREEN_HEIGHT = window.innerHeight;
    SCREEN_WIDTH = window.innerWidth;

    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

    camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
    camera.updateProjectionMatrix();


}

function animate() {

    requestAnimationFrame(animate);
    perturbVerts();

    stats.update();
//    controls.update(delta);


    noisePos += guiParams.rippleSpeed / 1000;
    normalsHelper.update();
    render();
    //            stats.update();


}

function render() {

    //move the camera with the mouse
    var delta = clock.getDelta();

    //            meshPlane.rotation.y += 1.25 * rotationSpeed * delta;


    controls.movementSpeed = 500;

    controls.update(delta);

    renderer.render(scene, camera);

}

init();
animate();
