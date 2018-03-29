let adt = null;
let showNulls = false;
let test = null;

function createADT(type){
    let dtSelect = document.getElementById("dataStructure");
    let selected = dtSelect.options[dtSelect.selectedIndex].value;
    // below might set size as a String type...
    let size = document.getElementById("adt_size").value === ""?20:parseInt(document.getElementById("adt_size").value);
    console.log(size);
    //ctx.textAlign = "center";

    switch (selected + "-" + type){
        case "simple-array-stack":

            adt = new SimpleArrayStack(size);
            controller = new StackController(adt);
            break;
        case "singly-linked-list-stack":
            adt = new SinglyLinkedListStack();
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
    test.add(adt.dataStructure);
}

