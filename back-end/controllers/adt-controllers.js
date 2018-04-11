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
            this.datastructureController.moveIntoVisualDatastructure(enqueuedElement);
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