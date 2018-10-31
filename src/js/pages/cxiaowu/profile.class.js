import App from './app.class'

export default class Profile extends App {
  constructor() {
    super()
    return this
  }

  outSchool (one) {
    const tmp = {}
    tmp['id'] = one.id
    tmp['thumb'] = one.thumb
    tmp['passport'] = one.passport
    tmp['company'] = one.company
    tmp['address'] = one.address
    tmp['avatar'] = this.getAvatar(one.avatar)
    tmp['gender'] = this.getGender(one.gender)
    tmp['postcode'] = one.postcode
    tmp['telephone'] = one.telephone
    tmp['mail'] = one.mail
    tmp['homepage'] = one.homepage
    tmp['gzh'] = one.gzh
    tmp['gzhqr'] = one.gzhqr
    tmp['truename'] = one.truename
    tmp['mobile'] = one.mobile
    tmp['qq'] = one.qq
    tmp['wx'] = one.wx
    tmp['vip'] = one.vip
    return tmp
  }
}
