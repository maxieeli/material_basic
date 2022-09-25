/// <reference types="react" />
import type { DefaultOptionType, SingleValueType, CascaderProps, InternalFieldNames } from '../Cascader';
declare const _default: (rawValues: SingleValueType[], options: DefaultOptionType[], fieldNames: InternalFieldNames, multiple: boolean, displayRender: CascaderProps['displayRender']) => {
    label: string | number | boolean | any[] | import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>> | import("react").ReactFragment;
    value: string;
    key: string;
    valueCells: SingleValueType;
    disabled: boolean;
}[];
export default _default;
