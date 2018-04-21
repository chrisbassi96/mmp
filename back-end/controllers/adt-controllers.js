class AdtController{
    constructor(adt, visualDatastructure){
        this.adt = adt;
        this.visualDatastructure = visualDatastructure;
    }
}

class StackController extends AdtController{
    constructor(adt, visualDatastructure){
        super(adt, visualDatastructure);
    }
    push(value){
        let pushedElement = this.adt.push(value);

        if (pushedElement==null){
            outputLabel.innerText = "Stack is full";
        }else{
            outputLabel.innerText = "Push " + pushedElement.value;
            this.visualDatastructure.insert(pushedElement);
        }
    }
    pop(){
        let poppedElement = this.adt.pop();

        if (poppedElement==null){
            outputLabel.innerText = "Stack is empty";
        }else{
            outputLabel.innerText = "Pop " + poppedElement.value;
            this.visualDatastructure.remove(poppedElement);
        }
    }
    peek(){
        let result = this.adt.peek();

        if (result==null){
            outputLabel.innerText = "Stack is empty";
        }else{
            outputLabel.innerText = result;
        }
    }
}

class QueueController extends AdtController{
    constructor(adt, visualDatastructure){
        super(adt, visualDatastructure);
    }
    enqueue(value){
        let enqueuedElement = this.adt.enqueue(value);

        if (enqueuedElement==null){
            outputLabel.innerText = "Queue is full";
        }else{
            outputLabel.innerText = "Enqueue " + enqueuedElement.value;
            this.visualDatastructure.insert(enqueuedElement);
        }
    }
    dequeue(){
        let dequeuedElement = this.adt.dequeue();

        if (dequeuedElement==null){
            outputLabel.innerText = "Queue is empty";
        }else{
            outputLabel.innerText = "Dequeue " + dequeuedElement.value;
            this.visualDatastructure.remove(dequeuedElement);
        }
    }
    peek(){
        let peek = this.adt.peek();

        if (peek == null){
            outputLabel.innerText = "Queue is empty";
        }else{
            outputLabel.innerText = peek;
        }
    }
}

class PriorityQueueController extends  AdtController{
    constructor(adt, visualDatastructure){
        super(adt, visualDatastructure);
    }
    insert(element){
        let insertedElement = this.adt.insert(element);

        if (insertedElement == null){

        }else{
            outputLabel.innerText = "Insert " + element;
            this.visualDatastructure.insert(insertedElement);
        }
    }
    removeMin(){
        let removedMinElement = this.adt.removeMin();

        if (removedMinElement == null){
            outputLabel.innerText = "Priority Queue is empty";
        }else{

        }
    }
}

