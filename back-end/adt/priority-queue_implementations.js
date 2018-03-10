class HeapArrayPriorityQueue{
    constructor(size){
        this.dataStructure = new HeapArray(size);
        this.dataStructure.draw();
    }
    insert(element){
        if (this.dataStructure.getNumElements() < this.dataStructure.getSize()){
            this.dataStructure.setTail((this.dataStructure.getHead() + this.dataStructure.getNumElements()) % this.dataStructure.getSize());
            let avail = (this.dataStructure.getHead() + this.dataStructure.getNumElements()) % this.dataStructure.getSize();
            //console.log(avail);
            //this.dataStructure.setValue(avail, element);
            this.dataStructure.setValue(avail, element);
            this.dataStructure.setTail((this.dataStructure.getHead() + this.dataStructure.getNumElements()) % this.dataStructure.getSize());
            outputLabel.innerText = "Element inserted";
        }else{
            outputLabel.innerText = "Queue is full";
        }
        this.dataStructure.draw();
    }
    removeMin(){
        if (this.dataStructure.isEmpty()){
            outputLabel.innerText = "Queue is empty";
            return;
        }
        let element = this.dataStructure.getElement(this.dataStructure.getHead());
        this.dataStructure.setValue(this.dataStructure.getHead(), null);
        this.dataStructure.setHead((this.dataStructure.getHead()+1)%this.dataStructure.getSize());
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