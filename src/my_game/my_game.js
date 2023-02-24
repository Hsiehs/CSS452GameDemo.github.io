"use strict";  // Operate in Strict mode such that variables must be declared before used!

import engine from "../engine/index.js";

import Hero from "./objects/hero.js";
import Minion from "./objects/minion.js";
import Brain from "./objects/brain.js";
import DyePack from "./objects/dye_pack.js";

class MyGame extends engine.Scene {
    constructor() {
        super();

        // The camera to view the scene
        this.mCamera = null;

        this.mMsg = null;
    
        this.mLineSet = [];
        this.mCurrentLine = null;
        this.mP1 = null;

        this.mShowLine = true;

        this.kBg = "assets/bg.png";
        this.kHero = "assets/favicon.png"; 
        this.kMinionSprite = "assets/SpriteSheet.png"
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
            vec2.fromValues(30, 27.5), // position of the camera
            100,                       // width of camera
            [0, 0, 800, 600]           // viewport (orgX, orgY, width, height)
        );
        this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
                // sets the background to gray
        
        this.mBg = new engine.TextureRenderable(this.kBg);
        this.mBg.getXform().setSize(100,80);
        this.mBg.getXform().setPosition(30,30);

        this.mHero = new Hero(this.kMinionSprite);
        this.mBrain = new Brain(this.kMinionSprite);
        this.mMinion = new Minion(this.kMinionSprite, 30, 30);
        this.mDyePack = new DyePack(this.kMinionSprite);


        this.mHero.getXform().setSize(9,12);
        this.mHero.getXform().setPosition(50,40);
        
        this.mMsg = new engine.FontRenderable("Status Message");
        this.mMsg.setColor([0, 0, 0, 1]);
        this.mMsg.getXform().setPosition(-19, -8);
        this.mMsg.setTextHeight(3);
    }
    
    // This is the draw function, make sure to setup proper drawing environment, and more
    // importantly, make sure to _NOT_ change any state.
    draw() {
        // Step A: clear the canvas
        engine.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
        this.mCamera.setViewAndCameraMatrix();

        let i, l;

        this.mBg.draw(this.mCamera);

        for (i = 0; i < this.mLineSet.length; i++) {
            l = this.mLineSet[i];
            l.draw(this.mCamera);
        }
        
        this.mHero.draw(this.mCamera);
        this.mMinion.draw(this.mCamera);
        this.mDyePack.draw(this.mCamera);
        this.mBrain.draw(this.mCamera);
        this.mMsg.draw(this.mCamera);   // only draw status in the main camera
        
    }
    
    // The Update function, updates the application state. Make sure to _NOT_ draw
    // anything from this function!
    update () {
        let msg = "Status: DyePacks() Patrols() AutoSpawn()";
        let x, y;

        //Hero inputs
        if(engine.input.isButtonPressed(engine.input.eMouseButton.eLeft)){
            x = this.mCamera.mouseWCX();
            y = this.mCamera.mouseWCY();
            this.mHero.getXform().setPosition(x,y); 
        }
        
        if(engine.input.isKeyClicked(engine.input.keys.Space)){
            //Spawn dyepack at hero location
        }

        if(engine.input.isKeyClicked(engine.input.keys.Q)){
            //Triggers a hero hit event
        }

        //DyePack inputs

        if(engine.input.isKeyPressed(engine.input.keys.D)){
            //Triggers a slow down 
        }

        if(engine.input.isKeyClicked(engine.input.keys.S)){
            //Triggers a hit event for all dyepacks
        }

        //Patrol inputs

        if(engine.input.isKeyClicked(engine.input.keys.P)){
            //Toggles auto spawning on/off
        }

        if(engine.input.isKeyClicked(engine.input.keys.C)){
            //Spawns new patrol 
        }

        if(engine.input.isKeyClicked(engine.input.keys.J)){
            //Triggers hit even for all patrols
        }

        //7.6 DEFAULT CODE

        // show line or point
        // if  (engine.input.isKeyClicked(engine.input.keys.P)) {
        //     this.mShowLine = !this.mShowLine;
        //     let line = null;
        //     if (this.mCurrentLine !== null)
        //         line = this.mCurrentLine;
        //     else {
        //         if (this.mLineSet.length > 0)
        //             line = this.mLineSet[this.mLineSet.length-1];
        //     }
        //     if (line !== null)
        //         line.setShowLine(this.mShowLine);
        // }
    
        // if (engine.input.isButtonPressed(engine.input.eMouseButton.eMiddle)) {
        //     let len = this.mLineSet.length;
        //     if (len > 0) {
        //         this.mCurrentLine = this.mLineSet[len - 1];
        //         x = this.mCamera.mouseWCX();
        //         y = this.mCamera.mouseWCY();
        //         echo += "Selected " + len + " ";
        //         echo += "[" + x.toPrecision(2) + " " + y.toPrecision(2) + "]";
        //         this.mCurrentLine.setFirstVertex(x, y);
        //     }
        // }
    
        // if (engine.input.isButtonPressed(engine.input.eMouseButton.eLeft)) {
        //     x = this.mCamera.mouseWCX();
        //     y = this.mCamera.mouseWCY();
        //     echo += "[" + x.toPrecision(2) + " " + y.toPrecision(2) + "]";

        //     if (this.mCurrentLine === null) { // start a new one
        //         this.mCurrentLine = new engine.LineRenderable();
        //         this.mCurrentLine.setFirstVertex(x, y);
        //         this.mCurrentLine.setPointSize(5.0);
        //         this.mCurrentLine.setShowLine(this.mShowLine);
        //         this.mLineSet.push(this.mCurrentLine);
        //     } else {
        //         this.mCurrentLine.setSecondVertex(x, y);
        //     }

        // } else {
        //     this.mCurrentLine = null;
        //     this.mP1 = null;
        // }
        
        this.mMsg.setText(msg);
    }
}

window.onload = function () {
    engine.init("GLCanvas");

    let myGame = new MyGame();
    myGame.start();
}