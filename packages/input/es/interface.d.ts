import type { CSSProperties, ReactElement, ReactNode, MouseEventHandler, KeyboardEventHandler, InputHTMLAttributes } from 'react';
import type { LiteralUnion } from './utils/types';
import type { InputFocusOptions } from './utils/commonUtils';
export interface CommonInputProps {
    prefix?: ReactNode;
    suffix?: ReactNode;
    addonBefore?: ReactNode;
    addonAfter?: ReactNode;
    affixWrapperClassName?: string;
    groupClassName?: string;
    wrapperClassName?: string;
    inputClassName?: string;
    allowClear?: boolean | {
        clearIcon?: ReactNode;
    };
    label?: string | ReactNode;
}
export interface BaseInputProps extends CommonInputProps {
    value?: InputHTMLAttributes<HTMLInputElement>['value'];
    inputElement: ReactElement;
    prefixCls?: string;
    className?: string;
    style?: CSSProperties;
    disabled?: boolean;
    focused?: boolean;
    triggerFocus?: () => void;
    readOnly?: boolean;
    handleReset?: MouseEventHandler;
    hidden?: boolean;
}
export interface ShowCountProps {
    formatter: (args: {
        value: string;
        count: number;
        maxLength?: number;
    }) => ReactNode;
}
export interface InputProps extends CommonInputProps, Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix' | 'type'> {
    prefixCls?: string;
    type?: LiteralUnion<'button' | 'checkbox' | 'color' | 'date' | 'datetime-local' | 'email' | 'file' | 'hidden' | 'image' | 'month' | 'number' | 'password' | 'radio' | 'range' | 'reset' | 'search' | 'submit' | 'tel' | 'text' | 'time' | 'url' | 'week', string>;
    onPressEnter?: KeyboardEventHandler<HTMLInputElement>;
    showCount?: boolean | ShowCountProps;
    autoComplete?: string;
    htmlSize?: number;
}
export interface InputRef {
    focus: (options?: InputFocusOptions) => void;
    blur: () => void;
    setSelectionRange: (start: number, end: number, direction?: 'forward' | 'backward' | 'none') => void;
    select: () => void;
    input: HTMLInputElement | null;
}