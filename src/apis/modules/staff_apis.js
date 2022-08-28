import api from "../axios";
const baseURL = '/api/v1'

export default {
  login: payload => api.post(`${baseURL}/auth/signing`,payload),
  getAllStaff: () => api.get(`${baseURL}/admin/staff?account_type=admin`)
}
