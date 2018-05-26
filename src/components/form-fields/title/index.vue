 <!--
      descript: title 组件
        author: jankergg
        param: props
-->
<template>
  <div class="form-title" :class="className">
    <div class="msg">
        <slot>
          {{formModel && formModel.rules.label}}
        </slot>
    </div>
    <div class="icon"><slot name="icon"></slot></div>
  </div>
</template>
<script>
  export default {
    name: 'za-title',
    props: ['formModel', 'showExtra', 'name', 'className']
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
@import '~@/assets/styles/form-title.less';
</style>
