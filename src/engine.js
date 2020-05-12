/**
 * @author Dragon3DGraff / http://dragon3dgraff.ru/
*/

import * as THREE from '../node_modules/three/build/three.module.js';
import { OrbitControls } from "../node_modules/three/examples/jsm/controls/OrbitControls.js";
import { calculator } from './Calculator.js';


let MainScene = {};

let scene = new THREE.Scene( );
scene.background = new THREE.Color('#bdd0e9');

let camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

let renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

let controls = new OrbitControls(camera, renderer.domElement);

let raycaster = new THREE.Raycaster();

let clickableObjects = [];
let currentTexture = { img: '' };


window.addEventListener('resize', onWindowResize, false);
document.addEventListener('mousedown', onDocumentMouseClick, false);

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();	
	renderer.setSize(window.innerWidth, window.innerHeight);

}

let geometry = new THREE.BoxGeometry( 5, 5, 5, 1, 1, 1 );

let materials = [

	new THREE.MeshBasicMaterial( { color: new THREE.Color( 'lightgrey' )} ),
	new THREE.MeshBasicMaterial( { color: new THREE.Color( 'lightgrey' )} ),
	new THREE.MeshBasicMaterial( { color: new THREE.Color( 'lightgrey' ) } ),
	new THREE.MeshBasicMaterial( { color: new THREE.Color( 'lightgrey' ) } ),
	new THREE.MeshBasicMaterial( { color: new THREE.Color( 'lightgrey' ) } ),
	new THREE.MeshBasicMaterial( { color: new THREE.Color( 'lightgrey' ) } )

]

let cube = new THREE.Mesh( geometry, materials );
scene.add( cube );
clickableObjects.push( cube );

let axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );

camera.position.z = 5;
camera.position.x = 10;
camera.position.y = 8;
controls.update();

function onDocumentMouseClick( event ) {

	let screenPoint = getScreenPoint(event);

	raycaster.setFromCamera(screenPoint, camera);
	
	let intersects = raycaster.intersectObjects( clickableObjects );

	if ( intersects.length > 0 ){

		let faceIndex = intersects[0].face.materialIndex;

		if ( currentTexture.img ){

			let texture;
			let picName = ((currentTexture.img).split('/')).pop();

			if ( picName !== 'crossed-out.png' ) {

				texture = new THREE.TextureLoader().load( currentTexture.img );
				// texture.wrapS = THREE.RepeatWrapping;
				// texture.wrapT = THREE.RepeatWrapping;
				// texture.repeat.set( 4, 4 );
				materials[ faceIndex ] = new THREE.MeshBasicMaterial( { map: texture } );
				materials[ faceIndex ].userData = picName;
			}
			else {

				materials[ faceIndex ] = new THREE.MeshBasicMaterial( { color: new THREE.Color( 'lightgrey' ) } );
				materials[ faceIndex ].userData = {};

			}

			calculator.materialsArea.areas = calculator.getMaterialsArea( materials, cube );

			calculator.fillTable ( calculator.materialsArea );

		}

	}

}

MainScene.scene = scene;
MainScene.cube = cube;
MainScene.currentTexture = currentTexture;
MainScene.materials = materials;


let animate = function () {
	requestAnimationFrame( animate );
	controls.update();

	renderer.render( scene, camera );
};

animate();


function getScreenPoint(event) {
	// event.preventDefault();
	const screenPoint = new THREE.Vector2();
	return screenPoint.set((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1);
}

export { MainScene };