import Vuex from 'vuex'
import School from '../../class/school.class'

Vue.use(Vuex)

let school = null

export default new Vuex.Store({
  state: {
    schoolid: 0,
    classesid: 0
  },
  mutations: {
    init (state, Vue) {
      school = new School(Vue)
      const schoolid = school.getStorage(school.appStorageKey.userid)
      if (schoolid) state.schoolid = schoolid
    },
    setSchoolid (state, schoolid) {
      state.schoolid = schoolid
    },
    setClassesid (state, classesid) {
      state.classesid = classesid
    }
  }
})
