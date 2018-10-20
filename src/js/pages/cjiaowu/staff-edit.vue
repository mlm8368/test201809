<template>
  <div>
    <bui-list-item label="入职时间" >
      <input :value="formData.jointime" @input="onInput('jointime', $event)" slot="title" class="input" type="date" placeholder="0000-00-00" />
    </bui-list-item>
    <div class="button"><am-button width="500px" size="small" text="修改" @click="buttonClick"></am-button></div>
  </div>
</template>

<style lang="less" scoped>
@import "../../../css/variable.less";

.input {
  height: @input-font-size + 20px;
  font-size: @input-font-size;
  tint-color: @input-tint-color;
} 
.button {
  width: 700px;
  justify-content: center;
  align-items: center;
  margin-top: @v-spacing-md;
  margin-bottom: @v-spacing-md;
}
</style>

<script>
import { mapState } from 'vuex'
import BuiListItem from '../../components/bui-list-item.vue'
import AmButton from '../../components/am-button.vue'
import StaffEdit from './staff-edit.class'

const staff = new StaffEdit()

export default {
  name: 'staff-edit',
  components: { BuiListItem, AmButton },
  props: {
    index: {
      type: Number,
      default: -1
    }
  },
  data () {
    return {
      formData: { id: 0, jointime: '' }
    }
  },
  computed: {
    ...mapState(['staffLists'])
  },
  watch: {
    index: function() {
      this.setCurrentStaffData()
    }
  },
  created () {
    staff.setVue(this)

    this.setCurrentStaffData()
  },
  methods: {
    setCurrentStaffData () {
      const staffInfo = this.staffLists[this.index]
      if (staffInfo) {
        this.formData.id = staffInfo.id
        this.formData.jointime = staffInfo.jointime
      }
    },
    onInput (key, e) {
      this.formData[key] = e.value
    },
    buttonClick () {
      staff.editStaff()
    }
  }
}
</script>
