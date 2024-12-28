import Piece from "./Piece.js";
import ShapeGroup from "./ShapeGroup.js";
import ShapeProvider from "./ShapeProvider.js";
import Vector from './Vector.js';
import {lerp,randFloat,rand,clamp} from './Utils.js';
import LerpAnim from './LerpAnim.js';


export default class MainScene{


	constructor(runtime)
	{
		this.runtime = runtime;
		this.runtime.globalVars.GameState = "playing";
		
		this.updatables = [];
		
		this.boardBorder = runtime.objects.BoardBorder.getFirstInstance();
		this.boardBorderContentWidth = this.boardBorder.width*5.5/6;
		this.bottomContent = runtime.objects.BottomContent.getFirstInstance();
		this.tileSpace = 1;
		this.boardSize = 10;
		this.grids = [];
		this.shapeProvider = new ShapeProvider();
		
		this.shapePoints = [];
		this.setupShapePoints();
		
		this.tileWidth = (this.boardBorderContentWidth - this.tileSpace*(this.boardSize-1))/this.boardSize;
		
		this.generateGrid();
		this.shapes = [];
		this.shapeScaleAtSlot = 0.5;
		this.shapeOffsetAtDrag = -200;
		this.pieceScaleAtDrag = 0.9;
		this.dragShape = null;
		this.lastDragPoint = null;
		
		this.addShapes();
		this.matchCellsWhenDrag = [];
		this.matchCompleteLinesWhenDrag = [];
		this.updatedPieceAndOriginalColorWhenDrag = [];
		this.hintPieces = [...Array(10).keys()].map(_=> {
			const piece = this.runtime.objects.Piece.createInstance(0,0,0);
			piece.width = this.tileWidth;
			piece.height = this.tileWidth;
			piece.isVisible = false;
			piece.opacity = 0.7;
			piece.zElevation = 0.0001;
			return piece;
		});
		
		this.intractable = true;

		
	}
	
	setupShapePoints()
	{
	const count = 3;
			const shapePointSpacing = 30;
		const shapePointWidth = (this.bottomContent.width - shapePointSpacing*(count+1))/count;
		
		for(let i=0;i<count;i++)
		{
			this.shapePoints.push(new Vector(this.bottomContent.x - this.bottomContent.width/2 + (i+1)*shapePointSpacing + (i+0.5)*shapePointWidth,this.bottomContent.y));
		}
	}
	
	generateGrid()
	{
		const bottomLeft = new Vector(this.boardBorder.x - this.boardBorderContentWidth/2,this.boardBorder.y + this.boardBorderContentWidth/2);
		
		for(let i=0;i<this.boardSize;i++)
		{
			for(let j=0;j<this.boardSize;j++)
			{
				const position = bottomLeft.add(new Vector((j+.5)*this.tileWidth +(j)*this.tileSpace,-((i+.5)*this.tileWidth + (i)*this.tileSpace)));
				const gridTile = this.runtime.objects.GridTile.createInstance(0,position.x,position.y);
				gridTile.width = this.tileWidth;
				gridTile.height = this.tileWidth;
				gridTile.coordinate = new Vector(j,i);
				
				this.grids.push(gridTile);
			}
		}
		
		
	}
	
	onTouchShape(shape,x,y)
	{
		if(this.dragShape ||!this.intractable)
		return;
		
		this.lastDragPoint = new Vector(x,y);
		
		const startScale = shape.scale;
		const startPieceScale = shape.pieceScale;
		const startPosition = shape.y;
		this.dragShape = shape;
		this.dragShape.setZElevation(0.03);
		this.lerpAnim(25,0,1.5,n=>{
			shape.setScale(lerp(startScale,1,n));
			shape.setPieceScale(lerp(startPieceScale,this.pieceScaleAtDrag,n));
			shape.y = lerp(startPosition,startPosition+this.shapeOffsetAtDrag,n);
		});
	}
	
	canPlaceAnyShapes()
	{
		return ([...this.runtime.objects.ShapeGroup.instances()].filter(s=>s.shapePoint).filter(s=>this.canPlaceShapeInBoard(s))).length!==0;
	}
	
	canPlaceShapeInBoard(shape)
	{
		for(let i=0;i<this.grids.length;i++)
		{
			if(this.getNearestCoordinatesForShape(shape,this.grids[i]).filter(g=>!g.piece).length === shape.pieces.length)
			{
				return true;
			}
		}
		return false;
		
	}
	
	
	getNearestCoordinatesForShape(shape,firstPieceGridCell)
	{
	const firstPiece = shape.pieces[0];
	
			
		const matchGridCells = shape.pieces.map(p=>{
		
			const relCoordinate = this.relativeCoordinate(p.relCoordinate,firstPiece.relCoordinate);
			const targetCoordinate = firstPieceGridCell.coordinate.clone().add(relCoordinate);
			
			
			if(targetCoordinate.x <0 || targetCoordinate.x>this.boardSize-1 || 	targetCoordinate.y<0 || targetCoordinate.y>this.boardSize-1)
			{
				return null;
			}
			
			return this.getGridCell(targetCoordinate.x,targetCoordinate.y);
			
		});	
			
		if(matchGridCells.filter(c=>c!==null).length === shape.pieces.length)
		{
			return matchGridCells;
		}
		
		return [];
	}
	
	updateMatchCompleWhenDragging()
	{
		const newLines = this.getMatchCompleteLines();
		if(this.arrayMatched(newLines,this.matchCompleteLinesWhenDrag))
		{
			return;
		}
		
		this.updatedPieceAndOriginalColorWhenDrag.forEach(p=>p.piece.setColor(p.color));
		
		this.updatedPieceAndOriginalColorWhenDrag = [];
		
		
		
		newLines.forEach(l=>l.forEach(c=> {
			const p = c.piece;
			
			if(!p)
			return;
			
			const lastColor = p.color;
			p.setColor(this.dragShape.color);
			this.updatedPieceAndOriginalColorWhenDrag.push({color:lastColor,piece:p});
		}));
		
		this.matchCompleteLinesWhenDrag = newLines;
		
	}
	
	
	arrayMatched(arr1,arr2)
	{
		if(!arr1 || !arr2)
		return false;
		
		if(arr1.length !== arr2.length)
		return false;
		
		for(let i =0;i<arr1.length;i++)
		{
			if(Array.isArray(arr1[i]) && Array.isArray(arr2[i]))
			{
				if(!this.arrayMatched(arr1[i],arr2[i]))
					return false;
			}
			else if(arr1[i] !== arr2[i])
					return false;
		}
		
		return true;
	}
	
	getMatchCompleteLines()
	{
		const lines = [];
		
		//horizontal
		for(let i=0;i<this.boardSize;i++)
		{
			const cells = [...Array(this.boardSize).keys()].map(j=>this.getGridCell(j,i));
			if(cells.every(c=>c.piece || this.matchCellsWhenDrag.indexOf(c)!==-1))
				lines.push(cells);
		}
		
		
		//vertical
		for(let i=0;i<this.boardSize;i++)
		{
			const cells = [...Array(this.boardSize).keys()].map(j=>this.getGridCell(i,j));
			if(cells.every(c=>c.piece || this.matchCellsWhenDrag.indexOf(c)!==-1))
				lines.push(cells);
		}
		return lines;
		
	}
	
	getNearestGridsForDraggingShape()
	{
		const firstPiece = this.dragShape.pieces[0];
		
		const nearestGridCell = this.grids.map(g=> {
			return {
				dist: new Vector(g.x - firstPiece.x,g.y-firstPiece.y).mag(),
				item:g
			}
		}).sort((a,b)=>a.dist-b.dist)[0].item;
		
		
		if(new Vector(nearestGridCell.x - firstPiece.x,nearestGridCell.y-firstPiece.y).mag() > this.tileWidth/2)
			return [];
			
		const matchGridCells = this.dragShape.pieces.map(p=>{
		
			const relCoordinate = this.relativeCoordinate(p.relCoordinate,firstPiece.relCoordinate);
			const targetCoordinate = nearestGridCell.coordinate.clone().add(relCoordinate);
			
			
			if(targetCoordinate.x <0 || targetCoordinate.x>this.boardSize-1 || targetCoordinate.y<0 || targetCoordinate.y>this.boardSize-1)
			{
				return null;
			}
			
			return this.getGridCell(targetCoordinate.x,targetCoordinate.y);
			
		});	
			
		if(matchGridCells.filter(c=>c!==null).length !== this.dragShape.pieces.length)
		{
			
			return [];
		}
		return matchGridCells;
	}
	
	relativeCoordinate(target,base)
	{
		return target.clone().sub(base);
	}
	
	
	onDragShape(x,y)
	{
	
		if(!this.dragShape)
		return;
		this.dragShape.setXY(this.dragShape.x + x - this.lastDragPoint.x,this.dragShape.y+y - this.lastDragPoint.y);
		this.lastDragPoint = new Vector(x,y);
		
		const nearestGrids = this.getNearestGridsForDraggingShape();
		this.matchCellsWhenDrag = nearestGrids.every(c=>!c.piece) ?nearestGrids : [];
		this.updateHintForMatchCells();
		this.updateMatchCompleWhenDragging();
	}
	
	updateHintForMatchCells()
	{
		for(let i=0;i<this.hintPieces.length;i++)
		{
			const visible =  i<this.matchCellsWhenDrag.length;
			this.hintPieces[i].isVisible =visible;
			
			if(visible)
			{	this.hintPieces[i].x = this.matchCellsWhenDrag[i].x;
				this.hintPieces[i].y = this.matchCellsWhenDrag[i].y;
				this.hintPieces[i].setColor(this.dragShape.color);
				}
		}
	}
	
	async onTouchUp()
	{
		if(!this.dragShape)
		return;
		
		if(this.matchCellsWhenDrag.length === this.dragShape.pieces.length)
		{
			this.placeTheDragShape();
			
			await this.delay(0.01);
			if([...this.runtime.objects.ShapeGroup.instances()].length===1)
				this.addShapes();
		}
		else
		{
		this.dragShape.setZElevation(0.01);
			this.returnDragShape();
		}

	}
	
	async placeTheDragShape()
	{
		const pieces = this.dragShape.pieces;
		const piecesStartPoint = pieces.map(p=>new Vector(p.x,p.y));
		const matchCells = this.matchCellsWhenDrag;
		const matchedLines = this.matchCompleteLinesWhenDrag;
		
		this.matchCellsWhenDrag = [];
		this.updateHintForMatchCells();
		this.updatedPieceAndOriginalColorWhenDrag = [];
		this.dragShape.setZElevation(0.01);
		this.dragShape.destroy();
		this.dragShape = null;
		
		this.playSound("blockplace");
		
		
		for(let i=0;i<pieces.length;i++)
			{
				matchCells[i].piece = pieces[i];
				
			}
		
		await this.lerpAnim(15,0,1.5,n=>{
			for(let i=0;i<pieces.length;i++)
			{
				pieces[i].x = lerp(piecesStartPoint[i].x,matchCells[i].x,n);
				pieces[i].y = lerp(piecesStartPoint[i].y,matchCells[i].y,n);
				pieces[i].width = lerp(this.pieceScaleAtDrag,1,n)*this.tileWidth;
				pieces[i].height = lerp(this.pieceScaleAtDrag,1,n)*this.tileWidth;
			}
		});
		
		this.runtime.globalVars.Score += pieces.length;

		

		if(matchedLines.length)
		{
		this.intractable = false;
		matchedLines.forEach(l=>{
			
			this.completeLine(l);
			
		});
		
		await this.delay(.3);
		
		this.intractable = true;
		}
		if(!this.canPlaceAnyShapes()&&[...this.runtime.objects.ShapeGroup.instances()].length>1)
		{
			this.overTheGame();
		}
	}
	
	async completeLine(line)
	{
		this.playSound("blockExplode1");
		this.runtime.globalVars.Score += line.length;
		const orderedLine = line.sort((a,b)=>a.x - b.x + a.y -b.y);
		for(let i=0;i<orderedLine.length;i++)
		{
			const piece = orderedLine[i].piece;
			orderedLine[i].piece = null;
			if(piece)
			{
				const particles = this.runtime.objects.DiamondBreakParticles.createInstance(0,piece.x,piece.y);
				particles.color = piece.color;
				particles.simulate();
				piece.destroy();
				await this.delay(0.01);
			}
		}
	}
	
	returnDragShape()
	{
		const shape = this.dragShape;
		const startScale = shape.scale;
		const startPieceScale = shape.pieceScale;
		const startPositionX = shape.x;
		const startPositionY = shape.y;
		
		
		
		this.lerpAnim(15,0,1.5,n=>{
			shape.setScale(lerp(startScale,this.shapeScaleAtSlot,n));
			shape.setPieceScale(lerp(startPieceScale,1,n));
			shape.setXY(lerp(startPositionX,shape.shapePoint.x,n),lerp(startPositionY,shape.shapePoint.y,n));
		});
		
		this.dragShape = null;
		this.playSound("blockwrong");
		
	}
	
	async addShapes()
	{
		this.shapePoints.forEach(p=>{
			const shape = this.runtime.objects.ShapeGroup.createInstance(0,p.x,p.y);
			shape.init(this.shapeProvider.getRandomShapes(),rand(1,7),this.tileWidth,this.tileSpace);
			shape.setScale(0.5);
			shape.shapePoint = p;
			this.shapes.push(shape);
			
			this.lerpAnim(18,0,1.5,n=>{
				shape.setScale(lerp(0.1,this.shapeScaleAtSlot,n));
			});
		});
		await this.delay(0.1);
		if(!this.canPlaceAnyShapes())
		this.overTheGame();
	}
	

	
			//Play sound effect
	playSound(name)
	{
	if(this.runtime.globalVars.SoundDisable)
	return;
		const ist = this.runtime.objects.SoundEffect.createInstance(0,0,0);
		ist.instVars.Name = name;
		ist.destroy();
	}
	
	getGridCell(x,y)
	{
		return this.grids[y*this.boardSize+x];
	}
	
	

	async overTheGame()
	{
		this.intractable = false;
		this.playSound("over");
		
		const shapes = [...this.runtime.objects.ShapeGroup.instances()];
		
		for(let i=0;i<shapes.length;i++)
		{
		this.lerpAnim(5,0,1.4,n=>{
			shapes[i].setOpacity(lerp(1,0.5,n));
		});
		this.delay(0.2);
		}
		
		await this.noMoveMovesAnim();
		await this.delay(1.5);
		this.runtime.globalVars.GameState = "over";
		this.sendEvent("over");
	}

	
	async noMoveMovesAnim()
	{
		const noMoreMoveTxt = this.runtime.objects.NoMovesTxt.getFirstInstance();
		const startX = noMoreMoveTxt.x;
		const intermidateX = this.runtime.layout.width/2+100;
		const endX = this.runtime.layout.width/2;
		
		await this.lerpAnim(10,0,1.5,n=>{
			noMoreMoveTxt.x = lerp(startX,intermidateX,n);
		});
		
		await this.lerpAnim(15,0,1.5,n=>{
			noMoreMoveTxt.x = lerp(intermidateX,endX,n);
		});
		
	}
	
	
	delay(s)
	{
		return new Promise((resolve,_)=>{
			setTimeout(resolve,s);
		});
	}

	//send the event to event sheet
	sendEvent(name)
	{
		const event = this.runtime.objects.SimpleEvent.createInstance(0,0,0);
		event.instVars.Name = name;
		event.destroy();
	}
	
	
	
	addToUpdatables(updatable)
	{
		this.updatables.push(updatable);
	}
	
	removeFromUpdatables(updatable)
	{
		this.updatables.slice(this.updatables.indexOf(updatable),1);
	}
	
	update(runtime)
	{
		this.updatables.forEach(u=>u.update(runtime.dt));
		for(const particles of this.runtime.objects.DiamondBreakParticles.instances())
		{
			particles.update(runtime.dt);
		}
	}
	


	linearAnim(speed,updateCallback,finished)
	{
		return new Promise((resolve,_)=>{
			
			let anim = null;
			anim = new LinearMoveAnim(speed,updateCallback,()=>{
				this.removeFromUpdatables(anim);
				if(finished)finished();
				resolve();
				
			});
			
			this.addToUpdatables(anim);
		});
	}
	
	
	lerpAnim(speed,start,end,updateCallback,finished)
	{
		return new Promise((resolve,_)=>{
			
			let anim = null;
			anim = new LerpAnim(speed,start,end,updateCallback,()=>{
				this.removeFromUpdatables(anim);
				if(finished)finished();
				
				resolve();
			});
			
			this.addToUpdatables(anim);
		});
	}

	delay(s)
	{
		return new Promise((resolve,_)=>{
			setTimeout(resolve,s*1000);
		});
	}

}


