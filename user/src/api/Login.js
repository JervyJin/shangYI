import {default as request} from '@/utils/api'

export function getLogin (data) {
  return request({
    url: '/api/TokenAuth/Authenticate',
    method: 'POST',
    data
  })
}
