<template>
  <div class="banner">
    <text class="banner-info page-left-padded">密码修改后需重新登录。</text>
    <scroller>
      <header>
        <div class="header">
          <text class="header-cell page-left-padded">设置轮播图片</text>
        </div>
      </header>
      <bui-list-item v-for="(img, index) in bannerList"  :key="index" :label="`图片${index+1}`">
        <image slot="title" :src="img" style="width:350px;height:80px"></image>
        <div slot="action" class="banner-opt"><text class="link" @click="uploadPic(index)">上传</text><text class="link" @click="deletePic(index)">删除</text></div>
      </bui-list-item>
    </scroller>
  </div>
</template>

<style lang="less" scoped>
@import "../../../css/variable.less";
@import "../../../css/common.less";

.banner {
  &-info {
    height: 60px;
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
import { mapState } from 'vuex'
import FormMixins from '../../class/form.mixins'
import BuiListItem from '../../components/bui-list-item.vue'
import AmButton from '../../components/am-button.vue'
import Banner from './banner.class'

const bmImage = weex.requireModule('bmImage')

const banner = new Banner()

export default {
  name: 'banner',
  components: { BuiListItem, AmButton },
  mixins: [FormMixins],
  data () {
    return {
      bosPolicy: null,
      banners: [],
      formData: {oldpassword: '', password: '', cpassword: ''}
    }
  },
  computed: {
    bannerList: function(){
    	const list = []
    	const num = this.banners.length
		for(let i=0; i < 5; i++){
			if(i < num) list.push(this.banners[i])
			else list.push('bmlocal://assets/defaultAvatar.png')
		}
		
		return list
	},
    ...mapState(['schoolid'])
  },
  created() {
    banner.setVue(this)
    
    banner.getSchool((userinfo) => {
      if (userinfo.banners.length > 0) this.banners = userinfo.banners
    })
    
    banner.getBosAck((resData) => {
        this.bosPolicy = resData
    })
  },
  methods: {
    uploadPic (index) {
      if (this.bosPolicy === null) {
			this.$notice.toast({ message: '上传失败了' })
			return false
		}
        const key = banner.getBosObjectKey('user', 'jpg')
		bmImage.uploadImage({
		url: banner.config.bos.endpoint,
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
				const imgUrl = banner.config.bos.imgHost + '/' + key
				
				const banners = this.banners
				if (index < banners.length) banners.splice(index, 1, imgUrl)
				else banners.push(imgUrl)
				
				banner.updateBanner(banners, this.banners[index])
			} else {
				this.$notice.toast({ message: '上传失败了' })
			}
		})
    },
    deletePic (index) {
		const banners = this.banners
		if (index < banners.length) {
			banners.splice(index, 1)
			banner.updateBanner(banners, this.banners[index])
		}
	}
  }
}
</script>
