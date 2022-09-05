<template>
    <div class="container is-max-desktop">
      <div style="font-size: 30px; text-align: center; font-weight: 700;"> Supplier Management</div>
    <br>
      <header class="card-header">
        <div class="card-header-title">
            <div class="card-header-title">
             <div style="font-size: 20px;"> Items</div>
            </div>
          <div class="float-end">
            <b-button  type="is-success" @click="createItem">Add Item</b-button>
            <b-button  type="is-info" >Generate Report</b-button>
          </div>
        </div>
      </header>
  
      <div style="margin-left: 86%">
  
      </div>
      <section>
        <div class="card mt-5">
          <div class="card-content">
            <div class="content">
              <AllItems ref="all_items"/>
            </div>
          </div>
        </div>
  
  
      </section>
    </div>
  </template>
  
  <script>
    import AllItems from "../Supplier/includes/Allitems";
    
    export default {
      name: "index",
      components: {AllItems},
      data(){
        return{
        }
      },

      methods: {
      createItem() {
      this.$refs.all_items.$refs.create_item.openModal()
      },
     }
    }
    </script>
  
  <style scoped>
  
  </style>
  