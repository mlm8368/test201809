import Vuex from 'vuex'
import Abstract from '../../class/abstract'

Vue.use(Vuex)

export default class Store extends Abstract {
  constructor(Vue) {
    super(Vue)

    const schoolid = this.getStorage(this.appStorageKey.userid)

    return new Vuex.Store({
      state: {
        schoolid: schoolid,
        classesid: 0
      },
      mutations: {
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
