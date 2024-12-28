import {scene} from "./Main.js";

function getScene(){
	return scene;
}



const scriptsInEvents = {

	async Egame_Event7_Act2(runtime, localVars)
	{
		scene.playSound('click');
	},

	async Egame_Event12_Act1(runtime, localVars)
	{
		scene.sendEvent("over");
	},

	async Egame_Event14_Act1(runtime, localVars)
	{
		scene.playSound('click');
	},

	async Egame_Event15_Act1(runtime, localVars)
	{
		scene.playSound('click');
	},

	async Egame_Event18_Act1(runtime, localVars)
	{
		scene.playSound('click');
	},

	async Egame_Event19_Act2(runtime, localVars)
	{
		scene.playSound('click');
	},

	async Egame_Event23_Act4(runtime, localVars)
	{
		const shape = runtime.getInstanceByUid(+runtime.globalVars.Temp);
		const x = +runtime.globalVars.Temp1;
		const y = +runtime.globalVars.Temp2;
		getScene().onTouchShape(shape,x,y);
		
	},

	async Egame_Event24_Act1(runtime, localVars)
	{
		if(scene.dragShape)
		{
		
			scene.onTouchUp();
		}
	},

	async Egame_Event25_Act3(runtime, localVars)
	{
		if(scene.dragShape)
		{
		const x = +runtime.globalVars.Temp1;
		const y = +runtime.globalVars.Temp2;
			getScene().onDragShape(x,y);
		}
	},

	async Egame_Event28_Act2(runtime, localVars)
	{
		scene.playSound('click');
	}

};

self.C3.ScriptsInEvents = scriptsInEvents;

