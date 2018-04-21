let adtController = null;
let showNulls = false;
let canvasObjectMan = null;
let animationSequencer = null;

function createADT(type){
    let dtSelect = document.getElementById("datastructure");
    let selected = dtSelect.options[dtSelect.selectedIndex].value;
    // below might set size as a String type...
    let size = document.getElementById("adt_size").value === ""?20:parseInt(document.getElementById("adt_size").value);
    console.log(size);
    //ctx.textAlign = "center";
    let adt = null;
    let datastructureController = null;
    let visualDatastructure = null;
    animationSequencer = new AnimationSequencer();

    switch (selected + "-" + type){
        case "simple-array-stack":
            adt = new SimpleArrayStack(size);
            //datastructureController = new SimpleArrayController(adt.datastructure);
            visualDatastructure = new VisualSimpleArray(adt.datastructure);
            adtController = new StackController(adt, visualDatastructure);
            break;
        case "singly-linked-list-stack":
            adt = new SinglyLinkedListStack();
            //datastructureController = new SinglyLinkedListController(adt.datastructure);
            visualDatastructure = new VisualSinglyLinkedList(adt.datastructure);
            adtController  = new StackController(adt, visualDatastructure);
            break;
        case "circular-array-queue":
            adt = new CircularArrayQueue(size);
            //datastructureController = new CircularArrayController(adt.dataStructure);
            visualDatastructure = new QueueController(adt.dataStructure);
            adtController = new QueueController(adt, visualDatastructure);
            break;
        case "doubly-linked-list-queue":
            adt = new DoublyLinkedListQueue();
            break;
        case "heap-array-priority-queue":
            adt = new HeapArrayPriorityQueue(size);
            //datastructureController = new HeapArrayController(adt.dataStructure);
            visualDatastructure = new VisualHeapArray(adt.dataStructure);
            adtController = new PriorityQueueController(adt, visualDatastructure);
            break;
        default:
            console.log("Error in createADT function. type = " + type);
    }
    //canvasObjectMan.addTempObject(adts.datastructure);
}

