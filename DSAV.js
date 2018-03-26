let adt = null;
let showNulls = false;

function createADT(type){
    let dtSelect = document.getElementById("adt");
    let selected = dtSelect.options[dtSelect.selectedIndex].value;
    // below might set size as a String type...
    let size = document.getElementById("adt_size").value === ""?20:parseInt(document.getElementById("adt_size").value);

    //ctx.textAlign = "center";

    switch (selected + "-" + type){
        case "simple-array-stack":
            adt = new SimpleArrayStack(size);
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
}

