<template>

  <div class="container">
    <b-button type="is-primary" @click="openModel">Create Notice</b-button>
    <b-table
      :data="staff"
      ref="staffTable"
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
      <b-table-column field="first_name" label="First Name">
        <template v-slot:header="{ column }">
          <b-tooltip :label="column.label" append-to-body dashed>
            {{ column.label }}
          </b-tooltip>
        </template>
        <template v-slot="props">
          {{ props.row.first_name }}
        </template>
      </b-table-column>
      <b-table-column field="last_name" label="Last Name">
        <template v-slot:header="{ column }">
          <b-tooltip :label="column.label" append-to-body dashed>
            {{ column.label }}
          </b-tooltip>
        </template>
        <template v-slot="props">
          {{ props.row.last_name }}
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

      <b-table-column field="action" label="Action">
        <template v-slot="props">
          <b-button @click="editeColumn(props.row)">Edit</b-button>
        </template>
      </b-table-column>

    </b-table>
<!--    <createNotice ref="create_form"/>-->
<!--    <editeNotice ref="edit_form"/>-->
  </div>
</template>

<script>
import staffApis from '../../../../apis/modules/staff_apis'
// import createNotice from "./modals/create-notice";
// import editeNotice from "./modals/edit-notices";
import {mapGetters} from 'vuex'


export default {
  name: "index",
  components :{
  },
  data(){
    return {
      fields: [
        {
          field: 'id',
          label: 'ID',
          width: '40',
          numeric: true
        },
        {
          field: 'first_name',
          label: 'First Name',
        },
        {
          field: 'last_name',
          label: 'Last Name',
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
      staff : [],
      is_table_loading:false
    }
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  methods:{
    async getAllStaff(){
      try {
        this.is_table_loading = true
        let respond = (await staffApis.getAllStaff()).data.data.users
        this.staff = respond.map((e,index)=>({
          id : index+1,
          first_name : e.first_name,
          last_name : e.last_name,
          email : e.email,
          DOB : e.DOB,
          mobile : e.mobile,
          role : e.role
        }))
      }catch (e) {

      }
      this.is_table_loading = false
    },

    openModel (){
      this.$refs.create_form.openForm()
    },

    closeModel(){
      this.getAllStaff()
    },

    editeColumn(data){
      this.$refs.edit_form.openForm(data)
      console.log(data)
    }
  },

  async mounted() {
    await this.getAllStaff()
  }
}
</script>

<style scoped>

</style>
