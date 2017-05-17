import { request, config } from '../utils'
const { api } = config
const { users } = api

// export async function query(params) {
//   return request({
//     url: 'http://192.168.1.122:8080/api/v1/users',
//     method: 'get',
//     data: params,
//   })
// }

export async function query(params) {
  return request({
    url: users,
    method: 'get',
    data: params,
  })
}
