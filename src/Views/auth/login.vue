<template>
  <div>

  <div class="main-container anim" style="--delay:0.2s;">
    <br/><br/><br/>
    <img src="https://i.postimg.cc/4NB31nQY/Eyepax-logo.png"/>
    <form style="margin-bottom: 40%" >
      <h1 style="text-align:center; font-size: 25px; color: white; margin-top: 2%; font-weight: 600;">Welcome</h1>
      <br/>
      <validation-observer ref="loginValidation">
      <div class="field">
        <validation-provider
          #default="{ errors }"
          name="Email"
          rules="required|emailTest"
        >
        <label class="label" style="color: rgb(180, 180, 180);">Email</label>
        <div class="control">
          <input v-model="form.email" class="input" placeholder="e.g. alex@example.com" type="email">
        </div>
          <small class="text-danger">{{ errors[0] }}</small>
        </validation-provider>
      </div>

      <div class="field">
        <label class="label" style="color: rgb(180, 180, 180);">Password</label>
        <div class="control">
          <input v-model="form.password" class="input" placeholder="********" type="password">
        </div>
      </div>
      <br/>
      <center>
        <button :disabled="is_btn_loading" class="button is-primary" @click="signIN" style="margin-bottom: 2%">
          {{ is_btn_loading ? 'Signing....' : 'Sign in' }}
        </button>
      </center>
      </validation-observer>
    </form>
  </div>
  <div class="ft anim" style="--delay:0.3s;">
      <p style="text-align:center">
          © 2022. EyePax Technologies. All Rights Reserved.
      </p>
  </div>
</div>
</template>

<script>
import {ValidationObserver, ValidationProvider} from 'vee-validate'
import ToastMixin from "../../mixins/ToastMixin";
import {mapActions,mapGetters} from 'vuex'
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
  computed: {
    ...mapGetters(['currentUser'])
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
  },
  mounted() {
    if(this.currentUser != null){
      this.$router.push('/admin/home')
    }
  }


}
</script>

<style scoped>
.container {

  width: auto;
}
</style>
