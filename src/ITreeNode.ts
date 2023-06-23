export interface ITreeNode {
    data: any;
    left?: ITreeNode | null
    right?: ITreeNode | null
    toJSON: Function
}
