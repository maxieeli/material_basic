import type { MouseEventHandler } from 'react';
export interface CheckboxProps {
    prefixCls: string;
    checked?: boolean;
    halfChecked?: boolean;
    disabled?: boolean;
    onClick?: MouseEventHandler;
}
export default function Checkbox({ prefixCls, checked, halfChecked, disabled, onClick, }: CheckboxProps): JSX.Element;
