'use client'
import type { ReactJsonViewProps } from 'react-json-view'
import loadable from '@loadable/component'

const BaseJsonView = loadable(() => import('react-json-view'))

export type JsonViewProps = ReactJsonViewProps

export function JsonView(props: JsonViewProps) {
  return <BaseJsonView enableClipboard={false} theme="solarized" {...props} />
}
