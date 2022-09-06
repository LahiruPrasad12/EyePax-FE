<template>
  <div id="app">
<div class="container">
<Sidebar/>
 <div class="wrapper">
  <div class="header">
   <div class="search-bar">
    <input type="text" placeholder="Search">
   </div>
   <div class="user-settings">
    <img class="user-img" src="https://images.unsplash.com/photo-1587918842454-870dbd18261a?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=943&q=80" alt="">
    <div class="user-name">Admin</div>
   </div>
  </div>

 
  <router-view/>


 </div>
</div>
  </div>
  
</template>

<script>
import Sidebar from "./layout/sidebar";
import New from "./layout/new";
export default {
  name: 'App',
  components: {Sidebar,New}
}
</script>

<style>
@import './layout/test.css';
/*#app {*/
/*  font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
/*  -webkit-font-smoothing: antialiased;*/
/*  -moz-osx-font-smoothing: grayscale;*/
/*  text-align: center;*/
/*  color: #2c3e50;*/
/*  margin-top: 60px;*/
/*}*/
</style>
