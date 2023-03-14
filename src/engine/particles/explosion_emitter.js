"use strict";

import ParticleEmitter from "./particle_emitter.js";
import engine from "../index.js";
import Particle from "./particle.js";

class ExplosionEmitter extends ParticleEmitter {
    constructor(px, py) {
        super(px, py);

        // One explosion
        this.lifetime = 600 + Date.now();

        // Defualt effect values
        this.mNumParticles = 4; 
        this.mStartColor = [1, 0.5, 0, 1]; // orange
        this.mEndColor = [0, 0, 0, 0]; // black (fully transparent)
        this.mSize = 2;
        this.mSizeROC = 0.8;
        this.mSizeRange = 3.75;
        
        // Default explosion effect values
        this.mExplosionRadius = 10;
        this.mExplosionForce = 2;
    }
    
    // Getter functions
    getExplosionTargetRadius() { return this.mExplosionRadius; }
    getExplosionForce() { return this.mExplosionForce; }
    
    // Setter functions
    setExplosionTargetRadius(radius) { this.mExplosionRadius = radius; }
    setExplosionForce(force) { this.mExplosionForce = force; }

    createParticle(atX, atY) {
        let life = 1300 + Math.random() * 50;
        let p = new engine.Particle(engine.defaultResources.getDefaultPSTexture(), atX, atY, life);

        // Set particle color to start color
        p.setColor(this.mStartColor);

        // Randomize particle size within range
        let r = this.mSize + Math.random() * this.mSizeRange;
        p.setSize(r, r);

        // Set final color to end color
        p.setFinalColor(this.mEndColor);

        // Set particle velocity to move away from origin
        let fx = (atX - this.getPosition()[0]) * this.mExplosionForce;
        let fy = (atY - this.getPosition()[1]) * this.mExplosionForce * 1.5;
        p.setVelocity(fx, fy);

        // Set size delta to decrease size over time
        p.setSizeDelta(this.mSizeROC);

        return p;
    }
    
    emitParticles(pSet) {
        if(this.lifetime < Date.now()) { this.kill(); }
        for (let i = 0; i < this.mNumParticles; i++) {
            let angle = Math.random() * Math.PI * 2;
            let radius = Math.random() * this.mExplosionRadius;
            let x = this.mEmitPosition[0] + radius * Math.cos(angle);
            let y = this.mEmitPosition[1] + radius * Math.sin(angle);
            let p = this.createParticle(x, y);
            pSet.addToSet(p);
        }
    }
}

export default ExplosionEmitter;