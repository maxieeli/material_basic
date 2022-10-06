import {
  forwardRef, useRef,
  useContext, useState,
  useEffect, useMemo,
} from 'react'
import type { ReactElement, Key } from 'react'
import classNames from 'classnames'
import { useBaseProps } from 'developerli/select'
import type { RefOptionListProps } from 'developerli/select/es/OptionList'
import type { DefaultOptionType, SingleValueType } from '../Cascader'
import CascaderContext from '../context'
import {
  isLeaf,
  scrollIntoParentView,
  toPathKey,
  toPathKeys,
  toPathValueStr,
} from '../utils/commonUtil'
import { toPathOptions } from '../utils/treeUtil'
import Column, { FIX_LABEL } from './Column'
import useActive from './useActive'
import useKeyboard from './useKeyboard'

const RefOptionList = forwardRef<RefOptionListProps>((props, ref) => {
  const {
    prefixCls, multiple,
    searchValue, toggleOpen,
    notFoundContent
  } = useBaseProps()

  const containerRef = useRef<HTMLDivElement>()

  const {
    options,
    values,
    halfValues,
    fieldNames,
    changeOnSelect,
    onSelect,
    searchOptions,
    dropdownPrefixCls,
    loadData,
    expandTrigger,
  } = useContext(CascaderContext)

  const mergedPrefixCls = dropdownPrefixCls || prefixCls

  // ========================= loadData =========================
  const [loadingKeys, setLoadingKeys] = useState([])

  const internalLoadData = (valueCells: Key[]) => {
    // Do not load when search
    if (!loadData || searchValue) {
      return
    }

    const optionList = toPathOptions(valueCells, options, fieldNames)
    const rawOptions = optionList.map(({ option }) => option)
    const lastOption = rawOptions[rawOptions.length - 1]

    if (lastOption && !isLeaf(lastOption, fieldNames)) {
      const pathKey = toPathKey(valueCells)

      setLoadingKeys(keys => [...keys, pathKey])

      loadData(rawOptions)
    }
  }

  // zombieJ: This is bad. We should make this same as `tree` to use Promise instead.
  useEffect(() => {
    if (loadingKeys.length) {
      loadingKeys.forEach(loadingKey => {
        const valueStrCells = toPathValueStr(loadingKey)
        const optionList = toPathOptions(valueStrCells, options, fieldNames, true).map(
          ({ option }) => option,
        )
        const lastOption = optionList[optionList.length - 1]

        if (!lastOption || lastOption[fieldNames.children] || isLeaf(lastOption, fieldNames)) {
          setLoadingKeys(keys => keys.filter(key => key !== loadingKey))
        }
      })
    }
  }, [options, loadingKeys, fieldNames])

  // ========================== Values ==========================
  const checkedSet = useMemo(() => new Set(toPathKeys(values)), [values])
  const halfCheckedSet = useMemo(() => new Set(toPathKeys(halfValues)), [halfValues])

  // ====================== Accessibility =======================
  const [activeValueCells, setActiveValueCells] = useActive()

  // =========================== Path ===========================
  const onPathOpen = (nextValueCells: Key[]) => {
    setActiveValueCells(nextValueCells)

    // Trigger loadData
    internalLoadData(nextValueCells)
  }

  const isSelectable = (option: DefaultOptionType) => {
    const { disabled } = option

    const isMergedLeaf = isLeaf(option, fieldNames)
    return !disabled && (isMergedLeaf || changeOnSelect || multiple)
  }

  const onPathSelect = (valuePath: SingleValueType, leaf: boolean, fromKeyboard = false) => {
    onSelect(valuePath)

    if (!multiple && (leaf || (changeOnSelect && (expandTrigger === 'hover' || fromKeyboard)))) {
      toggleOpen(false)
    }
  }

  // ========================== Option ==========================
  const mergedOptions = useMemo(() => {
    if (searchValue) {
      return searchOptions
    }

    return options
  }, [searchValue, searchOptions, options])

  // ========================== Column ==========================
  const optionColumns = useMemo(() => {
    const optionList = [{ options: mergedOptions }]
    let currentList = mergedOptions

    for (let i = 0; i < activeValueCells.length; i += 1) {
      const activeValueCell = activeValueCells[i]
      const currentOption = currentList.find(
        option => option[fieldNames.value] === activeValueCell,
      )

      const subOptions = currentOption?.[fieldNames.children]
      if (!subOptions?.length) {
        break
      }

      currentList = subOptions
      optionList.push({ options: subOptions })
    }

    return optionList
  }, [mergedOptions, activeValueCells, fieldNames])

  // ========================= Keyboard =========================
  const onKeyboardSelect = (selectValueCells: SingleValueType, option: DefaultOptionType) => {
    if (isSelectable(option)) {
      onPathSelect(selectValueCells, isLeaf(option, fieldNames), true)
    }
  }

  useKeyboard(ref, mergedOptions, fieldNames, activeValueCells, onPathOpen, onKeyboardSelect)

  // >>>>> Active Scroll
  useEffect(() => {
    for (let i = 0; i < activeValueCells.length; i += 1) {
      const cellPath = activeValueCells.slice(0, i + 1)
      const cellKeyPath = toPathKey(cellPath)
      const ele = containerRef.current?.querySelector<HTMLElement>(
        `li[data-path-key="${cellKeyPath.replace(/\\{0,2}"/g, '\\"')}"]`, // matches unescaped double quotes
      )
      if (ele) {
        scrollIntoParentView(ele)
      }
    }
  }, [activeValueCells])

  // ========================== Render ==========================
  // >>>>> Empty
  const isEmpty = !optionColumns[0]?.options?.length

  const emptyList: DefaultOptionType[] = [
    {
      [fieldNames.value as 'value']: '__EMPTY__',
      [FIX_LABEL as 'label']: notFoundContent,
      disabled: true,
    },
  ]

  const columnProps = {
    ...props,
    multiple: !isEmpty && multiple,
    onSelect: onPathSelect,
    onActive: onPathOpen,
    onToggleOpen: toggleOpen,
    checkedSet,
    halfCheckedSet,
    loadingKeys,
    isSelectable,
  }

  // >>>>> Columns
  const mergedOptionColumns = isEmpty ? [{ options: emptyList }] : optionColumns

  const columnNodes: ReactElement[] = mergedOptionColumns.map((col, index) => {
    const prevValuePath = activeValueCells.slice(0, index)
    const activeValue = activeValueCells[index]

    return (
      <Column
        key={index}
        {...columnProps}
        prefixCls={mergedPrefixCls}
        options={col.options}
        prevValuePath={prevValuePath}
        activeValue={activeValue}
      />
    )
  })

  // >>>>> Render
  return (
    <div
      className={classNames(`${mergedPrefixCls}-menus`, {
        [`${mergedPrefixCls}-menu-empty`]: isEmpty,
      })}
      ref={containerRef}
    >
      {columnNodes}
    </div>
  )
})

export default RefOptionList
