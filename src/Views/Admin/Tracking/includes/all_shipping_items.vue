<template>

  <div>
    <div class="anim" style="--delay:0.2s;">
      <b-table
        ref="shippingItemTable"
        :data="shipping_items"
        :loading="is_table_loading"
        hover
        responsive
      >
        <b-table-column field="id" label="ID">
          <template v-slot:header="{ column }">
            <b-tooltip :label="column.label" append-to-body dashed>
              {{ column.label }}
            </b-tooltip>
          </template>
          <template v-slot="props">
            {{ props.row.id }}
          </template>
        </b-table-column>
        <b-table-column field="item_code" label="Item Code">
          <template v-slot:header="{ column }">
            <b-tooltip :label="column.label" append-to-body dashed>
              {{ column.label }}
            </b-tooltip>
          </template>
          <template v-slot="props">
            {{ props.row.item_code }}
          </template>
        </b-table-column>
        <b-table-column field="qty" label="Quantity">
          <template v-slot:header="{ column }">
            <b-tooltip :label="column.label" append-to-body dashed>
              {{ column.label }}
            </b-tooltip>
          </template>
          <template v-slot="props">
            {{ props.row.qty }}
          </template>
        </b-table-column>
        <b-table-column field="status" label="Status">
          <template v-slot:header="{ column }">
            <b-tooltip :label="column.label" append-to-body dashed>
              {{ column.label }}
            </b-tooltip>
          </template>
          <template v-slot="props">
            {{ props.row.status }}
          </template>
        </b-table-column>

        <b-table-column field="action" label="Edit">
          <template v-slot="props">
            <b-tooltip label="Edit"
                       position="is-right" target="">
              <b-button outlined style="border: hidden; background-color: #1f1d2b;" @click="editStaff(props.row)">
                <svg class="bi bi-pencil-square" fill="currentColor" height="16" viewBox="0 0 16 16" style="color: #ff7551"
                     width="16" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                  <path
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                    fill-rule="evenodd"/>
                </svg>
              </b-button>
            </b-tooltip>
          </template>
        </b-table-column>

      </b-table>
    </div>

    <create_staff ref="create_staff" @getAllStaff="getAllShippingItems"/>
    <edit_staff ref="edit_staff" @getAllStaff="getAllShippingItems"/>
    <!--    <createNotice ref="create_form"/>-->
    <!--    <editeNotice ref="edit_form"/>-->
  </div>
</template>

<script>
import shippingItemApis from '../../../../apis/modules/admin_pais/shipping_item'
import create_staff from "../../Staff/includes/create_staff";
import edit_staff from "../../Staff/includes/edit_staff";
import ToastMixin from "../../../../mixins/ToastMixin";
import staff_apis from "../../../../apis/modules/admin_pais/staff_apis";

export default {
  name: "all_shipping_items",
  mixins:[ToastMixin],
  components: {
    create_staff,
    edit_staff
  },
  data() {
    return {
      selected_status: undefined,
      fields: [
        {
          field: 'id',
          label: 'ID',
          width: '40',
          numeric: true
        },
        {
          field: 'status',
          label: 'Status',
        },
        {
          field: 'qty',
          label: 'Quantity',
        },
        {
          field: 'address',
          label: 'Address',
        },
        {
          field: 'item_code',
          label: 'Item Code',
        },
      ],
      shipping_items: [],
      is_table_loading: false
    }
  },
  watch: {
    selected_status() {
      this.getAllShippingItems(this.selected_status)
    }
  },
  methods: {
    async getAllShippingItems(status) {
      try {
        this.is_table_loading = true
        let respond = (await shippingItemApis.getAllShippingItems(status)).data.data.ShippingItems
        this.shipping_items = respond.map((e, index) => ({
          id: index + 1,
          _id:e._id,
          status: e.status,
          item_code: e.item,
          qty: e.qty,
        }))
      } catch (e) {

      }
      this.is_table_loading = false
    },

    closeModel() {
      this.getAllShippingItems(this.selected_status)
    },
  },

  async mounted() {
    await this.getAllShippingItems(this.selected_status)
  }
}
</script>

<style scoped>

</style>
