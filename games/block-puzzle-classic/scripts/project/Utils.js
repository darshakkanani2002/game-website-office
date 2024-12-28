export function lerp(x,y,val)
{
	const v = val>1?1:val<0?0:val;
	
	return x + (y-x)*v;
	
}

export function clamp(val,min,max)
{

	return	val < min ? min : (val > max ? max : val);
}

export function max(val1,val2)
{
	return val1>val2?val1:val2;
}

export function rand(start,end)
{
	return Math.floor(Math.random()*(end-start)) + start;
}

export function randFloat(start,end)
{
	return Math.random()*(end-start) + start;
}

export function getRandomFromList(list,count=1)
{
	const targetList= [];
	
	for(let i=0;i<count;i++)
	{
		const index = rand(0,list.length);
		targetList.push(list[index]);
		list.splice(index,1);
	}
	
	return targetList;
}