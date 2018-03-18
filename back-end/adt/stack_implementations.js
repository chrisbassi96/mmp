class SimpleArrayStack{
    constructor(size){
        this.dataStructure = new SimpleArray(size);
        this.dataStructure.draw();
    }
    push(element){
        if (this.dataStructure.getNumElements() < this.dataStructure.getSize()){
            this.dataStructure.setValue(this.dataStructure.getNumElements(), element);
            this.dataStructure.numElements++;
            outputLabel.innerText = "Pushed " + element;
        }else{
            outputLabel.innerText = "Stack is full";
        }
        this.dataStructure.draw();
    }
    pop(){
        if (this.dataStructure.isEmpty()){
            outputLabel.innerText = "Stack is empty";
            return;
        }
        let element = this.dataStructure.getElementValue(this.dataStructure.getNumElements()-1);
        this.dataStructure.setValue(this.dataStructure.getNumElements()-1, null);
        this.dataStructure.numElements--;
        outputLabel.innerText = "Popped " + element;
        this.dataStructure.draw();
    }
    peek(){
        if (this.dataStructure.isEmpty()) {
            outputLabel.innerText = "Stack is empty";
            return;
        }
        outputLabel.innerText = this.dataStructure.getElementValue(this.dataStructure.getNumElements()-1);
        this.dataStructure.draw();
    }
}

class SinglyLinkedListStack{
    constructor(){
        this.dataStructure = new SinglyLinkedList();
        //this.dataStructure.draw();
    }
    push(element){
        this.dataStructure.addFirst(new SinglyLinkedListNode(element,null));
    }
    pop(){
        if (this.dataStructure.isEmpty()) {
            outputLabel.innerText = "Stack is empty";
            return;
        }
        this.dataStructure.removeFirst();
        //this.dataStructure.draw();
    }
    peek(){
        outputLabel.innerText = this.dataStructure.getFirst();
    }
}