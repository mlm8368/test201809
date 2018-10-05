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
      home.getClassesName(this.classesid)
      this.getTeacherLists(this.classesid)
      this.getStudentLists(this.classesid)
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.$store.commit('setClassesid', 3)
    })
  },
  watch: {
    classesid: function(classesid) {
      if (!classesid) return

      // classesName
      home.getClassesName(classesid)

      // teacher
      this.getTeacherLists(classesid)

      // student
      this.getStudentLists(classesid)
    }
  },
  methods: {
    getTeacherLists(classesid, op = null) {
      if (op === 'refresh') home.cache.remove(home.appCacheKey.school_cjiaowu_teachers, this.classesid)

      this.teacherListsLoading = true
      home.getTeacherByClassesid(classesid, (lists) => {
        this.teacherListsLoading = false
        if (lists.length === 0) return
        this.teacherLists = home.outTeacher(lists)
      })
    },
    getStudentLists(classesid, op = null) {
      if (op === 'refresh') home.cache.remove(home.appCacheKey.school_cjiaowu_students, this.classesid)

      this.studentListsLoading = true
      home.getStudentByClassesid(classesid, (lists) => {
        this.studentListsLoading = false
        if (lists.length === 0 || !lists[0].id) return
        this.studentLists = home.outStudent(lists)
      })
    },
    listActionClick(index, menuIndex) {
      home.log('listActionClick' + index + '-' + menuIndex)
    },
    listClick(index) {
      home.log('listClick' + index)
    }
  }
}
