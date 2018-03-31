class VisualObject{
    constructor(){
        this.oldMiddleX = 0;
        this.oldMiddleY = 0;
        this.middleX = 0;
        this.middleY = 0;
        this.fade = "none";
        this.opacity = 1;
        this.animationProgress = 0;
        this.isBeingAnimated = false;
        this.animationProperties = {isMoving: false, isFading:false};
    }
    setXY(x, y, progress){
        this.animationProgress = progress;
        if (this.animationProperties.isMoving){
            this.middleX = x;
            this.middleY = y;
        }
        if (this.animationProperties.isFading){
            this.updateOpacity();
        }
    }
    updateXY(x, y){
        this.middleX = x;
        this.middleY = y;

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
    doAnimationComplete(){
        this.isBeingAnimated = false;
    }
    draw(){

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
        ctx.strokeRect(this.middleX-(elementBoxWidth/2), this.middleY-(elementBoxHeight/2), elementBoxWidth, elementBoxHeight);
        if(this.crossedThrough){
            // Draw a slanted line to indicate no object referenced
            ctx.beginPath();
            ctx.moveTo(this.middleX - (elementBoxWidth/2), this.middleY + (elementBoxHeight/2));
            ctx.lineTo(this.middleX + (elementBoxWidth/2), this.middleY - (elementBoxHeight/2));
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
        ctx.fillText(this.value, this.middleX, this.middleY);
        ctx.restore();
    }
}