<template>
    <div class="bui-list-swipe-menu">
        <div class="bui-cell-swipe-menu" :style="{'height': height}">
            <div class="bui-list-swipe" ref='swipeBox'>
                <slot name="action">
                    <div class="bui-list-swipe-btn" :style="{'background-color': item.bgcolor}" @click="_actionClick(index)" :key="index" v-for="(item, index) in items">
                        <text class="bui-list-swipe-btn-text">{{item.title}}</text>
                    </div>
                </slot>
            </div>
            <div @click="_click" @swipe="_swipe($event)" class="bui-list-main bui-list-swipe-main" ref="swipedom">
                <div class="bui-list-main-left">
                    <slot name="content">
                        <text class="bui-list-title" v-if="title">{{title}}</text>
                    </slot>
                </div>
            </div>

        </div>
    </div>
</template>
<style scoped lang="less">
.bui-cell-swipe-menu{
  lex-direction: row;
  //height: $nb120;
  border-bottom-width: 1px;
  border-bottom-color: $color_border;
  border-bottom-style: solid;
}
.bui-list-swipe{
  position: absolute;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  flex-direction: row;
  justify-content: flex-end;
}
.bui-list-swipe-btn{
  flex-direction: row;
  width: 120px;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: #c6c7c8;
}
.bgRed{
  background-color: $color_danger_active;
}
.bui-list-swipe-btn-text{
  font-size: 30px;
  color: $color_white;
}
.bui-list-swipe-main{
  flex-direction: row;
  justify-content: flex-start
}
</style>
<script>
    const animation = weex.requireModule('animation');
    let defaultAction=[
        {
            'title': '取消',
            'bgcolor' : '#c6c7c8'
        },
        {
            'title': '删除',
            'bgcolor' : '#fa3300'
        }
    ];
    module.exports = {
	    data: function () {
	            return {
	                ss : ''
	                }
	        },
        props: {
            items: {
                type: Array,
                default(){
                    return defaultAction;
                }
            },
            height: {
                type: String,
                default: '100px'
            },
            title: {
                type: String
            }
        },
        methods: {
            //操作点击事件
            _actionClick (index){
                this.close(()=>{
                    this.$emit('actionClick', index);
                });
            },
            _swipe(e){
                switch (e.direction) {
                    case 'left':
                        this.open(()=>{
                            this.$emit('swipeleft');
                        });
                        break;
                    case 'right':
                        this.close(()=>{
                            this.$emit('swiperight');
                        });
                        break;
                }
            },
            _click(){
                this.$emit('click');
                this.close();
            },
            close(fn){
                let translate = 'translate(0px, 0px)';
                let el = this.$refs.swipedom;
                this._animationFn(el, 1, translate, 'ease-in',()=> {
                    fn && fn();
                });
            },
            open(fn){
                let swipeDom = this.$refs.swipeBox;
                let lenDom;
                if(swipeDom.hasOwnProperty('pureChildren')) lenDom = swipeDom.pureChildren;
                else lenDom = this.$refs.swipeBox.children;
                let len = (lenDom&&lenDom.length)||0;
                let translate = 'translate(-'+120*len+'px, 0px)';
                let el = this.$refs.swipedom;
                this._animationFn(el, 1, translate, 'ease-in',()=>{
                    fn && fn();
                });
            },
            _animationFn (el, opacity, translate, timing, fn){
                animation.transition(el, {
                    styles: {
                        opacity: opacity,
                        transform: translate,
                        transformOrigin: 'center center'
                    },
                    duration: 200,
                    timingFunction: timing,
                    delay: 0
                }, () => {
                    fn && fn();
                });
            }
        }
    }
</script>
