import * as THREE from 'three';
import Stats from 'stats.js';
import { EffectComposer, RenderPass } from "postprocessing";

import * as STATE from './state.js';

import PLAYER from './player.js';
import ENTITIES from './entities.js';
import SPRITES from './sprites.js';

// Set up scene.

STATE.scene = new THREE.Scene();
STATE.scene.background = new THREE.Color( 0xffffff );

STATE.camera = new THREE.PerspectiveCamera( 80, window.innerWidth / window.innerHeight, 1, 2000 );
STATE.camera.rotation.x = -(Math.PI*0.35);
STATE.camera.position.set( 0, 150, 50 );

STATE.clock = new THREE.Clock();

// Instantiate all game objects.

STATE.loader = new THREE.LoadingManager();
STATE.loader.onProgress = (item, loaded, total) => {
	console.log( item, loaded, total );
};

PLAYER.init(STATE);
ENTITIES.init(STATE);
SPRITES.init(STATE);

// TEST lighting

let light = new THREE.AmbientLight( 0x555555 );
STATE.scene.add( light );

let directionalLight = new THREE.DirectionalLight( 0xddeedd, 1.5 );
directionalLight.position.set( -500, 200, 300 );
STATE.scene.add( directionalLight );

// Renderer

let renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );

const composer = new EffectComposer( renderer );

const rpass = new RenderPass(STATE.scene, STATE.camera);
rpass.renderToScreen = true;
composer.addPass(rpass);

/*
const bpass = new BokehPass(STATE.camera, {
	focus: 2,
	dof: 1
});
bpass.renderToScreen = true;
composer.addPass(bpass);;
*/

var stats = new Stats();
stats.showPanel( 0 );
document.body.appendChild( stats.dom );

let container = document.getElementById('app');
container.appendChild( renderer.domElement );

// Controllers

window.addEventListener( 'resize', onWindowResize, false );
window.addEventListener( 'keydown', onKeyDown, false );
window.addEventListener( 'keyup', onKeyUp, false );

loop();

function loop() {

	let deltaTime = STATE.clock.getDelta();

	stats.begin();
	update(deltaTime);
	render(deltaTime);
	stats.end();

	requestAnimationFrame( loop );

}

function update(deltaTime) {

	PLAYER.update(STATE, deltaTime);
	ENTITIES.update(STATE, deltaTime);
	SPRITES.update(STATE, deltaTime);

}

function render(deltaTime) {
	composer.render(deltaTime);
	//renderer.render( STATE.scene, STATE.camera );
}

function onKeyDown(evt) {

	STATE.keyboard.keys[evt.keyCode] = {
		prev: STATE.keyboard[evt.keyCode] ? STATE.keyboard[evt.keyCode] : null,
		curr: 1
	};

}

function onKeyUp(evt) {

	STATE.keyboard.keys[evt.keyCode] = {
		prev: STATE.keyboard[evt.keyCode] ? STATE.keyboard[evt.keyCode] : null,
		curr: 0
	};

}

function onWindowResize() {

	STATE.camera.aspect = window.innerWidth / window.innerHeight;
	STATE.camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}
