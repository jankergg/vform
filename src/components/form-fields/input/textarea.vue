<!--
      descript: textarea 组件
        author: rickyshin
        param: props
        example:
-->
<template>
  <x-textarea @on-change="onChange" @on-event="onInputEvent" :placeholder="formModel.rules.placeholder" :max="formModel.rules.maxlength" :value="innerValue" :name="name" :class="{'weui-cell_warn': !isValid}" :disabled="formModel.rules.disabled">
  </x-textarea>
</template>
<script>
import { XTextarea } from '../../vux'
import formMixin from './mixin/input-mixin'

export default {
  name: 'za-textarea',
  mixins: [formMixin],
  methods: {
    onInputEvent(v) {
      this.onEvent('onInput', {
        name: this.name,
        event: null,
        type: 'input',
        triggerType: 'onInput',
        value: this.innerValue
      })
    },
    onChange(val) {
      this.innerValue = val
      // 触发event事件
      this.eventHandler('change', '')
    }
  },
  components: {
    XTextarea
  }
}
</script>

<style lang='less'></style>
