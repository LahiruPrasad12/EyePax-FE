import Vue from 'vue';
import Vuex from 'vuex';
import authAPI from "@/apis/modules/auth_apis";
import router from "../router";


Vue.use(Vuex);


export default  new Vuex.Store({
  state: {
    current_user_data: null,
    authenticated: false,
  },
  mutations: {
    SET_CURRENT_USER: (state, value) => {
      state.current_user_data = value
    },
  },
  getters: {
    currentUser: state => state.current_user_data,
  },
  actions: {
    async login({ commit },form){
      let payload = {
        email : form.email,
        password : form.password
      }
      let respond = (await authAPI.login(payload)).data
      localStorage.setItem("JWT", respond.token);
      commit('SET_CURRENT_USER',respond.data.user)
      if(respond.data.user.account_type === 'admin'){
        await router.replace('/admin/home')
      }else if(respond.data.user.account_type === 'supplier'){
        await router.replace('/admin/home')
      }else if(respond.data.user.account_type === 'staff'){
        await router.replace('/admin/home')
      }else if(respond.data.user.account_type === 'stock-manager'){
        await router.replace('/admin/home')
      }
    },

    async autoLogin({ commit }){
      let respond = (await authAPI.autologin()).data.data
      commit('SET_CURRENT_USER',respond)
      if(respond.data.user.account_type === 'admin'){
        await router.replace('/admin/home')
      }else if(respond.data.user.account_type === 'supplier'){
        await router.replace('/admin/home')
      }else if(respond.data.user.account_type === 'staff'){
        await router.replace('/admin/home')
      }else if(respond.data.user.account_type === 'stock-manager'){
        await router.replace('/admin/home')
      }
    },
  }
})
