<template>
  <text
    v-if="hasClick"
    @click="_click"
    class="am-icon"
    :class="iconClass"
    :style="iconStyle"
  >{{Icon[type] || type}}</text>
  <text
    v-else
    class="am-icon"
    :class="iconClass"
    :style="iconStyle"
  >{{Icon[type] || type}}</text>
</template>

<script>
const dom = weex.requireModule('dom')
export default {
  name: 'am-icon',
  props: {
    type: {
      type: String,
      default: 'home'
    },
    size: {
      type: [String, Number],
      default: 'md' // xxs,xs,sm,md,lg
    },
    color: {
      type: String,
      default: null
    },
    fontFamily: {
      type: String,
      default: 'SchoolIconFont'
    },
    hasClick: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      Icon: {
        'profile': '\ue7dd',
        'home': '\ue6b8',
        'right': '\ue7eb',
        'reload': '\ue788',
        'plus': '\ue7fe',
        'close': '\ue7fc',
        'close-circle': '\ue77d',
        'search': '\ue7e3',
        'scan': '\ue7d4',
        'notification': '\ue7da'
      }
    }
  },
  computed: {
    iconClass () {
      if (isNaN(this.size)) {
        return [`am-icon-${this.size}`]
      } else {
        return null
      }
    },
    iconStyle () {
      const style = {
        color: this.color,
        fontFamily: this.fontFamily
      }
      if (!isNaN(this.size)) {
        style.fontSize = this.size + 'px'
        style.lineHeight = this.size + 'px'
      }
      return style
    }
  },
  beforeCreate () {
    dom.addRule('fontFace', {
      'fontFamily': 'SchoolIconFont',
      //'src': "url('bmlocal://iconfont/iconfont-school.ttf')"
      'src': "url('https://at.alicdn.com/t/font_849649_2u90wlud0bb.ttf')"
    })
  },
  methods: {
    _click() {
      this.$emit("click")
    }
  }
}
</script>

<style scoped lang="less">
@import "../../css/variable.less";


.am-icon {

  &-xxs {
    font-size: @icon-size-xxs;
    line-height: @icon-size-xxs;
  }

  &-xs {
    font-size: @icon-size-xs;
    line-height: @icon-size-xs;
  }

  &-sm {
    font-size: @icon-size-sm;
    line-height: @icon-size-sm;
  }

  &-md {
    font-size: @icon-size-md;
    line-height: @icon-size-md;
  }

  &-lg {
    font-size: @icon-size-lg;
    line-height: @icon-size-lg;
  }

}
</style>