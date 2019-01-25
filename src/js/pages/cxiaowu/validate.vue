<template>
  <div class="validate">
    <text v-for="(one, index) in msg"  :key="index" class="validate-info page-left-padded">{{index+1}}.{{one}}</text>
    <scroller>
      <header>
        <div class="header">
          <text class="header-cell page-left-padded">{{title}}</text>
        </div>
      </header>
      <bui-list-item :title="name" :label="label"></bui-list-item>
      <bui-list-item v-for="(one, index) in thumbs"  :key="index" :label="one.label">
        <image slot="title" :src="one.thumb?one.thumb:'bmlocal://assets/defaultAvatar.png'" style="width:350px;height:80px"></image>
        <div slot="action" class="validate-opt"><text class="link" @click="uploadPic(index)">上传</text><text class="link" @click="deletePic(index)">删除</text></div>
      </bui-list-item>
    </scroller>
  </div>
</template>

<style lang="less" scoped>
@import "../../../css/variable.less";
@import "../../../css/common.less";

.validate {
  &-info {
    line-height: 60px;
  }
  &-opt {
    width: 130px;
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>

<script>
import BuiListItem from '../../components/bui-list-item.vue'
import Validate from './validate.class'

const bmImage = weex.requireModule('bmImage') 

const validate = new Validate()

const MSG = {
	company: ['请上传公司有效证件（营业执照、组织机构代码证、税务登记证等）电子版本，以便网站核实认证;',
						'证件上的公司名称必须与填写的公司名称一致，并且图片需要清晰可辨;',
						'最少需要上传1张'],
	truename: ['请上传个人手持有效证件（身份证或护照等）照片，以便网站核实认证;',
						'证件上的姓名必须与填写的真实姓名一致，并且图片需要清晰可辨;']
}

export default {
  name: 'validate',
  components: { BuiListItem },
  props: {
    params: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      bosPolicy: null,
      msg: [],
      title: '',
      name: '',
      label: '',
      thumbs: []
    }
  },
  watch: {
    params: function() {
      this.setCurrentValidateData()
    }
  },
  created () {
    validate.setVue(this)

    this.setCurrentValidateData()
    
    validate.getBosAck((resData) => {
        this.bosPolicy = resData
    })
  },
  methods: {
    setCurrentValidateData () {
    	//console.log(this.params)
    	this.msg = MSG[this.params]
    	if(this.params == 'company') {
			this.title = '学校认证'
			this.label = '学校名称'
		} else if (this.params == 'truename') {
			this.title = '个人认证'
			this.label = '真实姓名'
		}
		
		validate.getInfo()
	},
	uploadPic (index) {
      if (this.bosPolicy === null) {
			this.$notice.toast({ message: '上传失败了' })
			return false
		}
        const key = validate.getBosObjectKey('validate', 'jpg')
		bmImage.uploadImage({
		url: validate.config.bos.endpoint,
    	maxCount: 1,
    	imageWidth: 1000,
    	allowCrop: false,
    	params: {
			accessKey: this.bosPolicy.accessKey,
			policy: this.bosPolicy.policy,
			signature: this.bosPolicy.signature,
			key: key
		},
    	header: {}
		},(res) => {
		        //profile.log(res)
			if(res.status === 0) {
				const imgUrl = validate.config.bos.imgHost + '/' + key
				
				validate.update(index, imgUrl, ()=>{
					this.thumbs[index].thumb = imgUrl
				})
			} else {
				this.$notice.toast({ message: '上传失败了' })
			}
		})
    },
    deletePic (index) {
		validate.update(index, '', ()=>{
			this.thumbs[index].thumb = ''
		}) 
	}
  }
}
</script>
