class VisualObject{
    constructor(){
        this.oldMiddleX = 0;
        this.oldMiddleY = 0;
        this.middleX = 0;
        this.middleY = 0;
        this.fade = "none"
        this.opacity = 1;
        this.animationProgress = 0;
    }
    updateXY(x, y, progress){
        this.middleX = x;
        this.middleY = y;
        this.animationProgress = progress;
        this.updateOpacity();
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
}

class VisualElementBox extends VisualObject{
    constructor(){
        super();
    }
    move(){

    }
    draw(){
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.strokeRect(this.middleX-(elementBoxWidth/2), this.middleY-(elementBoxHeight/2), elementBoxWidth, elementBoxHeight);
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
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillText(this.value, this.middleX, this.middleY);
        ctx.restore();
    }
}