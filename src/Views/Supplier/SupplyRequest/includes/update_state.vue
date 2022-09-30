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
          {{ Request1._id }}
        </header>
        <div class="card-content">
          <template>
            <section>
              <b-row>
                <b-col md="3">

                </b-col>
                  <b-col md="6">
                    <b-field v-if="Request1.status === 'Pending'">
                      <b-select v-model="form.status" :loading="is_selection_loading" expanded
                                placeholder="Select a Status">
                        <option style="color: rgb(180, 180, 180);" value="Pending">Pending</option>
                        <option style="color: rgb(180, 180, 180);" value="Approved">Approved</option>
                        <option style="color: rgb(180, 180, 180);" value="Declined">Declined</option>
                      </b-select>
                    </b-field>
                    <b-field v-else>
                      <b-select v-model="form.status" :loading="is_selection_loading" expanded
                                placeholder="Select a Status" value="disabled" disabled>
                        <option style="color: rgb(180, 180, 180);" value="Pending">Pending</option>
                        <option style="color: rgb(180, 180, 180);" value="Approved">Approved</option>
                        <option style="color: rgb(180, 180, 180);" value="Declined">Declined</option>
                      </b-select>
                    </b-field>
                  </b-col>
                <b-col md="3">

                </b-col>
                <b-col class="mt-5" md="6">
                  <span style="font-size: 17px;">Request ID :</span><span style="color:rgb(180, 180, 180)"> {{ Request1._id }} </span>
                </b-col>
                <b-col class="mt-5" md="6">
                  <span style="font-size: 17px;">Supplier ID :</span> <span style="color:rgb(180, 180, 180)"> {{ Request1.supplier_id }} </span>
                </b-col>
                <b-col md="6">
                  <span style="font-size: 17px;">Status :</span> <span style="color:rgb(180, 180, 180)"> {{ Request1.status }} </span>
                </b-col>
                <b-col md="6">
                  <span style="font-size: 17px;">Updated At :</span> <span style="color:rgb(180, 180, 180)"> {{ Request1.updated_at.substring(0, 10) }} </span>
                </b-col>
                <b-col md="6">
                  <span style="font-size: 17px;">Recived Date :</span> <span style="color:rgb(180, 180, 180)"> {{ Request1.created_at.substring(0, 10) }} </span>
                </b-col>
                <b-col md="6">
                  <span style="font-size: 17px;">Due Date :</span> <span style="color:rgb(180, 180, 180)"> {{ Request1.due_date.substring(0, 10), }} </span>
                </b-col>
                <b-col class="mt-5" md="12">
                  <span style="font-size: 17px;">Request Details :</span>
                  <br/><br/>
                  <span style="color:rgb(180, 180, 180)"> {{ Request1.request }} </span>
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
import SupplierApis from '../../../../apis/modules/supplier_apis/supplier_apis';
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
      Request1: [],
      form: {
        request: '',
        due_date: '',
        created_at: '',
        updated_at: '',
        status: '',
        supplier_id: '',
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
      this.getRequestData()
    },

    async getRequestData() {
      try {
        this.Request1 = (await SupplierApis.getRequest(this.form._id)).data.data.Request1
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
         let respond = await SupplierApis.updateRequest(this.form._id, payload)
            this.is_selection_loading = false
            // this.$emit('updateState')
           this.success('Status Updated')
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
