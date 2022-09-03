import Vue from 'vue'
import Router from 'vue-router'
import auth_router from "./modules/auth_router";
import admin_router from "./modules/admin-router";
import supplier_router from "./modules/supplier-router";

Vue.use(Router)

export default new Router({
  routes: [
    ...auth_router,
    ...admin_router,
    ...supplier_router
  ]
})
