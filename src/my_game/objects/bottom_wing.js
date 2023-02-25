"use strict";

import engine from "../../engine/index.js";

class BottomWing extends engine.GameObject{
    constructor(spriteTexture, position, head){
        super();
        this.head = head;
        // Bottom Wing
        this.mWingMinion = new engine.SpriteAnimateRenderable(spriteTexture);
        this.mWingMinion.setColor([1, 1, 1, 0]);
        this.mWingMinion.getXform().setPosition(position[0], position[1]);
        this.mWingMinion.getXform().setSize(10, 8);
        this.mWingMinion.setSpriteSequence(512, 0,     // first element pixel position: top-left 512 is top of image, 0 is left of image
            204, 164,       // width x height in pixels
            5,              // number of elements in this sequence
            0);             // horizontal padding in between
        this.mWingMinion.setAnimationType(engine.eAnimationType.eRight);
        this.mWingMinion.setAnimationSpeed(60);

        this.mLerpX = new engine.Lerp(this.mWingMinion.getXform().getXPos(), 120, 0.05);
        this.mLerpY = new engine.Lerp(this.mWingMinion.getXform().getYPos(), 120, 0.05);
    }

    update() {
        this.mWingMinion.updateAnimation();
        let xtarget = this.head.getXform().getXPos() + 10;
        let ytarget = this.head.getXform().getYPos() - 6;
        this.mLerpX.setFinal(xtarget);
        this.mLerpY.setFinal(ytarget);
        this.mLerpX.update();
        this.mLerpY.update();
        this.mWingMinion.getXform().setXPos(this.mLerpX.get());
        this.mWingMinion.getXform().setYPos(this.mLerpY.get());
    }

    isHit() {
        this.mWingMinion.setColor([1, 1, 1, this.mWingMinion.getColor()[3] + 0.2]);
    }

    draw(camera){
        this.mWingMinion.draw(camera);
    }
    
    getColor(){
        return this.mWingMinion.getColor()[3];
    }

    
}

export default BottomWing;