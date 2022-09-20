<template>
  <section>
    <b-modal
      v-model="is_update_staff_role_modal_active"
      :destroy-on-hide="false"
      aria-label="Example Modal"
      aria-modal
      aria-role="dialog"
      close-button-aria-label="Close"
      has-modal-card
      trap-focus>
      <div class="card">
        <header class="card-header" style="font-weight:700; font-size: 20px; color: white;">
          Update &nbsp;{{form.first_name}}'s &nbsp;Role
        </header>
        <div class="card-content">
          <template>
            <section>
              <b-field
                label="Role">
                <b-select v-model="form.account_type" placeholder="Select a role">
                  <option value="staff" style="color: rgb(180, 180, 180);">Staff</option>
                  <option value="admin" style="color: rgb(180, 180, 180);">Admin</option>
                  <option value="supplier" style="color: rgb(180, 180, 180);">Supplier</option>
                  <option value="stock-manager" style="color: rgb(180, 180, 180);">Stock Manager</option>
                </b-select>
              </b-field>
            </section>
              <div class="buttons mt-5">
                <b-button type="is-primary" inverted outlined>Cancel</b-button>
                <b-button :disabled="is_btn_loading" type="is-primary" inverted outlined @click="update_role">{{is_btn_loading?'Updating...':'Update'}}</b-button>
              </div>
          </template>
        </div>
      </div>
    </b-modal>
  </section>
</template>

<script>
import staff_apis from "../../../../apis/modules/admin_pais/staff_apis";
import ToastMixin from "../../../../mixins/ToastMixin";
export default {
  name: "edit_role",
  mixins: [ToastMixin],
  data(){
    return {
      is_btn_loading:false,
      is_update_staff_role_modal_active:false,
      form:{
        account_type:''
      }
    }
  },
  methods:{
    openModal(data) {
      this.form = data
      this.is_update_staff_role_modal_active = !this.is_update_staff_role_modal_active
    },
    async update_role(){
      try{
        this.is_btn_loading = true
        await staff_apis.updateStaff(this.form._id,this.form)
        this.success('Staff Update Successfully')
        this.closeModal()
      }catch (e) {

      }
      this.is_btn_loading = false

    },
    closeModal() {
      this.$parent.closeModel()
      this.form = {}
      this.is_update_staff_role_modal_active = !this.is_update_staff_role_modal_active
    }
  }
}
</script>

<style scoped>

</style>
