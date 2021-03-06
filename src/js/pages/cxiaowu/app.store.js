import Vuex from 'vuex'
import App from './app.class'

Vue.use(Vuex)

const app = new App()

export default new Vuex.Store({
  state: {
    apppage: { type: 'home', params: null },
    appdialog: { action: 'open/close', type: 'teacher', op: 'add', index: 0 },
    schoolid: 0,
    profileStatus: 0
  },
  mutations: {
    init (state, Vue) {
      app.setVue(Vue)
      const schoolid = app.getStorage(app.appStorageKey.userid)
      if (schoolid) state.schoolid = schoolid

      // app.log(state)
    },
    setAppPage (state, apppage) {
      state.apppage = apppage
    },
    setAppDialog (state, appdialog) {
      state.appdialog = appdialog
    },
    updateProfileStatus (state) {
      state.profileStatus++
    }
  }
})
