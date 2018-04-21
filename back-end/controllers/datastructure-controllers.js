class DatastructureController{
    constructor(datastructure, elementBoxY=topBottomMargin+elementBoxHeight, showIndex=false){
        this.datastructure = datastructure;
        //this.elementBoxY = elementBoxY;
        //this.showIndex = showIndex;
        this.visualDatastructure = null;
        this.visualDatastructureAnimator = null

    }
    insertIntoVisualDatastructure(element){
        this.visualDatastructure.insertProcess(element);
        this.visualDatastructureAnimator.insertProcess(element);
    }
    removeFromVisualDatastructure(element) {
        //this.visualDatastructure.removeProcess(element);
        this.visualDatastructureAnimator.removeProcess(element);
    }
    moveThroughDatatructure(){

    }
    draw(){
        this.visualDatastructure.draw();
    }
}

class SimpleArrayController extends DatastructureController{
    constructor(datastructure, elementBoxY=topBottomMargin+elementBoxHeight, showIndex=false){
        super(datastructure, elementBoxY, showIndex);
        this.visualDatastructure = new VisualSimpleArray(this.datastructure, elementBoxY, showIndex);
        this.visualDatastructureAnimator = new VisualSimpleArrayAnimator(this.visualDatastructure);
    }
}

class HeapArrayController extends DatastructureController{
    constructor(datastructure, elementBoxY=topBottomMargin+elementBoxHeight, showIndex=false){
        super(datastructure, elementBoxY, showIndex);
        this.visualDatastructure = new VisualHeapArray(this.datastructure, elementBoxY, showIndex);
        this.visualDatastructureAnimator = new VisualHeapArrayAnimator(this.visualDatastructure);
    }
}

class CircularArrayController extends SimpleArrayController {
    constructor(datastructure, elementBoxY = topBottomMargin + 90, showIndex = false) {
        super(datastructure, elementBoxY, showIndex);
        this.visualDatastructure = new VisualCircularArray(this.datastructure, elementBoxY, showIndex);
        this.visualDatastructureAnimator = new VisualCircularArrayAnimator(this.visualDatastructure);
    }
}