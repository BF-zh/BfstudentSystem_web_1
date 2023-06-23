import { Request } from '@/tools'
import { ACCOUNT, USER } from '@/apis'
import type { Account } from '@/types'

export interface IRes<T> {
  status: number
  success: boolean
  message: T
}

/**
 * 一个请求的工具
 * @returns API 的集合
 */
export function useHttp() {
  const http = new Request({
    baseURL: 'http://localhost:8080',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    withCredentials: true,
  })
  /**
   * 注册的方法
   * @param data 传递的参数
   * @returns 是否成功的信息
   */
  function register(data: Pick<Account, 'username' | 'password' | 'email'> & { code: string }) {
    return http.request<IRes<string>>({
      url: ACCOUNT.REIGITURL,
      data,
      method: 'post',
    })
  }
  /**
   * 验证邮箱
   * @param code 验证吗
   * @returns 是否验证成功
   */
  function validateEmail(code: string) {
    return http.request<IRes<string>>({
      url: ACCOUNT.VALID_REGISTER_EMAIL,
      data: {
        code,
      },
      method: 'post',
    })
  }
  /**
   * 登陆
   * @param data 传递的数据
   * @returns 是否登陆成功
   */
  function login(data: Pick<Account, 'password' | 'username'> & { remember: boolean }) {
    return http.request<IRes<string>>({
      url: ACCOUNT.LOGIN,
      data,
      method: 'post',
    })
  }
  /**
   * 退出登陆
   * @returns 是否退出成功
   */
  function logout() {
    return http.request<IRes<string>>({
      url: ACCOUNT.LOGOUT,
      method: 'get',
    })
  }
  /**
   * 忘记密码需要发送的邮箱
   * @param data 传递的数据
   * @returns 邮件是否发送成功
   */
  function validateResetEmail(data: Pick<Account, 'email'>) {
    return http.request<IRes<string>>({
      url: ACCOUNT.VALID_RESET_EMAIL,
      data,
      method: 'post',
    })
  }
  /**
   * 开始重置
   * @param data 传递的数据
   * @returns 是否重置成功
   */
  function startReset(data: Pick<Account, 'email'> & { code: string }) {
    return http.request<IRes<string>>({
      url: ACCOUNT.START_RESET,
      data,
      method: 'post',
    })
  }
  /**
   * 重置密码
   * @param data 重置的密码
   * @returns 是否重置成功
   */
  function doReset(data: Pick<Account, 'password'>) {
    return http.request<IRes<string>>({
      url: ACCOUNT.DO_RESET,
      data,
      method: 'post',
    })
  }

  /**
   * 查询用户信息
   * @returns 用户信息
   */
  function userInfo() {
    return http.request<IRes<Account>>({
      url: USER.INFO,
      method: 'get',
    })
  }
  return {
    validateEmail,
    register,
    login,
    validateResetEmail,
    userInfo,
    startReset,
    doReset,
    logout,
  }
}
