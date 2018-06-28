<template>
  <div class="vux-cell-box">
    <div class="weui-cell vux-tap-active weui-cell_access" @click="onClick" v-show="showCell">
      <div class="vux-cell-primary vux-popup-picker-select-box">
        <div class="vux-popup-picker-select" :style="{textAlign: valueTextAlign}">
          <span class="vux-popup-picker-value" v-if="!displayFormat && !showName && value.length">{{value | array2string}}</span>
          <span class="vux-popup-picker-value" v-if="!displayFormat && showName && value.length">{{value | value2name(data)}}</span>
          <span class="vux-popup-picker-value" v-if="displayFormat && value.length">{{ displayFormat(value, value2name(value, data)) }}</span>
          <span v-if="!value.length && placeholder" v-text="placeholder" class="vux-popup-picker-placeholder"></span>
        </div>
      </div>
      <div class="weui-cell__ft">
      </div>
    </div>

    <div v-transfer-dom="isTransferDom">
      <popup
      v-model="showValue"
      class="vux-popup-picker"
      :id="`vux-popup-picker-${uuid}`"
      @on-hide="onPopupHide"
      @on-show="onPopupShow">
        <div class="vux-popup-picker-container">
          <div class="vux-popup-picker-header" @touchmove.prevent>
            <flexbox>
              <flexbox-item class="vux-popup-picker-header-menu vux-popup-picker-cancel" @click.native="onHide(false)">{{ cancelText }}</flexbox-item>
              <flexbox-item class="vux-popup-picker-header-menu vux-popup-picker-header-menu-right" @click.native="onHide(true)">{{ confirmText }}</flexbox-item>
            </flexbox>
          </div>
          <picker
          :data="data"
          v-model="tempValue"
          @on-change="onPickerChange"
          :columns="columns"
          :fixed-columns="fixedColumns"
          :container="'#vux-popup-picker-'+uuid"
          :column-width="columnWidth"></picker>
        </div>
      </popup>
    </div>

  </div>
</template>

<script>
import Picker from '../picker'
import Popup from '../popup'
import { Flexbox, FlexboxItem } from '../flexbox'
import array2string from '../../../filters/array2String'
import value2name from '../../../filters/value2name'
import uuid from '../../../mixin/uuid-mixin'
import TransferDom from '../../../directives/transfer-dom'

const getObject = function (obj) {
  return JSON.parse(JSON.stringify(obj))
}

export default {
  name: 'popup-picker',
  directives: {
    TransferDom
  },
  created () {
    if (typeof this.show !== 'undefined') {
      this.showValue = this.show
    }
  },
  mixins: [uuid],
  components: {
    Picker,
    Popup,
    Flexbox,
    FlexboxItem
  },
  filters: {
    array2string,
    value2name
  },
  props: {
    valueTextAlign: {
      type: String,
      default: 'right'
    },
    title: String,
    cancelText: {
      type: String,
      default: '取消'
    },
    confirmText: {
      type: String,
      default: '确定'
    },
    data: {
      type: Array,
      default () {
        return []
      }
    },
    placeholder: String,
    columns: {
      type: Number,
      default: 0
    },
    fixedColumns: {
      type: Number,
      default: 0
    },
    value: {
      type: Array,
      default () {
        return []
      }
    },
    showName: Boolean,
    showCell: {
      type: Boolean,
      default: true
    },
    show: Boolean,
    displayFormat: Function,
    isTransferDom: {
      type: Boolean,
      default: true
    },
    columnWidth: Array
  },
  computed: {
    labelStyles () {
      return {
        display: 'block',
        width: this.$parent.labelWidth || this.$parent.$parent.labelWidth,
        textAlign: this.$parent.labelAlign || this.$parent.$parent.labelAlign,
        marginRight: this.$parent.labelMarginRight || this.$parent.$parent.labelMarginRight
      }
    }
  },
  methods: {
    value2name,
    getNameValues () {
      return value2name(this.currentValue, this.data)
    },
    onClick () {
      this.showValue = true
    },
    onHide (type) {
      this.showValue = false
      if (type) {
        this.closeType = true
        this.currentValue = getObject(this.tempValue)
        if (!this.currentValue.length){
          this.currentValue = ["110000", "110100", "110101"]
        }
      }
      if (!type) {
        this.closeType = false
        if (this.value.length > 0) {
          this.tempValue = getObject(this.currentValue)
        }
      }
    },
    onPopupShow () {
      this.closeType = false
      this.$emit('on-show')
    },
    onPopupHide (val) {
      if (this.value.length > 0) {
        this.tempValue = getObject(this.currentValue)
      }
      this.$emit('on-hide', this.closeType)
    },
    onPickerChange (val) {
      if (JSON.stringify(this.currentValue) !== JSON.stringify(val)) {
        // if has value, replace it
        if (this.value.length) {
          const nowData = JSON.stringify(this.data)
          if (nowData !== this.currentData && this.currentData !== '[]') {
            this.tempValue = getObject(val)
          }
          this.currentData = nowData
        } else { // if no value, stay quiet
          // if set to auto update, do update the value
          this.tempValue = getObject(val)
        }
      }
      this.$emit('on-shadow-change', getObject(val))
    }
  },
  watch: {
    value (val) {
      if (JSON.stringify(val) !== JSON.stringify(this.tempValue)) {
        this.tempValue = getObject(val)
        this.currentValue = getObject(val)
      }
    },
    currentValue (val) {
      this.$emit('on-change', getObject(val))
      this.$emit('input', getObject(val))
    },
    show (val) {
      this.showValue = val
    }
  },
  data () {
    return {
      onShowProcess: false,
      tempValue: getObject(this.value),
      closeType: false,
      currentData: JSON.stringify(this.data), // used for detecting if it is after data change
      showValue: false,
      currentValue: this.value
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/styles/variable.less';
@import '~@/assets/styles/1px.less';

.vux-cell-primary {
  flex: 1;
}
.vux-cell-box {
  position: relative;
  .weui-cell_access {padding:0}
}
.vux-popup-picker-header {
  height: 44px;
  color: @popup-picker-header-text-color;
  background-color: @popup-picker-header-bg-color;
  font-size: @popup-picker-header-font-size;
  position: relative;
  &:after {
    .setBottomLine(#e5e5e5);
  }
}
.vux-popup-picker-header-menu {
  text-align: left;
  padding-left: 15px;
  line-height: 44px;
}
.vux-popup-picker-header-menu-right {
  text-align: right;
  padding-right: 15px;
}
.vux-popup-picker-select {
  width: 100%;
  position: relative;
}
.vux-popup-picker-select-box.weui-cell__bd:after {
  content: " ";
  display: inline-block;
  transform: rotate(45deg);
  height: 6px;
  width: 6px;
  border-width: 2px 2px 0 0;
  border-color: #C8C8CD;
  border-style: solid;
  position: relative;
  top: -2px;
  position: absolute;
  top: 50%;
  right: 15px;
  margin-top: -3px;
}
.vux-popup-picker-cancel {
  color: @popup-picker-header-cancel-text-color;
}
.vux-popup-picker-placeholder {
  color: #999;
}
</style>
