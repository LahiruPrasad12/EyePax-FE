<template>
  <div class="container">
    <header>
      Admin Dashboard
    </header>
    <b-row>
      <b-col md="6">
        <div class="card">
          <div class="card-content">
            <div class="content">
              Lorem ipsum leo risus, porta ac consectetur ac, vestibulum at eros. Donec id elit non mi porta gravida at eget metus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras mattis consectetur purus sit amet fermentum.
            </div>
          </div>
        </div>
      </b-col>
      <b-col md="6">
        <div class="card">
          <div class="card-content">
            <div class="content">
              Lorem ipsum leo risus, porta ac consectetur ac, vestibulum at eros. Donec id elit non mi porta gravida at eget metus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras mattis consectetur purus sit amet fermentum.
            </div>
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
export default {
  name: "index",
  methods: {
    ...mapActions(['autoLogin'])
  },

  mounted() {
    console.log('ava');
    console.log(localStorage.getItem('JWT'))
  }
}
</script>

<style scoped>

</style>
