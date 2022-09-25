import {
  forwardRef, useMemo,
  useCallback, useEffect,
  useState,
} from 'react'
import type {
  ReactNode, Key,
  Ref, PropsWithChildren,
  ReactElement,
} from 'react'
import useMergedState from 'rc-util/lib/hooks/useMergedState'
import type {
  BaseSelectProps,
  BaseSelectPropsWithoutPrivate,
  BaseSelectRef,
  DisplayInfoType,
  DisplayValueType,
  RenderNode,
} from './BaseSelect'
import BaseSelect, { isMultiple } from './BaseSelect'
import useCache from './hooks/useCache'
import useFilterOptions from './hooks/useFilterOptions'
import useId from './hooks/useId'
import useOptions from './hooks/useOptions'
import useRefFunc from './hooks/useRefFunc'
import OptGroup from './OptGroup'
import Option from './Option'
import OptionList from './OptionList'
import SelectContext from './SelectContext'
import { hasValue, toArray } from './utils/commonUtil'
import { fillFieldNames, flattenOptions, injectPropsWithOption } from './utils/valueUtil'

const OMIT_DOM_PROPS = ['inputValue']

export type OnActiveValue = (
  active: RawValueType,
  index: number,
  info?: { source?: 'keyboard' | 'mouse' },
) => void

export type OnInternalSelect = (value: RawValueType, info: { selected: boolean }) => void

export type RawValueType = string | number
export interface LabelInValueType {
  label: ReactNode
  value: RawValueType
  /** @deprecated `key` is useless since it should always same as `value` */
  key?: Key
}

export type DraftValueType =
  | RawValueType
  | LabelInValueType
  | DisplayValueType
  | (RawValueType | LabelInValueType | DisplayValueType)[]

export type FilterFunc<OptionType> = (inputValue: string, option?: OptionType) => boolean

export interface FieldNames {
  value?: string
  label?: string
  options?: string
}

export interface BaseOptionType {
  disabled?: boolean
  [name: string]: any
}

export interface DefaultOptionType extends BaseOptionType {
  label: ReactNode
  value?: string | number | null
  children?: Omit<DefaultOptionType, 'children'>[]
}

export type SelectHandler<ValueType = any, OptionType extends BaseOptionType = DefaultOptionType> =
  | ((value: RawValueType | LabelInValueType, option: OptionType) => void)
  | ((value: ValueType, option: OptionType) => void)

type ArrayElementType<T> = T extends (infer E)[] ? E : T

export interface SelectProps<ValueType = any, OptionType extends BaseOptionType = DefaultOptionType>
  extends BaseSelectPropsWithoutPrivate {
  prefixCls?: string
  id?: string

  backfill?: boolean

  // >>> Field Names
  fieldNames?: FieldNames

  // >>> Search
  /** @deprecated Use `searchValue` instead */
  inputValue?: string
  searchValue?: string
  onSearch?: (value: string) => void
  autoClearSearchValue?: boolean

  // >>> Select
  onSelect?: SelectHandler<ArrayElementType<ValueType>, OptionType>
  onDeselect?: SelectHandler<ArrayElementType<ValueType>, OptionType>

  // >>> Options
  /**
  * In Select, `false` means do nothing.
  * In TreeSelect, `false` will highlight match item.
  * It's by design.
  */
  filterOption?: boolean | FilterFunc<OptionType>
  filterSort?: (optionA: OptionType, optionB: OptionType) => number
  optionFilterProp?: string
  optionLabelProp?: string
  children?: ReactNode
  options?: OptionType[]
  defaultActiveFirstOption?: boolean
  virtual?: boolean
  listHeight?: number
  listItemHeight?: number

  // >>> Icon
  menuItemSelectedIcon?: RenderNode

  mode?: 'combobox' | 'multiple' | 'tags'
  labelInValue?: boolean
  value?: ValueType | null
  defaultValue?: ValueType | null
  onChange?: (value: ValueType, option: OptionType | OptionType[]) => void
}

function isRawValue(value: DraftValueType): value is RawValueType {
  return !value || typeof value !== 'object'
}

const Select = forwardRef(
  (props: SelectProps<any, DefaultOptionType>, ref: Ref<BaseSelectRef>) => {
    const {
      id,
      mode,
      prefixCls = 'basic-select',
      backfill,
      fieldNames,

      // Search
      inputValue,
      searchValue,
      onSearch,
      autoClearSearchValue = true,

      // Select
      onSelect,
      onDeselect,
      dropdownMatchSelectWidth = true,

      // Options
      filterOption,
      filterSort,
      optionFilterProp,
      optionLabelProp,
      options,
      children,
      defaultActiveFirstOption,
      menuItemSelectedIcon,
      virtual,
      listHeight = 200,
      listItemHeight = 20,

      // Value
      value,
      defaultValue,
      labelInValue,
      onChange,

      ...restProps
    } = props

    const mergedId = useId(id)
    const multiple = isMultiple(mode)
    const childrenAsData = !!(!options && children)

    const mergedFilterOption = useMemo(() => {
      if (filterOption === undefined && mode === 'combobox') {
        return false
      }
      return filterOption
    }, [filterOption, mode])

    // ========================= FieldNames =========================
    const mergedFieldNames = useMemo(
      () => fillFieldNames(fieldNames, childrenAsData),
      /* eslint-disable react-hooks/exhaustive-deps */
      [
        // We stringify fieldNames to avoid unnecessary re-renders.
        JSON.stringify(fieldNames),
        childrenAsData,
      ],
      /* eslint-enable react-hooks/exhaustive-deps */
    )

    // =========================== Search ===========================
    const [mergedSearchValue, setSearchValue] = useMergedState('', {
      value: searchValue !== undefined ? searchValue : inputValue,
      postState: (search) => search || '',
    })

    // =========================== Option ===========================
    const parsedOptions = useOptions(
      options,
      children,
      mergedFieldNames,
      optionFilterProp,
      optionLabelProp,
    )
    const { valueOptions, labelOptions, options: mergedOptions } = parsedOptions

    // ========================= Wrap Value =========================
    const convert2LabelValues = useCallback(
      (draftValues: DraftValueType) => {
        // Convert to array
        const valueList = toArray(draftValues)

        // Convert to labelInValue type
        return valueList.map((val) => {
          let rawValue: RawValueType
          let rawLabel: ReactNode
          let rawKey: Key
          let rawDisabled: boolean | undefined
          let rawTitle: string

          // Fill label & value
          if (isRawValue(val)) {
            rawValue = val
          } else {
            rawKey = val.key
            rawLabel = val.label
            rawValue = val.value ?? rawKey
          }

          const option = valueOptions.get(rawValue)
          if (option) {
            // Fill missing props
            if (rawLabel === undefined)
              rawLabel = option?.[optionLabelProp || mergedFieldNames.label]
            if (rawKey === undefined) rawKey = option?.key ?? rawValue
            rawDisabled = option?.disabled
            rawTitle = option?.title
          }

          return {
            label: rawLabel,
            value: rawValue,
            key: rawKey,
            disabled: rawDisabled,
            title: rawTitle,
          }
        })
      },
      [mergedFieldNames, optionLabelProp, valueOptions],
    )

    // =========================== Values ===========================
    const [internalValue, setInternalValue] = useMergedState(defaultValue, {
      value,
    })

    // Merged value with LabelValueType
    const rawLabeledValues = useMemo(() => {
      const values = convert2LabelValues(internalValue)

      // combobox no need save value when it's no value
      if (mode === 'combobox' && !values[0]?.value) {
        return []
      }

      return values
    }, [internalValue, convert2LabelValues, mode])

    // Fill label with cache to avoid option remove
    const [mergedValues, getMixedOption] = useCache(rawLabeledValues, valueOptions)

    const displayValues = useMemo(() => {
      // `null` need show as placeholder instead
      if (!mode && mergedValues.length === 1) {
        const firstValue = mergedValues[0]
        if (
          firstValue.value === null &&
          (firstValue.label === null || firstValue.label === undefined)
        ) {
          return []
        }
      }

      return mergedValues.map((item) => ({
        ...item,
        label: item.label ?? item.value,
      }))
    }, [mode, mergedValues])

    /** Convert `displayValues` to raw value type set */
    const rawValues = useMemo(
      () => new Set(mergedValues.map((val) => val.value)),
      [mergedValues],
    )

    useEffect(() => {
      if (mode === 'combobox') {
        const strValue = mergedValues[0]?.value
        setSearchValue(hasValue(strValue) ? String(strValue) : '')
      }
    }, [mergedValues])

    // ======================= Display Option =======================
    // Create a placeholder item if not exist in `options`
    const createTagOption = useRefFunc((val: RawValueType, label?: ReactNode) => {
      const mergedLabel = label ?? val
      return {
        [mergedFieldNames.value]: val,
        [mergedFieldNames.label]: mergedLabel,
      } as DefaultOptionType
    })

    // Fill tag as option if mode is `tags`
    const filledTagOptions = useMemo(() => {
      if (mode !== 'tags') {
        return mergedOptions
      }

      // >>> Tag mode
      const cloneOptions = [...mergedOptions]

      // Check if value exist in options (include new patch item)
      const existOptions = (val: RawValueType) => valueOptions.has(val);

      // Fill current value as option
      [...mergedValues]
        .sort((a, b) => (a.value < b.value ? -1 : 1))
        .forEach((item) => {
          const val = item.value

          if (!existOptions(val)) {
            cloneOptions.push(createTagOption(val, item.label))
          }
        })

      return cloneOptions
    }, [createTagOption, mergedOptions, valueOptions, mergedValues, mode])

    const filteredOptions = useFilterOptions(
      filledTagOptions,
      mergedFieldNames,
      mergedSearchValue,
      mergedFilterOption,
      optionFilterProp,
    )

    // Fill options with search value if needed
    const filledSearchOptions = useMemo(() => {
      if (
        mode !== 'tags' ||
        !mergedSearchValue ||
        filteredOptions.some((item) => item[optionFilterProp || 'value'] === mergedSearchValue)
      ) {
        return filteredOptions
      }

      // Fill search value as option
      return [createTagOption(mergedSearchValue), ...filteredOptions]
    }, [createTagOption, optionFilterProp, mode, filteredOptions, mergedSearchValue])

    const orderedFilteredOptions = useMemo(() => {
      if (!filterSort) {
        return filledSearchOptions
      }

      return [...filledSearchOptions].sort((a, b) => filterSort(a, b))
    }, [filledSearchOptions, filterSort])

    const displayOptions = useMemo(
      () =>
        flattenOptions(orderedFilteredOptions, { fieldNames: mergedFieldNames, childrenAsData }),
      [orderedFilteredOptions, mergedFieldNames, childrenAsData],
    )

    // =========================== Change ===========================
    const triggerChange = (values: DraftValueType) => {
      const labeledValues = convert2LabelValues(values)
      setInternalValue(labeledValues)

      if (
        onChange &&
        // Trigger event only when value changed
        (labeledValues.length !== mergedValues.length ||
          labeledValues.some((newVal, index) => mergedValues[index]?.value !== newVal?.value))
      ) {
        const returnValues = labelInValue ? labeledValues : labeledValues.map((v) => v.value)
        const returnOptions = labeledValues.map((v) =>
          injectPropsWithOption(getMixedOption(v.value)),
        )

        onChange(
          // Value
          multiple ? returnValues : returnValues[0],
          // Option
          multiple ? returnOptions : returnOptions[0],
        )
      }
    }

    // ======================= Accessibility ========================
    const [activeValue, setActiveValue] = useState<string>(null)
    const [accessibilityIndex, setAccessibilityIndex] = useState(0)
    const mergedDefaultActiveFirstOption =
      defaultActiveFirstOption !== undefined ? defaultActiveFirstOption : mode !== 'combobox'

    const onActiveValue: OnActiveValue = useCallback(
      (active, index, { source = 'keyboard' } = {}) => {
        setAccessibilityIndex(index)

        if (backfill && mode === 'combobox' && active !== null && source === 'keyboard') {
          setActiveValue(String(active))
        }
      },
      [backfill, mode],
    )

    // ========================= OptionList =========================
    const triggerSelect = (val: RawValueType, selected: boolean, type?: DisplayInfoType) => {
      const getSelectEnt = (): [RawValueType | LabelInValueType, DefaultOptionType] => {
        const option = getMixedOption(val)
        return [
          labelInValue
            ? {
                label: option?.[mergedFieldNames.label],
                value: val,
                key: option?.key ?? val,
              }
            : val,
          injectPropsWithOption(option),
        ]
      }

      if (selected && onSelect) {
        const [wrappedValue, option] = getSelectEnt()
        onSelect(wrappedValue, option)
      } else if (!selected && onDeselect && type !== 'clear') {
        const [wrappedValue, option] = getSelectEnt()
        onDeselect(wrappedValue, option)
      }
    }

    // Used for OptionList selection
    const onInternalSelect = useRefFunc<OnInternalSelect>((val, info) => {
      let cloneValues: (RawValueType | DisplayValueType)[]

      // Single mode always trigger select only with option list
      const mergedSelect = multiple ? info.selected : true

      if (mergedSelect) {
        cloneValues = multiple ? [...mergedValues, val] : [val]
      } else {
        cloneValues = mergedValues.filter((v) => v.value !== val)
      }

      triggerChange(cloneValues)
      triggerSelect(val, mergedSelect)

      // Clean search value if single or configured
      if (mode === 'combobox') {
        // setSearchValue(String(val))
        setActiveValue('')
      } else if (!isMultiple || autoClearSearchValue) {
        setSearchValue('')
        setActiveValue('')
      }
    })

    // ======================= Display Change =======================
    // BaseSelect display values change
    const onDisplayValuesChange: BaseSelectProps['onDisplayValuesChange'] = (nextValues, info) => {
      triggerChange(nextValues)
      const { type, values } = info

      if (type === 'remove' || type === 'clear') {
        values.forEach((item) => {
          triggerSelect(item.value, false, type)
        })
      }
    }

    // =========================== Search ===========================
    const onInternalSearch: BaseSelectProps['onSearch'] = (searchText, info) => {
      setSearchValue(searchText)
      setActiveValue(null)

      // [Submit] Tag mode should flush input
      if (info.source === 'submit') {
        const formatted = (searchText || '').trim()
        // prevent empty tags from appearing when you click the Enter button
        if (formatted) {
          const newRawValues = Array.from(new Set<RawValueType>([...rawValues, formatted]))
          triggerChange(newRawValues)
          triggerSelect(formatted, true)
          setSearchValue('')
        }

        return
      }

      if (info.source !== 'blur') {
        if (mode === 'combobox') {
          triggerChange(searchText)
        }

        onSearch?.(searchText)
      }
    }

    const onInternalSearchSplit: BaseSelectProps['onSearchSplit'] = (words) => {
      let patchValues: RawValueType[] = words

      if (mode !== 'tags') {
        patchValues = words
          .map((word) => {
            const opt = labelOptions.get(word)
            return opt?.value
          })
          .filter((val) => val !== undefined)
      }

      const newRawValues = Array.from(new Set<RawValueType>([...rawValues, ...patchValues]))
      triggerChange(newRawValues)
      newRawValues.forEach((newRawValue) => {
        triggerSelect(newRawValue, true)
      })
    }

    // ========================== Context ===========================
    const selectContext = useMemo(() => {
      const realVirtual = virtual !== false && dropdownMatchSelectWidth !== false
      return {
        ...parsedOptions,
        flattenOptions: displayOptions,
        onActiveValue,
        defaultActiveFirstOption: mergedDefaultActiveFirstOption,
        onSelect: onInternalSelect,
        menuItemSelectedIcon,
        rawValues,
        fieldNames: mergedFieldNames,
        virtual: realVirtual,
        listHeight,
        listItemHeight,
        childrenAsData,
      }
    }, [
      parsedOptions,
      displayOptions,
      onActiveValue,
      mergedDefaultActiveFirstOption,
      onInternalSelect,
      menuItemSelectedIcon,
      rawValues,
      mergedFieldNames,
      virtual,
      dropdownMatchSelectWidth,
      listHeight,
      listItemHeight,
      childrenAsData,
    ])

    // ==============================================================
    // ==                          Render                          ==
    // ==============================================================
    return (
      <SelectContext.Provider value={selectContext}>
        <BaseSelect
          {...restProps}
          // >>> MISC
          id={mergedId}
          prefixCls={prefixCls}
          ref={ref}
          omitDomProps={OMIT_DOM_PROPS}
          mode={mode}
          // >>> Values
          displayValues={displayValues}
          onDisplayValuesChange={onDisplayValuesChange}
          // >>> Search
          searchValue={mergedSearchValue}
          onSearch={onInternalSearch}
          onSearchSplit={onInternalSearchSplit}
          dropdownMatchSelectWidth={dropdownMatchSelectWidth}
          // >>> OptionList
          OptionList={OptionList}
          emptyOptions={!displayOptions.length}
          // >>> Accessibility
          activeValue={activeValue}
          activeDescendantId={`${mergedId}_list_${accessibilityIndex}`}
        />
      </SelectContext.Provider>
    )
  },
)

Select.displayName = 'Select'
const TypedSelect = Select as unknown as (<
  ValueType = any,
  OptionType extends BaseOptionType | DefaultOptionType = DefaultOptionType,
>(
  props: PropsWithChildren<SelectProps<ValueType, OptionType>> & {
    ref?: Ref<BaseSelectRef>
  },
) => ReactElement) & {
  Option: typeof Option
  OptGroup: typeof OptGroup
}

TypedSelect.Option = Option
TypedSelect.OptGroup = OptGroup

export default TypedSelect