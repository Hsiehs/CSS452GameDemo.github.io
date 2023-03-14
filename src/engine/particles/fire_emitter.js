"use strict";

import ParticleEmitter from "./particle_emitter.js";
import engine from "../index.js";
import FireParticle from "./fire_particle.js";

class FireEmitter extends ParticleEmitter {
    // if lifespan is -1 it is ongoing
    constructor(pX, pY, lifespan) {
        super(pX, pY);
        this.mLifeSpan = null;
        if (lifespan != -1) {
            this.mLifeSpan = Date.now() + lifespan;
        }

        // Defualt effect values
        this.mNumParticles = 1;
        this.mSize = 1;
        this.mStartColor = [0, 0, 0, 1];
        this.mEndColor = [1, .5, 0, 1];
        this.mSizeROC = 0.97;
        this.mSizeRange = 2;

        // Default fire effect values
        this.mFlameWindDir = [0, 50];
        this.mFlameSpread = 1;
    }

    // getters
    getWindDirection() { return this.mWindDirection; }
    getFlameSpread() { return this.mFlameSpread; }

    // setters
    setWindDirection(flameWindDir) { this.mFlameWindDir = flameWindDir; }
    setFlameSpread(flameSpread) {this.mFlameSpread = flameSpread; }

    emitParticles(pSet) {
        let i, p;
        for (i = 0; i < this.mNumParticles; i++) {
            p = this.createParticle(this.mEmitPosition[0], this.mEmitPosition[1]);
            pSet.addToSet(p);
        }
        if (this.mLifeSpan != null && this.mLifeSpan < Date.now()) {
            this.kill();
        }
    }

    createParticle(atX, atY) {
        let life = 30 + Math.random() * 60;
        let xStart = atX + ((Math.random() - 0.5) * this.mFlameSpread);
        let p = new FireParticle(engine.defaultResources.getDefaultPSTexture(), xStart, atY, life);

        // size of the particle
        let r = this.mSizeRange + Math.random() * this.mSize;
        p.setSize(r, r);

        // velocity on the particle
        let fx = 10 - 20 * Math.random();
        let fy = 10 * Math.random();
        p.setVelocity(fx, fy);

        p.setAcceleration(this.mFlameWindDir[0], this.mFlameWindDir[1]);

        // final color
        p.setFinalColor(this.mEndColor);

        // size delta
        p.setSizeDelta(this.mSizeROC);

        return p;
    }

}

export default FireEmitter;