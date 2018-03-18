class Node{
    constructor(){
        this.element = null;
    }
    getElement(){
        return this.element;
    }
    setElemeent(newElement){
        this.element = newElement;
    }
}

class BTNode extends Node{
    constructor(){
        super();
        this.parent = new Node();
        this.left = new Node();
        this.right = new Node();
    }
    getParent(){
        return this.parent;
    }
    getLeft(){
        return this.left;
    }
    getRight(){
        return this.right;
    }
}

class SinglyLinkedListNode extends Node{
    constructor(element, next){
        super();
        this.element = element;
        this.next = next;
        this.middleX = 0;
        this.middleY = 0;
    }
    getElement(){
        return this.element;
    }
    setElement(element){
        this.element = element;
    }
    equals(otherNode){
        return (this.middleX === otherNode.getX()) && (this.middleY === otherNode.getY());
    }
    setXY(x, y){
        this.middleX = x;
        this.middleY = y;
    }
    getX(){
        return this.middleX;
    }
    getY(){
        return this.middleY;
    }
    setIndex(index){
        this.index = index;
    }
    draw(){
        // Draw the box for "next"
        ctx.strokeRect(this.middleX, this.middleY-(elementBoxHeight/2), elementBoxWidth, elementBoxHeight);
        // Draw the actual box
        ctx.strokeRect(this.middleX-elementBoxWidth, this.middleY-(elementBoxHeight/2), elementBoxWidth, elementBoxHeight);

        if (this.element==null){
            // Draw a slanted line to indicate no object referenced
            ctx.beginPath();
            ctx.moveTo(this.middleX, this.middleY + (elementBoxHeight/2));
            ctx.lineTo(this.middleX + elementBoxWidth, this.middleY - (elementBoxHeight/2));
            ctx.closePath();
            ctx.stroke();
        }else {
            // Draw the "next"
            //ctx.fillText("next", this.middleX+(elementBoxWidth/2), this.middleY);
            // Draw the actual value
            ctx.fillText(this.element, this.middleX-(elementBoxWidth/2), this.middleY);

            if (this.next==null){
                ctx.fillText("next", this.middleX+(elementBoxWidth/2), this.middleY);
                // Draw slanted line within box to indicate no object referenced
                ctx.beginPath();
                ctx.moveTo(this.middleX + elementBoxWidth, this.middleY + (elementBoxHeight/2)); // Margin of 5 pixels
                ctx.lineTo(this.middleX, this.middleY - (elementBoxHeight/2));
                ctx.closePath();
                ctx.stroke();
            }else{
                drawLabelledArrow("next", 0, this.middleX+(elementBoxWidth/2), this.middleY, this.middleX+(elementBoxWidth*2), this.middleY);
            }

        }

    }
    getNext(){
        return this.next;
    }
    setNext(newNext){
        this.next = newNext;
    }
}

class DoublyLinkedListNode extends Node{
    constructor(){
        super();
        this.next = null;
        this.prev = null;
    }
    equals(otherNode){
        return (this.middleX === otherNode.getX()) && (this.middleY === otherNode.getY());
    }
    setXY(x, y){
        this.middleX = x;
        this.middleY = y;
    }
    getX(){
        return this.middleX;
    }
    getY(){
        return this.middleY;
    }
    setIndex(index){
        this.index = index;
    }
    draw(){
        // Draw the actual box
        ctx.strokeRect(this.middleX-elementBoxWidth, this.middleY-(elementBoxHeight/2), elementBoxWidth, elementBoxHeight);
        // Draw the box for "next"
        ctx.strokeRect(this.middleX, this.middleY-(elementBoxHeight/2), elementBoxWidth, elementBoxHeight);

        if (this.element==null){
            // Draw a slanted line to indicate no object referenced
            ctx.beginPath();
            ctx.moveTo(this.middleX - (elementBoxWidth/2), this.middleY + (elementBoxHeight/2)); // Margin of 5 pixels
            ctx.lineTo(this.middleX + (elementBoxWidth/2), this.middleY - (elementBoxHeight/2));
            ctx.closePath();
            ctx.stroke();
        }else {
            // Draw the actual value
            ctx.fillText(this.element, this.middleX-(elementBoxWidth/2), this.middleY);
            // Draw the "next"
            ctx.fillText("next", this.middleX+(elementBoxWidth/2), this.middleY);
            drawLabelledArrow("next", 0, this.middleX+(elementBoxWidth/2), this.middleY, this.middleX+(elementBoxWidth*2), this.middleY);
        }

    }
    getNext(){
        return this.next;
    }
    setNext(newNext){
        this.next = newNext;
    }
    getPrev(){
        return this.prev;
    }
    setPrev(newPrev){
        this.prev = newPrev;
    }
}

class SinglyLinkedList{
    constructor(){
/*        this.head = new SinglyLinkedListNode(null, null);
        this.tail = this.head;
        this.head.setXY(leftMargin, elementBoxY);
        this.head.setIndex(0);*/
        this.head = null;
        this.tail = null;
        this.numElements = 0;
        this.elementBoxY = topMargin+90;
        this.draw();
    }
    find(element){
        let cur = this.head;
        while (cur.getElementValue() !== element) {
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
        //node.setXY(leftMargin+elementBoxWidth+(elementBoxWidth*3*this.numElements), this.elementBoxY+(elementBoxHeight/2));
        node.setXY(leftMargin+elementBoxWidth, this.elementBoxY+(elementBoxHeight/2));
        node.setIndex(this.numElements);
        this.numElements++;

        this.draw();
    }
    getFirst(){
        return this.head.getElementValue();
    }
    removeFirst(){
        let first = this.head;
        this.head = first.getNext();
        outputLabel.innerText = first.getElement();
        this.numElements = this.numElements-1;

        this.shiftNodes("left");

        this.draw();
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
                curr.setXY(curr.getX()+3*elementBoxWidth, curr.getY());
            }else{
                curr.setXY(curr.getX()-3*elementBoxWidth, curr.getY());
            }
            curr = curr.getNext();
        }
    }
    draw(){
        clearCanvas();

        // If the thing is empty, draw an empty element with head/tail arrow

        // If not empty,

        if(this.isEmpty()){
/*            let dummy = new SinglyLinkedListNode(null, null);
            dummy.setXY(leftMargin, elementBoxY);
            dummy.setIndex(0);
            dummy.draw();*/
            drawLabelledArrow("head / tail", 5, leftMargin+elementBoxWidth, elementBoxLabelY, leftMargin+elementBoxWidth, this.elementBoxY-10);
            return;
        }

        if (this.head.equals(this.tail)){
            /*            let dummy = new SinglyLinkedListNode(null, null);
                        dummy.setXY(leftMargin, elementBoxY);
                        dummy.setIndex(0);*/
            drawLabelledArrow("head/tail", 5, this.head.getX(), elementBoxLabelY, this.head.getX(), this.head.getY()-(elementBoxHeight/2)-10);
            //head.draw();
        }else{
            drawLabelledArrow("head", 5, this.head.getX(), elementBoxLabelY, this.head.getX(), this.head.getY()-(elementBoxHeight/2)-10);
            drawLabelledArrow("tail", 5, this.tail.getX(), elementBoxLabelY, this.tail.getX(), this.tail.getY()-(elementBoxHeight/2)-10);
        }

/*        ctx.strokeRect(50, 50, 50, 50);
        ctx.fillText("head", 75, 125);*/

        let cur = this.head;
        while(cur!=null){
            cur.draw();

/*            ctx.strokeRect(50+(50*count), 50, 50, 50);
            ctx.fillText(cur.getElementValue(), (50+(50*count))+25, 75);*/
            //ctx.fillText(count, (50+(50*count))+25, 125);

            cur = cur.getNext();
            /*count++;*/
        }
/*        ctx.strokeRect(50+(50*(count)), 50, 50, 50);
        ctx.fillText("tail", (50+(50*(count)))+25, 75);*/
    }
}

class DoublyLinkedList{
    constructor(){
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
    find(element){

    }
    addFirst(node){

    }
    removeFirst(){

    }
    addLast(node){
        this.addAfter(this.tail, node);
    }
    removeLast(){

    }
    addAfter(prev, node){
        node.setPrev(prev);
        node.setNext(prev.getNext());
        prev.setNext(node);
        node.getNext().setPrev(node);
    }
    removeNext(){

    }
    getSize(){

    }
    isEmpty(){

    }
    // Created 07/03/18
    draw(){

    }
}

class ArrayElement{
    constructor(value, showIndexNum=false){
        this.value = value;
        this.middleX = 0;
        this.middleY = 0;
        this.index = 0;
        this.showIndexNum = showIndexNum;
    }
    setXY(x, y){
        this.middleX = x;
        this.middleY = y;
    }
    getX(){
        return this.middleX;
    }
    getY(){
        return this.middleY;
    }
    setIndex(newIndex){
        this.index = newIndex;
    }
    draw(){

        // Draw the actual box
        ctx.strokeRect(this.middleX-(elementBoxWidth/2), this.middleY-(elementBoxHeight/2), elementBoxWidth, elementBoxHeight);

        // Draw the actual value
        ctx.fillText(this.value, this.middleX, this.middleY);

        // Draw the index
        if (this.showIndexNum){
            ctx.fillText(this.index, this.middleX, this.middleY + elementBoxHeight);
        }

        if (this.treeX !== 0 && this.treeY !== 0){
            ctx.beginPath();
            // Draw root
            ctx.arc(this.treeX, this.treeY, 20, 0, 2 * Math.PI);
            ctx.stroke();
        }

        //leftMargin +(elementBoxWidth*i), elementBoxY, this.content[i], i);
/*        this.valueTextX = leftMargin +(elementBoxWidth*i);

        this.valueTextX = containerX+elementBoxMiddleX;
        this.valueTextY = elementBoxMiddleY;
        ctx.fillText(this.value, this.valueTextX, this.valueTextY);
        ctx.fillText(index, this.valueTextX, elementBoxIndexY);*/
    }
    getValue(){
        return this.value;
    }
    setValue(value){
        this.value = value;
    }
}

class SimpleArray{
    constructor(size=20, elementBoxY=topMargin+elementBoxHeight, showIndex=false){
        // Do these need renaming?
        this.size = size;
        this.numElements = 0;
        this.content = [];
        this.showIndex = showIndex;
        this.elementBoxY = elementBoxY;
        for (let i=0; i<size; i++){
            this.content[i] = new ArrayElement(null, this.showIndex);
            //this.content[i].setXY(leftMargin + elementBoxWidth + (elementBoxWidth*i), elementBoxY+elementBoxHeight+(elementBoxHeight/2));
            this.content[i].setXY(leftMargin + elementBoxWidth + (elementBoxWidth*i), this.elementBoxY+(elementBoxHeight/2));
            this.content[i].setIndex(i);
        }
    }
    setValue(index, value){
        let adding = Boolean(this.content[index].getValue() == null);
        console.log(adding);
        //this.content[index] = value;
/*        if (adding){
            outputLabel.innerText = "Added " + this.content[index].getValue();
            this.numElements++;
        }else{
            outputLabel.innerText = "Removed " + this.content[index].getValue();
            this.numElements--;
        }*/
        this.content[index].value = value;
        this.draw();
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
            this.content[i] = new ArrayElement(null, this.showIndex);
            //this.content[i].setXY(leftMargin + elementBoxWidth + (elementBoxWidth*i), elementBoxY+elementBoxHeight+(elementBoxHeight/2));
            this.content[i].setXY(leftMargin + elementBoxWidth + (elementBoxWidth*i), this.elementBoxY+(elementBoxHeight/2));
            this.content[i].setIndex(i);
        }
    }
    draw() {
        clearCanvas();
        for (let i=0; i<this.size; i++){
            // Draw the box that visualizes the index
            this.content[i].draw();

            //drawElementBox(leftMargin +(elementBoxWidth*i), elementBoxY, this.content[i], i);
            //ctx.strokeRect(50+(50*i), topMargin*2, 50, 50);
            // The value of the element at that index
            //ctx.fillText(this.content[i]==null?"null":this.content[i], (elementBoxX +(elementBoxWidth*i))+elementBoxWidth*0.5, elementBoxMiddleY);
            //ctx.fillText(i, (50+(50*i))+25, 125);
            // The index number
            //ctx.fillText(i, leftMargin*1.5 + (elementBoxWidth*i), topMargin*4);
        }
    }
}

class CircularArray extends SimpleArray{
    constructor(size=20, showIndex=false){
        super(size, topMargin+90, showIndex);
        this.head = 0;
        this.tail = 0;
    }
    getHead(){
        return this.head;
    }
    setHead(newHead){
        this.head = newHead;
    }
    getTail(){
        return this.tail;
    }
    setTail(newTail){
        this.tail = newTail;
    }
    setValue(index, value){
        super.setValue(index, value);

    }
    // Created 07/03/18
    draw(){
        // Draw the common parts of any array structure
        super.draw();
        let headElement = this.content[this.head];
        let tailElement = this.content[this.tail];

        if (this.head === this.tail){
            drawLabelledArrow("head / tail", 5, headElement.getX(), elementBoxLabelY, headElement.getX(), headElement.getY()-(elementBoxHeight/2));
        }else{
            //drawLabelledArrow(labelText, this.middleX, elementBoxLabelY, this.middleX, this.middleY-(elementBoxHeight/2));
            drawLabelledArrow("head", 5, headElement.getX(), elementBoxLabelY, headElement.getX(), headElement.getY()-(elementBoxHeight/2));
            drawLabelledArrow("tail", 5, tailElement.getX(), elementBoxLabelY, tailElement.getX(), tailElement.getY()-(elementBoxHeight/2));
        }

        // Then draw the parts specific to CircularArray, points to head and tail

/*        ctx.fillText("head", 75, 25);
        ctx.beginPath();
        ctx.moveTo(75, 30); // Margin of 5 pixels
        ctx.lineTo(75,elementBoxY-20);
        ctx.closePath();
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(70, elementBoxY-20); // Margin of 5 pixels
        ctx.lineTo(75,elementBoxY-10);
        ctx.lineTo(80, elementBoxY-20)
        ctx.closePath();
        ctx.fill();*/

    }
}

class HeapElement extends ArrayElement{
    constructor(value, showIndex){
        super(value, showIndex);
    }
    getValue(){
        return this.value;
    }
}

class HeapArray extends SimpleArray{
    constructor(size=20, elementBoxY=topMargin+elementBoxHeight, showIndex=true){
        super(size, elementBoxY, showIndex);
    }
    parent(j){
        return Math.floor((j-1) / 2);
    }
    left(j){
        return 2*j + 1;
    }
    right(j){
        return 2*j + 2;
    }
    hasLeft(j){
        return this.left(j) < this.size;
    }
    hasRight(j){
        return this.right(j) < this.size;
    }
    swap(i, j){
        let temp = this.content[i].getValue();
        console.log(temp);
        console.log(this.content[j].getValue())
/*        this.setValue(i, this.content[j].getValue());
        this.setValue(j, temp);*/

        //this.content[i].setValue(this.content[j].getValue());
        //this.content[j].setValue(temp.getValue());
        this.content[i].value = this.content[j].getValue();
        this.content[j].value = temp;
        this.draw();
    }
    draw() {
        super.draw();
        let radiusOfNode = 20;
        let gapUnit = radiusOfNode;
        let nodeXSpacingFactor = 0;
        let nodeYSpacingFactor = 0;

        let numLevels = Math.floor(Math.log2(this.size-1));
        let totalExtraGap = (Math.pow(2, numLevels)*nodeXSpacingFactor);
        let unitsToStart = (Math.pow(2, numLevels)) + totalExtraGap;

        //let startingX = canvas.width / 2 - radiusOfNode - (unitsToStart * radiusOfNode);
        let startingX = canvas.width / 2 - (unitsToStart * radiusOfNode);
        let startingY = (canvas.height / 2);
        ctx.fillRect(startingX,startingY,1,1);
/*        ctx.beginPath();
        // Draw root
        ctx.arc(canvas.width / 2 , canvas.height / 2, radiusOfNode, 0, 2 * Math.PI);
        ctx.stroke();*/
        console.log(Math.sqrt(this.size));
        let currX = 0;
        let currY = startingY;
/*        for (let i = numLevels; i >= 1; i--) {
            let currLevel = (numLevels - i)+1;
            let distanceBetweenNodes = Math.pow(2, i)-1;
            //distanceBetweenNodes -= 1;
            console.log("Current i: " + i);
            let distanceFromLeftToFirstNode = Math.pow(2, i-1) - 1; // Works!
            console.log("distanceFromLeftToFirstNode: " + distanceFromLeftToFirstNode);
            let numOnThisLevel = Math.pow(2, currLevel); // Works !
            console.log("currLevel: " + currLevel);
            console.log("numOnThisLevel: " + numOnThisLevel);
            console.log("distanceBetweenNodes: " + distanceBetweenNodes);
            currX = startingX + (distanceFromLeftToFirstNode * gapUnit);
            currY = startingY + (gapUnit*2*currLevel);
            ctx.fillRect(currX,currY,5,5);
            console.log("Height loop: " + currX + " " + currY);
            for (let j = 0; j < numOnThisLevel; j++) {
                ctx.beginPath();
                ctx.arc(currX + (j * distanceBetweenNodes * gapUnit) + radiusOfNode, currY, radiusOfNode, 0, 2 * Math.PI);
                ctx.stroke();
                //currX = currX + ((2 ^ (i + 1))*gapUnit);
                //ctx.fillRect(currX + radiusOfNode + (j * distanceBetweenNodes * gapUnit),currY,5,5);
                currX = currX + radiusOfNode;
            }
        }*/
/*        for (let i = 0; i <= numLevels; i++) {
            let reverseCurrLevel = (numLevels + 1) - i;
            let distanceBetweenNodes = Math.pow(2, reverseCurrLevel)-1;
            //let distanceFromLeftToFirstNode = Math.pow(2, reverseCurrLevel-1) - 1;
            let distanceFromLeftToFirstNode = (Math.pow(2, reverseCurrLevel-1) - 1);
            let numOnThisLevel = Math.pow(2, i);

            //currX = startingX + (distanceFromLeftToFirstNode * gapUnit);
            //currX = startingX + (distanceFromLeftToFirstNode * radiusOfNode*nodeXSpacingFactor);
            currX = startingX + (distanceFromLeftToFirstNode * radiusOfNode) + radiusOfNode;
            currY = startingY + (radiusOfNode*3*i);
            console.log("Current i: " + i);
            console.log("distanceFromLeftToFirstNode: " + distanceFromLeftToFirstNode);
            console.log("currLevel: " + i);
            console.log("numOnThisLevel: " + numOnThisLevel);
            console.log("distanceBetweenNodes: " + distanceBetweenNodes);
            ctx.fillRect(currX,currY,5,5);
            ctx.fillRect(currX+radiusOfNode,currY,5,5);
            ctx.fillRect(currX+radiusOfNode+(distanceBetweenNodes * radiusOfNode),currY,5,5);
            console.log("Height loop: " + currX + " " + currY);

            for (let j = 0; j < numOnThisLevel; j++) {
                ctx.beginPath();
                //ctx.arc(currX + radiusOfNode + ((j * distanceBetweenNodes * gapUnit)*nodeXSpacingFactor), currY, radiusOfNode, 0, 2 * Math.PI);
                ctx.arc(currX, currY, radiusOfNode, 0, 2 * Math.PI);
                ctx.stroke();
                //currX = currX + radiusOfNode;
                //currX = currX + (((j+1) * distanceBetweenNodes * gapUnit)*nodeXSpacingFactor);
                //currX = currX + radiusOfNode + (distanceBetweenNodes * radiusOfNode * nodeXSpacingFactor) + radiusOfNode;
                currX = currX + radiusOfNode + (distanceBetweenNodes * radiusOfNode);
            }
        }*/
        let currNodeIndex = 0;
        for (let i = 0; i <= numLevels; i++) {
            let reverseCurrLevel = (numLevels + 1) - i;
            let currLevelExtraNodeGap = (Math.pow(2, reverseCurrLevel)*nodeXSpacingFactor);
            //let extraGap = unitsToStart / (i+1);
            //console.log("totalExtraGap: " + totalExtraGap);
            //console.log("extraGap: " + currLevelExtraNodeGap);
            let distanceBetweenNodes = (Math.pow(2, reverseCurrLevel)-1)+currLevelExtraNodeGap;
            //let distanceFromLeftToFirstNode = Math.pow(2, reverseCurrLevel-1) - 1;
            let distanceFromLeftToFirstNode = ((Math.pow(2, reverseCurrLevel-1)-1))+(currLevelExtraNodeGap/2);
            let numOnThisLevel = Math.pow(2, i);

            //currX = startingX + (distanceFromLeftToFirstNode * gapUnit);
            //currX = startingX + (distanceFromLeftToFirstNode * radiusOfNode*nodeXSpacingFactor);
            currX = startingX + (distanceFromLeftToFirstNode * radiusOfNode) + radiusOfNode;
            currY = currY + (radiusOfNode*2) + (radiusOfNode*nodeYSpacingFactor);
/*            console.log("Current i: " + i);
            console.log("distanceFromLeftToFirstNode: " + distanceFromLeftToFirstNode);
            console.log("currLevel: " + i);
            console.log("numOnThisLevel: " + numOnThisLevel);
            console.log("distanceBetweenNodes: " + distanceBetweenNodes);
            ctx.fillRect(currX,currY,5,5);
            ctx.fillRect(currX+radiusOfNode,currY,5,5);
            ctx.fillRect(currX+radiusOfNode+(distanceBetweenNodes * radiusOfNode),currY,5,5);
            console.log("Height loop: " + currX + " " + currY);*/

            for (let j = 0; j < numOnThisLevel; j++) {
                //console.log("numOnThisLevel: " + numOnThisLevel);
                //console.log("currNodeIndex: " + currNodeIndex);
                if (currNodeIndex >= this.size) { break; }
                if (this.content[currNodeIndex].getValue() != null){
                    ctx.beginPath();
                    //ctx.arc(currX + radiusOfNode + ((j * distanceBetweenNodes * gapUnit)*nodeXSpacingFactor), currY, radiusOfNode, 0, 2 * Math.PI);
                    ctx.arc(currX, currY, radiusOfNode, 0, 2 * Math.PI);
                    ctx.stroke();
                    ctx.fillText(this.content[currNodeIndex].getValue(), currX, currY);
                }

                currNodeIndex = currNodeIndex + 1;

                //currX = currX + radiusOfNode;
                //currX = currX + (((j+1) * distanceBetweenNodes * gapUnit)*nodeXSpacingFactor);
                //currX = currX + radiusOfNode + (distanceBetweenNodes * radiusOfNode * nodeXSpacingFactor) + radiusOfNode;
                currX = currX + radiusOfNode + (distanceBetweenNodes * radiusOfNode);
            }
        }
    }
}

class BinarySearchTree{
    constructor(){
        this.root = null;
        this.size = 0;
    }
    treeInsert() {

    }
    treeSearch(){

    }
    treeRemove(){

    }
    getMinimum(){

    }
    getMaximum(){

    }
    getSize(){
        return this.size;
    }
    isEmpty(){
        return this.size === 0;
    }
}