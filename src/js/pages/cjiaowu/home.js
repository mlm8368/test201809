import { mapState } from 'vuex'
import AmIcon from '../../components/am-icon.vue'
import AmButton from '../../components/am-button.vue'
import BuiSwipeCell from '../../components/bui-swipe-cell.vue'
import AmList from '../../components/am-list-card.vue'
import AmListItem from '../../components/am-list-item.vue'
import WxcPartLoading from '../../components/wxc-part-loading.vue'
import TeacherAdd from './teacher-add.vue'
import TeacherEdit from './teacher-edit.vue'
import TeacherView from './teacher-view.vue'
import Home from './home.class'

const home = new Home()

export default {
  name: 'cjiaowuHome',
  components: {
    AmIcon, AmButton, BuiSwipeCell, AmList, AmListItem, WxcPartLoading,
    'dialog-teacher-add': function (resolve) { resolve(TeacherAdd) },
    'dialog-teacher-edit': function (resolve) { resolve(TeacherEdit) },
    'dialog-teacher-view': function (resolve) { resolve(TeacherView) }
  },
  data () {
    return {
      dialog: { width: '700px', height: '800px', title: '窗口', type: 'teacher', op: 'add', index: 0 },
      btnAry: [{ 'title': '取消', 'bgcolor': '#c6c7c8' },
        { 'title': '编辑', 'bgcolor': '#3399ff' },
        { 'title': '删除', 'bgcolor': '#fa3300' }],
      classesName: '',
      teacherListsLoading: false,
      studentListsLoading: false
    }
  },
  computed: {
    teacherLists: function() {
      return home.outTeacher(this.$store.state.teacherLists)
    },
    studentLists: function() {
      return home.outStudent(this.$store.state.studentLists)
    },
    totalTeacher: function() {
      return this.teacherLists.length
    },
    totalStudent: function() {
      return this.studentLists.length
    },
    currentDialogComponent: function () {
      return `dialog-${this.dialog.type}-${this.dialog.op}`
    },
    ...mapState(['schoolid', 'classesid'])
  },
  created () {
    home.setVue(this)
    if (this.classesid) {
      home.getClassesName()
      this.getTeacherLists()
      this.getStudentLists()
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.$store.commit('setClassesid', 3)
      // this.openDialog('teacher', 'add') // test
    })
  },
  watch: {
    classesid: function(classesid) {
      if (!classesid) return

      home.getClassesName()
      this.getTeacherLists()
      this.getStudentLists()
    }
  },
  methods: {
    openDialog(type = 'teacher', op = 'add', index = 0) {
      const dialog = { width: '700px', height: '800px', title: '窗口', type: type, op: op, index: index }
      switch (type) {
        case 'teacher':
          if (op === 'add') {
            dialog.title = '添加老师'
          } else if (op === 'edit') {
            dialog.title = '编辑老师'
          } else if (op === 'view') {
            dialog.title = '查看老师'
          }
          break;

        case 'student':
          if (op === 'add') {
            dialog.title = '添加学生'
          } else if (op === 'edit') {
            dialog.title = '编辑学生'
          } else if (op === 'view') {
            dialog.title = '查看学生'
          }
          break;
      }

      this.dialog = dialog
      const bmmaskDom = this.$refs.bmmask
      bmmaskDom.show()
    },
    closeDialog() {
      const bmmaskDom = this.$refs.bmmask
      bmmaskDom.hide()
    },
    getTeacherLists(op = null) {
      if (op === 'refresh') home.cache.remove(home.appCacheKey.school_cjiaowu_teachers, this.classesid)

      this.teacherListsLoading = true
      home.getTeacherByClassesid(this.classesid, (lists) => {
        this.teacherListsLoading = false
        if (lists.length === 0) return
        this.$store.commit('setTeacherLists', lists)
      })
    },
    getStudentLists(op = null) {
      if (op === 'refresh') home.cache.remove(home.appCacheKey.school_cjiaowu_students, this.classesid)

      this.studentListsLoading = true
      home.getStudentByClassesid(this.classesid, (lists) => {
        this.studentListsLoading = false
        if (lists.length === 0 || !lists[0].id) return
        this.$store.commit('setStudentLists', lists)
      })
    },
    listActionClick(index, type, menuIndex) {
      // home.log(`listActionClick - ${index} - ${type} - ${menuIndex}`)
      switch (type) {
        case 'teacher':
          if (menuIndex === 1) {
            this.openDialog(type, 'edit', index)
          } else if (menuIndex === 2) {
            this.$notice.confirm({
              message: '确认要删除吗？',
              okCallback() {
                home.delTeacher(index)
              }
            })
          }
          break;

        case 'student':
          if (menuIndex === 1) {
            this.openDialog(type, 'edit', index)
          } else if (menuIndex === 2) {
            this.$notice.confirm({
              message: '确认要删除吗？',
              okCallback() {
                home.delStudent(index)
              }
            })
          }
          break;
      }
    },
    listClick(type = 'teacher', index) {
      // home.log('listClick' + index)
      this.openDialog(type, 'view', index)
    }
  }
}
