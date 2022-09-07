<template>
    <div>
        <div class="main-container" style="width: 1000px;">
            <h1 style="text-align:center; font-size: 30px; color: white; margin-top: 2%; font-weight: 600;">Order
                Management</h1>
            <br /><br />
            <header class="card-header" style="background-color: rgba(21, 20, 26, 0.63); border-radius: 20px">
                <div class="card-header-title">
                    <div class="card-header-title">
                        <div style="font-size: 25px; color: white;"> Orders</div>
                        <div class="search-bar">
                            <input type="text" placeholder="Search Items" style="margin-left:15%;">
                        </div>
                    </div>
                    <div class="float-end">
                        <b-button type="is-success" @click="createOrder">Add Order</b-button>
                        <b-button type="is-info">Generate Report</b-button>
                    </div>
                </div>
            </header>
            <br />
            <AllOrders ref="all_orders" />
        </div>
    </div>
</template>
  
<script>
import AllOrders from "../Customer/includes/AllOrders";

export default {
    name: "index",
    components: { AllOrders },
    data() {
        return {
        }
    },

    methods: {
        createOrder() {
            this.$refs.all_orders.$refs.create_order.openModal()
        },
    }
}
</script>
  
<style scoped>

</style>