import type { CSSProperties, MouseEvent, KeyboardEvent, ReactNode } from 'react';
import type { CSSMotionProps } from 'rc-motion';
import type ScrollLocker from 'rc-util/lib/Dom/scrollLocker';
export declare type Placement = 'left' | 'right' | 'top' | 'bottom';
export interface PushConfig {
    distance?: number | string;
}
export interface DrawerPopupProps {
    prefixCls: string;
    open?: boolean;
    inline?: boolean;
    push?: boolean | PushConfig;
    forceRender?: boolean;
    autoFocus?: boolean;
    keyboard?: boolean;
    scrollLocker?: ScrollLocker;
    rootClassName?: string;
    rootStyle?: CSSProperties;
    zIndex?: number;
    placement?: Placement;
    className?: string;
    style?: CSSProperties;
    children?: ReactNode;
    width?: number | string;
    height?: number | string;
    contentWrapperStyle?: CSSProperties;
    mask?: boolean;
    maskClosable?: boolean;
    maskClassName?: CSSProperties;
    maskStyle?: CSSProperties;
    motion?: CSSMotionProps | ((placement: Placement) => CSSMotionProps);
    maskMotion?: CSSMotionProps;
    afterOpenChange?: (open: boolean) => void;
    onClose?: (event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>) => void;
}
export default function DrawerPopup(props: DrawerPopupProps): JSX.Element;
