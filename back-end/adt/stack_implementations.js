class SimpleArrayStack{
    constructor(size){
        this.dataStructure = new SimpleArray(size);
    }
    push(element){
        if (this.dataStructure.getNumElements() < this.dataStructure.getSize()){
            this.dataStructure.setElementValue(this.dataStructure.getNumElements(), element);
            this.dataStructure.numElements++;

            // The following is used only for visualization
            return {value:element, index:this.dataStructure.numElements-1};
        }

        // The following is used only for visualization
        return null;

        //this.dataStructure.draw();
    }
    pop(){
        if (this.dataStructure.isEmpty()){
            return null;
        }
        let element = this.dataStructure.getElement(this.dataStructure.getNumElements()-1).getValue();
        //let element = this.dataStructure.getElementValue(this.dataStructure.getNumElements()-1);
        this.dataStructure.setElementValue(this.dataStructure.getNumElements()-1, null);
        this.dataStructure.numElements--;

        //this.dataStructure.draw();
        return {element: element, index: this.dataStructure.getNumElements()};
    }
    peek(){
        if (this.dataStructure.isEmpty()) {
            return null;
        }

        //this.dataStructure.draw();
        return this.dataStructure.getElementValue(this.dataStructure.getNumElements()-1);
    }
}

class SinglyLinkedListStack{
    constructor(){
        this.dataStructure = new SinglyLinkedList();
    }
    push(element){
        let newNode = new SinglyLinkedListNode(element, null);

        this.dataStructure.addFirst(newNode);
        outputLabel.innerText = "Pushed " + element;

        return newNode;
    }
    pop(){
        if (this.dataStructure.isEmpty()) {
            return null;
        }

        let poppedElement = this.dataStructure.head.getValue();

        this.dataStructure.removeFirst();

        return {element: poppedElement};
    }
    peek(){
        outputLabel.innerText = this.dataStructure.getFirst();
    }
}