<template>
  <div>
    <x-dialog
    v-model="showValue"
    :dialogClass="theme === 'android' ? 'weui-dialog weui-skin_android' : 'weui-dialog'"
    :mask-transition="maskTransition"
    :dialog-transition="theme === 'android' ? 'vux-fade' : dialogTransition"
    :hide-on-blur="hideOnBlur"
    @on-hide="$emit('on-hide')"
    @on-show="$emit('on-show')">
      <div class="weui-dialog__hd" v-if="!!title"><strong class="weui-dialog__title">{{title}}</strong></div>
      <div class="weui-dialog__bd"><slot><div v-html="content"></div></slot></div>
      <div class="weui-dialog__ft">
        <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default" @click="_onCancel">{{cancelText}}</a>
        <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary" @click="_onConfirm">{{confirmText}}</a>
      </div>
    </x-dialog>
  </div>
</template>

<script>
import XDialog from '../x-dialog'
export default {
  name: 'confirm',
  components: {
    XDialog
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    theme: {
      type: String,
      default: 'ios'
    },
    hideOnBlur: {
      type: Boolean,
      default: false
    },
    title: String,
    confirmText: {
      type: String,
      default: '确定'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    maskTransition: {
      type: String,
      default: 'vux-fade'
    },
    dialogTransition: {
      type: String,
      default: 'vux-dialog'
    },
    content: String
  },
  created () {
    this.showValue = this.show
    if (this.value) {
      this.showValue = this.value
    }
  },
  watch: {
    value (val) {
      this.showValue = val
    },
    showValue (val) {
      this.$emit('input', val)
    }
  },
  data () {
    return {
      showValue: false
    }
  },
  methods: {
    _onConfirm () {
      this.showValue = false
      this.$emit('on-confirm')
    },
    _onCancel () {
      this.showValue = false
      this.$emit('on-cancel')
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/styles/transition.less';
@import '~@/assets/styles/weui/widget/weui_tips/weui_mask';
@import '~@/assets/styles/weui/widget/weui_tips/weui_dialog';
</style>
