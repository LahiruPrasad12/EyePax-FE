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
            {{ props.row.id }}
          </template>
        </b-table-column>
        <b-table-column field="full_name" label="Full Name">
          <template v-slot:header="{ column }">
            <b-tooltip :label="column.label" append-to-body dashed>
              {{ column.label }}
            </b-tooltip>
          </template>
          <template v-slot="props">
            {{ props.row.first_name }} {{ props.row.last_name }}
          </template>
        </b-table-column>
        <b-table-column field="email" label="Email">
          <template v-slot:header="{ column }">
            <b-tooltip :label="column.label" append-to-body dashed>
              {{ column.label }}
            </b-tooltip>
          </template>
          <template v-slot="props">
            {{ props.row.email }}
          </template>
        </b-table-column>
        <b-table-column field="DOB" label="DOB">
          <template v-slot:header="{ column }">
            <b-tooltip :label="column.label" append-to-body dashed>
              {{ column.label }}
            </b-tooltip>
          </template>
          <template v-slot="props">
            {{ props.row.DOB }}
          </template>
        </b-table-column>
        <b-table-column field="mobile" label="Mobile">
          <template v-slot:header="{ column }">
            <b-tooltip :label="column.label" append-to-body dashed>
              {{ column.label }}
            </b-tooltip>
          </template>
          <template v-slot="props">
            {{ props.row.mobile }}
          </template>
        </b-table-column>
  
        <b-table-column field="action" label="Edit">
          <template v-slot="props">
            <b-tooltip label="Edit"
                       position="is-right" target="">
              <b-button outlined style="border: hidden" @click="editStaff(props.row)">
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
      <create_staff ref="create_staff" @getAllStaff="getAllStaff"/>
      <edit_staff ref="edit_staff" @getAllStaff="getAllStaff"/>
      <!--    <createNotice ref="create_form"/>-->
      <!--    <editeNotice ref="edit_form"/>-->
    </div>
  </template>
  
  <script>
  import staffApis from '../../../../apis/modules/admin_pais/staff_apis'
  import ToastMixin from "../../../../mixins/ToastMixin";
  import staff_apis from "../../../../apis/modules/admin_pais/staff_apis";
  
  export default {
    name: "index",
    mixins:[ToastMixin],
    components: {
      create_staff,
      edit_staff
    },
    data() {
      return {
        selected_role: undefined,
        fields: [
          {
            field: 'id',
            label: 'ID',
            width: '40',
            numeric: true
          },
          {
            field: 'full_name',
            label: 'Full Name',
          },
          {
            field: 'email',
            label: 'Email',
          },
          {
            field: 'DOB',
            label: 'Date OF Birth',
          },
          {
            field: 'mobile',
            label: 'Mobile',
          },
          {
            field: 'role',
            label: 'Role',
          },
        ],
        staff: [],
        is_table_loading: false
      }
    },
    watch: {
      selected_role() {
        this.getAllStaff(this.selected_role)
      }
    },
    methods: {
      async getAllStaff(selected_role) {
        try {
          this.is_table_loading = true
          let respond = (await staffApis.getAllStaff(selected_role)).data.data.users
          this.staff = respond.map((e, index) => ({
            id: index + 1,
            _id:e._id,
            first_name: e.first_name,
            last_name: e.last_name,
            email: e.email,
            DOB: new Date(e.DOB),
            mobile: e.mobile,
            account_type: e.account_type,
            gender: e.gender,
            is_email_verified: e.is_email_verified,
            is_phone_verified: e.is_phone_verified
          }))
        } catch (e) {
  
        }
        this.is_table_loading = false
      },
  
      closeModel() {
        this.getAllStaff(this.selected_role)
      },
  
      editStaff(data) {
        try {
          this.$refs.edit_staff.openModal(data)
        } catch (e) {
  
        }
      },
  
      confirmCustomDelete(data) {
        this.$buefy.dialog.confirm({
          title: 'Deleting account',
          message: 'Are you sure you want to <b>delete</b> your account? This action cannot be undone.',
          confirmText: 'Delete Account',
          type: 'is-danger',
          hasIcon: true,
          onConfirm: () => this.deleteStaff(data)
        })
      },
     async deleteStaff(data) {
          try{
  
            await staff_apis.deleteStaff(data._id)
            this.success('Staff Update Successfully')
            await this.getAllStaff(this.selected_role)
          }catch (e) {
            this.$buefy.toast.open(e.message)
          }
      }
    },
  
    async mounted() {
      await this.getAllStaff(this.selected_role)
    }
  }
  </script>
  
  <style scoped>
  
  </style>
  