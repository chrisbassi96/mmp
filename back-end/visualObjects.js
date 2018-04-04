class CoordsSet{
    constructor(){
        this.oldMiddleXY = [0, 0];
        this.middleXY = [0, 0];
        this.staticMiddleXY = [0, 0];
    }
}

class AnimationProperties{
    constructor(isMoving, isFading){
        this.isMoving = isMoving;
        this.isFading = isFading;
        this.progress = 0;
        this.fade = "none";
        this.opacity = 1;

    }
    isBeingAnimated(){
        return this.isMoving === true || this.isFading === true;
    }
}

class MoveFadeIn extends AnimationProperties{
    constructor(){
        super(true, true);
        this.fade = "in";
    }
}

class MoveFadeOut extends AnimationProperties{
    constructor(){
        super(true, true);
        this.fade = "out";
    }
}

class MoveNoFade extends AnimationProperties{
    constructor(){
        super(true, false);
    }
}

class VisualObject{
    constructor(){
        this.coordsSet = new CoordsSet();
        this.notDrawn = false;
/*        this.fade = "none";
        this.opacity = 1;*/
        this.animationProgress = 0;
        //this.isBeingAnimated = false;
        this.animationProperties = new AnimationProperties();
        this.visualObjects = [];
        this.id = Math.random();
    }
    // Return middle X and Y coordinates
    // @return middle X and Y coordinates as Array
    getMiddleXY(){
        return this.coordsSet.middleXY;
    }
    setMiddleXY(x, y){
        this.coordsSet.middleXY = [x, y];
    }
    getStaticMiddleXY(){
        return [this.coordsSet.staticMiddleXY[0], this.coordsSet.staticMiddleXY[1]];
    }
    setStaticMiddleXY(x, y){
        this.coordsSet.staticMiddleXY = [x, y];
    }
    getOldMiddleXY(){
        return this.coordsSet.oldMiddleXY;
    }
    setOldMiddleXY(x, y){
        this.coordsSet.oldMiddleXY = [x, y];
        this.setAllOldMiddleXY();
    }
    setAllOldMiddleXY(){
        for (let i=0; i<this.visualObjects.length; i++){
            this.visualObjects[i].setOldMiddleXY(this.coordsSet.oldMiddleX, this.coordsSet.oldMiddleY);
        }
    }
    updateMiddleXY(x, y, progress){
        console.log(this);
        this.animationProperties.progress = progress;

        if (this.animationProperties.isMoving){
            this.coordsSet.middleXY = [x, y];
        }
        if (this.animationProperties.isFading){

            this.updateOpacity();
        }
    }
    isBeingAnimated(){
        return this.animationProperties.isBeingAnimated();
    }
    setAnimationProperties(animationProperties){

        this.animationProperties = animationProperties;
        for (let i=0; i<this.visualObjects.length; i++){
            this.visualObjects[i].setAnimationProperties(animationProperties);
        }
    }
    setNotDrawn(notDrawn){
        this.notDrawn = notDrawn;
        console.log(notDrawn);
        for (let i=0; i<this.visualObjects; i++){
            this.visualObjects[i].setNotDrawn(notDrawn);
        }
    }
    updateOpacity(){
        console.log(this);
        let newOpacity = 0;

        switch(this.animationProperties.fade){
            case "none":
                return;
            case "in":
                newOpacity = ((this.animationProperties.progress-1)/animationSteps);
                break;
            case "out":
                newOpacity = Math.abs(((this.animationProperties.progress-1)/animationSteps)-1);
                break;
        }
        this.animationProperties.opacity = newOpacity;
        console.log(this);

        for (let i=0; i<this.visualObjects.length; i++){
            this.visualObjects[i].animationProperties.opacity = newOpacity;
        }
    }
    addObject(visualObject){
        this.visualObjects.push(visualObject);
    }
    doAnimationComplete(){
        //this.isBeingAnimated = false;
        this.animationProperties = new AnimationProperties();

        for (let i=0; i<this.visualObjects.length; i++){
            this.visualObjects[i].doAnimationComplete();
        }
    }
    draw(){
        if (!this.notDrawn) {
            for (let i = 0; i < this.visualObjects.length; i++) {
                this.visualObjects[i].draw();
            }
        }
    }
}

class VisualElementBox extends VisualObject{
    constructor(){
        super();
        this.containingVisualObject = null;
        this.crossedThrough = false;
    }
    doAnimationComplete(){
        super.doAnimationComplete();

    }
    draw(){
        super.draw();

        ctx.save();
        ctx.globalAlpha = this.animationProperties.opacity;
        ctx.strokeRect(this.coordsSet.middleXY[0]-(elementBoxWidth/2), this.coordsSet.middleXY[1]-(elementBoxHeight/2), elementBoxWidth, elementBoxHeight);
        if(this.crossedThrough){
            // Draw a slanted line to indicate no object referenced
            ctx.beginPath();
            ctx.moveTo(this.coordsSet.middleXY[0] - (elementBoxWidth/2), this.coordsSet.middleXY[1] + (elementBoxHeight/2));
            ctx.lineTo(this.coordsSet.middleXY[0] + (elementBoxWidth/2), this.coordsSet.middleXY[1] - (elementBoxHeight/2));
            ctx.closePath();
            ctx.stroke();
        }

        ctx.restore();
    }
}

class VisualValue extends VisualObject{
    constructor(value){
        super();
        this.value = value;

    }
    move(){

    }
    draw(){
        super.draw();

        ctx.save();
        ctx.globalAlpha = this.animationProperties.opacity;
        ctx.fillText(this.value, this.coordsSet.middleXY[0], this.coordsSet.middleXY[1]);
        ctx.restore();
    }
}

class VisualArrow extends VisualObject {
    constructor(){
        super();
        this.destCoordsSet = new CoordsSet();
    }
}