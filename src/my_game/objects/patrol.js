"use strict";

import engine from "../../engine/index.js";
import Head from "./head.js";
import TopWing from "./top_wing.js";
import BottomWing from "./bottom_wing.js";
import BoundingBox from "../../engine/utils/bounding_box.js";

class Patrol extends engine.GameObject {
    constructor(headTexture, wingTexture) {
        super();
        // upon construction set position random bounded between top/bot 25%
        // 100 < X < 200    
        // 37.5 < Y < 112.5
        let headX = Math.random() * (200 - 100) + 100;
        let headY = Math.random() * (112.5 - 37.5) + 37.5;
        // creation of patrol elements:
        // head
        this.head = new Head(headTexture, [headX, headY]);
        // wings
        this.wing1 = new TopWing(wingTexture, [headX + 10, headY + 6], this.head);
        this.wing2 = new BottomWing(wingTexture, [headX + 10, headY - 6], this.head);

    }

    draw(camera) {
        this.head.draw(camera);
        this.wing1.draw(camera);
        this.wing2.draw(camera);
    }

    update() {
        // if patrol contacts viewport, reflects speed in new dir unlus right bound
        this.keepPatrolOnscreen();

        // update the elements
        this.head.update();
        this.wing1.update();
        this.wing2.update();

    }

    // check if outside bounds on right bound and alpha val of wing < 0
    isDead() {
        if (this.wing1.getColor() >= 1 || this.wing2.getColor() >= 1 || this.head.getXform().getXPos() + 3.75 > 200) {
            return true;
        } else {
            return false;
        }
    }

    hit() {
        this.head.isHit();
        this.wing1.isHit();
        this.wing2.isHit();
    }

    // checks if patrol is inside bounds of the viewport except the right side
    keepPatrolOnscreen() {
        let currentDir = this.head.getCurrentFrontDir();
        //Left 
        if (this.head.getXform().getXPos() - 3.75 <= 0) {
            this.head.setCurrentFrontDir(this.dotProduct([0, -1]));
        }

        //Bottom
        if (this.head.getXform().getYPos() - 4 <= 0) {
            this.head.setCurrentFrontDir(this.dotProduct([-1, 0]));
        }

        //Top
        if (this.head.getXform().getYPos() + 4 >= 150) {
            this.head.setCurrentFrontDir(this.dotProduct([1, 0]));
        }

    }
    dotProduct(normal) {
        let direction = this.head.getCurrentFrontDir(); // Get input direction vector
        let dot = vec2.dot(direction, normal);  // Calculate dot product
        let test = (2 * dot);
        let scaled = vec2.scale([], normal, test);
        console.log(scaled);
        console.log(dot);
        let reflection = vec2.sub([], scaled, direction);  // Calculate reflected vector
        return reflection;
    }
}

export default Patrol;