import type { ChangeEvent, MouseEvent, CompositionEvent } from 'react'
import type { BaseInputProps, InputProps } from '../interface'

export function hasAddon(props: BaseInputProps | InputProps) {
  return !!(props.addonBefore || props.addonAfter)
}

export function hasPrefixSuffix(props: BaseInputProps | InputProps) {
  return !!(props.prefix || props.suffix || props.allowClear)
}

export function resolveOnChange<
  E extends HTMLInputElement | HTMLTextAreaElement,
>(
  target: E,
  e:
    | ChangeEvent<E>
    | MouseEvent<HTMLElement, MouseEvent>
    | CompositionEvent<HTMLElement>,
  onChange: undefined | ((event: ChangeEvent<E>) => void),
  targetValue?: string,
) {
  if (!onChange) {
    return
  }
  let event = e

  if (e.type === 'click') {
    const currentTarget = target.cloneNode(true) as E
    // click clear icon
    event = Object.create(e, {
      target: { value: currentTarget },
      currentTarget: { value: currentTarget },
    })

    currentTarget.value = ''
    onChange(event as ChangeEvent<E>)
    return
  }

  // Trigger by composition event, this means we need force change the input value
  if (targetValue !== undefined) {
    event = Object.create(e, {
      target: { value: target },
      currentTarget: { value: target },
    })

    target.value = targetValue
    onChange(event as ChangeEvent<E>)
    return
  }
  onChange(event as ChangeEvent<E>)
}

export interface InputFocusOptions extends FocusOptions {
  cursor?: 'start' | 'end' | 'all'
}

export function triggerFocus(
  element?: HTMLInputElement | HTMLTextAreaElement,
  option?: InputFocusOptions,
) {
  if (!element) return

  element.focus(option)

  // Selection content
  const { cursor } = option || {}
  if (cursor) {
    const len = element.value.length

    switch (cursor) {
      case 'start':
        element.setSelectionRange(0, 0)
        break
      case 'end':
        element.setSelectionRange(len, len)
        break
      default:
        element.setSelectionRange(0, len)
    }
  }
}

export function fixControlledValue<T>(value: T) {
  if (typeof value === 'undefined' || value === null) {
    return ''
  }
  return String(value)
}