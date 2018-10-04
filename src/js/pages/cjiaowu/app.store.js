import Vuex from 'vuex'
import School from '../../class/school.class'

Vue.use(Vuex)

const school = new School()

export default new Vuex.Store({
  state: {
    schoolid: 0,
    classesid: 0
  },
  mutations: {
    init (state, Vue) {
      school.setVue(Vue)
      const schoolid = school.getStorage(school.appStorageKey.userid)
      if (schoolid) state.schoolid = schoolid
      const classesid = school.getStorage(school.appStorageKey.current_jiaowu_classesid)
      if (classesid) state.classesid = classesid

      school.log(state) // test
    },
    setClassesid (state, classesid) {
      state.classesid = classesid
      school.setStorage(school.appStorageKey.current_jiaowu_classesid, classesid)
    }
  }
})
