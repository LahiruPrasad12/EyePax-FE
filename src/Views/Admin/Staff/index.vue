<template>
<div class="container is-max-desktop">
  <div style="margin-left: 86%">
      <b-button type="is-success" @click="createStaff">Create Staff</b-button>
  </div>
  <section>

    <b-tabs v-model="activeTab" type="is-boxed">
      <b-tab-item label="User Management">
        <AllStaff ref="all_staff"/>
      </b-tab-item>

      <b-tab-item label="Role Management">
        <AllStaff/>
      </b-tab-item>
    </b-tabs>
  </section>
</div>
</template>

<script>
import AllStaff from "./includes/AllStaff";
export default {
  name: "index",
  components: {AllStaff},
  methods:{
    createStaff(){
      this.$refs.all_staff.$refs.create_staff.openModal()
    }
  }
}
</script>

<style scoped>
#btn{
  float: right;
}

</style>
