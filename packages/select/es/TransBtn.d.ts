import type { MouseEventHandler, ReactNode, FC } from 'react';
import type { RenderNode } from './BaseSelect';
export interface TransBtnProps {
    className: string;
    customizeIcon: RenderNode;
    customizeIconProps?: any;
    onMouseDown?: MouseEventHandler<HTMLSpanElement>;
    onClick?: MouseEventHandler<HTMLSpanElement>;
    children?: ReactNode;
}
declare const TransBtn: FC<TransBtnProps>;
export default TransBtn;
