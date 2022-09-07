<template>
  <div id="app">
<div class="container">
<Sidebar/>
 <div class="wrapper">
  <div class="header">
   <!-- <div class="search-bar">
    <input type="text" placeholder="Search">
   </div> -->
   <div class="user-settings">
    <img class="user-img" src="https://i.postimg.cc/Hs8Kgb73/ezgif-com-gif-maker.gif" alt="">
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
