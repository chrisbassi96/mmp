let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
canvas.width = 1200;
canvas.height = 600;
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.font="10px Arial";

//Visualization settings
let topMargin = 10;
let leftMargin = 50;

// Canvas elements
let elementBoxLabelY = 10;
let elementBoxWidth = 50;
let elementBoxHeight = 50;

let outputLabel = document.getElementById("output_msg");
let drawScale = 1;

function clearCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawLabelledArrowOld(label, pointerGap, fromX, fromY, toX, toY){
    let pointerOrientation = "";
    let labelWidth = ctx.measureText(label).width;

    // Only works for arrows that are running along a constant plane, i.e. one going up and right is not possible
    if (fromX < toX){
        pointerOrientation = "right";
    }else if (fromX > toX){
        pointerOrientation = "left";
    }else if (fromY < toY){
        pointerOrientation = "down";
    }else if (fromY > toY){
        pointerOrientation = "up";
    }

    ctx.fillText(label, fromX, fromY);
    console.log(pointerOrientation);
    // Need to find a more elegant solution to replace this switch
    switch (pointerOrientation){
        case "down":
            ctx.beginPath();
            ctx.moveTo(fromX, fromY+5); // Margin of 5 pixels
            ctx.lineTo(toX, toY-pointerGap-10); // toY - pointerGap - size of pointer
            ctx.closePath();
            ctx.stroke();
            // Need to determine our direction: going up, right, down, left?
            // Draw pointer triangle
            ctx.beginPath();
            ctx.moveTo(toX+5, toY-pointerGap-10); // Margin of 5 pixels
            ctx.lineTo(toX, toY-pointerGap); // Instead of elementBoxY, perhaps the Y of the exact container?
            ctx.lineTo(toX-5, toY-pointerGap-10);
            ctx.closePath();
            ctx.fill();
            break;
        case "left":
            ctx.beginPath();
            ctx.moveTo(fromX-(labelWidth/2)-5, fromY); // Margin of 5 pixels
            ctx.lineTo(toX+10, toY);
            ctx.closePath();
            ctx.stroke();
            // Draw pointer triangle
            ctx.beginPath();
            ctx.moveTo(toX+10, toY-5); // Margin of 5 pixels
            ctx.lineTo(toX, toY); // Instead of elementBoxY, perhaps the Y of the exact container?
            ctx.lineTo(toX+10, toY+5);
            ctx.closePath();
            ctx.fill();
            break;
        case "right":
            ctx.beginPath();
            ctx.moveTo(fromX+(labelWidth/2)+5, fromY); // Margin of 5 pixels
            ctx.lineTo(toX-10, toY);
            ctx.closePath();
            ctx.stroke();
            // Draw pointer triangle
            ctx.beginPath();
            ctx.moveTo(toX-10, toY+5); // Margin of 5 pixels
            ctx.lineTo(toX, toY); // Instead of elementBoxY, perhaps the Y of the exact container?
            ctx.lineTo(toX-10, toY-5);
            ctx.closePath();
            ctx.fill();
            break;
    }
}
// Resource used: http://dbp-consulting.com/tutorials/canvas/CanvasArrow.html
function drawLabelledArrow(label, pointerGap, fromX, fromY, toX, toY){
    let pointerOrientation = "";
    let labelWidth = ctx.measureText(label).width;
    let lineAngle = Math.atan2(toY-fromY, toX-fromX);
    let angleFromShaftToArrowHeadCorner = Math.PI/8;
    let lengthOfArrowHeadSide = Math.abs(12/Math.cos(angleFromShaftToArrowHeadCorner));

    ctx.fillText(label, fromX, fromY);
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();

    let angleFromShaftToArrowHeadCornerTop = lineAngle + Math.PI + angleFromShaftToArrowHeadCorner;
    let arrowHeadCornerTopX = toX + Math.cos(angleFromShaftToArrowHeadCornerTop)*lengthOfArrowHeadSide;
    let arrowHeadCornerTopY = toY + Math.sin(angleFromShaftToArrowHeadCornerTop)*lengthOfArrowHeadSide;

    let angleFromShaftToArrowHeadCornerBottom = lineAngle + Math.PI - angleFromShaftToArrowHeadCorner;
    let arrowHeadCornerBottomX = toX + Math.cos(angleFromShaftToArrowHeadCornerBottom)*lengthOfArrowHeadSide;
    let arrowHeadCornerBottomY = toY + Math.sin(angleFromShaftToArrowHeadCornerBottom)*lengthOfArrowHeadSide;


    ctx.beginPath();
    ctx.moveTo(arrowHeadCornerTopX,arrowHeadCornerTopY);
    ctx.lineTo(toX,toY);
    ctx.lineTo(arrowHeadCornerBottomX,arrowHeadCornerBottomY);
    ctx.lineTo(arrowHeadCornerTopX,arrowHeadCornerTopY);
    ctx.fill();



/*    ctx.fillText(label, fromX, fromY);
    console.log(pointerOrientation);
    ctx.beginPath();
    ctx.moveTo(fromX, fromY + 5); // Margin of 5 pixels
    ctx.lineTo(arrowHeadCornerTopX, arrowHeadCornerTopY); // toY - pointerGap - size of pointer
    ctx.closePath();
    ctx.stroke();
    // Need to determine our direction: going up, right, down, left?
    // Draw pointer triangle
    ctx.beginPath();
    ctx.moveTo(toX, toY); // Margin of 5 pixels
    ctx.lineTo(toX, toY - pointerGap); // Instead of elementBoxY, perhaps the Y of the exact container?
    ctx.lineTo(toX - 5, toY - pointerGap - 10);
    ctx.closePath();
    ctx.fill();*/
}