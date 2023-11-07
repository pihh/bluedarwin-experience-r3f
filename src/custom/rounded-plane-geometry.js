// by Lumenkowski

import earcut from "earcut" // triangulation
import {
	Vector2,
	Vector3,
	BufferGeometry,
	BufferAttribute,
	QuadraticBezierCurve3,
} from "three"

class RoundedPlaneGeometry extends BufferGeometry {

	constructor( width = 1, height = 1, smothness = new Vector2( 0.25, 5 ), origin = new Vector2() ) {

		super()

		const x1 = origin.x - width / 2
		const y1 = origin.y - height / 2

		const x2 = origin.x + width / 2
		const y2 = origin.y - height / 2

		const x3 = origin.x + width / 2
		const y3 = origin.y + height / 2

		const x4 = origin.x - width / 2
		const y4 = origin.y + height / 2

		// Smooth corners

		const points = [

			// BOTTOM LEFT

			...new QuadraticBezierCurve3(
				new Vector3( x1, y1 + smothness.x, 0 ),
				new Vector3( x1, y1, 0 ),
				new Vector3( x1 + smothness.x, y1, 0 ),
			).getPoints( smothness.y ),

			// BOTTOM RIGHT

			...new QuadraticBezierCurve3(
				new Vector3( x2 - smothness.x, y2, 0 ),
				new Vector3( x2, y2, 0 ),
				new Vector3( x2, y2 + smothness.x, 0 ),
			).getPoints( smothness.y ),

			// TOP RIGHT

			...new QuadraticBezierCurve3(
				new Vector3( x3, y3 - smothness.x, 0 ),
				new Vector3( x3, y3, 0 ),
				new Vector3( x3 - smothness.x, y3, 0 ),
			).getPoints( smothness.y ),

			// TOP LEFT

			...new QuadraticBezierCurve3(
				new Vector3( x4 + smothness.x, y4, 0 ),
				new Vector3( x4, y4, 0 ),
				new Vector3( x4, y4 - smothness.x, 0 ),
			).getPoints( smothness.y )
		]

		const vertices3D = []
		const vertices2D = []

		for ( const point of points ) {
			
			vertices3D.push( point.x, point.y, 0 )
			vertices2D.push( point.x, point.y )
		}

		const position = new BufferAttribute( new Float32Array( vertices3D ), 3 )
		const indices = new BufferAttribute( new Uint16Array( earcut( vertices2D ) ), 1 )

		this.setAttribute( "position", position )
		this.setIndex( indices )

		this.computeVertexNormals()
	}
}

extend({RoundedPlaneGeometry})