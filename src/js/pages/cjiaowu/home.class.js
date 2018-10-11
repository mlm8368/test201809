import App from './app.class'

export default class Home extends App {
  constructor() {
    super()
    return this
  }
  /**
   * getClasses
   *
   * @param {*} callback
   * @memberof Home
   */
  getClasses (callback) {
    const lists = this.cacheClasses('get')
    if (lists !== null) {
      callback(lists)
      return
    }

    this.Vue.$fetch({
      method: 'GET',
      name: 'modules.classes',
      params: { query: '&action=list' },
      header: this.ajaxHeader()
    }).then(ret => {
      if (ret.status === 1) {
        callback(ret.lists)
        this.cacheClasses('set', ret.lists)
      }
    }, error => {
    })
  }

  cacheClasses (op, lists = null) {
    const schoolid = this.Vue.schoolid
    const cacheParam = schoolid
    let classes = null

    if (op === 'get') {
      classes = this.cache.get(this.appCacheKey.school_cjiaowu_classes)
      if (classes !== null && classes.param === cacheParam) return classes.value
      else return null
    } else if (op === 'set') {
      classes = { param: cacheParam, value: lists }
      this.cache.set(this.appCacheKey.school_cjiaowu_classes, classes)
    }
  }

  getClassesName() {
    this.getClasses((lists) => {
      for (const one of lists) {
        if (one.id === this.Vue.classesid) {
          this.Vue.classesName = one.classesname
          break
        }
      }
    })
  }
  /**
   * getTeacherByClassesid
   *
   * @param {number} classesid
   * @param {(lists: any[]) => void} callback
   * @memberof Home
   */
  getTeacherByClassesid (classesid, callback) {
    const lists = this.cacheTeacherByClassesid('get', classesid)
    if (lists !== null) {
      callback(lists)
      return
    }

    this.Vue.$fetch({
      method: 'GET',
      name: 'modules.classes',
      params: { query: '&action=teacher&op=list' },
      header: this.ajaxHeader(),
      data: { classesid: classesid }
    }).then(ret => {
      if (ret.status === 1) {
        callback(ret.lists)
        this.cacheTeacherByClassesid('set', classesid, ret.lists)
      }
    }, error => {
    })
  }

  cacheTeacherByClassesid (op, classesid, lists = null) {
    const schoolid = this.Vue.schoolid
    const cacheParam = `${schoolid}${classesid}`
    let teachers = null

    if (op === 'get') {
      teachers = this.cache.get(this.appCacheKey.school_cjiaowu_teachers, classesid)
      if (teachers !== null && teachers.param === cacheParam) return teachers.value
      else return null
    } else if (op === 'set') {
      teachers = { param: cacheParam, value: lists }
      this.cache.set(this.appCacheKey.school_cjiaowu_teachers, teachers, 0, classesid)
    }
  }

  outTeacher (lists) {
    const teacherLists = []
    lists.forEach((one) => {
      const tmp = {}
      tmp['id'] = one.id
      tmp['teacherpost'] = one.teacherpost
      tmp['truename'] = one.truename
      tmp['avatar'] = this.getAvatar(one.avatar)

      teacherLists.push(tmp)
    })
    return teacherLists
  }

  delTeacher (index) {
    const tid = this.Vue.teacherLists[index].id

    this.Vue.$notice.loading.show('正在删除...')
    this.Vue.$fetch({
      method: 'GET',
      name: 'modules.classes',
      params: { query: '&action=teacher&op=del' },
      header: this.ajaxHeader(),
      data: { id: tid }
    }).then(ret => {
      if (ret.status === 1) {
        this.Vue.$notice.loading.hide()
        this.Vue.$notice.toast({ message: '删除成功' })
        this.Vue.getTeacherLists('refresh')
      }
    }, error => {
    })
  }
  /**
   * getStudentByClassesid
   *
   * @param {number} classesid
   * @param {(lists: any[]) => void} callback
   * @memberof Home
   */
  getStudentByClassesid (classesid, callback) {
    const lists = this.cacheStudentByClassesid('get', classesid)
    if (lists !== null) {
      callback(lists)
      return
    }

    this.Vue.$fetch({
      method: 'GET',
      name: 'modules.classes',
      params: { query: '&action=student&op=list' },
      header: this.ajaxHeader(),
      data: { classesid: classesid }
    }).then(ret => {
      if (ret.status === 1) {
        callback(ret.lists)
        this.cacheStudentByClassesid('set', classesid, ret.lists)
      }
    }, error => {
    })
  }

  cacheStudentByClassesid (op, classesid, lists = null) {
    const schoolid = this.Vue.schoolid
    const cacheParam = `${schoolid}${classesid}`
    let students = null

    if (op === 'get') {
      students = this.cache.get(this.appCacheKey.school_cjiaowu_students, classesid)
      if (students !== null && students.param === cacheParam) return students.value
      else return null
    } else if (op === 'set') {
      students = { param: cacheParam, value: lists }
      this.cache.set(this.appCacheKey.school_cjiaowu_students, students, 0, classesid)
    }
  }

  outStudent (lists) {
    const studentLists = []
    lists.forEach((one) => {
      const tmp = {}
      tmp['id'] = one.id
      tmp['babyname'] = one.babyname
      tmp['avatar'] = this.getAvatar(one.avatar)
      tmp['gender'] = this.getGender(one.gender)
      tmp['age'] = this.getAge(one.birthday + ' 1:1:1', this.getFormatDate() + ' 1:1:1')

      studentLists.push(tmp)
    })
    return studentLists
  }

  delStudent (index) {
    const sid = this.Vue.studentLists[index].id

    this.Vue.$notice.loading.show('正在删除...')
    this.Vue.$fetch({
      method: 'GET',
      name: 'modules.classes',
      params: { query: '&action=student&op=del' },
      header: this.ajaxHeader(),
      data: { id: sid }
    }).then(ret => {
      if (ret.status === 1) {
        this.Vue.$notice.loading.hide()
        this.Vue.$notice.toast({ message: '删除成功' })
        this.Vue.getStudentLists('refresh')
      }
    }, error => {
    })
  }
}
