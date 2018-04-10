class DatastructureController{
    constructor(datastructure, elementBoxY=topBottomMargin+elementBoxHeight, showIndex=false){
        this.datastructure = datastructure;
        this.elementBoxY = elementBoxY;
        this.showIndex = showIndex;
        this.visualDatastructureNew = null;
        this.visualDatastructureAnimator = null

    }
    moveIntoVisualDatastructure(element){
        this.visualDatastructureNew.updateElementValueAndIndex(element);
        this.visualDatastructureAnimator.moveIntoVisualDatastructure(element);
    }
    moveOutOfDatastructure(element) {
        this.visualDatastructureNew.updateElementValueAndIndex(element);
        this.visualDatastructureAnimator.moveOutOfDatastructure(element);
    }
}

class SimpleArrayController extends DatastructureController{
    constructor(datastructure, elementBoxY=topBottomMargin+elementBoxHeight, showIndex=false){
        super(datastructure, elementBoxY, showIndex);
        this.visualDatastructureNew = new VisualSimpleArray(this.datastructure, elementBoxY, showIndex);
        this.visualDatastructureAnimator = new VisualSimpleArrayAnimator(this.visualDatastructureNew);
    }
    moveIntoVisualDatastructure(element){
        super.moveIntoVisualDatastructure(element);
    }
    moveOutOfDatastructure(element){
        super.moveOutOfDatastructure(element);
    }
    draw() {
        this.visualDatastructureNew.draw();
    }
}

class HeapArrayController extends SimpleArrayController{
    constructor(datastructure, elementBoxY=topBottomMargin+elementBoxHeight, showIndex=false){
        super(datastructure, elementBoxY, showIndex);
        this.originalSize = datastructure.size;
        this.visualTreeContent = [];
        this.treeNodeRadius = 20;

        this.createVisualElements(0, this.datastructure.size);

        for (let i=0; i<this.datastructure.size; i++){
            this.visualDatastructure[i] = new VisualArrayElement(this.datastructure.getElement(i), i, this.showIndex);
            this.visualDatastructure[i].setXY(leftMargin + (elementBoxWidth/2) + (elementBoxWidth*i), this.elementBoxY+(elementBoxHeight/2));
            this.visualDatastructure[i].setStaticMiddleXY(leftMargin + (elementBoxWidth/2) + (elementBoxWidth*i), this.elementBoxY+(elementBoxHeight/2));

            this.visualTreeContent[i] = new VisualTreeNode(this.datastructure.getElement(i), this.treeNodeRadius);
        }
    }
    moveIntoVisualDatastructure(element){
        if (this.originalSize < this.datastructure.size){
            this.expand();
        }

        let index = element.index;
        console.log(element);
        this.visualDatastructure[index].updateElementValue(); // Get the current visualValue from physical datastructure
        this.visualTreeContent[index].updateElementValue();
        //this.visualDatastructure[index].update();
        this.visualDatastructure[index].setIndex(index); // Update index
        //super.moveIntoVisualDatastructure(element);

        //this.visualTreeContent[index] = new VisualTreeNode(this.datastructure.getElement(element.index), this.treeNodeRadius);

        //this.visualTreeContent[index].setLeft(this.visualTreeContent[HeapArray.left(index)]);
        //this.visualTreeContent[index].setRight(this.visualTreeContent[HeapArray.right(index)]);
        this.updateTreeNodeCoords();
        console.log("Here's the index: " + index);
        this.createNodeArrows();

        if (index !== 0){
            let parentTreeNode = this.visualTreeContent[HeapArray.parent(index)];
            if (index % 2 !== 0){
                console.log("Index is odd");
                // Has parent
                let leftArrow = new VisualArrow(null, null, this.treeNodeRadius, this.treeNodeRadius);
                let rightArrow = new VisualArrow(null, null, this.treeNodeRadius, this.treeNodeRadius);

                parentTreeNode.addOutgoingArrow(leftArrow);
                parentTreeNode.leftArrow = leftArrow;
                parentTreeNode.addOutgoingArrow(rightArrow);
                parentTreeNode.rightArrow = rightArrow;
                this.visualTreeContent[index].addIncomingArrow(parentTreeNode.leftArrow);
            }else{
                console.log("Index is even");
                this.visualTreeContent[index].addIncomingArrow(parentTreeNode.rightArrow);
            }
        }
        console.log(this.visualTreeContent[element.index]);

        let stage0 = new AnimationSequence();
        stage0.executeConcurrently = true;
        //stage0.doNotDraw(this.visualDatastructure[index]);

        this.animationMoveIntoVisualDatastructure(index, stage0);

        animationSequencer.add(stage0);

        animationSequencer.go();
    }
    animationMoveIntoVisualDatastructure(index, stageToAddTo){
        super.animationMoveIntoVisualDatastructure(index, stageToAddTo);

        let stage0coordsSet2 = new CoordsSet();
        stage0coordsSet2.setFromXY(this.visualTreeContent[index].getXY()[0], this.visualTreeContent[index].getXY()[1]);
        stage0coordsSet2.setToXY(this.visualTreeContent[index].getXY()[0], this.visualTreeContent[index].getXY()[1]);

        stageToAddTo.add(this.visualTreeContent[index], stage0coordsSet2, new MoveFadeIn());
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
        /*        this.size = this.size*2;
                for (let i=this.size/2; i<this.size; i++){
                    this.visualDatastructure[i] = new ArrayElementController(null, this.showIndex);
                    this.visualDatastructure[i].setXY(leftMargin + elementBoxWidth + (elementBoxWidth*i), this.elementBoxY+(elementBoxHeight/2));
                    this.visualDatastructure[i].setIndex(i);
                }*/
    }
    createNodeArrows(){
        if (index !== 0){
            let parentTreeNode = this.visualTreeContent[HeapArray.parent(index)];
            if (index % 2 !== 0){
                console.log("Index is odd");
                // Has parent
                let leftArrow = new VisualArrow(null, null, this.treeNodeRadius, this.treeNodeRadius);
                let rightArrow = new VisualArrow(null, null, this.treeNodeRadius, this.treeNodeRadius);

                parentTreeNode.addOutgoingArrow(leftArrow);
                parentTreeNode.leftArrow = leftArrow;
                parentTreeNode.addOutgoingArrow(rightArrow);
                parentTreeNode.rightArrow = rightArrow;
                this.visualTreeContent[index].addIncomingArrow(parentTreeNode.leftArrow);
            }else{
                console.log("Index is even");
                this.visualTreeContent[index].addIncomingArrow(parentTreeNode.rightArrow);
            }
        }
    }
    updateTreeNodeCoords(){
        let numLevels = Math.floor(Math.log2(this.datastructure.numElements));

        let radiusOfNode = 20;
        let gapUnit = radiusOfNode;
        let nodeXSpacingFactor = 0.5;
        let nodeYSpacingFactor = 0.5;

        let totalExtraGap = (Math.pow(2, numLevels)*nodeXSpacingFactor);
        let unitsToStart = (Math.pow(2, numLevels)) + totalExtraGap;

        for (let i=0; i<this.datastructure.numElements; i++){
            let currLevel = Math.floor(Math.log2(i+1));
            let nodesOnCurrLevel = Math.pow(2, currLevel);
            let nodePosOnLevel = Math.abs((nodesOnCurrLevel-i)-1);
            console.log("nodePosOnLevel: " + nodePosOnLevel);
            console.log("numLevels: " + numLevels);
            console.log("currLevel: " + currLevel);
            //let reverseCurrLevel = (currLevel + 1) - (i+1);

            let reverseCurrLevel = (numLevels+1) - currLevel;
            console.log("reverseCurrLevel: " + reverseCurrLevel);
            let currLevelExtraNodeGap = (Math.pow(2, reverseCurrLevel)*nodeXSpacingFactor);
            let distanceBetweenNodes = (Math.pow(2, reverseCurrLevel)-1)+currLevelExtraNodeGap;
            let distanceFromLeftToFirstNode = ((Math.pow(2, reverseCurrLevel-1)-1))+(currLevelExtraNodeGap/2);


            console.log("distanceFromLeftToFirstNode: " + distanceFromLeftToFirstNode);
            console.log("distanceBetweenNodes: " + distanceBetweenNodes);

            let x = canvas.width / 2 - (unitsToStart * radiusOfNode);
            //x += (distanceFromLeftToFirstNode * radiusOfNode) + radiusOfNode + radiusOfNode + (distanceBetweenNodes * radiusOfNode * nodePosOnLevel);
            x += (distanceFromLeftToFirstNode * radiusOfNode) + radiusOfNode;
            x += nodePosOnLevel * (radiusOfNode + (distanceBetweenNodes * radiusOfNode));


            let y = (canvas.height / 2);
            y += (currLevel * (radiusOfNode*2)) + (radiusOfNode * nodeYSpacingFactor * currLevel );

            console.log("HELLO");

            this.visualTreeContent[i].setXY(x, y);
        }
    }
    draw() {
        for (let i=0; i<this.datastructure.numElements; i++){
            //this.visualDatastructure[i].draw();
            //ctx.fillRect(this.visualTreeContent[i].getXY()[0], this.visualTreeContent[i].getXY()[1],20,20);
            this.visualTreeContent[i].draw();
        }
        super.draw();
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

        let tailArrowCoordSetStart = new CoordsSet();
        tailArrowCoordSetStart.setFromXY(this.tailArrow.startXY[0], this.tailArrow.startXY[1]);
        tailArrowCoordSetStart.setToXY(this.visualDatastructure[this.datastructure.tail].getXY()[0], this.tailArrow.startXY[1]);

        let tailArrowCoordSetEnd = new CoordsSet();
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
        return (this.xy[1] === otherNode.getXY()[1]) && (this.xy[1] === otherNode.xy[1]);
    }
    setIncomingArrowsXY(x, y){
        for (let i=0; i<this.incomingArrows.length; i++){
            this.incomingArrows[i].setEndXY(x, y-elementBoxHeight/2);
        }
    }
    addIncomingArrow(arrow){
        super.addIncomingArrow(arrow);

        arrow.setEndXY(this.xy[0], this.xy[1]-elementBoxHeight/2);
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
            this.visualObjects[i].setXY(this.xy[0], this.xy[1]);
        }
        this.updateArrowXY(this.xy[0], this.xy[1]);
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