<template>
  <div class="profile">
    <div class="profile-header">
    	<image class="avatar" :src="formData.thumb" @click="pickAvatar"></image>
    	<text>{{formData.passport}}</text>
    </div>
    <list>
      <header>
        <div class="header">
          <text class="header-cell page-left-padded">学校资料</text>
          <text class="header-cell" v-if="formData.company"> <{{formData.company}}></text>
        </div>
      </header>
      <cell><bui-list-item label="学校类型">
        <div slot="title" @click="showPicker('type', '学校类型')">
          <text v-if="formData.type.length > 0">{{formData.type[0]}}</text>
          <text v-else>请选择</text>
        </div>
      </bui-list-item></cell>
      <cell><bui-list-item label="开设班级" :cell-style="{height: 260}">
        <bui-checkbox slot="title" key-name="catid" v-model="formData.catid" :items="checkbox.catid" @change="onCheckboxChange"></bui-checkbox>
      </bui-list-item></cell>
      <cell><bui-list-item label="主营范围" >
        <input  :value="formData.business" @input="onInput('business', $event)" slot="title" class="input" type="text" placeholder="培训，教学" />
      </bui-list-item></cell>
      <cell><bui-list-item label="成立年份" >
        <input  :value="formData.regyear" @input="onInput('regyear', $event)" slot="title" class="input" type="number" placeholder="例：2016" />
      </bui-list-item></cell>
      <cell><bui-list-item label="教学模式" :cell-style="{height: 140}" >
        <bui-checkbox slot="title" key-name="mode" v-model="formData.mode" :items="checkbox.mode" @change="onCheckboxChange"></bui-checkbox>
      </bui-list-item></cell>
      <cell><bui-list-item label="师资规模" >
        <div slot="title" @click="showPicker('size', '师资规模')">
          <text v-if="formData.size.length > 0">{{formData.size[0]}}</text>
          <text v-else>请选择</text>
        </div>
      </bui-list-item></cell>
      <cell><bui-list-item label="注册资本" >
        <div slot="title" @click="showPicker('regunit', '注册资本')" class="profile-regunit">
          <text v-if="formData.regunit.length > 0">{{formData.regunit[0]}}</text>
          <text v-else>选择币种</text>
        </div>
        <input  :value="formData.capital" @input="onInput('capital', $event)" slot="action" class="input profile-capital" type="number" placeholder="需6位以上" />
        <text>万</text>
      </bui-list-item></cell>
      <cell><div class="button"><am-button width="500px" size="small" text="确认修改" @click="buttonClick"></am-button></div></cell>
      <header>
        <div class="header">
          <text class="header-cell page-left-padded">联系方式</text>
        </div>
      </header>
      <cell><bui-list-item label="学校地址" >
        <div slot="title" @click="showPicker('areaid', '所在地区')">
          <text v-if="formData.areaid.length > 0">{{areaname}}</text>
          <text v-else>请选择省市</text>
          <input :value="formData.address" @input="onInput('address', $event)" slot="title" class="input" type="text" placeholder="区+街道+门牌号" />
        </div>
      </bui-list-item></cell>
      <cell><bui-list-item label="学校电话" >
        <input  :value="formData.telephone" @input="onInput('telephone', $event)" slot="title" class="input" type="number" placeholder="例：010-86120001" />
      </bui-list-item></cell>
      <cell><bui-list-item label="学校传真" >
        <input  :value="formData.fax" @input="onInput('fax', $event)" slot="title" class="input" type="number" placeholder="例：010-86120002" />
      </bui-list-item></cell>
      <cell><bui-list-item label="学校邮箱" >
        <input  :value="formData.mail" @input="onInput('mail', $event)" slot="title" class="input" type="email" placeholder="email地址，对外公开" />
      </bui-list-item></cell>
      <cell><bui-list-item label="学校网址" >
        <input  :value="formData.homepage" @input="onInput('homepage', $event)" slot="title" class="input" type="url" placeholder="http://www.xuexiao.com" />
      </bui-list-item></cell>
      <cell><bui-list-item label="微信公众号" >
        <input  :value="formData.gzh" @input="onInput('gzh', $event)" slot="title" class="input" type="text" placeholder="学校公众号名称" />
      </bui-list-item></cell>
      <cell><bui-list-item label="二维码" >
        <input  :value="formData.gzhqr" @input="onInput('gzhqr', $event)" slot="title" class="input" type="password" placeholder="上传二维码图片" />
      </bui-list-item></cell>
      <cell><div class="button"><am-button width="500px" size="small" text="确认修改" @click="buttonClick"></am-button></div></cell>
      <header>
        <div class="header">
          <text class="header-cell page-left-padded">学校简介</text>
        </div>
      </header>
      <cell><bui-list-item label="学校简介" :cell-style="{height: 220}" >
        <textarea :value="formData.content" @input="onInput('content', $event)" slot="title" class="input textarea" placeholder="详细介绍"></textarea>
      </bui-list-item></cell>
      <cell><div class="button"><am-button width="500px" size="small" text="确认修改" @click="buttonClick"></am-button></div></cell>
      <header>
        <div class="header">
          <text class="header-cell page-left-padded">管理员</text>
          <text class="header-cell"> <{{formData.username}}></text>
        </div>
      </header>
      <cell><bui-list-item label="手机" >
        <input  :value="formData.mobile" @input="onInput('mobile', $event)" slot="title" class="input" type="tel" placeholder="例：18600010002" />
      </bui-list-item></cell>
      <cell><bui-list-item label="邮箱" >
        <input  :value="formData.email" @input="onInput('email', $event)" slot="title" class="input" type="email" placeholder="联系用email，不对外公开" />
      </bui-list-item></cell>
      <cell><bui-list-item label="姓名" >
        <input  :value="formData.truename" @input="onInput('truename', $event)" slot="title" class="input" type="text" placeholder="真实姓名" />
      </bui-list-item></cell>
      <cell><bui-list-item label="性别" >
        <div slot="title" @click="showPicker('gender', '性别')">
          <text v-if="formData.gender">{{gendername}}</text>
          <text v-else>请选择</text>
        </div>
      </bui-list-item></cell>
      <cell><bui-list-item label="部门" >
        <input  :value="formData.department" @input="onInput('department', $event)" slot="title" class="input" type="text" placeholder="例：教务处" />
      </bui-list-item></cell>
      <cell><bui-list-item label="职务" >
        <input  :value="formData.career" @input="onInput('career', $event)" slot="title" class="input" type="text" placeholder="例：行政助理" />
      </bui-list-item></cell>
      <cell><bui-list-item label="QQ" >
        <input  :value="formData.qq" @input="onInput('qq', $event)" slot="title" class="input" type="number" placeholder="联系用，不对外公开" />
      </bui-list-item></cell>
      <cell><bui-list-item label="微信" >
        <input  :value="formData.wx" @input="onInput('wx', $event)" slot="title" class="input" type="text" placeholder="联系用，不对外公开" />
      </bui-list-item></cell>
      <cell><div class="button"><am-button width="500px" size="small" text="确认修改" @click="buttonClick"></am-button></div></cell>
    </list>
    <am-picker
      :show.sync="picker.show"
      :title="picker.title"
      :data="picker.data"
      v-model="picker.value"
      @ok="onPickerOK"></am-picker>
  </div>
</template>

<style lang="less" scoped>
@import "../../../css/variable.less";
@import "../../../css/common.less";

.profile {
  &-header {
    flex: 1;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  &-capital {
    width: 360px;
  }
}

.textarea {
  height: 200px;
  color: #000000;
}
</style>

<script>
import { mapState } from 'vuex'
import FormMixins from '../../class/form.mixins'
import BuiListItem from '../../components/bui-list-item.vue'
import AmPicker from '../../components/am-picker.vue'
import BuiCheckbox from '../../components/bui-checkbox.vue'
import AmButton from '../../components/am-button.vue'
import { PickerData, CheckboxData } from './profile-edit.config'
import ProfileEdit from './profile-edit.class'

const bmTool = weex.requireModule('bmTool')
const bmImage = weex.requireModule('bmImage')

const profile = new ProfileEdit()

export default {
  name: 'profile-edit',
  components: { BuiListItem, AmPicker, BuiCheckbox, AmButton },
  mixins: [FormMixins],
  data () {
    return {
      bosPolicy: null,
      formData: {
        company: '',
        username: '',
        passport: '',
        type: [],  //公立学校,私立学校,培训机构,其他
        catid: [],  //幼教启蒙班,幼教小班,英语培训班,舞蹈培训班,武术培训班
        business: '', //教学 培训 一对一培训
        regyear: 2018,
        mode: [], //全日制教学,培训班,一对一教学
        size: [], //1-9人,10-29人
        regunit: [], //人民币,美元
        capital: 0, //万,
        areaid: [],
        address: '',
        postcode: '',
        thumb: profile.getAvatar(),
        telephone: '',
        fax: '',
        mail: '',
        homepage: '',
        gzh: '',
        gzhqr: '',
        content: '',
        mobile: '',
        truename: '',
        gender: '',
        department: '',
        career: '',
        qq: '',
        wx: ''
      },
      formDataEdit: {},
      picker: {
        key: '',
        show: false,
        title: '请选择',
        data: [],
        value: []
      },
      checkbox: CheckboxData,
      areaname: '',
      gendername: ''
    }
  },
  computed: {
    ...mapState(['schoolid', 'profileStatus'])
  },
  created() {
    profile.setVue(this)
    
    profile.getSchool((schoolinfo) => {
      profile.outFormdata(schoolinfo)
    })
    
    profile.getBosAck((resData) => {
        this.bosPolicy = resData
    })

  },
  methods: {
    onInput (key, e) {
      this.formDataEdit[key] = e.value
    },
    buttonClick () {
      profile.log(this.formDataEdit)
    },
    showPicker (key, title) {
      this.picker.key = key
      this.picker.title = title
      this.picker.data = PickerData[key]
      this.picker.value = this.formData[key]
      
      this.picker.show = true
      bmTool.resignKeyboard()
    },
    onPickerOK (values, labels) {
      //profile.log(values)
      this.formData[this.picker.key] = values
      this.formDataEdit[this.picker.key] = values[0]
      if (this.picker.key === 'areaid') {
        this.areaname = labels[0] 
        if (labels[1]) {
          this.areaname += labels[1]
          this.formDataEdit[this.picker.key] = values[1]
        }
      } else if (this.picker.key === 'gender') {
        this.gendername = labels[0]
      }
    },
    onCheckboxChange (value, item, key) {
      profile.log(value)
      if (key === 'mode') {
      if (item.length > 0) {
        let _value = []

        item.forEach(one => {
          _value.push(one.title)
        })
        this.formDataEdit[key] = _value.join()
      } else {
        this.formDataEdit[key] = ''
      }
      } else {
        this.formDataEdit[key] = value
      }
      bmTool.resignKeyboard()
    },
    pickAvatar() {
        const key = profile.getBosObjectKey('avatar', 'jpg')
		bmImage.uploadImage({
		url: profile.config.bos.endpoint,
    	maxCount: 1,
    	imageWidth: 1000,
    	allowCrop: true,
    	params: {
			accessKey: this.bosPolicy.accessKey,
			policy: this.bosPolicy.policy,
			signature: this.bosPolicy.signature,
			key: key
		},
    	header: {}
		},function(res){
		        profile.log(res)
		if(res.status === 0) {
			profile.outFormdata({thumb: profile.config.bos.imgHost + '/' + key})
		} else {
			
		}
//profile.log(res)
		})
	}
  }
}
</script>
