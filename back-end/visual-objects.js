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
        visualArrow.setEndXY(this.xy[0], this.xy[1]);
        this.incomingArrows.push(visualArrow);
    }
    addOutgoingArrow(visualArrow){
        visualArrow.setStartXY(this.xy[0], this.xy[1]);
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
    constructor(labelText="", labelPosition="start", startMargin, endMargin){
        super();
        this.coordsSet = [];
        this.startMargin = startMargin;
        this.startXY = [];
        this.endMargin = endMargin;
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
    recalculatePoints(){
        // Only recalculate when the coordinates are "reasonable", i.e. they are numbers
        if (this.startXY.length === 0 || this.endXY.length === 0){
            return;
        }

        let lineAngleStart = Math.atan2(this.endXY[1]-this.startXY[1], this.endXY[0]-this.startXY[0]);
        let adjustedStartX = this.startXY[0] + Math.cos(lineAngleStart)*this.startMargin;
        let adjustedStartY = this.startXY[1] + Math.sin(lineAngleStart)*this.startMargin;

        this.startXY = [adjustedStartX, adjustedStartY];

        let lineAngleEnd = Math.atan2(this.startXY[1]-this.endXY[1], this.startXY[0]-this.endXY[0]);
        let adjustedEndX = this.endXY[0] - Math.cos(lineAngleStart)*this.endMargin;
        let adjustedEndY = this.endXY[1] - Math.sin(lineAngleStart)*this.endMargin;

        this.endXY = [adjustedEndX, adjustedEndY];
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

        let adjustedStartX = this.startXY[0] + Math.cos(lineAngle)*this.startMargin;
        let adjustedStartY = this.startXY[1] + Math.sin(lineAngle)*this.startMargin;

        let adjustedEndX = this.endXY[0] - Math.cos(lineAngle)*this.endMargin;
        let adjustedEndY = this.endXY[1] - Math.sin(lineAngle)*this.endMargin;

        let angleFromShaftToArrowHeadCorner = Math.PI/8;
        //let lengthOfArrowHeadSide = Math.abs(12/Math.cos(angleFromShaftToArrowHeadCorner));
        let lengthOfArrowHeadSide = 10;

        //ctx.fillText(this.label, fromX, fromY);
        ctx.beginPath();
        ctx.moveTo(adjustedStartX, adjustedStartY);
        ctx.lineTo(adjustedEndX, adjustedEndY);
        ctx.stroke();

        let angleFromShaftToArrowHeadCornerTop = lineAngle + Math.PI + angleFromShaftToArrowHeadCorner;
        let arrowHeadCornerTopX = adjustedEndX + Math.cos(angleFromShaftToArrowHeadCornerTop)*lengthOfArrowHeadSide;
        let arrowHeadCornerTopY = adjustedEndY + Math.sin(angleFromShaftToArrowHeadCornerTop)*lengthOfArrowHeadSide;

        let angleFromShaftToArrowHeadCornerBottom = lineAngle + Math.PI - angleFromShaftToArrowHeadCorner;
        let arrowHeadCornerBottomX = adjustedEndX + Math.cos(angleFromShaftToArrowHeadCornerBottom)*lengthOfArrowHeadSide;
        let arrowHeadCornerBottomY = adjustedEndY + Math.sin(angleFromShaftToArrowHeadCornerBottom)*lengthOfArrowHeadSide;

        ctx.beginPath();
        ctx.moveTo(arrowHeadCornerTopX,arrowHeadCornerTopY);
        ctx.lineTo(adjustedEndX, adjustedEndY);
        ctx.lineTo(arrowHeadCornerBottomX,arrowHeadCornerBottomY);
        ctx.lineTo(arrowHeadCornerTopX,arrowHeadCornerTopY);
        ctx.fill();
    }
}

class VisualCircle extends VisualObject{
    constructor(radius){
        super();
        this.radius = radius;
    }
    draw(){

        ctx.save();
        ctx.globalAlpha = this.animationProperties.opacity;
        ctx.lineWidth = this.animationProperties.lineWidth;
        ctx.beginPath();
        ctx.arc(this.xy[0], this.xy[1], this.radius, 0, 2 * Math.PI);
        console.log(this.xy);
        console.log(this.radius);
        ctx.stroke();
        ctx.restore();
    }

}

class VisualBox extends VisualObject{
    constructor(width=elementBoxWidth, height=elementBoxHeight){
        super();
        this.containingVisualObject = null;
        this.width = width;
        this.height = height;
        this.crossedThrough = false;
    }
    doAnimationComplete(){
        super.doAnimationComplete();
    }
    getWidth(){
        return this.width;
    }
    setWidth(width){
        this.width = width;
    }
    getHeight(){
        return this.height;
    }
    setHeight(height){
        this.height = height;
    }
    draw(){
        super.draw();

        ctx.save();
        ctx.globalAlpha = this.animationProperties.opacity;
        ctx.strokeRect(this.getXY()[0]-(this.width/2), this.getXY()[1]-(this.height/2), this.width, this.height);
        if(this.crossedThrough){
            // Draw a slanted line to indicate no object referenced
            ctx.beginPath();
            ctx.moveTo(this.getXY()[0] - (this.width/2), this.getXY()[1] + (this.height/2));
            ctx.lineTo(this.getXY()[0] + (this.width/2), this.getXY()[1] - (this.height/2));
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

        if (this.value == null || this.value === ""){
            return;
        }
        ctx.save();
        ctx.globalAlpha = this.animationProperties.opacity;
        ctx.fillText(this.value, this.getXY()[0], this.getXY()[1]);
        ctx.restore();
    }
}

