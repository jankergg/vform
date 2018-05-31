<!--
  descript: 行组件 - 结构层 一行两栏
  author: jankergg
  param: props
-->
<template>
  <div class="weui-cell row2col" :class="{showsepline:showSepLine}">
    <div class="weui-cell__hd">
      <label class="weui-label"><slot name="label"></slot></label>
      <label class="weui-label"><slot name="subLabel"></slot></label>
    </div>
    <div class="weui-cell__bd">
      <slot name="val"></slot>
    </div>
    <div class="sepline" v-if="showSepLine"></div>
  </div>
</template>
<script>
  export default {
    name: 'row2col',
    computed: {
      showSepLine(){
        // TODO extend rules
        return this.$slots['subLabel']
      }
    }
  }
</script>
<style lang='less'>
@import '~@/assets/styles/row2col.less';
</style>
