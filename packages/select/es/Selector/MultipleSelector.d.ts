import type { ReactNode, ReactElement, FC } from 'react';
import type { InnerSelectorProps } from '.';
import type { DisplayValueType, RenderNode, CustomTagProps } from '../BaseSelect';
interface SelectorProps extends InnerSelectorProps {
    removeIcon?: RenderNode;
    maxTagCount?: number | 'responsive';
    maxTagTextLength?: number;
    maxTagPlaceholder?: ReactNode | ((omittedValues: DisplayValueType[]) => ReactNode);
    tokenSeparators?: string[];
    tagRender?: (props: CustomTagProps) => ReactElement;
    onToggleOpen: (open?: boolean) => void;
    choiceTransitionName?: string;
    onRemove: (value: DisplayValueType) => void;
}
declare const SelectSelector: FC<SelectorProps>;
export default SelectSelector;
