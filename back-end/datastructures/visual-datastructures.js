class VisualElement extends VisualObject {
    constructor(physicalElement) {
        super();

        this.physicalElement = physicalElement;

        this.visualValue = new VisualValue("null");

        this.visualObjects.push(this.visualValue);
    }

    updateElementValue(value = this.physicalElement.getValue()) {
        this.visualValue.value = value;
    }

    setXY(x, y) {
        super.setXY(x, y);

        this.setAllXY();
    }
}

class VisualArrayElement extends VisualElement {
    constructor(physicalElement, indexNum, showIndex = false) {
        super(physicalElement);

        this.visualElementBox = new VisualBox();
        this.visualIndexNum = new VisualValue(indexNum);

        this.visualObjects.push(this.visualElementBox);

        if (showIndex) {
            this.visualObjects.push(this.visualIndexNum);
        }
    }

    setIndex(index) {
        this.visualIndexNum.setValue(index);
    }

    update(x, y, progress) {
        super.update(x, y, progress);

        if (this.visualValue.isBeingAnimated() || this.isBeingAnimated()) {
            this.visualValue.update(x, y, progress);
        }
        if (this.visualElementBox.isBeingAnimated() || this.isBeingAnimated()) {
            this.visualElementBox.update(x, y, progress);
        }
        if (this.visualIndexNum.isBeingAnimated() || this.isBeingAnimated()) {
            this.visualIndexNum.update(x, y + boxHeight, progress);
        }
    }

    setAllXY() {
        this.visualElementBox.setXY(this.getXY()[0], this.getXY()[1]);
        this.visualValue.setXY(this.getXY()[0], this.getXY()[1]);
        this.visualIndexNum.setXY(this.getXY()[0], this.getXY()[1] + boxHeight);
    }
}

class VisualSinglyLinkedListElement extends VisualElement {
    constructor(physicalElement) {
        super(physicalElement);
        this.next = null;

        this.visualValueBox = new VisualBox();
        this.visualNextBox = new VisualBox();
        this.visualNextBox.crossedThrough = true;
        this.visualNext = new VisualValue("next");

        this.nextArrow = new VisualArrow(0, boxWidth);
        this.visualNext.addOutgoingArrow(this.nextArrow);

        this.visualObjects.push(this.visualValueBox);
        this.visualObjects.push(this.visualNextBox);
        this.visualObjects.push(this.visualNext);
    }

    getNext() {
        return this.next;
    }

    setNext(next) {
        this.next = next;
        next.addIncomingArrow(this.nextArrow);

        this.visualNext.crossedThrough = this.next == null;
    }

    setAllXY() {
        this.visualValueBox.setXY(this.getXY()[0] - (this.visualValueBox.width / 2), this.getXY()[1]);
        this.visualValue.setXY(this.getXY()[0] - (this.visualValueBox.width / 2), this.getXY()[1]);
        this.visualNextBox.setXY(this.getXY()[0] + (this.visualValueBox.width / 2), this.getXY()[1]);
        this.visualNext.setXY(this.getXY()[0] + (this.visualValueBox.width / 2), this.getXY()[1]);
    }

    update(x, y, progress) {
        // Only update the coords of element visual tempObjects IF they are being animated
        // This allows us to control which visual tempObjects of the element are animated and which are not
        super.update(x, y, progress);
        console.log(this.isBeingAnimated());
/*        if (this.visualValueBox.isBeingAnimated() || this.isBeingAnimated()) {
            this.visualValueBox.update(x - (this.visualValueBox.width / 2), y, progress);
        }
        if (this.visualValue.isBeingAnimated() || this.isBeingAnimated()) {
            this.visualValue.update(x - (this.visualValueBox.width / 2), y, progress);
        }
        if (this.visualNextBox.isBeingAnimated() || this.isBeingAnimated()) {
            this.visualNextBox.update(x + (this.visualValueBox.width / 2), y, progress);
        }
        if (this.visualNext.isBeingAnimated() || this.isBeingAnimated()) {
            this.visualNext.update(x + (this.visualValueBox.width / 2), y, progress);
        }*/
    }

    updateAll(x, y, progress){
        if (this.visualValueBox.isBeingAnimated() || this.isBeingAnimated()) {
            this.visualValueBox.update(x - (this.visualValueBox.width / 2), y, progress);
        }
        if (this.visualValue.isBeingAnimated() || this.isBeingAnimated()) {
            this.visualValue.update(x - (this.visualValueBox.width / 2), y, progress);
        }
        if (this.visualNextBox.isBeingAnimated() || this.isBeingAnimated()) {
            this.visualNextBox.update(x + (this.visualValueBox.width / 2), y, progress);
        }
        if (this.visualNext.isBeingAnimated() || this.isBeingAnimated()) {
            this.visualNext.update(x + (this.visualValueBox.width / 2), y, progress);
        }
    }

    draw() {
        super.draw();
        if (!this.notDrawn && this.next !== null) {
            this.visualNextBox.crossedThrough = false;
            //drawLabelledArrow("next", 0, this.getXY()[0]+(boxWidth/2), this.getXY()[1], this.next.visualValue.getXY()[0]-(boxWidth/2), this.next.visualValue.getXY()[1]);
        }
    }
}

class VisualDoublyLinkedListElement extends VisualSinglyLinkedListElement {
    constructor(physicalElement) {
        super(physicalElement);
        this.prevVisualElement = null;

        this.visualPrevBox = new VisualBox();
        this.visualPrevBox.crossedThrough = true;
        this.visualPrev = new VisualValue("prev");

        // Create next arrow, pass to the value
        this.prevArrow = new VisualArrow(0, boxWidth * 1.5);
        this.visualPrev.addOutgoingArrow(this.prevArrow);

        this.visualObjects.push(this.visualPrevBox);
        this.visualObjects.push(this.visualPrev);
    }

    getPrev() {
        return this.prevVisualElement;
    }

    setPrev(prevVisualElement) {
        this.prevVisualElement = prevVisualElement;
        if (prevVisualElement !== null) {
            prevVisualElement.addIncomingArrow(this.prevArrow);
            this.visualPrevBox.crossedThrough = false;
        } else {
            this.visualPrev.outgoingArrows = [];
            this.visualPrevBox.crossedThrough = true;
        }

        //this.visualPrev.crossedThrough = this.prevVisualElement === null;
    }

    setNext(nextVisualElement) {
        this.next = nextVisualElement;
        if (nextVisualElement !== null) {
            nextVisualElement.addIncomingArrow(this.nextArrow);
        }
    }

    setAllXY() {
        this.visualPrevBox.setXY(this.getXY()[0] - this.visualValueBox.width, this.getXY()[1]);
        this.visualPrev.setXY(this.getXY()[0] - this.visualValueBox.width, this.getXY()[1]);
        this.visualValueBox.setXY(this.getXY()[0], this.getXY()[1]);
        this.visualValue.setXY(this.getXY()[0], this.getXY()[1]);
        this.visualNextBox.setXY(this.getXY()[0] + this.visualValueBox.width, this.getXY()[1]);
        this.visualNext.setXY(this.getXY()[0] + this.visualValueBox.width, this.getXY()[1]);
    }

    updateAllXY(x, y, progress) {
        if (this.visualPrevBox.isBeingAnimated() || this.isBeingAnimated()) {
            this.visualPrevBox.update(x - this.visualPrevBox.width, y, progress);
        }
        if (this.visualPrev.isBeingAnimated() || this.isBeingAnimated()) {
            this.visualPrev.update(x - this.visualValueBox.width, y, progress);
        }
        if (this.visualValueBox.isBeingAnimated() || this.isBeingAnimated()) {
            this.visualValueBox.update(x, y, progress);
        }
        if (this.visualValue.isBeingAnimated() || this.isBeingAnimated()) {
            this.visualValue.update(x, y, progress);
        }
        if (this.visualNextBox.isBeingAnimated() || this.isBeingAnimated()) {
            this.visualNextBox.update(x + this.visualValueBox.width, y, progress);
        }
        if (this.visualNext.isBeingAnimated() || this.isBeingAnimated()) {
            this.visualNext.update(x + this.visualValueBox.width, y, progress);
        }
    }

    updateArrowsXY() {
        for (let i = 0; i < this.incomingArrows.length; i++) {
            this.incomingArrows[i].setEndXY(this.middleXY[0], this.middleXY[1]);
        }
    }

    addIncomingArrow(arrow) {
        super.addIncomingArrow(arrow);

        arrow.setEndXY(this.middleXY[0], this.middleXY[1]);
    }

    draw() {
        super.draw();
        if (!this.notDrawn && this.prevVisualElement !== null) {
            //this.visualPrevBox.crossedThrough = false;
            //drawLabelledArrow("next", 0, this.getXY()[0]+(boxWidth/2), this.getXY()[1], this.next.visualValue.getXY()[0]-(boxWidth/2), this.next.visualValue.getXY()[1]);
        }
    }
}

class VisualTreeNode extends VisualElement {
    constructor(physicalElement, radius) {
        super(physicalElement);
        this.parent = null;
        this.left = null;
        this.right = null;
        this.leftArrow = null;
        this.rightArrow = null;

        this.visualCircle = new VisualCircle(radius);
        this.visualObjects.push(this.visualCircle);
    }

    setParent(visualTreeNode) {
        this.parent = visualTreeNode;
    }

    setLeft(visualTreeNode) {
        this.left = visualTreeNode;
        if (visualTreeNode !== null) {
            this.leftArrow = new VisualArrow(circleRadius, circleRadius);
            this.leftArrow.setStartXY(this.middleXY[0], this.middleXY[1]);
            visualTreeNode.addIncomingArrow(this.leftArrow);
            //this.leftArrow.setEndXY(visualTreeNode.getXY()[0], visualTreeNode.getXY()[1]);
        } else {
            this.leftArrow = null;
        }
    }

    setRight(visualTreeNode) {
        console.log(visualTreeNode);
        this.right = visualTreeNode;
        if (visualTreeNode !== null) {
            this.rightArrow = new VisualArrow(circleRadius, circleRadius);
            this.rightArrow.setStartXY(this.middleXY[0], this.middleXY[1]);
            visualTreeNode.addIncomingArrow(this.rightArrow);
            //this.rightArrow.setEndXY(visualTreeNode.getXY()[0], visualTreeNode.getXY()[1]);
        } else {
            this.rightArrow = null;
        }
    }

    setXY(x, y) {
        super.setXY(x, y);

        this.setAllXY();
    }

    setAllXY() {
        for (let i = 0; i < this.visualObjects.length; i++) {
            this.visualObjects[i].setXY(this.middleXY[0], this.middleXY[1]);
        }
        this.updateArrowXY(this.middleXY[0], this.middleXY[1]);
    }

    update(x, y, progress) {
        super.update(x, y, progress);

        if (this.visualCircle.isBeingAnimated() || this.isBeingAnimated()) {
            this.visualCircle.update(x, y, progress)
        }
        if (this.visualValue.isBeingAnimated() || this.isBeingAnimated()) {
            this.visualValue.update(x, y, progress);
        }

        this.updateArrowXY(x, y);
    }

    updateArrowXY(x, y) {
        for (let i = 0; i < this.outgoingArrows.length; i++) {
            this.outgoingArrows[i].setStartXY(x, y);
        }
        for (let i = 0; i < this.incomingArrows.length; i++) {
            this.incomingArrows[i].setEndXY(x, y);
        }

        if (this.left !== null) {
            this.leftArrow.setStartXY(x, y);
            this.leftArrow.setEndXY(this.left.getXY()[0], this.left.getXY()[1]);
        }
        if (this.right !== null) {
            this.rightArrow.setStartXY(x, y);
            this.rightArrow.setEndXY(this.right.getXY()[0], this.right.getXY()[1]);
        }
    }

    draw() {
        super.draw();

        if (this.leftArrow !== null) {
            this.leftArrow.draw();
        }
        if (this.rightArrow !== null) {
            this.rightArrow.draw();
        }
    }

}

class VisualDatastructure {
    constructor(datastructure, elementBoxY = topBottomMargin + boxHeight) {
        this.physicalDatastructure = datastructure;
        this.elementBoxY = elementBoxY;
    }

    draw() {
        clearCanvas();
    }
}

class VisualSimpleArray extends VisualDatastructure {
    constructor(datastructure, elementBoxY = topBottomMargin + boxHeight, showIndex = true) {
        super(datastructure, elementBoxY);
        this.content = [];
        this.showIndex = showIndex;
        this.animator = new VisualSimpleArrayAnimator(this);

        for (let i = 0; i < datastructure.size; i++) {
            this.content[i] = new VisualArrayElement(datastructure.getElement(i), i, this.showIndex);
            this.content[i].setXY(leftMargin + (boxWidth / 2) + (boxWidth * i), this.elementBoxY + (boxHeight / 2));
            this.content[i].draw();
        }
    }

    insert(element) {
        this.content[element.index].updateElementValue(); // Get the current visualValue from physical datastructure
        //this.visualDatastructure[index].update();
        this.content[element.index].setIndex(element.index); // Update index

        this.animator.insertAnimation(element);
    }

    remove(element) {
        this.getElement(element.index).updateElementValue("null");
        this.animator.removeAnimation(element);
    }

    getElement(index) {
        if (index >= 0 && index < this.content.length) {
            return this.content[index];
        }
        // Give some sort of error
        return null;
    }

    draw() {
        super.draw();
        for (let i = 0; i < this.physicalDatastructure.size; i++) {
            this.content[i].draw();
        }
    }
}

class VisualCircularArray extends VisualSimpleArray {
    constructor(datastructure, elementBoxY = topBottomMargin + 90, showIndex) {
        super(datastructure, elementBoxY, showIndex);
        this.animator = new VisualCircularArrayAnimator(this);

        // Set up for the head arrow
        this.headArrowLabel = new VisualValue("head / tail");
        this.headArrow = new VisualArrow(0, 10);
        this.headArrowEnd = new VisualObject();

        this.headArrowLabel.setXY(this.getElement(0).getXY()[0], elementBoxLabelY);
        this.headArrowEnd.setXY(this.getElement(0).getXY()[0], this.getElement(0).getXY()[1] - boxHeight / 2);

        this.headArrowLabel.addOutgoingArrow(this.headArrow);
        this.headArrowEnd.addIncomingArrow(this.headArrow);

        this.tailArrowLabel = new VisualValue("tail");
        this.tailArrow = new VisualArrow(0, 10);
        this.tailArrowEnd = new VisualObject(); // Create dummy end point object so that the arrow follows during anim

        this.tailArrowLabel.setXY(this.getElement(0).getXY()[0], elementBoxLabelY);
        this.tailArrowEnd.setXY(this.getElement(0).getXY()[0], this.getElement(0).getXY()[1] - boxHeight / 2);

        this.tailArrowLabel.addOutgoingArrow(this.tailArrow);
        this.tailArrowEnd.addIncomingArrow(this.tailArrow);

        this.draw();
    }

    insert(element) {
        let head = this.physicalDatastructure.getHead();
        let tail = this.physicalDatastructure.getTail();

        if (head === tail) {
            this.headArrowLabel.setValue("head / tail");
        } else {
            this.headArrowLabel.setValue("head")
        }

        super.insert(element);
    }

    remove(element) {
        let head = this.physicalDatastructure.getHead();
        let tail = this.physicalDatastructure.getTail();

        if (head === tail) {
            this.headArrowLabel.setValue("head / tail");
        } else {
            this.headArrowLabel.setValue("head");
        }

        super.remove(element);
    }

    draw() {
        super.draw();

        // Draw the common parts of any array structure
        this.headArrowLabel.draw();

        let numElements = this.physicalDatastructure.getNumElements();
        let head = this.physicalDatastructure.getHead();
        let tail = this.physicalDatastructure.getTail();

        if (head !== tail) {
            this.tailArrowLabel.draw();
        }
    }
}

class VisualHeapArray extends VisualSimpleArray {
    constructor(datastructure, elementBoxY, showIndex) {
        super(datastructure, elementBoxY, showIndex);
        this.originalSize = datastructure.size;
        this.contentTree = [];
        this.treeNodeRadius = circleRadius;
        this.animator = new VisualHeapArrayAnimator(this);

        for (let i = 0; i < this.physicalDatastructure.size; i++) {
            this.contentTree[i] = new VisualTreeNode(this.physicalDatastructure.getElement(i));
        }
    }

    insert(element) {
        if (this.originalSize < this.physicalDatastructure.size) {
            this.expand();
        }

        this.updateTreeNodeCoords();

        for (let i = 0; i < this.content.length; i++) {
            this.getElement(i).updateElementValue();
            this.getTreeElement(i).updateElementValue();
        }

        // Animations disabled due to incompletion
        //this.animator.insertAnimation(element);

        this.createNodeArrows(element.index);

        this.draw();
    }

    remove(element) {
        this.updateTreeNodeCoords();

        for (let i = 0; i < this.physicalDatastructure.numElements + 1; i++) {
            this.getElement(i).updateElementValue();
            this.getTreeElement(i).updateElementValue();
        }

        if (!this.physicalDatastructure.isEmpty()) {
            if (element.index % 2 === 0) {
                // Removed element was right child of parent
                //this.getTreeElement(HeapArray.parent(element.index)).rightArrow = null;
                this.getTreeElement(HeapArray.parent(element.index)).setRight(null);
            } else {
                //this.getTreeElement(HeapArray.parent(element.index)).leftArrow = null;
                this.getTreeElement(HeapArray.parent(element.index)).setLeft(null);
            }
        }

        this.draw();
    }

    getTreeElement(index) {
        if (index >= 0 && index < this.contentTree.length) {
            return this.contentTree[index];
        }
        // Give some sort of error
        return null;
    }

    createNodeArrows(index) {
        if (index !== 0) {
            let parentTreeNode = this.getTreeElement(HeapArray.parent(index));
            if (index % 2 !== 0) {
                // Has parent
                let leftArrow = new VisualArrow(this.treeNodeRadius, this.treeNodeRadius);
                let rightArrow = new VisualArrow(this.treeNodeRadius, this.treeNodeRadius);

                parentTreeNode.setLeft(this.getTreeElement(index));
                //this.getTreeElement(index).setParent(parentTreeNode);

                //parentTreeNode.addOutgoingArrow(leftArrow);
                //parentTreeNode.leftArrow = leftArrow;
                //parentTreeNode.addOutgoingArrow(rightArrow);
                //parentTreeNode.rightArrow = rightArrow;
                //this.contentTree[index].addIncomingArrow(parentTreeNode.leftArrow);
            } else {
                //this.getTreeElement(index).setParent(parentTreeNode);
                parentTreeNode.setRight(this.getTreeElement(index));
                //this.contentTree[index].addIncomingArrow(parentTreeNode.rightArrow);
            }
        }
    }

    updateTreeNodeCoords() {
        let numLevels = Math.floor(Math.log2(this.physicalDatastructure.numElements));

        let totalExtraGap = (Math.pow(2, numLevels) * treeNodeSpacingFactorX);
        let unitsToStart = (Math.pow(2, numLevels)) + totalExtraGap;

        let startingX = canvas.width / 2 - (unitsToStart * circleRadius);
        let startingY = (canvas.height / 2);

        for (let i = 0; i < this.physicalDatastructure.numElements; i++) {
            let currLevel = Math.floor(Math.log2(i + 1));
            let nodesOnCurrLevel = Math.pow(2, currLevel);
            let nodePosOnLevel = Math.abs((nodesOnCurrLevel - i) - 1);

            let reverseCurrLevel = (numLevels + 1) - currLevel;
            let currLevelExtraNodeGap = (Math.pow(2, reverseCurrLevel) * treeNodeSpacingFactorX);
            let distanceBetweenNodes = (Math.pow(2, reverseCurrLevel) - 1) + currLevelExtraNodeGap;
            let distanceFromLeftToFirstNode = ((Math.pow(2, reverseCurrLevel - 1) - 1)) + (currLevelExtraNodeGap / 2);

            let x = startingX;
            x += (distanceFromLeftToFirstNode * circleRadius) + circleRadius;
            x += nodePosOnLevel * (circleRadius + (distanceBetweenNodes * circleRadius));

            let y = startingY;
            y += (currLevel * (circleRadius * 2)) + (circleRadius * treeNodeSpacingFactorY * currLevel);

            this.contentTree[i].setXY(x, y);
        }
    }

    expand() {
        for (let i = this.originalSize; i < this.physicalDatastructure.size; i++) {
            console.log(i);
            this.content[i] = new VisualArrayElement(this.physicalDatastructure.getElement(i), i, this.showIndex);
            this.content[i].setXY(leftMargin + (boxWidth / 2) + (boxWidth * i), this.elementBoxY + (boxHeight / 2));

            this.contentTree[i] = new VisualTreeNode(this.physicalDatastructure.getElement(i), this.treeNodeRadius);
        }
        this.originalSize = this.physicalDatastructure.size;
    }

    draw() {
        super.draw();
        for (let i = 0; i < this.physicalDatastructure.numElements; i++) {
            this.contentTree[i].draw();
        }
    }
}

class VisualSinglyLinkedList extends VisualDatastructure {
    constructor(datastructure, elementBoxY = topBottomMargin + 90) {
        super(datastructure, elementBoxY);
        this.animator = new VisualSinglyLinkedListAnimator(this);

        this.headArrowLabel = new VisualValue("head / tail");
        this.headArrow = new VisualArrow(0, 10 + boxHeight / 2);
        this.headArrowEnd = new VisualObject();

        this.headArrowLabel.setXY(leftMargin + boxWidth, elementBoxLabelY);
        this.headArrowEnd.setXY(leftMargin + boxWidth, elementBoxY);

        this.headArrowLabel.addOutgoingArrow(this.headArrow);
        this.headArrowEnd.addIncomingArrow(this.headArrow);

        this.tailArrowLabel = new VisualValue("tail");
        this.tailArrow = new VisualArrow(0, 10 + boxHeight / 2);

        this.tailArrowLabel.setXY(leftMargin + boxWidth, elementBoxLabelY);

        this.tailArrowLabel.addOutgoingArrow(this.tailArrow);

        this.head = null;
        this.tail = null;

        this.draw();
    }

    insert(element) {
        let newNode = new VisualSinglyLinkedListElement(element);
        newNode.setXY(leftMargin + boxWidth, this.elementBoxY + (boxHeight / 2));

        if (this.head == null) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.head.incomingArrows = [];
            newNode.setNext(this.head);
            this.head = newNode;
        }

        if (this.physicalDatastructure.numElements === 2) {
            this.tail = this.head.getNext();
            this.tail.addIncomingArrow(this.tailArrow);
        }

        this.head.addIncomingArrow(this.headArrow);
        this.head.updateElementValue();

        this.animator.insertAnimation(element);
    }

    remove(element) {
        this.head.physicalElement = this.physicalDatastructure.head;
        this.tail.physicalElement = this.physicalDatastructure.tail;

        if (this.head.getNext() === null) {
            this.headArrowEnd.addIncomingArrow(this.headArrow);
        } else {
            this.head.getNext().addIncomingArrow(this.headArrow);
        }

        this.animator.removeAnimation(element);

        this.head = this.head.getNext();
    }

    draw() {
        //clearCanvas();
        super.draw();
        if (this.physicalDatastructure.isEmpty()) {
            this.headArrowLabel.setValue("head / tail");
            this.headArrowLabel.draw();
            //drawLabelledArrow("head / tail", 5, leftMargin+boxWidth, elementBoxLabelY, leftMargin+boxWidth, this.elementBoxY-10);
            return;
        }

        if (this.head.physicalElement === this.tail.physicalElement) {
            this.headArrowLabel.setValue("head / tail");
        } else {
            this.headArrowLabel.setValue("head");
            this.tailArrowLabel.setValue("tail");
            this.tailArrowLabel.draw();
        }

        this.headArrowLabel.draw();


        let cur = this.head;
        while (cur != null) {
            cur.draw();
            cur = cur.getNext();
        }
    }
}

class VisualDoublyLinkedList extends VisualDatastructure {
    constructor(datastructure, elementBoxY = topBottomMargin + 90) {
        super(datastructure, elementBoxY);
        this.animator = new VisualDoublyLinkedListAnimator(this);

        this.headArrowLabel = new VisualValue("head / tail");
        this.headArrow = new VisualArrow(0, 10 + boxHeight / 2);
        this.headArrowEnd = new VisualObject();

        this.headArrowLabel.setXY(leftMargin + (boxWidth * 1.5), elementBoxLabelY);
        this.headArrowEnd.setXY(leftMargin + (boxWidth * 1.5), elementBoxY);

        this.headArrowLabel.addOutgoingArrow(this.headArrow);
        this.headArrowEnd.addIncomingArrow(this.headArrow);

        this.tailArrowLabel = new VisualValue("tail");
        this.tailArrow = new VisualArrow(0, 10 + boxHeight / 2);
        //this.tailArrowEnd = new VisualObject(); // Create dummy end point object so that the arrow follows during anim

        this.tailArrowLabel.setXY(leftMargin + (boxWidth * 1.5), elementBoxLabelY);
        //this.tailArrowEnd.setXY(leftMargin+boxWidth, elementBoxY);

        this.tailArrowLabel.addOutgoingArrow(this.tailArrow);
        //this.tailArrowEnd.addIncomingArrow(this.tailArrow);

        /*        this.headArrowLabel = new VisualValue("head / tail");
                this.headArrow = new VisualArrow();
                this.headArrow.setStartXY(leftMargin+boxWidth, elementBoxLabelY);
                this.headArrow.setEndXY(leftMargin+boxWidth, this.elementBoxY);

                this.tailArrow = new VisualArrow();
                this.tailArrow.setStartXY(leftMargin+boxWidth, elementBoxLabelY);
                this.tailArrow.setEndXY(leftMargin+boxWidth, this.elementBoxY);*/

        this.head = null;
        this.tail = null;

        this.draw();
    }

    insert(element) {
        let newNode = new VisualDoublyLinkedListElement(element);
        newNode.setXY(leftMargin + (boxWidth * 1.5) + (boxWidth * 4 * (this.physicalDatastructure.numElements - 1)), this.elementBoxY);

        if (this.tail == null) {
            if (this.head == null) {
                this.head = newNode;
                this.tail = newNode;
                this.head.addIncomingArrow(this.headArrow);
                this.head.updateElementValue();
            } else {
                this.head.incomingArrows = [];
                newNode.setNext(this.head);
                this.head = newNode;
            }
        } else {
            //this.head.incomingArrows = [];


            newNode.setPrev(this.tail);

            /*            newNode.setNext(this.tail.getNext());
                        this.tail.getNext().setPrev(newNode);*/

            this.tail.setNext(newNode);

            console.log(this.tail.getXY());

            this.tail = newNode;

            this.tail.addIncomingArrow(this.tailArrow);

            /*            node.setPrev(prev);
                        node.setNext(prev.getNext());
                        prev.setNext(node);
                        node.getNext().setPrev(node);*/
        }

        /*        if (this.physicalDatastructure.numElements === 2){
                    this.tail = this.head.getNext();
                    this.tail.addIncomingArrow(this.tailArrow);
                }*/

        /*        this.head.addIncomingArrow(this.headArrow);
                this.head.updateElementValue();*/

        this.tail.updateElementValue();
        this.animator.insertAnimation(element);
    }

    remove(element) {
        this.head.physicalElement = this.physicalDatastructure.head;
        this.tail.physicalElement = this.physicalDatastructure.tail;

        if (this.head.getNext() === null) {
            this.headArrowEnd.addIncomingArrow(this.headArrow);
        } else {
            this.head.getNext().addIncomingArrow(this.headArrow);
        }

        this.animator.removeAnimation(element);

        //this.head.getNext().setPrev(null);
        this.head = this.head.getNext();
        if (this.head !== null) {
            this.head.setPrev(null);
        } else {
            this.tail = null;
        }

    }

    draw() {
        //clearCanvas();
        super.draw();
        if (this.physicalDatastructure.isEmpty()) {
            this.headArrowLabel.setValue("head / tail");
            this.headArrowLabel.draw();
            //drawLabelledArrow("head / tail", 5, leftMargin+boxWidth, elementBoxLabelY, leftMargin+boxWidth, this.elementBoxY-10);
            return;
        }

        if (this.head.physicalElement === this.tail.physicalElement) {
            this.headArrowLabel.setValue("head / tail");
        } else {
            this.headArrowLabel.setValue("head");
            this.tailArrowLabel.setValue("tail");
            this.tailArrowLabel.draw();
        }

        this.headArrowLabel.draw();


        let cur = this.head;
        while (cur != null) {
            cur.draw();
            cur = cur.getNext();
        }
    }
}