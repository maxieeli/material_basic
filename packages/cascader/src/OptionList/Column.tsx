import { useMemo, useContext } from 'react'
import type { Key, MouseEvent } from 'react'
import classNames from 'classnames'
import { isLeaf, toPathKey } from '../utils/commonUtil'
import CascaderContext from '../context'
import Checkbox from './Checkbox'
import type { DefaultOptionType, SingleValueType } from '../Cascader'
import { SEARCH_MARK } from '../hooks/useSearchOptions'

export const FIX_LABEL = '__cascader_fix_label__'

export interface ColumnProps {
  prefixCls: string
  multiple?: boolean
  options: DefaultOptionType[]
  /** Current Column opened item key */
  activeValue?: Key
  /** The value path before current column */
  prevValuePath: Key[]
  onToggleOpen: (open: boolean) => void
  onSelect: (valuePath: SingleValueType, leaf: boolean) => void
  onActive: (valuePath: SingleValueType) => void
  checkedSet: Set<Key>
  halfCheckedSet: Set<Key>
  loadingKeys: Key[]
  isSelectable: (option: DefaultOptionType) => boolean
}

export default function Column({
  prefixCls,
  multiple,
  options,
  activeValue,
  prevValuePath,
  onToggleOpen,
  onSelect,
  onActive,
  checkedSet,
  halfCheckedSet,
  loadingKeys,
  isSelectable,
}: ColumnProps) {
  const menuPrefixCls = `${prefixCls}-menu`
  const menuItemPrefixCls = `${prefixCls}-menu-item`

  const {
    fieldNames,
    changeOnSelect,
    expandTrigger,
    expandIcon,
    loadingIcon,
    dropdownMenuColumnStyle,
  } = useContext(CascaderContext)

  const hoverOpen = expandTrigger === 'hover'

  // ============================ Option ============================
  const optionInfoList = useMemo(
    () =>
      options.map(option => {
        const { disabled } = option
        const searchOptions = option[SEARCH_MARK]
        const label = option[FIX_LABEL] ?? option[fieldNames.label]
        const value = option[fieldNames.value]

        const isMergedLeaf = isLeaf(option, fieldNames)

        // Get real value of option. Search option is different way.
        const fullPath = searchOptions
          ? searchOptions.map(opt => opt[fieldNames.value])
          : [...prevValuePath, value]
        const fullPathKey = toPathKey(fullPath)

        const isLoading = loadingKeys.includes(fullPathKey)

        // >>>>> checked
        const checked = checkedSet.has(fullPathKey)

        // >>>>> halfChecked
        const halfChecked = halfCheckedSet.has(fullPathKey)

        return {
          disabled,
          label,
          value,
          isLeaf: isMergedLeaf,
          isLoading,
          checked,
          halfChecked,
          option,
          fullPath,
          fullPathKey,
        }
      }),
    [options, checkedSet, fieldNames, halfCheckedSet, loadingKeys, prevValuePath],
  )

  // ============================ Render ============================
  return (
    <ul className={menuPrefixCls} role="menu">
      {optionInfoList.map(
        ({
          disabled,
          label,
          value,
          isLeaf: isMergedLeaf,
          isLoading,
          checked,
          halfChecked,
          option,
          fullPath,
          fullPathKey,
        }) => {
          // >>>>> Open
          const triggerOpenPath = () => {
            if (!disabled && (!hoverOpen || !isMergedLeaf)) {
              onActive(fullPath)
            }
          }

          // >>>>> Selection
          const triggerSelect = () => {
            if (isSelectable(option)) {
              onSelect(fullPath, isMergedLeaf)
            }
          }

          // >>>>> Title
          let title: string
          if (typeof option.title === 'string') {
            title = option.title
          } else if (typeof label === 'string') {
            title = label
          }

          // >>>>> Render
          return (
            <li
              key={fullPathKey}
              className={classNames(menuItemPrefixCls, {
                [`${menuItemPrefixCls}-expand`]: !isMergedLeaf,
                [`${menuItemPrefixCls}-active`]: activeValue === value,
                [`${menuItemPrefixCls}-disabled`]: disabled,
                [`${menuItemPrefixCls}-loading`]: isLoading,
              })}
              style={dropdownMenuColumnStyle}
              role="menuitemcheckbox"
              title={title}
              aria-checked={checked}
              data-path-key={fullPathKey}
              onClick={() => {
                triggerOpenPath()
                if (!multiple || isMergedLeaf) {
                  triggerSelect()
                }
              }}
              onDoubleClick={() => {
                if (changeOnSelect) {
                  onToggleOpen(false)
                }
              }}
              onMouseEnter={() => {
                if (hoverOpen) {
                  triggerOpenPath()
                }
              }}
              onMouseDown={e => {
                // Prevent selector from blurring
                e.preventDefault()
              }}
            >
              {multiple && (
                <Checkbox
                  prefixCls={`${prefixCls}-checkbox`}
                  checked={checked}
                  halfChecked={halfChecked}
                  disabled={disabled}
                  onClick={(e: MouseEvent<HTMLSpanElement>) => {
                    e.stopPropagation()
                    triggerSelect()
                  }}
                />
              )}
              <div className={`${menuItemPrefixCls}-content`}>{label}</div>
              {!isLoading && expandIcon && !isMergedLeaf && (
                <div className={`${menuItemPrefixCls}-expand-icon`}>{expandIcon}</div>
              )}
              {isLoading && loadingIcon && (
                <div className={`${menuItemPrefixCls}-loading-icon`}>{loadingIcon}</div>
              )}
            </li>
          )
        },
      )}
    </ul>
  )
}
