import { useState, useEffect } from 'react'
import canUseDom from 'rc-util/lib/Dom/canUseDom'

let uuid = 0

/** Is client side and not jsdom */
export const isBrowserClient = canUseDom()

/** Get unique id for accessibility usage */
export function getUUID(): number | string {
  let retId: string | number
  retId = uuid
  uuid += 1
  return retId
}

export default function useId(id?: string) {
  // Inner id for accessibility usage. Only work in client side
  const [innerId, setInnerId] = useState<string>()
  useEffect(() => {
    setInnerId(`basic_select_${getUUID()}`)
  }, [])
  return id || innerId
}