export const useStore = defineStore('store', () => {
  const auth = reactive({
    user: null,
  })
  return { auth }
})
