class VisualObject2{
    constructor(){
        this.middleXY = [0, 0];
        this.notDrawn = false;
        this.visualObjects = [];
        this.incomingArrows = [];
        this.outgoingArrows = [];
        this.coordSet = new CoordSet();
        this.animationProperties = new AnimationProperties();
    }
    // Return middle X and Y coordinates
    // @return middle X and Y coordinates as Array
    getXY(){
        return this.middleXY;
    }
    setXY(x, y){
        this.middleXY = [x, y];
    }
    getStaticMiddleXY(){
        return this.coordSet.getToXY();
    }
    setStaticMiddleXY(x, y){
        this.coordSet.setToXY(x, y);
    }
    getOldMiddleXY(){
        return this.coordSet.getFromXY();
    }
    setOldMiddleXY(x, y){
        this.coordSet.setFromXY(x, y);
        this.setAllOldMiddleXY();
    }
    setAllOldMiddleXY(){
        for (let i=0; i<this.visualObjects.length; i++){
            this.visualObjects[i].setOldMiddleXY(this.coordSet.getFromXY()[0], this.coordSet.getFromXY()[1]);
        }
    }
    setCoords(coordsSet){
        this.coordSet = coordsSet;
        this.middleXY = coordsSet.getFromXY();
    }
    updateMiddleXY(x, y, progress){
        this.animationProperties.progress = progress;

        if (this.animationProperties.isMoving){
            this.setXY(x, y);
        }
        if (this.animationProperties.isFading){
            this.updateOpacity();
        }

        for (let i=0; i<this.incomingArrows.length; i++){
            this.incomingArrows[i].setEndXY(this.middleXY[0], this.middleXY[1]);
        }
        for (let i=0; i<this.outgoingArrows.length; i++){
            this.outgoingArrows[i].setStartXY(this.middleXY[0], this.middleXY[1]);
        }
    }
    addIncomingArrow(visualArrow){
        visualArrow.setEndXY(this.middleXY[0], this.middleXY[1]);
        this.incomingArrows.push(visualArrow);
    }
    addOutgoingArrow(visualArrow){
        visualArrow.setStartXY(this.middleXY[0], this.middleXY[1]);
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
                newOpacity = this.animationProperties.progress/animationSteps;
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
    updateXY2(x, y, progress){
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
    constructor(datastructure, elementBoxY=topBottomMargin+elementBoxHeight){
        this.physicalDatastructure = datastructure;
        this.elementBoxY = elementBoxY;
        this.content = [];
    }
    draw(){
        for (let i=0; i<this.physicalDatastructure.size; i++){
            this.content[i].draw();
        }
    }
}

class VisualSimpleArray extends VisualDatastructure{
    constructor(datastructure, elementBoxY=topBottomMargin+elementBoxHeight, showIndex=false){
        super(datastructure, elementBoxY);
        this.physicalDatastructure = datastructure;
        this.elementBoxY = elementBoxY;
        this.showIndex = showIndex;
        this.content = [];
        this.animator = new VisualSimpleArrayAnimator(this);

        for (let i=0; i<datastructure.size; i++){
            this.content[i] = new VisualArrayElement(datastructure.getElement(i), i, this.showIndex);
            this.content[i].setXY(leftMargin + (elementBoxWidth/2) + (elementBoxWidth*i), this.elementBoxY+(elementBoxHeight/2));
            this.content[i].setStaticMiddleXY(leftMargin + (elementBoxWidth/2) + (elementBoxWidth*i), this.elementBoxY+(elementBoxHeight/2));
            this.content[i].draw();
        }
    }
    insert(element){
        let index = element.index;
        console.log(element);
        this.content[index].updateElementValue(); // Get the current visualValue from physical datastructure
        //this.visualDatastructure[index].update();
        this.content[index].setIndex(index); // Update index

        this.animator.insertAnimation(element);
    }
    remove(element){

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
        //clearCanvas();
        for (let i=0; i<this.physicalDatastructure.size; i++){
            this.content[i].draw();
        }
    }
}

class VisualHeapArray extends VisualSimpleArray{
    constructor(datastructure, elementBoxY, showIndex){
        super(datastructure, elementBoxY, showIndex);
        this.originalSize = datastructure.size;
        this.contentTree = [];
        this.treeNodeRadius = 20;
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

        this.animator.insertAnimation(element);

        console.log("hello");

        //this.visualDatastructure.getElement(p).updateElementValue();
        //this.visualDatastructure.getTreeElement(p).updateElementValue();

        //this.contentTree[element.index].updateElementValue();
        //super.insert(element);


        this.createNodeArrows(element.index);

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
                console.log("Index is odd");
                // Has parent
                let leftArrow = new VisualArrow(null, null, this.treeNodeRadius, this.treeNodeRadius);
                let rightArrow = new VisualArrow(null, null, this.treeNodeRadius, this.treeNodeRadius);

                parentTreeNode.addOutgoingArrow(leftArrow);
                parentTreeNode.leftArrow = leftArrow;
                parentTreeNode.addOutgoingArrow(rightArrow);
                parentTreeNode.rightArrow = rightArrow;
                this.contentTree[index].addIncomingArrow(parentTreeNode.leftArrow);
            } else {
                console.log("Index is even");
                this.contentTree[index].addIncomingArrow(parentTreeNode.rightArrow);
            }
        }
    }
    updateTreeNodeCoords(){
        let numLevels = Math.floor(Math.log2(this.physicalDatastructure.numElements));

        let radiusOfNode = 20;
        let gapUnit = radiusOfNode;
        let nodeXSpacingFactor = 0.5;
        let nodeYSpacingFactor = 0.5;

        let totalExtraGap = (Math.pow(2, numLevels)*nodeXSpacingFactor);
        let unitsToStart = (Math.pow(2, numLevels)) + totalExtraGap;

        for (let i=0; i<this.physicalDatastructure.numElements; i++){
            let currLevel = Math.floor(Math.log2(i+1));
            let nodesOnCurrLevel = Math.pow(2, currLevel);
            let nodePosOnLevel = Math.abs((nodesOnCurrLevel-i)-1);

            let reverseCurrLevel = (numLevels+1) - currLevel;
            let currLevelExtraNodeGap = (Math.pow(2, reverseCurrLevel)*nodeXSpacingFactor);
            let distanceBetweenNodes = (Math.pow(2, reverseCurrLevel)-1)+currLevelExtraNodeGap;
            let distanceFromLeftToFirstNode = ((Math.pow(2, reverseCurrLevel-1)-1))+(currLevelExtraNodeGap/2);

            let x = canvas.width / 2 - (unitsToStart * radiusOfNode);
            x += (distanceFromLeftToFirstNode * radiusOfNode) + radiusOfNode;
            x += nodePosOnLevel * (radiusOfNode + (distanceBetweenNodes * radiusOfNode));

            let y = (canvas.height / 2);
            y += (currLevel * (radiusOfNode*2)) + (radiusOfNode * nodeYSpacingFactor * currLevel );

            this.contentTree[i].setXY(x, y);
        }
    }
    expand(){
        for (let i=this.originalSize; i<this.physicalDatastructure.size; i++){
            console.log(i);
            this.content[i] = new VisualArrayElement(this.physicalDatastructure.getElement(i), i, this.showIndex);
            this.content[i].setXY(leftMargin + (elementBoxWidth/2) + (elementBoxWidth*i), this.elementBoxY+(elementBoxHeight/2));
            this.content[i].setStaticMiddleXY(leftMargin + (elementBoxWidth/2) + (elementBoxWidth*i), this.elementBoxY+(elementBoxHeight/2));

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

class VisualCircularArray extends VisualSimpleArray{
    constructor(datastructure, elementBoxY, showIndex){
        super(datastructure, elementBoxY, showIndex);

        this.headArrowLabel = new VisualValue("head / tail");
        this.headArrow = new VisualArrow(null, "start", 0, 10);
        //this.headArrow.setLabelText("head / tail");
        this.headArrowLabel.addOutgoingArrow(this.headArrow);

        this.headArrowLabel.setXY(this.content[0].getXY()[0], elementBoxLabelY);
        this.headArrow.setStartXY(this.content[0].getXY()[0], elementBoxLabelY);
        this.headArrow.setEndXY(this.content[0].getXY()[0], this.content[0].getXY()[1]-elementBoxHeight/2);

        this.tailArrowLabel = new VisualValue();
        this.tailArrow = new VisualArrow(null, "start", 0, elementBoxHeight/2);
        this.tailArrow.setStartXY(this.content[0].getXY()[0], elementBoxLabelY);
        this.tailArrow.setEndXY(this.content[0].getXY()[0], this.content[0].getXY()[1]-elementBoxHeight/2);

        this.headArrowLabel.draw();
        this.headArrow.draw();
    }
    draw(){
        // Draw the common parts of any array structure
        this.headArrowLabel.draw();
        this.headArrow.draw();
        if (this.physicalDatastructure.head !== this.physicalDatastructure.tail){
            this.tailArrowLabel.draw();
            this.tailArrow.draw();
        }
        super.draw();
    }
}

class VisualSinglyLinkedList{
    constructor(datastructure, elementBoxY=topBottomMargin+90){
        this.datastructure = datastructure;
        this.elementBoxY = elementBoxY;
        this.animator = new VisualSinglyLinkedListAnimator(this);

        this.headArrow = new VisualArrow();
        this.headArrow.setStartXY(leftMargin+elementBoxWidth, elementBoxLabelY);
        this.headArrow.setEndXY(leftMargin+elementBoxWidth, this.elementBoxY);

        this.tailArrow = new VisualArrow();
        this.tailArrow.setStartXY(leftMargin+elementBoxWidth, elementBoxLabelY);
        this.tailArrow.setEndXY(leftMargin+elementBoxWidth, this.elementBoxY);

        this.head = null;
        this.tail = null;

        this.draw();
    }
    insert(element){
        let newNode = new VisualSinglyLinkedListElement(element);

        // This exchanging of coordinates is like setting the head to the new node: "="
        //newNode.setOldMiddleXY(leftMargin + elementBoxWidth, canvas.height - topBottomMargin);
        //newNode.setStaticMiddleXY(leftMargin + elementBoxWidth, this.elementBoxY+(elementBoxHeight/2));

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
        stage0coordsSetHeadDummy.setFromXY(leftMargin + elementBoxWidth, this.elementBoxY+(elementBoxHeight/2));
        stage0coordsSetHeadDummy.setToXY(leftMargin + elementBoxWidth, canvas.height / 2);

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
            //drawLabelledArrow("head / tail", 5, leftMargin+elementBoxWidth, elementBoxLabelY, leftMargin+elementBoxWidth, this.elementBoxY-10);
            return;
        }
//this.headArrow.startXY[0]+(3*elementBoxWidth*(this.datastructure.numElements-1))
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

        return;




        let headStaticXY = this.head.getStaticMiddleXY();
        let headMiddleXY = this.head.getXY();
        let tailMiddleXY = this.tail.getXY();

        let arrowEndX = 0;
        let arrowEndY = 0;

        if (this.head.notDrawn){
            arrowEndX = leftMargin+elementBoxWidth;
            arrowEndY = this.elementBoxY-10;
        }else{
            arrowEndX = headStaticXY[0];
            arrowEndY = this.head.getXY()[1]-(elementBoxHeight/2)-10;
        }

        if (this.head.physicalElement === this.tail.physicalElement){
            drawLabelledArrow("head / tail", 5, leftMargin+elementBoxWidth, elementBoxLabelY, arrowEndX, arrowEndY);
        }else{
            drawLabelledArrow("head", 5, leftMargin+elementBoxWidth, elementBoxLabelY, arrowEndX, arrowEndY);
            drawLabelledArrow("tail", 5, tailMiddleXY[0], elementBoxLabelY, tailMiddleXY[0], tailMiddleXY[1]-(elementBoxHeight/2)-10);
        }

        //let cur = this.head;
        while(cur!=null){
            cur.draw();
            cur = cur.getNext();
        }
    }
}