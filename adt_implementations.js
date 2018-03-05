class SimpleArrayStack{
    constructor(){
        this.dataStructure = new SimpleArray();
        this.dataStructure.draw();
    }
    push(element){
        if (this.dataStructure.getNumElements() < this.dataStructure.getSize()){
            this.dataStructure.setValue(this.dataStructure.getNumElements(), element);
            outputLabel.innerText = "Element inserted";
        }else{
            outputLabel.innerText = "Stack is full";
        }
        this.dataStructure.draw();
/*        if (this.content.length < this.size){
            this.changeIndexValue(this.elements, element);
            this.elements++;
            outputLabel.innerText = "Element inserted"
        }else{
            outputLabel.innerText = "Stack is full"
        }*/
    }
    pop(){
        if (this.dataStructure.isEmpty()){
            outputLabel.innerText = "Stack is empty";
            return;
        }
        let element = this.dataStructure.getElement(this.dataStructure.getNumElements()-1);
        this.dataStructure.setValue(this.dataStructure.getNumElements()-1, null);
        outputLabel.innerText = "Element removed";
        this.dataStructure.draw();
    }
    peek(){
        if (this.isEmpty()) {
            outputLabel.innerText = "Stack is empty";
            return;
        }
        outputLabel.innerText = this.dataStructure.getElement(this.dataStructure.getNumElements()-1);
        this.dataStructure.draw();
    }
}