import type { KeyboardEventHandler } from 'react';
import type { ScrollConfig } from 'rc-virtual-list/lib/List';
export declare type OptionListProps = Record<string, never>;
export interface RefOptionListProps {
    onKeyDown: KeyboardEventHandler;
    onKeyUp: KeyboardEventHandler;
    scrollTo?: (args: number | ScrollConfig) => void;
}
declare const RefOptionList: import("react").ForwardRefExoticComponent<Pick<OptionListProps, string> & import("react").RefAttributes<RefOptionListProps>>;
export default RefOptionList;
