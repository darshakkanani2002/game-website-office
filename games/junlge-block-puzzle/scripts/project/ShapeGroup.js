import Vector from './Vector.js';

export default class ShapeGroup extends ISpriteInstance{
	
	constructor()
	{
		super();
		this.pieces = [];
		this.tileWidth = 0;
		this.spacing = 0;
		this.color = 0;
		this.scale = 1;
		this.pieceScale = 1;
	}
	
	
	init(coordinates,color,tileWidth,spacing)
	{
		this.color = color;
		this.tileWidth = tileWidth;
		this.spacing = spacing;
		
		this.addPieces(coordinates);
		this.refreshSize();
		
	}
	
	setOpacity(value)
	{
		this.opacity = value;
		this.pieces.forEach(p=>p.opacity = value);
	}
	
	setZElevation(value)
	{
		this.zElevation = value;
		this.pieces.forEach(p=>p.zElevation = value);
	}
	
	
	setScale(scale)
	{
		this.scale = scale;
		this.refreshPiecesSize();
		this.refreshSize();
		this.updatePiecesPositions();
		
	}
	
	refreshPiecesSize()
	{
		this.pieces.forEach(p=>{
			p.width = this.tileWidth*this.scale*this.pieceScale;
			p.height= this.tileWidth*this.scale*this.pieceScale;
		});
		
	}
	
	setPieceScale(scale)
	{
		this.pieceScale = scale;
		this.refreshPiecesSize();
	}
	
	refreshSize()
	{
		const coordinates = this.pieces.map(p=>p.relCoordinate.clone());
		const maxAbsRelCoordinateX = Math.max(...coordinates.map(c=> Math.abs(c.x)));
		const maxAbsRelCoordinateY = Math.max(...coordinates.map(c=>Math.abs(c.y)));
		const maxWidth = Math.max(maxAbsRelCoordinateX*2+1,maxAbsRelCoordinateY*2+1,3)*this.tileWidth;
		this.width = maxWidth*this.scale;
		this.height = maxWidth*this.scale;
	}
	
	addPieces(coordinates)
	{
		for(const coordinate of coordinates)
		{
			const relPosition = new Vector((coordinate.x)*this.tileWidth + coordinate.x*this.spacing, -(coordinate.y 	*this.tileWidth+coordinate.y*this.spacing));
			
			const piece = this.runtime.objects.Piece.createInstance(0,this.x+relPosition.x*this.scale,this.y+relPosition.y*this.scale);
			piece.setColor(this.color);
			piece.width = this.tileWidth*this.scale*this.pieceScale;
			piece.height = this.tileWidth*this.scale*this.pieceScale;
			piece.relCoordinate = coordinate.clone();
			piece.relPosition = relPosition;
			piece.opacity = this.opacity;
			this.pieces.push(piece);
			
		}
	}
	
	update(_)
	{
		this.updatePiecesPositions();
	}
	
	setXY(x,y)
	{
		this.x = x;
		this.y= y;
		this.updatePiecesPositions();
	}
	
	updatePiecesPositions()
	{
		this.pieces.forEach(p=>{
			p.x = this.x + p.relPosition.x*this.scale;
			p.y = this.y + p.relPosition.y*this.scale;
		});
	}

}
