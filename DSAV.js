let dataStructure = null;
let adt = null;
let canvas;
let ctx;

canvas = document.getElementById("myCanvas");
ctx = canvas.getContext("2d");
canvas.width = 1200;
canvas.height = 300;

let outputLabel = document.getElementById("output_msg");
let drawScale = 1;

function clearCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function createADT(type){
    let dtSelect = document.getElementById("dataStructure");
    let selected = dtSelect.options[dtSelect.selectedIndex].value;
    switch (selected + "-" + type){
        case "simple-array-stack":
            dataStructure = new SimpleArrayStack();
            break;
        case "singly-linked-list-stack":
            dataStructure = new SinglyLinkedListStack();
            break;
    }
}

