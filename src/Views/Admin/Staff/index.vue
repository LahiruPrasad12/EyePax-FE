<template>
  <div class="container is-max-desktop">

    <header class="card-header">
      <div class="card-header-title">
        <div class="float-start">
          <b-field class="mt-2">
            <b-select v-model="selected_role" placeholder="Select a role">
              <option value="">Select role</option>
              <option value="admin">Admin</option>
              <option value="staff">Staff</option>
              <option value="stock-manager">Stock manager</option>
            </b-select>
          </b-field>
        </div>
        <div style="margin-left: 70%" class="float-end">
          <b-button  type="is-success" @click="createStaff">Create Staff</b-button>
        </div>
      </div>
    </header>

    <div style="margin-left: 86%">

    </div>
    <section>
      <div class="card mt-5">
        <div class="card-content">
          <div class="content">
            <b-tabs v-model="activeTab" type="is-boxed">
              <b-tab-item label="User Management">
                <AllStaff ref="all_staff"/>
              </b-tab-item>

              <b-tab-item label="Role Management">
                
              </b-tab-item>
            </b-tabs>
          </div>
        </div>
      </div>


    </section>
  </div>
</template>

<script>
import AllStaff from "./includes/AllStaff";

export default {
  name: "index",
  components: {AllStaff},
  data(){
    return{
      selected_role:''
    }
  },
  watch:{
    selected_role(){
      this.filterUser(this.selected_role)
    }
  },
  methods: {
    createStaff() {
      this.$refs.all_staff.$refs.create_staff.openModal()
    },

    filterUser(role){
      this.$refs.all_staff.getAllStaff(role)
    }
  }
}
</script>

<style scoped>
#btn {
  float: right;
}

</style>
