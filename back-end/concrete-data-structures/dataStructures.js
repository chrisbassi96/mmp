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
        this.head = null;
        this.tail = null;
        this.numElements = 0;
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
        ctx.strokeRect(50, 50, 50, 50);
        ctx.fillText("head", 75, 125);

        let cur = this.head;
        let count = 1;
        console.log("test");
        while(cur!=null){
            console.log("test2");

            ctx.strokeRect(50+(50*count), 50, 50, 50);
            ctx.fillText(cur.getElement(), (50+(50*count))+25, 75);
            //ctx.fillText(count, (50+(50*count))+25, 125);

            cur = cur.getNext();
            count++;
        }
        ctx.strokeRect(50+(50*(count)), 50, 50, 50);
        ctx.fillText("tail", (50+(50*(count)))+25, 75);
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
        this.valueTextX = 0;
        this.valueTextY = 0;
        this.middleX = 0;
        this.middleY = 0;
        this.index = 0;
    }
    setXY(x, y){
        this.middleX = x;
        this.middleY = y;
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
    drawLabelledPointer(labelText){
        drawLabelledArrow(labelText, this.middleX, elementBoxLabelY, this.middleX, this.middleY-(elementBoxHeight/2));
/*        ctx.fillText(labelText, this.valueTextX, elementBoxLabelY, );

        ctx.beginPath();
        ctx.moveTo(this.valueTextX, elementBoxLabelY+5); // Margin of 5 pixels
        ctx.lineTo(this.valueTextX, elementBoxY-20);
        ctx.closePath();
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(this.valueTextX-5, elementBoxY-20); // Margin of 5 pixels
        ctx.lineTo(this.valueTextX,elementBoxY-10); // Instead of elementBoxY, perhaps the Y of the exact container?
        ctx.lineTo(this.valueTextX+5, elementBoxY-20)
        ctx.closePath();
        ctx.fill();*/
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
        // Then draw the parts specific to CircularArray, points to head and tail
        this.content[this.head].drawLabelledPointer("head");
        this.content[this.tail].drawLabelledPointer("tail");
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