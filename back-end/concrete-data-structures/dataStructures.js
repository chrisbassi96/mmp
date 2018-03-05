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
    addAfter(prev, node){

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

    }
    removeLast(){

    }
    addAfter(prev, node){

    }
    removeNext(){

    }
    getSize(){

    }
    isEmpty(){

    }
}

class SimpleArray{
    constructor(size=20){
        // Do these need renaming?
        this.size = size;
        this.numElements = 0;
        this.content = [];
    }
    setValue(index, value){
        let adding = Boolean(this.content[index] === undefined || this.content[index] == null);

        this.content[index] = value;
        this.draw();

        if (adding){
            this.numElements++;
        }else{
            this.numElements--;
        }
    }

    // Perhaps I should use an if...else... statement here instead, to make it easier to understand?
    getElement(index){
        if (index > 0 && index < this.content.length){
            return this.content[index];
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
            ctx.strokeRect(50+(50*i), 50, 50, 50);
            ctx.fillText(this.content[i]==null?"null":this.content[i], (50+(50*i))+25, 75);
            ctx.fillText(i, (50+(50*i))+25, 125);
        }
    }
}

class CircularArray extends SimpleArray{
    constructor(size=20){
        super(size);
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