<template>
    <div class="radio-box flex-row"
         :class="[isOpacity]"
         @click="_click"
         :accessible="true"
         :aria-label="`${title},${checked?'已选中':'未选中'}`">
        <am-icon
                v-if="textDirection === 'right'"
                @click="_click"
                :size="iconSize"
                :type="iconName"
                :color="lasetColor"></am-icon>
        <text class="radio-label" :class="[fullCell]" :style="Object.assign({}, cTitleStyle, textStyles)">{{title || value}}</text>
        <!--<text class="radio-label" :class="['cb-flex-9']" :style="">jjjjjdsfs sfsdf s</text>-->
        <am-icon
                v-if="textDirection === 'left'"
                @click="_click"
                :size="iconSize"
                :type="iconName"
                :color="lasetColor"></am-icon>
    </div>

</template>

<script>
    import AmIcon from './am-icon.vue';
    export default {
        components: { AmIcon },
        props: {
            "textDirection": {
                type: String,
                default: "right"
            },
            "leftColumn":{
                type: Boolean,
                default: false
            },
            "index": {
                type: Number,
                default: -1
            },
            // 是否可选
            "disabled": {
                type: Boolean,
                default: false
            },
            // 是否选中
            "selected": {
                type: Boolean,
                default: false
            },
            // 标题
            "title": {
                type: String,
                default: ''
            },
            "fontSize": {
                type: String,
                default: '30px'
            },
            "iconSize": {
                type: String,
                default: '48px'
            },
            // 正常状态文字色值
            "color": {
                type: String,
                default: '#9ea7b4'
            },
            // 选中状态文字色值
            "selectedColor": {
                type: String,
                default: '#00cc66'
            },
            "selectIcon": {
                type: String,
                default:"check-square-fill"
            },
            "unSelectedIcon": {
                type: String,
                default:"check-square"
            },
            "textStyles": {
                type: Object
            },
        },
        computed: {
            //多格筛选项外框样式
            isOpacity () {
                const { disabled } = this;
                return disabled ? 'disabled' : 'undisabled'
            },
            //多格筛选项文字样式
            cTitleStyle () {
                const { color, selectedColor, fontSize } = this;
                const { selected } = this;
                return {
                    "font-size": fontSize,
                    "color": selected ? selectedColor : color,
                    "marginLeft" : '5px'
                }
            },
            lasetColor(){
                const { color, selectedColor } = this;
                const { selected } = this;
                return selected ? selectedColor : color
            },
            iconName(){
                const { selectIcon, unSelectedIcon } = this;
                const { selected } = this;
                return selected ? selectIcon : unSelectedIcon
            },
            fullCell(){
                const { leftColumn } = this;
                return leftColumn ? 'cb-flex-9' : ''
            }
        },
        methods: {
            _click () {
                if (!this.disabled) {
                    this.$emit('select', this.index);
                }
            },
        }
    }
</script>

<style lang="less" scoped>

.radio-box {
  align-items: center;
}
.checkbox{
  border-bottom-width: 1px;
  border-bottom-color: #e2e2e2;
}
.checkbox:active{
  background-color: #f5f5f5;
}

.radio-label {
  font-size: 30px;
}

.disabled {
  opacity: 0.5;
}
.undisabled{
  opacity: 1;
}

.switch-box {
  height: 80px;
  flex-direction: row;
  align-items: center;
  background-color: #ffffff;
}

.switch {
  position: absolute;
  right: 0px;
  top: 15px;
}

.switch-label {
  font-size: 30px;
}

.flex-column {
  flex-direction: column;
}

.flex-row {
  flex-direction: row;
}

.flex-fluid{
  flex-wrap: wrap;
}

.cb-flex-9{
  flex: 9;
}
.cb-flex-1{
  flex: 1;
  flex-direction:row;
  justify-content:flex-end;
}
</style>
