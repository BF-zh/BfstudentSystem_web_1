import type { RawAxiosRequestHeaders } from 'axios'
import { Request } from '@/tools'

const header: RawAxiosRequestHeaders = {
  'Content-Type': 'application/x-www-form-urlencoded',
}
export function useHttp() {
  const http = new Request({
    baseURL: 'http://localhost:8080',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    withCredentials: true,
  })
  function register() {

  }
  return {
    register,
  }
}
1
