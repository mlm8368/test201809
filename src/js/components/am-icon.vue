<template>
  <text
    v-if="type"
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
      default: null
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
    }
  },
  data () {
    return {
      Icon: {
        /*
        'search': '\ueea3',
        'reload': '\uee47',
        'arrow-down': '\uee4a',
        'arrow-up': '\uee4b',
        'arrow-right': '\uee4c',
        'arrow-left': '\uee4d',
        'down': '\uee4e',
        'up': '\uee4f',
        'right': '\uee50',
        'left': '\uee51',
        'warning-circle': '\uee5d',
        'warning-circle-o': '\uee5e',
        'close-circle': '\uee5f',
        'close-circle-o': '\uee60',
        'check-circle': '\uee61',
        'check-circle-o': '\uee62',
        'check': '\uee63',
        'clock-circle': '\uee71',
        'clock-circle-o': '\uee72',
        'ellipsis': '\ueee4',
        'loading': '\ueee3'
        */
        'profile': '\ue7dd',
        'home': '\ue6b8'
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
      'src': "url('bmlocal://iconfont/iconfont-school.ttf')"
    })
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