import type { Key } from 'react';
import type { DefaultOptionType, SingleValueType } from '../Cascader';
export declare const FIX_LABEL = "__cascader_fix_label__";
export interface ColumnProps {
    prefixCls: string;
    multiple?: boolean;
    options: DefaultOptionType[];
    /** Current Column opened item key */
    activeValue?: Key;
    /** The value path before current column */
    prevValuePath: Key[];
    onToggleOpen: (open: boolean) => void;
    onSelect: (valuePath: SingleValueType, leaf: boolean) => void;
    onActive: (valuePath: SingleValueType) => void;
    checkedSet: Set<Key>;
    halfCheckedSet: Set<Key>;
    loadingKeys: Key[];
    isSelectable: (option: DefaultOptionType) => boolean;
}
export default function Column({ prefixCls, multiple, options, activeValue, prevValuePath, onToggleOpen, onSelect, onActive, checkedSet, halfCheckedSet, loadingKeys, isSelectable, }: ColumnProps): JSX.Element;
