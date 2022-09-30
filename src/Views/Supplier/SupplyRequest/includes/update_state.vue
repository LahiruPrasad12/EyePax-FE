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
                  <b-button class="ml-5" style="float: right" type="is-secondary" @click="generatePDF">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-pdf-fill" viewBox="0 0 16 16">
                      <path d="M5.523 12.424c.14-.082.293-.162.459-.238a7.878 7.878 0 0 1-.45.606c-.28.337-.498.516-.635.572a.266.266 0 0 1-.035.012.282.282 0 0 1-.026-.044c-.056-.11-.054-.216.04-.36.106-.165.319-.354.647-.548zm2.455-1.647c-.119.025-.237.05-.356.078a21.148 21.148 0 0 0 .5-1.05 12.045 12.045 0 0 0 .51.858c-.217.032-.436.07-.654.114zm2.525.939a3.881 3.881 0 0 1-.435-.41c.228.005.434.022.612.054.317.057.466.147.518.209a.095.095 0 0 1 .026.064.436.436 0 0 1-.06.2.307.307 0 0 1-.094.124.107.107 0 0 1-.069.015c-.09-.003-.258-.066-.498-.256zM8.278 6.97c-.04.244-.108.524-.2.829a4.86 4.86 0 0 1-.089-.346c-.076-.353-.087-.63-.046-.822.038-.177.11-.248.196-.283a.517.517 0 0 1 .145-.04c.013.03.028.092.032.198.005.122-.007.277-.038.465z"/>
                      <path fill-rule="evenodd" d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm5.5 1.5v2a1 1 0 0 0 1 1h2l-3-3zM4.165 13.668c.09.18.23.343.438.419.207.075.412.04.58-.03.318-.13.635-.436.926-.786.333-.401.683-.927 1.021-1.51a11.651 11.651 0 0 1 1.997-.406c.3.383.61.713.91.95.28.22.603.403.934.417a.856.856 0 0 0 .51-.138c.155-.101.27-.247.354-.416.09-.181.145-.37.138-.563a.844.844 0 0 0-.2-.518c-.226-.27-.596-.4-.96-.465a5.76 5.76 0 0 0-1.335-.05 10.954 10.954 0 0 1-.98-1.686c.25-.66.437-1.284.52-1.794.036-.218.055-.426.048-.614a1.238 1.238 0 0 0-.127-.538.7.7 0 0 0-.477-.365c-.202-.043-.41 0-.601.077-.377.15-.576.47-.651.823-.073.34-.04.736.046 1.136.088.406.238.848.43 1.295a19.697 19.697 0 0 1-1.062 2.227 7.662 7.662 0 0 0-1.482.645c-.37.22-.699.48-.897.787-.21.326-.275.714-.08 1.103z"/>
                    </svg> Generate PDF
                  </b-button>
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
import jsPDF from "jspdf";

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

    generatePDF() {
      let pdfName = `Supply Requests-${this.Request1._id}`
      var doc = new jsPDF();
      doc.text(`Request ID : ${this.Request1._id}`, 60, 10).setFontSize(12);
      doc.text(`Supplier ID : ${this.Request1.supplier_id}`, 10, 20).setFontSize(12);
      doc.text(`Status : ${this.Request1.status}`, 10, 25).setFontSize(12);
      doc.text(`Update At : ${this.Request1.updated_at}`, 10, 30).setFontSize(12);
      doc.text(`Recived Date : ${this.Request1.created_at}`, 10, 35).setFontSize(12);
      doc.text(`Due Date : ${this.Request1.due_date}`, 10, 40).setFontSize(12);
      doc.text(`Request Details : ${this.Request1.request}`, 10, 45).setFontSize(12);
      doc.save(pdfName + '.pdf');
    },

    async updateState(data){
      try{
        if(this.currentState !== data){
          let payload = {
            status: data
          }
         let respond = await SupplierApis.updateRequest(this.form._id, payload)
            this.is_selection_loading = false
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
