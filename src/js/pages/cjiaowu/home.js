import { mapState } from 'vuex'
import AmButton from '../../components/am-button.vue'
import buiSwipeCell from '../../components/bui-swipe-cell.vue'
import AmList from '../../components/am-list-card.vue'
import AmListItem from '../../components/am-list-item.vue'
import Home from './home.class'

const home = new Home()

export default {
  name: 'cjiaowuHome',
  components: { AmButton, buiSwipeCell, AmList, AmListItem },
  data () {
    return {
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
    ...mapState(['schoolid', 'classesid'])
  },
  created () {
    home.setVue(this)
  },
  mounted () {
    this.$nextTick(function () {
      this.$store.commit('setClassesid', 1)
    })
  },
  watch: {
    classesid: function(classesId) {
      // home.log(classesId)
      if (!classesId) return

      // classesName
      home.getClasses(function(lists) {
        for (const one of lists) {
          if (one.id === classesId) {
            this.classesName = one.classesname
            break
          }
        }
      })
      /*
      // teacher
      this.teacherListsLoading = true
      home.getTeacherByClassesid(classesId, function(lists) {
        this.teacherListsLoading = false
        if (lists.length === 0) return
        this.teacherLists = home.outTeacher(lists)
      })
      // student
      this.studentListsLoading = true
      home.getStudentByClassesid(classesId, function(lists) {
        this.studentListsLoading = false
        if (lists.length === 0 || !lists[0].id) return
        this.studentLists = home.outStudent(lists)
      })
      */
    }
  },
  methods: {
    listActionClick(index, menuIndex) {
      home.log('listActionClick' + index + '-' + menuIndex)
    },
    listClick(index) {
      home.log('listClick' + index)
    }
  }
}
