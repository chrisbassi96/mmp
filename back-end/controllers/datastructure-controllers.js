class DatastructureController{
    constructor(datastructure, elementBoxY=topBottomMargin+elementBoxHeight, showIndex=false){
        this.datastructure = datastructure;
        //this.elementBoxY = elementBoxY;
        //this.showIndex = showIndex;
        this.visualDatastructure = null;
        this.visualDatastructureAnimator = null

    }
    insertIntoVisualDatastructure(element){
        this.visualDatastructure.insertProcess(element);
        this.visualDatastructureAnimator.insertProcess(element);
    }
    removeFromVisualDatastructure(element) {
        //this.visualDatastructure.removeProcess(element);
        this.visualDatastructureAnimator.removeProcess(element);
    }
    moveThroughDatatructure(){

    }
    draw(){
        this.visualDatastructure.draw();
    }
}

class SimpleArrayController extends DatastructureController{
    constructor(datastructure, elementBoxY=topBottomMargin+elementBoxHeight, showIndex=false){
        super(datastructure, elementBoxY, showIndex);
        this.visualDatastructure = new VisualSimpleArray(this.datastructure, elementBoxY, showIndex);
        this.visualDatastructureAnimator = new VisualSimpleArrayAnimator(this.visualDatastructure);
    }
}

class HeapArrayController extends DatastructureController{
    constructor(datastructure, elementBoxY=topBottomMargin+elementBoxHeight, showIndex=false){
        super(datastructure, elementBoxY, showIndex);
        this.visualDatastructure = new VisualHeapArray(this.datastructure, elementBoxY, showIndex);
        this.visualDatastructureAnimator = new VisualHeapArrayAnimator(this.visualDatastructure);
    }
}

class CircularArrayController extends SimpleArrayController {
    constructor(datastructure, elementBoxY = topBottomMargin + 90, showIndex = false) {
        super(datastructure, elementBoxY, showIndex);
        this.visualDatastructure = new VisualCircularArray(this.datastructure, elementBoxY, showIndex);
        this.visualDatastructureAnimator = new VisualCircularArrayAnimator(this.visualDatastructure);
    }
}

class VisualElement extends VisualObject{
    constructor(physicalElement){
        super();
        this.physicalElement = physicalElement;
    }
    updateElementValue(){

    }
    setXY(x, y){

    }
}

class VisualSinglyLinkedListElement extends VisualObject{
    constructor(physicalElement){
        super();
        this.physicalElement = physicalElement;
        this.nextVisualElement = null;

        this.visualValueBox = new VisualBox();
        this.visualNextBox = new VisualBox();
        this.visualNextBox.crossedThrough = true;
        this.visualValue = new VisualValue("");
        this.visualNext = new VisualValue("next");

        this.visualObjects.push(this.visualValueBox);
        this.visualObjects.push(this.visualNextBox);
        this.visualObjects.push(this.visualValue);
        this.visualObjects.push(this.visualNext);

    }
    updateElementValue(value = this.physicalElement.getValue()){
        this.visualValue.value = value;
    }
    getNext(){
        return this.nextVisualElement;
    }
    setNext(nextVisualElement){
        this.nextVisualElement = nextVisualElement;

        this.visualNext.crossedThrough = this.nextVisualElement == null;
    }
    setXY(x, y){
        super.setXY(x, y);

        this.setAllXY();
    }
    setAllXY(){
        this.visualValueBox.setXY(this.getXY()[0]-(this.visualValueBox.getWidth()/2), this.getXY()[1]);
        this.visualValue.setXY(this.getXY()[0]-(this.visualValueBox.getWidth()/2), this.getXY()[1]);
        this.visualNextBox.setXY(this.getXY()[0]+(this.visualValueBox.getWidth()/2), this.getXY()[1]);
        this.visualNext.setXY(this.getXY()[0]+(this.visualValueBox.getWidth()/2), this.getXY()[1]);
    }
    updateMiddleXY(x, y, progress){
        super.updateMiddleXY(x, y, progress);

        // Only update the coords of element visual tempObjects IF they are being animated
        // This allows us to control which visual tempObjects of the element are animated and which are not
        if(this.visualValueBox.isBeingAnimated() || this.isBeingAnimated()){
            this.visualValueBox.updateMiddleXY(x-(this.visualValueBox.getWidth()/2), y, progress);
        }
        if(this.visualNextBox.isBeingAnimated() || this.isBeingAnimated()){
            this.visualNextBox.updateMiddleXY(x+(this.visualValueBox.getWidth()/2), y, progress);
        }
        if (this.visualValue.isBeingAnimated() || this.isBeingAnimated()){
            this.visualValue.updateMiddleXY(x-(this.visualValueBox.getWidth()/2), y, progress);
        }
        if (this.visualNext.isBeingAnimated() || this.isBeingAnimated()){
            this.visualNext.updateMiddleXY(x+(this.visualValueBox.getWidth()/2), y, progress);
        }

        this.setIncomingArrowsXY(x, y);
    }
    isOnTopOf(otherNode){
        return (this.middleXY[1] === otherNode.getXY()[1]) && (this.middleXY[1] === otherNode.middleXY[1]);
    }
    setIncomingArrowsXY(x, y){
        for (let i=0; i<this.incomingArrows.length; i++){
            this.incomingArrows[i].setEndXY(x, y-elementBoxHeight/2);
        }
    }
    addIncomingArrow(arrow){
        super.addIncomingArrow(arrow);

        arrow.setEndXY(this.middleXY[0], this.middleXY[1]-elementBoxHeight/2);
    }
    draw() {
        super.draw();
        if(!this.notDrawn && this.nextVisualElement !== null){
            this.visualNextBox.crossedThrough = false;
            drawLabelledArrow("next", 0, this.getXY()[0]+(elementBoxWidth/2), this.getXY()[1], this.nextVisualElement.visualValue.getXY()[0]-(elementBoxWidth/2), this.nextVisualElement.visualValue.getXY()[1]);
        }

    }
}

class VisualArrayElement extends VisualObject{
    constructor(physicalElement, indexNum, showIndex){
        super();
        this.physicalElement = physicalElement;
        this.showIndex = showIndex;

        this.visualElementBox = new VisualBox();
        this.visualObjects.push(this.visualElementBox);

        this.visualValue = new VisualValue("null");
        this.visualObjects.push(this.visualValue);

        this.visualIndexNum = new VisualValue(indexNum);
        if (showIndex){
            this.visualObjects.push(this.visualIndexNum);
        }
    }
    updateElementValue(){
        this.visualValue.value = this.physicalElement.getValue();
    }
    setIndex(index){
        this.visualIndexNum.value = index;
    }
    setOldMiddleXY(x, y){
        this.oldMiddleX = x;
        this.oldMiddleY = y;
        this.update();
    }
    setXY(x, y){
        super.setXY(x, y);

        this.setAllXY();
    }
    updateXY(x, y, progress){
        super.updateMiddleXY(x, y, progress);

        // Only update the coords of element visual tempObjects IF they are being animated
        // This allows us to control which visual tempObjects of the element are animated and which are not
        if(this.visualElementBox.isBeingAnimated() || this.isBeingAnimated){
            this.visualElementBox.updateMiddleXY(x, y);
        }
        if(this.visualValue.isBeingAnimated() || this.isBeingAnimated){
            this.visualValue.updateMiddleXY(x, y);
        }

        if (this.visualIndexNum.isBeingAnimated() || this.isBeingAnimated){
            this.visualIndexNum.updateMiddleXY(x, y);
        }
    }
    update(){
        this.updateMiddleXY();
        this.setAllOldMiddleXY();
    }
    setAllXY(){
        this.visualElementBox.setXY(this.getXY()[0], this.getXY()[1]);
        this.visualValue.setXY(this.getXY()[0], this.getXY()[1]);
        this.visualIndexNum.setXY(this.getXY()[0], this.getXY()[1]+elementBoxHeight);
    }
    draw(){
        super.draw();
    }
}

class VisualTreeNode extends VisualObject{
    constructor(physicalElement, radius){
        super();
        //this.parentNode = null;
        this.leftArrow = null;
        this.rightArrow = null;
        this.physicalElement = physicalElement;

        this.radius = radius;

        this.visualCircle = new VisualCircle(radius);
        this.visualValue = new VisualValue(physicalElement.getValue());

        this.visualObjects.push(this.visualCircle);
        this.visualObjects.push(this.visualValue);
    }
    updateElementValue(){
        this.visualValue.value = this.physicalElement.getValue();
    }
    setParent(parentIndex){
        this.parent = parentIndex;
    }
    setLeft(leftIndex){
        this.left = leftIndex;
    }
    setRight(rightIndex){
        this.right = rightIndex;
    }
    setXY(x, y){
        super.setXY(x, y);

        this.setAllXY();
    }
    setAllXY() {
        for (let i = 0; i < this.visualObjects.length; i++) {
            this.visualObjects[i].setXY(this.middleXY[0], this.middleXY[1]);
        }
        this.updateArrowXY(this.middleXY[0], this.middleXY[1]);
    }
    updateMiddleXY(x, y, progress){
        super.updateMiddleXY(x, y, progress);

        if (this.visualCircle.isBeingAnimated() || this.isBeingAnimated()){
            this.visualCircle.updateMiddleXY(x, y, progress)
        }
        if (this.visualValue.isBeingAnimated() || this.isBeingAnimated()){
            this.visualValue.updateMiddleXY(x, y, progress);
        }

        this.updateArrowXY(x, y);
    }
    updateArrowXY(x, y){
        for (let i=0; i<this.outgoingArrows.length; i++){
            this.outgoingArrows[i].setStartXY(x, y);
        }
        for (let i=0; i<this.incomingArrows.length; i++){
            this.incomingArrows[i].setEndXY(x, y);
        }
    }
    draw(){
        super.draw();
        //if (this.physicalElement.getValue() !== null){
        //this.visualCircle.draw();
        //this.visualValue.draw();
        //}
        for (let i =0; i<this.outgoingArrows.length; i++){
            this.outgoingArrows[i].draw();
        }
    }

}