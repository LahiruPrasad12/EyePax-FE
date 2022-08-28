<template>
  <div class="container is-max-desktop">
    <form class="box">
      <div class="field">
        <label class="label">Email</label>
        <div class="control">
          <input v-model="form.email" class="input" placeholder="e.g. alex@example.com" type="email">
        </div>
      </div>

      <div class="field">
        <label class="label">Password</label>
        <div class="control">
          <input v-model="form.password" class="input" placeholder="********" type="password">
        </div>
      </div>

      <button class="button is-primary" @click="signIN">Sign in</button>
    </form>
  </div>

</template>

<script>
import auth_apis from "../../apis/modules/auth_apis";

export default {
  name: "login",
  data() {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },

  methods: {
    async signIN() {
      try {
        let respond = auth_apis.login(this.form)
      } catch (e) {

      }
    }
  }


}
</script>

<style scoped>
.container {

  width: auto;
}
</style>
