let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
canvas.width = 1200;
canvas.height = 600;
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.font="10px Arial";

//Visualization settings
let topBottomMargin = 10;
let leftMargin = 50;

// Canvas elements
let elementBoxLabelY = 10;
let elementBoxWidth = 50;
let elementBoxHeight = 50;

// Animation settings
let animationSteps = 200; // i.e. speed

let outputLabel = document.getElementById("output_msg");
let drawScale = 1;

function clearCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Resource used: http://dbp-consulting.com/tutorials/canvas/CanvasArrow.html
function drawLabelledArrow(label, pointerGap, fromX, fromY, toX, toY){
    let lineAngle = Math.atan2(toY-fromY, toX-fromX);
    let angleFromShaftToArrowHeadCorner = Math.PI/8;
    //let lengthOfArrowHeadSide = Math.abs(12/Math.cos(angleFromShaftToArrowHeadCorner));
    let lengthOfArrowHeadSide = 10;

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
}