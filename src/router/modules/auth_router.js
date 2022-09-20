import Login from '../../views/auth/login'
import Store from "../../store";
import router from "../index";

export default [
  {
    path: '/',
    name: 'Login',
    component: Login,
    beforeEnter:async (to,from,next)=>{
      if(Store.getters.currentUser != null){
        if(Store.getters.currentUser.account_type === 'admin'){
          next('/admin/home')
        }else if(Store.getters.currentUser.account_type === 'supplier'){
          next('/supplier/home')
        }else if(Store.getters.currentUser.account_type === 'staff'){
          next('/staff/home')
        }else{
          next('/stock-manager')
        }
      }else {
        next()
      }
    }
  }
]
