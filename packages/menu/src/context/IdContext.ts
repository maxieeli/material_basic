import * as React from 'react'

export const IdContext = React.createContext<string>(null)

export function getMenuId(uuid: string, eventKey: string) {
  if (uuid === undefined) {
    return null
  }
  return `${uuid}-${eventKey}`
}

/** data-menu-id */
export function useMenuId(eventKey: string) {
  const id = React.useContext(IdContext)
  return getMenuId(id, eventKey)
}
