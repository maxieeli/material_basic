import { useRef, useEffect } from 'react'

export default function useSelectTriggerControl(
  elements: () => (HTMLElement | undefined)[],
  open: boolean,
  triggerOpen: (open: boolean) => void,
  customizedTrigger: boolean,
) {
  const propsRef = useRef(null)
  propsRef.current = {
    open,
    triggerOpen,
    customizedTrigger,
  }

  useEffect(() => {
    function onGlobalMouseDown(event: MouseEvent) {
      // If trigger is customized, Trigger will take control of popupVisible
      if (propsRef.current?.customizedTrigger) {
        return
      }

      let target = event.target as HTMLElement

      if (target.shadowRoot && event.composed) {
        target = (event.composedPath()[0] || target) as HTMLElement
      }

      if (
        propsRef.current.open &&
        elements()
          .filter((element) => element)
          .every((element) => !element.contains(target) && element !== target)
      ) {
        // Should trigger close
        propsRef.current.triggerOpen(false)
      }
    }

    window.addEventListener('mousedown', onGlobalMouseDown)
    return () => window.removeEventListener('mousedown', onGlobalMouseDown)
  }, [])
}