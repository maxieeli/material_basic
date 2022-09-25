import { Component } from 'react';
import { PaginationProps } from './types';
declare class Pagination extends Component<PaginationProps, any> {
    static defaultProps: any;
    constructor(props: any);
    componentDidUpdate(prevProps: any, prevState: any): void;
    static getDerivedStateFromProps(props: any, prevState: any): any;
    getJumpPrevPage: () => number;
    getJumpNextPage: () => number;
    /**
     * computed icon node that need to be rendered.
     * @param {React.ReactNode | React.ComponentType<PaginationProps>} icon received icon.
     * @returns {React.ReactNode}
     */
    getItemIcon: (icon: any, label: any) => any;
    getValidValue(e: any): any;
    savePaginationNode: (node: any) => void;
    isValid: (page: any) => boolean;
    shouldDisplayQuickJumper: () => boolean | object;
    handleKeyDown: (e: any) => void;
    handleKeyUp: (e: any) => void;
    handleBlur: (e: any) => void;
    changePageSize: (size: any) => void;
    handleChange: (page: any) => any;
    prev: () => void;
    next: () => void;
    jumpPrev: () => void;
    jumpNext: () => void;
    hasPrev: () => boolean;
    hasNext: () => boolean;
    getShowSizeChanger(): boolean;
    runIfEnter: (event: any, callback: any, ...restParams: any) => void;
    runIfEnterPrev: (e: any) => void;
    runIfEnterNext: (e: any) => void;
    runIfEnterJumpPrev: (e: any) => void;
    runIfEnterJumpNext: (e: any) => void;
    handleGoTO: (e: any) => void;
    renderPrev(prevPage: any): string | number | boolean | import("react").ReactFragment | import("react").DetailedReactHTMLElement<unknown, HTMLElement>;
    renderNext(nextPage: any): string | number | boolean | import("react").ReactFragment | import("react").DetailedReactHTMLElement<unknown, HTMLElement>;
    render(): JSX.Element;
}
export default Pagination;
