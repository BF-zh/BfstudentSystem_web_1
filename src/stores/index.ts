import type { Account } from '@/types'

export const useStore = defineStore('store', () => {
  const auth = reactive<{ user: Account | null }>({
    user: null,
  })
  return { auth }
})
