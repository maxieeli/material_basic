import type { ReactElement, CSSProperties } from 'react';
import type { AlignType } from 'rc-trigger/lib/interface';
import type { Placement, RenderDOMFunc } from './BaseSelect';
export interface RefTriggerProps {
    getPopupElement: () => HTMLDivElement;
}
export interface SelectTriggerProps {
    prefixCls: string;
    children: ReactElement;
    disabled: boolean;
    visible: boolean;
    popupElement: ReactElement;
    animation?: string;
    transitionName?: string;
    containerWidth: number;
    placement?: Placement;
    dropdownStyle: CSSProperties;
    dropdownClassName: string;
    dropdownMatchSelectWidth?: boolean | number;
    dropdownRender?: (menu: ReactElement) => ReactElement;
    getPopupContainer?: RenderDOMFunc;
    dropdownAlign: AlignType;
    empty: boolean;
    getTriggerDOMNode: () => HTMLElement;
    onPopupVisibleChange?: (visible: boolean) => void;
    onPopupMouseEnter: () => void;
}
declare const RefSelectTrigger: import("react").ForwardRefExoticComponent<SelectTriggerProps & import("react").RefAttributes<RefTriggerProps>>;
export default RefSelectTrigger;
