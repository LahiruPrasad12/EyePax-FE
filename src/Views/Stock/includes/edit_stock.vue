<template>
  <section>
    <b-modal
      v-model="is_update_stock_modal_active"
      :destroy-on-hide="false"
      aria-label="Example Modal"
      aria-modal
      aria-role="dialog"
      close-button-aria-label="Close"
      has-modal-card
      trap-focus>
      <div class="card">
        <header class="card-header" style="font-weight:700; font-size: 20px; color: white;">
          Update &nbsp;{{form.item_code}}'s' &nbsp;Details
        </header>
        <div class="card-content">
          <template>
            <section>
              <validation-observer ref="updateStockValidation">
                <b-row>
                  <b-col md="6">
                    <validation-provider
                      #default="{ errors }"
                      name="qty"
                      rules="required"
                    >
                      <b-field :message="errors[0]"
                               :type="errors[0]?'is-danger':'is-success'"
                               label="Qty">
                        <b-input v-model="form.available_stock"
                                 maxlength="50" min="0" placeholder="e.g. 12" type="number">
                        </b-input>
                      </b-field>
                    </validation-provider>
                  </b-col>
                  <b-col class="mt-5" md="12">
                    <b-button :disabled="is_btn_loading" :loading="is_btn_loading" class="ml-5" style="float: right"
                              type="is-info" @click="updateStock">Update
                    </b-button>
                    <b-button class="ml-5" style="float: right" type="is-secondary" @click="closeModal">Cancel
                    </b-button>
                  </b-col>
                </b-row>
              </validation-observer>
            </section>
          </template>
        </div>
      </div>
    </b-modal>
  </section>
</template>

<script>
import SupplierApis from '../../../apis/modules/supplier_apis/supplier_apis';
import StockApis from '../../../apis/modules/stock_apis/stock_apis';
import ToastMixin from "../../../mixins/ToastMixin";
import {ValidationObserver, ValidationProvider} from 'vee-validate'

export default {
  components: {
    ValidationObserver, ValidationProvider
  },
  mixins: [ToastMixin],
  data() {
    return {
      selected: new Date(),
      showWeekNumber: false,
      locale: undefined,
      is_update_stock_modal_active: false,
      is_btn_loading: false,
      form: {
        _id:'',
        available_stock: '',
        last_update: new Date()
      }
    }
  },

  methods: {
    openModal(data) {
      this.form = data
      this.is_update_stock_modal_active = !this.is_update_stock_modal_active
    },

    async updateStock() {
      try {
        this.is_btn_loading = true
        this.form.last_update = new Date()
        if (await this.$refs.updateStockValidation.validate()) {
          await StockApis.updateStock(this.form._id,this.form)
          this.success('Item Update Successfully')
          this.closeModal()
        }
      } catch (e) {
        this.danger('Item Updated Failed!')
      }
      this.is_btn_loading = false
    },

    closeModal() {
      this.$parent.closeModel()
      this.form = {}
      this.is_update_stock_modal_active = !this.is_update_stock_modal_active
    }
  }
}
</script>
