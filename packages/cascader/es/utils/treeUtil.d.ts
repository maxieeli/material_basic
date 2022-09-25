import type { Key } from 'react';
import type { SingleValueType, DefaultOptionType, InternalFieldNames, ShowCheckedStrategy } from '../Cascader';
import type { GetEntities } from '../hooks/useEntities';
export declare function formatStrategyValues(pathKeys: Array<Key>, getKeyPathEntities: GetEntities, showCheckedStrategy: ShowCheckedStrategy): Key[];
export declare function toPathOptions(valueCells: SingleValueType, options: DefaultOptionType[], fieldNames: InternalFieldNames, stringMode?: boolean): {
    value: SingleValueType[number];
    index: number;
    option: DefaultOptionType;
}[];
