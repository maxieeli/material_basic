import type { ChangeEvent, MouseEvent, CompositionEvent } from 'react';
import type { BaseInputProps, InputProps } from '../interface';
export declare function hasAddon(props: BaseInputProps | InputProps): boolean;
export declare function hasPrefixSuffix(props: BaseInputProps | InputProps): boolean;
export declare function resolveOnChange<E extends HTMLInputElement | HTMLTextAreaElement>(target: E, e: ChangeEvent<E> | MouseEvent<HTMLElement, MouseEvent> | CompositionEvent<HTMLElement>, onChange: undefined | ((event: ChangeEvent<E>) => void), targetValue?: string): void;
export interface InputFocusOptions extends FocusOptions {
    cursor?: 'start' | 'end' | 'all';
}
export declare function triggerFocus(element?: HTMLInputElement | HTMLTextAreaElement, option?: InputFocusOptions): void;
export declare function fixControlledValue<T>(value: T): string;
