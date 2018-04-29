class HeapArrayPriorityQueue{
    constructor(size){
        this.datastructure = new HeapArray(size);
    }
    insert(elementValue){
        if (this.datastructure.getNumElements()===this.datastructure.getSize()){ this.datastructure.expand(); }

        this.datastructure.content[this.datastructure.getNumElements()].setValue(elementValue);
        this.datastructure.numElements = this.datastructure.numElements + 1;

        let j = this.datastructure.getNumElements()-1;

        while (j > 0){
            let p = HeapArray.parent(j);

            console.log("parent: " + p);
            // This won't work with strings...
            if (this.datastructure.content[j].getValue() >= this.datastructure.content[p].getValue()){
                break;
            }
            this.datastructure.swap(j, p);
            j = p;
        }

        return {value: elementValue, index: this.datastructure.getNumElements()-1};
    }
    removeMin(){
        if (this.datastructure.isEmpty()){
            outputLabel.innerText = "Queue is empty";
            return;
        }

        return {value: element, index: (this.datastructure.getHead()-1)%this.datastructure.getSize()};
    }
    getMin(){
        if (this.datastructure.isEmpty()) {
            outputLabel.innerText = "Queue is empty";
            return;
        }
        outputLabel.innerText = this.datastructure.getElement(this.datastructure.getHead());
        this.datastructure.draw();
    }
}