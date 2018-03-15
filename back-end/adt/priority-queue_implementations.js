class HeapArrayPriorityQueue{
    constructor(size){
        this.dataStructure = new HeapArray(size);
        this.dataStructure.draw();
    }
    insert(element){
        if (this.dataStructure.getNumElements()===this.dataStructure.getSize()){ this.dataStructure.expand(); }

        //let newest = new ArrayElement(element, true);
        // May need to expand content
        this.dataStructure.content[this.dataStructure.getNumElements()].setValue(element);
        //this.dataStructure.setValue(this.dataStructure.getNumElements(), element);
        this.dataStructure.numElements++;
        let j = this.dataStructure.getNumElements()-1;
        while (j > 0){

            let p = this.dataStructure.parent(j);
            // This won't work with strings...
            if (this.dataStructure.content[j].getValue() >= this.dataStructure.content[p].getValue()){
                break;
            }
            this.dataStructure.swap(j, p);
            j = p;
        }
        //return newest;
        this.dataStructure.draw();
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