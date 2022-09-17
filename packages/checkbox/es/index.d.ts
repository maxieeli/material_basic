import { Component } from 'react';
import type { ChangeEvent } from 'react';
import { Props } from './types';
declare class Checkbox extends Component<Props, any> {
    static defaultProps: {
        prefixCls: string;
        className: string;
        style: {};
        type: string;
        title: string;
        defaultChecked: boolean;
        onFocus(): void;
        onBlur(): void;
        onChange(): void;
        onKeyDown(): void;
        onKeyPress(): void;
        onKeyUp(): void;
    };
    constructor(props: Props);
    static getDerivedStateFromProps(props: Props, state: any): any;
    focus(): void;
    blur(): void;
    handleChange: (e: ChangeEvent<any>) => void;
    saveInput: (node: any) => void;
    render(): JSX.Element;
}
export default Checkbox;
