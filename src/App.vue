<template>
  <div id="app">
    <div class="container">
      <div v-if="currentUser != null" >
        <Sidebar/>
      </div>

      <div class="wrapper">
        <div class="header">
          <!-- <div class="search-bar">
           <input type="text" placeholder="Search">
          </div> -->
          <div class="user-settings">
            <img alt="" class="user-img" src="https://i.postimg.cc/Hs8Kgb73/ezgif-com-gif-maker.gif">
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
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'App',
  components: {Sidebar, New},
  computed: {
    ...mapGetters(['currentUser'])
  },
  methods: {
    ...mapActions(['autoLogin']),
    async autoLoginUser() {
      try {
        await this.autoLogin()
      } catch(e) {
        await this.$router.push('/')
      }
    }
  },
  async mounted() {
    if(this.currentUser == null){
      await this.autoLoginUser()
    }
  }
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
