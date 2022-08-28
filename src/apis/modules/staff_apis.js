import api from "../axios";
const baseURL = '/api/v1'

export default {
  login: payload => api.post(`${baseURL}/auth/signing`,payload),
  getAllStaff: (role) => api.get(`${baseURL}/admin/staff${role?`?account_type=${role}`:''}`)
}
