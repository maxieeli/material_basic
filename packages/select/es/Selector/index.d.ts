import type { Ref, ReactNode, KeyboardEventHandler, MouseEventHandler, ChangeEventHandler, CompositionEventHandler, ReactElement, ClipboardEventHandler } from 'react';
import type { ScrollTo } from 'rc-virtual-list/lib/List';
import type { CustomTagProps, DisplayValueType, Mode, RenderNode } from '../BaseSelect';
export interface InnerSelectorProps {
    prefixCls: string;
    id: string;
    mode: Mode;
    inputRef: Ref<HTMLInputElement | HTMLTextAreaElement>;
    placeholder?: ReactNode;
    disabled?: boolean;
    autoFocus?: boolean;
    autoComplete?: string;
    values: DisplayValueType[];
    showSearch?: boolean;
    searchValue: string;
    activeDescendantId?: string;
    open: boolean;
    tabIndex?: number;
    maxLength?: number;
    onInputKeyDown: KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    onInputMouseDown: MouseEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    onInputChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    onInputPaste: ClipboardEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    onInputCompositionStart: CompositionEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    onInputCompositionEnd: CompositionEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}
export interface RefSelectorProps {
    focus: () => void;
    blur: () => void;
    scrollTo?: ScrollTo;
}
export interface SelectorProps {
    id: string;
    prefixCls: string;
    showSearch?: boolean;
    open: boolean;
    /** Display in the Selector value, it's not same as `value` prop */
    values: DisplayValueType[];
    mode: Mode;
    searchValue: string;
    activeValue: string;
    inputElement: JSX.Element;
    maxLength?: number;
    autoFocus?: boolean;
    activeDescendantId?: string;
    tabIndex?: number;
    disabled?: boolean;
    placeholder?: ReactNode;
    removeIcon?: RenderNode;
    maxTagCount?: number | 'responsive';
    maxTagTextLength?: number;
    maxTagPlaceholder?: ReactNode | ((omittedValues: DisplayValueType[]) => ReactNode);
    tagRender?: (props: CustomTagProps) => ReactElement;
    /** Check if `tokenSeparators` contains `\n` or `\r\n` */
    tokenWithEnter?: boolean;
    choiceTransitionName?: string;
    onToggleOpen: (open?: boolean) => void;
    /** `onSearch` returns go next step boolean to check if need do toggle open */
    onSearch: (searchText: string, fromTyping: boolean, isCompositing: boolean) => boolean;
    onSearchSubmit?: (searchText: string) => void;
    onRemove: (value: DisplayValueType) => void;
    onInputKeyDown?: KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    /**
    * @private get real dom for trigger align.
    * This may be removed after React provides replacement of `findDOMNode`
    */
    domRef: Ref<HTMLDivElement>;
}
declare const ForwardSelector: import("react").ForwardRefExoticComponent<SelectorProps & import("react").RefAttributes<RefSelectorProps>>;
export default ForwardSelector;
