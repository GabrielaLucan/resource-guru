import { ACCEPTED_OPERATIONS, OPERATIONS } from "./constants.js";

/*  
    Implements Node expression tree class. 
 */
export class Node {

    /*  Creates an instance of Node  */
    constructor({ operator, value, left, right }) {
        if (operator && !ACCEPTED_OPERATIONS.includes(operator)) {
            throw new Error(`This operation is not accepted. Please use one of the following: ${ACCEPTED_OPERATIONS.join(' , ')}`)
        }
        if (!operator && !value) {
            throw new Error(`If no operator is given, value must be provided.`)
        }

        this.operator = operator;
        this.value = value;
        this.left = left;
        this.right = right;
    }

    /* Returns the result of the node expression */
    result() {
        return this.operator
            ? OPERATIONS[this.operator](this.left.result(), this.right.result())
            : this.value
    };

    /* Retruns the stringified version of the node expression */
    toString() {
        return this.operator
            ? `(${this.left.toString()} ${this.operator} ${this.right.toString()})`
            : this.value.toString()
    };
}
