canvas = document.getElementById("myCanvas");
ctx = canvas.getContext("2d");
canvas.width = 1200;
canvas.height = 300;

let outputLabel = document.getElementById("output_msg");
let drawScale = 1;

function clearCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}