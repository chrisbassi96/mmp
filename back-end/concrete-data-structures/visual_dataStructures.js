class ArrayElementController {
    constructor(arrayElement, showIndexNum=false){
        this.arrayElement = arrayElement;
        this.oldMiddleX = leftMargin;
        this.oldMiddleY = canvas.height - topBottomMargin;
        this.middleX = 0;
        this.middleY = 0;
        this.showIndexNum = showIndexNum;

        this.visualValue = null;
    }
    setValue(value){
        this.arrayElement.setValue(value);

        let flyingValue = {
            oldMiddleX:this.oldMiddleX, oldMiddleY: this.middleY, middleX:this.middleX, middleY:this.middleY, draw:function(){
                ctx.fillText(value, this.middleX, this.middleY);
            }};

        canvasObjectMan.add(this);

        mrAnimator(flyingValue);

    }
    setXY(x, y){
        this.oldMiddleX = this.middleX;
        this.oldMiddleY = this.middleY;
        this.middleX = x;
        this.middleY = y;

        //bob.animate(this.oldMiddleX, this.oldMiddleY, this.middleX, this.middleY);

        /*        let currX = this.oldMiddleX;
                let currY = this.oldMiddleY;
                let lineAngle = Math.atan2(this.middleY-this.oldMiddleY, this.middleX-this.oldMiddleX);
                let lineLength = Math.hypot(this.middleX-this.oldMiddleX, this.middleY-this.oldMiddleY);
                let start = null;
                let value = this.value;
                let index = this.index;
                let showIndex = this.showIndexNum;
                function step(timestamp) {
                    if (!start) start = timestamp;
                    let progress = timestamp - start;

                    currX = currX + (Math.cos(lineAngle) * (progress));
                    currY = currY + (Math.sin(lineAngle) * (progress));

                    ctx.clearRect(0, 0, canvas.width, canvas.height);

                    // Draw the actual box
                    ctx.strokeRect(currX-(elementBoxWidth/2), currY-(elementBoxHeight/2), elementBoxWidth, elementBoxHeight);

                    // Draw the actual value
                    ctx.fillText(value, currX, currY);

                    // Draw the index
                    if (showIndex){
                        ctx.fillText(index, currX, currY + elementBoxHeight);
                    }
                    if (progress < 1000) {
                        window.requestAnimationFrame(step);
                    }

                }

                if (this.middleX !== x && this.middleY !== y){
                    window.requestAnimationFrame(step);
                }

                window.requestAnimationFrame(this.testAnimate);
                let duration = 1000;
                let stepsRequired = 20;

                for (let i = 1; i<=stepsRequired; i++){
                }

                this.middleX = x;
                this.middleY = y;*/
    }
    getX(){
        return this.middleX;
    }
    getY(){
        return this.middleY;
    }
    draw(x=this.middleX, y=this.middleY){

        // Draw the actual box
        ctx.strokeRect(x-(elementBoxWidth/2), y-(elementBoxHeight/2), elementBoxWidth, elementBoxHeight);

        // Draw the actual value
        ctx.fillText(this.value, x, y);

        // Draw the index
        if (this.showIndexNum){
            ctx.fillText(this.index, x, y + elementBoxHeight);
        }
    }
}