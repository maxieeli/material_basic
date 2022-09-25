import type { MouseEvent, DragEvent, Key as ReactKey, ReactNode, Context } from 'react';
import { IconType, Key, DataEntity, EventDataNode, NodeInstance, DataNode, BasicDataNode } from './interface';
import { DraggableConfig } from './Tree';
export declare type NodeMouseEventParams<TreeDataType extends BasicDataNode = DataNode, T = HTMLSpanElement> = {
    event: MouseEvent<T>;
    node: EventDataNode<TreeDataType>;
};
export declare type NodeDragEventParams<TreeDataType extends BasicDataNode = DataNode, T = HTMLDivElement> = {
    event: DragEvent<T>;
    node: EventDataNode<TreeDataType>;
};
export declare type NodeMouseEventHandler<TreeDataType extends BasicDataNode = DataNode, T = HTMLSpanElement> = (e: MouseEvent<T>, node: EventDataNode<TreeDataType>) => void;
export declare type NodeDragEventHandler<TreeDataType extends BasicDataNode = DataNode, T = HTMLDivElement> = (e: DragEvent<T>, node: NodeInstance<TreeDataType>, outsideTree?: boolean) => void;
export interface TreeContextProps<TreeDataType extends BasicDataNode = DataNode> {
    prefixCls: string;
    selectable: boolean;
    showIcon: boolean;
    icon: IconType;
    switcherIcon: IconType;
    draggable?: DraggableConfig;
    draggingNodeKey?: ReactKey;
    checkable: boolean | ReactNode;
    checkStrictly: boolean;
    disabled: boolean;
    keyEntities: Record<Key, DataEntity<any>>;
    dropLevelOffset?: number;
    dropContainerKey: Key | null;
    dropTargetKey: Key | null;
    dropPosition: -1 | 0 | 1 | null;
    indent: number | null;
    dropIndicatorRender: (props: {
        dropPosition: -1 | 0 | 1;
        dropLevelOffset: number;
        indent: any;
        prefixCls: any;
    }) => ReactNode;
    dragOverNodeKey: Key | null;
    loadData: (treeNode: EventDataNode<TreeDataType>) => Promise<void>;
    filterTreeNode: (treeNode: EventDataNode<TreeDataType>) => boolean;
    titleRender?: (node: any) => ReactNode;
    onNodeClick: NodeMouseEventHandler<TreeDataType>;
    onNodeDoubleClick: NodeMouseEventHandler<TreeDataType>;
    onNodeExpand: NodeMouseEventHandler<TreeDataType>;
    onNodeSelect: NodeMouseEventHandler<TreeDataType>;
    onNodeCheck: (e: MouseEvent<HTMLSpanElement>, treeNode: EventDataNode<TreeDataType>, checked: boolean) => void;
    onNodeLoad: (treeNode: EventDataNode<TreeDataType>) => void;
    onNodeMouseEnter: NodeMouseEventHandler<TreeDataType>;
    onNodeMouseLeave: NodeMouseEventHandler<TreeDataType>;
    onNodeContextMenu: NodeMouseEventHandler<TreeDataType>;
    onNodeDragStart: NodeDragEventHandler<any, any>;
    onNodeDragEnter: NodeDragEventHandler<any, any>;
    onNodeDragOver: NodeDragEventHandler<any, any>;
    onNodeDragLeave: NodeDragEventHandler<any, any>;
    onNodeDragEnd: NodeDragEventHandler<any, any>;
    onNodeDrop: NodeDragEventHandler<any, any>;
}
export declare const TreeContext: Context<TreeContextProps<any> | null>;
