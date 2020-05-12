/**
 * @author Dragon3DGraff / http://dragon3dgraff.ru/
*/

import * as THREE from '../node_modules/three/build/three.module.js';
import { Data } from './Data.js';

class Calculator {

	constructor () {

		this.materialsArea = { areas: [] };

	}

	getFaceArea ( face, object ){

		let aFace = face.a;
		let aVertex = object.geometry.vertices[aFace];

		let bFace = face.b;
		let bVertex = object.geometry.vertices[bFace];

		let cFace = face.c;
		let cVertex = object.geometry.vertices[cFace];


		let triangle = new THREE.Triangle( aVertex, bVertex, cVertex );

		return Math.floor( 1000 * triangle.getArea() )/1000;

	}

	getMaterialsArea( materialsArray, object ){

		let array = [];
		let setOfTextures = new Set();
		
		let images = materialsArray.map( function( item ) {			
	
			let source;
			if ( item ) {
				source = item.userData;
			}
			if ( typeof source === "string" && source !== 'crossed-out.png'){

				setOfTextures.add( source );

			}
			return source;
	
		});
	
		let facesArray = object.geometry.faces;
		let facesInfo = facesArray.map( function( item ){
			let faceInfo = {};
	
			faceInfo.materialIndex = item.materialIndex;
			faceInfo.area = calculator.getFaceArea ( item, object );
			faceInfo.image = images[item.materialIndex];
	
			return faceInfo;
	
		});

		for (let img of setOfTextures){

			console.log( img );

			let totalArea = facesInfo.filter( face => face.image === img)
			.reduce( (sum, current) => sum + Math.floor( 1000 * current.area)/ 1000, 0);
		
			array.push({image: img, area: totalArea });

		}

		return array;
	
	}

	fillTable ( materialsArea ) {

		materialsArea.areas.forEach( ( item ) => {
	
			let cell = document.getElementById( item.image );
			let area = Math.trunc( 1000 * item.area ) / 1000
			cell.innerHTML = area;
	
			let cellCost = document.getElementById( 'cost-' + item.image );
			let priceTexture = Data.textures.filter( elem => elem.image === item.image );
	
			cellCost.innerHTML = Math.trunc( 1000 * (+area * priceTexture[0].price) )/1000;
		
		})
		
	}

}

let calculator = new Calculator();

export { calculator }