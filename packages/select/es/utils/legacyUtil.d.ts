import type { ReactNode } from 'react';
import type { BaseOptionType, DefaultOptionType } from '../Select';
export declare function convertChildrenToData<OptionType extends BaseOptionType = DefaultOptionType>(nodes: ReactNode, optionOnly?: boolean): OptionType[];
