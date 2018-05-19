<!--
descript: 单选组件
author: jankergg
param: props
methods:
seledcheck: 用于选择默认值 传入一个索引数即可
-->
<template>
  <div class="za-sex">
    <div class="root-select-mask" v-if="isReadOnly"></div>
    <div class="za-sex-box" :class="{dis: isReadOnly}">
      <div class="male" :class="{seled: innerValue === 'M'}" @click="onClick('M')">男</div>
      <div class="famale" :class="{seled: innerValue === 'F'}" @click="onClick('F')">女</div>
    </div>
  </div>
</template>
<script>
import rootSelectMx from '../mixin/check-mixin'

export default {
  name: 'za-sex',
  mixins: [rootSelectMx],
  props: ["formModel", "name", "index"],
  watch: {
    innerValue: {
      deep: true,
      handler (v) {
        this.onChange(v)
      }
    }
  },
  methods: {
    onClick (v) {
      this.onCheck(v)
      this.innerValue = v
    }
  }
}
</script>
<style lang='less'>
  @import '~@/assets/styles/form.less';
</style>
