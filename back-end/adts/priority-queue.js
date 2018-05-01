class HeapArrayPriorityQueue {
    constructor(size) {
        this.datastructure = new HeapArray(size);
    }

    insert(elementValue) {
        if (this.datastructure.isFull()) {
            this.datastructure.expand();
        }

        this.datastructure.content[this.datastructure.getNumElements()].setValue(elementValue);
        this.datastructure.numElements++;

        let j = this.datastructure.getNumElements() - 1;

        while (j > 0) {
            let p = HeapArray.parent(j);

            if (this.datastructure.content[j].getValue() >= this.datastructure.content[p].getValue()) {
                break;
            }

            this.datastructure.swap(j, p);
            j = p;
        }

        return {value: elementValue, index: this.datastructure.getNumElements() - 1};
    }

    removeMin() {
        if (this.datastructure.isEmpty()) {
            return null;
        }

        let min = this.datastructure.getElement(0);

        this.datastructure.swap(0, this.datastructure.numElements - 1);

        this.datastructure.setElementValue(this.datastructure.numElements - 1, null);
        this.datastructure.numElements--;

        let j = 0;

        while (this.datastructure.hasLeft(j)) {
            let right = this.datastructure.getElement(HeapArray.right(j));
            let left = this.datastructure.getElement(HeapArray.left(j));

            if (this.datastructure.hasRight(j) && right.getValue() < left.getValue()) {
                j = HeapArray.right(j);
            } else {
                j = HeapArray.left(j);
            }
        }

        while ((j > 0) && (this.datastructure.getElement(0).getValue() <= this.datastructure.getElement(j).getValue())) {
            j = HeapArray.parent(j);
        }

        let root = this.datastructure.getElement(0);
        while (j > 0) {
            this.datastructure.swap(0, j);
            j = HeapArray.parent(j);
        }

        return {value: min.getValue(), index: this.datastructure.numElements};
    }

    getMin() {
        if (this.datastructure.isEmpty()) {
            return null;
        }

        return this.datastructure.getElement(0).getValue();
    }
}