import _ from 'lodash'

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

  const paylaod = (await response.json()) as ChaosResponsePayload<TData>
  response.data = paylaod.data

  return response
}
