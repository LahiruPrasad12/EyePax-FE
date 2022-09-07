<template>
  <section>
    <b-modal
      v-model="is_create_item_modal_active"
      :destroy-on-hide="false"
      aria-label="Example Modal"
      aria-modal
      aria-role="dialog"
      close-button-aria-label="Close"
      has-modal-card
      trap-focus>
      <div class="card">
        <header class="card-header" style="font-weight:700; font-size: 20px; color: white;">
          Add New Item
        </header>
        <div class="card-content">
          <template>
            <section style="color: white;">
              <validation-observer ref="createItemValidation">
                <b-row>
                  <b-col md="6">
                    <validation-provider
                      #default="{ errors }"
                      name="item_code"
                      rules="required"
                    >
                      <b-field :message="errors[0]"
                               :type="errors[0]?'is-danger':'is-success'"
                               label="*Item Code">
                        <b-input v-model="form.item_code"
                                 maxlength="10" placeholder="e.g. EP-XXXX" type="text">
                        </b-input>
                      </b-field>
                    </validation-provider>
                  </b-col>
                  <b-col md="6">
                    <validation-provider
                      #default="{ errors }"
                      name="name"
                      rules="required"
                    >
                      <b-field :message="errors[0]"
                               :type="errors[0]?'is-danger':'is-success'"
                               label="*Item Name">
                        <b-input v-model="form.name"
                                 maxlength="50" placeholder="e.g. Desktop Computer" type="text">
                        </b-input>
                      </b-field>
                    </validation-provider>
                  </b-col>
                  <b-col md="6">
                    <validation-provider
                      #default="{ errors }"
                      name="qty"
                      rules="required"
                    >
                      <b-field :message="errors[0]"
                               :type="errors[0]?'is-danger':'is-success'"
                               label="*Qty">
                        <b-input v-model="form.qty"
                                 maxlength="10" placeholder="e.g. 12" type="number">
                        </b-input>
                      </b-field>
                    </validation-provider>
                  </b-col>
                  <b-col md="6">
                    <validation-provider
                      #default="{ errors }"
                      name="brand"
                      rules="required"
                    >
                      <b-field :message="errors[0]"
                               :type="errors[0]?'is-danger':'is-success'"
                               label="*Brand">
                        <b-input v-model="form.brand"
                                 maxlength="30" placeholder="e.g. MSI/Azus" type="text">
                        </b-input>
                      </b-field>
                    </validation-provider>
                  </b-col>
                  <b-col md="6">
                    <validation-provider
                      #default="{ errors }"
                      name="description"
                    >
                      <b-field
                        :message="errors[0]"
                        :type="errors[0]?'is-danger':'is-success'"
                        label="Description">
                        <b-textarea v-model="form.description"
                                    maxlength="1000" placeholder="e.g. Lorem Ipsum is simply dummy text of the printing and typesetting industry...." type="text" style="height:100px; background-color: #1f1d2b; color: rgb(180, 180, 180); border-color: #424050;">
                        </b-textarea>
                      </b-field>
                    </validation-provider>
                  </b-col>
                  <b-col md="3">
                    <validation-provider
                      #default="{ errors }"
                      name="price"
                      rules="required"
                    >
                      <b-field
                        :message="errors[0]"
                        :type="errors[0]?'is-danger':'is-success'"
                        label="*Price (LKR)">
                        <b-input v-model="form.price"
                                 placeholder="e.g. 10,000LKR" type="number" >
                        </b-input>
                      </b-field>
                    </validation-provider>
                  </b-col>
                  <b-col md="3">
                    <validation-provider
                      #default="{ errors }"
                      name="enabled"
                    >
                      <b-field :message="errors[0]"
                               :type="errors[0]?'is-danger':'is-success'"
                               label="Availabitlity"
                      >
                        <b-checkbox v-model="form.enabled">Enabled</b-checkbox>
                      </b-field>
                    </validation-provider>
                  </b-col>

                  <b-col class="mt-5" md="12">
                    <b-button :disabled="is_btn_loading" :loading="is_btn_loading" class="ml-5" style="float: right" type="is-info" @click="createItem">Add</b-button>
                    <b-button class="ml-5" style="float: right" type="is-secondary" @click="closeModal">Cancel</b-button>
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
      is_create_item_modal_active: false,
      is_btn_loading: false,
      form: {
        item_code: '',
        name: '',
        qty: '',
        price: '',
        brand: '',
        description: '',
        enabled: 'false'
      }
    }
  },

  methods: {
    openModal() {
      this.is_create_item_modal_active = !this.is_create_item_modal_active
    },

    async createItem() {
      try {
        this.is_btn_loading = true
        this.form.price = (this.form.price*1).toFixed(2)
        if (await this.$refs.createItemValidation.validate()) {
          await SupplierApis.createItem(this.form)
          this.success('Item Added Successfully')
          this.closeModal()
        }
      } catch (e) {
        this.danger('This Item is Already Exists')
      }
      this.is_btn_loading=false
    },

    closeModal() {
      this.$parent.closeModel()
      this.form={}
      this.is_create_item_modal_active = !this.is_create_item_modal_active
    }
  }
}
</script>
