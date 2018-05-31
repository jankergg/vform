<!--
descript: 单选组件
author: jankergg
param: props
methods:
seledcheck: 用于选择默认值 传入一个索引数即可
-->
<template>
  <div class="za-button_group">
    <div class="root-select-mask" v-if="isReadOnly"></div>
    <div class="za-button_group-box" :class="{dis: isReadOnly}" v-if="options">
      <div class="button-item"
      v-for="(item, index) in options" :key="index"
      :class="{active: innerValue == item.value}"
      @click="onClick($event, item, index)"
      >{{item.name}}</div>
    </div>
  </div>
</template>
<script>
import rootSelectMx from '../mixin/check-mixin'

export default {
  name: 'za-button_group',
  mixins: [rootSelectMx],
  props: ["formModel", "name", "index"],
  data(){
    return {
      options: [],
      current: null
    }
  },
  created (){
    this.options = this.$optionList
  },
  computed: {
    $optionList: {
      get(){
        let rules = this.formModel.rules
        if (!rules.options) {
          return []
        }
        if (!Array.isArray(rules.options)){
          console.error('rule.options 应该是一个数组')
          return []
        }
        if (Array.isArray(rules.options[0])){
          return rules.options[0]
        }
        return rules.options
      }
    }
  },
  watch: {
    innerValue: {
      deep: true,
      handler (v) {
        this.onChange(v)
      }
    },
    formModel: {
      deep: true,
      handler (v){
        this.options = this.$optionList
        this.innerValue = v.value
      }
    }
  },
  methods: {
    onClick (e, item, index) {
      this.current = index
      this.onCheck(item.value)
      this.innerValue = item.value
    }
  }
}
</script>
<style lang='less'>
  @import '~@/assets/styles/variable.less';
  @import '~@/assets/styles/form.less';
</style>
