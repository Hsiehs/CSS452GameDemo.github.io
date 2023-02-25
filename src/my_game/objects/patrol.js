"use strict";

import engine from "../../engine/index.js";
import Head from "./head.js";

class Patrol extends engine.GameObject {
    constructor(headTexture, wingTexture) {
        super();
        // upon construction set position random bounded between top/bot 25%
         let headX = 0;
         let headY = 0;
        // creation of patrol elements:
        // head
        this.head = new Head(headTexture, [headX, headY]);
        // wings
    }

    draw(camera) {
        this.head.draw(camera);
    }

    update() {
        // check if completely outside of view on right for deletion
        this.isDead();
        // if patrol contacts viewport, reflects speed in new dir unlus right bound
        this.keepPatrolOnscreen();
        // interpolate wing positions, defined in wing class

        // update the elements
        this.head.update();
    }

    // check if outside bounds on right bound and alpha val of wing < 0
    isDead() {

    }

    // checks all of the bounds of the viewport except the right side
    keepPatrolOnscreen() {

    }
}

export default Patrol;