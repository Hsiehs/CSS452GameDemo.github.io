"use strict";

import engine from "../../engine/index.js";

class Head extends engine.GameObject {
    constructor(spriteTexture, position) {
        super();
        this.setSpeed((5 + (Math.random() * 5)) / 60); // at least 5 ups random spd
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