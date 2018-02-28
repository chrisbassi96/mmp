class Node{

}

let datastructure = null;

function createADT(){
    let dtSelect = document.getElementById("dataStructure");
    let selected = dt.options[dt.selectedIndex].value;
    switch (selected){
        case "simple-array":
            datastructure = new SimpleArray();
            break;
    }
}