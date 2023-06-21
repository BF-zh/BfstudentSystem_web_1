import type { RawAxiosRequestHeaders } from 'axios'
import { Request } from '@/tools'
import { account } from '@/apis/account'
import type { Account } from '@/types'
import type { IRes, registerRes } from './types'

export function useHttp() {
  const http = new Request({
    baseURL: 'http://localhost:8080',
    // @ts-ignore
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    withCredentials: true,
  })
  function register(data:registerRes) {
    return http.request<IRes<Account>>({
      url: account.REIGITURL,
      data
    })
  }
  return {
    register,
  }
}

