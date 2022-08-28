<template>
  <div class="container is-max-desktop">
    <form class="box">
      <validation-observer ref="loginValidation">
      <div class="field">
        <validation-provider
          #default="{ errors }"
          name="Email"
          rules="required|emailTest"
        >
        <label class="label">Email</label>
        <div class="control">
          <input v-model="form.email" class="input" placeholder="e.g. alex@example.com" type="email">
        </div>
          <small class="text-danger">{{ errors[0] }}</small>
        </validation-provider>
      </div>

      <div class="field">
        <label class="label">Password</label>
        <div class="control">
          <input v-model="form.password" class="input" placeholder="********" type="password">
        </div>
      </div>

      <button class="button is-primary" @click="signIN">Sign in</button>
      </validation-observer>
    </form>
  </div>

</template>

<script>
import auth_apis from "../../apis/modules/auth_apis";
import {ValidationObserver, ValidationProvider} from 'vee-validate'
import ToastMixin from "../../mixins/ToastMixin";
export default {
  name: "login",
  components: {
    ValidationProvider,
    ValidationObserver
  },
  mixins: [ToastMixin],
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
        let respond = await auth_apis.login(this.form)
      } catch (e) {
        this.danger('Your username or password is incorrect')
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
