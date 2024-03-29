import type { ReactNode } from 'react';
import type { FieldNames, RawValueType } from '../Select';
/**
 * Parse `children` to `options` if `options` is not provided.
 * Then flatten the `options`.
 */
export default function useOptions<OptionType>(options: OptionType[], children: ReactNode, fieldNames: FieldNames, optionFilterProp: string, optionLabelProp: string): {
    options: OptionType[];
    valueOptions: Map<RawValueType, OptionType>;
    labelOptions: Map<ReactNode, OptionType>;
};
