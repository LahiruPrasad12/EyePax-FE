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
              <b-select v-model="selected_status" placeholder="Select a Role" style="margin-left: 5%;">
                <option style="color: rgb(180, 180, 180);" value="">Select status</option>
                <option style="color: rgb(180, 180, 180);" value="draft">Draft</option>
                <option style="color: rgb(180, 180, 180);" value="pending">Pending</option>
                <option style="color: rgb(180, 180, 180);" value="shipped">Shipped</option>
                <option style="color: rgb(180, 180, 180);" value="decline">Declined</option>
              </b-select>

            </div>
            <div class="float-end">
              <b-button type="is-success" @click="generate">Generate PDF</b-button>
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
import jspdf from "jspdf";

export default {
  name: "index",
  components: {All_Items},
  data() {
    return {
      selected_status: ''
    }
  },
  watch: {
    selected_status() {
      this.filterUser(this.selected_status)
    }
  },
  methods: {

    filterUser(status) {
      this.$refs.all_items.getAllShippingItems(status)
    },
    generate() {
      this.$refs.all_items.generatePDF()
    }

  }
}
</script>

<style scoped>
#btn {
  float: right;
}

</style>
