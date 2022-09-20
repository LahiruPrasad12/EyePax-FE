<template>

  <div>
    <div class="anim" style="--delay:0.2s;">
      <b-table
        ref="staffTable"
        :data="staff"
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
        <b-table-column field="account_type" label="Role">
          <template v-slot:header="{ column }">
            <b-tooltip :label="column.label" append-to-body dashed>
              {{ column.label }}
            </b-tooltip>
          </template>
          <template v-slot="props">
            {{ props.row.account_type }}
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

        <b-table-column field="account_type" label="Change Role">
          <template v-slot:header="{ column }">
            <b-tooltip :label="column.label" append-to-body dashed target="">
              {{ column.label }}
            </b-tooltip>
          </template>
          <template v-slot="props">
            <b-tooltip label="Update Role"
                       position="is-right" target="">
              <b-button outlined style="border: hidden; background-color: #1f1d2b;" @click="updateRole(props.row)">
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

    <edit_role ref="edit_role"/>

  </div>
</template>

<script>
import staffApis from '../../../../apis/modules/admin_pais/staff_apis'
import ToastMixin from "../../../../mixins/ToastMixin";
import staff_apis from "../../../../apis/modules/admin_pais/staff_apis";
import edit_role from "./edit_role";

export default {
  name: "update_staff_role",
  components:{edit_role},
  mixins:[ToastMixin],

  data() {
    return {
      form:{
        account_type:''
      },
      is_selection_loading : false,
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
          field: 'Role',
          label: 'account_type',
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
          field: 'account_type',
          label: 'Role',
        },

      ],
      staff: [],
      is_table_loading: false
    }
  },
  watch: {
    'form.account_type'() {
      this.updateRole(this.form.account_type)
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
          DOB: e.DOB.substring(0, 10),
          mobile: e.mobile,
          account_type: e.account_type,
          gender: e.gender,
          is_email_verified: e.is_email_verified,
          is_phone_verified: e.is_phone_verified
        }))
      } catch (e) {

      }
      console.log(this.staff)
      this.is_table_loading = false
    },
    async updateRole(data){
      console.log(data)
      this.$refs.edit_role.openModal(data)

    },
    closeModel() {
      this.getAllStaff(this.selected_role)
    },
  },

  async mounted() {
    await this.getAllStaff(this.selected_role)
  }
}
</script>

<style scoped>

</style>
