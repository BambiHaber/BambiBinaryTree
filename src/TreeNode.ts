import {ITreeNode} from "./ITreeNode";

export default class TreeNode implements ITreeNode {
    get data(): any {
        return this._data;
    }

    set data(value: any) {
        this._data = value;
    }

    get left(): ITreeNode | null {
        return this._left;
    }

    set left(value: ITreeNode | null) {
        this._left = value;
    }

    get right(): ITreeNode | null {
        return this._right;
    }

    set right(value: ITreeNode | null) {
        this._right = value;
    }

    private _data: any;
    private _left: ITreeNode | null;
    private _right: ITreeNode | null;

    toJSON: () => { data: any; left: ITreeNode; right: ITreeNode } = () => ({
        data: this.data,
        left: this.left,
        right: this.right
    });

    constructor(data: any, left?: ITreeNode | null, right?: ITreeNode | null) {
        this._data = data;
        this._left = left ? left : null;
        this._right = right ? right : null;
    }
}
