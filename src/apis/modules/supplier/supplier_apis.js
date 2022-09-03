import api from "../../axios";
const baseURL = '/api/v1'

export default {
  getAllItems: (role) => api.get(`${baseURL}/admin/staff${role?`?account_type=${role}`:''}`)

}
