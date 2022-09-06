<template>
    <div class="container">
      <b-table
        ref="itemTable"
        :data="item"
        :loading="is_table_loading"
        hover
        responsive
      >
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
        <b-table-column field="name" label="Item Name">
          <template v-slot:header="{ column }">
            <b-tooltip :label="column.label" append-to-body dashed>
              {{ column.label }}
            </b-tooltip>
          </template>
          <template v-slot="props">
            {{ props.row.name }}
          </template>
        </b-table-column>
        <b-table-column field="qty" label="Qty">
          <template v-slot:header="{ column }">
            <b-tooltip :label="column.label" append-to-body dashed>
              {{ column.label }}
            </b-tooltip>
          </template>
          <template v-slot="props">
            {{ props.row.qty }}
          </template>
        </b-table-column>
        <b-table-column field="brand" label="Brand">
          <template v-slot:header="{ column }">
            <b-tooltip :label="column.label" append-to-body dashed>
              {{ column.label }}
            </b-tooltip>
          </template>
          <template v-slot="props">
            {{ props.row.brand }}
          </template>
        </b-table-column>
        <b-table-column field="price" label="Price(LKR)">
          <template v-slot:header="{ column }">
            <b-tooltip :label="column.label" append-to-body dashed>
              {{ column.label }}
            </b-tooltip>
          </template>
          <template v-slot="props">
            {{ props.row.price }}
          </template>
        </b-table-column>
        <b-table-column field="created_at" label="Created At">
          <template v-slot:header="{ column }">
            <b-tooltip :label="column.label" append-to-body dashed>
              {{ column.label }}
            </b-tooltip>
          </template>
          <template v-slot="props">
            {{ props.row.created_at }}
          </template>
        </b-table-column>
        <b-table-column field="enabled" label="Active Status">
          <template v-slot:header="{ column }">
            <b-tooltip :label="column.label" append-to-body dashed>
              {{ column.label }}
            </b-tooltip>
          </template>
          <template v-slot="props">
            {{ props.row.enabled?"Enabled":"Disabled" }}
          </template>
        </b-table-column>

        <b-table-column field="action" label="Edit">
          <template v-slot="props">
            <b-tooltip label="Edit"
                       position="is-right" target="">
              <b-button outlined style="border: hidden" @click="editItem(props.row)">
                <svg class="bi bi-pencil-square" fill="currentColor" height="16" viewBox="0 0 16 16"
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
  
        <b-table-column field="action" label="Delete">
          <template v-slot="props">
            <b-tooltip label="Delete"
                       position="is-right" target="">
              <b-button outlined style="border: hidden" @click="confirmCustomDelete(props.row)">
                <svg class="bi bi-trash-fill" fill="red" height="16" viewBox="0 0 16 16" width="16"
                     xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                </svg>
              </b-button>
            </b-tooltip>
          </template>
        </b-table-column>
  
      </b-table>
      <create_item ref="create_item" @getAllItems="getAllItems"/>
      <edit_item ref="edit_item" @getAllItems="getAllItems"/>
    </div>
  </template>
  
  <script>
  import SupplierApis from '../../../apis/modules/supplier_apis/supplier_apis';
  import create_item from "./create_item";
  import edit_item from "./edit_item";
  import ToastMixin from "../../../mixins/ToastMixin";
  
  export default {
    name: "index",
    mixins:[ToastMixin],
    components: {
      create_item,
      edit_item
    },
    data() {
      return {
        fields: [
          {
            field: 'item_code',
            label: 'Item Code',
            width: '40'
          },
          {
            field: 'name',
            label: 'Item Name',
          },
          {
            field: 'qty',
            label: 'Qty',
          },
          {
            field: 'brand',
            label: 'Brand',
          },
          {
            field: 'price',
            label: 'Price',
          },
          {
            field: 'enabled',
            label: 'Enabled',
          },
          {
            field: 'created_at',
            label: 'Created At',
          },
        ],
        item: [],
        is_table_loading: false
      }
    },

    methods: {
      async getAllItems() {
        try {
          this.is_table_loading = true
          let respond = (await SupplierApis.getAllItems()).data.data.items
          this.item = respond.map((e, index) => ({
            id: index + 1,
            _id:e._id,
            item_code: e.item_code,
            name: e.name,
            qty: e.qty,
            description: e.description,
            price: e.price,
            brand: e.brand,
            enabled: e.enabled,
            created_at: e.created_at
          }))
        } catch (e) {
  
        }
        this.is_table_loading = false
      },
  
      closeModel() {
        this.getAllItems()
      },
  
      editItem(data) {
        try {
          this.$refs.edit_item.openModal(data)
        } catch (e) {
  
        }
      },
  
      confirmCustomDelete(data) {
        this.$buefy.dialog.confirm({
          title: 'Deleting Item',
          message: 'Are you sure you want to <b>Delete</b> this item? This action cannot be undone.',
          confirmText: 'Delete Item',
          type: 'is-danger',
          hasIcon: true,
          onConfirm: () => this.deleteItem(data)
        })
      },
     async deleteItem(data) {
          try{
  
            await SupplierApis.deleteItem(data._id)
            this.success('Item Deleted Successfully')
            await this.getAllItems()
          }catch (e) {
            this.$buefy.toast.open(e.message)
          }
      }
    },
  
    async mounted() {
      await this.getAllItems()
    }
  }
  </script>
  
  <style scoped>
  
  </style>
  