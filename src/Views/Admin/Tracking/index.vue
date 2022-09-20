<template>
  <div>
    <div class="main-container" style="width: 1000px;">
      <div class="anim" style="--delay:0.2s;">
        <h1 style="text-align:center; font-size: 30px; color: white; margin-top: 2%; font-weight: 600;">Tracking
          Items</h1>
        <br/><br/>
      </div>
      <div class="anim" style="--delay:0.2s;">
        <header class="card-header" style="background-color: rgba(21, 20, 26, 0.63); border-radius: 20px">
          <div class="card-header-title">
            <div class="card-header-title">
              <div style="font-size: 25px; color: white;">Items</div>
              <div class="search-bar">
                <input placeholder="Search Items" style="margin-left:25%;" type="text">
              </div>
              <b-select v-model="selected_role" placeholder="Select a Role" style="margin-left: 20%;">
                <option style="color: rgb(180, 180, 180);" value="">Select role</option>
                <option style="color: rgb(180, 180, 180);" value="admin">Admin</option>
                <option style="color: rgb(180, 180, 180);" value="staff">Staff</option>
                <option style="color: rgb(180, 180, 180);" value="supplier">Supplier</option>
                <option style="color: rgb(180, 180, 180);" value="stock-manager">Stock Manager</option>
              </b-select>
            </div>
          </div>

        </header>
      </div>
      <br/>

      <All_Items ref="all_items"/>

      <div class="ft anim" style="--delay:0.3s; margin-top: 5%;">
        <p style="text-align:center">
          © 2022. EyePax Technologies. All Rights Reserved.
        </p>
      </div>

    </div>

  </div>
</template>

<script>
import All_Items from "./includes/all_shipping_items";

export default {
  name: "index",
  components: {All_Items},
  data() {
    return {
      selected_role: ''
    }
  },
  watch: {
    selected_role() {
      this.filterUser(this.selected_role)
    }
  },
  methods: {
    createStaff() {
      this.$refs.all_items.$refs.create_staff.openModal()
    },

    filterUser(role) {
      this.$refs.all_items.getAllStaff(role)
    }
  }
}
</script>

<style scoped>
#btn {
  float: right;
}

</style>
