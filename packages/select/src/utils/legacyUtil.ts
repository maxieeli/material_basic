import type { ReactElement, ReactNode } from 'react'
import { isValidElement } from 'react'
import toArray from 'rc-util/lib/Children/toArray'
import type { BaseOptionType, DefaultOptionType } from '../Select'

function convertNodeToOption<OptionType extends BaseOptionType = DefaultOptionType>(
  node: ReactElement,
): OptionType {
  const {
    key,
    props: { children, value, ...restProps },
  } = node as ReactElement

  return { key, value: value !== undefined ? value : key, children, ...restProps }
}

export function convertChildrenToData<OptionType extends BaseOptionType = DefaultOptionType>(
  nodes: ReactNode,
  optionOnly: boolean = false,
): OptionType[] {
  return toArray(nodes)
    .map((node: ReactElement, index: number): OptionType | null => {
      if (!isValidElement(node) || !node.type) {
        return null
      }

      const {
        type: { isSelectOptGroup },
        key,
        props: { children, ...restProps },
      } = node as ReactElement & {
        type: { isSelectOptGroup?: boolean }
      }

      if (optionOnly || !isSelectOptGroup) {
        return convertNodeToOption(node)
      }

      return {
        key: `__BASIC_SELECT_GRP__${key === null ? index : key}__`,
        label: key,
        ...restProps,
        options: convertChildrenToData(children),
      }
    })
    .filter((data) => data)
}