import { Type, TArray, TObject, Static } from '@sinclair/typebox'

export const EmptyResponseSchema = Type.Object({
  data: Type.Null(),
  ok: Type.Boolean(),
})

export function makeResponseSchema<TData extends TObject | TArray>(
  data: TData
) {
  return Type.Object({
    data,
    ok: Type.Boolean(),
  })
}

export type EmptyResponseDto = Static<typeof EmptyResponseSchema>
