import { FC } from 'react';
import type { MouseEvent, KeyboardEvent } from 'react';
import type { GetContainer } from 'rc-util/lib/PortalWrapper';
import type { DrawerPopupProps } from './Popup';
export declare type Placement = 'left' | 'top' | 'right' | 'bottom';
export interface DrawerProps extends Omit<DrawerPopupProps, 'prefixCls' | 'inline' | 'scrollLocker'> {
    prefixCls?: string;
    open?: boolean;
    onClose?: (e: MouseEvent | KeyboardEvent) => void;
    destroyOnClose?: boolean;
    getContainer?: GetContainer | false;
}
declare const Drawer: FC<DrawerProps>;
export default Drawer;
