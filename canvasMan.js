let canvas;
let ctx;

canvas = document.getElementById("myCanvas");
ctx = canvas.getContext("2d");
canvas.width = 1200;
canvas.height = 300;

let outputLabel = document.getElementById("output_msg");
let drawScale = 1;

function clearCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

class VizuArray{
    constructor(size=20){
        this.size = size;
        this.elements = 0;
        this.content = [];
    }
    draw() {
        clearCanvas();
        for (let i=0; i<this.size; i++){
            ctx.strokeRect(50+(50*i), 50, 50, 50);
            ctx.fillText(this.content[i]==null?"null":this.content[i], (50+(50*i))+25, 75);
            ctx.fillText(i, (50+(50*i))+25, 125);
        }
    }
    changeIndexValue(index, value){
        this.content[index] = value;
        this.draw();
    }
}

VizuLinkedListNode = class {
    constructor(element, next) {
        this.element = element;
        this.next = next;
    }

    getElement() {
        return this.element;
    }

    getNext() {
        return this.next;
    }

    setElement(element) {
        this.element = element;
    }

    setNext(next) {
        this.next = next;
    }
}

class VizuLinkedList{
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    draw(){
        clearCanvas();
        ctx.strokeRect(50, 50, 50, 50);
        ctx.fillText("head", 75, 125);

        var cur = this.head;
        var count = 1;
        console.log("test");
        while(cur!=null){
            console.log("test2");

            ctx.strokeRect(50+(50*count), 50, 50, 50);
            ctx.fillText(cur.getElementValue(), (50+(50*count))+25, 75);
            //ctx.fillText(count, (50+(50*count))+25, 125);

            cur = cur.getNext();
            count++;
        }
        ctx.strokeRect(50+(50*(count)), 50, 50, 50);
        ctx.fillText("tail", (50+(50*(count)))+25, 75);
    }

    getSize(){
        return this.size;
    }
    find(element) {
        var cur = this.head;
        while (cur.getElementValue() !== element) {
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
        this.size++;
        this.draw();
    }
    isEmpty(){
        return this.size === 0;
    }

}

class LinkedListStack extends VizuLinkedList{
    constructor(){
        super();
        this.draw();
    }
/*    isEmpty(){
        return this.size === 0;
    }*/
    push(element){
        this.addFirst(new VizuLinkedListNode(element,null));
    }
    pop(){
        if (this.isEmpty()) {
            outputLabel.innerText = "Stack is empty";
            return;
        }
        var first = this.head;
        this.head = first.getNext();
        outputLabel.innerText = first.getElementValue();
        this.size = this.size-1;
        this.draw();
    }
    peek(){
        outputLabel.innerText = this.head.getElementValue();
    }
}

class ArrayStack extends VizuArray{
    constructor(){
        super();
        this.draw();
    }
    size(){
        return this.elements;
    }
    isEmpty() {
        return this.elements <= 0;
    }
    push(element){
        if (this.content.length < this.size){
            this.changeIndexValue(this.elements, element);
            this.elements++;
            outputLabel.innerText = "Element inserted"
        }else{
            outputLabel.innerText = "Stack is full"
        }
    }
    pop(){
        if (this.isEmpty()){
            outputLabel.innerText = "Stack is empty";
            return;
        }
        var element = this.content[this.elements-1];
        this.changeIndexValue(this.elements-1, null);
        this.elements--;
        outputLabel.innerText = "Element removed";
    }
    peek(){
        if (this.isEmpty()) {
            outputLabel.innerText = "Stack is empty";
            return;
        }
        outputLabel.innerText = this.content[elements-1];
    }
}

//var arrayStack = new ArrayStack();

let stack = new LinkedListStack();

function add(){
    stack.push(document.getElementById('add_value').value);
}

function remove(){
    stack.pop();
}


