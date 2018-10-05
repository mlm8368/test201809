import { mapState } from 'vuex'
import AmIcon from '../../components/am-icon'
import AmButton from '../../components/am-button.vue'
import BuiSwipeCell from '../../components/bui-swipe-cell.vue'
import AmList from '../../components/am-list-card.vue'
import AmListItem from '../../components/am-list-item.vue'
import WxcPartLoading from '../../components/wxc-part-loading'
import Home from './home.class'

const home = new Home()

export default {
  name: 'cjiaowuHome',
  components: { AmIcon, AmButton, BuiSwipeCell, AmList, AmListItem, WxcPartLoading },
  data () {
    return {
      dialog: { width: '500px', height: '800px', title: '窗口' },
      btnAry: [{ 'title': '取消', 'bgcolor': '#c6c7c8' },
        { 'title': '编辑', 'bgcolor': '#3399ff' },
        { 'title': '删除', 'bgcolor': '#fa3300' }],
      classesName: '',
      teacherLists: [],
      studentLists: [],
      teacherListsLoading: false,
      studentListsLoading: false
    }
  },
  computed: {
    totalTeacher: function() {
      return this.teacherLists.length
    },
    totalStudent: function() {
      return this.studentLists.length
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
      // const bmmaskDom = this.$refs.bmmask
      // bmmaskDom.show()
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
    openDialog() {
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
        this.teacherLists = home.outTeacher(lists)
      })
    },
    getStudentLists(op = null) {
      if (op === 'refresh') home.cache.remove(home.appCacheKey.school_cjiaowu_students, this.classesid)

      this.studentListsLoading = true
      home.getStudentByClassesid(this.classesid, (lists) => {
        this.studentListsLoading = false
        if (lists.length === 0 || !lists[0].id) return
        this.studentLists = home.outStudent(lists)
      })
    },
    listActionClick(index, type, menuIndex) {
      // home.log(`listActionClick - ${index} - ${type} - ${menuIndex}`)
      switch (type) {
        case 'teacher':
          if (menuIndex === 1) {
            home.editTeacher(index)
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
            home.editStudent(index)
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
    listClick(index) {
      home.log('listClick' + index)
    }
  }
}
