let adtController = null;
let showNulls = false;
let canvasObjectMan = null;
let animationSequencer = null;

function createADT(type){
    let dtSelect = document.getElementById("dataStructure");
    let selected = dtSelect.options[dtSelect.selectedIndex].value;
    // below might set size as a String type...
    let size = document.getElementById("adt_size").value === ""?20:parseInt(document.getElementById("adt_size").value);
    console.log(size);
    //ctx.textAlign = "center";
    let adt = null;
    let datastructureController = null;
    animationSequencer = new AnimationSequencer();

    switch (selected + "-" + type){
        case "simple-array-stack":
            adt = new SimpleArrayStack(size);
            datastructureController = new SimpleArrayController(adt.dataStructure);
            adtController = new SimpleArrayStackController(adt, datastructureController);
            break;
        case "singly-linked-list-stack":
            adt = new SinglyLinkedListStack();
            datastructureController = new SinglyLinkedListController(adt.dataStructure);
            adtController  = new SimpleArrayStackController(adt, datastructureController);
            break;
        case "circular-array-queue":
            adt = new CircularArrayQueue(size);
            break;
        case "doubly-linked-list-queue":
            adt = new DoublyLinkedListQueue();
            break;
        case "heap-array-priority-queue":
            adt = new HeapArrayPriorityQueue(size);
            break;
        default:
            console.log("Error in createADT function. type = " + type);
    }
    //canvasObjectMan.add(adt.dataStructure);
}

