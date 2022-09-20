import { Component } from 'react'
import type { ReactNode } from 'react'

export interface DomWrapperProps {
  children: ReactNode
}

class DomWrapper extends Component<DomWrapperProps> {
  render() {
    return this.props.children
  }
}

export default DomWrapper
