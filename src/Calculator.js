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

	createPolygonByFace( face , object ) {

		let aFace = face.a;
		let aVertex = object.geometry.vertices[aFace];

		let bFace = face.b;
		let bVertex = object.geometry.vertices[bFace];

		let cFace = face.c;
		let cVertex = object.geometry.vertices[cFace];

		let geometry = new THREE.Geometry();

		geometry.vertices.push(
			aVertex,
			bVertex,
			cVertex
			);

		geometry.faces.push( new THREE.Face3( 0, 1, 2 ) );

		return geometry;

	}

	getMaterialsArea( materialsArray, object ){

		let array = [];

		let facesInfo = this.getFacesInfo( object, materialsArray );



		for (let img of Data.textures){

			if ( img.image !== 'crossed-out.png' ) {

				let totalArea = facesInfo.filter( face => face.image === img.image)
				.reduce( (sum, current) => sum + Math.floor( 1000 * current.area)/ 1000, 0);
			
				array.push({image: img.image, area: totalArea });

			}

		}

		return array;
	
	}

	getFacesInfo ( object, materialsArray ) {

		let images = materialsArray.map( function( item ) {
	
			let source;
			if ( item ) {
				source = item.userData;
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

		return facesInfo;


	}

	fillTable ( materialsArea ) {

		if ( materialsArea.areas.length ) {

		}

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