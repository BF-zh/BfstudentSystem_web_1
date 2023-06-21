import { RouterName } from "@/router/const"
export function useGoTo(){
  const router = useRouter()
  function goToHome(){
    router.push({name:RouterName.HOME})
  }
  function goToRigister(){
    router.push({name:RouterName.REGISTER})
  }
  function goToWeCome(){
    router.push({name:RouterName.WECOME})
  }
  function goToForgetPassword(){
    router.push({name:RouterName.FORGET_PASSWORD})
  }
  function goToLogin(){
    router.push({name:RouterName.LOGIN})
  }
  return {
    goToForgetPassword,
    goToHome,
    goToLogin,
    goToRigister,
    goToWeCome
  }
}
