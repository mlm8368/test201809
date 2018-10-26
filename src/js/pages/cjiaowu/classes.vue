<template>
  <div>
    <am-nav-bar 
      ref="amnavbar"
      text-color="#FFFFFF"
      :background-color="navBarBgColor"
      :left-btn = "[{is: 'text', text: `共 ${total} 班`, key: 'total'}]"
      :right-btn="[{is: 'text', text: '添加班级', key: 'add', onClick: () => { this.editIndex = -1 }}]"></am-nav-bar>
    <scroller class="list">
      <bui-list-item v-for="(one, index) in lists" :key="index" :title="one.classesname" :active-bg="true" @cellClick="chooseClasses(index)">
        <wxc-rich-text-tag v-if="classesid === one.id" slot="label" tag-value="当前" tag-theme="blue"></wxc-rich-text-tag>
        <am-button size="small" type="warning" text="编辑" @click="editIndex = index"></am-button>
      </bui-list-item>
    </scroller>
    <template v-if="editIndex > -2">
      <div class="form-header">
        <text class="form-header-title">{{formTitle}}</text>
      </div>
      <scroller class="form">
        <bui-list-item label="名称" >
          <input :value="formData.classesname" @input="formData.classesname = $event.value" slot="title" class="form-input" placeholder="班级名称" />
        </bui-list-item>
        <bui-list-item label="排序" >
          <input :value="formData.listorder" @input="formData.listorder = $event.value" type="number" slot="title" class="form-input" />
        </bui-list-item>
        <bui-list-item label="开始时间" >
          <input :value="formData.startdate" @input="formData.startdate = $event.value" type="date" slot="title" class="form-input" placeholder="0000-00-00" />
        </bui-list-item>
        <bui-list-item label="结束时间" >
          <input :value="formData.enddate" @input="formData.enddate = $event.value" type="date" slot="title" class="form-input" placeholder="0000-00-00" />
        </bui-list-item>
        <div class="form-button">
          <am-button v-if="editIndex === -1" size="small" text="添加班级" @click="buttonClick('add')"></am-button>
          <template v-else>
            <am-button size="small" text="提交修改" @click="buttonClick('edit')"></am-button>
            <am-button size="small" text="删除班级" type="warning" style="margin-left: 10px" @click="buttonClick('del')"></am-button>
          </template>
        </div>
      </scroller>
    </template>
  </div>
</template>

<style lang="less" scoped>
@import "../../../css/variable.less";

.wrap {
  background-color: red;
}
.list {
  // height: 600px;
  flex: 1;
}
.form {
  height: 400px;

  &-header {
    flex-direction: row;
    align-items: center;
    background-color: @color-text-secondary;

    &-title {
      height: @list-title-height;
      line-height: @list-title-height;
      padding-left: @page-padding-spacing;
      color: @color-text-base;
    }
  }

  &-input {
    height: @input-font-size + 20px;
    font-size: @input-font-size;
    tint-color: @input-tint-color;
  } 

  &-button {
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: @v-spacing-md;
    margin-bottom: @v-spacing-md;
  }
}
</style>

<script>
import { mapState } from 'vuex'
import AmNavBar from '../../components/am-nav-bar.vue'
import BuiListItem from '../../components/bui-list-item.vue'
import AmButton from '../../components/am-button.vue'
import WxcRichTextTag from '../../components/wxc-rich-text-tag.vue'
import Classes from './classes.class'

const classes = new Classes()

export default {
  name: 'classes',
  components: { AmNavBar, BuiListItem, AmButton, WxcRichTextTag },
  props: {
    navBarBgColor: {
      type: String,
      default: '#108ee9'
    }
  },
  data () {
    return {
      editIndex: -2,
      lists: [],
      formData: { id: 0, classesname: '', listorder: 0, startdate: '', enddate: '' }
    }
  },
  computed: {
    total: function() {
      return this.lists.length
    },
    formTitle: function() {
      let title = '添加一个新班级'
      if (this.editIndex > -1) title = '编辑班级信息'
      return title
    },
    ...mapState(['schoolid', 'classesid'])
  },
  created () {
    classes.setVue(this)
    if (this.schoolid) classes.getClasses((lists) => {
      this.lists = lists
    })
  },
  watch: {
    editIndex: function(val) {
      if (val === -1) {
        this.formData = { id: 0, classesname: '', listorder: this.lists.length + 1, startdate: '', enddate: '' }
      } else {
        this.formData = Object.assign(this.formData, this.lists[val])
      }
    }
  },
  methods: {
    buttonClick (op) {
      if (op === 'add' || op === 'edit') {
        if (!this.formData.classesname) {
          this.$notice.alert({ message: '请填写班级名称' })
          return false
        }
        if (!this.formData.startdate) {
          this.$notice.alert({ message: '请填写开始日期' })
          return false
        }
        if (!this.formData.enddate) {
          this.$notice.alert({ message: '请填写结束日期' })
          return false
        }
        
        classes.editClasses(op)
      } else if (op === 'del') {
        classes.delClasses()
      }
    },
    chooseClasses(index) {
      this.$store.commit('setClassesid', this.lists[index].id)
      this.$emit('closePopup')
    }
  }
}
</script>
