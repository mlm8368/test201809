import App from './app.class'

export default class Profile extends App {
  constructor() {
    super()
    return this
  }

  outSchool (one) {
    //this.log(one)
    const tmp = {}
    tmp['id'] = one.id
    tmp['thumb'] = one.thumb
    tmp['passport'] = one.passport
    tmp['company'] = one.company
    tmp['address'] = one.areaname + one.address
    tmp['avatar'] = this.getAvatar(one.avatar)
    tmp['gender'] = this.getGender(one.gender)
    //tmp['postcode'] = one.postcode
    tmp['telephone'] = one.telephone
    tmp['mail'] = one.mail
    tmp['homepage'] = one.homepage
    tmp['gzh'] = one.gzh
    tmp['gzhqr'] = one.gzhqr
    tmp['truename'] = `${one.truename} (${one.username})`
    tmp['mobile'] = one.mobile
    tmp['qq'] = one.qq
    tmp['wx'] = one.wx
    tmp['vip'] = one.vip
    tmp['fromtime'] = ''
    tmp['totime'] = ''
    tmp['havedays'] = 0
    tmp['vipyear'] = 0
    if(tmp['vip']) {
      tmp['fromtime'] = this.getFormatDate(new Date(one.fromtime*1000))
      tmp['totime'] = this.getFormatDate(new Date(one.totime*1000))
	  tmp['havedays'] = Math.ceil((one.totime - this.DATE_TIME/1000)/86400)
	  tmp['vipyear'] = Math.ceil((this.DATE_TIME/1000 - one.fromtime)/31536000)
	}
	//this.log(tmp)
    return tmp
  }
}
