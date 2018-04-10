class SimpleArrayStack{
    constructor(size){
        this.dataStructure = new SimpleArray(size);
    }
    push(elementValue){
        if (this.dataStructure.getNumElements() < this.dataStructure.getSize()){
            this.dataStructure.setElementValue(this.dataStructure.getNumElements(), elementValue);
            this.dataStructure.numElements++;

            // The following is used only for visualization
            return {value: elementValue, index:this.dataStructure.numElements-1};
        }

        // The following is used only for visualization
        return null;

        //this.dataStructure.draw();
    }
    pop(){
        if (this.dataStructure.isEmpty()){
            return null;
        }
        let poppedElementValue = this.dataStructure.getElement(this.dataStructure.getNumElements()-1).getValue();
        //let element = this.dataStructure.getElementValue(this.dataStructure.getNumElements()-1);
        this.dataStructure.setElementValue(this.dataStructure.getNumElements()-1, null);
        this.dataStructure.numElements--;

        //this.dataStructure.draw();
        return {value: poppedElementValue, index: this.dataStructure.getNumElements()};
    }
    peek(){
        if (this.dataStructure.isEmpty()) {
            return null;
        }

        //this.dataStructure.draw();
        return this.dataStructure.getElement(this.dataStructure.getNumElements()-1).getValue();
    }
}

class SinglyLinkedListStack{
    constructor(){
        this.dataStructure = new SinglyLinkedList();
    }
    push(elementValue){
        let newNode = new SinglyLinkedListNode(elementValue, null);

        this.dataStructure.addFirst(newNode);
        outputLabel.innerText = "Pushed " + elementValue;

        return newNode;
    }
    pop(){
        if (this.dataStructure.isEmpty()) {
            return null;
        }

        let poppedElementValue = this.dataStructure.head.getValue();

        this.dataStructure.removeFirst();

        return {value: poppedElementValue};
    }
    peek(){
        outputLabel.innerText = this.dataStructure.getFirst();
    }
}