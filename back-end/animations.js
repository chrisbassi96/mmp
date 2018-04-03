function mrAnimator(objectToAnimate){
    //let animationStart = null;
    let currX = objectToAnimate.getOldMiddleXY()[0];
    let currY = objectToAnimate.getOldMiddleXY()[1];
    let targetX = objectToAnimate.getMiddleXY()[0];
    let targetY = objectToAnimate.getMiddleXY()[1];
    let trajectoryAngle = Math.atan2(targetY-currY, targetX-currX);
    let lineLength = Math.hypot(targetX-currX, targetY-currY);
    let lineSegment = lineLength / animationSteps;
    let stopID = 0;
    let progress = 0;

    window.requestAnimationFrame(step);

    function step(timestamp){

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        currX = currX + (Math.cos(trajectoryAngle) * lineSegment);
        currY = currY + (Math.sin(trajectoryAngle) * lineSegment);

        objectToAnimate.updateMiddleXY(currX, currY, progress);

        //canvasObjectMan.draw();
        adtController.datastructureController.draw();

        if (progress!==animationSteps-1) {
            progress += 1;
            stopID = window.requestAnimationFrame(step);
        }else{
            console.log("Finished!");
            objectToAnimate.setOldMiddleXY(objectToAnimate.getMiddleXY()[0], objectToAnimate.getMiddleXY()[0]);
            //objectToAnimate.oldMiddleX = objectToAnimate.middleX;
            //objectToAnimate.oldMiddleY = objectToAnimate.middleY;
            objectToAnimate.doAnimationComplete();
            clearCanvas();
            //canvasObjectMan.remove(objectToAnimate);
            adtController.datastructureController.draw();
            window.cancelAnimationFrame(stopID);
        }
    }
}

function mrExperimentalAnimator(animationSequencer, index, objectToAnimate){

    //let animationStart = null;
    let currX = objectToAnimate.getOldMiddleXY()[0];
    let currY = objectToAnimate.getOldMiddleXY()[1];
    let targetX = objectToAnimate.getStaticMiddleXY()[0];
    let targetY = objectToAnimate.getStaticMiddleXY()[1];
    let trajectoryAngle = Math.atan2(targetY-currY, targetX-currX);
    let lineLength = Math.hypot(targetX-currX, targetY-currY);
    let lineSegment = lineLength / animationSteps;
    let stopID = 0;
    let progress = 0;

    window.requestAnimationFrame(step);
    //objectToAnimate.isBeingAnimated = true;
    console.log("animating..." + 0+index);
    console.log(objectToAnimate);

    function step(timestamp){

        clearCanvas();

        currX = currX + (Math.cos(trajectoryAngle) * lineSegment);
        currY = currY + (Math.sin(trajectoryAngle) * lineSegment);

        objectToAnimate.updateMiddleXY(currX, currY, progress);

        //animationSequencer.draw();
        //objectToAnimate.draw();
        //canvasObjectMan.draw();
        adtController.datastructureController.draw();
        canvasFOMan.draw();

        if (progress!==animationSteps-1) {
            progress += 1;
            stopID = window.requestAnimationFrame(step);
        }else{
            console.log("Finished!");
            //objectToAnimate.oldMiddleX = objectToAnimate.middleX;
            //objectToAnimate.oldMiddleY = objectToAnimate.middleY;

            // Disabled because the same object may be being animated, this would mean it would not be drawn next time
            //objectToAnimate.doAnimationComplete();
            clearCanvas();
            //canvasObjectMan.remove(objectToAnimate);
            //objectToAnimate.isBeingAnimated = false;
            //canvasFOMan.draw();
            adtController.datastructureController.draw();
            animationSequencer.doNext(index);
            window.cancelAnimationFrame(stopID);
        }
    }
}

function mrExperimentalAnimator2(animationSequence, objectsToAnimate){
    let stopID = 0;
    let progress = 0;

    window.requestAnimationFrame(step);

    console.log(objectsToAnimate);

    function step(timestamp){

        clearCanvas();
        console.log(objectsToAnimate.length);
        for (let i=0; i<objectsToAnimate.length; i++){
            let currObject = objectsToAnimate[i].canvasObject;
            let fromX = currObject.getOldMiddleXY()[0];
            let fromY = currObject.getOldMiddleXY()[1];
            let toX = currObject.getStaticMiddleXY()[0];
            let toY = currObject.getStaticMiddleXY()[1];
            let trajectoryAngle = Math.atan2(toY-fromY, toX-fromX);
            let lineLength = Math.hypot(toX-fromX, toY-fromY);
            let lineSegment = lineLength / animationSteps;

            let newX = currObject.getMiddleXY()[0] + (Math.cos(trajectoryAngle) * lineSegment);
            let newY = currObject.getMiddleXY()[1] + (Math.sin(trajectoryAngle) * lineSegment);

            currObject.setMiddleXY(newX, newY);
        }

        adtController.datastructureController.draw();
        canvasFOMan.draw();

        if (progress!==animationSteps-1) {
            progress += 1;
            stopID = window.requestAnimationFrame(step);
        }else{
            console.log("Finished!");
            //objectToAnimate.oldMiddleX = objectToAnimate.middleX;
            //objectToAnimate.oldMiddleY = objectToAnimate.middleY;
            for (let i=0; i<objectsToAnimate.length; i++){
                objectsToAnimate[i].canvasObject.doAnimationComplete();
                objectsToAnimate[i].canvasObject.animationProperties = new AnimationProperties(false, false);
            }

            clearCanvas();
            //canvasObjectMan.remove(objectToAnimate);
            animationSequence.finish();
            //canvasFOMan.draw();
            adtController.datastructureController.draw();
            window.cancelAnimationFrame(stopID);
        }
    }
}

class AnimationSequencer{
    constructor(){
        this.sequenceQueue = [];
        this.numSequences = 0;
        this.currSequence = 0;
    }
    add(animationSequence){

        console.log("ADDY ADDY");
        console.log(animationSequence);

        this.sequenceQueue[this.numSequences] = animationSequence;
        this.numSequences++;
        console.log("numSequences: " + this.numSequences);
        console.log(this.sequenceQueue);
    }
    // Resource used: https://davidwalsh.name/remove-item-array-javascript
    remove(canvasObject){
        let i = this.animationQueue.indexOf(canvasObject);
        if (i !== -1){
            this.animationQueue.splice(i, 1);
        }
    }
    go(){
        console.log("GO!");
        console.log(this.sequenceQueue);
        this.sequenceQueue[0].go();
    }
    doNext(){
        this.currSequence++;
        console.log("Animation queue length: " + this.sequenceQueue.length);
        console.log("Next sequence in queue: " + this.currSequence);
        if (this.numSequences===this.currSequence){
            // Finished animating all items
            this.sequenceQueue = [];
            this.numSequences = 0;
            this.currSequence = 0;
            canvasFOMan.clear();
            console.log("Animation sequencer finished");
        }else{
            console.log("NEXT ONE!");
            console.log(this.sequenceQueue);
            this.sequenceQueue[this.currSequence].go();
        }
    }
}

class AnimationSequence{
    constructor(){
        this.animationSequencer = animationSequencer;
        this.animationQueue = [];
        this.doNotDrawObjects = [];
        this.doDrawObjects = [];
        this.numAnimations = 0;
        this.executeConcurrently = false;
    }
    go(){
        //this.setupDrawnObjects(true)
        console.log("GO GO GO");
        for (let i=0; i<this.doNotDrawObjects.length; i++){
            this.doNotDrawObjects[i].setNotDrawn(true);
        }
        if (this.executeConcurrently){
            for (let i = 0; i<this.numAnimations; i++){
                this.animationQueue[i].canvasObject.coordsSet = this.animationQueue[i].coordsSet;
                this.animationQueue[i].canvasObject.setAnimationProperties(this.animationQueue[i].animationProperties);
            }
            mrExperimentalAnimator2(this, this.animationQueue);
        }else{
            this.animationQueue[0].canvasObject.coordsSet = this.animationQueue[0].coordsSet;
            this.animationQueue[0].canvasObject.setAnimationProperties(this.animationQueue[0].animationProperties);
            mrExperimentalAnimator(this, 0, this.animationQueue[0].canvasObject);
        }
    }
    setupDrawnObjects(setNotDrawObjects){
        console.log(setNotDrawObjects);
        for (let i=0; i<this.doNotDrawObjects.length; i++){
            console.log(this.doNotDrawObjects[i]);
            this.doNotDrawObjects[i].setNotDrawn(setNotDrawObjects);
            console.log(this.doNotDrawObjects[i]);
        }
    }
    add(canvasObject, coordsSet, animationProperties){
        //this.animationQueue[this.numAnimations] = canvasObject;
        this.animationQueue.push({canvasObject: canvasObject, coordsSet: coordsSet, animationProperties: animationProperties});
        //this.animationQueue[this.numAnimations].canvasObject.coordsSet = this.animationQueue[this.numAnimations].coordsSet;
        //this.animationQueue[this.numAnimations].canvasObject.setAnimationProperties(animationProperties);
        this.numAnimations++;
    }
    doNext(i){
        if (this.numAnimations===(i+1)){
            console.log("FINITO!");
            this.finish();
        }else{
            console.log("NEXT ONE!");
            console.log(this.animationQueue);
            this.animationQueue[i+1].canvasObject.coordsSet = this.animationQueue[i+1].coordsSet;
            this.animationQueue[i+1].canvasObject.setAnimationProperties(this.animationQueue[i+1].animationProperties);
            mrExperimentalAnimator(this, i+1, this.animationQueue[i+1].canvasObject);
        }
    }
    finish(){
        // Finished animating all items
        for (let i = 0; i<this.numAnimations; i++){
            this.animationQueue[i].canvasObject.doAnimationComplete();
        }
        this.animationQueue = [];
        //this.clear();
        this.numAnimations = 0;
        canvasFOMan.clear();
        this.setupDrawnObjects(false);
        this.doNotDrawObjects = [];
        this.doDrawObjects = [];
        this.animationSequencer.doNext();
        console.log("Animation sequence over");
    }
    doNotDraw(visualObject){
        //this.doNotDrawObjects = this.doNotDrawObjects.concat(visualObjects);
        this.doNotDrawObjects.push(visualObject);
    }
    doDraw(visualObject){
        //this.doDrawObjects = this.doDrawObjects.concat(visualObjects)
        this.doDrawObjects.push(visualObject);
    }
}

