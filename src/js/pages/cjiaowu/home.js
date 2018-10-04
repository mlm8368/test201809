import AmButton from '../../components/am-button.vue'
import buiSwipeCell from '../../components/bui-swipe-cell.vue'
import AmList from '../../components/am-list-card.vue'
import AmListItem from '../../components/am-list-item.vue'
// import { AmListItem } from 'weex-amui'
import Home from './home.class'

let home = null

export default {
  name: 'cjiaowuHome',
  components: { AmButton, buiSwipeCell, AmList, AmListItem },
  data () {
    return {
      btnAry: [{ 'title': '取消', 'bgcolor': '#c6c7c8' },
        { 'title': '编辑', 'bgcolor': '#3399ff' },
        { 'title': '删除', 'bgcolor': '#fa3300' }],
      classesId: 0,
      classesName: '',
      teacherLists: [],
      studentLists: [],
      teacherListsLoading: false,
      studentListsLoading: false
    }
  },
  created () {
    home = new Home(this)
  },
  watch: {
    classesId: function(classesId) {
      if (!classesId) return

      // classesName
      this.getClasses(function(lists) {
        for (const one of lists) {
          if (one.id === classesId) {
            this.classesName = one.classesname
            break
          }
        }
      })
      // teacher
      this.teacherListsLoading = true
      this.getTeacherByClassesid(classesId, function(lists) {
        this.teacherListsLoading = false
        if (lists.length === 0) return
        this.teacherLists = this.outTeacher(lists)
      })
      // student
      this.studentListsLoading = true
      this.getStudentByClassesid(classesId, function(lists) {
        this.studentListsLoading = false
        if (lists.length === 0 || !lists[0].id) return
        this.studentLists = this.outStudent(lists)
      })
    }
  },
  methods: {
    navbarClick(key) {
      // home.log(key)
      if (key === 'teacher') {
        this.popupPosition = 'left'
        this.popupShow = true
      } else if (key === 'classes') {
        this.popupPosition = 'right'
        this.popupShow = true
      }
    },
    listActionClick(index, menuIndex) {
      home.log('listActionClick' + index + '-' + menuIndex)
    },
    listClick(index) {
      home.log('listClick' + index)
    }
  }
}
