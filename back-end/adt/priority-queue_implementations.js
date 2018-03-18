class HeapArrayPriorityQueue{
    constructor(size){
        this.dataStructure = new HeapArray(size);
        this.dataStructure.draw();
    }
    insert(element){
        if (this.dataStructure.getNumElements()===this.dataStructure.getSize()){ this.dataStructure.expand(); }

        //let newest = new ArrayElement(element, true);
        this.dataStructure.content[this.dataStructure.getNumElements()].value = element;
        //this.dataStructure.setValue(this.dataStructure.getNumElements(), element);

        //this.dataStructure.setValue(this.dataStructure.getNumElements(), element);
        this.dataStructure.numElements = this.dataStructure.numElements + 1; // Not working...
        let j = this.dataStructure.getNumElements()-1;
        console.log("num elements: " + this.dataStructure.getNumElements());
        console.log("current: " + j);

        // This needs refactoring...
/*        if (this.dataStructure.getNumElements() !== 1){
            let goRight = Boolean(this.dataStructure.getNumElements()%2!==0);
            let p = this.dataStructure.getElement(this.dataStructure.parent(j));
            let parentTreeX = p.getTreeX();
            let parentTreeY = p.getTreeY();
            console.log(j + " " + p);
            if (goRight){
                this.dataStructure.content[j].setTreeXY(parentTreeX+20+20+20, parentTreeY+20+20+20);
            }else{
                this.dataStructure.content[j].setTreeXY(parentTreeX-20-20-20, parentTreeY+20+20+20);
            }
        }else{
            this.dataStructure.content[j].setTreeXY(canvas.width / 2, canvas.height / 2);
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
        outputLabel.innerText = "Insert " + element;
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