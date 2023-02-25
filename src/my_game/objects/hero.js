"use strict";  // Operate in Strict mode such that variables must be declared before used!

import engine from "../../engine/index.js";

class Hero extends engine.GameObject {
    constructor(spriteTexture) {
        super(null);
        this.kDelta = 0.3;
        this.collider = null;

        this.mRenderComponent = new engine.SpriteRenderable(spriteTexture);
        this.mRenderComponent.setColor([1, 1, 1, 0]);
        this.mRenderComponent.getXform().setPosition(10, 75);
        this.mRenderComponent.getXform().setSize(9, 12);
        this.mRenderComponent.setElementPixelPositions(0, 120, 0, 180);
    }

    update() {
        this.collider =   this.getBBox();
        this.mRenderComponent.getXform().setSize(9, 12);
    }

}

export default Hero;