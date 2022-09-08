<template>
    <section>
        <b-modal v-model="update_order_modal_active" :destroy-on-hide="false" aria-label="Example Modal" aria-modal
            aria-role="dialog" close-button-aria-label="Close" has-modal-card trap-focus>
            <div class="card">
                <header class="card-header" style="font-weight:700; font-size: 20px; color: white;">
                    Update &nbsp;{{form.item_code}}&nbsp;Order
                </header>
                <div class="card-content">
                    <template>
                        <section>
                            <validation-observer ref="updateOrderValidation">
                                <b-row>
                                    <b-col md="6">
                                        <validation-provider #default="{ errors }" name="order_id">
                                            <b-field :message="errors[0]" :type="errors[0]?'is-danger':'is-success'"
                                                label="Order Id">
                                                <b-input v-model="form.order_id" maxlength="10" type="text" disabled>
                                                </b-input>
                                            </b-field>
                                        </validation-provider>
                                    </b-col>
                                    <b-col md="6">
                                        <validation-provider #default="{ errors }" name="item" rules="required">
                                            <b-field :message="errors[0]" :type="errors[0]?'is-danger':'is-success'"
                                                label="Item">
                                                <b-input v-model="form.item" maxlength="50" type="text" disabled>
                                                </b-input>
                                            </b-field>
                                        </validation-provider>
                                    </b-col>
                                    <b-col md="6">
                                        <validation-provider #default="{ errors }" name="qty" rules="required">
                                            <b-field :message="errors[0]" :type="errors[0]?'is-danger':'is-success'"
                                                label="Qty">
                                                <b-input v-model="form.qty" maxlength="10" min="1" placeholder="e.g. 12"
                                                    type="number">
                                                </b-input>
                                            </b-field>
                                        </validation-provider>
                                    </b-col>
                                    <b-col md="6">
                                        <validation-provider #default="{ errors }" name="status" rules="required">
                                            <b-field :message="errors[0]" :type="errors[0]?'is-danger':'is-success'"
                                                label="Status">
                                                <b-input v-model="form.status" maxlength="30" type="text" disabled>
                                                </b-input>
                                            </b-field>
                                        </validation-provider>
                                    </b-col>
                                    <b-col md="6">
                                        <validation-provider #default="{ errors }" name="created_at" rules="required">
                                            <b-field :message="errors[0]" :type="errors[0]?'is-danger':'is-success'"
                                                label="Date">
                                                <b-input v-model="form.created_at" maxlength="30" type="date" disabled>
                                                </b-input>
                                            </b-field>
                                        </validation-provider>
                                    </b-col>
                                    <b-col class="mt-5" md="12">
                                        <b-button :disabled="is_btn_loading" :loading="is_btn_loading" class="ml-5"
                                            style="float: right" type="is-info" @click="updateOrder">Update
                                        </b-button>
                                        <b-button class="ml-5" style="float: right" type="is-secondary"
                                            @click="closeModal">Cancel
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
import CustomerApis from '../../../apis/modules/customer_apis/customer_apis';
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
            update_order_modal_active: false,
            is_btn_loading: false,
            form: {
                order_id: '',
                item: '',
                qty: '',
                status: '',
                created_at: ''
            }
        }
    },

    methods: {
        openModal(data) {
            console.log(data)
            this.form = {
                id: data.id,
                order_id: data.order_id,
                price: data.price,
                item: data.item,
                qty: data.qty,
                status: data.status,
                created_at: data.created_at.substring(0, 10)
            }
            this.update_order_modal_active = !this.update_order_modal_active
        },

        async updateOrder() {
            try {
                this.is_btn_loading = true
                if (await this.$refs.updateOrderValidation.validate()) {
                    await CustomerApis.updateOrder({ data: this.form })
                    this.success('Order Update Successfully')
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
            this.update_order_modal_active = !this.update_order_modal_active
        }
    }
}
</script>
  