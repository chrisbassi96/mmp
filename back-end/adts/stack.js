class SimpleArrayStack{
    constructor(size){
        this.datastructure = new SimpleArray(size);
    }
    push(elementValue){
        if (this.datastructure.getNumElements() < this.datastructure.getSize()){
            this.datastructure.setElementValue(this.datastructure.getNumElements(), elementValue);
            this.datastructure.numElements++;

            // The following is used only for visualization
            return {value: elementValue, index:this.datastructure.numElements-1};
        }

        // The following is used only for visualization
        return null;
    }
    pop(){
        if (this.datastructure.isEmpty()){
            return null;
        }
        let poppedElementValue = this.datastructure.getElement(this.datastructure.getNumElements()-1).getValue();
        //let element = this.datastructure.getElementValue(this.datastructure.getNumElements()-1);
        this.datastructure.setElementValue(this.datastructure.getNumElements()-1, null);
        this.datastructure.numElements--;

        //this.datastructure.draw();
        return {value: poppedElementValue, index: this.datastructure.getNumElements()};
    }
    peek(){
        if (this.datastructure.isEmpty()) {
            return null;
        }

        //this.datastructure.draw();
        return this.datastructure.getElement(this.datastructure.getNumElements()-1).getValue();
    }
}

class SinglyLinkedListStack{
    constructor(){
        this.datastructure = new SinglyLinkedList();
    }
    push(elementValue){
        let newNode = new SinglyLinkedListElement(elementValue, null);

        this.datastructure.addFirst(newNode);
        //outputLabel.innerText = "Pushed " + elementValue;

        return newNode;
    }
    pop(){
        if (this.datastructure.isEmpty()) {
            return null;
        }

        let poppedElementValue = this.datastructure.head.getValue();

        this.datastructure.removeFirst();

        return {value: poppedElementValue};
    }
    peek(){
        outputLabel.innerText = this.datastructure.getFirst();
    }
}