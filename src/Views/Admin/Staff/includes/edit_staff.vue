<template>
  <section>
    <b-modal
      v-model="is_update_staff_modal_active"
      :destroy-on-hide="false"
      aria-label="Example Modal"
      aria-modal
      aria-role="dialog"
      close-button-aria-label="Close"
      has-modal-card
      trap-focus>
      <div class="card">
        <header class="card-header" style="font-weight:700; font-size: 20px; color: white;">
          Update &nbsp;{{form.first_name}}'s' &nbsp;Details
        </header>
        <div class="card-content">
          <template>
            <section>
              <validation-observer ref="updateStaffValidation">
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
                        <b-select v-model="form.account_type" placeholder="Select a role">
                          <option value="" style="color: rgb(180, 180, 180);">Select a role</option>
                          <option value="staff" style="color: rgb(180, 180, 180);">Staff</option>
                          <option value="admin" style="color: rgb(180, 180, 180);">Admin</option>
                          <option value="stock-manager" style="color: rgb(180, 180, 180);">Stock Manager</option>
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
                  <b-col md="3">
                    <validation-provider
                      #default="{ errors }"
                      name="Gender"
                      rules="required"
                    >
                      <b-field label="Gender">
                        <b-radio v-model="form.gender"
                                 native-value="male">
                          male
                        </b-radio>
                      </b-field>
                      <b-field>
                        <b-radio v-model="form.gender"
                                 native-value="female"
                                 type="is-info">
                          female
                        </b-radio>
                      </b-field>
                    </validation-provider>
                  </b-col>
                  <b-col md="3">
                    <validation-provider
                      #default="{ errors }"
                      name="Conditions"
                      rules="required"
                    >
                      <b-field :message="errors[0]"
                               :type="errors[0]?'is-danger':''"
                               label="Conditions"
                      >
                        <b-checkbox v-model="form.is_email_verified">Is Email Verified?</b-checkbox>
                        <b-checkbox v-model="form.is_phone_verified">Is Phone Verified?</b-checkbox>
                      </b-field>

                    </validation-provider>
                  </b-col>
                  <b-col class="mt-5" md="12">
                    <b-button :disabled="is_btn_loading" :loading="is_btn_loading" class="ml-5" style="float: right"
                              type="is-info" @click="updateStaff">Update
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
  components: {
    ValidationObserver, ValidationProvider
  },
  mixins: [ToastMixin],
  data() {
    return {
      selected: new Date(),
      showWeekNumber: false,
      locale: undefined,
      is_update_staff_modal_active: false,
      is_btn_loading: false,
      form: {
        _id:'',
        first_name: '',
        last_name: '',
        mobile: '',
        gender: '',
        email: '',
        password: '',
        account_type: '',
        DOB: '',
        is_email_verified: false,
        is_phone_verified: false
      }
    }
  },

  methods: {
    openModal(data) {
      this.form = data
      this.is_update_staff_modal_active = !this.is_update_staff_modal_active
    },

    async updateStaff() {
      try {
        this.is_btn_loading = true
        if (await this.$refs.updateStaffValidation.validate()) {
          await staff_apis.updateStaff(this.form._id,this.form)
          this.success('Staff Update Successfully')
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
      this.is_update_staff_modal_active = !this.is_update_staff_modal_active
    }
  }
}
</script>
