class HeapArrayPriorityQueue{
    constructor(size){
        this.dataStructure = new HeapArray(size);
        this.dataStructure.draw();
    }
    insert(element){
        if (this.dataStructure.getNumElements()===this.dataStructure.getSize()){ this.dataStructure.expand(); }

        //let newest = new ArrayElement(element, true);
        this.dataStructure.content[this.dataStructure.getNumElements()].setValue(element);

        //this.dataStructure.setValue(this.dataStructure.getNumElements(), element);
        this.dataStructure.numElements++;
        let j = this.dataStructure.getNumElements()-1;

        // This needs refactoring...
        if (this.dataStructure.getNumElements() !== 1){
            let goLeft = Boolean(this.dataStructure.getNumElements()%2===0);
            let p = this.dataStructure.parent(j);
            console.log(j + " " + p);
            if (!goLeft){
                this.dataStructure.content[j].setTreeXY(this.dataStructure.content[p].getTreeX()+20, this.dataStructure.content[p].getTreeY()+20);
            }else{
                this.dataStructure.content[j].setTreeXY(this.dataStructure.content[p].getTreeX()-20, this.dataStructure.content[p].getTreeY()+20);
            }
        }else{
            this.dataStructure.content[j].setTreeXY(canvas.width / 2, canvas.height / 2);
        }



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