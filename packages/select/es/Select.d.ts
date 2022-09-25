import type { ReactNode, Key, Ref, PropsWithChildren, ReactElement } from 'react';
import type { BaseSelectPropsWithoutPrivate, BaseSelectRef, DisplayValueType, RenderNode } from './BaseSelect';
import OptGroup from './OptGroup';
import Option from './Option';
export declare type OnActiveValue = (active: RawValueType, index: number, info?: {
    source?: 'keyboard' | 'mouse';
}) => void;
export declare type OnInternalSelect = (value: RawValueType, info: {
    selected: boolean;
}) => void;
export declare type RawValueType = string | number;
export interface LabelInValueType {
    label: ReactNode;
    value: RawValueType;
    /** @deprecated `key` is useless since it should always same as `value` */
    key?: Key;
}
export declare type DraftValueType = RawValueType | LabelInValueType | DisplayValueType | (RawValueType | LabelInValueType | DisplayValueType)[];
export declare type FilterFunc<OptionType> = (inputValue: string, option?: OptionType) => boolean;
export interface FieldNames {
    value?: string;
    label?: string;
    options?: string;
}
export interface BaseOptionType {
    disabled?: boolean;
    [name: string]: any;
}
export interface DefaultOptionType extends BaseOptionType {
    label: ReactNode;
    value?: string | number | null;
    children?: Omit<DefaultOptionType, 'children'>[];
}
export declare type SelectHandler<ValueType = any, OptionType extends BaseOptionType = DefaultOptionType> = ((value: RawValueType | LabelInValueType, option: OptionType) => void) | ((value: ValueType, option: OptionType) => void);
declare type ArrayElementType<T> = T extends (infer E)[] ? E : T;
export interface SelectProps<ValueType = any, OptionType extends BaseOptionType = DefaultOptionType> extends BaseSelectPropsWithoutPrivate {
    prefixCls?: string;
    id?: string;
    backfill?: boolean;
    fieldNames?: FieldNames;
    /** @deprecated Use `searchValue` instead */
    inputValue?: string;
    searchValue?: string;
    onSearch?: (value: string) => void;
    autoClearSearchValue?: boolean;
    onSelect?: SelectHandler<ArrayElementType<ValueType>, OptionType>;
    onDeselect?: SelectHandler<ArrayElementType<ValueType>, OptionType>;
    /**
    * In Select, `false` means do nothing.
    * In TreeSelect, `false` will highlight match item.
    * It's by design.
    */
    filterOption?: boolean | FilterFunc<OptionType>;
    filterSort?: (optionA: OptionType, optionB: OptionType) => number;
    optionFilterProp?: string;
    optionLabelProp?: string;
    children?: ReactNode;
    options?: OptionType[];
    defaultActiveFirstOption?: boolean;
    virtual?: boolean;
    listHeight?: number;
    listItemHeight?: number;
    menuItemSelectedIcon?: RenderNode;
    mode?: 'combobox' | 'multiple' | 'tags';
    labelInValue?: boolean;
    value?: ValueType | null;
    defaultValue?: ValueType | null;
    onChange?: (value: ValueType, option: OptionType | OptionType[]) => void;
}
declare const TypedSelect: (<ValueType = any, OptionType extends DefaultOptionType | BaseOptionType = DefaultOptionType>(props: SelectProps<ValueType, OptionType> & {
    children?: ReactNode;
} & {
    ref?: Ref<BaseSelectRef>;
}) => ReactElement) & {
    Option: typeof Option;
    OptGroup: typeof OptGroup;
};
export default TypedSelect;
