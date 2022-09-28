<template>
  <section>
    <b-modal
      v-model="is_create_staff_modal_active"
      :destroy-on-hide="false"
      aria-label="Example Modal"
      aria-modal
      aria-role="dialog"
      close-button-aria-label="Close"
      has-modal-card
      trap-focus>
      <b-loading v-model="isLoading" :is-full-page="isFullPage"/>
      <div class="card">
        <header class="card-header" style="font-weight:700; font-size: 20px; color: white;">
          {{ Item.name }}
        </header>
        <div class="card-content">
          <template>
            <section>
              <b-row>
                <b-col md="3">

                </b-col>
                <b-col md="6">
                  <b-field>
                    <b-select v-model="form.status" :loading="is_selection_loading" expanded
                              placeholder="Select a character">
                      <option style="color: rgb(180, 180, 180);" value="draft">Draft</option>
                      <option style="color: rgb(180, 180, 180);" value="pending">Pending</option>
                      <option style="color: rgb(180, 180, 180);" value="shipped">Shipped</option>
                      <option style="color: rgb(180, 180, 180);" value="decline">Declined</option>
                    </b-select>
                  </b-field>
                </b-col>
                <b-col md="3">

                </b-col>
                <b-col class="mt-5" md="6">
                  Item Name : {{ Item.name }}
                </b-col>
                <b-col class="mt-5" md="6">
                  Item Code : {{ Item.item_code }}
                </b-col>
                <b-col md="6">
                  Brand : {{ Item.brand }}
                </b-col>
                <b-col md="6">
                  Supplier Id : {{ Item.supplier_id }}
                </b-col>
                <b-col md="6">
                  Price : {{ Item.price }}
                </b-col>
                <b-col md="6">
                  Quantity : {{ Item.qty }}
                </b-col>
                <b-col class="mt-5" md="12">
                  {{ Item.description }}
                </b-col>
                <b-col md="4">

                </b-col>
                <b-col class="mt-5" md="12">
                  <b-button class="ml-5" style="float: right" type="is-secondary" @click="closeModal">Close
                  </b-button>
                </b-col>

              </b-row>
            </section>
          </template>
        </div>
      </div>
    </b-modal>
  </section>
</template>

<script>
import shipping_itemApis from "../../../../apis/modules/admin_pais/shipping_item";
import {ValidationObserver, ValidationProvider} from 'vee-validate'
import ToastMixin from "../../../../mixins/ToastMixin";

export default {
  name: 'update_state',
  components: {
    ValidationObserver, ValidationProvider
  },
  mixins: [ToastMixin],
  data() {
    return {
      currentState : '',
      is_selection_loading: false,
      isLoading: true,
      isFullPage: false,
      selected: new Date(),
      showWeekNumber: false,
      locale: undefined,
      is_create_staff_modal_active: false,
      is_btn_loading: false,
      Item: [],
      form: {
        qty: '',
        status: '',
        address: '',
        item_code: '',
        _id:''
      }
    }
  },
  watch:{
  'form.status'(val){
    if(val){
      this.is_selection_loading = true
      this.updateState(val)
    }
  }
  },

  methods: {
    openModal(data) {
      this.is_create_staff_modal_active = !this.is_create_staff_modal_active
      this.form = data
      this.currentState = data.status
      this.getItemData()
    },

    async getItemData() {
      try {
        this.Item = (await shipping_itemApis.getItem(this.form.item_code)).data.data.Item
      } catch (e) {

      }
      this.isLoading = false
    },

    async updateState(data){
      try{
        if(this.currentState !== data){
          let payload = {
            status: data
          }
         let respond = await shipping_itemApis.UpdateShippingItems(this.form._id, payload)
            this.is_selection_loading = false
            // this.$emit('updateState')
           this.success('State Updated')
        }
      }catch (e) {

      }
      this.is_selection_loading = false
    },

    closeModal() {
      this.$parent.closeModel()
      this.form = {}
      this.is_create_staff_modal_active = !this.is_create_staff_modal_active
    }
  }
}
</script>
