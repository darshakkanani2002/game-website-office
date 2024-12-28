import {randFloat} from './Utils.js';
import Vector from './Vector.js';


export default class DiamondBreakParticles extends ISpriteInstance{
	constructor()
	{
		super();
		
		this.particleCount = 10;
		this.growRate = 0;
		this.growRateRandomizer = 0;
		
		this.size = 1;
		this.sizeRandomizer = .8;
		
		this.gravity = 6000;
		this.angle = 30;
		
		this.lifeTime = 3;
		this.lifeTimeRandomizer = 1;
		
		this.angularVelocity = 60;
		this.angularVelocityRandomizer = 40;
		
		this.speed = -500;
		this.speedRandomizer = 300;
		
		
		
		this.particles = [];

		this.simulating = false;
		
		this.timeLeft = this.lifeTime + this.lifeTimeRandomizer;
		this.color = 1;
	}
	
	simulate()
	{
	
		if(this.simulating)
		return;
		
		for(let i=0;i< this.particleCount;i++)
		{
			const particle = this.runtime.objects.DiamondBreak.createInstance(0,this.x,this.y);
			particle.setAnimation(this.color+'');
			const size = this.size + randFloat(-this.sizeRandomizer,this.sizeRandomizer);
			particle.width *= size;
			particle.height *= size;
			particle.size = size;
			
			
			
	
			
			
			
			const angularVelocity = this.angularVelocity + randFloat(-this.angularVelocityRandomizer,this.angularVelocityRandomizer);
			particle.angularVelocity = angularVelocity;
			
			particle.angle = randFloat(0,2*Math.PI);
			
			const speed = this.speed + randFloat(-this.speedRandomizer,this.speedRandomizer);
			
			const direction = this.getSimulateDirection();
			particle.velX = direction.x * speed;
			particle.velY = direction.y *speed;
			
			this.particles.push(particle);
			
			
		}
		
		this.simulating = true;
	}
	
	getSimulateDirection()
	{
			const a = randFloat(-this.angle/2,this.angle/2);
			const s = Math.sin(a);
			const c = Math.cos(a);
			const refVec = new Vector(0,1);
			return new Vector(refVec.x*c - refVec.y*s,
			refVec.y*c - refVec.x*s);
	}
	
	update(dt)
	{
	
		if(!this.simulating)
			return;
	
		this.timeLeft -= dt;
		
		
		this.particles.forEach(p=>{
			p.y += dt*p.velY;
			p.velY += this.gravity*dt;
			
			p.x += dt*p.velX;
			
			p.angle += p.angularVelocity*dt*Math.PI/180;
		});
		
		if(this.timeLeft<=0)
		{
			this.particles.forEach(p=>p.destroy());
			this.destroy();
		}
		
	}
}