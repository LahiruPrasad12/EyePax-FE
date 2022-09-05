import api from "../../axios";
const baseURL = '/api/v1'

export default {
  getAllItems: () => api.get(`${baseURL}/supplier/getall`),
  createItem: (payload) => api.post(`${baseURL}/supplier/additem`,payload),
  updateItem: (id,payload) => api.put(`${baseURL}/supplier/update/${id}`,payload),
  deleteItem: (id) => api.delete(`${baseURL}/supplier/delete/${id}`)

}