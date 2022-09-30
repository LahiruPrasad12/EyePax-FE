import SupplierHome from '../../Views/Supplier/index'
import SupplierRequest from '../../Views/Supplier/SupplyRequest/index'

export default [
  {
    path: '/supplier/home',
    name: 'supplier_home',
    component: SupplierHome
  },
  {
    path: '/supplier/request',
    name: 'supplier_request',
    component: SupplierRequest
  }
]
