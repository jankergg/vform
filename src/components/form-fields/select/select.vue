<!--
      descript: select 行组件
        author: jankergg
        param: props
-->
<template>
  <div class="root-select">
    <div class="root-select-mask" v-if="isReadOnly"></div>
    <popup-picker
    :title="title"
    :data="list"
    :showName="showName"
    v-model="innerValue"
    @on-show="onShow"
    @on-hide="onHide"
    @on-change="onChange"
    :placeholder="placeholder"></popup-picker>
  </div>
</template>
<script>
  import { PopupPicker } from '../../vux'
  import rootSelectMx from './mixin/select-mixin'

  export default {
    name: 'za-select',
    data () {
      return {
        event: ''
      }
    },
    mixins: [rootSelectMx],
    props: {
      // 标题
      title: String,
      // 表单名
      name: String,
      // 是否可编辑
      formModel: {
        type: Object,
        default () {
          return {
            rules: {
              options: [[]]
            },
            value: ''
          }
        }
      }
    },
    watch: {
      'formModel.rules': {
        deep: true,
        handler (v) {
          if (v.options) {
            if (!Array.isArray(v.options) || (v.options.length && !Array.isArray(v.options[0]))) {
              throw new Error('rules.options 应该为二维数组')
            }
            if (typeof v.options[0][0] === 'object' && !v.showName) {
              console.error('需要在rules里添加showName:true')
            }
          }
        }
      }
    },
    methods: {
      // 把 innerValue由数组转化为字符
      __toValue (v) {
        return v[0]||''
      },
      innerModel () {
        let val = ''
        if (typeof this.innerValue === 'string') {
          val = this.innerValue[0]
        } else {
          val = this.innerValue
          let opts = this.formModel.rules.options
          if (opts && opts.length && opts[0].name) {
            val = this.formModel.rules.options[0].find(i => i.value && i.value === this.innerValue[0])
          }
        }
        val = (typeof this.__toValue === 'function') ? this.__toValue(val) : val
        // mixins update
        return {
          name: this.name,
          value: val,
          msg: this.isValid ? null : this.formModel.rules.errorMsg || this.formModel.rules.placeholder,
          isValid: this.isValid
        }
      }
    },
    components: {
      PopupPicker
    }
  }
</script>
<style lang='less' rel="stylesheet/less"></style>
