class VisualDatastructureAnimator{
    constructor(visualSimpleArray){
        this.visualDatastructure = visualSimpleArray;
    }
}

class VisualSimpleArrayAnimator extends VisualDatastructureAnimator{
    constructor(visualSimpleArray){
        super(visualSimpleArray);
    }
    insertAnimation(element){
        let sequence = this.animationMoveIntoDatastructure(element);

        animationSequencer.go();
    }
    animationMoveIntoDatastructure(element){
        let stage0 = new AnimationSequence();

        // The headValue needs to move from the bottom into the element
        let stage0CoordsSetValue = new CoordSet();
        stage0CoordsSetValue.setFromXY(leftMargin + boxWidth, canvas.height - topBottomMargin);
        stage0CoordsSetValue.setToXY(this.visualDatastructure.getElement(element.index).getXY()[0], this.visualDatastructure.getElement(element.index).getXY()[1]);

        // Add objects to animated to AnimationSequence
        //stage0.add(tempElement, stage0CoordSetTempElement, new MoveNoFade());
        //stage0.add(headValue, stage0CoordsSetValue, new MoveNoFade());
        stage0.add(this.visualDatastructure.getElement(element.index).visualValue, stage0CoordsSetValue, new MoveNoFade());

        animationSequencer.add(stage0);

        return stage0;
    }
    removeAnimation(element){
        let stage0 = new AnimationSequence();
        stage0.executeConcurrently = true;

        this.visualDatastructure.getElement(element.index).updateElementValue(); // Get the current visualValue from physical datastructure
        this.visualDatastructure.getElement(element.index).setIndex(element.index); // Update index

        this.animationMoveOutOfDatastructure(element, stage0);

        animationSequencer.add(stage0);

        animationSequencer.go();
    }
    animationMoveOutOfDatastructure(element, stageToAddTo){
        let poppedElement = new VisualValue(element.value);

        stageToAddTo.addTempObject(poppedElement);

        let stage0coordsSetPoppedElement = new CoordSet();
        stage0coordsSetPoppedElement.setFromXY(this.visualDatastructure.getElement(element.index).getXY()[0], this.visualDatastructure.getElement(element.index).getXY()[1]);
        stage0coordsSetPoppedElement.setToXY(canvas.width - leftMargin, canvas.height-topBottomMargin);

        stageToAddTo.add(poppedElement, stage0coordsSetPoppedElement, new MoveFadeOut());
    }
}

class VisualCircularArrayAnimator extends VisualSimpleArrayAnimator{
    constructor(visualCircularArray){
        super(visualCircularArray);
    }
    animationMoveIntoDatastructure(element){
        let sequence = super.animationMoveIntoDatastructure(element);
        sequence.executeConcurrently = true;

        // If data structure is full, do not move tail
        if (this.visualDatastructure.physicalDatastructure.tail === 0 && this.visualDatastructure.physicalDatastructure.isFull()){
            //adtController.visualDatastructure.draw();
            //return;
        }



        let tailArrowLabel = this.visualDatastructure.tailArrowLabel;
        let tailArrowEnd = this.visualDatastructure.tailArrowEnd;

        let headIndex = this.visualDatastructure.physicalDatastructure.head;
        let headArrowLabel = this.visualDatastructure.headArrowLabel;
        let headArrowEnd = this.visualDatastructure.headArrowEnd;

        let tailIndex = this.visualDatastructure.physicalDatastructure.tail;
        let tailElement = this.visualDatastructure.getElement(tailIndex);


        let tailArrowCoordSetStart = new CoordSet();
        tailArrowCoordSetStart.setFromXY(tailArrowLabel.getXY()[0], tailArrowLabel.getXY()[1]);
        tailArrowCoordSetStart.setToXY(tailElement.getXY()[0], tailArrowLabel.getXY()[1]);

        let tailArrowCoordSetEnd = new CoordSet();
        tailArrowCoordSetEnd.setFromXY(tailArrowEnd.getXY()[0], tailArrowEnd.getXY()[1]);
        tailArrowCoordSetEnd.setToXY(tailElement.getXY()[0], tailArrowEnd.getXY()[1]);

        // If the tail becomes the head effectively, animate the head going from where the tail is to the head
        if (((tailIndex)%this.visualDatastructure.physicalDatastructure.size) === headIndex){
            sequence.add(this.visualDatastructure.headArrowLabel, tailArrowCoordSetStart, new MoveNoFade());
            sequence.add(this.visualDatastructure.headArrowEnd, tailArrowCoordSetEnd, new MoveNoFade());
            tailArrowLabel.setXY(headArrowLabel.getXY()[0], headArrowLabel.getXY()[1]);
            tailArrowEnd.setXY(headArrowEnd.getXY()[0], headArrowEnd.getXY()[1]);
            //tailElement.setXY(headElement.getXY()[0], headElement.getXY()[1]);
        }else{
            sequence.add(this.visualDatastructure.tailArrowLabel, tailArrowCoordSetStart, new MoveNoFade());
            sequence.add(this.visualDatastructure.tailArrowEnd, tailArrowCoordSetEnd, new MoveNoFade());
        }
    }
    animationMoveOutOfDatastructure(element, stageToAddTo){
        super.animationMoveOutOfDatastructure(element, stageToAddTo);

        // If data structure is full, do not move tail
        if (this.visualDatastructure.physicalDatastructure.isFull()){
            adtController.visualDatastructure.draw();
            return;
        }

        let headArrowLabel = this.visualDatastructure.headArrowLabel;
        let headArrowEnd = this.visualDatastructure.headArrowEnd;

        let headElement = this.visualDatastructure.getElement(this.visualDatastructure.physicalDatastructure.head);

        console.log(this.visualDatastructure.physicalDatastructure.head);

        let headArrowLabelCoordSet = new CoordSet();
        headArrowLabelCoordSet.setFromXY(headArrowLabel.getXY()[0], headArrowLabel.getXY()[1]);
        headArrowLabelCoordSet.setToXY(headElement.getXY()[0], headArrowLabel.getXY()[1]);

        let headArrowEndCoordSet = new CoordSet();
        headArrowEndCoordSet.setFromXY(headArrowEnd.getXY()[0], headArrowEnd.getXY()[1]);
        headArrowEndCoordSet.setToXY(headElement.getXY()[0], headArrowEnd.getXY()[1]);

        stageToAddTo.add(headArrowLabel, headArrowLabelCoordSet, new MoveNoFade());
        stageToAddTo.add(headArrowEnd, headArrowEndCoordSet, new MoveNoFade());

    }
}

class VisualHeapArrayAnimator extends VisualSimpleArrayAnimator{
    constructor(visualHeapArray){
        super(visualHeapArray);
    }
    animationMoveIntoDatastructure(element){
        let sequence = super.animationMoveIntoDatastructure(element);
        sequence.executeConcurrently = true;

        // The newly inserted value is given to the respective element to visualize
        this.visualDatastructure.getElement(element.index).updateElementValue(element.value);
        this.visualDatastructure.getTreeElement(element.index).updateElementValue(element.value);

        let stage0coordsSet2 = new CoordSet();
        stage0coordsSet2.setFromXY(this.visualDatastructure.getTreeElement(element.index).getXY()[0], this.visualDatastructure.getTreeElement(element.index).getXY()[1]);
        stage0coordsSet2.setToXY(this.visualDatastructure.getTreeElement(element.index).getXY()[0], this.visualDatastructure.getTreeElement(element.index).getXY()[1]);

        sequence.add(this.visualDatastructure.getTreeElement(element.index), stage0coordsSet2, new MoveFadeIn());

        if (element.index !== 0 && this.visualDatastructure.getElement(element.index).physicalElement.getValue() !== element.value){
            this.animationSwap(element);
        }
    }
    animationSwap(element) {
        if (element.index === 0) return;

        let curr = element.index;

        while (curr > 0) {
            let p = HeapArray.parent(curr);

            if (this.visualDatastructure.getElement(curr).visualValue.value === this.visualDatastructure.physicalDatastructure.getElement(parent).getValue()) {
                return;
            }

            let stage0 = new AnimationSequence();
            stage0.executeConcurrently = true;

            this.generateSwapAnimation(curr, parent, stage0);

            animationSequencer.add(stage0);

            curr = p;
        }
    }
    generateSwapAnimation(childIndex, parentIndex, stageToAddTo){
        let flatJ = this.visualDatastructure.getElement(childIndex);
        let flatP = this.visualDatastructure.getElement(parentIndex);
        let treeJ = this.visualDatastructure.getTreeElement(childIndex);
        let treeP = this.visualDatastructure.getTreeElement(parentIndex);

        let flatJTemp = new VisualArrayElement(null, null, null);
        flatJTemp.setXY(flatJ.getXY()[0], flatJ.getXY()[1]);
        flatJTemp.updateElementValue(flatJ.visualValue.value);

        let flatPTemp = new VisualArrayElement(null, null, null);
        flatPTemp.setXY(flatP.getXY()[0], flatP.getXY()[1]);
        flatPTemp.updateElementValue(flatP.visualValue.value);

        let treeJTemp = new VisualTreeNode(null, treeJ.visualCircle.radius);
        treeJTemp.setXY(treeJ.getXY()[0], treeJ.getXY()[1]);
        treeJTemp.updateElementValue(treeJ.visualValue.value);

        let treePTemp = new VisualTreeNode(null, treeP.visualCircle.radius);
        treePTemp.setXY(treeP.getXY()[0], treeP.getXY()[1]);
        treePTemp.updateElementValue(treeP.visualValue.value);

        stageToAddTo.addTempObject(flatJTemp);
        stageToAddTo.addTempObject(flatPTemp);
        stageToAddTo.addTempObject(treeJTemp);
        stageToAddTo.addTempObject(treePTemp);

        stageToAddTo.doNotDraw(flatJ);
        stageToAddTo.doNotDraw(flatP);
        stageToAddTo.doNotDraw(treeJ);
        stageToAddTo.doNotDraw(treeP);

        //stageToAddTo.addObjectToUpdateAtEnd(this.visualDatastructure.getElement(childIndex));
        stageToAddTo.addObjectToUpdateAtEnd(this.visualDatastructure.getElement(parentIndex));
        //stageToAddTo.addObjectToUpdateAtEnd(this.visualDatastructure.getTreeElement(childIndex));
        stageToAddTo.addObjectToUpdateAtEnd(this.visualDatastructure.getTreeElement(parentIndex));

        let flatJCoordSet = new CoordSet();
        flatJCoordSet.setFromXY(flatJ.getXY()[0], flatJ.getXY()[1]);
        flatJCoordSet.setToXY(flatP.getXY()[0], flatP.getXY()[1]);

        let flatPCoordSet = new CoordSet();
        flatPCoordSet.setFromXY(flatP.getXY()[0], flatP.getXY()[1]);
        flatPCoordSet.setToXY(flatJ.getXY()[0], flatJ.getXY()[1]);

        let treeJCoordSet = new CoordSet();
        treeJCoordSet.setFromXY(treeJ.getXY()[0], treeJ.getXY()[1]);
        treeJCoordSet.setToXY(treeP.getXY()[0], treeP.getXY()[1]);

        let treePCoordSet = new CoordSet();
        treePCoordSet.setFromXY(treeP.getXY()[0], treeP.getXY()[1]);
        treePCoordSet.setToXY(treeJ.getXY()[0], treeJ.getXY()[1]);

        stageToAddTo.add(flatJTemp.visualValue, flatJCoordSet, new MoveNoFade());
        stageToAddTo.add(flatPTemp.visualValue, flatPCoordSet, new MoveNoFade());
        stageToAddTo.add(treeJTemp.visualValue, treeJCoordSet, new MoveNoFade());
        stageToAddTo.add(treePTemp.visualValue, treePCoordSet, new MoveNoFade());
    }
    animationMoveOutOfDatastructure(element){
        let sequence = super.animationMoveOutOfDatastructure(element);
    }
}

class VisualSinglyLinkedListAnimator extends VisualDatastructureAnimator{
    constructor(visualSinglyLinkedList){
        super(visualSinglyLinkedList);
    }
    insertAnimation(element){

        this.shiftNodes("right");

        let stage0 = new AnimationSequence();
        //stage0.doNotDraw(this.visualDatastructure.head);
        stage0.executeConcurrently = true;

        let stage0coordsSet1 = new CoordSet();
        stage0coordsSet1.setFromXY(leftMargin + boxWidth, canvas.height / 2);
        //stage0coordsSet1.middleXY = [leftMargin + boxWidth, canvas.height / 2];
        stage0coordsSet1.setToXY(leftMargin + boxWidth, canvas.height / 2);

        let tempElement = new VisualSinglyLinkedListElement();
        //stage0.add(tempElement, stage0coordsSet1, new MoveFadeIn());
        //stage0.addTempObject(tempElement);
        stage0.add(this.visualDatastructure.head, stage0coordsSet1, new MoveFadeIn());

        let headValue = new VisualValue(element.getValue());

        let stage0coordsSet2 = new CoordSet();
        stage0coordsSet2.setFromXY(leftMargin + boxWidth, canvas.height - topBottomMargin);
        //stage0coordsSet2.middleXY = [leftMargin + boxWidth, canvas.height - topBottomMargin];
        stage0coordsSet2.setToXY(stage0coordsSet1.toMiddleXY[0]-boxWidth/2, stage0coordsSet1.toMiddleXY[1]);

        //stage0.add(headValue, stage0coordsSet2, new MoveNoFade());
        stage0.add(this.visualDatastructure.head.visualValue, stage0coordsSet2, new MoveNoFade());

        stage0.addTempObject(headValue);

        animationSequencer.add(stage0);


        let stage1 = new AnimationSequence();

        let stage1coordsSetHead = new CoordSet();
        stage1coordsSetHead.fromMiddleXY = [leftMargin + boxWidth, canvas.height / 2];
        //stage1coordsSet.middleXY = [leftMargin + boxWidth, canvas.height / 2];
        stage1coordsSetHead.toMiddleXY =  [leftMargin + boxWidth, canvas.height / 2];
        stage1.add(this.visualDatastructure.head, stage1coordsSetHead, new MoveNoFade());

        animationSequencer.add(stage1);


        let stage2 = new AnimationSequence();

        let stage2coordsSet = new CoordSet();
        stage2coordsSet.fromMiddleXY = [stage1coordsSetHead.toMiddleXY[0], stage1coordsSetHead.toMiddleXY[1]];
        //stage1coordsSet.middleXY = [leftMargin + boxWidth, canvas.height / 2];
        stage2coordsSet.toMiddleXY =  [leftMargin + boxWidth, this.visualDatastructure.elementBoxY+(boxHeight/2)];

        stage2.add(this.visualDatastructure.head, stage2coordsSet, new MoveNoFade());

        console.log("Add send");
        console.log("THE SEQUENCE: ");
        console.log(stage1);
        animationSequencer.add(stage2);
        animationSequencer.go();
    }
    animationMoveIntoDatastructure(element, stageToAddTo){

    }
    shiftNodes(direction){
        let curr = null;

        if (direction==="right"){
            if (this.visualDatastructure.datastructure.numElements===1){return;}
            curr = this.visualDatastructure.head.getNext();
        }else if(direction==="left"){
            if (this.visualDatastructure.datastructure.numElements===0){return;}
            curr = this.visualDatastructure.head;
        }

        let sequence = new AnimationSequence();
        sequence.executeConcurrently = true;
        sequence.doNotDraw(this.visualDatastructure.head);

        while (curr!==null){
            curr.setOldMiddleXY(curr.getStaticMiddleXY()[0], curr.getStaticMiddleXY()[1]);
            if (direction === "right"){
                curr.setStaticMiddleXY(curr.getStaticMiddleXY()[0]+(3*boxWidth), curr.getStaticMiddleXY()[1]);
            }else{
                curr.setStaticMiddleXY(curr.getStaticMiddleXY()[0]-(3*boxWidth), curr.getStaticMiddleXY()[1]);
            }
            sequence.add(curr, curr.coordSet, new MoveNoFade());

            curr = curr.getNext();
        }

        console.log("HELLO HELLO");
        animationSequencer.add(sequence);
    }
}