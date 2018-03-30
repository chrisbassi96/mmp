class VisualObject{
    constructor(oldMiddleX, oldMiddleY, middleX, middleY){
        this.oldMiddleX = oldMiddleX;
        this.oldMiddleY = oldMiddleY;
        this.middleX = middleX;
        this.middleY = middleY;
    }
    updateXY(x, y){
        this.middleX = x;
        this.middleY = y;
    }
}

class VisualValue extends VisualObject{
    constructor(oldMiddleX, oldMiddleY, middleX, middleY, value){
        super(oldMiddleX, oldMiddleY, middleX, middleY);
        this.value = value;
    }
    move(){

    }
    fadeOut(){

    }
    fadeIn(){

    }
    draw(){
        ctx.fillText(this.value, this.middleX, this.middleY);
    }
}