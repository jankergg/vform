<!--
  descript: form-unit 表单 单元组件
    author: jankergg
    param: props {
      formModels // 表单值 数据结构, 表单初始化属性，包含name/type/验证规则等等
      titleConfig 表单title
  }
  example:
    <form-unit
    :formModels="formModels"
    @formChange="onChange"
    @formValid="onValid">
      <template slot="testInput3">
        <root-input
        @formChange="onChange"
        @formPassed="onValid"
        :rules="props.rule.rules"
        :value="props.item.value"
        :name="props.item.name">
        </root-input>
      </template>
    </form-unit>
    TODO:
    formChange 参数 添加触发类型：input/click/change/modelChange
-->
<template>
  <div class="weui-cells_unit">
    <!-- title slot -->
    <div class="weui-cells__title" v-if="titleConfig">
      <slot name="unit-title" :index="index" :titleConfig="titleConfig"></slot>
    </div>
    <div class="weui-cells weui-cells_form">
      <template v-for="(model, key, index) in formModels">
        <slot v-if="$slots[key]" :name="key" :index="index" :formModel="model">

        </slot>
        <component
        v-else
        :is="getType(model.rules.type)"
        :key="key"
        :index="index"
        :formModel="model"
        :name="key"
        :slots="$slots"
        @formChange="onChange">
        </component>
      </template>
    </div>
  </div>
</template>

<script>
import formUnitBase from './base'
export default formUnitBase.extend({
  name: 'form-unit',
  created () {
    // debug only TODO: remove this
    window.fu = this
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
@import '../../../styles/form.less';
</style>
