import AdminHome from '../../Views/Admin/index'
import AdminStaff from '../../Views/Admin/Staff/index'
import Store from '../../store/index'

export default [
  {
    path: '/admin/home',
    name: 'admin_home',
    component: AdminHome,
    // beforeEach:async(to,_,next)=>{
    //   if(Store.getters.currentUser == null){
    //     next('/')
    //   }else {
    //     next()
    //   }
    // }
  },
  {
    path: '/admin/staff',
    name: 'admin_home',
    component: AdminStaff,
    // beforeEnter:(to,from,next)=>{
    //   if(Store.getters.currentUser == null){
    //     next('/')
    //   }else {
    //     next()
    //   }
    // }
  }
]
