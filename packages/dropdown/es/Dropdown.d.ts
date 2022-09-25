import type { CSSProperties, ReactElement } from 'react';
import type { TriggerProps } from 'rc-trigger';
import type { AnimationType, AlignType, BuildInPlacements, ActionType } from 'rc-trigger/lib/interface';
export interface DropdownProps extends Pick<TriggerProps, 'getPopupContainer' | 'children' | 'mouseEnterDelay' | 'mouseLeaveDelay' | 'onPopupAlign' | 'builtinPlacements'> {
    minOverlayWidthMatchTrigger?: boolean;
    arrow?: boolean;
    onVisibleChange?: (visible: boolean) => void;
    onOverlayClick?: (e: Event) => void;
    prefixCls?: string;
    transitionName?: string;
    overlayClassName?: string;
    openClassName?: string;
    animation?: AnimationType;
    align?: AlignType;
    overlayStyle?: CSSProperties;
    placement?: string;
    placements?: BuildInPlacements;
    overlay?: (() => ReactElement) | ReactElement;
    trigger?: ActionType | ActionType[];
    alignPoint?: boolean;
    showAction?: ActionType[];
    hideAction?: ActionType[];
    visible?: boolean;
    autoFocus?: boolean;
}
declare const _default: import("react").ForwardRefExoticComponent<DropdownProps & import("react").RefAttributes<unknown>>;
export default _default;
