let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
canvas.width = 1200;
canvas.height = 300;
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.font="10px Arial";

//Visualization settings
let topMargin = 100;
let leftMargin = 50;

// Canvas elements
let elementBoxLabelY = 10;
let elementBoxWidth = 50;
let elementBoxHeight = 50;
let elementBoxX = leftMargin*1;
let elementBoxY = topMargin*1.5;
let elementBoxMiddleX = elementBoxWidth*0.5;
let elementBoxMiddleY = elementBoxY + elementBoxHeight*0.5;
let elementBoxIndexY = elementBoxMiddleY + elementBoxHeight;

let outputLabel = document.getElementById("output_msg");
let drawScale = 1;

function clearCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawLabelledArrow(label, fromX, fromY, toX, toY){
    ctx.fillText(label, fromX, fromY);

    ctx.beginPath();
    ctx.moveTo(fromX, fromY); // Margin of 5 pixels
    ctx.lineTo(toX, toY);
    ctx.closePath();
    ctx.stroke();
    // Need to determine our direction: going up, right, down, left?
    // Draw pointer triangle
    ctx.beginPath();
    ctx.moveTo(toX-5, toY-20); // Margin of 5 pixels
    ctx.lineTo(toX, toY); // Instead of elementBoxY, perhaps the Y of the exact container?
    ctx.lineTo(toX+5, toY-20);
    ctx.closePath();
    ctx.fill();
}