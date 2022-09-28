import axios from "axios";
import router from '../router/index'
import ErrorMixins from '../mixins/ToastMixin'

const instance = axios.create({
  baseURL: 'http://localhost:5000'
});

if (localStorage.getItem('JWT')) {
  instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('JWT')}`;
}

// console.log(localStorage.getItem('JWT'))
instance.interceptors.response.use(config => {
    return config;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem('JWT')
      localStorage.removeItem('IsLoggedIn')
      // ErrorMixins.methods.danger('Unauthenticated!!')
      router.push("/")
    }
    return Promise.reject(error)
  })
export default instance
