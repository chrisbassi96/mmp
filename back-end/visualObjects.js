class CoordsSet{
    constructor(){
        this.oldMiddleXY = [0, 0];
        this.middleXY = [0, 0];
        this.staticMiddleXY = [0, 0];
    }
}

class VisualObject{
    constructor(){
        this.coordsSet = new CoordsSet();
/*        this.oldMiddleX = 0;
        this.oldMiddleY = 0;
        this.middleX = 0;
        this.middleY = 0;
        this.staticMiddleX = 0;
        this.staticMiddleY = 0;*/
        this.notDrawn = false;
        this.fade = "none";
        this.opacity = 1;
        this.animationProgress = 0;
        this.isBeingAnimated = false;
        this.animationProperties = {isMoving: false, isFading:false};
        this.visualObjects = [];
        this.id = Math.random();
    }
    setMiddleXY(x, y){
        this.coordsSet.middleXY[0] = x;
        this.coordsSet.middleXY[1] = y;
        //this.staticMiddleX = x;
        //this.staticMiddleY = y;
        //this.setAllMiddleXY();
    }
    getMiddleXY(){
        return [this.coordsSet.middleXY[0], this.coordsSet.middleXY[1]];
    }
    setStaticMiddleXY(x, y){
        this.coordsSet.staticMiddleXY[0] = x;
        this.coordsSet.staticMiddleXY[1] = y;
    }
    getStaticMiddleXY(){
        return [this.coordsSet.staticMiddleXY[0], this.coordsSet.staticMiddleXY[1]];
    }
    setOldMiddleXY(x, y){
        this.coordsSet.oldMiddleXY[0] = x;
        this.coordsSet.oldMiddleXY[1] = y;
        this.setAllOldMiddleXY();
    }
    getOldMiddleXY(){
        return [this.coordsSet.oldMiddleXY[0], this.coordsSet.oldMiddleXY[1]];
    }
    setAllOldMiddleXY(){
        for (let i=0; i<this.visualObjects.length; i++){
            this.visualObjects[i].setOldMiddleXY(this.coordsSet.oldMiddleX, this.coordsSet.oldMiddleY);
        }
    }
    updateMiddleXY(x, y, progress){
        this.animationProgress = progress;
        if (this.animationProperties.isMoving){
            this.coordsSet.middleXY[0] = x;
            this.coordsSet.middleXY[1] = y;
        }
        if (this.animationProperties.isFading){
            this.updateOpacity();
        }
    }
    setIsMoving(isMoving){
        this.animationProperties.isMoving = isMoving;
        this.isBeingAnimated = isMoving;
        for (let i=0; i<this.visualObjects.length; i++){
            this.visualObjects[i].setIsMoving(isMoving);
        }
    }
    updateOpacity(){
        switch(this.fade){
            case "none":
                return;
            case "in":
                this.opacity = ((this.animationProgress-1)/animationSteps);
                break;
            case "out":
                this.opacity = Math.abs(((this.animationProgress-1)/animationSteps)-1);
        }
    }
    addObject(visualObject){
        this.visualObjects.push(visualObject);
    }
    doAnimationComplete(){
        //this.isBeingAnimated = false;
        this.animationProperties.isMoving = false;
        this.animationProperties.isFading = false;

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

// WE NEED TO SET ALL CONTAINED OBJECTS TO BE ANIMATED
class VisualObjectContainer extends VisualObject{
    constructor(){
        super();
    }
    updateMiddleXY(x, y, progress){
        super.updateMiddleXY(x, y, progress);
        console.log(progress);
        for (let i = 0; i < this.visualObjects.length; i++) {
                this.visualObjects[i].updateMiddleXY(x, y, progress);
        }
    }
}

class VisualElementBox extends VisualObject{
    constructor(){
        super();
        this.crossedThrough = false;
    }
    draw(){
        super.draw();

        ctx.save();
        ctx.globalAlpha = this.opacity;
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
        ctx.globalAlpha = this.opacity;
        ctx.fillText(this.value, this.coordsSet.middleXY[0], this.coordsSet.middleXY[1]);
        ctx.restore();
    }
}