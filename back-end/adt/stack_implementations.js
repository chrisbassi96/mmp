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
        let element = this.dataStructure.getElement(this.dataStructure.getNumElements()-1);
        //let element = this.dataStructure.getElementValue(this.dataStructure.getNumElements()-1);
        this.dataStructure.setElementValue(this.dataStructure.getNumElements()-1, null);
        this.dataStructure.numElements--;

        //this.dataStructure.draw();
        return {elementValue: element.getValue(), index: this.dataStructure.getNumElements()};
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
        //  return {visualValue:};
    }
    pop(){
        if (this.dataStructure.isEmpty()) {
            return null;
        }

        outputLabel.innerText = "Popped " + this.dataStructure.removeFirst();


        return this.dataStructure.removeFirst();


        //this.adt.draw();
    }
    peek(){
        outputLabel.innerText = this.dataStructure.getFirst();
    }
}

class VisualSimpleArrayStack{

}