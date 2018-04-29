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
        this.sequenceQueue[this.numSequences] = animationSequence;
        this.numSequences++;
    }
    go(){
        toggleControlInputs();
        this.sequenceQueue[0].go();
    }
    doNext(){
        this.currSequence++;
        if (this.numSequences===this.currSequence){
            // Finished animating sequences

            toggleControlInputs();
            this.sequenceQueue = [];
            this.numSequences = 0;
            this.currSequence = 0;
        }else{
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
        this.currObject = 0;

        this.executeConcurrently = false;
    }
    add(canvasObject, coordSet, animationProperties){
        //this.animationQueue[this.numAnimations] = canvasObject;
        this.animationQueue.push({canvasObject: canvasObject, coordSet: coordSet, animationProperties: animationProperties});
        this.numAnimations++;
    }
    go(){
        this.setObjectDrawStates(true);

        if (this.executeConcurrently){
            console.log(this.animationQueue);
            for (let i = 0; i<this.numAnimations; i++){
                this.animationQueue[i].canvasObject.setCoords(this.animationQueue[i].coordSet);
                this.animationQueue[i].canvasObject.setAnimationProperties(this.animationQueue[i].animationProperties);
            }
            this.animate(this.animationQueue, this.numAnimations)
        }else{
            this.doNext();
        }
    }
    doNext(){
        if (this.numAnimations===(this.currObject) || this.executeConcurrently){
            this.finish();
        }else{
            console.log(this.animationQueue);
            this.animationQueue[this.currObject].canvasObject.setCoords(this.animationQueue[this.currObject].coordSet);
            this.animationQueue[this.currObject].canvasObject.setAnimationProperties(this.animationQueue[this.currObject].animationProperties);
            this.animate([this.animationQueue[this.currObject]], 1);
            this.currObject++;
        }
    }
    animate(visualObjects, numVisualObjects){
        let stopID = 0;
        let progress = 0;
        let sequenceReference = this;

        window.requestAnimationFrame(step);

        function step(timestamp){

            //clearCanvas();

            for (let i=0; i<numVisualObjects; i++){
                let currObject = visualObjects[i].canvasObject;
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

            adtController.visualDatastructure.draw();
            sequenceReference.drawObjects();

            if (progress!==animationSteps-1) {
                progress += 1;
                stopID = window.requestAnimationFrame(step);
            }else{
                //clearCanvas();

                sequenceReference.doNext();

                adtController.visualDatastructure.draw();

                window.cancelAnimationFrame(stopID);
            }
        }
    }
    finish(){
        // Finished animating all items
        for (let i = 0; i<this.numAnimations; i++){
            this.animationQueue[i].canvasObject.resetAnimationProperties();
        }
        this.setObjectDrawStates(false);
        this.animationSequencer.doNext();
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