import Vector from './Vector.js';
import {lerp,randFloat} from './Utils.js';

export default class ShapeProvider{


	constructor()
	{
		const shapes = [

			{
				shape:[[-1,-1],[-1,0],[0,0],[1,0]],
				probablity : 1
			},
			{
				shape:[[-1,-1],[-1,0],[-1,1],[0,1],[1,1]],
				probablity : 1
			},	
			{
				shape:[[0,1],[0,0],[1,0]],
				probablity : 1
			},
			{
				shape:[[0,0]],
				probablity : 1
			},
			{
				shape:[[-1,-1],[-1,0],[-1,1],[0,-1],[0,0],[0,1],[1,-1],[1,0],[1,1]],
				probablity:.5
			},
			{
				shape:[[0,0],[0,1],[1,1],[1,0]],
				probablity:1
			}
			

			
		];
		
		this.shapes = shapes.map(s=>{
			
			const shape = s.shape.map(v=>new Vector(v[0],v[1]));
			const shps = [];
			shps.push({shape:shape,probablity:s.probablity});
			shps.push({shape:shape.map(v=>this.getRotateCoordinate(v,90*Math.PI/180)),probablity:s.probablity});
			shps.push({shape:shape.map(v=>this.getRotateCoordinate(v,180*Math.PI/180)),probablity:s.probablity});
			shps.push({shape:shape.map(v=>this.getRotateCoordinate(v,270*Math.PI/180)),probablity:s.probablity});
			
			return shps;
			
		}).flat();
		
		this.totalProbablity = this.shapes.map(s=>s.probablity).reduce((a,b)=>a+b,0);
	}
	
	getRotateCoordinate(vector,angle)
	{
		const vec =	vector.getRotateVector(angle);
		return new Vector(Math.round(vec.x),Math.round(vec.y));
	}

	getRandomShapes()
	{
		
		
		
		const probablity = randFloat(0,this.totalProbablity);
		
		
		
		let elapsedProbablity = 0;
		
		for(let i=0;i<this.shapes.length;i++)
		{
			if(probablity>= elapsedProbablity && probablity <= elapsedProbablity+this.shapes[i].probablity)
			{
				return this.shapes[i].shape;
			}
			elapsedProbablity += this.shapes[i].probablity;
		}
		 
		 return null;
	}
}