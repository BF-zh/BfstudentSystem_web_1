import type { RawAxiosRequestHeaders } from 'axios'
import { Request } from '@/tools'
import { account } from '@/apis/account'
import type { Account } from '@/types'
import type { IRes, registerRes } from './types'

export function useHttp() {
  const http = new Request({
    baseURL: 'http://localhost:8080',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    withCredentials: true,
  })
  function register(data:registerRes) {
    return http.request<IRes<string>>({
      url: account.REIGITURL,
      data,
      method:"post"
    })
  }
  function validateEmail(code:string){
    return http.request<IRes<string>>({
      url: account.REIGITURL,
      data:{
        code
      },
      method:"post"
    })
  }
  return {
    validateEmail,
    register,
  }
}

