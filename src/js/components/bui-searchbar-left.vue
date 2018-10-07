<template>
    <div :class="['flex-row', 'row-center-left', 'bui-searchbar', 'bui-search-bg']" @click="onfocusFn()">
        <div :class="['flex-row', 'row-center-left', 'span1', 'bui-input']">
            <am-icon type="search"></am-icon>
            <input ref="inputSearch"  class="span1 bui-search-input-text" @focus="onfocus($event)" @blur="onblur($event)" @input="oninput($event)" :value="valueNew" :autofocus="autofocusNew"  @return="search" return-key-type="search" type="text" :placeholder="placeholder"/>
            <am-icon class="bui-search-icon-delete" @click="onclear($event)" v-if="deletestatus" type="close-circle"></am-icon>
        </div>
        <text :class="['bui-search-search', 'bui-search-text-color']" @click="search()" v-if="searchstatus">搜索</text>
    </div>
</template>

<style lang="less" scoped>
.flex-row {
  flex-direction: row;
}
.row-center-left {
  justify-content: flex-start;
  align-items: center;
}
.span1 {
  flex: 1;
}

.bui-searchbar {
  padding-left: 20;
  padding-top: 15;
  padding-right: 20;
  padding-bottom: 15;
}
.bui-input {
  background-color: #ffffff;
  border-radius: 10;
  padding-left: 20;
  padding-top: 15;
  padding-right: 20;
  padding-bottom: 15;
  position: relative;
}
.bui-search-icon-box-text {
  color: #9ea7b4;
  font-size: 30;
  padding-left: 15;
}
.bui-search-input-text {
  font-size: 30;
  height: 40;
  padding-left: 10;
  padding-right: 10;
}
.bui-search-search {
  font-size: 30;
  padding-left: 15;
  padding-top: 15;
  padding-right: 10;
  padding-bottom: 15;
}
.bui-search-bg {
  background-color: #f5f5f5;
}
.bui-search-text-color {
  color: #657180;
}
</style>

<script>
import AmIcon from "./am-icon.vue";

export default {
  name: 'bui-searchbar-left',
  components: { AmIcon },
  props: {
    placeholder: {
      type: String,
      default: "请输入搜索内容"
    },
    value: {
      type: String,
      default: ""
    },
    autofocus: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      deletestatus: false,
      searchstatus: false,
      autofocusNew: false,
      valueNew: ""
    };
  },
  created() {
    this.autofocusNew = this.autofocus;
    this.valueNew = this.value;
  },
  methods: {
    //搜索框触发输入焦点
    onfocusFn(event) {
      this.autofocusNew = true;
    },
    //搜索获得输入焦点
    onfocus(event) {
      this.searchstatus = true;
      this.$emit("focus", event);
    },
    //搜索失去输入焦点
    onblur(event) {
      this.autofocusNew = false;
      this.$emit("blur", event);
    },
    //搜索输入值更改
    oninput(event) {
      this.valueNew = event.value;
      if (this.valueNew.length == 0) this.deletestatus = false;
      else this.deletestatus = true;
      this.$emit("input", event);
    },
    //清除搜索输入值
    onclear(event) {
      this.autofocusNew = false;
      this.deletestatus = false;
      this.valueNew = "";
      this.$emit("clear");
    },
    //搜索
    search() {
      this.$emit("search", this.valueNew);
    },
    //关闭键盘
    hideKeyboard() {
      this.$refs.inputSearch.blur();
    }
  }
}
</script>