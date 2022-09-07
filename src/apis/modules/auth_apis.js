import api from "../axios";
const baseURL = '/api/v1'

export default {
  login: payload => api.post(`${baseURL}/auth/signing`,payload),
  autologin: () => api.get(`${baseURL}/auth/current-user`)
}
