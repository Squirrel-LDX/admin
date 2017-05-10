import { request, config } from '../utils'
const { api } = config
const { goods } = api

export async function query (params) {
  return request({
    url: goods,
    method: 'get',
    data: params,
  })
}
