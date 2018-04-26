<!--
      descript: title- 组件
        author: jankergg
        param: props
        example:
-->
<template>
   <!-- title 类型 -->
  <div class="head">
    <div class="baseBoxLeft">
      <slot name="label"></slot>
      <div class="msg">{{$rules.label}}</div>
    </div>
    <div class="baseBoxright">
      <slot name="val"></slot>
      <div class="msg">{{innerValue}}</div>
    </div>
  </div>
  <!-- title 类型 -->
</template>
<script>

export default {
  name: 'title-item',
  type: 'title',
  props: ['model', 'value', 'name'],
  computed: {
    $rules: {
      get () {
        return this.model.rules
      }
    },
    innerValue () {
      return this.model.value
    }
  },
  methods: {
    onChange (e) {
      this.$emit('formChange', e)
    },
    onVlid (e) {
      this.$emit('formValid', e)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped></style>
