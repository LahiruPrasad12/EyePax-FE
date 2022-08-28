<template>
  <div id="app">
    <Header/>
    <AdminSideNav/>
    <router-view/>
    <Footer/>
  </div>
</template>

<script>
import Footer from "./layout/footer";
import Header from "./layout/header";
import AdminSideNav from "./layout/admin-side-nav";
export default {
  name: 'App',
  components: {Header, Footer,AdminSideNav}
}
</script>

<style>
/*#app {*/
/*  font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
/*  -webkit-font-smoothing: antialiased;*/
/*  -moz-osx-font-smoothing: grayscale;*/
/*  text-align: center;*/
/*  color: #2c3e50;*/
/*  margin-top: 60px;*/
/*}*/
</style>
