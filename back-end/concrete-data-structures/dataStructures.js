class Element{
    constructor(value=null, index=null){
        this.value = value;
        this.index = index;
    }
    getValue(){
        return this.value;
    }
    setValue(value){
        this.value = value;
    }
    setIndex(index){
        this.index = index;
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
        this.middleX = 0;
        this.middleY = 0;
    }
    getNext(){
        return this.next;
    }
    setNext(newNext){
        this.next = newNext;
    }
    isOnTopOf(otherNode){
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
    draw(){
        // Draw the box for "next"
        ctx.strokeRect(this.middleX, this.middleY-(elementBoxHeight/2), elementBoxWidth, elementBoxHeight);
        // Draw the actual box
        ctx.strokeRect(this.middleX-elementBoxWidth, this.middleY-(elementBoxHeight/2), elementBoxWidth, elementBoxHeight);

        if (this.value==null){
            // Draw a slanted line to indicate no object referenced
            ctx.beginPath();
            ctx.moveTo(this.middleX, this.middleY + (elementBoxHeight/2));
            ctx.lineTo(this.middleX + elementBoxWidth, this.middleY - (elementBoxHeight/2));
            ctx.closePath();
            ctx.stroke();
        }else {
            // Draw the actual value
            ctx.fillText(this.value, this.middleX-(elementBoxWidth/2), this.middleY);

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
        //node.setXY(leftMargin+elementBoxWidth+(elementBoxWidth*3*this.numElements), this.elementBoxY+(elementBoxHeight/2));
        node.setXY(leftMargin+elementBoxWidth, this.elementBoxY+(elementBoxHeight/2));
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

        if (this.head.isOnTopOf(this.tail)){
            /*            let dummy = new SinglyLinkedListNode(null, null);
                        dummy.setXY(leftMargin, elementBoxY);
                        dummy.setIndex(0);*/
            drawLabelledArrow("head / tail", 5, this.head.getX(), elementBoxLabelY, this.head.getX(), this.head.getY()-(elementBoxHeight/2)-10);
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
            ctx.fillText(cur.getValue(), (50+(50*count))+25, 75);*/
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

class ArrayElement extends Element{
    constructor(value, showIndexNum=false){
        super(value);
        this.oldMiddleX = 0;
        this.oldMiddleY = 0;
        this.middleX = 0;
        this.middleY = 0;
        this.showIndexNum = showIndexNum;
    }
    setXY(x, y){
        this.oldMiddleX = this.middleX;
        this.oldMiddleY = this.middleY;
        this.middleX = x;
        this.middleY = y;

        let diffX = this.oldMiddleX - this.middleX;
        let diffY = this.oldMiddleY - this.middleY;
        let lineAngle = Math.atan2(this.middleY-this.oldMiddleY, this.middleX-this.oldMiddleX);

       while(this.oldMiddleX !== this.middleX && this.oldMiddleY !== this.middleY){
            toX + Math.cos(angleFromShaftToArrowHeadCornerTop)*lengthOfArrowHeadSide;
            let nextX =
            window.requestAnimationFrame(newDraw);
        }




    }
    newDraw(){


        while(this.oldMiddleX !== this.middleX && this.oldMiddleY !== this.middleY){
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            window.requestAnimationFrame(this.newDraw);

        }



    }
    getX(){
        return this.middleX;
    }
    getY(){
        return this.middleY;
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
            this.content[i].setXY(leftMargin + elementBoxWidth + (elementBoxWidth*i), this.elementBoxY+(elementBoxHeight/2));
            this.content[i].setIndex(i);
        }

    }
    setElementValue(index, value){
        this.content[index].setValue(value);
        this.draw();
    }
    // Perhaps I should use an if...else... statement here instead, to make it easier to understand?
    getElementValue(index){
        console.log(index);
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
            this.content[i].setXY(leftMargin + elementBoxWidth + (elementBoxWidth*i), this.elementBoxY+(elementBoxHeight/2));
            this.content[i].setIndex(i);
        }
    }
    draw() {
        clearCanvas();
        for (let i=0; i<this.size; i++){
            // Draw the box that visualizes the index
            this.content[i].draw();
        }
    }
}

class CircularArray extends SimpleArray{
    constructor(size=20, showIndex=false){
        super(size, topMargin+90, showIndex);
        this.head = 0;
        this.tail = 0;
        this.draw();
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
    // Created 07/03/18
    draw(){
        // Draw the common parts of any array structure
        super.draw();
        let headElement = this.content[this.head];
        let tailElement = this.content[this.tail];

        console.log("head: " + this.head);

        if (this.head === this.tail){
            drawLabelledArrow("head / tail", 5, headElement.getX(), elementBoxLabelY, headElement.getX(), headElement.getY()-(elementBoxHeight/2));
        }else{
            drawLabelledArrow("head", 5, headElement.getX(), elementBoxLabelY, headElement.getX(), headElement.getY()-(elementBoxHeight/2));
            drawLabelledArrow("tail", 5, tailElement.getX(), elementBoxLabelY, tailElement.getX(), tailElement.getY()-(elementBoxHeight/2));
        }
    }
}

class HeapElement extends ArrayElement{
    constructor(value, showIndex){
        super(value, showIndex);
        this.draw();
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
        console.log(this.content[j].getValue());
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

        let startingX = canvas.width / 2 - (unitsToStart * radiusOfNode);
        let startingY = (canvas.height / 2);
        ctx.fillRect(startingX,startingY,1,1);
        console.log(Math.sqrt(this.size));
        let currX = 0;
        let currY = startingY;
        let currNodeIndex = 0;
        for (let i = 0; i <= numLevels; i++) {
            let reverseCurrLevel = (numLevels + 1) - i;
            let currLevelExtraNodeGap = (Math.pow(2, reverseCurrLevel)*nodeXSpacingFactor);
            let distanceBetweenNodes = (Math.pow(2, reverseCurrLevel)-1)+currLevelExtraNodeGap;
            let distanceFromLeftToFirstNode = ((Math.pow(2, reverseCurrLevel-1)-1))+(currLevelExtraNodeGap/2);
            let numOnThisLevel = Math.pow(2, i);

            currX = startingX + (distanceFromLeftToFirstNode * radiusOfNode) + radiusOfNode;
            currY = currY + (radiusOfNode*2) + (radiusOfNode*nodeYSpacingFactor);

            for (let j = 0; j < numOnThisLevel; j++) {
                if (currNodeIndex >= this.size) { break; }
                if (this.content[currNodeIndex].getValue() != null){
                    ctx.beginPath();
                    ctx.arc(currX, currY, radiusOfNode, 0, 2 * Math.PI);
                    ctx.stroke();
                    ctx.fillText(this.content[currNodeIndex].getValue(), currX, currY);
                }

                currNodeIndex = currNodeIndex + 1;
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