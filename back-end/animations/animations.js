function mrAnimator(objectToAnimate){
    //let animationStart = null;
    let currX = objectToAnimate.getOldMiddleXY()[0];
    let currY = objectToAnimate.getOldMiddleXY()[1];
    let targetX = objectToAnimate.getXY()[0];
    let targetY = objectToAnimate.getXY()[1];
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
            objectToAnimate.setOldMiddleXY(objectToAnimate.getXY()[0], objectToAnimate.getXY()[0]);
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

function mrExperimentalAnimator(animationSequence, index, objectToAnimate){

    //let animationStart = null;
/*    let currXY = objectToAnimate.getOldMiddleXY();
    let toXY = objectToAnimate.getStaticMiddleXY();
    let trajectoryAngle = Math.atan2(toXY.y-currXY.y, toXY.x-currXY.x);
    let lineLength = Math.hypot(toXY.x-currXY.x, toXY.y-currXY.y);*/

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

/*        currXY.x += (Math.cos(trajectoryAngle) * lineSegment);
        currXY.y += (Math.sin(trajectoryAngle) * lineSegment);

        objectToAnimate.updateMiddleXY(currXY, progress);*/

        currX = currX + (Math.cos(trajectoryAngle) * lineSegment);
        currY = currY + (Math.sin(trajectoryAngle) * lineSegment);

        objectToAnimate.updateMiddleXY(currX, currY, progress);

        //animationSequence.draw();
        //objectToAnimate.draw();
        //canvasObjectMan.draw();
        //adtController.datastructureController.draw();
        adtController.visualDatastructure.draw();
        //canvasFOMan.draw();
        //console.log(animationSequence);
        animationSequence.drawObjects();

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
            //adtController.datastructureController.draw();
            adtController.visualDatastructure.draw();
            animationSequence.doNext(index+1);
            window.cancelAnimationFrame(stopID);
        }
    }
}

function mrExperimentalAnimator2(animationSequence, objectsToAnimate, numAnimations, index){
    let stopID = 0;
    let progress = 0;

    window.requestAnimationFrame(step);

    console.log(objectsToAnimate);

    function step(timestamp){

        clearCanvas();
        //console.log(objectsToAnimate[0].canvasObject);
        for (let i=0; i<numAnimations; i++){
            console.log(i);
            let currObject = objectsToAnimate[i].canvasObject;
            let fromX = currObject.getOldMiddleXY()[0];
            let fromY = currObject.getOldMiddleXY()[1];
            let toX = currObject.getStaticMiddleXY()[0];
            let toY = currObject.getStaticMiddleXY()[1];
            let trajectoryAngle = Math.atan2(toY-fromY, toX-fromX);
            let lineLength = Math.hypot(toX-fromX, toY-fromY);
            let lineSegment = lineLength / animationSteps;

            let newX = currObject.getXY()[0] + (Math.cos(trajectoryAngle) * lineSegment);
            let newY = currObject.getXY()[1] + (Math.sin(trajectoryAngle) * lineSegment);

            currObject.updateMiddleXY(newX, newY, progress);
        }

        //adtController.datastructureController.draw();
        adtController.visualDatastructure.draw();
        //canvasFOMan.draw();
        animationSequence.drawObjects();

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
            //adtController.datastructureController.draw();
            adtController.visualDatastructure.draw();
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
            //4canvasFOMan.clear();
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
        this.numAnimations = 0;
        this.doNotDrawObjects = [];
        this.sequenceObjects = [];
        this.numSequenceObjects = 0;

        this.executeConcurrently = false;
    }
    add(canvasObject, coordSet, animationProperties){
        //this.animationQueue[this.numAnimations] = canvasObject;
        this.animationQueue.push({canvasObject: canvasObject, coordSet: coordSet, animationProperties: animationProperties});
        this.numAnimations++;
    }
    go(){
        //this.setObjectDrawStates(true)
        console.log("GO GO GO");
        this.setObjectDrawStates(true);

        if (this.executeConcurrently){
            console.log(this.animationQueue);
            for (let i = 0; i<this.numAnimations; i++){
                this.animationQueue[i].canvasObject.setCoords(this.animationQueue[i].coordSet);
                this.animationQueue[i].canvasObject.setAnimationProperties(this.animationQueue[i].animationProperties);
                //mrExperimentalAnimator(this, i, this.animationQueue[i].canvasObject);
            }
            mrExperimentalAnimator2(this, this.animationQueue, this.numAnimations);
        }else{
            this.doNext(0);
/*            this.animationQueue[0].canvasObject.coordSet = this.animationQueue[0].coordSet;
            this.animationQueue[0].canvasObject.setAnimationProperties(this.animationQueue[0].animationProperties);*/
            //mrExperimentalAnimator(this, 0, this.animationQueue[0].canvasObject);
        }
    }
    doNext(queueIndex){
        console.log("numAnimations: " + this.numAnimations);
        console.log("doNext i value: " + queueIndex);
        if (this.numAnimations===(queueIndex)){
            console.log("FINITO!");
            this.finish();
        }else{
            console.log("NEXT ONE!");
            console.log(this.animationQueue);
            // Important to only apply the coordSet when executing animation, otherwise if having the same object
            // animated with two coordsSets, it would be overridden
            this.animationQueue[queueIndex].canvasObject.setCoords(this.animationQueue[queueIndex].coordSet);
            this.animationQueue[queueIndex].canvasObject.setAnimationProperties(this.animationQueue[queueIndex].animationProperties);
            mrExperimentalAnimator(this, queueIndex, this.animationQueue[queueIndex].canvasObject);
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
        //canvasFOMan.clear();
        this.setObjectDrawStates(false);
        this.doNotDrawObjects = [];
        this.sequenceObjects = [];
        this.animationSequencer.doNext();
        console.log("Animation sequence over");
    }
    setObjectDrawStates(setNotDrawObjects){
        console.log(setNotDrawObjects);
        for (let i=0; i<this.doNotDrawObjects.length; i++){
            this.doNotDrawObjects[i].setNotDrawn(setNotDrawObjects);
        }
    }

    // This function adds to the sequence's list of objects that need to be drawn. These can't be specified in the above
    // add function, as the object being added may be part of the data structure and so would be drawn twice.
    addTempObject(visualObject){
        console.log("hello from addTempObject");
        this.sequenceObjects.push(visualObject);
        this.numSequenceObjects++;
    }
    drawObjects(){
        for (let i = 0; i<this.numSequenceObjects; i++){
            this.sequenceObjects[i].draw();
        }
    }

    doNotDraw(visualObject){
        //this.doNotDrawObjects = this.doNotDrawObjects.concat(visualObjects);
        this.doNotDrawObjects.push(visualObject);
    }
}

