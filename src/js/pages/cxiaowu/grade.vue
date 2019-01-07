<template>
  <div class="grade">
    <text class="grade-info page-left-padded">密码修改后需重新登录。</text>
	<scroller>
      <header>
        <div class="header">
          <text class="header-cell page-left-padded">升级VIP</text>
        </div>
      </header>
      <template v-if="gradeinfo.havedays > 0">
      <bui-list-item label="到期时间" :title="gradeinfo.totime"></bui-list-item>
      <bui-list-item label="剩余天数" :title="`${gradeinfo.havedays} 天`"></bui-list-item>
      </template>
      <bui-list-item label="服务费用" :title="`${gradeinfo.fee} 元/年`"></bui-list-item>
      <bui-list-item label="服务年限" >
        <div slot="title" @click="showPicker('year', '服务年限')">
          <text v-if="gradeinfo.year.length > 0">{{`${gradeinfo.year[0]} 年`}}</text>
          <text v-else>请选择</text>
        </div>
      </bui-list-item>
      <bui-list-item label="应付总额" :title="`${formData.fee} 元`"></bui-list-item>
      <div class="grade-button"><am-button width="500px" size="small" text="提交申请" @click="buttonClick"></am-button></div>
    </scroller>
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

.grade {
  &-info {
    height: 60px;
    line-height: 60px;
  }
  &-button {
    width: 700px;
    justify-content: center;
    align-items: center;
    margin-top: @v-spacing-md;
    margin-bottom: @v-spacing-md;
  }
}
</style>

<script>
import FormMixins from '../../class/form.mixins'
import BuiListItem from '../../components/bui-list-item.vue'
import AmPicker from '../../components/am-picker.vue'
import AmButton from '../../components/am-button.vue'
import Grade from './grade.class'

const grade = new Grade()

export default {
  name: 'grade',
  components: { BuiListItem, AmPicker, AmButton },
  mixins: [FormMixins],
  data () {
    return {
      gradeinfo: {totime:'0000-00-00', havedays: 0, fee: 0, year: []},
      formData: {year: 0, fee: 0},
      picker: { key: '', show: false, title: '请选择', data: [], value: [] },
      pickerData: {year: [[{ label: '1年', value: '1' },{ label: '2年', value: '2' },{ label: '3年', value: '3' },{ label: '4年', value: '4' },{ label: '5年', value: '5' }]]}
    }
  },
    created() {
      grade.setVue(this)
      this.gradeinfo.havedays = 10
      this.gradeinfo.fee = 3000
      this.gradeinfo.year.push('1')
      this.formData.fee = 3000
    },
    methods: {
      buttonClick () {
        grade.save()
      },
      showPicker (key, title) {
      this.picker.key = key
      this.picker.title = title
      this.picker.data = this.pickerData[key]
      this.picker.value = this.gradeinfo[key]
      this.picker.show = true
    },
    onPickerOK (values, labels) {
		this.gradeinfo[this.picker.key] = values
		this.formData[this.picker.key] = values[0]
		this.formData['fee'] = values[0] * this.gradeinfo.fee
	}
    }
}
</script>
