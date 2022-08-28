import Vue from 'vue'
import Router from 'vue-router'
import auth_router from "./modules/auth_router";
import admin_router from "./modules/admin-router";

Vue.use(Router)

export default new Router({
  routes: [
    ...auth_router,
    ...admin_router
  ]
})
