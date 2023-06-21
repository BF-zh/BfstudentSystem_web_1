import type { Account } from "@/types"

 export interface IRes<T> {
  status: number,
  success: boolean,
  message: T
}

export type registerRes = Pick<Account,'username'|'password'|'email'>&{code:number}
