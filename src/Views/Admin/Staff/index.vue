<template>
<div class="container is-max-desktop">
  <div style="margin-left: 86%; margin-bottom: 10px">
      <b-button type="is-success">Create Staff</b-button>
  </div>
  <AllStaff/>
</div>
</template>

<script>
import AllStaff from "./includes/AllStaff";
export default {
  name: "index",
  components: {AllStaff},
  methods:{
    addStaff(){
      alert('ok')
    }
  }
}
</script>

<style scoped>
#btn{
  float: right;
}

</style>
