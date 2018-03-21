class CircularArrayQueue{
    constructor(size){
        this.dataStructure = new CircularArray(size);
        this.dataStructure.draw();
    }
    enqueue(element){
        if (this.dataStructure.getNumElements() < this.dataStructure.getSize()){
            this.dataStructure.setTail((this.dataStructure.getHead() + this.dataStructure.getNumElements()) % this.dataStructure.getSize());
            let avail = (this.dataStructure.getHead() + this.dataStructure.getNumElements()) % this.dataStructure.getSize();
            //console.log(avail);
            //this.dataStructure.setElementValue(avail, element);
            this.dataStructure.setElementValue(avail, element);
            this.dataStructure.numElements += 1;
            this.dataStructure.setTail((this.dataStructure.getHead() + this.dataStructure.getNumElements()) % this.dataStructure.getSize());

            outputLabel.innerText = "Enqueue " + element;
        }else{
            outputLabel.innerText = "Queue is full";
        }

        this.dataStructure.draw();
    }
    dequeue(){
        if (this.dataStructure.isEmpty()){
            outputLabel.innerText = "Queue is empty";
            return;
        }
        let element = this.dataStructure.getElementValue(this.dataStructure.getHead());
        this.dataStructure.setElementValue(this.dataStructure.getHead(), null);

        this.dataStructure.setHead((this.dataStructure.getHead()+1)%this.dataStructure.getSize());
        this.dataStructure.numElements--;
        outputLabel.innerText = "Dequeue " + element;
        this.dataStructure.draw();
    }
    peek(){
        if (this.dataStructure.isEmpty()) {
            outputLabel.innerText = "Queue is empty";
            return;
        }
        outputLabel.innerText = this.dataStructure.getElementValue(this.dataStructure.getHead());
        this.dataStructure.draw();
    }
}

class DoublyLinkedListQueue{
    constructor(){
        this.dataStructure = new DoublyLinkedList();
        this.dataStructure.draw();
    }
    push(element){
        this.dataStructure.addLast(new DoublyLinkedListNode(element, null));
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