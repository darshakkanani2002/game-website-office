
import MainScene from "./MainScene.js";
import ShapeGroup from "./ShapeGroup.js";
import Piece from "./Piece.js";
import DiamondBreakParticles from "./DiamondBreakParticles.js";

export let scene = null;

runOnStartup(async runtime =>
{
	// Code to run on the loading screen.
	// Note layouts, objects etc. are not yet available.

console.log("Run on start up");
	runtime.objects.ShapeGroup.setInstanceClass(ShapeGroup);
	runtime.objects.Piece.setInstanceClass(Piece);
	runtime.objects.DiamondBreakParticles.setInstanceClass(DiamondBreakParticles);
	runtime.getLayout("Game").addEventListener("beforelayoutstart",()=>{
		scene = new MainScene(runtime);
		console.log("Load Scene");
	
	});
	
	runtime.addEventListener("beforeprojectstart", () => OnBeforeProjectStart(runtime));
});

function OnBeforeProjectStart(runtime)
{

	runtime.addEventListener("tick", () => Tick(runtime));
}

function Tick(runtime)
{
	if(scene)
	{
		scene.update(runtime);
	}
}
