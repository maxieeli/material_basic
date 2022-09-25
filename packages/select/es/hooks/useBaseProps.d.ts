/// <reference types="react" />
import type { BaseSelectProps } from '../BaseSelect';
export interface BaseSelectContextProps extends BaseSelectProps {
    triggerOpen: boolean;
    multiple: boolean;
    toggleOpen: (open?: boolean) => void;
}
export declare const BaseSelectContext: import("react").Context<BaseSelectContextProps>;
export default function useBaseProps(): BaseSelectContextProps;
