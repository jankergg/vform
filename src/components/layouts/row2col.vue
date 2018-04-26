<!--
  descript: 行组件 - 结构层 一行两栏
  author: jankergg
  param: props
-->
<template>
  <div class="weui-cell row2col">
    <div class="weui-cell__hd">
      <label class="weui-label"><slot name="label"></slot></label>
    </div>
    <div class="weui-cell__bd">
      <slot name="val"></slot>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'row2col'
  }
</script>
<style lang='less'>
@import '../styles/row2col.less';
</style>
