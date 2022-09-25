import type { ReactNode, CSSProperties } from 'react';
export interface ContentProps {
    prefixCls?: string;
    children: (() => ReactNode) | ReactNode;
    id?: string;
    overlayInnerStyle?: CSSProperties;
    arrowContent?: ReactNode;
    className?: string;
    style?: CSSProperties;
    showArrow?: boolean;
}
export default function Popup(props: ContentProps): JSX.Element;
