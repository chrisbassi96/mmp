class VisualSimpleArray{
    constructor(datastructure, elementBoxY=topBottomMargin+elementBoxHeight, showIndex=false){
        this.physicalDatastructure = datastructure;
        this.elementBoxY = elementBoxY;
        this.showIndex = showIndex;
        this.content = [];

        for (let i=0; i<datastructure.size; i++){
            this.content[i] = new VisualArrayElement(datastructure.getElement(i), i, this.showIndex);
            this.content[i].setXY(leftMargin + (elementBoxWidth/2) + (elementBoxWidth*i), this.elementBoxY+(elementBoxHeight/2));
            this.content[i].setStaticMiddleXY(leftMargin + (elementBoxWidth/2) + (elementBoxWidth*i), this.elementBoxY+(elementBoxHeight/2));
            //this.visualDatastructure[i].setIndex(i);
            //this.visualDatastructure[i].moveIntoVisualDatastructure();
            this.content[i].draw();
        }
    }
    updateElementValueAndIndex(element){
        let index = element.index;
        console.log(element);
        this.content[index].updateElementValue(); // Get the current visualValue from physical datastructure
        //this.visualDatastructure[index].update();
        this.content[index].setIndex(index); // Update index
    }
    getElement(index){
        if (index >= 0 && index < this.content.length){
            return this.content[index];
        }
        // Give some sort of error
        return null;
    }
    draw() {
        //clearCanvas();
        for (let i=0; i<this.physicalDatastructure.size; i++){
            this.content[i].draw();
        }
    }
}