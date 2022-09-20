<template>
  <div>
    <div class="main-container" style="width: 1000px;">
      <div class="anim" style="--delay:0.2s;">
      <h1 style="text-align:center; font-size: 30px; color: white; margin-top: 2%; font-weight: 600;">User Management</h1>
      <br/><br/>
      </div>
      <div class="anim" style="--delay:0.2s;">
      <header class="card-header" style="background-color: rgba(21, 20, 26, 0.63); border-radius: 20px">
        <div class="card-header-title">
          <div class="card-header-title">
             <div style="font-size: 25px; color: white;">Users</div>
            <div class="search-bar">
              <input type="text" placeholder="Search Users" style="margin-left:15%;">
            </div>
            <b-select v-model="selected_role" placeholder="Select a Role" style="margin-left: 5%;">
              <option value="" style="color: rgb(180, 180, 180);">Select role</option>
              <option value="admin" style="color: rgb(180, 180, 180);">Admin</option>
              <option value="staff" style="color: rgb(180, 180, 180);">Staff</option>
              <option value="supplier" style="color: rgb(180, 180, 180);">Supplier</option>
              <option value="stock-manager" style="color: rgb(180, 180, 180);">Stock Manager</option>
            </b-select>
            </div>

          <div class="float-end">
          <b-button  type="is-success" @click="createStaff">Create User</b-button>
        </div>
        </div>

      </header>
      </div>
      <br/>
      <b-tabs type="is-boxed">
        <b-tab-item label="Pictures">
          <AllStaff ref="all_staff"/>
        </b-tab-item>
        <b-tab-item label="Music">
<!--          <AllStaff ref="all_staff"/>-->
        </b-tab-item>
      </b-tabs>
<!--      <AllStaff ref="all_staff"/>-->

      <div class="ft anim" style="--delay:0.3s; margin-top: 5%;">
          <p style="text-align:center">
            © 2022. EyePax Technologies. All Rights Reserved.
          </p>
      </div>

    </div>

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
