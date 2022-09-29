import Vue from 'vue'
import Router from 'vue-router'
import auth_router from "./modules/auth_router";
import admin_router from "./modules/admin-router";
import supplier_router from "./modules/supplier-router";
import customer_router from "./modules/customer-router";
import stock_router from "./modules/stock-manager-router";

Vue.use(Router)
// import {  createWebHashHistory } from 'vue-router'
export default new Router({
  mode: 'history',
  routes: [...auth_router, ...admin_router, ...supplier_router, ...customer_router, ...stock_router]
})
