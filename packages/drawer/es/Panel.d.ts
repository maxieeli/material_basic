import type { CSSProperties, ReactNode, Ref } from 'react';
export interface DrawerPanelRef {
    focus: VoidFunction;
}
export interface DrawerPanelProps {
    prefixCls: string;
    className?: string;
    style: CSSProperties;
    children?: ReactNode;
    containerRef?: Ref<HTMLDivElement>;
}
declare const DrawerPanel: {
    (props: DrawerPanelProps): JSX.Element;
    displayName: string;
};
export default DrawerPanel;
