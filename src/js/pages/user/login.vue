<script lang="js" src="./login.js"></script>
<template>
  <div class="Container" :style="{'height':pageHeight}">
    <wxc-loading
      :show="loadShow"
      need-mask="true"
    />
      <div class="imgBox">
          <image src="bmlocal://assets/logo.png" style="width: 150px;height:150px;" />
      </div>
      <div class="formBox">
          <text style="font-size:32px;">用户名：</text>
          <input
              style="width:490px;font-size: 32px;line-height:60px;border-bottom-width: 1px;border-bottom-color: #4a4a4a;border-bottom-style:solid"
              type="text"
              :singleline= true
              placeholder="请输入用户名"
              v-model="mobile"
          >
      </div>
      <div class="formBox">
          <text style="font-size:32px;">密码：</text>
          <input
              style="width:490px;font-size: 32px;line-height:60px;border-bottom-width: 1px;border-bottom-color: #4a4a4a;border-bottom-style:solid"
              type="password"
              :singleline= true
              placeholder="请输入密码"
              v-model="password"
          >
      </div>
      <text :class="['login',pressed?'pressed':'']"   @click="submit">登录</text>
  </div>
</template>
<style scoped>
  .Container{background-color: #FFFFFF;align-items: center;}
  .imgBox{text-align: center;align-items: center;margin-top:300px;margin-bottom:100px}
  .formBox{flex-direction: row;width: 600px;margin-top:50px;justify-content: space-between;align-items: center}
  .pressed{ box-shadow: 20px  10px 5px rgba(255, 69, 0, 0.8); }
  .login{
    width: 480px;
    line-height: 76px;
    background-color: #1da1f2;
    color:white;
    text-align: center;
    border-radius:8px;
    margin-top:60px;
  }
</style>