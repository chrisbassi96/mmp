class CircularArrayQueue {
    constructor(size) {
        this.datastructure = new CircularArray(size);
    }

    enqueue(elementValue) {
        if (this.datastructure.isFull()) {
            return null;
        }

        let avail = (this.datastructure.getHead() + this.datastructure.getNumElements()) % this.datastructure.getSize();

        this.datastructure.setTail(avail);
        this.datastructure.setElementValue(avail, elementValue);

        this.datastructure.numElements++;

        this.datastructure.setTail((this.datastructure.getHead() + this.datastructure.getNumElements()) % this.datastructure.getSize());

        return {value: elementValue, index: avail};
    }

    dequeue() {
        if (this.datastructure.isEmpty()) {
            return null;
        }

        let headIndex = this.datastructure.getHead();
        let headElementValue = this.datastructure.getElement(headIndex).getValue();

        this.datastructure.setElementValue(headIndex, null);

        this.datastructure.setHead((headIndex + 1) % this.datastructure.getSize());
        this.datastructure.numElements--;

        return {value: headElementValue, index: headIndex};
    }

    peek() {
        if (this.datastructure.isEmpty()) {
            return null;
        }

        return this.datastructure.getElement(this.datastructure.getHead()).getValue();
    }
}

class DoublyLinkedListQueue {
    constructor() {
        this.datastructure = new DoublyLinkedList();
    }

    enqueue(elementValue) {
        let newNode = new DoublyLinkedListElement(elementValue);

        this.datastructure.addLast(newNode);

        return newNode;
    }

    dequeue() {
        if (this.datastructure.isEmpty()) {
            return null;
        }

        let dequeuedElementValue = this.datastructure.head.getValue();

        this.datastructure.removeFirst();

        return {value: dequeuedElementValue};
    }

    peek() {
        if (this.datastructure.isEmpty()){
            return null;
        }

        return this.datastructure.getFirst().getValue();
    }
}