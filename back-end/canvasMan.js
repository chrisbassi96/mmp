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
let elementBoxLabelY = topMargin;
let elementBoxWidth = 50;
let elementBoxHeight = 50;
let elementBoxX = leftMargin*1;
let elementBoxY = topMargin*1;
let elementBoxMiddleX = elementBoxWidth*0.5;
let elementBoxMiddleY = elementBoxY + elementBoxHeight*0.5;
let elementBoxIndexY = elementBoxMiddleY + elementBoxHeight;

let outputLabel = document.getElementById("output_msg");
let drawScale = 1;

function clearCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Should comment on using this in the report, why is this a better method?
function drawElementBox(x, y, element, index){
    console.log("x: " + x + " y: " + y + " + element: " + element + " index: " + index);
    ctx.strokeRect(x, y, elementBoxWidth, elementBoxHeight);
/*    if (element === undefined || element == null){

    }*/
    element.draw(x, y, index);
/*    ctx.fillText(element, x+elementBoxMiddleX, elementBoxMiddleY);
    ctx.fillText(index, x+elementBoxMiddleX, elementBoxIndexY);*/
}