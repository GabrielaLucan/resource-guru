import { expect, assert } from 'chai';
import { Node } from "../src/index.js";

describe('#node-tree', async () => {
    it('It should stringify a simple tree', async () => {
        const tree = new Node({
            operator: "+",
            left: new Node({
                operator: "÷",
                left: new Node({ value: 2 }),
                right: new Node({ value: 2 })
            }),
            right: new Node({ value: 2 })
        }
        );

        assert.strictEqual("((2 ÷ 2) + 2)", tree.toString());
        assert.strictEqual(3, tree.result());
    });

    it('It should stringify a complex tree', async () => {
        const tree = new Node({
            operator: "÷",
            left: new Node({
                operator: "+",
                left: new Node({ value: 7 }),
                right: new Node({
                    operator: "x",
                    left: new Node({
                        operator: "-",
                        left: new Node({ value: 3 }),
                        right: new Node({ value: 2 })
                    }),
                    right: new Node({ value: 5 })
                })
            }),
            right: new Node({ value: 6 })
        }
        );

        assert.strictEqual("((7 + ((3 - 2) x 5)) ÷ 6)", tree.toString());
        assert.strictEqual(2, tree.result());

    });

    it('It should throw error if the operation in not one of the accepted ones', async () => {
        try {
            new Node({
                operator: "%",
                left: new Node({ value: 10 }),
                right: new Node({ value: 2 })
            });

            assert.fail('It should\'ve thrown error. Given operation is %');
        } catch (err) {
            expect(err?.message).to.eq('This operation is not accepted. Please use one of the following: + , - , x , ÷');
        }
    });

    it('It should throw error if neither operator or value was given', async () => {
        try {
            new Node({
                left: new Node({ value: 10 }),
                right: new Node({ value: 2 })
            });

            assert.fail('It should\'ve thrown error. Neither operator or value given');
        } catch (err) {
            expect(err?.message).to.eq('If no operator is given, value must be provided.');
        }
    });
});
