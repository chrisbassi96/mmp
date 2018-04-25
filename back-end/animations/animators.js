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
        let stage0 = new AnimationSequence();
        stage0.executeConcurrently = true;

        this.animationMoveIntoDatastructure(element, stage0);

        animationSequencer.add(stage0);

        animationSequencer.go();
    }
    animationMoveIntoDatastructure(element, stageToAddTo){
        // Setup for animation stage
        stageToAddTo.doNotDraw(this.visualDatastructure.getElement(element.index));

        // Declaration of objects involved in the animation stage
        let tempElement = new VisualArrayElement(null, element.index, this.showIndex);
        let headValue = new VisualValue(element.value);

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
    removeAnimation(element){
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

class VisualCircularArrayAnimator extends VisualSimpleArrayAnimator{
    constructor(visualCircularArray){
        super(visualCircularArray);
    }
    animationMoveIntoDatastructure(element, stageToAddTo){
        super.animationMoveIntoVisualDatastructure(element, stageToAddTo);
        //super.moveIntoDatastructure(element);
        // Setup for animation stage
        //let stage0 = new AnimationSequence();
        return;
        let tailArrow = this.visualDatastructure.tailArrow;
        let headIndex = this.visualDatastructure.physicalDatastructure.head;
        let tailIndex = this.visualDatastructure.physicalDatastructure.tail;

        this.visualDatastructure.content[tail].addIncomingArrow()




        let tailArrowCoordSetStart = new CoordSet();
        tailArrowCoordSetStart.setFromXY(tailArrow.startXY[0], tailArrow.startXY[1]);
        tailArrowCoordSetStart.setToXY(this.visualDatastructure.getElement(tailIndex).getXY()[0], tailArrow.startXY[1]);

        let tailArrowCoordSetEnd = new CoordSet();
        tailArrowCoordSetEnd.setFromXY(tailArrow.endXY[0], tailArrow.endXY[1]);
        tailArrowCoordSetEnd.setToXY(this.visualDatastructure.getElement(tailIndex).getXY()[0], tailArrow.endXY[1]);

        //stageToAddTo.add(this.tailLabel, tailArrowCoordSetStart, new MoveNoFade());
        stageToAddTo.add(this.tailArrow, tailArrowCoordSetEnd, new MoveNoFade());

        let headElement = this.visualDatastructure.getElement(headIndex);
        let tailElement = this.visualDatastructure.getElement(tailIndex);
        console.log(headElement);
        console.log(headElement.getXY());

        this.visualDatastructure.headArrow.setStartXY(headElement.getXY()[0], elementBoxLabelY);
        this.visualDatastructure.headArrow.setEndXY(headElement.getXY()[0], headElement.getXY()[1]-elementBoxHeight/2);

        this.visualDatastructure.headArrow.setLabelText("head");
        this.visualDatastructure.tailArrow.setLabelText("tail");
        this.visualDatastructure.tailArrow.setStartXY(tailElement.getXY()[0], elementBoxLabelY);
        this.visualDatastructure.tailArrow.setEndXY(tailElement.getXY()[0], tailElement.getXY()[1]-elementBoxHeight/2);


        //animationSequencer.add(stage0);

        //animationSequencer.go();
    }
    removeProcess(element){
        super.moveOutOfDatastructure(element);
        return;
        let headElement = this.visualDatastructure.getElement(this.datastructure.head);

        this.headArrow.setStartXY(headElement.getXY()[0], elementBoxLabelY);
        this.headArrow.setEndXY(headElement.getXY()[0], headElement.getXY()[1]-elementBoxHeight/2);

        if (this.datastructure.head === this.datastructure.tail){
            this.headArrow.setLabelText("head / tail")
        }
    }
}

class VisualHeapArrayAnimator extends VisualSimpleArrayAnimator{
    constructor(visualHeapArray){
        super(visualHeapArray);
    }
    insertAnimation(element){
        let stage0 = new AnimationSequence();
        stage0.executeConcurrently = true;
        animationSequencer.add(stage0);

        if (element.index !== 0 && this.visualDatastructure.getElement(element.index).physicalElement.getValue() !== element.value){
            this.animationSwap(element);
            //element.index = HeapArray.parent(element.index);
        }

        this.animationMoveIntoDatastructure(element, stage0);

        this.visualDatastructure.getElement(element.index).updateElementValue(element.value);
        this.visualDatastructure.getTreeElement(element.index).updateElementValue(element.value);

        animationSequencer.go();
    }
    animationMoveIntoDatastructure(element, stageToAddTo){
        super.animationMoveIntoDatastructure(element, stageToAddTo);

/*        let treeElement = this.visualDatastructure.getTreeElement(element.index);

        let tempElement = new VisualTreeNode(null, 20);
        tempElement.setXY(treeElement.getXY()[0], treeElement.getXY()[1]);
        tempElement.updateElementValue(element.value);
        console.log(tempElement);*/

        let stage0coordsSet2 = new CoordSet();
        stage0coordsSet2.setFromXY(this.visualDatastructure.getTreeElement(element.index).getXY()[0], this.visualDatastructure.getTreeElement(element.index).getXY()[1]);
        stage0coordsSet2.setToXY(this.visualDatastructure.getTreeElement(element.index).getXY()[0], this.visualDatastructure.getTreeElement(element.index).getXY()[1]);

        //stageToAddTo.doNotDraw(this.visualDatastructure.getTreeElement(element.index));
        //stageToAddTo.addTempObject(tempElement);
        //stageToAddTo.add(tempElement, stage0coordsSet2, new MoveFadeIn());
        //stageToAddTo.add(tempElement, stage0coordsSet2, new MoveFadeIn());
        stageToAddTo.add(this.visualDatastructure.getTreeElement(element.index), stage0coordsSet2, new MoveFadeIn());

        //this.animationSwapElements(element);
    }
    animationSwap(element) {
        if (element.index === 0) return;

        let j = element.index;

        while (j > 0) {
            let p = HeapArray.parent(j);

            console.log("parent: " + p);
            // This won't work with strings...
            if (this.visualDatastructure.getElement(j).visualValue.value >= this.visualDatastructure.getElement(p).visualValue.value) {
                console.log("test");
                return;
            }
            console.log("GOT THROUGH");

            let stage0 = new AnimationSequence();
            stage0.executeConcurrently = true;

            this.generateSwapAnimation(j, p, stage0);

            animationSequencer.add(stage0);


            j = p;
        }

        //animationSequencer.go();

    }
    generateSwapAnimation(j, p, stageToAddTo){
        console.log("BOB");

        console.log(this.visualDatastructure.getElement(p));

        let tempParentNode = new VisualTreeNode(null, 20);
        tempParentNode.updateElementValue(this.visualDatastructure.getElement(p).visualValue.value);
        stageToAddTo.doNotDraw(this.visualDatastructure.getElement(p));

        this.visualDatastructure.getElement(j).updateElementValue();
        this.visualDatastructure.getElement(p).updateElementValue();
        this.visualDatastructure.getTreeElement(j).updateElementValue();
        this.visualDatastructure.getTreeElement(p).updateElementValue();

        let flatJ = this.visualDatastructure.getElement(j).visualValue;
        let flatP = this.visualDatastructure.getElement(p).visualValue;
        let treeJ = this.visualDatastructure.getTreeElement(j).visualValue;
        let treeP = this.visualDatastructure.getTreeElement(p).visualValue;

        console.log(p + " " + j);
        console.log(flatJ.value);
        console.log(flatP.value);
        console.log(treeJ.value);
        console.log(treeP.value);


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

        stageToAddTo.add(flatJ, flatJCoordSet, new MoveNoFade());
        stageToAddTo.add(flatP, flatPCoordSet, new MoveNoFade());
        stageToAddTo.add(treeJ, treeJCoordSet, new MoveNoFade());
        stageToAddTo.add(treeP, treePCoordSet, new MoveNoFade());
        console.log(stageToAddTo);


    }
}

class VisualSinglyLinkedListAnimator extends VisualDatastructureAnimator{
    constructor(visualSinglyLinkedList){
        super(visualSinglyLinkedList);
    }
    insertAnimation(element){

        this.shiftNodes("right");

        let stage0 = new AnimationSequence();
        stage0.doNotDraw(this.visualDatastructure.head);
        stage0.executeConcurrently = true;

        let stage0coordsSet1 = new CoordSet();
        stage0coordsSet1.setFromXY(leftMargin + elementBoxWidth, canvas.height / 2);
        //stage0coordsSet1.middleXY = [leftMargin + elementBoxWidth, canvas.height / 2];
        stage0coordsSet1.setToXY(leftMargin + elementBoxWidth, canvas.height / 2);

        let tempElement = new VisualSinglyLinkedListElement();
        stage0.add(tempElement, stage0coordsSet1, new MoveFadeIn());
        stage0.addTempObject(tempElement);

        let headValue = new VisualValue(element.getValue());

        let stage0coordsSet2 = new CoordSet();
        stage0coordsSet2.setFromXY(leftMargin + elementBoxWidth, canvas.height - topBottomMargin);
        //stage0coordsSet2.middleXY = [leftMargin + elementBoxWidth, canvas.height - topBottomMargin];
        stage0coordsSet2.setToXY(stage0coordsSet1.toMiddleXY[0]-elementBoxWidth/2, stage0coordsSet1.toMiddleXY[1]);

        stage0.add(headValue, stage0coordsSet2, new MoveNoFade());
        stage0.addTempObject(headValue);

        animationSequencer.add(stage0);


        let stage1 = new AnimationSequence();

        let stage1coordsSetHead = new CoordSet();
        stage1coordsSetHead.fromMiddleXY = [leftMargin + elementBoxWidth, canvas.height / 2];
        //stage1coordsSet.middleXY = [leftMargin + elementBoxWidth, canvas.height / 2];
        stage1coordsSetHead.toMiddleXY =  [leftMargin + elementBoxWidth, canvas.height / 2];
        stage1.add(this.visualDatastructure.head, stage1coordsSetHead, new MoveNoFade());

        animationSequencer.add(stage1);


        let stage2 = new AnimationSequence();

        let stage2coordsSet = new CoordSet();
        stage2coordsSet.fromMiddleXY = [stage1coordsSetHead.toMiddleXY[0], stage1coordsSetHead.toMiddleXY[1]];
        //stage1coordsSet.middleXY = [leftMargin + elementBoxWidth, canvas.height / 2];
        stage2coordsSet.toMiddleXY =  [leftMargin + elementBoxWidth, this.visualDatastructure.elementBoxY+(elementBoxHeight/2)];

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

        while (curr!==null){
            curr.setOldMiddleXY(curr.getStaticMiddleXY()[0], curr.getStaticMiddleXY()[1]);
            if (direction === "right"){
                curr.setStaticMiddleXY(curr.getStaticMiddleXY()[0]+(3*elementBoxWidth), curr.getStaticMiddleXY()[1]);
            }else{
                curr.setStaticMiddleXY(curr.getStaticMiddleXY()[0]-(3*elementBoxWidth), curr.getStaticMiddleXY()[1]);
            }
            sequence.add(curr, curr.coordSet, new MoveNoFade());

            curr = curr.getNext();
        }
        sequence.doNotDraw(this.visualDatastructure.head);
        sequence.executeConcurrently = true;
        console.log("HELLO HELLO");
        animationSequencer.add(sequence);
    }
}