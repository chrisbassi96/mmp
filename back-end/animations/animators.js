class VisualSimpleArrayAnimator{
    constructor(visualSimpleArray){
        this.visualDatastructure = visualSimpleArray;
    }
    moveIntoVisualDatastructure(element){
        let stage0 = new AnimationSequence();
        stage0.executeConcurrently = true;

        this.animationMoveIntoVisualDatastructure(element, stage0);

        animationSequencer.add(stage0);

        animationSequencer.go();
    }
    animationMoveIntoVisualDatastructure(element, stageToAddTo){
        // Setup for animation stage
        stageToAddTo.doNotDraw(this.visualDatastructure.getElement(element.index));

        // Declaration of objects involved in the animation stage
        let tempElement = new VisualArrayElement(null, element.index, this.showIndex);
        let headValue = new VisualValue(this.visualDatastructure.getElement(element.index).physicalElement.getValue());

        stageToAddTo.addTempObject(tempElement);
        stageToAddTo.addTempObject(headValue);

        console.log(element.index);

        let stage0coordsSetTempElement = new CoordSet();
        stage0coordsSetTempElement.setFromXY(this.visualDatastructure.getElement(element.index).getXY()[0], this.visualDatastructure.getElement(element.index).getXY()[1]);
        stage0coordsSetTempElement.setToXY(this.visualDatastructure.getElement(element.index).getXY()[0], this.visualDatastructure.getElement(element.index).getXY()[1]);

        let stage0coordsSet2 = new CoordSet();
        stage0coordsSet2.setFromXY(leftMargin + elementBoxWidth, canvas.height - topBottomMargin);
        stage0coordsSet2.setToXY(this.visualDatastructure.getElement(element.index).getXY()[0], this.visualDatastructure.getElement(element.index).getXY()[1]);

        stageToAddTo.add(tempElement, stage0coordsSetTempElement, new MoveNoFade());
        stageToAddTo.add(headValue, stage0coordsSet2, new MoveNoFade());
    }
    moveOutOfDatastructure(element){
        console.log(element);
        this.visualDatastructure.getElement(element.index).updateElementValue(); // Get the current visualValue from physical datastructure
        //this.visualDatastructure[index].update();
        this.visualDatastructure.getElement(element.index).setIndex(element.index); // Update index
        //this.visualDatastructure[index].setOldMiddleXY(leftMargin, canvas.height - topBottomMargin);

        console.log("outElement value:" + element.value);
        console.log("outElement index:" + element.index);

        let stage0 = new AnimationSequence();

        let poppedElement = new VisualValue(element.value);

        stage0.addTempObject(poppedElement);

        let stage0coordsSetPoppedElement = new CoordSet();
        stage0coordsSetPoppedElement.setFromXY(this.visualDatastructure.getElement(element.index).getXY()[0], this.visualDatastructure.getElement(element.index).getXY()[1]);
        stage0coordsSetPoppedElement.setToXY(canvas.width - leftMargin, canvas.height-topBottomMargin);

        stage0.add(poppedElement, stage0coordsSetPoppedElement, new MoveFadeOut());

        animationSequencer.add(stage0);

        animationSequencer.go();
    }
}

class VisualHeapArrayAnimator extends VisualSimpleArrayAnimator{
    constructor(visualHeapArray){
        super(visualHeapArray);
    }
    animationMoveIntoVisualDatastructure(element, stageToAddTo){
        super.animationMoveIntoVisualDatastructure(element, stageToAddTo);

        let stage0coordsSet2 = new CoordSet();
        stage0coordsSet2.setFromXY(this.visualDatastructure.getTreeElement(element.index).getXY()[0], this.visualDatastructure.getTreeElement(element.index).getXY()[1]);
        stage0coordsSet2.setToXY(this.visualDatastructure.getTreeElement(element.index).getXY()[0], this.visualDatastructure.getTreeElement(element.index).getXY()[1]);

        stageToAddTo.add(this.visualDatastructure.getTreeElement(element.index), stage0coordsSet2, new MoveFadeIn());
    }
    swap(i, j){
        let stage0 = new AnimationSequence();
        stage0.executeConcurrently = true;

        this.animationMoveIntoVisualDatastructure(element, stage0);

        animationSequencer.add(stage0);



        this.visualDatastructure.content[this.datastructure.getNumElements()].setValue(element);
        //this.visualDatastructure.numElements = this.datastructure.numElements + 1;
        //let j = this.datastructure.getNumElements()-1;

        while (j > 0){
            let p = HeapArray.parent(j);

            console.log("parent: " + p);
            // This won't work with strings...
            if (this.visualDatastructure.content[j].getValue() >= this.visualDatastructure.content[p].getValue()){
                break;
            }
            this.datastructure.swap(j, p);
            j = p;
        }
    }
}