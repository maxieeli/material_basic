/// <reference types="react" />
import { TreeNodeProps } from './TreeNode';
import { FlattenNode } from './interface';
import { TreeNodeRequiredProps } from './utils/treeUtil';
interface MotionTreeNodeProps extends Omit<TreeNodeProps, 'domRef'> {
    active: boolean;
    motion?: any;
    motionNodes?: FlattenNode[];
    onMotionStart: () => void;
    onMotionEnd: () => void;
    motionType?: 'show' | 'hide';
    treeNodeRequiredProps: TreeNodeRequiredProps;
}
declare const RefMotionTreeNode: import("react").ForwardRefExoticComponent<MotionTreeNodeProps & import("react").RefAttributes<HTMLDivElement>>;
export default RefMotionTreeNode;
