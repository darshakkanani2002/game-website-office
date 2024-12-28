//Customize your settings Here

// 0/255, 255/255, 157/255
// 0/255, 255/255, 238/255
// 255/255, 234/255, 0/255
// 255/255, 115/255, 0/255
// 122/255, 205/255, 240/255
// 255/255, 0/255, 123/255
// 225/255, 0/255, 255/255
const hexColors = [
'#DD62C1',
'#6BD852',
'#44D0D0',
'#3D8FDB',
'#E96C54',
'#9786FE',
'#A1958E',
'#FAB441',
'#F6607C'
];

//Random Tiles Colors
export let colors = hexColors.map(c=>hexToRgb(c));

export const boardSettings = {
	padding: 5,
	spacing : 10,
	pendingBlockDropSpeed:100,
	confirmBlockDropSpeed:3500
};




function hexToRgb(hex) 
{
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [
    parseInt(result[1], 16)/255,
    parseInt(result[2], 16)/255,
    parseInt(result[3], 16)/255
  ] : null;
}