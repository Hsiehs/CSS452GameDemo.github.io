"use strict";

import ParticleEmitter from "./particle_emitter.js";
import engine from "../index.js";

class SmokeEmitter extends ParticleEmitter {
    // if lifespan is -1 it is ongoing
    constructor(pX, pY, lifespan) {
        super(pX, pY);
        this.mLifeSpan = null;
        if (lifespan != -1) {
            this.mLifeSpan = Date.now() + lifespan;
        }

        // Default Smoke effect values
        this.mNumParticles = 1;
        this.mSize = 3;
        this.mStartColor = [0.8, 0.8, 0.8, 1];
        this.mEndColor = [0, 0, 0, 1];
        this.mSizeROC = 1;  
        this.mSizeRange = 2;

        this.mXCoverage = 10;
        this.mYCoverage = 10;

        this.mXWind = 0;
        this.mYWind = 0;
    }

    getXCoverage(){ return this.mXCoverage};
    getYCoverage(){ return this.mYCoverage};

    setXCoverage(xCoverage){ this.mXCoverage = xCoverage};
    setYCoverage(yCoverage){ this.mYCoverage = yCoverage};

    getXWind() { return this.mXWind};
    getYWind() { return this.mYWind};

    setXWind(xWind) { this.mXWind = xWind};
    setYWind(yWind) { this.mYWind = yWind};

    emitParticles(pSet) {
        let i, p ,x ,y;
        for (i = 0; i < this.mNumParticles; i++) {
            x = Math.floor(Math.random() * (this.mXCoverage + 1));
            y = Math.floor(Math.random() * (this.mYCoverage + 1));
            p = this.createParticle(this.mEmitPosition[0] + x, this.mEmitPosition[1] + y);
            pSet.addToSet(p);
        }
        if (this.mLifeSpan != null && this.mLifeSpan < Date.now()) {
            this.kill();
        }
    }

    createParticle(atX, atY) {
        let life = 30 + Math.random() * 300;
        let p = new engine.Particle(engine.defaultResources.getDefaultPSTexture(), atX, atY, life, this.mStartColor);
        // size of the particle
        let r = this.mSizeRange + Math.random() * this.mSize;
        p.setSize(r, r);
        // velocity on the particle
        let fx = 10 - 20 * Math.random();
        let fy = 10 * Math.random();
        p.setVelocity(fx, fy);

        p.setAcceleration(this.mXWind, this.mYWind);

        // final color
        p.setFinalColor(this.mEndColor);

        // size delta
        p.setSizeDelta(this.mSizeROC);

        return p;
    }

}

export default SmokeEmitter;