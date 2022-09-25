/// <reference types="react" />
export interface DrawerContextProps {
    pushDistance?: number | string;
    push: VoidFunction;
    pull: VoidFunction;
}
declare const DrawerContext: import("react").Context<DrawerContextProps>;
export default DrawerContext;
