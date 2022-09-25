import type { FC, ReactElement } from 'react';
import type { InnerSelectorProps } from '.';
interface SelectorProps extends InnerSelectorProps {
    inputElement: ReactElement;
    activeValue: string;
}
declare const SingleSelector: FC<SelectorProps>;
export default SingleSelector;
