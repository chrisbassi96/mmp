function mrAnimator(objectToAnimate){
    //let animationStart = null;
    let currX = objectToAnimate.oldMiddleX;
    let currY = objectToAnimate.oldMiddleY;
    let targetX = objectToAnimate.middleX;
    let targetY = objectToAnimate.middleY;
    let trajectoryAngle = Math.atan2(targetY-currY, targetX-currX);
    let lineLength = Math.hypot(targetX-currX, targetY-currY);
    let lineSegment = lineLength / animationSteps;
    let stopID = 0;
    let progress = 0;

    //canvasObjectMan.add(adtCopy.dataStructure);
    //canvasObjectMan.remove(adt.dataStructure);
    //adtPainter.setAdt(adtCopy);
    //adtPainter.adt = adtCopy;

    window.requestAnimationFrame(step);

    function step(timestamp){

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        currX = currX + (Math.cos(trajectoryAngle) * lineSegment);
        currY = currY + (Math.sin(trajectoryAngle) * lineSegment);

        objectToAnimate.updateXY(currX, currY);

/*        objectToAnimate.middleX = currX;
        objectToAnimate.middleY = currY;*/

        console.log(objectToAnimate.middleX + " " + objectToAnimate.middleY);

        //adt.dataStructure.draw();
        //canvasObjectMan.draw();
        //canvasObjectMan.draw();
        adtController.datastructureController.draw();

        if (progress!==animationSteps-1) {
            progress += 1;
            stopID = window.requestAnimationFrame(step);
        }else{
            console.log("Finished!");
            objectToAnimate.oldMiddleX = objectToAnimate.middleX;
            objectToAnimate.oldMiddleY = objectToAnimate.middleY;
            //clearCanvas();
            //canvasObjectMan.add(adt.dataStructure);
            //canvasObjectMan.remove(adtCopy.dataStructure);
            //adtPainter.adt = adt;
            //adtPainter.setAdt(adt);
            //adtPainter.draw(); // Draw the adt we care about
            //canvasObjectMan.draw();
            window.cancelAnimationFrame(stopID);
        }
    }
}

class VisualObject{
    constructor(oldMiddleX, oldMiddleY, middleX, middleY){
        this.oldMiddleX = oldMiddleX;
        this.oldMiddleY = oldMiddleY;
        this.middleX = middleX;
        this.middleY = middleY;
    }
    updateXY(x, y){
        this.middleX = x;
        this.middleY = y;
    }
}

class VisualValue extends VisualObject{
    constructor(oldMiddleX, oldMiddleY, middleX, middleY, value){
        super(oldMiddleX, oldMiddleY, middleX, middleY);
        this.value = value;
    }
    move(){

    }
    fadeOut(){

    }
    fadeIn(){

    }
    draw(){
        ctx.fillText(this.value, this.middleX, this.middleY);
    }
}

class SimpleArrayStackController{
    constructor(size){
        this.adt = new SimpleArrayStack(size);
        this.datastructureController = new SimpleArrayController(this.adt.dataStructure);
            //this.adtCopy = adt;
        //this.adtPainter = adtPainter;
        //canvasObjectMan.add(adtPainter);
    }
    push(value){
        console.log("test");
        //this.adtCopy = Object.assign({}, this.adt);
        //this.adtCopy = JSON.parse(JSON.stringify(this.adt));
        //this.adtCopy = cloneObject(this.adt);
        //this.adtCopy.dataStructure.setContents(this.adt.dataStructure.getContents());

        //this.adtPainter.adt = this.adtCopy;

        let insertedIndex = this.adt.push(value);


/*        console.log(this.adt.dataStructure.getNumElements());
        console.log(this.adtCopy.dataStructure.getNumElements());*/

        this.datastructureController.setElementValue(insertedIndex);

/*        let insertedIndexElement = this.adt.dataStructure.getElement(insertedIndex);

        let tempMiddleX = insertedIndexElement.middleX;
        let tempMiddleY = insertedIndexElement.middleY;

        let flyingValue = {
            oldMiddleX:leftMargin, oldMiddleY: canvas.height - topBottomMargin, middleX:tempMiddleX, middleY:tempMiddleY, draw:function(){
                ctx.fillText(value, this.middleX, this.middleY);
            }};

        canvasObjectMan.add(flyingValue);

        mrAnimator(flyingValue, this.adtPainter, this.adtCopy, this.adt);*/

        // Do animation with adtCopy

    }
    pop(){
        let poppedElement = this.adt.pop();
        let poppedElementValue = poppedElement.value;
        let poppedIndex = poppedElement.index;

        if (poppedIndex==null){
            outputLabel.innerText = "Stack is empty";
        }else{
            outputLabel.innerText = "Pop " + this.datastructureController.content[poppedIndex];
            this.datastructureController.moveOutofArray(poppedElement, poppedIndex);
        }
    }
}

class SimpleArrayController{
    constructor(datastructure, elementBoxY=topBottomMargin+elementBoxHeight, showIndex=false){
        this.datastructure = datastructure;

        this.elementBoxY = elementBoxY;
        this.showIndex = showIndex;
        this.content = [];

        for (let i=0; i<datastructure.size; i++){
            this.content[i] = new VisualArrayElement(datastructure.getElement(i), i, this.showIndex);
            this.content[i].setMiddleXY(leftMargin + elementBoxWidth + (elementBoxWidth*i), this.elementBoxY+(elementBoxHeight/2));
            this.content[i].setIndex(i);
            this.content[i].moveIntoArray();
        }
    }
    moveIntoArray(index){
        this.content[index].updateElementValue(); // Get the current value from physical datastructure
        //this.content[index].update();
        this.content[index].setIndex(index); // Update index

        this.content[index].setOldMiddleXY(leftMargin, canvas.height - topBottomMargin);

        this.content[index].moveVisualValueIntoArray();
    }
    moveOutofArray(outValue, index){
        this.content[index].updateElementValue(); // Get the current value from physical datastructure
        //this.content[index].update();
        this.content[index].setIndex(index); // Update index

        //this.content[index].setOldMiddleXY(leftMargin, canvas.height - topBottomMargin);

        this.content[index].moveVisualValueIntoArray();
        let tempOutValue
    }
    setElementValue(index){
        this.content[index].updateElementValue(); // Get the current value from physical datastructure
        //this.content[index].update();
        this.content[index].setIndex(index); // Update index

        this.content[index].setOldMiddleXY(leftMargin, canvas.height - topBottomMargin);

        this.content[index].moveVisualValueIntoArray();

        //this.draw();
    }
    // Perhaps I should use an if...else... statement here instead, to make it easier to understand?
    getElementValue(index){

        if (index >= 0 && index < this.content.length){

            return this.content[index].getValue();
        }

        // Give some sort of error
    }
    getElement(index){
        return this.content[index];
    }
    getNumElements(){
        return this.numElements;
    }
    getSize(){
        return this.size;
    }
    isEmpty(){
        return this.numElements === 0;
    }
    expand(){
        this.size = this.size*2;
        for (let i=this.size/2; i<this.size; i++){
            this.content[i] = new ArrayElementController(null, this.showIndex);
            this.content[i].setMiddleXY(leftMargin + elementBoxWidth + (elementBoxWidth*i), this.elementBoxY+(elementBoxHeight/2));
            this.content[i].setIndex(i);
        }
    }
    draw() {
        //clearCanvas();
        for (let i=0; i<this.datastructure.size; i++){
            // Draw the box that visualizes the index
            this.content[i].draw();
        }
    }
}

class VisualArrayElement{
    constructor(arrayElement, indexNum, showIndex){
        this.arrayElement = arrayElement;
        this.indexNum = indexNum;
        this.showIndex = showIndex;
        this.oldMiddleX = 0;
        this.oldMiddleY = 0;
        this.middleX = 0;
        this.middleY = 0;
        this.visualElementBox = {
            oldMiddleX: this.oldMiddleX,
            oldMiddleY: this.oldMiddleY,
            middleX: this.middleX,
            middleY: this.middleY,
            draw: function () {
                // Draw the actual box
                ctx.strokeRect(this.middleX-(elementBoxWidth/2), this.middleY-(elementBoxHeight/2), elementBoxWidth, elementBoxHeight);
            },
            updateXY: function(x, y){
                this.middleX = x;
                this.middleY = y;
            }
        };

        this.visualValue = new VisualValue(this.oldMiddleX, this.oldMiddleY, this.middleX, this.middleY, this.arrayElement.getValue());

        this.visualValue = {
            oldMiddleX: this.oldMiddleX,
            oldMiddleY: this.oldMiddleY,
            middleX: this.middleX,
            middleY: this.middleY,
            value: this.arrayElement.getValue(),
            draw: function () {
                ctx.fillText(this.value, this.middleX, this.middleY);
            },
            updateXY: function (x, y) {
                this.middleX = x;
                this.middleY = y;
            }
        };
        this.visualIndexNum = {
            oldMiddleX: this.oldMiddleX,
            oldMiddleY: this.oldMiddleY,
            middleX: this.middleX,
            middleY: this.middleY,
            value: this.indexNum,
            draw: function () {
                // Draw the index
                if (this.showIndex){
                    ctx.fillText(this.index, this.middleX, this.middleY + elementBoxHeight);
                }
            },
            updateXY: function(x, y){
                this.middleX = x;
                this.middleY = y;
            }
        };
    }
    updateElementValue(){
        this.visualValue.value = this.arrayElement.getValue();
    }
    setIndex(index){
        this.indexNum = index;
    }
    setOldMiddleXY(x, y){
        this.oldMiddleX = x;
        this.oldMiddleY = y;
        this.update();

        //mrAnimator(this);
    }
    setMiddleXY(x, y){
        this.middleX = x;
        this.middleY = y;
        this.update();

        //mrAnimator(this);
    }
    updateXY(x, y){
        this.middleX = x;
        this.middleY = y;
        this.update();
    }
    update(){
        this.updateMiddleXY();
        this.updateOldMiddleXY();
    }
    updateMiddleXY(){
        this.visualElementBox.middleX = this.middleX;
        this.visualElementBox.middleY = this.middleY;
        this.visualValue.middleX = this.middleX;
        this.visualValue.middleY = this.middleY;
        this.visualIndexNum.middleX = this.middleX;
        this.visualIndexNum.middleY = this.middleY;
    }
    updateOldMiddleXY(){
        this.visualElementBox.oldMiddleX = this.oldMiddleX;
        this.visualElementBox.oldMiddleY = this.oldMiddleY;
        this.visualValue.oldMiddleX = this.oldMiddleX;
        this.visualValue.oldMiddleY = this.oldMiddleY;
        this.visualIndexNum.oldMiddleX = this.oldMiddleX;
        this.visualIndexNum.oldMiddleY = this.oldMiddleY;
    }
    moveIntoArray(){
        mrAnimator(this);
    }
    moveVisualValueIntoArray(){
        mrAnimator(this.visualValue);
    }
    draw(){
        this.visualElementBox.draw();
        this.visualValue.draw();
        this.visualIndexNum.draw();
    }
}