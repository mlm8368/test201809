import Vuex from 'vuex'
import Abstract from '../../class/abstract'

Vue.use(Vuex)

let abstract = null

export default new Vuex.Store({
  state: {
    schoolid: 0,
    classesid: 0
  },
  mutations: {
    init (state, Vue) {
      abstract = new Abstract(Vue)
      const schoolid = abstract.getStorage(abstract.appStorageKey.userid)
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

/*
export default class Store extends Abstract {
  constructor(Vue) {
    super(Vue)

    const that = this
    return new Vuex.Store({
      state: {
        schoolid: 0,
        classesid: 0
      },
      mutations: {
        init (state) {
          // const schoolid = that.getStorage(that.appStorageKey.userid)
          // if (schoolid) state.schoolid = schoolid
          state.schoolid = 5
        },
        setSchoolid (state, schoolid) {
          state.schoolid = schoolid
        },
        setClassesid (state, classesid) {
          state.classesid = classesid
        }
      }
    })
  }
}
*/
