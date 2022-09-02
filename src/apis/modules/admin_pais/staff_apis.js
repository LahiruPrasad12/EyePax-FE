import api from "../../axios";
const baseURL = '/api/v1'

export default {
  getAllStaff: (role) => api.get(`${baseURL}/admin/staff${role?`?account_type=${role}`:''}`),
  createStaff: (payload) => api.post(`${baseURL}/admin/staff`,payload),
  updateStaff: (id,payload) => api.put(`${baseURL}/admin/staff/${id}`,payload),
  deleteStaff: (id) => api.delete(`${baseURL}/admin/staff/${id}`)

}
