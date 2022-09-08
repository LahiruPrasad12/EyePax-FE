<template>
  <section>
    <b-modal v-model="is_create_stock_modal_active" :destroy-on-hide="false" aria-label="Example Modal" aria-modal
      aria-role="dialog" close-button-aria-label="Close" has-modal-card trap-focus>
      <div class="card">
        <header class="card-header" style="font-weight:700; font-size: 20px; color: white;">
          Add New Stock
        </header>
        <div class="card-content">
          <template>
            <section style="color: white;">
              <validation-observer ref="createItemValidation">
                <b-row>
                  <b-col md="6">
                    <validation-provider #default="{ errors }" name="qty" rules="required">
                      <b-field :message="errors[0]" :type="errors[0] ? 'is-danger' : 'is-success'" label="Item*">
                        <v-select :options="item" v-model="form.item_code" style="color: rgb(180, 180, 180);"
                          placeholder="Select an Item">
                        </v-select>
                      </b-field>
                    </validation-provider>
                  </b-col>
                  <b-col md="6">
                    <validation-provider #default="{ errors }" name="name" rules="required">
                      <b-field :message="errors[0]" :type="errors[0]?'is-danger':'is-success'" label="*Quantity">
                        <b-input v-model="form.available_stock" maxlength="50" min="0" placeholder="e.g. 12"
                          type="number">
                        </b-input>
                      </b-field>
                    </validation-provider>
                  </b-col>
                  <b-col class="mt-5" md="12">
                    <b-button :disabled="is_btn_loading" :loading="is_btn_loading" class="ml-5" style="float: right"
                      type="is-info" @click="createStock">Add</b-button>
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
import { ValidationObserver, ValidationProvider } from 'vee-validate'

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
      is_create_stock_modal_active: false,
      is_btn_loading: false,
      item: [],
      form: {
        item_code: '',
        available_stock: '',
      }
    }
  },

  methods: {
    openModal() {
      this.is_create_stock_modal_active = !this.is_create_stock_modal_active
    },
    async getAllItems() {
      try {
        this.is_table_loading = true
        let respond = (await SupplierApis.getAll()).data.data.items
        this.item = respond.map((e, index) => ({
          value: e._id,
          label: e.name,
        }))
      } catch (e) {

      }
      this.is_table_loading = false
    },

    async createStock() {
      try {
        this.is_btn_loading = true
        if (await this.$refs.createItemValidation.validate()) {
          console.log(this.form)
          let payload = {
            item_code: this.form.item_code.value,
            available_stock: this.form.available_stock
          }
          await StockApis.createStock(payload)
          this.success('Stock Added Successfully')
          this.closeModal()
        }
      } catch (e) {
        this.danger('This Stock is Already Exists')
      }
      this.is_btn_loading = false
    },

    closeModal() {
      this.$parent.closeModel()
      this.form = {}
      this.is_create_stock_modal_active = !this.is_create_stock_modal_active
    }
  },
  async mounted() {
    await this.getAllItems()
  }
}
</script>
