 <!--
      descript: title 组件
        author: jankergg
        param: props
-->
<template>
  <div class="form-title">
    <div class="msg">{{formModel.rules.label}}</div>
  </div>
</template>
<script>
  export default {
    name: 'za-title',
    props: ['formModel', 'showExtra', 'name']
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
@import '../../../styles/form-title.less';
</style>
