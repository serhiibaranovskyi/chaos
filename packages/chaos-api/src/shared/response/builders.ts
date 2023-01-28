import type { EmptyResponseDto } from './response.dto'

export type MakeResponseOptions = {
  ok?: boolean
}

export function makeEmptyResponse(
  options: MakeResponseOptions = {}
): EmptyResponseDto {
  const { ok = true } = options
  return { data: null, ok }
}

export function makeResponse<T>(data: T, options: MakeResponseOptions = {}) {
  const { ok = true } = options
  return { data, ok }
}
