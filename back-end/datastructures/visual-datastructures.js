class VisualElement extends VisualObject{
    constructor(physicalElement){
        super();
        this.physicalElement = physicalElement;
        this.visualValue = new VisualValue("null");
        this.visualObjects.push(this.visualValue);
    }
    updateElementValue(value=this.physicalElement.getValue()){
        this.visualValue.value = value;
    }
    doAnimationComplete(){
        if (this.physicalElement === null) return;
        this.updateElementValue();
        this.setAllXY();
        console.log(this.visualValue.value);
    }
}

class VisualArrayElement extends VisualElement{
    constructor(physicalElement, indexNum, showIndex){
        super(physicalElement);
        this.showIndex = showIndex;

        this.visualElementBox = new VisualBox();
        this.visualObjects.push(this.visualElementBox);

        this.visualIndexNum = new VisualValue(indexNum);
        if (showIndex){
            this.visualObjects.push(this.visualIndexNum);
        }
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
    updateMiddleXY(x, y, progress){
        super.updateMiddleXY(x, y, progress);

        if(this.visualValue.isBeingAnimated() || this.isBeingAnimated()){
            this.visualValue.updateMiddleXY(x, y, progress);
        }
        if(this.visualElementBox.isBeingAnimated() || this.isBeingAnimated()){
            this.visualElementBox.updateMiddleXY(x, y, progress);
        }
        if (this.visualIndexNum.isBeingAnimated() || this.isBeingAnimated()){
            this.visualIndexNum.updateMiddleXY(x, y+boxHeight, progress);
        }

        this.updateArrowsXY();
    }
    updateArrowsXY(){
        for (let i=0; i<this.incomingArrows.length; i++){
            this.incomingArrows[i].setEndXY(this.middleXY[0], this.middleXY[1]-boxHeight/2);
        }
    }
    update(){
        this.updateMiddleXY();
        this.setAllOldMiddleXY();
    }
    setAllXY(){
        this.visualElementBox.setXY(this.getXY()[0], this.getXY()[1]);
        this.visualValue.setXY(this.getXY()[0], this.getXY()[1]);
        this.visualIndexNum.setXY(this.getXY()[0], this.getXY()[1]+boxHeight);
    }
    draw(){
        super.draw();
    }
}

class VisualSinglyLinkedListElement extends VisualElement{
    constructor(physicalElement){
        super(physicalElement);
        this.nextVisualElement = null;

        this.visualValueBox = new VisualBox();
        this.visualNextBox = new VisualBox();
        this.visualNextBox.crossedThrough = true;
        this.visualNext = new VisualValue("next");

        this.visualObjects.push(this.visualValueBox);
        this.visualObjects.push(this.visualNextBox);
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
        this.visualValueBox.setXY(this.getXY()[0]-(this.visualValueBox.width/2), this.getXY()[1]);
        this.visualValue.setXY(this.getXY()[0]-(this.visualValueBox.width/2), this.getXY()[1]);
        this.visualNextBox.setXY(this.getXY()[0]+(this.visualValueBox.width/2), this.getXY()[1]);
        this.visualNext.setXY(this.getXY()[0]+(this.visualValueBox.width/2), this.getXY()[1]);
    }
    updateMiddleXY(x, y, progress){
        super.updateMiddleXY(x, y, progress);

        // Only update the coords of element visual tempObjects IF they are being animated
        // This allows us to control which visual tempObjects of the element are animated and which are not
        if(this.visualValueBox.isBeingAnimated() || this.isBeingAnimated()){
            this.visualValueBox.updateMiddleXY(x-(this.visualValueBox.width/2), y, progress);
        }
        if(this.visualNextBox.isBeingAnimated() || this.isBeingAnimated()){
            this.visualNextBox.updateMiddleXY(x+(this.visualValueBox.width/2), y, progress);
        }
        if (this.visualValue.isBeingAnimated() || this.isBeingAnimated()){
            this.visualValue.updateMiddleXY(x-(this.visualValueBox.width/2), y, progress);
        }
        if (this.visualNext.isBeingAnimated() || this.isBeingAnimated()){
            this.visualNext.updateMiddleXY(x+(this.visualValueBox.width/2), y, progress);
        }

        //this.setIncomingArrowsXY(x, y);
        this.updateArrowsXY();

    }
    updateArrowsXY(){
        for (let i=0; i<this.incomingArrows.length; i++){
            this.incomingArrows[i].setEndXY(this.middleXY[0], this.middleXY[1]-boxHeight/2);
        }
    }
    isOnTopOf(otherNode){
        return (this.middleXY[1] === otherNode.getXY()[1]) && (this.middleXY[1] === otherNode.middleXY[1]);
    }
    setIncomingArrowsXY(x, y){
        for (let i=0; i<this.incomingArrows.length; i++){
            this.incomingArrows[i].setEndXY(x, y-boxHeight/2);
        }
    }
    addIncomingArrow(arrow){
        super.addIncomingArrow(arrow);

        arrow.setEndXY(this.middleXY[0], this.middleXY[1]-boxHeight/2);
    }
    draw() {
        super.draw();
        if(!this.notDrawn && this.nextVisualElement !== null){
            this.visualNextBox.crossedThrough = false;
            drawLabelledArrow("next", 0, this.getXY()[0]+(boxWidth/2), this.getXY()[1], this.nextVisualElement.visualValue.getXY()[0]-(boxWidth/2), this.nextVisualElement.visualValue.getXY()[1]);
        }

    }
}

class VisualTreeNode extends VisualElement{
    constructor(physicalElement, radius){
        super(physicalElement);
        //this.parentNode = null;
        this.leftArrow = null;
        this.rightArrow = null;

        this.visualCircle = new VisualCircle(radius);
        this.visualObjects.push(this.visualCircle);
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

class VisualDatastructure{
    constructor(datastructure, elementBoxY=topBottomMargin+boxHeight){
        this.physicalDatastructure = datastructure;
        this.elementBoxY = elementBoxY;
        this.content = [];
    }
    draw(){
        clearCanvas();

    }
}

class VisualSimpleArray extends VisualDatastructure{
    constructor(datastructure, elementBoxY=topBottomMargin+boxHeight, showIndex=false){
        super(datastructure, elementBoxY);
        this.physicalDatastructure = datastructure;
        this.elementBoxY = elementBoxY;
        this.showIndex = showIndex;
        this.content = [];
        this.animator = new VisualSimpleArrayAnimator(this);

        for (let i=0; i<datastructure.size; i++){
            this.content[i] = new VisualArrayElement(datastructure.getElement(i), i, this.showIndex);
            this.content[i].setXY(leftMargin + (boxWidth/2) + (boxWidth*i), this.elementBoxY+(boxHeight/2));
            this.content[i].setStaticMiddleXY(leftMargin + (boxWidth/2) + (boxWidth*i), this.elementBoxY+(boxHeight/2));
            this.content[i].draw();
        }
    }
    insert(element){
        let index = element.index;
        console.log(element);
        this.content[index].updateElementValue(); // Get the current visualValue from physical datastructure
        //this.visualDatastructure[index].update();
        this.content[index].setIndex(index); // Update index

        console.log(this.animator);
        this.animator.insertAnimation(element);
    }
    remove(element){
        this.getElement(element.index).updateElementValue("null");
        this.animator.removeAnimation(element);
    }
    getElement(index){
        if (index >= 0 && index < this.content.length){
            return this.content[index];
        }
        // Give some sort of error
        return null;
    }
    draw() {
        clearCanvas();
        for (let i=0; i<this.physicalDatastructure.size; i++){
            this.content[i].draw();
        }
    }
}

class VisualCircularArray extends VisualSimpleArray{
    constructor(datastructure, elementBoxY, showIndex){
        super(datastructure, elementBoxY, showIndex);
        this.animator = new VisualCircularArrayAnimator(this);

        // Set up for the head arrow
        this.headArrowLabel = new VisualValue("head / tail");
        this.headArrow = new VisualArrow(0, 10);
        this.headArrowEnd = new VisualObject();

        this.headArrowEnd.setXY(this.content[0].getXY()[0], this.content[0].getXY()[1]-boxHeight/2);
        this.headArrowLabel.setXY(this.content[0].getXY()[0], elementBoxLabelY);
        this.headArrow.setStartXY(this.content[0].getXY()[0], elementBoxLabelY);
        this.headArrow.setEndXY(this.content[0].getXY()[0], this.content[0].getXY()[1]-boxHeight/2);

        this.headArrowLabel.addOutgoingArrow(this.headArrow);
        this.headArrowEnd.addIncomingArrow(this.headArrow);


        this.tailArrowLabel = new VisualValue("tail");
        this.tailArrow = new VisualArrow(0, 10);
        this.tailArrowEnd = new VisualObject(); // Create dummy end point object so that the arrow follows during anim
        this.tailArrowLabel.setXY(this.content[0].getXY()[0], elementBoxLabelY);
        this.tailArrowEnd.setXY(this.content[0].getXY()[0], this.content[0].getXY()[1]-boxHeight/2);
        this.tailArrowLabel.addOutgoingArrow(this.tailArrow);
        this.tailArrowEnd.addIncomingArrow(this.tailArrow);
        this.draw();
    }
    insert(element){
        let head = this.physicalDatastructure.getHead();
        let tail = this.physicalDatastructure.getTail();

        if (head === tail){
            this.headArrowLabel.setValue("head / tail");
        }else{
            this.headArrowLabel.setValue("head")
        }

        super.insert(element);
    }
    remove(element){
        let head = this.physicalDatastructure.getHead();
        let tail = this.physicalDatastructure.getTail();

        if (head === tail){
            this.headArrowLabel.setValue("head / tail");
        }else{
            this.headArrowLabel.setValue("head");
        }

        super.remove(element);
    }
    draw(){
        super.draw();

        // Draw the common parts of any array structure
        this.headArrowLabel.draw();

        let numElements = this.physicalDatastructure.getNumElements();
        let head = this.physicalDatastructure.getHead();
        let tail = this.physicalDatastructure.getTail();

        if (head !== tail){
            this.tailArrowLabel.draw();
        }
    }
}

class VisualHeapArray extends VisualSimpleArray{
    constructor(datastructure, elementBoxY, showIndex){
        super(datastructure, elementBoxY, showIndex);
        this.originalSize = datastructure.size;
        this.contentTree = [];
        this.treeNodeRadius = circleRadius;
        this.animator = new VisualHeapArrayAnimator(this);

        for (let i=0; i<this.physicalDatastructure.size; i++){
            this.contentTree[i] = new VisualTreeNode(this.physicalDatastructure.getElement(i), this.treeNodeRadius);
        }
    }
    insert(element){
        if (this.originalSize < this.physicalDatastructure.size){
            this.expand();
        }

        this.updateTreeNodeCoords();

        for (let i=0; i<this.content.length; i++){
            this.getElement(i).updateElementValue();
            this.getTreeElement(i).updateElementValue();
        }

        // Animations disabled due to incompletion
        //this.animator.insertAnimation(element);

        this.createNodeArrows(element.index);

        clearCanvas();
        this.draw();
    }
    getTreeElement(index){
        if (index >= 0 && index < this.contentTree.length){
            return this.contentTree[index];
        }
        // Give some sort of error
        return null;
    }
    createNodeArrows(index){
        if (index !== 0){
            let parentTreeNode = this.contentTree[HeapArray.parent(index)];
            if (index % 2 !== 0) {
                // Has parent
                let leftArrow = new VisualArrow(this.treeNodeRadius, this.treeNodeRadius);
                let rightArrow = new VisualArrow(this.treeNodeRadius, this.treeNodeRadius);

                parentTreeNode.addOutgoingArrow(leftArrow);
                parentTreeNode.leftArrow = leftArrow;
                parentTreeNode.addOutgoingArrow(rightArrow);
                parentTreeNode.rightArrow = rightArrow;
                this.contentTree[index].addIncomingArrow(parentTreeNode.leftArrow);
            } else {
                this.contentTree[index].addIncomingArrow(parentTreeNode.rightArrow);
            }
        }
    }
    updateTreeNodeCoords(){
        let numLevels = Math.floor(Math.log2(this.physicalDatastructure.numElements));

        let totalExtraGap = (Math.pow(2, numLevels)*treeNodeSpacingFactorX);
        let unitsToStart = (Math.pow(2, numLevels)) + totalExtraGap;

        let startingX = canvas.width / 2 - (unitsToStart * circleRadius);
        let startingY = (canvas.height / 2);

        for (let i=0; i<this.physicalDatastructure.numElements; i++){
            let currLevel = Math.floor(Math.log2(i+1));
            let nodesOnCurrLevel = Math.pow(2, currLevel);
            let nodePosOnLevel = Math.abs((nodesOnCurrLevel-i)-1);

            let reverseCurrLevel = (numLevels+1) - currLevel;
            let currLevelExtraNodeGap = (Math.pow(2, reverseCurrLevel)*treeNodeSpacingFactorX);
            let distanceBetweenNodes = (Math.pow(2, reverseCurrLevel)-1)+currLevelExtraNodeGap;
            let distanceFromLeftToFirstNode = ((Math.pow(2, reverseCurrLevel-1)-1))+(currLevelExtraNodeGap/2);

            let x = startingX;
            x += (distanceFromLeftToFirstNode * circleRadius) + circleRadius;
            x += nodePosOnLevel * (distanceBetweenNodes * circleRadius) + circleRadius;

            let y = startingY;
            y += (currLevel * (circleRadius*2)) + (circleRadius * treeNodeSpacingFactorY * currLevel);

            this.contentTree[i].setXY(x, y);
        }
    }
    expand(){
        for (let i=this.originalSize; i<this.physicalDatastructure.size; i++){
            console.log(i);
            this.content[i] = new VisualArrayElement(this.physicalDatastructure.getElement(i), i, this.showIndex);
            this.content[i].setXY(leftMargin + (boxWidth/2) + (boxWidth*i), this.elementBoxY+(boxHeight/2));
            this.content[i].setStaticMiddleXY(leftMargin + (boxWidth/2) + (boxWidth*i), this.elementBoxY+(boxHeight/2));

            this.contentTree[i] = new VisualTreeNode(this.physicalDatastructure.getElement(i), this.treeNodeRadius);
        }
        this.originalSize = this.physicalDatastructure.size;
    }
    draw() {
        super.draw();
        for (let i=0; i<this.physicalDatastructure.numElements; i++){
            this.contentTree[i].draw();
        }
    }
}

class VisualSinglyLinkedList{
    constructor(datastructure, elementBoxY=topBottomMargin+90){
        this.datastructure = datastructure;
        this.elementBoxY = elementBoxY;
        this.animator = new VisualSinglyLinkedListAnimator(this);

        this.headArrowLabel = new VisualValue("head / tail");
        this.headArrow = new VisualArrow();
        this.headArrow.setStartXY(leftMargin+boxWidth, elementBoxLabelY);
        this.headArrow.setEndXY(leftMargin+boxWidth, this.elementBoxY);

        this.tailArrow = new VisualArrow();
        this.tailArrow.setStartXY(leftMargin+boxWidth, elementBoxLabelY);
        this.tailArrow.setEndXY(leftMargin+boxWidth, this.elementBoxY);

        this.head = null;
        this.tail = null;

        this.draw();
    }
    insert(element){
        let newNode = new VisualSinglyLinkedListElement(element);

        if (this.datastructure.head === element){
            // addFirst()
        }else if (this.datastructure.tail === element){
            // addLast()
        }

        if (this.head == null){
            newNode.setNext(null);
            this.head = newNode;
            this.tail = newNode;
        }else{
            this.head.incomingArrows = [];
            newNode.setNext(this.head);
            this.head = newNode;
            this.head.getNext().addIncomingArrow(this.tailArrow);
        }

        this.head.addIncomingArrow(this.headArrow);
        this.head.updateElementValue();

        this.animator.insertAnimation(element);
    }
    moveOutOfDatastructure(element){
        //this.head = null;
        this.head.physicalElement = this.datastructure.head;
        this.tail.physicalElement = this.datastructure.tail;

        this.head.getNext().addIncomingArrow(this.headArrow);

        let stage0 = new AnimationSequence();

        let stage0coordsSetHeadDummy = new CoordSet();
        stage0coordsSetHeadDummy.setFromXY(leftMargin + boxWidth, this.elementBoxY+(boxHeight/2));
        stage0coordsSetHeadDummy.setToXY(leftMargin + boxWidth, canvas.height / 2);

        let stage0HeadDummy = new VisualSinglyLinkedListElement();
        stage0HeadDummy.visualValue.value = element;
        stage0.addTempObject(stage0HeadDummy);
        stage0.doNotDraw(this.head);
        stage0.add(stage0HeadDummy, stage0coordsSetHeadDummy, new MoveFadeOut());

        animationSequencer.add(stage0);

        console.log("HERE IS THE HEAD");
        console.log(this.head);

        this.shiftNodes("left");

        this.head = this.head.getNext();

        animationSequencer.go();
    }
    draw(){
        clearCanvas();

        if(this.datastructure.isEmpty()){
            this.headArrow.setLabelText("head / tail");
            this.headArrow.draw();
            //drawLabelledArrow("head / tail", 5, leftMargin+boxWidth, elementBoxLabelY, leftMargin+boxWidth, this.elementBoxY-10);
            return;
        }
//this.headArrow.startXY[0]+(3*boxWidth*(this.datastructure.numElements-1))
        this.tailArrow.startXY = [this.tail.getXY()[0], this.headArrow.startXY[1]];

        if (this.head.physicalElement === this.tail.physicalElement){
            this.headArrow.setLabelText("head / tail");
        }else{
            this.headArrow.setLabelText("head");
            this.tailArrow.setLabelText("tail");
            this.tailArrow.draw();
        }

        this.headArrow.draw();



        let cur = this.head;
        while(cur!=null){
            cur.draw();
            cur = cur.getNext();
        }
    }
}