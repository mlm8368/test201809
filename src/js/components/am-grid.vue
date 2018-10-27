<template>
  <div :class="gridClass">
    <div
      v-for="(row, rowIndex) in rowArr"
      :key="rowIndex"
      class="am-grid-row"
    >
      <div
        v-for="(item, index) in row"
        :key="index"
        :class="getItemClass(item)"
        :style="_itemStyle"
        @click="handleClick($event, item)"
      >
        <template v-if="item">
          <image
            class="am-grid-icon"
            :style="_iconStyle"
            :src="item.icon"
          />
          <text v-if="item.text" class="am-grid-text">{{item.text}}</text>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
const makeClassList = classList => {
  if (Array.isArray(classList)) {
    return classList
  }else {
    return Object.keys(classList).filter(classname => classList[classname])
  }
}

export default {
  name: 'am-grid',
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    },
    columnNum: {
      type: Number,
      default: 4
    },
    hasLine: {
      type: Boolean,
      default: true
    },
    itemStyle: {
      type: Object,
      default () {
        return {}
      }
    },
    iconStyle: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    rowArr () {
      const rowArr = []
      let rowCount
      this.data.forEach((item, index) => {
        rowCount = Math.floor(index / this.columnNum)
        if (!rowArr[rowCount]) {
          rowArr[rowCount] = []
        }
        rowArr[rowCount].push(item)
      })
      while (rowArr[rowCount].length !== this.columnNum) {
        rowArr[rowCount].push(false)
      }
      return rowArr
    },
    gridClass () {
      return makeClassList({
        'am-grid': true,
        'am-grid-line': this.hasLine
      })
    },
    itemClass () {
      return makeClassList({
        'am-grid-item': true,
        'am-grid-item-line': this.hasLine
      })
    },
    itemWidth () {
      return 750 / this.columnNum
    },
    _itemStyle () {
      return {
        height: `${this.itemWidth}px`,
        ...this.itemStyle
      }
    },
    _iconStyle () {
      let width = `${this.itemWidth * 0.28}px`
      return {
        width: width,
        height: width,
        ...this.iconStyle
      }
    }
  },
  methods: {
    handleClick ($event, item) {
      if (item) {
        this.$emit('click', item, this.data.indexOf(item))
      }
    },
    getItemClass (item) {
      return makeClassList({
        'am-grid-item': true,
        'am-grid-item-line': this.hasLine,
        'am-grid-item-tap': !!item
      })
    }
  }
}
</script>

<style scoped lang="less">
@import "../../css/variable.less";

.am-grid {
  &-line {
    border-color: @border-color-base;
    border-bottom-width: @border-width-sm;
    border-left-width: @border-width-sm;
  }
  &-row {
    flex-direction: row;
    justify-content: flex-start;
    align-items: stretch;
    flex-wrap: nowrap;
  }
  &-item {
    flex: 1;
    justify-content: center;
    align-items: center;
    &-line {
      border-right-width: @border-width-sm;
      border-top-width: @border-width-sm;
      border-color: @border-color-base;
    }
    &-tap:active {
      background-color: @fill-tap;
    }
  }
  &-icon {
    margin-top: @v-spacing-md;
  }
  &-text {
    margin-top: @v-spacing-md;
    font-size: @font-size-caption-sm;
    color: @color-text-base;
  }
}
</style>