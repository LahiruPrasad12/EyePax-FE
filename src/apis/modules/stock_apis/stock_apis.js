import api from "../../axios";
const baseURL = '/api/v1'

export default {
  getAllStocks: () => api.get(`${baseURL}/stock/getall`),
  createStock: (payload) => api.post(`${baseURL}/stock/addstock`,payload),
  updateStock: (id,payload) => api.put(`${baseURL}/stock/update/${id}`,payload),
  deleteStock: (id) => api.delete(`${baseURL}/stock/delete/${id}`)

}
