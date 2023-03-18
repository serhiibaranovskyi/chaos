import _ from 'lodash'

import { ApiError } from './errors'

export interface ChaosResponsePayload<TData> {
  data: TData
  ok: boolean
}

export interface ChaosResponse<TData> extends Response {
  data: TData
}

export async function request<TData>(
  url: string,
  init: RequestInit = {}
): Promise<ChaosResponse<TData>> {
  const response = (await fetch(
    url,
    _.merge(
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
      init
    )
  )) as ChaosResponse<TData>

  const paylaod = await response.json()
  response.data = (paylaod as ChaosResponsePayload<TData>)?.data

  if (response.status >= 400) {
    const errMsg =
      paylaod?.message || response?.statusText || 'Something went wrong'
    throw new ApiError(errMsg, response)
  }

  return response
}
