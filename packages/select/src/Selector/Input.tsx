import { forwardRef, cloneElement } from 'react'
import type {
  ReactElement, KeyboardEventHandler,
  MouseEventHandler, ChangeEventHandler,
  ClipboardEventHandler, CompositionEventHandler,
  ComponentElement, ForwardRefRenderFunction,
  KeyboardEvent, CompositionEvent,
  ChangeEvent, MouseEvent,
} from 'react'
import classNames from 'classnames'
import { composeRef } from 'rc-util/lib/ref'

type InputRef = HTMLInputElement | HTMLTextAreaElement

interface InputProps {
  prefixCls: string
  id: string
  inputElement: ReactElement
  disabled: boolean
  autoFocus: boolean
  autoComplete: string
  editable: boolean
  activeDescendantId?: string
  value: string
  maxLength?: number
  open: boolean
  tabIndex: number
  /** Pass accessibility props to input */
  attrs: Record<string, unknown>

  onKeyDown: KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLElement>
  onMouseDown: MouseEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLElement>
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLElement>
  onPaste: ClipboardEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLElement>
  onCompositionStart: CompositionEventHandler<
    HTMLInputElement | HTMLTextAreaElement | HTMLElement
  >
  onCompositionEnd: CompositionEventHandler<
    HTMLInputElement | HTMLTextAreaElement | HTMLElement
  >
}

const Input: ForwardRefRenderFunction<InputRef, InputProps> = (
  {
    prefixCls,
    id,
    inputElement,
    disabled,
    tabIndex,
    autoFocus,
    autoComplete,
    editable,
    activeDescendantId,
    value,
    maxLength,
    onKeyDown,
    onMouseDown,
    onChange,
    onPaste,
    onCompositionStart,
    onCompositionEnd,
    open,
    attrs,
  },
  ref,
) => {
  // @ts-ignore
  let inputNode: ComponentElement<any, any> = inputElement || <input />

  const { ref: originRef, props: originProps } = inputNode

  const {
    onKeyDown: onOriginKeyDown,
    onChange: onOriginChange,
    onMouseDown: onOriginMouseDown,
    onCompositionStart: onOriginCompositionStart,
    onCompositionEnd: onOriginCompositionEnd,
    style,
  } = originProps

  inputNode = cloneElement(inputNode, {
    type: 'search',
    ...originProps,

    // Override over origin props
    id,
    ref: composeRef(ref, originRef as any),
    disabled,
    tabIndex,
    autoComplete: autoComplete || 'off',

    autoFocus,
    className: classNames(`${prefixCls}-selection-search-input`, inputNode?.props?.className),

    role: 'combobox',
    'aria-expanded': open,
    'aria-haspopup': 'listbox',
    'aria-owns': `${id}_list`,
    'aria-autocomplete': 'list',
    'aria-controls': `${id}_list`,
    'aria-activedescendant': activeDescendantId,
    ...attrs,
    value: editable ? value : '',
    maxLength,
    readOnly: !editable,
    unselectable: !editable ? 'on' : null,

    style: { ...style, opacity: editable ? null : 0 },

    onKeyDown: (event: KeyboardEvent<HTMLElement>) => {
      onKeyDown(event)
      if (onOriginKeyDown) {
        onOriginKeyDown(event)
      }
    },
    onMouseDown: (event: MouseEvent<HTMLElement>) => {
      onMouseDown(event)
      if (onOriginMouseDown) {
        onOriginMouseDown(event)
      }
    },
    onChange: (event: ChangeEvent<HTMLElement>) => {
      onChange(event)
      if (onOriginChange) {
        onOriginChange(event)
      }
    },
    onCompositionStart(event: CompositionEvent<HTMLElement>) {
      onCompositionStart(event)
      if (onOriginCompositionStart) {
        onOriginCompositionStart(event)
      }
    },
    onCompositionEnd(event: CompositionEvent<HTMLElement>) {
      onCompositionEnd(event)
      if (onOriginCompositionEnd) {
        onOriginCompositionEnd(event)
      }
    },
    onPaste,
  })

  return inputNode
}

const RefInput = forwardRef<InputRef, InputProps>(Input)
RefInput.displayName = 'Input'

export default RefInput