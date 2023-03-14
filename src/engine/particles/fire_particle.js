"use strict";

import Particle from "./particle.js";

class FireParticle extends Particle{
    update(){
        super.update();
        let cpos = this.getPosition();
        // flickering/jumpiness of flame embers in air
        if (Math.random() > 0.5) {
            this.setPosition(cpos[0] + ((Math.random() - 0.5) * 0.5), cpos[1]);
        } else {
            this.setPosition(cpos[0], cpos[1] + ((Math.random() - 0.5) * 0.5));
        }
    }
}

export default FireParticle;