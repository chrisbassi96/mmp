class VisualSimpleArray{
    constructor(datastructure, elementBoxY=topBottomMargin+elementBoxHeight, showIndex=false){
        this.physicalDatastructure = datastructure;
        this.elementBoxY = elementBoxY;
        this.showIndex = showIndex;
        this.content = [];

        for (let i=0; i<datastructure.size; i++){
            this.content[i] = new VisualArrayElement(datastructure.getElement(i), i, this.showIndex);
            this.content[i].setXY(leftMargin + (elementBoxWidth/2) + (elementBoxWidth*i), this.elementBoxY+(elementBoxHeight/2));
            this.content[i].setStaticMiddleXY(leftMargin + (elementBoxWidth/2) + (elementBoxWidth*i), this.elementBoxY+(elementBoxHeight/2));
            this.content[i].draw();
        }
    }
    updateElementValueAndIndex(element){
        let index = element.index;
        console.log(element);
        this.content[index].updateElementValue(); // Get the current visualValue from physical datastructure
        //this.visualDatastructure[index].update();
        this.content[index].setIndex(index); // Update index
    }
    getElement(index){
        if (index >= 0 && index < this.content.length){
            return this.content[index];
        }
        // Give some sort of error
        return null;
    }
    draw() {
        //clearCanvas();
        for (let i=0; i<this.physicalDatastructure.size; i++){
            this.content[i].draw();
        }
    }
}

class VisualHeapArray extends VisualSimpleArray{
    constructor(datastructure, elementBoxY, showIndex){
        super(datastructure, elementBoxY, showIndex);
        this.originalSize = datastructure.size;
        this.contentTree = [];
        this.treeNodeRadius = 20;

        for (let i=0; i<this.physicalDatastructure.size; i++){
            this.contentTree[i] = new VisualTreeNode(this.physicalDatastructure.getElement(i), this.treeNodeRadius);
        }
    }
    updateElementValueAndIndex(element){
        if (this.originalSize < this.physicalDatastructure.size){
            this.expand();
        }

        super.updateElementValueAndIndex(element);

        this.contentTree[element.index].updateElementValue();

        this.updateTreeNodeCoords();
        this.createNodeArrows(element.index);
    }
    getTreeElement(index){
        if (index >= 0 && index < this.contentTree.length){
            return this.contentTree[index];
        }
        // Give some sort of error
        return null;
    }
    createNodeArrows(index){
        if (index !== 0){
            let parentTreeNode = this.contentTree[HeapArray.parent(index)];
            if (index % 2 !== 0) {
                console.log("Index is odd");
                // Has parent
                let leftArrow = new VisualArrow(null, null, this.treeNodeRadius, this.treeNodeRadius);
                let rightArrow = new VisualArrow(null, null, this.treeNodeRadius, this.treeNodeRadius);

                parentTreeNode.addOutgoingArrow(leftArrow);
                parentTreeNode.leftArrow = leftArrow;
                parentTreeNode.addOutgoingArrow(rightArrow);
                parentTreeNode.rightArrow = rightArrow;
                this.contentTree[index].addIncomingArrow(parentTreeNode.leftArrow);
            } else {
                console.log("Index is even");
                this.contentTree[index].addIncomingArrow(parentTreeNode.rightArrow);
            }
        }
    }
    updateTreeNodeCoords(){
        let numLevels = Math.floor(Math.log2(this.physicalDatastructure.numElements));

        let radiusOfNode = 20;
        let gapUnit = radiusOfNode;
        let nodeXSpacingFactor = 0.5;
        let nodeYSpacingFactor = 0.5;

        let totalExtraGap = (Math.pow(2, numLevels)*nodeXSpacingFactor);
        let unitsToStart = (Math.pow(2, numLevels)) + totalExtraGap;

        for (let i=0; i<this.physicalDatastructure.numElements; i++){
            let currLevel = Math.floor(Math.log2(i+1));
            let nodesOnCurrLevel = Math.pow(2, currLevel);
            let nodePosOnLevel = Math.abs((nodesOnCurrLevel-i)-1);
            console.log("nodePosOnLevel: " + nodePosOnLevel);
            console.log("numLevels: " + numLevels);
            console.log("currLevel: " + currLevel);
            //let reverseCurrLevel = (currLevel + 1) - (i+1);

            let reverseCurrLevel = (numLevels+1) - currLevel;
            console.log("reverseCurrLevel: " + reverseCurrLevel);
            let currLevelExtraNodeGap = (Math.pow(2, reverseCurrLevel)*nodeXSpacingFactor);
            let distanceBetweenNodes = (Math.pow(2, reverseCurrLevel)-1)+currLevelExtraNodeGap;
            let distanceFromLeftToFirstNode = ((Math.pow(2, reverseCurrLevel-1)-1))+(currLevelExtraNodeGap/2);


            console.log("distanceFromLeftToFirstNode: " + distanceFromLeftToFirstNode);
            console.log("distanceBetweenNodes: " + distanceBetweenNodes);

            let x = canvas.width / 2 - (unitsToStart * radiusOfNode);
            //x += (distanceFromLeftToFirstNode * radiusOfNode) + radiusOfNode + radiusOfNode + (distanceBetweenNodes * radiusOfNode * nodePosOnLevel);
            x += (distanceFromLeftToFirstNode * radiusOfNode) + radiusOfNode;
            x += nodePosOnLevel * (radiusOfNode + (distanceBetweenNodes * radiusOfNode));


            let y = (canvas.height / 2);
            y += (currLevel * (radiusOfNode*2)) + (radiusOfNode * nodeYSpacingFactor * currLevel );

            console.log("HELLO");

            this.contentTree[i].setXY(x, y);
        }
    }
    expand(){
        for (let i=this.originalSize; i<this.physicalDatastructure.size; i++){
            console.log(i);
            this.content[i] = new VisualArrayElement(this.physicalDatastructure.getElement(i), i, this.showIndex);
            this.content[i].setXY(leftMargin + (elementBoxWidth/2) + (elementBoxWidth*i), this.elementBoxY+(elementBoxHeight/2));
            this.content[i].setStaticMiddleXY(leftMargin + (elementBoxWidth/2) + (elementBoxWidth*i), this.elementBoxY+(elementBoxHeight/2));

            this.contentTree[i] = new VisualTreeNode(this.physicalDatastructure.getElement(i), this.treeNodeRadius);
        }
        this.originalSize = this.physicalDatastructure.size;
        /*        this.size = this.size*2;
                for (let i=this.size/2; i<this.size; i++){
                    this.visualDatastructure[i] = new ArrayElementController(null, this.showIndex);
                    this.visualDatastructure[i].setXY(leftMargin + elementBoxWidth + (elementBoxWidth*i), this.elementBoxY+(elementBoxHeight/2));
                    this.visualDatastructure[i].setIndex(i);
                }*/
    }
    draw() {
        super.draw();
        for (let i=0; i<this.physicalDatastructure.numElements; i++){
            this.contentTree[i].draw();
        }
    }
}