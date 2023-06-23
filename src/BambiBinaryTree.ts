import {ITreeNode} from "./ITreeNode";
import TreeNode from "./TreeNode";


interface IBambiBinaryTree {
    create(data: any): void;

    delete(data: any): void;

    search(treeNode: ITreeNode, data): ITreeNode;

    min(treeNode: ITreeNode): any;

    traverse(treeNode: ITreeNode): IterableIterator<any>;

    pretraverse(treeNode: ITreeNode): IterableIterator<any>;

    posttraverse(treeNode: ITreeNode): IterableIterator<any>;
}

export default class BambiBinaryTree implements IBambiBinaryTree {
    get root(): ITreeNode | null {
        return this._root;
    }

    set root(value: ITreeNode | null) {
        this._root = value;
    }

    private _root: ITreeNode | null;

    constructor() {
        this.root = null;
    }

    create(data: any) {
        let treeNode: TreeNode = new TreeNode(data);

        if (this.root === null) {
            this.root = treeNode;
        } else {
            this.createNode(this.root, treeNode);
        }
    }

    //* I made this private for an auto insertion by data comparison, this of course can be rendered public if.. and .. ef..
    private createNode(treeNode: ITreeNode, newTreeNode: ITreeNode) {
        if (newTreeNode.data < treeNode.data) {
            if (treeNode.left === null) {
                treeNode.left = newTreeNode;
            } else {
                this.createNode(treeNode.left, newTreeNode);
            }
        } else {
            if (treeNode.right === null) {
                treeNode.right = newTreeNode;
            } else {
                this.createNode(treeNode.right, newTreeNode);
            }
        }
    }


    delete(data: any) {
        this.root = this.deleteNode(this.root, data);
    }


    search(treeNode: ITreeNode, data): ITreeNode {
        if (treeNode === null) {
            return null;
        } else if (data < treeNode.data) {
            return this.search(treeNode.left, data);
        } else if (data > treeNode.data) {
            return this.search(treeNode.right, data);
        } else {
            return treeNode;
        }
    }

    private deleteNode(treeNode: ITreeNode, dataToRemove: any) {
        if (treeNode === null) {
            return null;
        } else if (dataToRemove < treeNode.data) {
            treeNode.left = this.deleteNode(treeNode.left, dataToRemove);
            return treeNode;
        }

            // if data to be delete is greater than
        // roots data then move to right subtree
        else if (dataToRemove > treeNode.data) {
            treeNode.right = this.deleteNode(treeNode.right, dataToRemove);
            return treeNode;
        } else {
            if (treeNode.left === null && treeNode.right === null) {
                treeNode = null;
                return treeNode;
            }
            if (treeNode.left === null) {
                treeNode = treeNode.right;
                return treeNode;
            } else if (treeNode.right === null) {
                treeNode = treeNode.left;
                return treeNode;
            }

            //OPTIMIZE DELETION PRIORITY
            let opt = this.min(treeNode.right);
            treeNode.data = opt.data;
            treeNode.right = this.deleteNode(treeNode.right, opt.data);
            return treeNode;
        }


    }

    min(treeNode: ITreeNode) {
        return treeNode.left === null ? treeNode : this.min(treeNode.left);
    }

    //In-order
    * traverse(treeNode: ITreeNode, log = false) {
        if (treeNode !== null) {
            this.traverse(treeNode.left);
            yield treeNode.data;
            if(log){
                console.log(`\t/\n${treeNode.data}`);
            }
            this.traverse(treeNode.right);
        }
    }

    * pretraverse(treeNode: ITreeNode,log = false) {
        if (treeNode !== null) {
            if(log){
                console.log(`\t${treeNode.data}`);
            }
            yield treeNode.data;
            this.pretraverse(treeNode.left);
            this.pretraverse(treeNode.right);
        }
    }

    * posttraverse(treeNode: ITreeNode,log = false) {
        if (treeNode !== null) {
            this.posttraverse(treeNode.left);
            this.posttraverse(treeNode.right);
            if(log){
                console.log(`${treeNode.data}`);
            }
            yield treeNode.data;
        }
    }

}
