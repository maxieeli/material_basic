import type { RefObject } from 'react';
interface UseAccessibilityProps {
    visible: boolean;
    setTriggerVisible: (visible: boolean) => void;
    triggerRef: RefObject<any>;
    onVisibleChange?: (visible: boolean) => void;
    autoFocus?: boolean;
}
export default function useAccessibility({ visible, setTriggerVisible, triggerRef, onVisibleChange, autoFocus, }: UseAccessibilityProps): void;
export {};
