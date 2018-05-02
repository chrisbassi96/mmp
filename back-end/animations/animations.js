class AnimationSequencer {
    constructor() {
        this.sequenceQueue = [];
        this.numSequences = 0;
        this.currSequence = 0;
    }

    add(animationSequence) {
        this.sequenceQueue[this.numSequences] = animationSequence;
        this.numSequences++;
    }

    go() {
        toggleControlInputs(false);
        this.sequenceQueue[0].go();
    }

    doNext() {
        this.currSequence++;
        if (this.numSequences === this.currSequence) {
            // Finished animating sequences
            toggleControlInputs(true);
            this.sequenceQueue = [];
            this.numSequences = 0;
            this.currSequence = 0;
        } else {
            this.sequenceQueue[this.currSequence].go();
        }
    }
}

class AnimationSequence {
    constructor() {
        this.animationSequencer = animationSequencer;
        this.animationQueue = [];
        this.numAnimations = 0;
        this.doNotDrawObjects = [];
        this.sequenceObjects = [];
        this.numSequenceObjects = 0;
        this.currObject = 0;

        this.executeConcurrently = false;
    }

    add(canvasObject, coordSet, animationProperties) {
        this.animationQueue.push({
            canvasObject: canvasObject,
            coordSet: coordSet,
            animationProperties: animationProperties
        });
        this.numAnimations++;
    }

    go() {
        this.setObjectDrawStates(true);

        if (this.executeConcurrently) {
            for (let i = 0; i < this.numAnimations; i++) {
                this.animationQueue[i].canvasObject.setCoordSet(this.animationQueue[i].coordSet);
                this.animationQueue[i].canvasObject.setAnimationProperties(this.animationQueue[i].animationProperties);
            }
            this.animate(this.animationQueue, this.numAnimations)
        } else {
            this.doNext();
        }
    }

    doNext() {
        if (this.numAnimations === (this.currObject) || this.executeConcurrently) {
            this.finish();
        } else {
            this.animationQueue[this.currObject].canvasObject.setCoordSet(this.animationQueue[this.currObject].coordSet);
            this.animationQueue[this.currObject].canvasObject.setAnimationProperties(this.animationQueue[this.currObject].animationProperties);
            this.animate([this.animationQueue[this.currObject]], 1);
            this.currObject++;
        }
    }

    animate(visualObjects, numVisualObjects) {
        let stopID = 0;
        let progress = 0;
        let sequenceReference = this;

        window.requestAnimationFrame(step);

        function step(timestamp) {
            for (let i = 0; i < numVisualObjects; i++) {
                let currObject = visualObjects[i].canvasObject;
                let fromX = currObject.getFromXY()[0];
                let fromY = currObject.getFromXY()[1];
                let toX = currObject.getToXY()[0];
                let toY = currObject.getToXY()[1];
                let trajectoryAngle = Math.atan2(toY - fromY, toX - fromX);
                let lineLength = Math.hypot(toX - fromX, toY - fromY);
                let lineSegment = lineLength / animationSteps;

                let newX = currObject.getXY()[0] + (Math.cos(trajectoryAngle) * lineSegment);
                let newY = currObject.getXY()[1] + (Math.sin(trajectoryAngle) * lineSegment);

                currObject.update(newX, newY, progress);
            }

            adtController.visualDatastructure.draw();
            sequenceReference.drawObjects();

            if (progress !== animationSteps - 1) {
                progress += 1;
                stopID = window.requestAnimationFrame(step);
            } else {
                sequenceReference.doNext();
                adtController.visualDatastructure.draw();
                window.cancelAnimationFrame(stopID);
            }
        }
    }

    finish() {
        // Finished animating all items
        for (let i = 0; i < this.numAnimations; i++) {
            this.animationQueue[i].canvasObject.resetAnimationProperties();
        }
        this.setObjectDrawStates(false);
        this.animationSequencer.doNext();
    }

    setObjectDrawStates(setNotDrawObjects) {
        console.log(setNotDrawObjects);
        for (let i = 0; i < this.doNotDrawObjects.length; i++) {
            this.doNotDrawObjects[i].setNotDrawnState(setNotDrawObjects);
        }
    }

    // This function adds to the sequence's list of objects that need to be drawn. These can't be specified in the above
    // add function, as the object being added may be part of the data structure and so would be drawn twice
    addTempObject(visualObject) {
        this.sequenceObjects.push(visualObject);
        this.numSequenceObjects++;
    }

    drawObjects() {
        for (let i = 0; i < this.numSequenceObjects; i++) {
            this.sequenceObjects[i].draw();
        }
    }

    doNotDraw(visualObject) {
        this.doNotDrawObjects.push(visualObject);
    }
}