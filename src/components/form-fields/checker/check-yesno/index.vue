<!--
      descript: yes-no 组件
        author: jankergg
        param: props
        example:
-->
<template>
   <!-- 是否 类型 -->
  <div class="za-yesno">
    <div class="root-select-mask" v-if="isReadOnly"></div>
    <div class="za-yesno-box" :class="{dis: isReadOnly}">
      <span class="za-yesno-item" :class="{active: innerValue === 'Y'}" @click="onClick('Y')">是</span>
      <span class="za-yesno-item" :class="{active: innerValue === 'N'}" @click="onClick('N')">否</span>
    </div>
  </div>
  <!-- 是否 类型 -->
</template>

<script>
import rootSelectMx from '../mixin/check-mixin'

export default {
  name: 'za-yesno',
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
      this.onCheck()
      this.innerValue = v
    }
  }
}
</script>
<style lang='less'>
  @import '~@/assets/styles/form.less';
</style>
