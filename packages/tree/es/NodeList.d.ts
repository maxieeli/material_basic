import type { CSSProperties, KeyboardEventHandler, FocusEventHandler } from 'react';
import { BasicDataNode, FlattenNode, Key, DataEntity, DataNode, ScrollTo } from './interface';
export declare const MOTION_KEY: string;
export declare const MotionEntity: DataEntity;
export interface NodeListRef {
    scrollTo: ScrollTo;
    getIndentWidth: () => number;
}
interface NodeListProps<TreeDataType extends BasicDataNode> {
    prefixCls: string;
    style: CSSProperties;
    data: FlattenNode<TreeDataType>[];
    motion: any;
    focusable?: boolean;
    activeItem: FlattenNode<TreeDataType>;
    focused?: boolean;
    tabIndex: number;
    checkable?: boolean;
    selectable?: boolean;
    disabled?: boolean;
    expandedKeys: Key[];
    selectedKeys: Key[];
    checkedKeys: Key[];
    loadedKeys: Key[];
    loadingKeys: Key[];
    halfCheckedKeys: Key[];
    keyEntities: Record<Key, DataEntity<any>>;
    dragging: boolean;
    dragOverNodeKey: Key;
    dropPosition: number;
    height: number;
    itemHeight: number;
    virtual?: boolean;
    onKeyDown?: KeyboardEventHandler<HTMLDivElement>;
    onFocus?: FocusEventHandler<HTMLDivElement>;
    onBlur?: FocusEventHandler<HTMLDivElement>;
    onActiveChange: (key: Key) => void;
    onListChangeStart: () => void;
    onListChangeEnd: () => void;
}
/**
* We only need get visible content items to play the animation.
*/
export declare function getMinimumRangeTransitionRange(list: FlattenNode[], virtual: boolean, height: number, itemHeight: number): FlattenNode<DataNode>[];
declare const NodeList: import("react").ForwardRefExoticComponent<NodeListProps<any> & import("react").RefAttributes<NodeListRef>>;
export default NodeList;
