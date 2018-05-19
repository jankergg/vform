<!--
  descript: 行组件 - 结构层 一行
  author: jankergg
  param: props
-->
<template>
  <div class="weui-cell row1col">
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
    name: 'row1col'
  }
</script>
<style lang='less'>
@import '~@/assets/styles/row1col.less';
</style>
