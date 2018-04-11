class HeapArrayPriorityQueue{
    constructor(size){
        this.dataStructure = new HeapArray(size);
    }
    insert(element){
        if (this.dataStructure.getNumElements()===this.dataStructure.getSize()){ this.dataStructure.expand(); }

        //this.datastructure.visualDatastructure[this.datastructure.getNumElements()].visualValue = element;
        this.dataStructure.content[this.dataStructure.getNumElements()].setValue(element);
        this.dataStructure.numElements = this.dataStructure.numElements + 1;
        let j = this.dataStructure.getNumElements()-1;

        while (j > 0){
            let p = HeapArray.parent(j);

            console.log("parent: " + p);
            // This won't work with strings...
            if (this.dataStructure.content[j].getValue() >= this.dataStructure.content[p].getValue()){
                break;
            }
            this.dataStructure.swap(j, p);
            j = p;
        }

        return {value: element, index: this.dataStructure.getNumElements()-1};
    }
    removeMin(){
        if (this.dataStructure.isEmpty()){
            outputLabel.innerText = "Queue is empty";
            return;
        }

        this.dataStructure.draw();
    }
    getMin(){
        if (this.dataStructure.isEmpty()) {
            outputLabel.innerText = "Queue is empty";
            return;
        }
        outputLabel.innerText = this.dataStructure.getElement(this.dataStructure.getHead());
        this.dataStructure.draw();
    }
}