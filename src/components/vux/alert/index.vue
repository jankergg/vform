<template>
  <div class="vux-alert">
    <x-dialog
    v-model="showValue"
    :mask-transition="maskTransition"
    :dialog-transition="dialogTransition"
    @on-hide="$emit('on-hide')"
    @on-show="$emit('on-show')">
      <div class="weui-dialog__hd">
        <strong class="weui-dialog__title">{{title}}</strong>
      </div>
      <div class="weui-dialog__bd">
        <slot>
          <div v-html="content"></div>
        </slot>
      </div>
      <div class="weui-dialog__ft">
        <a href="javascript:;"
        class="weui-dialog__btn weui-dialog__btn_primary"
        @click="_onHide">{{buttonText}}</a>
      </div>
    </x-dialog>
  </div>
</template>

<script>
import XDialog from '../x-dialog'

export default {
  name: 'alert',
  components: {
    XDialog
  },
  created () {
    if (typeof this.value !== 'undefined') {
      this.showValue = this.value
    }
  },
  props: {
    value: Boolean,
    title: String,
    content: String,
    buttonText: {
      type: String,
      default: '确定'
    },
    maskTransition: {
      type: String,
      default: 'vux-mask'
    },
    dialogTransition: {
      type: String,
      default: 'vux-dialog'
    }
  },
  data () {
    return {
      showValue: false
    }
  },
  methods: {
    _onHide () {
      this.showValue = false
    }
  },
  watch: {
    value (val) {
      this.showValue = val
    },
    showValue (val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/styles/transition.less';
@import '~@/assets/styles/weui/widget/weui_tips/weui_mask';
@import '~@/assets/styles/weui/widget/weui_tips/weui_dialog';
</style>
