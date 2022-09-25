import type {
  Ref, ReactNode,
  KeyboardEventHandler, MouseEventHandler,
  ChangeEventHandler, CompositionEventHandler,
  ReactElement, ForwardRefRenderFunction,
  ClipboardEventHandler,
} from 'react'
import { useRef, useImperativeHandle, forwardRef } from 'react'
import KeyCode from 'rc-util/lib/KeyCode'
import type { ScrollTo } from 'rc-virtual-list/lib/List'
import MultipleSelector from './MultipleSelector'
import SingleSelector from './SingleSelector'
import useLock from '../hooks/useLock'
import type { CustomTagProps, DisplayValueType, Mode, RenderNode } from '../BaseSelect'
import { isValidateOpenKey } from '../utils/keyUtil'

export interface InnerSelectorProps {
  prefixCls: string
  id: string
  mode: Mode

  inputRef: Ref<HTMLInputElement | HTMLTextAreaElement>
  placeholder?: ReactNode
  disabled?: boolean
  autoFocus?: boolean
  autoComplete?: string
  values: DisplayValueType[]
  showSearch?: boolean
  searchValue: string
  activeDescendantId?: string
  open: boolean
  tabIndex?: number
  maxLength?: number

  onInputKeyDown: KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>
  onInputMouseDown: MouseEventHandler<HTMLInputElement | HTMLTextAreaElement>
  onInputChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  onInputPaste: ClipboardEventHandler<HTMLInputElement | HTMLTextAreaElement>
  onInputCompositionStart: CompositionEventHandler<HTMLInputElement | HTMLTextAreaElement>
  onInputCompositionEnd: CompositionEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

export interface RefSelectorProps {
  focus: () => void
  blur: () => void
  scrollTo?: ScrollTo
}

export interface SelectorProps {
  id: string
  prefixCls: string
  showSearch?: boolean
  open: boolean
  /** Display in the Selector value, it's not same as `value` prop */
  values: DisplayValueType[]
  mode: Mode
  searchValue: string
  activeValue: string
  inputElement: JSX.Element
  maxLength?: number

  autoFocus?: boolean
  activeDescendantId?: string
  tabIndex?: number
  disabled?: boolean
  placeholder?: ReactNode
  removeIcon?: RenderNode

  // Tags
  maxTagCount?: number | 'responsive'
  maxTagTextLength?: number
  maxTagPlaceholder?: ReactNode | ((omittedValues: DisplayValueType[]) => ReactNode)
  tagRender?: (props: CustomTagProps) => ReactElement

  /** Check if `tokenSeparators` contains `\n` or `\r\n` */
  tokenWithEnter?: boolean

  // Motion
  choiceTransitionName?: string

  onToggleOpen: (open?: boolean) => void
  /** `onSearch` returns go next step boolean to check if need do toggle open */
  onSearch: (searchText: string, fromTyping: boolean, isCompositing: boolean) => boolean
  onSearchSubmit?: (searchText: string) => void
  onRemove: (value: DisplayValueType) => void
  onInputKeyDown?: KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>

  /**
  * @private get real dom for trigger align.
  * This may be removed after React provides replacement of `findDOMNode`
  */
  domRef: Ref<HTMLDivElement>
}

const Selector: ForwardRefRenderFunction<RefSelectorProps, SelectorProps> = (props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const compositionStatusRef = useRef<boolean>(false)

  const {
    prefixCls,
    open,
    mode,
    showSearch,
    tokenWithEnter,

    onSearch,
    onSearchSubmit,
    onToggleOpen,
    onInputKeyDown,

    domRef,
  } = props

  // ======================= Ref =======================
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus()
    },
    blur: () => {
      inputRef.current.blur()
    },
  }))

  // ====================== Input ======================
  const [getInputMouseDown, setInputMouseDown] = useLock(0)

  const onInternalInputKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    const { which } = event

    if (which === KeyCode.UP || which === KeyCode.DOWN) {
      event.preventDefault()
    }

    if (onInputKeyDown) {
      onInputKeyDown(event)
    }

    if (which === KeyCode.ENTER && mode === 'tags' && !compositionStatusRef.current && !open) {
      onSearchSubmit?.((event.target as HTMLInputElement).value)
    }

    if (isValidateOpenKey(which)) {
      onToggleOpen(true)
    }
  }

  /**
  * We can not use `findDOMNode` sine it will get warning,
  * have to use timer to check if is input element.
  */
  const onInternalInputMouseDown: MouseEventHandler<HTMLInputElement> = () => {
    setInputMouseDown(true)
  }

  // When paste come, ignore next onChange
  const pastedTextRef = useRef<string>(null)

  const triggerOnSearch = (value: string) => {
    if (onSearch(value, true, compositionStatusRef.current) !== false) {
      onToggleOpen(true)
    }
  }

  const onInputCompositionStart = () => {
    compositionStatusRef.current = true
  }

  const onInputCompositionEnd: CompositionEventHandler<HTMLInputElement> = (e) => {
    compositionStatusRef.current = false

    // Trigger search again to support `tokenSeparators` with typewriting
    if (mode !== 'combobox') {
      triggerOnSearch((e.target as HTMLInputElement).value)
    }
  }

  const onInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    let {
      target: { value },
    } = event

    // Pasted text should replace back to origin content
    if (tokenWithEnter && pastedTextRef.current && /[\r\n]/.test(pastedTextRef.current)) {
      // CRLF will be treated as a single space for input element
      const replacedText = pastedTextRef.current
        .replace(/[\r\n]+$/, '')
        .replace(/\r\n/g, ' ')
        .replace(/[\r\n]/g, ' ')
      value = value.replace(replacedText, pastedTextRef.current)
    }

    pastedTextRef.current = null

    triggerOnSearch(value)
  }

  const onInputPaste: ClipboardEventHandler = (e) => {
    const { clipboardData } = e
    const value = clipboardData.getData('text')

    pastedTextRef.current = value
  }

  const onClick = ({ target }) => {
    if (target !== inputRef.current) {
      // Should focus input if click the selector
      const isIE = (document.body.style as any).msTouchAction !== undefined
      if (isIE) {
        setTimeout(() => {
          inputRef.current.focus()
        })
      } else {
        inputRef.current.focus()
      }
    }
  }

  const onMouseDown: MouseEventHandler<HTMLElement> = (event) => {
    const inputMouseDown = getInputMouseDown()
    if (event.target !== inputRef.current && !inputMouseDown && mode !== 'combobox') {
      event.preventDefault()
    }

    if ((mode !== 'combobox' && (!showSearch || !inputMouseDown)) || !open) {
      if (open) {
        onSearch('', true, false)
      }
      onToggleOpen()
    }
  }

  // ================= Inner Selector ==================
  const sharedProps = {
    inputRef,
    onInputKeyDown: onInternalInputKeyDown,
    onInputMouseDown: onInternalInputMouseDown,
    onInputChange,
    onInputPaste,
    onInputCompositionStart,
    onInputCompositionEnd,
  }

  const selectNode =
    mode === 'multiple' || mode === 'tags' ? (
      <MultipleSelector {...props} {...sharedProps} />
    ) : (
      <SingleSelector {...props} {...sharedProps} />
    )

  return (
    <div
      ref={domRef}
      className={`${prefixCls}-selector`}
      onClick={onClick}
      onMouseDown={onMouseDown}
    >
      {selectNode}
    </div>
  )
}

const ForwardSelector = forwardRef<RefSelectorProps, SelectorProps>(Selector)
ForwardSelector.displayName = 'Selector'

export default ForwardSelector
