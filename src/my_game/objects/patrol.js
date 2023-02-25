"use strict";

import engine from "../../engine/index.js";
import Head from "./Head.js";

class Patrol extends engine.GameObject {
    constructor(headTexture, wingTexture) {
        // upon construction set position random bounded between top/bot 25%

        // creation of patrol elements:
        // head
        // wings
    }

    update() {
        // check if completely outside of view for deetion

        // if patrol contacts viewport, reflects speed in new dir

        // interpolate wing positions
        // update the elements
    }
}

export default Patrol;