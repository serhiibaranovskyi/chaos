import React from 'react'
import type { Control, FieldPath, FieldValues } from 'react-hook-form'
import { useController } from 'react-hook-form'

import { TextField, TextFieldProps } from '@/shared/components/text-field'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TextFieldCtrlProps<TFieldValues extends FieldValues = any> = Omit<
  TextFieldProps,
  'name' | 'onChange' | 'value'
> & {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function TextFieldCtrl<TFieldValues extends FieldValues = any>(
  props: TextFieldCtrlProps<TFieldValues>
) {
  const { control, name, ...other } = props
  const { field, fieldState, formState } = useController({ control, name })

  return (
    <TextField
      {...field}
      disabled={formState.isSubmitting ? true : undefined}
      error={Boolean(fieldState.error)}
      helperText={fieldState.error ? fieldState.error.message : undefined}
      {...other}
    />
  )
}
