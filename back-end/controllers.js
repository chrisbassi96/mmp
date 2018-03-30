function mrAnimator(objectToAnimate){
    //let animationStart = null;
    let currX = objectToAnimate.oldMiddleX;
    let currY = objectToAnimate.oldMiddleY;
    let targetX = objectToAnimate.middleX;
    let targetY = objectToAnimate.middleY;
    let trajectoryAngle = Math.atan2(targetY-currY, targetX-currX);
    let lineLength = Math.hypot(targetX-currX, targetY-currY);
    let lineSegment = lineLength / animationSteps;
    let stopID = 0;
    let progress = 0;

    //canvasObjectMan.add(objectToAnimate);


    //canvasObjectMan.add(adtCopy.dataStructure);
    //canvasObjectMan.remove(adt.dataStructure);
    //adtPainter.setAdt(adtCopy);
    //adtPainter.adt = adtCopy;

    window.requestAnimationFrame(step);

    function step(timestamp){

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        currX = currX + (Math.cos(trajectoryAngle) * lineSegment);
        currY = currY + (Math.sin(trajectoryAngle) * lineSegment);

        objectToAnimate.updateXY(currX, currY, progress);

/*        objectToAnimate.middleX = currX;
        objectToAnimate.middleY = currY;*/

        console.log(objectToAnimate.middleX + " " + objectToAnimate.middleY);

        //adt.dataStructure.draw();
        canvasObjectMan.draw();
        adtController.datastructureController.draw();
        //adtController.datastructureController.draw();

        if (progress!==animationSteps-1) {
            progress += 1;
            stopID = window.requestAnimationFrame(step);
        }else{
            console.log("Finished!");
            objectToAnimate.oldMiddleX = objectToAnimate.middleX;
            objectToAnimate.oldMiddleY = objectToAnimate.middleY;
/*            clearCanvas();
            canvasObjectMan.remove(objectToAnimate);
            canvasObjectMan.remove(adtController.datastructureController);
            canvasObjectMan.add(adtController.datastructureController);
            canvasObjectMan.draw();*/
            clearCanvas();
            canvasObjectMan.remove(objectToAnimate);
            adtController.datastructureController.draw();
            window.cancelAnimationFrame(stopID);
        }
    }
}

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
        this.showIndex = showIndex;

        this.head = new VisualLinkedListElement(datastructure.head);
        this.head.setMiddleXY(leftMargin + elementBoxWidth, this.elementBoxY+(elementBoxHeight/2));
        this.head.draw();
/*        this.head.oldMiddleX = leftMargin;
        this.head.oldMiddleY = canvas.height - topBottomMargin;
        this.head.middleX = leftMargin;
        this.head.middleY = elementBoxY;*/

        this.tail = this.head;

        this.draw();

        //canvasObjectMan.add(this);
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

        this.shiftNodes("right");

        let bob = new VisualLinkedListElement(element);
        bob.oldMiddleX = leftMargin;
        bob.oldMiddleY = canvas.height - topBottomMargin;
        bob.setMiddleXY(leftMargin + elementBoxWidth, this.elementBoxY+(elementBoxHeight/2));

        if (this.head.physicalElement == null){
            bob.setNext(null);
            this.head = bob;
            this.tail = bob;

        }else{
            bob.setNext(this.head);
            this.head = bob;
        }

        bob.updateElementValue();


/*        bob.setNext(this.head);



        bob.setNext(this.head);
        this.head = bob;*/

        //this.head.physicalElement = element;
        //this.head.updateElementValue();

        //this.content[index].updateElementValue(); // Get the current value from physical datastructure
        //this.content[index].update();
        //this.content[index].setIndex(index); // Update index

        //canvasObjectMan.add(tempInValue);
        //canvasObjectMan.objects.push(tempInValue);
        //mrAnimator(bob);

        //this.head.setOldMiddleXY(leftMargin, canvas.height - topBottomMargin);
        //this.content[index].setOldMiddleXY(leftMargin, canvas.height - topBottomMargin);

        this.head.moveVisualValueIntoArray();
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
        let curr = this.head;

        while (curr!=null){
            if (direction === "right"){
                curr.setMiddleXY(curr.middleX+3*elementBoxWidth, curr.middleY);
            }else{
                curr.setMiddleXY(curr.middleX-3*elementBoxWidth, curr.middleY);
            }
            mrAnimator(curr);
            curr = curr.getNext();
        }
    }
    draw(){
        //clearCanvas();

        if(this.datastructure.isEmpty()){
            /*            let dummy = new SinglyLinkedListNode(null, null);
                        dummy.setMiddleXY(leftMargin, elementBoxY);
                        dummy.setIndex(0);
                        dummy.draw();*/
            drawLabelledArrow("head / tail", 5, leftMargin+elementBoxWidth, elementBoxLabelY, leftMargin+elementBoxWidth, this.elementBoxY-10);
            return;
        }

        if (this.head.isOnTopOf(this.tail)){
            /*            let dummy = new SinglyLinkedListNode(null, null);
                        dummy.setMiddleXY(leftMargin, elementBoxY);
                        dummy.setIndex(0);*/
            drawLabelledArrow("head / tail", 5, this.head.middleX, elementBoxLabelY, this.head.middleX, this.head.middleY-(elementBoxHeight/2)-10);
            //head.draw();
        }else{
            drawLabelledArrow("head", 5, this.head.middleX, elementBoxLabelY, this.head.middleX, this.head.middleY-(elementBoxHeight/2)-10);
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

        //canvasObjectMan.add(this);

        for (let i=0; i<datastructure.size; i++){
            this.content[i] = new VisualArrayElement(datastructure.getElement(i), null, i, this.showIndex);
            this.content[i].setMiddleXY(leftMargin + elementBoxWidth + (elementBoxWidth*i), this.elementBoxY+(elementBoxHeight/2));
            this.content[i].setIndex(i);
            this.content[i].moveIntoVisualDatastructure();
        }
    }
    moveIntoVisualDatastructure(element){
        let index = element.index;
        this.content[index].updateElementValue(); // Get the current value from physical datastructure
        //this.content[index].update();
        this.content[index].setIndex(index); // Update index

        let tempInValue = new VisualValue("null");
        tempInValue.oldMiddleX = this.content[index].middleX;
        tempInValue.oldMiddleY = this.content[index].middleY;
        tempInValue.middleX = this.content[index].middleX;
        tempInValue.middleY = this.content[index].middleY;
        //canvasObjectMan.add(tempInValue);
        canvasObjectMan.objects.push(tempInValue);
        mrAnimator(tempInValue);

        this.content[index].setOldMiddleXY(leftMargin, canvas.height - topBottomMargin);

        this.content[index].moveValueIntoVisualDatastructure();
    }
    moveOutofArray(outValue, index){
        this.content[index].updateElementValue(); // Get the current value from physical datastructure
        //this.content[index].update();
        this.content[index].setIndex(index); // Update index
        //this.content[index].setOldMiddleXY(leftMargin, canvas.height - topBottomMargin);

        //this.content[index].moveVisualValueIntoArray();
        let tempOutValue = new VisualValue(outValue);
        tempOutValue.oldMiddleX = this.content[index].middleX;
        tempOutValue.oldMiddleY = this.content[index].middleY;
        tempOutValue.middleX = canvas.width-leftMargin;
        tempOutValue.middleY = canvas.height-topBottomMargin;
        //canvasObjectMan.add(tempOutValue);
        canvasObjectMan.objects.push(tempOutValue);
        mrAnimator(tempOutValue);

    }
    setElementValue(index){
        this.content[index].updateElementValue(); // Get the current value from physical datastructure
        //this.content[index].update();
        this.content[index].setIndex(index); // Update index

        this.content[index].setOldMiddleXY(leftMargin, canvas.height - topBottomMargin);

        this.content[index].moveVisualValueIntoArray();

        //this.draw();
    }
    // Perhaps I should use an if...else... statement here instead, to make it easier to understand?
    getElementValue(index){

        if (index >= 0 && index < this.content.length){

            return this.content[index].getValue();
        }

        // Give some sort of error
    }
    getElement(index){
        return this.content[index];
    }
    getNumElements(){
        return this.numElements;
    }
    getSize(){
        return this.size;
    }
    isEmpty(){
        return this.numElements === 0;
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
            // Draw the box that visualizes the index
            this.content[i].draw();
        }
    }
}

class VisualLinkedListElement{
    constructor(physicalElement){
        this.physicalElement = physicalElement;
        this.nextVisualElement = null;
        this.oldMiddleX = 0;
        this.oldMiddleY = 0;
        this.middleX = 0;
        this.middleY = 0;

        this.visualElementBoxValue = new VisualElementBox(this.oldMiddleX, this.oldMiddleY, this.middleX, this.middleY-(elementBoxHeight/2));

        this.visualElementBoxNext = new VisualElementBox(this.oldMiddleX, this.oldMiddleY, this.middleX-elementBoxWidth, this.middleY-(elementBoxHeight/2));

        this.visualValue = new VisualValue("");

        this.visualNext = new VisualValue("next");

        this.updateMiddleXY();

    }
    setNext(nextVisualElement){
        this.nextVisualElement = nextVisualElement;
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
    setOldMiddleXY(x, y){
        this.oldMiddleX = x;
        this.oldMiddleY = y;
        this.update();

        //mrAnimator(this);
    }
    setMiddleXY(x, y){
        this.middleX = x;
        this.middleY = y;
        this.update();

        //mrAnimator(this);
    }
    updateXY(x, y){
        this.middleX = x;
        this.middleY = y;
        this.update();
    }
    update(){
        this.updateMiddleXY();
        this.updateOldMiddleXY();
    }
    updateMiddleXY(){
        this.visualElementBoxValue.middleX = this.middleX-(elementBoxWidth/2);
        this.visualElementBoxValue.middleY = this.middleY;
        this.visualElementBoxNext.middleX = this.middleX+(elementBoxWidth/2);
        this.visualElementBoxNext.middleY = this.middleY;
        this.visualValue.middleX = this.middleX-(elementBoxWidth/2);
        this.visualValue.middleY = this.middleY;
        this.visualNext.middleX = this.middleX+(elementBoxWidth/2);
        this.visualNext.middleY = this.middleY;
    }
    updateOldMiddleXY(){
        this.visualElementBoxValue.oldMiddleX = this.oldMiddleX;
        this.visualElementBoxValue.oldMiddleY = this.oldMiddleY;
        this.visualElementBoxNext.oldMiddleX = this.oldMiddleX;
        this.visualElementBoxNext.oldMiddleY = this.oldMiddleY;
        this.visualValue.oldMiddleX = this.oldMiddleX;
        this.visualValue.oldMiddleY = this.oldMiddleY;

    }
    moveIntoVisualDatastructure(){
        mrAnimator(this);
    }
    moveVisualValueIntoArray(){
        mrAnimator(this.visualValue);
    }
    isOnTopOf(otherNode){
        return (this.middleX === otherNode.middleX) && (this.middleY === otherNode.middleY);
    }
    draw(){
        this.visualElementBoxValue.draw();
        this.visualElementBoxNext.draw();
        this.visualValue.draw();
    }
}

class VisualArrayElement{
    constructor(arrayElement, components, indexNum, showIndex){
        this.arrayElement = arrayElement;
        this.indexNum = indexNum;
        this.showIndex = showIndex;
        this.oldMiddleX = 0;
        this.oldMiddleY = 0;
        this.middleX = 0;
        this.middleY = 0;

        this.visualElementBox = new VisualElementBox();

        this.visualValue = new VisualValue(this.arrayElement.getValue());

        this.visualIndexNum = new VisualValue(indexNum);

        this.updateMiddleXY();
    }
    updateElementValue(){
        this.visualValue.value = this.arrayElement.getValue();
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
        this.update();

        //mrAnimator(this);
    }
    updateXY(x, y){
        this.middleX = x;
        this.middleY = y;
        this.update();
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
    moveIntoDatastructure(){
        mrAnimator(this);
    }
    moveValueIntoVisualDatastructure(){
        mrAnimator(this.visualValue);
    }
    draw(){
        this.visualElementBox.draw();
        this.visualValue.draw();
        if (this.showIndex){
            this.visualIndexNum.draw();
        }

    }
}