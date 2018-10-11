import Vuex from 'vuex'
import App from './app.class'

Vue.use(Vuex)

const app = new App()

export default new Vuex.Store({
  state: {
    schoolid: 0,
    classesid: 0,
    teacherLists: [],
    studentLists: []
  },
  mutations: {
    init (state, Vue) {
      app.setVue(Vue)
      const schoolid = app.getStorage(app.appStorageKey.userid)
      if (schoolid) state.schoolid = schoolid
      const classesid = app.getStorage(app.appStorageKey.current_jiaowu_classesid)
      if (classesid) state.classesid = classesid

      // app.log(state)
    },
    setClassesid (state, classesid) {
      state.classesid = classesid
      app.setStorage(app.appStorageKey.current_jiaowu_classesid, classesid)
    },
    setTeacherLists (state, teacherLists) {
      state.teacherLists = teacherLists
    },
    setStudentLists (state, studentLists) {
      state.studentLists = studentLists
    }
  }
})
