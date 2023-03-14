"use strict";  // Operate in Strict mode such that variables must be declared before used!

import Camera from "../../engine/cameras/camera_main.js";
import engine from "../../engine/index.js";

class DyePack extends engine.GameObject {
    constructor(spriteTexture, x, y) {
        super(null);
        this.kRefWidth = 80;
        this.kRefHeight = 130;
        this.kSpeed = 2;
        this.hitFlag = false;
        this.lifespan = 300; //frames

        this.mRenderComponent = new engine.SpriteRenderable(spriteTexture);
        this.mRenderComponent.setColor([1, 1, 1, 0.1]);
        this.mRenderComponent.getXform().setPosition(x + 4, y + 3.5);
        this.mRenderComponent.getXform().setSize(this.kRefWidth / 50, this.kRefHeight / 50);
        this.mRenderComponent.getXform().setRotationInDegree(90);
        this.mRenderComponent.setElementPixelPositions(510, 595, 23, 153);
        
    }

    update() {
        this.lifespan--;
        this.mRenderComponent.getXform().incXPosBy(this.kSpeed);
    }

    hasNoLife(){ 
        return (this.lifespan < 0);
    }
    
    isMotionless(){
        return (this.kSpeed < 0);
    }

    hit(){
        this.hitFlag = true;
    }
    getHitFlag(){
        return this.hitFlag; 
    }

    kill(){
        this.lifespan = -1;
    }

    //Only checks positive X axis (bad general solution but works :) ).
    isOutOfBounds(cam){
        return (this.getXform().getXPos() >= cam.getWCCenter()[0] + cam.getWCCenter()[0]); 
    }

    slowDown(){
        if(this.kSpeed > 0) {
            this.kSpeed -= 0.1;
        }
    }

    pauseForOscillation(){
        this.kSpeed = 0;

    }

    setLifeSpan(time){
        this.lifespan = time;
    }

}

export default DyePack;