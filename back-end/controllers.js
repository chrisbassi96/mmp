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
            this.datastructureController.moveIntoVisualDatastructure(pushedElement);
        }
    }
    pop(){
        let poppedElement = this.adt.pop();

        if (poppedElement==null){
            outputLabel.innerText = "Stack is empty";
        }else{
            outputLabel.innerText = "Pop " + poppedElement.element;
            this.datastructureController.moveOutOfDatastructure(poppedElement.element, poppedElement.index);
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
            this.datastructureController.moveIntoVisualDatastructure(enqueuedElement);
        }
    }
    dequeue(){
        let dequeuedElement = this.adt.dequeue();

        if (dequeuedElement==null){
            outputLabel.innerText = "Queue is empty";
        }else{
            outputLabel.innerText = "Dequeue " + dequeuedElement.value;
            this.datastructureController.moveOutOfDatastructure(dequeuedElement.value, dequeuedElement.index);
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
            this.datastructureController.moveIntoVisualDatastructure(insertedElement);
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

        let stage0coordsSet1 = new CoordsSet();
        stage0coordsSet1.setFromXY(leftMargin + elementBoxWidth, canvas.height / 2);
        //stage0coordsSet1.middleXY = [leftMargin + elementBoxWidth, canvas.height / 2];
        stage0coordsSet1.setToXY(leftMargin + elementBoxWidth, canvas.height / 2);

        let tempElement = new VisualLinkedListElement();
        stage0.add(tempElement, stage0coordsSet1, new MoveFadeIn());
        stage0.addTempObject(tempElement);

        let headValue = new VisualValue(this.head.physicalElement.getValue());

        let stage0coordsSet2 = new CoordsSet();
        stage0coordsSet2.setFromXY(leftMargin + elementBoxWidth, canvas.height - topBottomMargin);
        //stage0coordsSet2.middleXY = [leftMargin + elementBoxWidth, canvas.height - topBottomMargin];
        stage0coordsSet2.setToXY(stage0coordsSet1.staticMiddleXY[0]-elementBoxWidth/2, stage0coordsSet1.staticMiddleXY[1]);

        stage0.add(headValue, stage0coordsSet2, new MoveNoFade());
        stage0.addTempObject(headValue);

        animationSequencer.add(stage0);


        let stage1 = new AnimationSequence();

        let stage1coordsSetHead = new CoordsSet();
        stage1coordsSetHead.oldMiddleXY = [leftMargin + elementBoxWidth, canvas.height / 2];
        //stage1coordsSet.middleXY = [leftMargin + elementBoxWidth, canvas.height / 2];
        stage1coordsSetHead.staticMiddleXY =  [leftMargin + elementBoxWidth, canvas.height / 2];
        stage1.add(this.head, stage1coordsSetHead, new MoveNoFade());

        animationSequencer.add(stage1);


        let stage2 = new AnimationSequence();

        let stage2coordsSet = new CoordsSet();
        stage2coordsSet.oldMiddleXY = [stage1coordsSetHead.staticMiddleXY[0], stage1coordsSetHead.staticMiddleXY[1]];
        //stage1coordsSet.middleXY = [leftMargin + elementBoxWidth, canvas.height / 2];
        stage2coordsSet.staticMiddleXY =  [leftMargin + elementBoxWidth, this.elementBoxY+(elementBoxHeight/2)];

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

        let stage0coordsSetHeadDummy = new CoordsSet();
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
            sequence.add(curr, curr.coordsSet, new MoveNoFade());

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

class SimpleArrayController{
    constructor(datastructure, elementBoxY=topBottomMargin+elementBoxHeight, showIndex=false){
        this.datastructure = datastructure;
        this.elementBoxY = elementBoxY;
        this.showIndex = showIndex;
        this.visualContent = [];

        //canvasObjectMan.addTempObject(this);

        for (let i=0; i<datastructure.size; i++){
            this.visualContent[i] = new VisualArrayElement(datastructure.getElement(i), i, this.showIndex);
            this.visualContent[i].setXY(leftMargin + (elementBoxWidth/2) + (elementBoxWidth*i), this.elementBoxY+(elementBoxHeight/2));
            this.visualContent[i].setStaticMiddleXY(leftMargin + (elementBoxWidth/2) + (elementBoxWidth*i), this.elementBoxY+(elementBoxHeight/2));
            //this.visualContent[i].setIndex(i);
            //this.visualContent[i].moveIntoVisualDatastructure();
            this.visualContent[i].draw();
        }
    }
    moveIntoVisualDatastructure(element){
        let index = element.index;
        console.log(element);
        this.visualContent[index].updateElementValue(); // Get the current visualValue from physical datastructure
        //this.visualContent[index].update();
        this.visualContent[index].setIndex(index); // Update index

        // Setup for animation stage
        let stage0 = new AnimationSequence();
        stage0.executeConcurrently = true;
        stage0.doNotDraw(this.visualContent[index]);

        // Declaration of objects involved in the animation stage
        let tempElement = new VisualArrayElement(null, index, this.showIndex);
        let headValue = new VisualValue(this.visualContent[index].physicalElement.getValue());

        stage0.addTempObject(tempElement);
        stage0.addTempObject(headValue);

        let stage0coordsSetTempElement = new CoordsSet();
        stage0coordsSetTempElement.setFromXY(this.visualContent[index].getXY()[0], this.visualContent[index].getXY()[1]);
        stage0coordsSetTempElement.setToXY(this.visualContent[index].getXY()[0], this.visualContent[index].getXY()[1]);

        let stage0coordsSet2 = new CoordsSet();
        stage0coordsSet2.setFromXY(leftMargin + elementBoxWidth, canvas.height - topBottomMargin);
        stage0coordsSet2.setToXY(this.visualContent[index].getXY()[0], this.visualContent[index].getXY()[1]);

        stage0.add(tempElement, stage0coordsSetTempElement, new MoveNoFade());
        stage0.add(headValue, stage0coordsSet2, new MoveNoFade());

        animationSequencer.add(stage0);

        animationSequencer.go();
    }
    moveOutOfDatastructure(outElement, index){
        this.visualContent[index].updateElementValue(); // Get the current visualValue from physical datastructure
        //this.visualContent[index].update();
        this.visualContent[index].setIndex(index); // Update index
        //this.visualContent[index].setOldMiddleXY(leftMargin, canvas.height - topBottomMargin);

        console.log("outElement value:" + outElement);
        console.log("outElement index:" + index);

        let stage0 = new AnimationSequence();

        let poppedElement = new VisualValue(outElement);

        stage0.addTempObject(poppedElement);

        let stage0coordsSetPoppedElement = new CoordsSet();
        stage0coordsSetPoppedElement.setFromXY(this.visualContent[index].getXY()[0], this.visualContent[index].getXY()[1]);
        stage0coordsSetPoppedElement.setToXY(canvas.width - leftMargin, canvas.height-topBottomMargin);

        stage0.add(poppedElement, stage0coordsSetPoppedElement, new MoveFadeOut());

        animationSequencer.add(stage0);

        animationSequencer.go();
    }
    expand(){
        this.size = this.size*2;
        for (let i=this.size/2; i<this.size; i++){
            this.visualContent[i] = new ArrayElementController(null, this.showIndex);
            this.visualContent[i].setXY(leftMargin + elementBoxWidth + (elementBoxWidth*i), this.elementBoxY+(elementBoxHeight/2));
            this.visualContent[i].setIndex(i);
        }
    }
    draw() {
        //clearCanvas();
        for (let i=0; i<this.datastructure.size; i++){
            this.visualContent[i].draw();
        }
    }
}

class HeapArrayController extends SimpleArrayController{
    constructor(datastructure, elementBoxY=topBottomMargin+elementBoxHeight, showIndex=false){
        super(datastructure, elementBoxY, showIndex);
        this.originalSize = datastructure.size;
        this.visualTreeContent = [];
        this.treeNodeRadius = 20;

        for (let i=0; i<this.datastructure.size; i++){
            this.visualContent[i] = new VisualArrayElement(this.datastructure.getElement(i), i, this.showIndex);
            this.visualContent[i].setXY(leftMargin + (elementBoxWidth/2) + (elementBoxWidth*i), this.elementBoxY+(elementBoxHeight/2));
            this.visualContent[i].setStaticMiddleXY(leftMargin + (elementBoxWidth/2) + (elementBoxWidth*i), this.elementBoxY+(elementBoxHeight/2));

            this.visualTreeContent[i] = new VisualTreeNode(this.datastructure.getElement(i), this.treeNodeRadius);
            //this.visualContent[i].setIndex(i);
            //this.visualContent[i].moveIntoVisualDatastructure();
        }
    }
    moveIntoVisualDatastructure(element){
        if (this.originalSize < this.datastructure.size){
            for (let i=this.originalSize; i<this.datastructure.size; i++){
                console.log(i);
                this.visualContent[i] = new VisualArrayElement(this.datastructure.getElement(i), i, this.showIndex);
                this.visualContent[i].setXY(leftMargin + (elementBoxWidth/2) + (elementBoxWidth*i), this.elementBoxY+(elementBoxHeight/2));
                this.visualContent[i].setStaticMiddleXY(leftMargin + (elementBoxWidth/2) + (elementBoxWidth*i), this.elementBoxY+(elementBoxHeight/2));

                this.visualTreeContent[i] = new VisualArrayElement(this.datastructure.getElement(i), this.treeNodeRadius);
            }
            this.originalSize = this.datastructure.size;
            this.draw();
        }
        this.updateTreeNodeCoords();
        super.moveIntoVisualDatastructure(element);

    }
    updateTreeNodeCoords(){
        let numLevels = Math.floor(Math.log2(this.datastructure.size));

        let radiusOfNode = 20;
        let gapUnit = radiusOfNode;
        let nodeXSpacingFactor = 0;
        let nodeYSpacingFactor = 0;

        let totalExtraGap = (Math.pow(2, numLevels)*nodeXSpacingFactor);
        let unitsToStart = (Math.pow(2, numLevels)) + totalExtraGap;

        for (let i=0; i<this.visualTreeContent.length; i++){
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
            y += (currLevel * (radiusOfNode*2)) + (radiusOfNode*nodeYSpacingFactor);

            console.log("HELLO");

            this.visualTreeContent[i].setXY(x, y);
        }
    }
    draw() {
        for (let i=0; i<this.datastructure.size; i++){
            this.visualContent[i].draw();
            //ctx.fillRect(this.visualTreeContent[i].getXY()[0], this.visualTreeContent[i].getXY()[1],20,20);
            this.visualTreeContent[i].draw();
        }

        super.draw();
/*        let radiusOfNode = 20;
        let gapUnit = radiusOfNode;
        let nodeXSpacingFactor = 0;
        let nodeYSpacingFactor = 0;

        let numLevels = Math.floor(Math.log2(this.datastructure.size));
        let totalExtraGap = (Math.pow(2, numLevels)*nodeXSpacingFactor);
        let unitsToStart = (Math.pow(2, numLevels)) + totalExtraGap;

        console.log("numLevels: " + numLevels);

        let startingX = canvas.width / 2 - (unitsToStart * radiusOfNode);
        let startingY = (canvas.height / 2);
        ctx.fillRect(startingX,startingY,1,1);
        let currX = 0;
        let currY = startingY;
        let currNodeIndex = 0;
        for (let i = 0; i <= numLevels; i++) {
            let reverseCurrLevel = (numLevels + 1) - i;
            let currLevelExtraNodeGap = (Math.pow(2, reverseCurrLevel)*nodeXSpacingFactor);
            let distanceBetweenNodes = (Math.pow(2, reverseCurrLevel)-1)+currLevelExtraNodeGap;
            let distanceFromLeftToFirstNode = ((Math.pow(2, reverseCurrLevel-1)-1))+(currLevelExtraNodeGap/2);
            let numOnThisLevel = Math.pow(2, i);
            console.log("currLevel: " + i);
            console.log("reverseCurrLevel: " + reverseCurrLevel);
            console.log("distanceFromLeftToFirstNode: " + distanceFromLeftToFirstNode);
            console.log("distanceBetweenNodes: " + distanceBetweenNodes);

            currX = startingX + (distanceFromLeftToFirstNode * radiusOfNode) + radiusOfNode;
            currY = currY + (radiusOfNode*2) + (radiusOfNode*nodeYSpacingFactor);

            for (let j = 0; j < numOnThisLevel; j++) {
                if (currNodeIndex >= this.datastructure.numElements) { break; }
                if (this.datastructure.content[currNodeIndex].getValue() != null){
                    ctx.beginPath();
                    ctx.arc(currX, currY, radiusOfNode, 0, 2 * Math.PI);
                    ctx.stroke();
                    ctx.fillText(this.datastructure.content[currNodeIndex].getValue(), currX, currY);
                }

                currNodeIndex = currNodeIndex + 1;
                currX = currX + radiusOfNode + (distanceBetweenNodes * radiusOfNode);
            }
        }*/
    }
}

class CircularArrayController extends SimpleArrayController{
    constructor(datastructure, elementBoxY=topBottomMargin+elementBoxHeight, showIndex=false){
        super(datastructure, elementBoxY, showIndex);
        this.headArrow = new VisualArrow();
        this.headArrow.setLabelText("head / tail");
        this.headArrow.setStartXY(this.visualContent[0].getXY()[0], elementBoxLabelY);
        this.headArrow.setEndXY(this.visualContent[0].getXY()[0], this.visualContent[0].getXY()[1]-elementBoxHeight/2);

        this.tailArrow = new VisualArrow();
        this.tailArrow.setStartXY(this.visualContent[0].getXY()[0], elementBoxLabelY);
        this.tailArrow.setEndXY(this.visualContent[0].getXY()[0], this.visualContent[0].getXY()[1]-elementBoxHeight/2);

        this.headArrow.draw();

    }
    moveIntoVisualDatastructure(element){
        super.moveIntoVisualDatastructure(element);
        // Setup for animation stage
        let stage0 = new AnimationSequence();

        let tailArrowCoordSetStart = new CoordsSet();
        tailArrowCoordSetStart.setFromXY(this.tailArrow.startXY[0], this.tailArrow.startXY[1]);
        tailArrowCoordSetStart.setToXY(this.visualContent[this.datastructure.tail].getXY()[0], this.tailArrow.startXY[1]);

        let tailArrowCoordSetEnd = new CoordsSet();
        tailArrowCoordSetEnd.setFromXY(this.tailArrow.endXY[0], this.tailArrow.endXY[1]);
        tailArrowCoordSetEnd.setToXY(this.visualContent[this.datastructure.tail].getXY()[0], this.tailArrow.endXY[1]);

        stage0.add(this.tailLabel, tailArrowCoordSetStart, new MoveNoFade());
        stage0.add(this.tailArrow, tailArrowCoordSetEnd, new MoveNoFade());

        let headElement = this.visualContent[this.datastructure.head];
        let tailElement = this.visualContent[this.datastructure.tail];

        this.headArrow.setStartXY(headElement.getXY()[0], elementBoxLabelY);
        this.headArrow.setEndXY(headElement.getXY()[0], headElement.getXY()[1]-elementBoxHeight/2);

        this.headArrow.setLabelText("head");
        this.tailArrow.setLabelText("tail");
        this.tailArrow.setStartXY(tailElement.getXY()[0], elementBoxLabelY);
        this.tailArrow.setEndXY(tailElement.getXY()[0], tailElement.getXY()[1]-elementBoxHeight/2);


        //animationSequencer.add(stage0);

        //animationSequencer.go();
    }
    moveOutOfDatastructure(outElement, index){
        super.moveOutOfDatastructure(outElement, index);

        let headElement = this.visualContent[this.datastructure.head];

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

        this.visualValueBox = new VisualElementBox();
        this.visualNextBox = new VisualElementBox();
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
        this.visualValueBox.setXY(this.getXY()[0]-(elementBoxWidth/2), this.getXY()[1]);
        this.visualValue.setXY(this.getXY()[0]-(elementBoxWidth/2), this.getXY()[1]);
        this.visualNextBox.setXY(this.getXY()[0]+(elementBoxWidth/2), this.getXY()[1]);
        this.visualNext.setXY(this.getXY()[0]+(elementBoxWidth/2), this.getXY()[1]);
    }
    updateMiddleXY(x, y, progress){
        super.updateMiddleXY(x, y, progress);

        // Only update the coords of element visual tempObjects IF they are being animated
        // This allows us to control which visual tempObjects of the element are animated and which are not
        if(this.visualValueBox.isBeingAnimated() || this.isBeingAnimated()){
            this.visualValueBox.updateMiddleXY(x-(elementBoxWidth/2), y, progress);
        }
        if(this.visualNextBox.isBeingAnimated() || this.isBeingAnimated()){
            this.visualNextBox.updateMiddleXY(x+(elementBoxWidth/2), y, progress);
        }
        if (this.visualValue.isBeingAnimated() || this.isBeingAnimated()){
            this.visualValue.updateMiddleXY(x-(elementBoxWidth/2), y, progress);
        }
        if (this.visualNext.isBeingAnimated() || this.isBeingAnimated()){
            this.visualNext.updateMiddleXY(x+(elementBoxWidth/2), y, progress);
        }

        this.setIncomingArrowsXY(x, y);
    }
    isOnTopOf(otherNode){
        return (this.xy[1] === otherNode.getXY()[1]) && (this.xy[1] === otherNode.xy[1]);
    }
    setIncomingArrowsXY(x, y){
        for (let i=0; i<this.incomingArrows.length; i++){
            console.log("Hello there");
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

        this.visualElementBox = new VisualElementBox();
        this.visualValue = new VisualValue("null");
        this.visualIndexNum = new VisualValue(indexNum);

        this.visualObjects.push(this.visualElementBox);
        this.visualObjects.push(this.visualValue);
        this.visualObjects.push(this.visualIndexNum);

        //this.updateMiddleXY();
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