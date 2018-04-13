class Element{
    constructor(value=null){
        this.value = value;
    }
    getValue(){
        return this.value;
    }
    setValue(value){
        this.value = value;
    }
}

class BTNode extends Element{
    constructor(){
        super();
        this.parent = new Element();
        this.left = new Element();
        this.right = new Element();
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

class SinglyLinkedListNode extends Element{
    constructor(elementValue, next){
        super(elementValue);
        this.next = next;
    }
    getNext(){
        return this.next;
    }
    setNext(newNext){
        this.next = newNext;
    }
}

class DoublyLinkedListNode extends Element{
    constructor(){
        super();
        this.next = null;
        this.prev = null;
    }
    equals(otherNode){
        return (this.middleX === otherNode.getX()) && (this.middleY === otherNode.getY());
    }
    draw(){
        // Draw the actual box
        ctx.strokeRect(this.middleX-elementBoxWidth, this.middleY-(elementBoxHeight/2), elementBoxWidth, elementBoxHeight);
        // Draw the box for "visualNext"
        ctx.strokeRect(this.middleX, this.middleY-(elementBoxHeight/2), elementBoxWidth, elementBoxHeight);

        if (this.element==null){
            // Draw a slanted line to indicate no object referenced
            ctx.beginPath();
            ctx.moveTo(this.middleX - (elementBoxWidth/2), this.middleY + (elementBoxHeight/2)); // Margin of 5 pixels
            ctx.lineTo(this.middleX + (elementBoxWidth/2), this.middleY - (elementBoxHeight/2));
            ctx.closePath();
            ctx.stroke();
        }else {
            // Draw the actual visualValue
            ctx.fillText(this.element, this.middleX-(elementBoxWidth/2), this.middleY);
            // Draw the "visualNext"
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
        this.head = null;
        this.tail = null;
        this.numElements = 0;
    }
    find(element){
        let cur = this.head;
        while (cur.getValue() !== element) {
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
    }
    getFirst(){
        return this.head.getValue();
    }
    removeFirst() {
        let first = this.head;
        this.head = first.getNext();

        // Added to make this work in JavaScript
        if (this.head===null){this.tail = null;}

        this.numElements = this.numElements - 1;
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

class SimpleArray{
    constructor(size=20){
        this.size = size;
        this.numElements = 0;
        this.content = [];
        for (let i=0; i<size; i++){
            this.content[i] = new Element(null);
        }
    }
    getSize(){
        return this.size;
    }
    getNumElements(){
        return this.numElements;
    }
    isEmpty(){
        return this.numElements === 0;
    }
    getElement(index){
        if (index >= 0 && index < this.content.length){
            return this.content[index];
        }
        // Give some sort of error
        return null;
    }
    setElementValue(index, value){
        this.content[index].setValue(value);
    }
    // Perhaps I should use an if...else... statement here instead, to make it easier to understand?
    expand(){
        this.size = this.size*2;
        for (let i=this.size/2; i<this.size; i++){
            this.content[i] = new Element(null);
            //this.content[i].setIndex(i);
        }
    }
}

class CircularArray extends SimpleArray{
    constructor(size=20, showIndex=false){
        super(size, topBottomMargin+90, showIndex);
        this.head = 0;
        this.tail = 0;
    }
    getHead(){
        return this.head;
    }
    setHead(head){
        this.head = head;
    }
    getTail(){
        return this.tail;
    }
    setTail(tail){
        this.tail = tail;
    }
}

class HeapArray extends SimpleArray{
    constructor(size=20, elementBoxY=topBottomMargin+elementBoxHeight, showIndex=true){
        super(size, elementBoxY, showIndex);
    }
    static parent(index){
        return Math.floor((index-1) / 2);
    }
    static left(index){
        return 2*index + 1;
    }
    static right(index){
        return 2*index + 2;
    }
    hasLeft(index){
        return HeapArray.left(index) < this.size;
    }
    hasRight(index){
        return HeapArray.right(index) < this.size;
    }
    swap(i, j){
        let temp = this.content[i].getValue();
        console.log(temp);
        console.log(this.content[j].getValue());
        this.content[i].setValue(this.content[j].getValue());
        this.content[j].setValue(temp);
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