<template>
  <div>
  
  <div class="main-container" style="width: 1000px;">
    <form class="box" style="background-color: rgba(21, 20, 26, 0.63); border-radius: 20px">
      <h1 style="text-align:center; font-size: 25px; color: white; margin-top: 2%; font-weight: 400;">Already registered? Sign in here</h1>
      <br/>
      <validation-observer ref="loginValidation">
      <div class="field">
        <validation-provider
          #default="{ errors }"
          name="Email"
          rules="required|emailTest"
        >
        <label class="label" style="color: #808191;">Email</label>
        <div class="control">
          <input v-model="form.email" class="input" placeholder="e.g. alex@example.com" type="email">
        </div>
          <small class="text-danger">{{ errors[0] }}</small>
        </validation-provider>
      </div>

      <div class="field">
        <label class="label" style="color: #808191;">Password</label>
        <div class="control">
          <input v-model="form.password" class="input" placeholder="********" type="password">
        </div>
      </div>
      <br/>
        <button :disabled="is_btn_loading" class="button is-primary" @click="signIN" style="margin-bottom: 2%">
          {{ is_btn_loading ? 'Signing....' : 'Sign in' }}
        </button>
      </validation-observer>
    </form>
  </div>

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
          let respond = await this.login(this.form)
          console.log(respond)
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
