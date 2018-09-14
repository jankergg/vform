<!--
      descript: input-row 组件 html 结构层
      将 form-unit 过来的数据进行单向传递
      在这个组件修改样式
-->
<template>
  <row-2-col v-show="formModel.rules&&formModel.rules.hasOwnProperty('rowshow')?formModel.rules.rowshow:true">
    <template slot="label" v-if="formModel.rules.label">{{formModel.rules.label}}</template>
    <template slot="subLabel" v-if="formModel.rules.subLabel">{{formModel.rules.subLabel}}</template>
    <template slot="val" v-if="formModel.rules.type">
      <component
        :is="getType(formModel.rules.type)"
        :formModel="formModel"
        :index="index"
        :name="name">
      </component>
    </template>
  </row-2-col>
</template>

<script>
  import {ROOT_ITEM, FORM_ROW_ITEM} from '../form-fields'
  import row2Col from './row2col'
  export default {
    name: 'form-row',
    components: {
      row2Col,
      ...ROOT_ITEM,
      ...FORM_ROW_ITEM
    },
    props: {
      formModel: Object,
      index: [Number, String],
      name: String,
      // 获取formUnit内的slot
      slots: [Array, Object]
    },
    methods: {
      getType (type) {
        let coms = this.$options.components
        let name = ''
        for (let i in coms) {
          if (coms[i].name === type) {
            name = i
            return name
          }
        }
        // 如果存在于slot中
        if (this.slots[type]) {
          return type
        }
        throw new Error('表单' + type + '类型不存在！')
      }
    }
  }
</script>
