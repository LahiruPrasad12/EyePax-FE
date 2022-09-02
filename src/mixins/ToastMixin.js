export default {
  methods: {
    danger(message) {
      this.$buefy.toast.open({
        duration: 5000,
        message: `${message}`,
        type: 'is-danger',
      })
    },
    success(message) {
      this.$buefy.toast.open({
        message: `${message}`,
        duration: 5000,
        type: 'is-success'
      })
    },
  },
}
