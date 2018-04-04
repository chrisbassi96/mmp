class CoordsSet{
    constructor(){
        this.oldMiddleXY = [0, 0];
        //this.middleXY = [0, 0];
        this.staticMiddleXY = [0, 0];
    }
    getFromXY(){
        return this.oldMiddleXY;
    }
    setFromXY(x, y){
        this.oldMiddleXY = [x, y];
    }
    getToXY(){
        return this.staticMiddleXY;
    }
    setToXY(x, y){
        this.staticMiddleXY = [x, y];
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
        this.xy = [0, 0];
        this.notDrawn = false;
        this.visualObjects = [];
        this.coordsSet = new CoordsSet();
        this.animationProperties = new AnimationProperties();
    }
    // Return middle X and Y coordinates
    // @return middle X and Y coordinates as Array
    getXY(){
        return this.xy;
    }
    setXY(x, y){
        this.xy = [x, y];
    }
    getStaticMiddleXY(){
        return this.coordsSet.getToXY();
    }
    setStaticMiddleXY(x, y){
        this.coordsSet.setToXY(x, y);
    }
    getOldMiddleXY(){
        return this.coordsSet.getFromXY();
    }
    setOldMiddleXY(x, y){
        this.coordsSet.setFromXY(x, y);
        this.setAllOldMiddleXY();
    }
    setAllOldMiddleXY(){
        for (let i=0; i<this.visualObjects.length; i++){
            this.visualObjects[i].setOldMiddleXY(this.coordsSet.getFromXY()[0], this.coordsSet.getFromXY()[1]);
        }
    }
    setCoords(coordsSet){
        this.coordsSet = coordsSet;
        this.xy = coordsSet.getFromXY();
    }
    updateMiddleXY(x, y, progress){
        this.animationProperties.progress = progress;

        if (this.animationProperties.isMoving){
            this.setXY(x, y);
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

        for (let i=0; i<this.visualObjects; i++){
            this.visualObjects[i].setNotDrawn(notDrawn);
        }
    }
    updateOpacity(){
        let newOpacity = 0;

        switch(this.animationProperties.fade){
            case "none":
                return;
            case "in":
                newOpacity = (this.animationProperties.progress/animationSteps);
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

class VisualArrow extends VisualObject{
    constructor(){
        super();
        this.startCoordsSet = this.coordsSet;
        this.endCoordsSet = new CoordsSet();
    }
    setCoords(coordsSet){
        this.startCoordsSet = coordsSet;

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
        ctx.strokeRect(this.getXY()[0]-(elementBoxWidth/2), this.getXY()[1]-(elementBoxHeight/2), elementBoxWidth, elementBoxHeight);
        if(this.crossedThrough){
            // Draw a slanted line to indicate no object referenced
            ctx.beginPath();
            ctx.moveTo(this.getXY()[0] - (elementBoxWidth/2), this.getXY()[1] + (elementBoxHeight/2));
            ctx.lineTo(this.getXY()[0] + (elementBoxWidth/2), this.getXY()[1] - (elementBoxHeight/2));
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
    draw(){
        super.draw();

        ctx.save();
        ctx.globalAlpha = this.animationProperties.opacity;
        ctx.fillText(this.value, this.getXY()[0], this.getXY()[1]);
        ctx.restore();
    }
}

