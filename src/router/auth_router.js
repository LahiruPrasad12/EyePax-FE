// import practice from '@/apis/modules/practice'
export default {
  init(router, store) {
    router.beforeEach(async (to, _, next) => {
      if(store.getters.currentUser == null){
        await store.actions.autoLogin()
      }

      const { currentUser } = store.getters

      console.log(currentUser)
      if (currentUser !== null) {
        return next('/login')
      }

      console.log('au')
      return next()

    });
  },
}
