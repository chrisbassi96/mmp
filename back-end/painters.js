class Painter{
    constructor(adt){
        this.adt = adt;
    }
    draw(){

    }
}

class SimpleArrayStackPainter extends Painter{
    constructor(adt){
        super(adt);
    }
    setAdt(adt){
        this.adt = adt;
    }
    draw(){
        let currElement = null;
        for (let i=0; i<this.adt.dataStructure.size;i++){
            currElement = this.adt.dataStructure.getElement(i);
            // Draw the actual box
            ctx.strokeRect(currElement.middleX-(elementBoxWidth/2), currElement.middleY-(elementBoxHeight/2), elementBoxWidth, elementBoxHeight);

            // Draw the actual value
            ctx.fillText(currElement.value, currElement.middleX, currElement.middleY);

            // Draw the index
            if (this.showIndexNum){
                ctx.fillText(this.index, currElement.middleX, currElement.middleY + elementBoxHeight);
            }
        }


    }
}