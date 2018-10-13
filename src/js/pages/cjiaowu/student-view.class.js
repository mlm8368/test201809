import Home from './home.class'

export default class StudentView extends Home {
  constructor() {
    super()
    return this
  }

  outStudent (one) {
    const tmp = {}
    tmp['studentid'] = one.studentid
    tmp['babyname'] = one.babyname
    tmp['avatar'] = this.getAvatar(one.avatar)
    tmp['gender'] = this.getGender(one.gender)
    tmp['birthday'] = one.birthday
    tmp['startdate'] = one.startdate
    tmp['enddate'] = one.enddate
    tmp['parents'] = []
    if (one.parentcalls) {
      const parentcalls = one.parentcalls.split(',')
      const parenttruenames = one.parenttruenames.split(',')
      const parentmobiles = one.parentmobiles.split(',')

      parentcalls.forEach((value, index) => {
        const parent = {}
        parent['call'] = value
        parent['truename'] = parenttruenames[index]
        parent['mobile'] = parentmobiles[index]

        tmp.parents.push(parent)
      })
    }

    return tmp
  }
}
