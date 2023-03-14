"use strict";
import engine from "../index.js";
let kMinToEmit = 5; // Smallest number of particle emitted per cycle

class ParticleEmitter {
    constructor(px, py) {
        // Emitter position
        this.mEmitPosition = [px, py];
        // Number of particles left to be emitted
        this.mNumParticles = 10;
        // Size of particles
        this.mSize = 0.01;
        // Color of effect
        this.mStartColor = [1, 0, 1, 1];
        this.mEndColor = [0, 1, 1, 1];
        // Modifier for the size
        this.mSizeRange = 5;
        // Rate of change of size per update as scale
        this.mSizeROC = 0.98;
    }

    // Getter functions
    getSize() { return this.mSize; }
    getStartColor() { return this.mStartColor; }
    getEndColor() { return this.mEndColor; }
    getSizeRange() { return this.mSizeRange; }
    getPosition() { return this.mEmitPosition; }
    getSizeROC(){ return this.mSizeROC; }

    // Setter functions
    setSize(size) { this.mSize = size; }
    setStartColor(color) { this.mStartColor = color; }
    setEndColor(color) { this.mEndColor = color; }
    setSizeRange(Range) { this.mSizeRange = Range; }
    setPosition(x, y) { this.mEmitPosition = [x, y]; }
    setSizeROC(rate) { this.mSizeROC = rate; }
    setThickness(scalar) {this.mNumParticles *= scalar; }

    // Sets mNumParticles to 0 to kill the effect
    kill(){ this.mNumParticles = 0; }

    // Check if there are particles remaining
    expired() { return (this.mNumParticles <= 0); }

    emitParticles(pSet) {
        let numToEmit = 0;
        if (this.mNumParticles < this.kMinToEmit) {
            // If only a few are left, emits all of them
            numToEmit = this.mNumParticles;
        } else {
            // Otherwise, emits about 20% of what's left
            numToEmit = Math.trunc(Math.random() * 0.2 * this.mNumParticles);
        }
        // Left for future emitting.
        this.mNumParticles -= numToEmit;                    
        
        let i, p;
        for (i = 0; i < numToEmit; i++) {
            p = this.createParticle(this.mEmitPosition[0], this.mEmitPosition[1]);
            pSet.addToSet(p);
        }
    }

    createParticle(atX, atY) {
        let life = 30 + Math.random() * 200;
        let p = new engine.Particle(engine.defaultResources.getDefaultPSTexture(), atX, atY, life);
        
        p.setColor(this.mStartColor);
        
        // size of the particle
        let r = this.mSize + Math.random() * this.mSizeRange;
        p.setSize(r, r);

        // final color
        p.setFinalColor(this.mEndColor);

        // velocity on the particle
        let fx = 10 - 20 * Math.random();
        let fy = 10 * Math.random();
        p.setVelocity(fx, fy);

        // size delta
        p.setSizeDelta(this.mSizeROC);

        return p;
    }
}

export default ParticleEmitter;