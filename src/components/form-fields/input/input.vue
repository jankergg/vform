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
  <input
    class="weui-input"
    @keyup="eventHandler($event,'keyup')"
    @input="eventHandler($event,'input')"
    @change="eventHandler($event,'change')"
    @blur="eventHandler($event,'blur')"
    @focus="eventHandler($event,'focus')"
    :placeholder="formModel.rules.placeholder"
    :maxlength="formModel.rules.maxlength"
    :value="innerValue"
    :name="name"
    :class="{'weui-cell_warn': !isValid}"
    :readonly="formModel.rules.readOnly"
    :disabled="formModel.rules.disabled" />
</template>
<script>
  import formMixin from './mixin/input-mixin'
  export default {
    name: 'za-input',
    mixins: [formMixin]
  }
</script>
