import type { ReactElement, KeyboardEventHandler, MouseEventHandler, ChangeEventHandler, ClipboardEventHandler, CompositionEventHandler } from 'react';
declare type InputRef = HTMLInputElement | HTMLTextAreaElement;
interface InputProps {
    prefixCls: string;
    id: string;
    inputElement: ReactElement;
    disabled: boolean;
    autoFocus: boolean;
    autoComplete: string;
    editable: boolean;
    activeDescendantId?: string;
    value: string;
    maxLength?: number;
    open: boolean;
    tabIndex: number;
    /** Pass accessibility props to input */
    attrs: Record<string, unknown>;
    onKeyDown: KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLElement>;
    onMouseDown: MouseEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLElement>;
    onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLElement>;
    onPaste: ClipboardEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLElement>;
    onCompositionStart: CompositionEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLElement>;
    onCompositionEnd: CompositionEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLElement>;
}
declare const RefInput: import("react").ForwardRefExoticComponent<InputProps & import("react").RefAttributes<InputRef>>;
export default RefInput;
