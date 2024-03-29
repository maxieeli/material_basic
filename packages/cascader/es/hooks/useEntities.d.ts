import type { DataEntity } from 'developerli/tree/es/interface';
import type { DefaultOptionType, InternalFieldNames } from '../Cascader';
export interface OptionsInfo {
    keyEntities: Record<string, DataEntity>;
    pathKeyEntities: Record<string, DataEntity>;
}
export declare type GetEntities = () => OptionsInfo['pathKeyEntities'];
/** Lazy parse options data into conduct-able info to avoid perf issue in single mode */
declare const _default: (options: DefaultOptionType[], fieldNames: InternalFieldNames) => GetEntities;
export default _default;
