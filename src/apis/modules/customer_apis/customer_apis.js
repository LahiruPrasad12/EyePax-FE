import api from "../../axios";
const baseURL = '/api/v1'

export default {
    getAllOrders: () => api.get(`${baseURL}/order/getOrder`),
    createOrder: (payload) => api.post(`${baseURL}/order/addOrder`, payload),
    updateOrder: (payload) => api.post(`${baseURL}/order/updateOrder`, payload)
    //   updateStaff: (id,payload) => api.put(`${baseURL}/admin/staff/${id}`,payload),
    //   deleteStaff: (id) => api.delete(`${baseURL}/admin/staff/${id}`)

}
