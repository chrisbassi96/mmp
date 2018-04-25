class AdtController{
    constructor(adt, datastructureController){
        this.adt = adt;
        this.datastructureController = datastructureController;
    }
}

class StackController extends AdtController{
    constructor(adt, datastructureController){
        super(adt, datastructureController);
    }
    push(value){
        let pushedElement = this.adt.push(value);

        if (pushedElement==null){
            outputLabel.innerText = "Stack is full";
        }else{
            outputLabel.innerText = "Push " + pushedElement.value;
            this.datastructureController.moveIntoDatastructure(pushedElement);
        }
    }
    pop(){
        let poppedElement = this.adt.pop();

        if (poppedElement==null){
            outputLabel.innerText = "Stack is empty";
        }else{
            outputLabel.innerText = "Pop " + poppedElement.value;
            this.datastructureController.moveOutOfDatastructure(poppedElement);
        }
    }
    peek(){
        let result = this.adt.peek();

        if (result==null){
            outputLabel.innerText = "Stack is empty";
        }else{
            outputLabel.innerText = result;
        }
    }
}

class QueueController extends AdtController{
    constructor(adt, datastructureController){
        super(adt, datastructureController);
    }
    enqueue(value){
        let enqueuedElement = this.adt.enqueue(value);

        if (enqueuedElement==null){
            outputLabel.innerText = "Queue is full";
        }else{
            outputLabel.innerText = "Enqueue " + enqueuedElement.value;
            this.datastructureController.moveIntoDatastructure(enqueuedElement);
        }
    }
    dequeue(){
        let dequeuedElement = this.adt.dequeue();

        if (dequeuedElement==null){
            outputLabel.innerText = "Queue is empty";
        }else{
            outputLabel.innerText = "Dequeue " + dequeuedElement.value;
            this.datastructureController.moveOutOfDatastructure(dequeuedElement);
        }
    }
    peek(){
        let peek = this.adt.peek();

        if (peek == null){
            outputLabel.innerText = "Queue is empty";
        }else{
            outputLabel.innerText = peek;
        }
    }
}

class PriorityQueueController extends  AdtController{
    constructor(adt, datastructureController){
        super(adt, datastructureController);
    }
    insert(element){
        let insertedElement = this.adt.insert(element);

        if (insertedElement == null){

        }else{
            outputLabel.innerText = "Insert " + element;
            this.datastructureController.moveIntoDatastructure(insertedElement);
        }
    }
}

class SinglyLinkedListController{
    constructor(datastructure, elementBoxY=topBottomMargin+90, showIndex=false){
        this.datastructure = datastructure;
        this.elementBoxY = elementBoxY;

        this.headArrow = new VisualArrow();
        this.headArrow.setStartXY(leftMargin+elementBoxWidth, elementBoxLabelY);
        this.headArrow.setEndXY(leftMargin+elementBoxWidth, this.elementBoxY);

        this.tailArrow = new VisualArrow();
        this.tailArrow.setStartXY(leftMargin+elementBoxWidth, elementBoxLabelY);
        this.tailArrow.setEndXY(leftMargin+elementBoxWidth, this.elementBoxY);

        this.draw();
    }
    moveIntoVisualDatastructure(element){
        let newNode = new VisualLinkedListElement(element);

        // This exchanging of coordinates is like setting the head to the new node: "="
        //newNode.setOldMiddleXY(leftMargin + elementBoxWidth, canvas.height - topBottomMargin);
        //newNode.setStaticMiddleXY(leftMargin + elementBoxWidth, this.elementBoxY+(elementBoxHeight/2));

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

        this.shiftNodes("right");
        this.head.updateElementValue();

        let stage0 = new AnimationSequence();
        stage0.doNotDraw(this.head);
        stage0.executeConcurrently = true;

        let stage0coordsSet1 = new CoordSet();
        stage0coordsSet1.setFromXY(leftMargin + elementBoxWidth, canvas.height / 2);
        //stage0coordsSet1.middleXY = [leftMargin + elementBoxWidth, canvas.height / 2];
        stage0coordsSet1.setToXY(leftMargin + elementBoxWidth, canvas.height / 2);

        let tempElement = new VisualLinkedListElement();
        stage0.add(tempElement, stage0coordsSet1, new MoveFadeIn());
        stage0.addTempObject(tempElement);

        let headValue = new VisualValue(this.head.physicalElement.getValue());

        let stage0coordsSet2 = new CoordSet();
        stage0coordsSet2.setFromXY(leftMargin + elementBoxWidth, canvas.height - topBottomMargin);
        //stage0coordsSet2.middleXY = [leftMargin + elementBoxWidth, canvas.height - topBottomMargin];
        stage0coordsSet2.setToXY(stage0coordsSet1.toMiddleXY[0]-elementBoxWidth/2, stage0coordsSet1.toMiddleXY[1]);

        stage0.add(headValue, stage0coordsSet2, new MoveNoFade());
        stage0.addTempObject(headValue);

        animationSequencer.add(stage0);


        let stage1 = new AnimationSequence();

        let stage1coordsSetHead = new CoordSet();
        stage1coordsSetHead.fromMiddleXY = [leftMargin + elementBoxWidth, canvas.height / 2];
        //stage1coordsSet.middleXY = [leftMargin + elementBoxWidth, canvas.height / 2];
        stage1coordsSetHead.toMiddleXY =  [leftMargin + elementBoxWidth, canvas.height / 2];
        stage1.add(this.head, stage1coordsSetHead, new MoveNoFade());

        animationSequencer.add(stage1);


        let stage2 = new AnimationSequence();

        let stage2coordsSet = new CoordSet();
        stage2coordsSet.fromMiddleXY = [stage1coordsSetHead.toMiddleXY[0], stage1coordsSetHead.toMiddleXY[1]];
        //stage1coordsSet.middleXY = [leftMargin + elementBoxWidth, canvas.height / 2];
        stage2coordsSet.toMiddleXY =  [leftMargin + elementBoxWidth, this.elementBoxY+(elementBoxHeight/2)];

        stage2.add(this.head, stage2coordsSet, new MoveNoFade());

        console.log("Add send");
        console.log("THE SEQUENCE: ");
        console.log(stage1);
        animationSequencer.add(stage2);
        animationSequencer.go();
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

        let stage0HeadDummy = new VisualLinkedListElement();
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
    shiftNodes(direction){
        let curr = null;

        if (direction==="right"){
            if (this.datastructure.numElements===1){return;}
            curr = this.head.getNext();
        }else if(direction==="left"){
            if (this.datastructure.numElements===0){return;}
            curr = this.head;
        }

        let sequence = new AnimationSequence();

        while (curr!==null){
            curr.setOldMiddleXY(curr.getStaticMiddleXY()[0], curr.getStaticMiddleXY()[1]);
            if (direction === "right"){
                curr.setStaticMiddleXY(curr.getStaticMiddleXY()[0]+(3*elementBoxWidth), curr.getStaticMiddleXY()[1]);
            }else{
                curr.setStaticMiddleXY(curr.getStaticMiddleXY()[0]-(3*elementBoxWidth), curr.getStaticMiddleXY()[1]);
            }
            sequence.add(curr, curr.coordSet, new MoveNoFade());

            curr = curr.getNext();
        }
        sequence.doNotDraw(this.head);
        sequence.executeConcurrently = true;
        console.log("HELLO HELLO");
        animationSequencer.add(sequence);
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

class DatastructureController{
    constructor(datastructure, elementBoxY=topBottomMargin+elementBoxHeight, showIndex=false){
        this.datastructure = datastructure;
        this.elementBoxY = elementBoxY;
        this.showIndex = showIndex;
        this.visualDatastructure = null;
        this.visualDatastructureAnimator = null

    }
    moveIntoVisualDatastructure(element){
        this.visualDatastructure.moveIntoDatastructure(element);
        this.visualDatastructureAnimator.moveIntoDatastructure(element);
    }
    moveOutOfDatastructure(element) {
        this.visualDatastructure.moveIntoDatastructure(element);
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
        //super.moveIntoDatastructure(element);

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
        super.animationMoveIntoDatastructure(index, stageToAddTo);

        let stage0coordsSet2 = new CoordSet();
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
            //this.visualDatastructure[i].moveIntoDatastructure();
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

class VisualSimpleArrayAnimator{
    constructor(visualSimpleArray){
        this.visualDatastructure = visualSimpleArray;
    }
    moveIntoVisualDatastructure(element){
        let stage0 = new AnimationSequence();
        stage0.executeConcurrently = true;

        this.animationMoveIntoVisualDatastructure(element, stage0);

        animationSequencer.add(stage0);

        animationSequencer.go();
    }
    animationMoveIntoVisualDatastructure(element, stageToAddTo){
        // Setup for animation stage
        stageToAddTo.doNotDraw(this.visualDatastructure.getElement(element.index));

        // Declaration of objects involved in the animation stage
        let tempElement = new VisualArrayElement(null, element.index, this.showIndex);
        let headValue = new VisualValue(this.visualDatastructure.getElement(element.index).physicalElement.getValue());

        stageToAddTo.addTempObject(tempElement);
        stageToAddTo.addTempObject(headValue);

        console.log(element.index);

        let stage0coordsSetTempElement = new CoordSet();
        stage0coordsSetTempElement.setFromXY(this.visualDatastructure.getElement(element.index).getXY()[0], this.visualDatastructure.getElement(element.index).getXY()[1]);
        stage0coordsSetTempElement.setToXY(this.visualDatastructure.getElement(element.index).getXY()[0], this.visualDatastructure.getElement(element.index).getXY()[1]);

        let stage0coordsSet2 = new CoordSet();
        stage0coordsSet2.setFromXY(leftMargin + elementBoxWidth, canvas.height - topBottomMargin);
        stage0coordsSet2.setToXY(this.visualDatastructure.getElement(element.index).getXY()[0], this.visualDatastructure.getElement(element.index).getXY()[1]);

        stageToAddTo.add(tempElement, stage0coordsSetTempElement, new MoveNoFade());
        stageToAddTo.add(headValue, stage0coordsSet2, new MoveNoFade());
    }
    moveOutOfDatastructure(element){
        console.log(element);
        this.visualDatastructure.getElement(element.index).updateElementValue(); // Get the current visualValue from physical datastructure
        //this.visualDatastructure[index].update();
        this.visualDatastructure.getElement(element.index).setIndex(element.index); // Update index
        //this.visualDatastructure[index].setOldMiddleXY(leftMargin, canvas.height - topBottomMargin);

        console.log("outElement value:" + element.value);
        console.log("outElement index:" + element.index);

        let stage0 = new AnimationSequence();

        let poppedElement = new VisualValue(element.value);

        stage0.addTempObject(poppedElement);

        let stage0coordsSetPoppedElement = new CoordSet();
        stage0coordsSetPoppedElement.setFromXY(this.visualDatastructure.getElement(element.index).getXY()[0], this.visualDatastructure.getElement(element.index).getXY()[1]);
        stage0coordsSetPoppedElement.setToXY(canvas.width - leftMargin, canvas.height-topBottomMargin);

        stage0.add(poppedElement, stage0coordsSetPoppedElement, new MoveFadeOut());

        animationSequencer.add(stage0);

        animationSequencer.go();
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