import type { ReactNode, ReactElement, CSSProperties, Ref, PropsWithChildren } from 'react';
import type { BaseSelectPropsWithoutPrivate, BaseSelectRef } from 'developerli/select';
import type { Placement } from 'developerli/select/es/BaseSelect';
import { SHOW_CHILD, SHOW_PARENT } from './utils/commonUtil';
export interface ShowSearchType<OptionType extends BaseOptionType = DefaultOptionType> {
    filter?: (inputValue: string, options: OptionType[], fieldNames: FieldNames) => boolean;
    render?: (inputValue: string, path: OptionType[], prefixCls: string, fieldNames: FieldNames) => ReactNode;
    sort?: (a: OptionType[], b: OptionType[], inputValue: string, fieldNames: FieldNames) => number;
    matchInputWidth?: boolean;
    limit?: number | false;
}
export interface FieldNames {
    label?: string;
    value?: string;
    children?: string;
}
export interface InternalFieldNames extends Required<FieldNames> {
    key: string;
}
export declare type SingleValueType = (string | number)[];
export declare type ValueType = SingleValueType | SingleValueType[];
export declare type ShowCheckedStrategy = typeof SHOW_PARENT | typeof SHOW_CHILD;
export interface BaseOptionType {
    disabled?: boolean;
    [name: string]: any;
}
export interface DefaultOptionType extends BaseOptionType {
    label: ReactNode;
    value?: string | number | null;
    children?: DefaultOptionType[];
}
interface BaseCascaderProps<OptionType extends BaseOptionType = DefaultOptionType> extends Omit<BaseSelectPropsWithoutPrivate, 'tokenSeparators' | 'labelInValue' | 'mode' | 'showSearch'> {
    id?: string;
    prefixCls?: string;
    fieldNames?: FieldNames;
    children?: ReactElement;
    value?: ValueType;
    defaultValue?: ValueType;
    changeOnSelect?: boolean;
    displayRender?: (label: string[], selectedOptions?: OptionType[]) => ReactNode;
    checkable?: boolean | ReactNode;
    showCheckedStrategy?: ShowCheckedStrategy;
    showSearch?: boolean | ShowSearchType<OptionType>;
    searchValue?: string;
    onSearch?: (value: string) => void;
    expandTrigger?: 'hover' | 'click';
    options?: OptionType[];
    /** @private Internal usage. Do not use in your production. */
    dropdownPrefixCls?: string;
    loadData?: (selectOptions: OptionType[]) => void;
    /** @deprecated Use `open` instead */
    popupVisible?: boolean;
    /** @deprecated Use `dropdownClassName` instead */
    popupClassName?: string;
    dropdownClassName?: string;
    dropdownMenuColumnStyle?: CSSProperties;
    /** @deprecated Use `placement` instead */
    popupPlacement?: Placement;
    placement?: Placement;
    /** @deprecated Use `onDropdownVisibleChange` instead */
    onPopupVisibleChange?: (open: boolean) => void;
    onDropdownVisibleChange?: (open: boolean) => void;
    expandIcon?: ReactNode;
    loadingIcon?: ReactNode;
}
declare type OnSingleChange<OptionType> = (value: SingleValueType, selectOptions: OptionType[]) => void;
declare type OnMultipleChange<OptionType> = (value: SingleValueType[], selectOptions: OptionType[][]) => void;
export interface SingleCascaderProps<OptionType extends BaseOptionType = DefaultOptionType> extends BaseCascaderProps<OptionType> {
    checkable?: false;
    onChange?: OnSingleChange<OptionType>;
}
export interface MultipleCascaderProps<OptionType extends BaseOptionType = DefaultOptionType> extends BaseCascaderProps<OptionType> {
    checkable: true | ReactNode;
    onChange?: OnMultipleChange<OptionType>;
}
export declare type CascaderProps<OptionType extends BaseOptionType = DefaultOptionType> = SingleCascaderProps<OptionType> | MultipleCascaderProps<OptionType>;
export declare type InternalCascaderProps<OptionType extends BaseOptionType = DefaultOptionType> = Omit<SingleCascaderProps<OptionType> | MultipleCascaderProps<OptionType>, 'onChange'> & {
    onChange?: (value: SingleValueType | SingleValueType[], selectOptions: OptionType[] | OptionType[][]) => void;
};
export declare type CascaderRef = Omit<BaseSelectRef, 'scrollTo'>;
declare const Cascader: (<OptionType extends DefaultOptionType | BaseOptionType = DefaultOptionType>(props: PropsWithChildren<CascaderProps<OptionType>> & {
    ref?: Ref<BaseSelectRef>;
}) => ReactElement) & {
    displayName?: string;
    SHOW_PARENT: typeof SHOW_PARENT;
    SHOW_CHILD: typeof SHOW_CHILD;
};
export default Cascader;
