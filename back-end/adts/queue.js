class CircularArrayQueue{
    constructor(size){
        this.datastructure = new CircularArray(size);
    }
    enqueue(elementValue){
        if (this.datastructure.getNumElements() < this.datastructure.getSize()){
            console.log(this.datastructure.getNumElements() + " " + this.datastructure.getSize());
            let avail = (this.datastructure.getHead() + this.datastructure.getNumElements()) % this.datastructure.getSize();
            this.datastructure.setTail(avail);
            //console.log(avail);
            //this.adts.setElementValue(avail, elementValue);
            this.datastructure.setElementValue(avail, elementValue);
            this.datastructure.numElements += 1;
            this.datastructure.setTail((this.datastructure.getHead() + this.datastructure.getNumElements()) % this.datastructure.getSize());

            return {value: elementValue, index: avail};
        }
        return null;
    }
    dequeue(){
        if (this.datastructure.isEmpty()){
            return null;
        }

        let element = this.datastructure.getElement(this.datastructure.getHead()).getValue();
        let oldHead = this.datastructure.getHead();

        this.datastructure.setElementValue(this.datastructure.getHead(), null);

        this.datastructure.setHead((this.datastructure.getHead()+1)%this.datastructure.getSize());
        this.datastructure.numElements--;

        return {value: element, index: oldHead};
    }
    peek(){
        if (this.datastructure.isEmpty()) {
            return null;
        }

        return this.datastructure.getElement(this.datastructure.getHead()).getValue();
    }
}

class DoublyLinkedListQueue{
    constructor(){
        this.datastructure = new DoublyLinkedList();
    }
    enqueue(elementValue){
        let newNode = new DoublyLinkedListElement(elementValue);

        this.datastructure.addLast(newNode);
        console.log(newNode);

        return newNode;
    }
    dequeue(){
        if (this.datastructure.isEmpty()) {
            return null;
        }

        let dequeuedElementValue = this.datastructure.head.getValue();

        this.datastructure.removeFirst();

        return {value: dequeuedElementValue};
    }
    peek(){
        outputLabel.innerText = this.datastructure.getFirst();
    }
}