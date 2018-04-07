class HeapArrayPriorityQueue{
    constructor(size){
        this.dataStructure = new HeapArray(size);
    }
    insert(element){
        if (this.dataStructure.getNumElements()===this.dataStructure.getSize()){ this.dataStructure.expand(); }

        //this.dataStructure.visualContent[this.dataStructure.getNumElements()].visualValue = element;
        this.dataStructure.content[this.dataStructure.getNumElements()].setValue(element);
        this.dataStructure.numElements = this.dataStructure.numElements + 1;
        let j = this.dataStructure.getNumElements()-1;

        // This needs refactoring...
/*        if (this.adt.getNumElements() !== 1){
            let goRight = Boolean(this.adt.getNumElements()%2!==0);
            let p = this.adt.getValue(this.adt.parent(j));
            let parentTreeX = p.getTreeX();
            let parentTreeY = p.getTreeY();
            console.log(j + " " + p);
            if (goRight){
                this.adt.visualContent[j].setTreeXY(parentTreeX+20+20+20, parentTreeY+20+20+20);
            }else{
                this.adt.visualContent[j].setTreeXY(parentTreeX-20-20-20, parentTreeY+20+20+20);
            }
        }else{
            this.adt.visualContent[j].setTreeXY(canvas.width / 2, canvas.height / 2);
        }*/

        while (j > 0){

            let p = this.dataStructure.parent(j);

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