import {
  useRef, useState,
  forwardRef, useImperativeHandle,
  useEffect,
} from 'react'
import type {
  ChangeEvent, KeyboardEvent,
  FocusEventHandler, MouseEvent,
} from 'react'
import classNames from 'classnames'
import useMergedState from 'rc-util/lib/hooks/useMergedState'
import omit from 'rc-util/lib/omit'
import type { InputProps, InputRef } from './interface'
import BaseInput from './BaseInput'
import type { InputFocusOptions } from './utils/commonUtils'
import {
  fixControlledValue,
  hasAddon,
  hasPrefixSuffix,
  resolveOnChange,
  triggerFocus,
} from './utils/commonUtils'

const Input = forwardRef<InputRef, InputProps>((props, ref) => {
  const {
    autoComplete,
    onChange,
    onFocus,
    onBlur,
    onPressEnter,
    onKeyDown,
    prefixCls = 'basic-input',
    disabled,
    htmlSize,
    className,
    maxLength,
    suffix,
    showCount,
    type = 'text',
    inputClassName,
    label,
    ...rest
  } = props

  const [value, setValue] = useMergedState(props.defaultValue, {
    value: props.value,
  })
  const [focused, setFocused] = useState<boolean>(false)

  const inputRef = useRef<HTMLInputElement>(null)

  const focus = (option?: InputFocusOptions) => {
    if (inputRef.current) {
      triggerFocus(inputRef.current, option)
    }
  }

  useImperativeHandle(ref, () => ({
    focus,
    blur: () => {
      inputRef.current?.blur()
    },
    setSelectionRange: (
      start: number,
      end: number,
      direction?: 'forward' | 'backward' | 'none',
    ) => {
      inputRef.current?.setSelectionRange(start, end, direction)
    },
    select: () => {
      inputRef.current?.select()
    },
    input: inputRef.current,
  }))

  useEffect(() => {
    setFocused((prev) => (prev && disabled ? false : prev))
  }, [disabled])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (props.value === undefined) {
      setValue(e.target.value)
    }
    if (inputRef.current) {
      resolveOnChange(inputRef.current, e, onChange)
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (onPressEnter && e.key === 'Enter') {
      onPressEnter(e)
    }
    onKeyDown?.(e)
  }

  const handleFocus: FocusEventHandler<HTMLInputElement> = (e) => {
    setFocused(true)
    onFocus?.(e)
  }

  const handleBlur: FocusEventHandler<HTMLInputElement> = (e) => {
    setFocused(false)
    onBlur?.(e)
  }

  const handleReset = (e: MouseEvent<HTMLElement, MouseEvent>) => {
    setValue('')
    focus()
    if (inputRef.current) {
      resolveOnChange(inputRef.current, e, onChange)
    }
  }

  const getInputElement = () => {
    const otherProps = omit(props as InputProps, [
      'prefixCls',
      'onPressEnter',
      'addonBefore',
      'addonAfter',
      'prefix',
      'suffix',
      'allowClear',
      'defaultValue',
      'showCount',
      'affixWrapperClassName',
      'groupClassName',
      'inputClassName',
      'wrapperClassName',
      'htmlSize',
    ])
    return (
      <input
        autoComplete={autoComplete}
        {...otherProps}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={classNames(
          prefixCls,
          {
            [`${prefixCls}-disabled`]: disabled,
          },
          inputClassName,
          !hasAddon(props) && !hasPrefixSuffix(props) && className,
        )}
        ref={inputRef}
        size={htmlSize}
        type={type}
      />
    )
  }

  const getSuffix = () => {
    // Max length value
    const hasMaxLength = Number(maxLength) > 0

    if (suffix || showCount) {
      const val = fixControlledValue(value)
      const valueLength = [...val].length
      const dataCount =
        typeof showCount === 'object'
          ? showCount.formatter({ value: val, count: valueLength, maxLength })
          : `${valueLength}${hasMaxLength ? ` / ${maxLength}` : ''}`

      return (
        <>
          {!!showCount && (
            <span
              className={classNames(`${prefixCls}-show-count-suffix`, {
                [`${prefixCls}-show-count-has-suffix`]: !!suffix,
              })}
            >
              {dataCount}
            </span>
          )}
          {suffix}
        </>
      )
    }
    return null
  }

  return (
    <div className={
      classNames(
        `${prefixCls}-text-outlined`,
        {
          [`${prefixCls}-has-label`]: label,
          [`${prefixCls}-focused`]: focused,
          [`${prefixCls}-shrink`]: label && (focused || value),
        }
      )
    }>
      {label && (
        <label className={classNames(
          `${prefixCls}-label`,
          {
            [`${prefixCls}-label-error`]: props.affixWrapperClassName.includes('error') || props.groupClassName.includes('error'),
            [`${prefixCls}-label-warning`]: props.affixWrapperClassName.includes('warning') || props.groupClassName.includes('warning'),
          }
        )}>
          {label}
        </label>
      )}
      <BaseInput
        {...rest}
        prefixCls={prefixCls}
        className={className}
        inputElement={getInputElement()}
        handleReset={handleReset}
        value={fixControlledValue(value)}
        focused={focused}
        triggerFocus={focus}
        suffix={getSuffix()}
        disabled={disabled}
      />
    </div>
  )
})

export default Input