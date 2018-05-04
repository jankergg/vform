<!--
      descript: input-row 组件
      note: 新表单类型需要先在该组件注册
        author: jankergg
        param: props {
          formModels // 表单值 数据结构
          formRules // 表单初始化属性，包含name/type/验证规则等等
        }
        example:
        <root-input
          v-if="$formRules[item.name].rules.type=='input'"
          @formChange="onChange"
          @formPassed="onVlid"
          :rules="$formRules[item.name].rules"
          :value="item.value"
          :name="item.name">
        </root-input>
-->
<template>
  <row-1-col>
    <template slot="label" v-if="formModel.rules.label">{{formModel.rules.label}}</template>
    <template slot="val">
      <slot :name="name">
        <component v-if="formModel.rules.type"
        :is="getType(formModel.rules.type)"
        :formModel="formModel"
        :index="index"
        :slotItem="getSlotItem(name)"
        :name="name">
        </component>
      </slot>
    </template>
  </row-1-col>
</template>

<script>
  import {ROOT_ITEM, FORM_BLOCK_ITEM} from '../form-fields'
  import formSlotMixin from '../form-units/mixin/form-slot-mixin'
  import row1Col from './row1col'

  export default {
    name: 'form-block',
    components: {
      ...ROOT_ITEM,
      ...FORM_BLOCK_ITEM,
      row1Col
    },
    mixins: [formSlotMixin],
    props: {
      formModel: {
        type: [Array, Object],
        default () {
          return {
            name: 'name',
            value: ''
          }
        }
      },
      name: {
        type: String
      },
      index: {
        type: [String, Number]
      }
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
        if (!name) {
          throw new Error('请检查block组件内是否声明type:' + type)
        }
      }
    }
  }
</script>
