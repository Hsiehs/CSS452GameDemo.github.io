"use strict";

import engine from "../../engine/index.js";

class TopWing extends engine.GameObject {
    constructor(spriteTexture, position) {
        super();
        // the top minion
        this.mWingMinion = new engine.SpriteAnimateRenderable(spriteTexture);
        this.mWingMinion.setColor([1, 1, 1, 0]);
        this.mWingMinion.getXform().setPosition(position[0], position[1]);
        this.mWingMinion.getXform().setSize(10, 8);
        this.mWingMinion.setSpriteSequence(348, 0,      // first element pixel position: top-left 164 from 512 is top of image, 0 is left of image
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
    }

    isHit() {
        this.mWingMinion.setColor([1, 1, 1, this.mWingMinion.getColor()[3] + 0.2]);
    }

    draw(camera){
        this.mWingMinion.draw(camera);
    }
}

export default TopWing;
