let dataStructure = null;
let showNulls = false;
let adt = null;
let canvas;
let ctx;

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
        case "circular-array-queue":
            dataStructure = new CircularArrayQueue();
            break;
        case "doubly-linked-list-queue":
            dataStructure = new DoublyLinkedListQueue();
            break;
        default:
            console.log("Error in createADT function. type = " + type);
    }
}

