"use strict";

import engine from "../../engine/index.js";

class Head extends engine.GameObject {
    constructor(spriteTexture, position) {
        super();
        
        this.setSpeed((5 + (Math.random() * 5)) / 60); // at least 5 ups random spd

        //set random direction
        let dir = this.getCurrentFrontDir();
        let angle = Math.random() * 2 * Math.PI;
        let x = dir[0] * Math.cos(angle) - dir[1] * Math.sin(angle);
        let y = dir[0] * Math.sin(angle) + dir[1] * Math.cos(angle);
        let newdir = vec2.create();
        vec2.set(newdir, x ,y);
        this.setCurrentFrontDir(newdir);

        this.mRenderComponent = new engine.SpriteRenderable(spriteTexture);
        this.mRenderComponent.setColor([1, 1, 1, 0]);
        this.mRenderComponent.getXform().setPosition(position[0], position[1]);
        this.mRenderComponent.getXform().setSize(7.5, 7.5);
        this.mRenderComponent.setElementPixelPositions(120, 300, 0, 180);

        
    }

    update() {
       super.update();
    }

    isHit() {
        this.mRenderComponent.getXform().incXPosBy(5);
    }

}

export default Head;