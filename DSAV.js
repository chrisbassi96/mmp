let dataStructure = null;
let showNulls = false;
let adt = null;


function createADT(type){
    let dtSelect = document.getElementById("dataStructure");
    let selected = dtSelect.options[dtSelect.selectedIndex].value;
    // below might set size as a String type...
    let size = document.getElementById("adt_size").value === ""?20:document.getElementById("adt_size").value;

    //ctx.textAlign = "center";

    switch (selected + "-" + type){
        case "simple-array-stack":
            dataStructure = new SimpleArrayStack(size);
            break;
        case "singly-linked-list-stack":
            dataStructure = new SinglyLinkedListStack();
            break;
        case "circular-array-queue":
            dataStructure = new CircularArrayQueue(size);
            break;
        case "doubly-linked-list-queue":
            dataStructure = new DoublyLinkedListQueue();
            break;
        default:
            console.log("Error in createADT function. type = " + type);
    }
}

