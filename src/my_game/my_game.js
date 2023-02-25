"use strict";  // Operate in Strict mode such that variables must be declared before used!

import engine from "../engine/index.js";

import Hero from "./objects/hero.js";
import Minion from "./objects/minion.js";
import Brain from "./objects/brain.js";
import DyePack from "./objects/dye_pack.js";
import Lerp from "../engine/utils/lerp.js";

class MyGame extends engine.Scene {
    constructor() {
        super();

        // The camera to view the scene
        this.mCamera = null;

        this.mMsg = null;

        this.mActiveDyePacks = [];

        this.mActivePatrols = [];

        this.autospawn = false;


        this.kBg = "assets/bg.png";
        this.kHero = "assets/favicon.png";
        this.kMinionSprite = "assets/SpriteSheet.png"

        this.mHero = null;
        this.mDyePack = null;

    }
    load() {
        engine.texture.load(this.kBg);
        engine.texture.load(this.kHero);
        engine.texture.load(this.kMinionSprite);
    }

    unload() {
        engine.texture.unload(this.kBg);
        engine.texture.unload(this.kHero);
        engine.texture.unload(this.kMinionSprite);
    }

    init() {
        // Step A: set up the cameras
        this.mCamera = new engine.Camera(
            vec2.fromValues(100, 75), // position of the camera
            200,                       // width of camera
            [0, 0, 800, 600]           // viewport (orgX, orgY, width, height)
        );
        this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
        // sets the background to gray

        this.mBg = new engine.TextureRenderable(this.kBg);
        this.mBg.getXform().setSize(200, 150);
        this.mBg.getXform().setPosition(100, 75);

        this.mHero = new Hero(this.kMinionSprite);
        this.mBrain = new Brain(this.kMinionSprite);
        this.mMinion = new Minion(this.kMinionSprite, 30, 30);

        this.mMsg = new engine.FontRenderable("Status Message");
        this.mMsg.setColor([1, 1, 1, 1]);
        this.mMsg.getXform().setPosition(2, 3);
        this.mMsg.setTextHeight(3);
        
        // bouncing/oscellation of hero and dyepack
        this.mHeroBounce = new engine.Oscillate(0.5, 6, 60);
        this.mDyePackBounce = new engine.Oscillate(4, 20, 300);

        // hero position interpolation
        this.heroLerpX = new Lerp(this.mHero.getXform().getXPos(), 120, 0.05);
        this.heroLerpY = new Lerp(this.mHero.getXform().getYPos(), 120, 0.05);
    }

    // This is the draw function, make sure to setup proper drawing environment, and more
    // importantly, make sure to _NOT_ change any state.
    draw() {
        // Step A: clear the canvas
        engine.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
        this.mCamera.setViewAndCameraMatrix();

        this.mBg.draw(this.mCamera);
        this.mHero.draw(this.mCamera);
        this.mMinion.draw(this.mCamera);
        this.mBrain.draw(this.mCamera);
        this.mMsg.draw(this.mCamera);   // only draw status in the main camera
        
        // update all of the dye packs that are alive
        for (let j = 0; j < this.mActiveDyePacks.length; j++) 
            this.mActiveDyePacks[j].draw(this.mCamera);
        

        // update all of the patrols that are alive
        for (let k = 0; k < this.mActivePatrols.length; k++)
            this.mActivePatrols[k].draw(this.Camera);


    }

    // The Update function, updates the application state. Make sure to _NOT_ draw
    // anything from this function!
    update() {
        // status update
        let msg = "Status: DyePacks(" + this.mActiveDyePacks.length + ") Patrols(" + this.mActivePatrols.length + ") AutoSpawn(" + this.autospawn + ")";

        // call object updates
        // HERO
        this.mHero.update();
        // DYE PACKS
        for (let k = 0; k < this.mActiveDyePacks.length; k++) {
            if (this.mActiveDyePacks[k].hasNoLife() || this.mActiveDyePacks[k].isMotionless() || this.mActiveDyePacks[k].isOutOfBounds(this.mCamera)) {
                this.mActiveDyePacks.splice(k, 1);
            } else {
                this.mActiveDyePacks[k].update();
            }
        }
        // PATROL GROUPS
        

        //Hero position based on mouse if it is in the viewport
        if (this.mCamera.isMouseInViewport) {
            // Get the world-coordinates of the mouse
            let x = this.mCamera.mouseWCX();
            let y = this.mCamera.mouseWCY();

            // Check Up-Down-Left-Right
            // Check if the mouse is out of bounds on the top side
            if (y > this.mCamera.getWCHeight() - this.mHero.collider.mHeight/2) {
                // Set the final interpolation value to the top edge of the camera view minus half the height of the hero
                this.heroLerpY.setFinal(this.mCamera.getWCHeight() - this.mHero.collider.mHeight/2);
            }
            // Check if the mouse is out of bounds on the bottom side
            else if (y < this.mHero.collider.mHeight/2) {
                // Set the final interpolation value to half the height of the hero
                this.heroLerpY.setFinal(this.mHero.collider.mHeight/2);
            }
            // The mouse is within the bounds, set the final interpolation value to the y-coordinate of the mouse
            else {
                this.heroLerpY.setFinal(y);
            }
            
            // Check if the mouse is out of bounds on the left side
            if (x < this.mHero.collider.mWidth/2) {
                // Set the final interpolation value to half the width of the hero
                this.heroLerpX.setFinal(this.mHero.collider.mWidth/2);
            }
            // Check if the mouse is out of bounds on the right side
            else if (x > this.mCamera.getWCWidth() - this.mHero.collider.mWidth/2) {
                // Set the final interpolation value to the right edge of the camera view minus half the width of the hero
                this.heroLerpX.setFinal(this.mCamera.getWCWidth() - this.mHero.collider.mWidth/2);
            }
            // The mouse is within the bounds, set the final interpolation value to the x-coordinate of the mouse
            else {
                this.heroLerpX.setFinal(x);
            }

            // Update the interpolation values
            this.heroLerpX.update();
            this.heroLerpY.update();

            // Set the position of the hero based on the interpolated values
            this.mHero.getXform().setXPos(this.heroLerpX.get());
            this.mHero.getXform().setYPos(this.heroLerpY.get());
        }

        if (engine.input.isKeyClicked(engine.input.keys.Space)) {
            //Spawn dyepack at hero location
            this.mDyePack = new DyePack(this.kMinionSprite, this.mHero.getXform().getXPos(), this.mHero.getXform().getYPos()); // x and y of heros position
            this.mActiveDyePacks.push(this.mDyePack);
        }

        //implement spam protection (make sure hero resets to original position)
        if (engine.input.isKeyClicked(engine.input.keys.Q)) {
            //Triggers a hero hit event
            this.mHeroBounce.reStart();
        }
        if (!this.mHeroBounce.done()) {
            let d = this.mHeroBounce.getNext();
            console.log(d);
            this.mHero.getXform().incHeightBy(d);
            this.mHero.getXform().incWidthBy(d);
        }

        //DyePack inputs
        if (engine.input.isKeyPressed(engine.input.keys.D)) {
            //Triggers a slow down
            for (let i = 0; i < this.mActiveDyePacks.length; i++) {
                this.mActiveDyePacks[i].slowDown();
            }
        }

        if (engine.input.isKeyClicked(engine.input.keys.S)) {
            //Triggers a hit event for all dyepacks
            this.mDyePackBounce.reStart();
            for(let i = 0; i < this.mActiveDyePacks.length; i++){
                this.mActiveDyePacks[i].setLifeSpan(300);
            }
        }
        if (!this.mDyePackBounce.done()) {
            let d = this.mDyePackBounce.getNext();
            for (let i = 0; i < this.mActiveDyePacks.length; i++) {
                this.mActiveDyePacks[i].pauseForOscillation();
                this.mActiveDyePacks[i].getXform().incXPosBy(d);
            }
        }

        //Patrol inputs

        if (engine.input.isKeyClicked(engine.input.keys.P)) {
            //Toggles auto spawning on/off
            if(this.autospawn){
                this.autospawn = false;
            }else{
                this.autospawn = true;
            }
        }

        if (engine.input.isKeyClicked(engine.input.keys.C)) {
            //Spawns new patrol
        }

        if (engine.input.isKeyClicked(engine.input.keys.J)) {
            //Triggers hit even for all patrols
            
        }

        this.mMsg.setText(msg);
    }
}

window.onload = function () {
    engine.init("GLCanvas");

    let myGame = new MyGame();
    myGame.start();
}