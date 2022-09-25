import type { ReactNode, CSSProperties, ReactElement } from 'react';
import type { TriggerProps } from 'rc-trigger';
import type { AlignType, ActionType } from 'rc-trigger/lib/interface';
export interface TooltipProps extends Pick<TriggerProps, 'onPopupAlign' | 'builtinPlacements'> {
    trigger?: ActionType | ActionType[];
    defaultVisible?: boolean;
    visible?: boolean;
    placement?: string;
    /** Config popup motion */
    motion?: TriggerProps['popupMotion'];
    onVisibleChange?: (visible: boolean) => void;
    afterVisibleChange?: (visible: boolean) => void;
    overlay: (() => ReactNode) | ReactNode;
    overlayStyle?: CSSProperties;
    overlayClassName?: string;
    prefixCls?: string;
    mouseEnterDelay?: number;
    mouseLeaveDelay?: number;
    getTooltipContainer?: (node: HTMLElement) => HTMLElement;
    destroyTooltipOnHide?: boolean | {
        keepParent?: boolean;
    };
    align?: AlignType;
    showArrow?: boolean;
    arrowContent?: ReactNode;
    id?: string;
    children?: ReactElement;
    popupVisible?: boolean;
    overlayInnerStyle?: CSSProperties;
    zIndex?: number;
}
declare const _default: import("react").ForwardRefExoticComponent<TooltipProps & import("react").RefAttributes<unknown>>;
export default _default;
