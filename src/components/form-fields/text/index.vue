 <!--
      descript: input 组件
        author: jankergg
        param: props
        example:
        <iform></iform>
        2017.9.9 modified by rickyshin
        add attr for type of number {
          type, min, max
        }
-->
<template>
  <div class="za-text">
    {{formModel.value}}
  </div>
</template>
<script>
export default {
  name: 'za-text',
  props: {
    index: [String, Number],
    name: String,
    formModel: Object
  }
}
</script>
<style lang='less' scoped>
@import "~@/assets/styles/form.less";
</style>
