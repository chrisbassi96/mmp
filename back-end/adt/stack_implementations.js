class SimpleArrayStack{
    constructor(size){
        this.dataStructure = new SimpleArray(size);
    }
    push(element){
        if (this.dataStructure.getNumElements() < this.dataStructure.getSize()){
            this.dataStructure.setElementValue(this.dataStructure.getNumElements(), element);
            this.dataStructure.numElements++;
            outputLabel.innerText = "Push " + element;
        }else{
            outputLabel.innerText = "Stack is full";
        }
        //this.dataStructure.draw();

        // The following is used only for visualization
        return this.dataStructure.numElements-1;
    }
    pop(){
        if (this.dataStructure.isEmpty()){
            return null;
        }
        let element = this.dataStructure.getElementValue(this.dataStructure.getNumElements()-1);
        this.dataStructure.setElementValue(this.dataStructure.getNumElements()-1, null);
        this.dataStructure.numElements--;

        //this.dataStructure.draw();
        return {value:element.getValue(), index:this.dataStructure.getNumElements()};
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
    }
    push(element){
        this.dataStructure.addFirst(new SinglyLinkedListNode(element,null));
        outputLabel.innerText = "Pushed " + element;
    }
    pop(){
        if (this.dataStructure.isEmpty()) {
            outputLabel.innerText = "Stack is empty";
            return;
        }
        outputLabel.innerText = "Popped " + this.dataStructure.removeFirst();
        //this.adt.draw();
    }
    peek(){
        outputLabel.innerText = this.dataStructure.getFirst();
    }
}

class VisualSimpleArrayStack{

}