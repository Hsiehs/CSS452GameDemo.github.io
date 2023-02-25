"use strict";  // Operate in Strict mode such that variables must be declared before used!

import engine from "../../engine/index.js";

class DyePack extends engine.GameObject {
    constructor(spriteTexture, x, y) {
        super(null);
        this.kRefWidth = 80;
        this.kRefHeight = 130;
        this.kSpeed = 2; 
        this.lifespan = 300; //frames

        this.mRenderComponent = new engine.SpriteRenderable(spriteTexture);
        this.mRenderComponent.setColor([1, 1, 1, 0.1]);
        this.mRenderComponent.getXform().setPosition(x + 4, y + 3.5);
        this.mRenderComponent.getXform().setSize(this.kRefWidth / 50, this.kRefHeight / 50);
        this.mRenderComponent.getXform().setRotationInDegree(90);
        this.mRenderComponent.setElementPixelPositions(510, 595, 23, 153);
        
        this.mBounce = new engine.Oscillate(4, 20 , 300);
    }

    update() {
        this.lifespan--;
        this.mRenderComponent.getXform().incXPosBy(this.kSpeed);
    }

    checkLifeSpan(){ 
        return (this.lifespan < 0 );
    }
}

export default DyePack;