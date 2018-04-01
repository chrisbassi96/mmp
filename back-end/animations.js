function mrAnimator(objectToAnimate){
    //let animationStart = null;
    let currX = objectToAnimate.oldMiddleX;
    let currY = objectToAnimate.oldMiddleY;
    let targetX = objectToAnimate.middleX;
    let targetY = objectToAnimate.middleY;
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
            objectToAnimate.oldMiddleX = objectToAnimate.middleX;
            objectToAnimate.oldMiddleY = objectToAnimate.middleY;
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
    let currX = objectToAnimate.oldMiddleX;
    let currY = objectToAnimate.oldMiddleY;
    let targetX = objectToAnimate.middleX;
    let targetY = objectToAnimate.middleY;
    let trajectoryAngle = Math.atan2(targetY-currY, targetX-currX);
    let lineLength = Math.hypot(targetX-currX, targetY-currY);
    let lineSegment = lineLength / animationSteps;
    let stopID = 0;
    let progress = 0;

    window.requestAnimationFrame(step);
    objectToAnimate.isBeingAnimated = true;
    console.log("animating..." + 0+index);

    function step(timestamp){

        clearCanvas();

        currX = currX + (Math.cos(trajectoryAngle) * lineSegment);
        currY = currY + (Math.sin(trajectoryAngle) * lineSegment);

        // This will have to update the elements contained within the element container
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
            objectToAnimate.doAnimationComplete();
            clearCanvas();
            //canvasObjectMan.remove(objectToAnimate);
            objectToAnimate.isBeingAnimated = false;
            //canvasFOMan.draw();
            adtController.datastructureController.draw();
            animationSequencer.doNext(index);
            window.cancelAnimationFrame(stopID);
        }
    }
}

class AnimationSequencer{
    constructor(){
        this.animationQueue = [];
        this.doNotDrawList = [];
        this.numAnimations = 0;
    }
    add(canvasObject){
        this.numAnimations++;
        console.log("ADDY ADDY");
        console.log(canvasObject);
        this.animationQueue[this.animationQueue.length] = canvasObject;
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
        //console.log(this.animationQueue[0]);
        mrExperimentalAnimator(this, 0, this.animationQueue[0]);
    }
    doNext(i){
        console.log("Animation queue length: " + this.animationQueue.length);
        console.log("Next animation in queue: " + (i+1));
        if (this.numAnimations===(i+1)){
            // Finished animating all items
            //this.animationQueue = [];
            //this.clear();
            //this.numAnimations = 0;
            canvasFOMan.clear();
            console.log("Animation sequence over");
        }else{
            console.log("NEXT ONE!");
            console.log(this.animationQueue);
            mrExperimentalAnimator(this, i+1, this.animationQueue[i+1]);
        }
    }
    clear(){
        for (let i=0; i<this.numAnimations.length; i++){
            this.numAnimations.pop();
        }
    }
    doNotDraw(canvasObject){
        this.doNotDrawList.push(canvasObject);
    }
    draw(){
        for(let bob in this.animationQueue){
            if (bob.isBeingAnimated){
                bob.draw();
            }
        }
/*        for (let i=0; i<this.animationQueue.length; i++){
            if (this.animationQueue[i].isBeingAnimated){
                this.animationQueue[i].draw();
            }
        }*/
    }
}
