/**
 * @author Dragon3DGraff / http://dragon3dgraff.ru/
*/

import * as THREE from '../node_modules/three/build/three.module.js';
import { MainScene } from './engine.js';
import { calculator } from './Calculator.js'
import { GLTFExporter } from '../node_modules/three/examples/jsm/exporters/GLTFExporter.js';
import { STLExporter } from '../node_modules/three/examples/jsm/exporters/STLExporter.js';
import { OBJExporter } from '../node_modules/three/examples/jsm/exporters/OBJExporter.js';
import { PLYExporter  } from '../node_modules/three/examples/jsm/exporters/PLYExporter.js';
import { Data } from './Data.js';


let UI = {};

let leftMenu = createElement( document.body, 'div', 'leftMenu');


let title = createElement( leftMenu, 'div', 'title');
title.innerHTML = 'Калькулятор объемов';

let formInput = createElement( leftMenu, 'div', 'formInput');

let inputDiv = createElement ( formInput, 'div', 'inputDiv');

let textWidthInput = createElement( inputDiv, 'label', 'labelClass');
textWidthInput.innerHTML = 'Ширина';

let widthInput = createElement( inputDiv, 'input', 'inputClass');
widthInput.type = 'number';
widthInput.value = 5;
widthInput.min = 0;
widthInput.step = 0.1;


inputDiv = createElement ( formInput, 'div', 'inputDiv');
let textHeightInput = createElement( inputDiv, 'label', 'labelClass');
textHeightInput.innerHTML = 'Высота';

let heightInput = createElement( inputDiv, 'input', 'inputClass');
heightInput.type = 'number';
heightInput.value = 5;
heightInput.min = 0;
heightInput.step = 0.1;


inputDiv = createElement ( formInput, 'div', 'inputDiv');
let textDepthtInput = createElement( inputDiv, 'label', 'labelClass');
textDepthtInput.innerHTML = 'Глубина';

let depthtInput = createElement( inputDiv, 'input', 'inputClass');
depthtInput.type = 'number';
depthtInput.value = 5;
depthtInput.min = 0;
depthtInput.step = 0.1;


let calculationsText = createElement( leftMenu, 'label', 'labelClass' );
calculationsText.innerHTML = 'Расчеты';

let divCalculations = createElement( leftMenu, 'div', 'divCalculations' );

let tableCalc = createElement( divCalculations, 'table', 'tableClass' );
let rowHeader = createElement( tableCalc, 'tr', 'tdClass');
let header = createElement( rowHeader, 'th', 'thClass');
header.innerHTML = 'Материал';
header = createElement( rowHeader, 'th', 'thClass');
header.innerHTML = 'Площадь';
header = createElement( rowHeader, 'th', 'thClass');
header.innerHTML = 'Стоимость';

Data.textures.forEach( (item ) => {

	if (item.image !== 'crossed-out.png' ) {
		let row = createElement( tableCalc, 'tr', 'tdClass');
		let cellImage = createElement( row, 'td', 'tdClass');
			let imgTable = createElement( cellImage, 'img', 'imgTable');
			imgTable.src = item.image;

		let cellArea = createElement( row, 'td', 'tdClass');
		cellArea.id = item.image;
		cellArea.innerHTML = 0;

		let cellCost = createElement( row, 'td', 'tdClass');
		cellCost.id = 'cost-' + item.image;
		cellCost.innerHTML = 0;
	}

});

heightInput.addEventListener( 'input', (e) => {

	let height = heightInput.value;

	if ( height < 0.001 ) height = 0.001;

	updateObject('height', height, MainScene.cube );
	calculator.materialsArea.areas = calculator.getMaterialsArea( MainScene.materials, MainScene.cube );
	calculator.fillTable ( calculator.materialsArea );

});

widthInput.addEventListener( 'input', (e) => {

	let width = widthInput.value;

	if ( width < 0.001 ) width = 0.001;

	updateObject('width', width, MainScene.cube );
	calculator.materialsArea.areas = calculator.getMaterialsArea( MainScene.materials, MainScene.cube );
	calculator.fillTable ( calculator.materialsArea );

});

depthtInput.addEventListener( 'input', (e) => {

	let depth = depthtInput.value;

	if ( depth < 0.001 ) depth = 0.001;

	updateObject('depth', depth, MainScene.cube );
	calculator.materialsArea.areas = calculator.getMaterialsArea( MainScene.materials, MainScene.cube );
	calculator.fillTable ( calculator.materialsArea );

});


let exportButtonDiv = createElement( leftMenu, 'div', 'exportButtonDiv');

let exportGLTFButton = createElement( exportButtonDiv, 'button', 'exportButton');
exportGLTFButton.innerHTML = 'glTF';
exportGLTFButton.addEventListener( 'click', exportGLTF);

let exportSTLButton = createElement( exportButtonDiv, 'button', 'exportButton');
exportSTLButton.innerHTML = 'STL';
exportSTLButton.addEventListener( 'click', exportSTLBinary);

let exportOBJButton = createElement( exportButtonDiv, 'button', 'exportButton');
exportOBJButton.innerHTML = 'EOBJ';
exportOBJButton.addEventListener( 'click', exportOBJ);

let exportPLYButton = createElement( exportButtonDiv, 'button', 'exportButton');
exportPLYButton.innerHTML = 'PLY';
exportPLYButton.addEventListener( 'click', exportPLY);



let textureSelect = createElement( leftMenu, 'div', 'textureSelect');

Data.textures.forEach( (item ) => {

	let image = createElement( textureSelect, 'img', 'imgClass');
	image.src = item.image;
	image.addEventListener('click', () => {

		MainScene.currentTexture.img = image.src;

		let selected = document.getElementById( 'selectedTexture' );
		if ( selected ){

			selected.style.borderColor = 'black';
			selected.id = 'deselectedTexture';

		}

		image.style.borderColor = 'rgb(220, 20, 60)';
		image.id = 'selectedTexture';

	})

} );



function createElement ( parent, type, className ) {

	let element = document.createElement( type );
	element.className = className;
	parent.appendChild( element );

	return element;

}

function exportGLTF(){

	let gltfExporter = new GLTFExporter();

	gltfExporter.parse( MainScene.scene, function ( result ) {

		let gltf = JSON.stringify( result, null, 2 );

		let blob = new Blob( [ gltf ], { type: 'text/plain' });

		saveFile( blob , 'Scene', 'gltf' );

	} );

}

function exportOBJ() {

	let objExporter = new OBJExporter();

	let result = objExporter.parse( MainScene.scene);

		// let obj = JSON.stringify( result, null, 2 );

		let blob = new Blob( [result], {type: 'text/plain'});

		saveFile( blob , 'Scene', 'obj' );

}

function exportPLY() {

	let plyfExporter = new PLYExporter();

	plyfExporter.parse( MainScene.scene, function ( result ) {

		// let ply = JSON.stringify( result, null, 2 );

		let blob = new Blob( [result], {type: 'text/plain'});

		saveFile( blob , 'Scene', 'ply' );

	} );

	
}

function exportSTLBinary( ) {

	let exporter = new STLExporter();

	let result = exporter.parse( MainScene.scene, { binary: true } );
	let blob = new Blob( [result], {type: 'application/octet-stream' });

	saveFile( blob , 'Scene', 'stl' );
	
}

function saveFile( blob, name, fileExtention ){

	let fileName = name + '.' + fileExtention;

	let link = document.createElement('a');
	link.download = fileName;

	if (window.navigator && window.navigator.msSaveOrOpenBlob) {

		window.navigator.msSaveOrOpenBlob( blob, fileName );

	} else {

		link.href = URL.createObjectURL( blob );

		link.click();

		URL.revokeObjectURL( link.href );
		
	}

}
function createGeometry( geometryType, params ){

	let geometry = new THREE[ geometryType ]();

	let paramsArray = Object.values( params );

	geometry = new THREE[ geometryType ]( ...paramsArray );

	 return geometry;

}

function updateObject( parameterName, parameterValue, entity ) {

	let geom = entity.geometry;

			let params = {};
			Object.assign( params, geom.parameters );
			params[ parameterName ] = parameterValue;

			let newGeom = createGeometry ( entity.geometry.type, params );

			entity.geometry.dispose();
			entity.geometry = newGeom;

			let wire = entity.getObjectByName( 'wire');

			wire.geometry.dispose();

			wire.geometry = new THREE.EdgesGeometry( entity.geometry );


}

export { UI }