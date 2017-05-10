import { request, config } from '../utils'
const { api } = config
const { good } = api

export async function query (params) {
  return request({
    url: good,
    method: 'get',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: good,
    method: 'delete',
    data: params,
  })
}
