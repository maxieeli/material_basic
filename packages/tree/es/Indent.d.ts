/// <reference types="react" />
interface IndentProps {
    prefixCls: string;
    level: number;
    isStart: boolean[];
    isEnd: boolean[];
}
declare const _default: import("react").MemoExoticComponent<({ prefixCls, level, isStart, isEnd }: IndentProps) => JSX.Element>;
export default _default;
