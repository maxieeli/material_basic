import { Component } from 'react'
import type { ChangeEvent } from 'react'

const KEYCODE = {
  ZERO: 48,
  NINE: 57,
  NUMPAD_ZERO: 96,
  NUMPAD_NINE: 105,
  BACKSPACE: 8,
  DELETE: 46,
  ENTER: 13,
  ARROW_UP: 38,
  ARROW_DOWN: 40,
}

class Options extends Component<any, any> {
  static defaultProps = {
    pageSizeOptions: ['10', '20', '50', '100'],
  }

  state = {
    goInputText: '',
  }

  getValidValue() {
    const { goInputText } = this.state
    // @ts-ignore
    return !goInputText || isNaN(goInputText) ? undefined : Number(goInputText)
  }

  buildOptionText = (value: any) => `${value} ${this.props.locale.items_per_page}`

  changeSize = (value: any) => {
    this.props.changeSize(Number(value))
  }

  handleChange = (e: ChangeEvent<any>) => {
    this.setState({
      goInputText: e.target.value,
    })
  }

  handleBlur = (e: any) => {
    const { goButton, quickGo, rootPrefixCls } = this.props
    const { goInputText } = this.state
    if (goButton || goInputText === '') {
      return
    }
    this.setState({
      goInputText: '',
    })
    if (
      e.relatedTarget &&
      (e.relatedTarget.className.indexOf(`${rootPrefixCls}-item-link`) >= 0 ||
        e.relatedTarget.className.indexOf(`${rootPrefixCls}-item`) >= 0)
    ) {
      return
    }
    quickGo(this.getValidValue())
  }

  go = (e: any) => {
    const { goInputText } = this.state
    if (goInputText === '') {
      return
    }
    if (e.keyCode === KEYCODE.ENTER || e.type === 'click') {
      this.setState({
        goInputText: '',
      })
      this.props.quickGo(this.getValidValue())
    }
  }

  getPageSizeOptions() {
    const { pageSize, pageSizeOptions } = this.props
    if (
      pageSizeOptions.some(
        (option: any) => option.toString() === pageSize.toString(),
      )
    ) {
      return pageSizeOptions
    }
    return pageSizeOptions.concat([pageSize.toString()]).sort((a: any, b: any) => {
      // eslint-disable-next-line no-restricted-globals
      const numberA = isNaN(Number(a)) ? 0 : Number(a)
      // eslint-disable-next-line no-restricted-globals
      const numberB = isNaN(Number(b)) ? 0 : Number(b)
      return numberA - numberB
    })
  }

  render() {
    const {
      pageSize,
      locale,
      rootPrefixCls,
      changeSize,
      quickGo,
      goButton,
      selectComponentClass,
      buildOptionText,
      selectPrefixCls,
      disabled,
    } = this.props
    const { goInputText } = this.state
    const prefixCls = `${rootPrefixCls}-options`
    const Select = selectComponentClass
    let changeSelect = null
    let goInput = null
    let gotoButton = null

    if (!changeSize && !quickGo) {
      return null
    }

    const pageSizeOptions = this.getPageSizeOptions()

    if (changeSize && Select) {
      const options = pageSizeOptions.map((opt: any, i: any) => (
        <Select.Option key={i} value={opt.toString()}>
          {(buildOptionText || this.buildOptionText)(opt)}
        </Select.Option>
      ))

      changeSelect = (
        <Select
          disabled={disabled}
          prefixCls={selectPrefixCls}
          showSearch={false}
          className={`${prefixCls}-size-changer`}
          optionLabelProp="children"
          dropdownMatchSelectWidth={false}
          value={(pageSize || pageSizeOptions[0]).toString()}
          onChange={this.changeSize}
          getPopupContainer={(triggerNode: any) => triggerNode.parentNode}
          aria-label={locale.page_size}
          defaultOpen={false}
        >
          {options}
        </Select>
      )
    }

    if (quickGo) {
      if (goButton) {
        gotoButton =
          typeof goButton === 'boolean' ? (
            <button
              type="button"
              onClick={this.go}
              onKeyUp={this.go}
              disabled={disabled}
              className={`${prefixCls}-quick-jumper-button`}
            >
              {locale.jump_to_confirm}
            </button>
          ) : (
            <span onClick={this.go} onKeyUp={this.go}>
              {goButton}
            </span>
          )
      }
      goInput = (
        <div className={`${prefixCls}-quick-jumper`}>
          {locale.jump_to}
          <input
            disabled={disabled}
            type="text"
            value={goInputText}
            onChange={this.handleChange}
            onKeyUp={this.go}
            onBlur={this.handleBlur}
            aria-label={locale.page}
          />
          {locale.page}
          {gotoButton}
        </div>
      )
    }

    return (
      <li className={`${prefixCls}`}>
        {changeSelect}
        {goInput}
      </li>
    )
  }
}

export default Options