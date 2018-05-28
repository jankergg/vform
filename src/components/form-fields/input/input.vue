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
  <div :class="{'weui-input_fix': extraClass}">
    <input
    class="weui-input"
    @keyup="eventHandler($event,'keyup')"
    @input="eventHandler($event,'input')"
    @change="eventHandler($event,'change')"
    @blur="eventHandler($event,'blur')"
    @focus="eventHandler($event,'focus')"
    v-model="innerValue"
    :placeholder="formModel.rules.placeholder"
    :maxlength="formModel.rules.maxlength"
    :name="name"
    :class="{'weui-cell_warn': !isValid}"
    :readonly="formModel.rules.readOnly"
    :disabled="formModel.rules.disabled" />
    <div class="input-extra" v-if="formModel.rules.extra">
      <slot></slot>
      <div v-if="formModel.rules.extra.text" :class="formModel.rules.extra.class">{{formModel.rules.extra.text}}</div>
      <button v-if="formModel.rules.extra.btn" :class="formModel.rules.extra.class">{{formModel.rules.extra.btn}}</button>
    </div>
  </div>
</template>
<script>
  import formMixin from './mixin/input-mixin'
  export default {
    name: 'za-input',
    mixins: [formMixin],
    computed: {
      extraClass () {
        return this.formModel.rules.extra
      }
    }
  }
</script>
<style lang='less' scoped>
  .weui-input_fix{
    display:flex;
    .weui-input{
      flex: 1;
    }
  }
</style>
