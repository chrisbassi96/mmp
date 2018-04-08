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
        this.incomingArrows = [];
        this.outgoingArrows = [];
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
    addIncomingArrow(visualArrow){
        this.incomingArrows.push(visualArrow);
    }
    addOutgoingArrow(visualArrow){
        this.outgoingArrows.push(visualArrow);
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

class VisualTreeNode extends VisualObject{
    constructor(physicalElement, radius){
        super();
        this.parent = null;
        this.left = null;
        this.right = null;
        this.physicalElement = physicalElement;

        this.radius = radius;

        this.visualCircle = new VisualCircle();
        this.visualValue = new VisualValue(physicalElement.getValue());

        this.visualObjects.push(this.visualCircle);
        this.visualObjects.push(this.visualValue);
    }
    setXY(x, y){
        super.setXY(x, y);
    }
    updateMiddleXY(x, y, progress){
        super.updateMiddleXY(x, y, progress);

        if (this.visualCircle.isBeingAnimated() || this.isBeingAnimated()){
            this.visualCircle.updateMiddleXY()
        }
        if (this.visualValue.isBeingAnimated() || this.isBeingAnimated()){
            this.visualValue.updateMiddleXY(x, y, progress);
        }
    }
    draw(){
        super.draw();
        if (this.physicalElement.getValue() !== null){
            this.visualCircle.draw();
            this.visualValue.draw();
        }
        for (let i =0; i<this.outgoingArrows; i++){

        }
    }

}

class VisualArrow extends VisualObject{
    constructor(labelText="", labelPosition="start"){
        super();
        this.coordsSet = [];
        this.startXY = [];
        this.endXY = [];
        this.label = new VisualValue(labelText);
        this.labelPosition = labelPosition;
    }

    setCoords(coordsSet){
        this.coordsSet = coordsSet;

    }
    setStartXY(x, y){
        this.startXY = [x, y];
        this.updateLabelPosition();
    }
    setEndXY(x, y){
        this.endXY = [x, y];
    }
    setLabelText(text){
        this.label.setValue(text);
    }
    updateLabelPosition(){
        switch (this.labelPosition){
            case "start":
                this.label.setXY(this.startXY[0], this.startXY[1]);
                break;
            case "middle":
                this.label.setXY(this.xy[0], this.xy[1]);
                break;
            case "end":
                this.label.setXY(this.endXY[0], this.endXY[1]);
                break;
        }
    }
    draw(){
        this.updateLabelPosition();
        this.label.draw();

        let lineAngle = Math.atan2(this.endXY[1]-this.startXY[1], this.endXY[0]-this.startXY[0]);
        let angleFromShaftToArrowHeadCorner = Math.PI/8;
        //let lengthOfArrowHeadSide = Math.abs(12/Math.cos(angleFromShaftToArrowHeadCorner));
        let lengthOfArrowHeadSide = 10;

        //ctx.fillText(this.label, fromX, fromY);
        ctx.beginPath();
        ctx.moveTo(this.startXY[0], this.startXY[1]);
        ctx.lineTo(this.endXY[0], this.endXY[1]);
        ctx.stroke();

        let angleFromShaftToArrowHeadCornerTop = lineAngle + Math.PI + angleFromShaftToArrowHeadCorner;
        let arrowHeadCornerTopX = this.endXY[0] + Math.cos(angleFromShaftToArrowHeadCornerTop)*lengthOfArrowHeadSide;
        let arrowHeadCornerTopY = this.endXY[1] + Math.sin(angleFromShaftToArrowHeadCornerTop)*lengthOfArrowHeadSide;

        let angleFromShaftToArrowHeadCornerBottom = lineAngle + Math.PI - angleFromShaftToArrowHeadCorner;
        let arrowHeadCornerBottomX = this.endXY[0] + Math.cos(angleFromShaftToArrowHeadCornerBottom)*lengthOfArrowHeadSide;
        let arrowHeadCornerBottomY = this.endXY[1] + Math.sin(angleFromShaftToArrowHeadCornerBottom)*lengthOfArrowHeadSide;


        ctx.beginPath();
        ctx.moveTo(arrowHeadCornerTopX,arrowHeadCornerTopY);
        ctx.lineTo(this.endXY[0], this.endXY[1]);
        ctx.lineTo(arrowHeadCornerBottomX,arrowHeadCornerBottomY);
        ctx.lineTo(arrowHeadCornerTopX,arrowHeadCornerTopY);
        ctx.fill();
    }
}

class VisualCircle extends VisualObject{
    constructor(){
        super();
    }
    draw(){
        ctx.save();
        ctx.globalAlpha = this.animationProperties.opacity;
        ctx.beginPath();
        ctx.arc(this.xy[0], this.xy[1], this.radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.restore();
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
    setValue(value){
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

