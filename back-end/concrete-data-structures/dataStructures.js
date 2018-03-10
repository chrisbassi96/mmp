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
        this.index = 0;
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
        // Draw the actual box
        ctx.strokeRect(this.middleX-elementBoxWidth, this.middleY-(elementBoxHeight/2), elementBoxWidth, elementBoxHeight);
        // Draw the box for "next"
        ctx.strokeRect(this.middleX, this.middleY-(elementBoxHeight/2), elementBoxWidth, elementBoxHeight);

        if (this.element==null){
            // Draw a slanted line to indicate no object referenced
            ctx.beginPath();
            ctx.moveTo(this.middleX, this.middleY + (elementBoxHeight/2));
            ctx.lineTo(this.middleX + elementBoxWidth, this.middleY - (elementBoxHeight/2));
            ctx.closePath();
            ctx.stroke();
        }else {
            // Draw the actual value
            ctx.fillText(this.element, this.middleX+(elementBoxWidth/2), this.middleY);
            // Draw the "next"
            ctx.fillText("next", this.middleX-(elementBoxWidth/2), this.middleY);
            if (this.next==null){

                ctx.beginPath();
                ctx.moveTo(this.middleX - elementBoxWidth, this.middleY + (elementBoxHeight/2)); // Margin of 5 pixels
                ctx.lineTo(this.middleX, this.middleY - (elementBoxHeight/2));
                ctx.closePath();
                ctx.stroke();
            }else{
                drawLabelledArrow("next", 0, this.middleX-(elementBoxWidth/2), this.middleY, this.middleX-(elementBoxWidth*2), this.middleY);
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
        this.draw();
    }
    find(element){
        let cur = this.head;
        while (cur.getElement() !== element) {
            cur = cur.getNext();
        }
        return cur;
    }
    addFirst(node) {
        if (this.head == null) {
            node.setNext(null);
            this.head = node;
            this.tail = node;
        } else {
            node.setNext(this.head);
            this.head = node;
        }

        node.setXY(leftMargin+elementBoxWidth+(elementBoxWidth*3*this.numElements), elementBoxY);
        node.setIndex(this.numElements);
        this.numElements++;

        this.draw();
    }
    getFirst(){
        return this.head.getElement();
    }
    removeFirst(){
        let first = this.head;
        this.head = first.getNext();
        outputLabel.innerText = first.getElement();
        this.numElements = this.numElements-1;
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
    draw(){
        clearCanvas();

        // If the thing is empty, draw an empty element with head/tail arrow

        // If not empty,

        if(this.isEmpty()){
/*            let dummy = new SinglyLinkedListNode(null, null);
            dummy.setXY(leftMargin, elementBoxY);
            dummy.setIndex(0);
            dummy.draw();*/
            drawLabelledArrow("head/tail", 5, leftMargin+elementBoxWidth, elementBoxLabelY, leftMargin+elementBoxWidth, elementBoxY-(elementBoxHeight/2)-10);
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
        let count = 1;
        console.log("test");
        while(cur!=null){
            console.log("test2");
            cur.draw();

/*            ctx.strokeRect(50+(50*count), 50, 50, 50);
            ctx.fillText(cur.getElement(), (50+(50*count))+25, 75);*/
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
    constructor(value){
        this.value = value;
        this.middleX = 0;
        this.middleY = 0;
        this.index = 0;
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
        ctx.fillText(this.index, this.middleX, elementBoxIndexY);

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
    constructor(size=20){
        // Do these need renaming?
        this.size = size;
        this.numElements = 0;
        this.content = [];
        for (let i=0; i<size; i++){
            this.content[i] = new ArrayElement(null);
            this.content[i].setXY(leftMargin +(elementBoxWidth*i), elementBoxY);
            this.content[i].setIndex(i);
        }
    }
    setValue(index, value){
        let adding = Boolean(this.content[index].getValue() == null);


        //this.content[index] = value;

        if (adding){
            outputLabel.innerText = "Added " + this.content[index].getValue();
            this.numElements++;
        }else{
            outputLabel.innerText = "Removed " + this.content[index].getValue();
            this.numElements--;
        }
        this.content[index].setValue(value);
        this.draw();
    }

    // Perhaps I should use an if...else... statement here instead, to make it easier to understand?
    getElement(index){
        console.log(index);
        if (index >= 0 && index < this.content.length){

            return this.content[index].getValue();
        }

        // Give some sort of error
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
    constructor(size=20){
        super(size);
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

class HeapArray extends SimpleArray{
    constructor(){
        super();
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