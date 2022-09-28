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
<!--                <b-col md="3">-->

<!--                </b-col>-->
                <!--                <b-col md="6">-->
                <!--                  <h3>Status : {{currentState}}</h3>-->

                <!--                </b-col>-->
<!--                <b-col md="3">-->

<!--                </b-col>-->
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
                  <b-button class="ml-5" style="float: right" type="is-secondary" @click="generatePDF">Generate PDF
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
import shipping_itemApis from "../../../../apis/modules/admin_pais/shipping_item";
import {ValidationObserver, ValidationProvider} from 'vee-validate'
import ToastMixin from "../../../../mixins/ToastMixin";
import jspdf from 'jspdf'
import jsPDF from "jspdf";
export default {
  name: 'pdf',
  components: {
    ValidationObserver, ValidationProvider
  },
  mixins: [ToastMixin],
  data() {
    return {
      currentState: '',
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
        _id: ''
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



    generatePDF() {
      let pdfName = `shipped-item-${this.Item.item_code}`
      var doc = new jsPDF();
      doc.text(`Item Name : ${this.Item.name}`, 60, 10).setFontSize(12);
      doc.text(`Item Code : ${this.Item.item_code}`, 10, 20).setFontSize(12);
      // doc.text(`Printing Date : ${new Date()}`, 90, 20).setFontSize(8);
      doc.text(`Item Brand : ${this.Item.brand}`, 10, 25).setFontSize(12);
      doc.text(`Supplier ID : ${this.Item.supplier_id}`, 10, 30).setFontSize(12);
      doc.text(`Price : ${this.Item.price}`, 10, 35).setFontSize(12);
      doc.text(`Item Quantity : ${this.Item.qty}`, 10, 40).setFontSize(12);
      // doc.text(`Description : ${this.Item.description}`, 10, 45).setFontSize(12);
      // doc.text(`Item Code : ${this.Item.item_code}`, 10, 10);
      // doc.text(`Item Quantity : ${this.Item.qty}`, 10, 10);
      doc.save(pdfName + '.pdf');
    },
    closeModal() {
      this.$parent.closeModel()
      this.form = {}
      this.is_create_staff_modal_active = !this.is_create_staff_modal_active
    }
  }
}
</script>
