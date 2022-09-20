import { Component } from 'react'
import type { ChangeEvent } from 'react'
import classNames from 'classnames'
import { Props } from './types'

class Checkbox extends Component<Props, any> {
  static defaultProps = {
    prefixCls: 'basic-checkbox',
    className: '',
    style: {},
    type: 'checkbox',
    title: '',
    defaultChecked: false,
    onFocus() {},
    onBlur() {},
    onChange() {},
    onKeyDown() {},
    onKeyPress() {},
    onKeyUp() {},
  }

  constructor(props: Props) {
    super(props)
    const checked = 'checked' in props
      ? props.checked
      : props.defaultChecked

    this.state = {
      checked,
    }
  }

  static getDerivedStateFromProps(props: Props, state: any) {
    if ('checked' in props) {
      return {
        ...state,
        checked: props.checked,
      }
    }
    return null
  }

  focus() {
    // @ts-ignore
    this.input.focus()
  }

  blur() {
    // @ts-ignore
    this.input.blur()
  }

  handleChange = (e: ChangeEvent<any>) => {
    const { disabled, onChange } = this.props
    if (disabled) {
      return
    }
    if (!('checked' in this.props)) {
      this.setState({
        checked: e.target.checked,
      })
    }
    if (onChange) {
      onChange({
        target: {
          ...this.props,
          // @ts-ignore
          checked: e.target.checked,
        },
        stopPropagation() {
          e.stopPropagation()
        },
        preventDefault() {
          e.preventDefault()
        },
        nativeEvent: e.nativeEvent,
      })
    }
  }

  saveInput = (node: any) => {
    // @ts-ignore
    this.input = node
  }

  render() {
    const {
      prefixCls,
      className,
      style,
      name,
      id,
      type,
      title,
      disabled,
      readOnly,
      tabIndex,
      onClick,
      onFocus,
      onBlur,
      onKeyDown,
      onKeyPress,
      onKeyUp,
      autoFocus,
      value,
      required,
      ...others
    } = this.props

    const globalProps = Object.keys(others).reduce((prev, key) => {
      if (key.substr(0, 5) === 'aria-' || key.substr(0, 5) === 'data-' || key === 'role') {
        prev[key] = others[key]
      }
      return prev
    }, {})

    const { checked } = this.state
    const classString = classNames(prefixCls, className, {
      [`${prefixCls}-checked`]: checked,
      [`${prefixCls}-disabled`]: disabled,
    })

    return (
      <span className={classString} style={style}>
        <input
          name={name}
          id={id}
          type={type}
          title={title}
          required={required}
          readOnly={readOnly}
          disabled={disabled}
          // @ts-ignore
          tabIndex={tabIndex}
          className={`${prefixCls}-input`}
          checked={!!checked}
          onClick={onClick}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyUp={onKeyUp}
          onKeyDown={onKeyDown}
          onKeyPress={onKeyPress}
          onChange={this.handleChange}
          autoFocus={autoFocus}
          ref={this.saveInput}
          value={value}
          {...globalProps}
        />
        <span className={`${prefixCls}-inner`} />
      </span>
    )
  }
}

export default Checkbox
