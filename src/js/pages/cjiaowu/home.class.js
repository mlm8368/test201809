import School from '../../class/school.class'

export default class Home extends School {
  constructor() {
    super()
    return this
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

  outStudent (lists) {
    const studentLists = []
    lists.forEach((one) => {
      const tmp = {}
      tmp['id'] = one.id
      tmp['babyname'] = one.babyname
      tmp['avatar'] = this.getAvatar(one.avatar)
      tmp['gender'] = this.getGender(one.gender)
      tmp['age'] = this.getAge(one.birthday + ' 1:1:1', this.school.getFormatDate() + ' 1:1:1')

      studentLists.push(tmp)
    })
    return studentLists
  }
}
