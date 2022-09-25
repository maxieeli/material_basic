import { Component } from 'react';
import type { ChangeEvent } from 'react';
declare class Options extends Component<any, any> {
    static defaultProps: {
        pageSizeOptions: string[];
    };
    state: {
        goInputText: string;
    };
    getValidValue(): number;
    buildOptionText: (value: any) => string;
    changeSize: (value: any) => void;
    handleChange: (e: ChangeEvent<any>) => void;
    handleBlur: (e: any) => void;
    go: (e: any) => void;
    getPageSizeOptions(): any;
    render(): JSX.Element;
}
export default Options;
