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
            console.log(adt.datastructure);
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
            //datastructureController = new CircularArrayController(adt.datastructure);
            visualDatastructure = new VisualCircularArray(adt.datastructure);
            adtController = new QueueController(adt, visualDatastructure);
            break;
        case "doubly-linked-list-queue":
            adt = new DoublyLinkedListQueue();
            break;
        case "heap-array-priority-queue":
            adt = new HeapArrayPriorityQueue(size);
            //datastructureController = new HeapArrayController(adt.datastructure);
            visualDatastructure = new VisualHeapArray(adt.datastructure);
            adtController = new PriorityQueueController(adt, visualDatastructure);
            break;
        default:
            console.log("Error in createADT function. type = " + type);
    }
    //canvasObjectMan.addTempObject(adts.datastructure);
}

function toggleControlInputs(){
    // Code for this function adapted from https://stackoverflow.com/questions/1202087/how-do-i-disable-all-input-buttons-without-using-jquery

    let inputsInteractionPanel = document.getElementById("interaction-panel").getElementsByTagName("INPUT");
    let inputsVisualizationControlPanel = document.getElementById("visualization-control-panel").getElementsByTagName("INPUT");

    for (let i = 0; i < inputsInteractionPanel.length; i++) {
        inputsInteractionPanel[i].disabled = !inputsInteractionPanel[i].disabled;
    }
    for (let i = 0; i < inputsVisualizationControlPanel.length; i++) {
        inputsVisualizationControlPanel[i].disabled = !inputsVisualizationControlPanel[i].disabled;
    }
}

