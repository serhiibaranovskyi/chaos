'use client'
import React from 'react'
import BaseJSONEditor from 'react-json-editor-ajrm'
// @ts-ignore
import enLocale from 'react-json-editor-ajrm/locale/en'
import { JsonArray, JsonObject } from 'type-fest'

type BaseJSONEditorProps = React.ComponentProps<typeof BaseJSONEditor>

export type JsonEditorValue = {
  error: boolean
  jsObject: JsonObject | JsonArray
  json: string
  lines: number
  plainText: string
  value: string
}

export type JsonEditorProps = Omit<Partial<BaseJSONEditorProps>, 'onChange'> & {
  onChange: (value: JsonEditorValue) => void
}

export function JsonEditor(props: JsonEditorProps) {
  return <BaseJSONEditor locale={enLocale} {...props} />
}
