class SimpleArrayStackController{
    constructor(adt, datastructureController){
        this.adt = adt;
        this.datastructureController = datastructureController;
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
            let poppedElementValue = poppedElement.value;
            let poppedIndex = poppedElement.index;

            outputLabel.innerText = "Pop " + poppedElementValue;
            this.datastructureController.moveOutofArray(poppedElementValue, poppedIndex);
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

class SinglyLinkedListController{
    constructor(datastructure, elementBoxY=topBottomMargin+90, showIndex=false){
        this.datastructure = datastructure;

        this.elementBoxY = elementBoxY;

        this.head = new VisualLinkedListElement(datastructure.head);
        this.head.setOldMiddleXY(leftMargin + elementBoxWidth, topBottomMargin);
        this.head.setStaticMiddleXY(this.head.oldMiddleX, this.elementBoxY+(elementBoxHeight/2));

/*        this.head.oldMiddleX = leftMargin;
        this.head.oldMiddleY = canvas.height - topBottomMargin;
        this.head.middleX = leftMargin;
        this.head.middleY = elementBoxY;*/

        this.tail = this.head;
        this.draw();

        //canvasObjectMan.addTempObject(this);
    }
    moveIntoVisualDatastructure(element){
/*        if (this.head == null) {
            node.setNext(null);
            this.head = node;
            this.tail = node;
        } else {
            node.setNext(this.head);
            this.head = node;
        }*/



        let newNode = new VisualLinkedListElement(element);

        // When inserting, we only want to see the actual visualValue animated!
        //newNode.visualValue.isBeingAnimated = true;
        //newNode.visualElementBoxValue.isBeingAnimated = true;
        newNode.visualValue.fade = "in";
        //newNode.isBeingAnimated = true;

        // This exchanging of coordinates is like setting the head to the new node: "="
        newNode.oldMiddleX = leftMargin + elementBoxWidth;
        newNode.oldMiddleY = canvas.height - topBottomMargin;

        newNode.setStaticMiddleXY(leftMargin + elementBoxWidth, this.elementBoxY+(elementBoxHeight/2));

        if (this.head.physicalElement == null){
            newNode.setNext(null);
            this.head = newNode;
            this.tail = newNode;
        }else{
            newNode.setNext(this.head);
            this.head = newNode;
        }

        this.shiftNodes("right");

        this.head.updateElementValue();
        this.head.setIsMoving(true);
        let sequencePush = new AnimationSequence();
        sequencePush.add(this.head);

        console.log("Add send");
        console.log("THE SEQUENCE: ");
        console.log(sequencePush);
        animationSequencer.add(sequencePush);
        animationSequencer.go();
        //this.head.moveIntoVisualDatastructure();


/*        bob.setNext(this.head);



        bob.setNext(this.head);
        this.head = bob;*/

        //this.head.physicalElement = element;
        //this.head.updateElementValue();

        //this.content[index].updateElementValue(); // Get the current visualValue from physical datastructure
        //this.content[index].update();
        //this.content[index].setIndex(index); // Update index

        //canvasObjectMan.addTempObject(tempInValue);
        //canvasObjectMan.tempObjects.push(tempInValue);
        //mrAnimator(bob);

        //this.head.setOldMiddleXY(leftMargin, canvas.height - topBottomMargin);
        //this.content[index].setOldMiddleXY(leftMargin, canvas.height - topBottomMargin);
        //this.head.moveVisualValueIntoArray();

        //this.content[index].moveVisualValueIntoArray();
    }
    find(element){
        let cur = this.head;
        while (cur.getValue() !== element) {
            cur = cur.getNext();
        }
        return cur;
    }
    addFirst(node) {
        this.shiftNodes("right");

        if (this.head == null) {
            node.setNext(null);
            this.head = node;
            this.tail = node;
        } else {
            node.setNext(this.head);
            this.head = node;
        }
        //node.setMiddleXY(leftMargin+elementBoxWidth+(elementBoxWidth*3*this.numElements), this.elementBoxY+(elementBoxHeight/2));
        node.setMiddleXY(leftMargin+elementBoxWidth, this.elementBoxY+(elementBoxHeight/2));
        node.setIndex(this.numElements);
        this.numElements++;

        this.draw();
    }
    getFirst(){
        return this.head.getValue();
    }
    removeFirst(){
        let first = this.head;
        this.head = first.getNext();

        this.numElements = this.numElements-1;

        this.shiftNodes("left");

        this.draw();

        return first.getValue();
    }
    addLast(node){

    }
    removeLast(){

    }
    removeNext(){

    }
    getSize(){
        return this.numElements;
    }
    isEmpty(){
        return this.numElements === 0;
    }
    shiftNodes(direction){
        //let curr = this.head;

        if (this.datastructure.numElements===1){
            return;
        }

        let prev = this.head;
        let curr = this.head.getNext();
        let reversedNodes = [];

        //let sequence = new AnimationSequence();
        let sequence = new AnimationSequence();

        while (curr!==null){
            curr.setOldMiddleXY(curr.staticMiddleX, curr.staticMiddleY);
            if (direction === "right"){
                curr.setStaticMiddleXY(curr.staticMiddleX+(3*elementBoxWidth), curr.staticMiddleY);
            }else{
                curr.setStaticMiddleXY(curr.staticMiddleX-(3*elementBoxWidth), curr.staticMiddleY);
            }
            curr.setIsMoving(true);
            sequence.add(curr);
            sequence.doNotDraw(this.head);
            sequence.executeConcurrently = true;

            //console.log("Current coords: " + curr.middleX + " " + curr.middleY);
            //elementContainer.setMiddleXY(curr.middleX, curr.middleY);
            //elementContainer.addObject(curr);

/*            curr.setIsMoving(true);
            let bob = new AnimationSequence();
            bob.doNotDraw(prev);
            bob.addTempObject(curr);
            animationSequencer.addTempObject(bob);*/
            //reversedNodes.push(curr);
            //bob = null;
            //curr.setOldMiddleXY(prev.middleX, prev.middleY);
            //animationSequencer.animationQueue.push(curr);
            //animationSequencer.addTempObject(curr);
            //reversedNodes.push(curr);
            prev = curr;
            curr = curr.getNext();
        }


        console.log(reversedNodes);

        //reversedNodes = reversedNodes.reverse();


/*        for (let i=0; i<reversedNodes.length; i++){
            reversedNodes[i].setOldMiddleXY(reversedNodes[i].middleX, reversedNodes[i].middleY);
            console.log("oldMiddleX: " + reversedNodes[i].middleX);
            console.log("oldMiddleY: " + reversedNodes[i].middleY);
            //reversedNodes[i].setMiddleXY(reversedNodes[i].middleX+(3*elementBoxWidth), reversedNodes[i].middleY);

            reversedNodes[i].staticMiddleX = reversedNodes[i].middleX+(3*elementBoxWidth);
            reversedNodes[i].staticMiddleY = reversedNodes[i].middleY;
            console.log("middleX: " + (reversedNodes[i].middleX+(3*elementBoxWidth)));
            console.log("middleY: " + reversedNodes[i].middleY);
            reversedNodes[i].setIsMoving(true);
/!*            let bob = new AnimationSequence();
            bob.addTempObject(reversedNodes[i]);
            bob.doNotDraw(this.head);
            console.log("reverseNodes length: " + reversedNodes.length);
            for (let b = reversedNodes.length-1; b>i; b--){
                bob.doNotDraw(reversedNodes[b]);
            }*!/
            sequence.add(reversedNodes[i]);
            sequence.doNotDraw(this.head);
            sequence.executeConcurrently = true;
            //animationSequencer.addTempObject(bob);

        }*/
        animationSequencer.add(sequence);
        //sequence.doNotDraw(this.head);
        //console.log("Add send");
        //console.log("THE SEQUENCE: ");
        //console.log(sequence);
        //sequence.setExecuteLastFirst();
        //animationSequencer.addTempObject(sequence);
    }
    draw(){
        clearCanvas();

        if(this.datastructure.isEmpty()){
            /*            let dummy = new SinglyLinkedListNode(null, null);
                        dummy.setMiddleXY(leftMargin, elementBoxY);
                        dummy.setIndex(0);
                        dummy.draw();*/
            drawLabelledArrow("head / tail", 5, this.head.staticMiddleX, elementBoxLabelY, leftMargin+elementBoxWidth, this.elementBoxY-10);
            return;
        }

        let arrowEndY = 0;

        if (this.head.staticMiddleY !== this.head.middleY){
            arrowEndY = this.elementBoxY-10;
        }else{
            arrowEndY = this.head.middleY-(elementBoxHeight/2)-10;
        }


        if (this.head.isOnTopOf(this.tail)){
            /*            let dummy = new SinglyLinkedListNode(null, null);
                        dummy.setMiddleXY(leftMargin, elementBoxY);
                        dummy.setIndex(0);*/
            drawLabelledArrow("head / tail", 5, this.head.staticMiddleX, elementBoxLabelY, this.head.staticMiddleX, arrowEndY);
            //head.draw();
        }else{
            drawLabelledArrow("head", 5, this.head.staticMiddleX, elementBoxLabelY, this.head.staticMiddleX, arrowEndY);
            drawLabelledArrow("tail", 5, this.tail.middleX, elementBoxLabelY, this.tail.middleX, this.tail.middleY-(elementBoxHeight/2)-10);
        }

        /*        ctx.strokeRect(50, 50, 50, 50);
                ctx.fillText("head", 75, 125);*/

        let cur = this.head;
        while(cur!=null){

            cur.draw();

            /*            ctx.strokeRect(50+(50*count), 50, 50, 50);
                        ctx.fillText(cur.getValue(), (50+(50*count))+25, 75);*/
            //ctx.fillText(count, (50+(50*count))+25, 125);

            cur = cur.getNext();
            /*count++;*/
        }
        /*        ctx.strokeRect(50+(50*(count)), 50, 50, 50);
                ctx.fillText("tail", (50+(50*(count)))+25, 75);*/
    }
}

class SimpleArrayController{
    constructor(datastructure, elementBoxY=topBottomMargin+elementBoxHeight, showIndex=false){
        this.datastructure = datastructure;

        this.elementBoxY = elementBoxY;
        this.showIndex = showIndex;
        this.content = [];

        //canvasObjectMan.addTempObject(this);

        for (let i=0; i<datastructure.size; i++){
            this.content[i] = new VisualArrayElement(datastructure.getElement(i), i, this.showIndex);
            this.content[i].setMiddleXY(leftMargin + (elementBoxWidth/2) + (elementBoxWidth*i), this.elementBoxY+(elementBoxHeight/2));
            this.content[i].setStaticMiddleXY(leftMargin + (elementBoxWidth/2) + (elementBoxWidth*i), this.elementBoxY+(elementBoxHeight/2));
            //this.content[i].setIndex(i);
            //this.content[i].moveIntoVisualDatastructure();
            this.content[i].draw();
        }
    }
    moveIntoVisualDatastructure(element){
        let index = element.index;
        this.content[index].updateElementValue(); // Get the current visualValue from physical datastructure
        //this.content[index].update();
        this.content[index].setIndex(index); // Update index

        let tempInValue = new VisualValue("null");
        tempInValue.oldMiddleX = this.content[index].middleX;
        tempInValue.oldMiddleY = this.content[index].middleY;
        tempInValue.middleX = this.content[index].middleX;
        tempInValue.middleY = this.content[index].middleY;
        //canvasObjectMan.tempObjects.push(tempInValue);
        canvasFOMan.addTempObject(tempInValue);

        //mrAnimator(tempInValue);

        this.content[index].setOldMiddleXY(leftMargin + (elementBoxWidth/2), canvas.height - topBottomMargin);
        this.content[index].visualValue.isBeingAnimated = true;
        this.content[index].visualValue.animationProperties.isMoving = true;
        //console.log(this.content[index].visualValue);
        let sequence = new AnimationSequence();
        sequence.add(this.content[index].visualValue);
        animationSequencer.add(sequence);
        animationSequencer.go();

        //4this.content[index].moveIntoVisualDatastructure();
    }
    moveOutofArray(outValue, index){
        this.content[index].updateElementValue(); // Get the current visualValue from physical datastructure
        //this.content[index].update();
        this.content[index].setIndex(index); // Update index
        //this.content[index].setOldMiddleXY(leftMargin, canvas.height - topBottomMargin);

        //this.content[index].moveVisualValueIntoArray();
        console.log("outValue: " + outValue);
        let tempOutValue = new VisualValue(outValue);
        tempOutValue.setOldMiddleXY(this.content[index].middleX, this.content[index].middleY);
        tempOutValue.setStaticMiddleXY(canvas.width - leftMargin, canvas.height-topBottomMargin);
        //canvasObjectMan.addTempObject(tempOutValue);
        tempOutValue.setIsMoving(true);
        canvasFOMan.addTempObject(tempOutValue);

        animationSequencer.add(tempOutValue);
        animationSequencer.go();
        //mrAnimator(tempOutValue);

    }
    expand(){
        this.size = this.size*2;
        for (let i=this.size/2; i<this.size; i++){
            this.content[i] = new ArrayElementController(null, this.showIndex);
            this.content[i].setMiddleXY(leftMargin + elementBoxWidth + (elementBoxWidth*i), this.elementBoxY+(elementBoxHeight/2));
            this.content[i].setIndex(i);
        }
    }
    draw() {
        //clearCanvas();
        for (let i=0; i<this.datastructure.size; i++){
            this.content[i].draw();
        }
    }
}

class VisualLinkedListElement extends VisualObject{
    constructor(physicalElement){
        super();
        this.physicalElement = physicalElement;
        this.nextVisualElement = null;
/*        this.oldMiddleX = 0;
        this.oldMiddleY = 0;
        this.middleX = 0;
        this.middleY = 0;
        this.staticMiddleX = 0;
        this.staticMiddleY = 0;
        this.isBeingAnimated = false;*/
        this.visualValueBox = new VisualElementBox(this.oldMiddleX, this.oldMiddleY, this.middleX, this.middleY-(elementBoxHeight/2));
        this.visualNextBox = new VisualElementBox(this.oldMiddleX, this.oldMiddleY, this.middleX-elementBoxWidth, this.middleY-(elementBoxHeight/2));
        this.visualNextBox.crossedThrough = true;
        this.visualValue = new VisualValue("");
        this.visualNext = new VisualValue("next");

        this.visualObjects.push(this.visualValueBox);
        this.visualObjects.push(this.visualNextBox);
        this.visualObjects.push(this.visualValue);
        this.visualObjects.push(this.visualNext);

/*        this.visualElementBoxValue = new VisualElementBox(this.oldMiddleX, this.oldMiddleY, this.middleX, this.middleY-(elementBoxHeight/2));

        this.visualElementBoxNext = new VisualElementBox(this.oldMiddleX, this.oldMiddleY, this.middleX-elementBoxWidth, this.middleY-(elementBoxHeight/2));
        this.visualElementBoxNext.crossedThrough = true;

        this.visualValue = new VisualValue("");

        this.visualNext = new VisualValue("visualNext");*/

        // Give visual components their coordinates
        //this.setAllXY();

    }
    setNext(nextVisualElement){
        this.nextVisualElement = nextVisualElement;

        this.visualNext.crossedThrough = this.nextVisualElement == null;
    }
    getNext(){
        return this.nextVisualElement;
    }
    updateElementValue(){
        this.visualValue.value = this.physicalElement.getValue();
    }
    setIndex(index){
        this.indexNum = index;
    }
    setMiddleXY(x, y){
        super.setMiddleXY(x, y);
/*        this.middleX = x;
        this.middleY = y;
        this.staticMiddleX = x;
        this.staticMiddleY = y;*/
        this.setAllXY();

        //mrAnimator(this);
    }
/*    setOldMiddleXY(x, y){
        this.oldMiddleX = x;
        this.oldMiddleY = y;
        this.setAllOldXY();
    }*/
    setAllXY(){
        this.visualValueBox.setMiddleXY(this.middleX-(elementBoxWidth/2), this.middleY);
        this.visualValue.setMiddleXY(this.middleX-(elementBoxWidth/2), this.middleY);
        this.visualNextBox.setMiddleXY(this.middleX+(elementBoxWidth/2), this.middleY);
        this.visualNext.setMiddleXY(this.middleX+(elementBoxWidth/2), this.middleY);

/*        this.visualElementBoxNext.middleX = this.middleX+(elementBoxWidth/2);
        this.visualElementBoxNext.middleY = this.middleY;
        this.visualValue.middleX = this.middleX-(elementBoxWidth/2);
        this.visualValue.middleY = this.middleY;
        this.visualNext.middleX = this.middleX+(elementBoxWidth/2);
        this.visualNext.middleY = this.middleY;*/
    }
    updateMiddleXY(x, y, progress){
        super.updateMiddleXY(x, y, progress);
/*        this.middleX = x;
        this.middleY = y;*/

        // Only update the coords of element visual tempObjects IF they are being animated
        // This allows us to control which visual tempObjects of the element are animated and which are not
        if(this.visualValueBox.isBeingAnimated || this.isBeingAnimated){
            this.visualValueBox.updateMiddleXY(x-(elementBoxWidth/2), y, progress);
        }
        if(this.visualNextBox.isBeingAnimated || this.isBeingAnimated){
            this.visualNextBox.updateMiddleXY(x+(elementBoxWidth/2), y, progress);
        }

        if (this.visualValue.isBeingAnimated || this.isBeingAnimated){
            this.visualValue.updateMiddleXY(x-(elementBoxWidth/2), y, progress);
        }

        if (this.visualNext.isBeingAnimated || this.isBeingAnimated){
            this.visualNext.updateMiddleXY(x+(elementBoxWidth/2), y, progress);
        }
        //this.update();
    }
 /*   setAllOldXY(){
        this.visualElementBoxValue.oldMiddleX = this.oldMiddleX;
        this.visualElementBoxValue.oldMiddleY = this.oldMiddleY;
        this.visualElementBoxNext.oldMiddleX = this.oldMiddleX;
        this.visualElementBoxNext.oldMiddleY = this.oldMiddleY;
        this.visualValue.oldMiddleX = this.oldMiddleX;
        this.visualValue.oldMiddleY = this.oldMiddleY;
        this.visualNext.oldMiddleX = this.oldMiddleX;
        this.visualNext.oldMiddleY = this.oldMiddleY;

    }*/
/*    moveIntoVisualDatastructure(){
        mrAnimator(this);
    }*/
/*    moveVisualValueIntoArray(){
        mrAnimator(this.visualValue);
    }*/
    isOnTopOf(otherNode){
        return (this.middleX === otherNode.middleX) && (this.middleY === otherNode.middleY);
    }
/*    doAnimationComplete(){
        this.visualElementBoxValue.doAnimationComplete();
        this.visualElementBoxNext.doAnimationComplete();
        this.visualValue.doAnimationComplete();
        this.visualNext.doAnimationComplete();
    }*/
    draw() {
/*        this.visualElementBoxValue.draw();
        this.visualElementBoxNext.draw();
        this.visualValue.draw();
        this.visualNext.draw();*/
        super.draw();
        if(!this.notDrawn && this.nextVisualElement !== null){
            this.visualNextBox.crossedThrough = false;
            drawLabelledArrow("next", 0, this.middleX+(elementBoxWidth/2), this.middleY, this.nextVisualElement.visualValue.middleX-(elementBoxWidth/2), this.nextVisualElement.middleY);
        }
    }
}

class VisualArrayElement{
    constructor(physicalElement, indexNum, showIndex){
        this.physicalElement = physicalElement;
        this.showIndex = showIndex;
        this.oldMiddleX = 0;
        this.oldMiddleY = 0;
        this.middleX = 0;
        this.middleY = 0;
        this.isBeingAnimated = false;

        this.visualElementBox = new VisualElementBox();

        this.visualValue = new VisualValue(this.physicalElement.getValue());

        this.visualIndexNum = new VisualValue(indexNum);

        this.updateMiddleXY();
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

        //mrAnimator(this);
    }
    setMiddleXY(x, y){
        this.middleX = x;
        this.middleY = y;
        this.staticMiddleX =  x;
        this.staticMiddleY = y;
        this.update();

        //mrAnimator(this);
    }
    updateXY(x, y){
        this.middleX = x;
        this.middleY = y;

        // Only update the coords of element visual tempObjects IF they are being animated
        // This allows us to control which visual tempObjects of the element are animated and which are not
        if(this.visualElementBox.isBeingAnimated || this.isBeingAnimated){
            this.visualElementBox.updateMiddleXY(x, y);
        }
        if(this.visualValue.isBeingAnimated || this.isBeingAnimated){
            this.visualValue.updateMiddleXY(x, y);
        }

        if (this.visualIndexNum.isBeingAnimated || this.isBeingAnimated){
            this.visualIndexNum.updateMiddleXY(x, y);
        }
        //this.update();
    }
    update(){
        this.updateMiddleXY();
        this.updateOldMiddleXY();
    }
    updateMiddleXY(){
        this.visualElementBox.middleX = this.middleX;
        this.visualElementBox.middleY = this.middleY;
        this.visualValue.middleX = this.middleX;
        this.visualValue.middleY = this.middleY;
        this.visualIndexNum.middleX = this.middleX;
        this.visualIndexNum.middleY = this.middleY+elementBoxHeight;
    }
    updateOldMiddleXY(){
        this.visualElementBox.oldMiddleX = this.oldMiddleX;
        this.visualElementBox.oldMiddleY = this.oldMiddleY;
        this.visualValue.oldMiddleX = this.oldMiddleX;
        this.visualValue.oldMiddleY = this.oldMiddleY;
        this.visualIndexNum.oldMiddleX = this.oldMiddleX;
        this.visualIndexNum.oldMiddleY = this.oldMiddleY;
    }
    moveIntoVisualDatastructure(){
        mrAnimator(this);
    }
    doAnimationComplete(){
        this.visualElementBox.isBeingAnimated = false;
        this.visualValue.isBeingAnimated = false;
        this.visualIndexNum.isBeingAnimated = false;
    }
    draw(){
        this.visualElementBox.draw();
        this.visualValue.draw();
        if (this.showIndex){
            this.visualIndexNum.draw();
        }
    }
}