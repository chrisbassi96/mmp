class DatastructureController{
    constructor(datastructure, elementBoxY=topBottomMargin+elementBoxHeight, showIndex=false){
        this.datastructure = datastructure;
        this.elementBoxY = elementBoxY;
        this.showIndex = showIndex;
        this.visualDatastructure = null;
        this.visualDatastructureAnimator = null

    }
    moveIntoVisualDatastructure(element){
        this.visualDatastructure.updateElementValueAndIndex(element);
        this.visualDatastructureAnimator.moveIntoVisualDatastructure(element);
    }
    moveOutOfDatastructure(element) {
        this.visualDatastructure.updateElementValueAndIndex(element);
        this.visualDatastructureAnimator.moveOutOfDatastructure(element);
    }
}

class SimpleArrayController extends DatastructureController{
    constructor(datastructure, elementBoxY=topBottomMargin+elementBoxHeight, showIndex=false){
        super(datastructure, elementBoxY, showIndex);
        this.visualDatastructure = new VisualSimpleArray(this.datastructure, elementBoxY, showIndex);
        this.visualDatastructureAnimator = new VisualSimpleArrayAnimator(this.visualDatastructure);
    }
    moveIntoVisualDatastructure(element){
        super.moveIntoVisualDatastructure(element);
    }
    moveOutOfDatastructure(element){
        super.moveOutOfDatastructure(element);
    }
    draw() {
        this.visualDatastructure.draw();
    }
}

class HeapArrayController extends DatastructureController{
    constructor(datastructure, elementBoxY=topBottomMargin+elementBoxHeight, showIndex=false){
        super(datastructure, elementBoxY, showIndex);
        this.visualDatastructure = new VisualHeapArray(this.datastructure, elementBoxY, showIndex);
        this.visualDatastructureAnimator = new VisualHeapArrayAnimator(this.visualDatastructure);
    }
    moveIntoVisualDatastructure(element) {
        if (this.originalSize < this.datastructure.size) {
            this.visualDatastructure.expand();
        }
        super.moveIntoVisualDatastructure(element);
        this.visualDatastructureAnimator.animationSwapElements();
    }
    expand(){
        for (let i=this.originalSize; i<this.datastructure.size; i++){
            console.log(i);
            this.visualDatastructure[i] = new VisualArrayElement(this.datastructure.getElement(i), i, this.showIndex);
            this.visualDatastructure[i].setXY(leftMargin + (elementBoxWidth/2) + (elementBoxWidth*i), this.elementBoxY+(elementBoxHeight/2));
            this.visualDatastructure[i].setStaticMiddleXY(leftMargin + (elementBoxWidth/2) + (elementBoxWidth*i), this.elementBoxY+(elementBoxHeight/2));

            this.visualTreeContent[i] = new VisualTreeNode(this.datastructure.getElement(i), this.treeNodeRadius);
        }
        this.originalSize = this.datastructure.size;
    }
    swap(indexI, indexJ){
        this.visualDatastructureAnimator.swap(indexI, indexJ);
    }
    draw() {
        this.visualDatastructure.draw();
    }
}

class CircularArrayController extends SimpleArrayController{
    constructor(datastructure, elementBoxY=topBottomMargin+elementBoxHeight, showIndex=false){
        super(datastructure, elementBoxY, showIndex);

        this.headArrow = new VisualArrow();
        this.headArrow.setLabelText("head / tail");
        this.headArrow.setStartXY(this.visualDatastructure.getElement(0).getXY()[0], elementBoxLabelY);
        this.headArrow.setEndXY(this.visualDatastructure.getElement(0).getXY()[0], this.visualDatastructure.getElement(0).getXY()[1]-elementBoxHeight/2);

        this.tailArrow = new VisualArrow();
        this.tailArrow.setStartXY(this.visualDatastructure.getElement(0).getXY()[0], elementBoxLabelY);
        this.tailArrow.setEndXY(this.visualDatastructure.getElement(0).getXY()[0], this.visualDatastructure.getElement(0).getXY()[1]-elementBoxHeight/2);

        this.headArrow.draw();

    }
    moveIntoVisualDatastructure(element){
        super.moveIntoVisualDatastructure(element);
        // Setup for animation stage
        let stage0 = new AnimationSequence();

        let tailArrowCoordSetStart = new CoordSet();
        tailArrowCoordSetStart.setFromXY(this.tailArrow.startXY[0], this.tailArrow.startXY[1]);
        tailArrowCoordSetStart.setToXY(this.visualDatastructure[this.datastructure.tail].getXY()[0], this.tailArrow.startXY[1]);

        let tailArrowCoordSetEnd = new CoordSet();
        tailArrowCoordSetEnd.setFromXY(this.tailArrow.endXY[0], this.tailArrow.endXY[1]);
        tailArrowCoordSetEnd.setToXY(this.visualDatastructure[this.datastructure.tail].getXY()[0], this.tailArrow.endXY[1]);

        stage0.add(this.tailLabel, tailArrowCoordSetStart, new MoveNoFade());
        stage0.add(this.tailArrow, tailArrowCoordSetEnd, new MoveNoFade());

        let headElement = this.visualDatastructure.getElement(this.datastructure.head);
        let tailElement = this.visualDatastructure.getElement(this.datastructure.tail);

        this.headArrow.setStartXY(headElement.getXY()[0], elementBoxLabelY);
        this.headArrow.setEndXY(headElement.getXY()[0], headElement.getXY()[1]-elementBoxHeight/2);

        this.headArrow.setLabelText("head");
        this.tailArrow.setLabelText("tail");
        this.tailArrow.setStartXY(tailElement.getXY()[0], elementBoxLabelY);
        this.tailArrow.setEndXY(tailElement.getXY()[0], tailElement.getXY()[1]-elementBoxHeight/2);


        //animationSequencer.add(stage0);

        //animationSequencer.go();
    }
    moveOutOfDatastructure(element){
        super.moveOutOfDatastructure(element);

        let headElement = this.visualDatastructure.getElement(this.datastructure.head);

        this.headArrow.setStartXY(headElement.getXY()[0], elementBoxLabelY);
        this.headArrow.setEndXY(headElement.getXY()[0], headElement.getXY()[1]-elementBoxHeight/2);

        if (this.datastructure.head === this.datastructure.tail){
            this.headArrow.setLabelText("head / tail")
        }
    }
    draw(){
        // Draw the common parts of any array structure
        this.headArrow.draw();
        if (this.datastructure.head !== this.datastructure.tail){
            this.tailArrow.draw();
        }
        super.draw();
    }
}

class VisualLinkedListElement extends VisualObject{
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
        this.visualValue = new VisualValue("null");
        this.visualIndexNum = new VisualValue(indexNum);

        this.visualObjects.push(this.visualElementBox);
        this.visualObjects.push(this.visualValue);
        this.visualObjects.push(this.visualIndexNum);
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
        this.parentNode = null;
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