class CircularArrayQueue{
    constructor(size){
        this.dataStructure = new CircularArray(size);
    }
    enqueue(elementValue){
        if (this.dataStructure.getNumElements() < this.dataStructure.getSize()){

            let avail = (this.dataStructure.getHead() + this.dataStructure.getNumElements()) % this.dataStructure.getSize();
            this.dataStructure.setTail(avail);
            //console.log(avail);
            //this.adts.setElementValue(avail, elementValue);
            this.dataStructure.setElementValue(avail, elementValue);
            this.dataStructure.numElements += 1;
            this.dataStructure.setTail((this.dataStructure.getHead() + this.dataStructure.getNumElements()) % this.dataStructure.getSize());

            return {value: elementValue, index: avail};
        }
        return null;
    }
    dequeue(){
        if (this.dataStructure.isEmpty()){
            return null;
        }

        let element = this.dataStructure.getElement(this.dataStructure.getHead()).getValue();
        this.dataStructure.setElementValue(this.dataStructure.getHead(), null);

        this.dataStructure.setHead((this.dataStructure.getHead()+1)%this.dataStructure.getSize());
        this.dataStructure.numElements--;

        return {value: element, index: (this.dataStructure.getHead()-1)%this.dataStructure.getSize()};
    }
    peek(){
        if (this.dataStructure.isEmpty()) {
            return null;
        }

        return this.dataStructure.getElement(this.dataStructure.getHead()).getValue();
    }
}

class DoublyLinkedListQueue{
    constructor(){
        this.dataStructure = new DoublyLinkedList();
    }
    push(element){
        this.dataStructure.addLast(new DoublyLinkedListElement(element, null));
    }
    pop(){
        if (this.dataStructure.isEmpty()) {
            outputLabel.innerText = "Stack is empty";
            return;
        }
        this.dataStructure.removeFirst();
        this.dataStructure.draw();
    }
    peek(){
        outputLabel.innerText = this.dataStructure.getFirst();
    }
}