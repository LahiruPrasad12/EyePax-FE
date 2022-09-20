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
      <b-loading :is-full-page="isFullPage" v-model="isLoading" />
      <div class="card">
        <header class="card-header" style="font-weight:700; font-size: 20px; color: white;">
          Add New User
        </header>
        <div class="card-content">
          <template>
            <section>
              <validation-observer ref="createStaffValidation">
                <b-row>
                  <b-col md="6">
                    <validation-provider
                      #default="{ errors }"
                      name="First Name"
                      rules="required"
                    >
                      <b-field :message="errors[0]"
                               :type="errors[0]?'is-danger':'is-success'"
                               label="First Name">
                        <b-input v-model="form.first_name"
                                 maxlength="30" placeholder="e.g. lahiru" type="text">
                        </b-input>
                      </b-field>
                    </validation-provider>
                  </b-col>
                  <b-col md="6">
                    <validation-provider
                      #default="{ errors }"
                      name="Last Name"
                      rules="required"
                    >
                      <b-field :message="errors[0]"
                               :type="errors[0]?'is-danger':'is-success'"
                               label="Last Name">
                        <b-input v-model="form.last_name"
                                 maxlength="30" placeholder="e.g. middle" type="text">
                        </b-input>
                      </b-field>
                    </validation-provider>
                  </b-col>
                  <b-col md="6">
                    <validation-provider
                      #default="{ errors }"
                      name="Email"
                      rules="required|emailTest"
                    >
                      <b-field :message="errors[0]"
                               :type="errors[0]?'is-danger':'is-success'"
                               label="Email">
                        <b-input v-model="form.email"
                                 maxlength="30" placeholder="e.g. example@gmail.com" type="email">
                        </b-input>
                      </b-field>
                    </validation-provider>
                  </b-col>
                  <b-col md="6">
                    <validation-provider
                      #default="{ errors }"
                      name="Mobile"
                      rules="required"
                    >
                      <b-field :message="errors[0]"
                               :type="errors[0]?'is-danger':'is-success'"
                               label="Mobile">
                        <b-input v-model="form.mobile"
                                 maxlength="30" placeholder="e.g. 764858569" type="number">
                        </b-input>
                      </b-field>
                    </validation-provider>
                  </b-col>
                  <b-col md="3">
                    <validation-provider
                      #default="{ errors }"
                      name="Role"
                      rules="required"
                    >
                      <b-field
                        :message="errors[0]"
                        :type="errors[0]?'is-danger':''"
                        label="Role">
                        <b-select v-model="form.role" placeholder="Select a role">
                          <option style="color: rgb(180, 180, 180);" value="">Select a role</option>
                          <option style="color: rgb(180, 180, 180);" value="staff">Staff</option>
                          <option style="color: rgb(180, 180, 180);" value="admin">Admin</option>
                          <option style="color: rgb(180, 180, 180);" value="supplier">Supplier</option>
                          <option style="color: rgb(180, 180, 180);" value="stock-manager">Stock Manager</option>
                        </b-select>
                      </b-field>
                    </validation-provider>
                  </b-col>
                  <b-col md="3">
                    <validation-provider
                      #default="{ errors }"
                      name="DOB"
                      rules="required"
                    >
                      <b-field
                        :message="errors[0]"
                        :type="errors[0]?'is-danger':''"
                        label="DOB">
                        <b-input v-model="form.DOB"
                                 type="date">
                        </b-input>
                      </b-field>
                    </validation-provider>
                  </b-col>
                  <b-col md="2">
                    <validation-provider
                      #default="{ errors }"
                      name="Gender"
                      rules="required"
                    >
                      <b-field label="Gender">
                        <b-radio v-model="form.gender"
                                 native-value="male">
                          Male
                        </b-radio>
                      </b-field>
                      <b-field>
                        <b-radio v-model="form.gender"
                                 native-value="female"
                                 type="is-info">
                          Female
                        </b-radio>
                      </b-field>
                    </validation-provider>
                  </b-col>
                  <b-col md="4">
                    <validation-provider
                      #default="{ errors }"
                      name="Conditions"
                      rules="required"
                    >
                      <b-field :message="errors[0]"
                               :type="errors[0]?'is-danger':''"
                               label="Conditions"
                      >
                        <b-checkbox v-model="form.is_email_verified">Need Email Verification?</b-checkbox>
                        <b-checkbox v-model="form.is_phone_verified">Need Phone Verification?</b-checkbox>
                      </b-field>

                    </validation-provider>
                  </b-col>
                  <b-col class="mt-5" md="12">
                    <b-button :disabled="is_btn_loading" :loading="is_btn_loading" class="ml-5" style="float: right"
                              type="is-info" @click="createStaff">Create
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
import staff_apis from "../../../../apis/modules/admin_pais/staff_apis";
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
      isLoading: true,
      isFullPage: false,
      selected: new Date(),
      showWeekNumber: false,
      locale: undefined,
      is_create_staff_modal_active: false,
      is_btn_loading: false,
      form: {
        qty: '',
        status: '',
        address: '',
        item_code: ''
      }
    }
  },

  methods: {
    openModal(data) {
      this.is_create_staff_modal_active = !this.is_create_staff_modal_active
      this.form = data
      
    },

    getItemData(){
      try{
        
      }catch (e) {
        
      }
    },
    async createStaff() {
      try {
        this.is_btn_loading = true
        if (await this.$refs.createStaffValidation.validate()) {
          await staff_apis.createStaff(this.form)
          this.success('Staff Create Successfully')
          this.closeModal()
        }
      } catch (e) {
        this.danger('User email is already exists')
      }
      this.is_btn_loading = false
    },

    closeModal() {
      this.$parent.closeModel()
      this.form = {}
      this.is_create_staff_modal_active = !this.is_create_staff_modal_active
    }
  }
}
</script>
