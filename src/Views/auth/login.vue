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
        <button :disabled="is_btn_loading" class="button is-primary" @click="signIN">
          {{ is_btn_loading ? 'Signing....' : 'Sign in' }}
        </button>
      </validation-observer>
    </form>
  </div>

</template>

<script>
import {ValidationObserver, ValidationProvider} from 'vee-validate'
import ToastMixin from "../../mixins/ToastMixin";
import {mapActions} from 'vuex'
export default {
  name: "login",
  components: {
    ValidationProvider,
    ValidationObserver
  },
  mixins: [ToastMixin],
  data() {
    return {
      is_btn_loading: false,
      form: {
        email: '',
        password: ''
      }
    }
  },

  methods: {
    ...mapActions(['login']),
    async signIN() {
      try {
        this.is_btn_loading = true
        if (await this.$refs.loginValidation.validate()){
          await this.login(this.form)
        }
      } catch (e) {
        this.danger('Your username or password is incorrect')
      }
      this.is_btn_loading = false
    }
  }


}
</script>

<style scoped>
.container {

  width: auto;
}
</style>
