<template>
  <div :class="disabled ? 'vux-checklist-disabled' : ''">
    <div v-show="title" class="weui-cells__title">{{title}}</div>
    <slot name="after-title"></slot>
    <div class="weui-cells weui-cells_checkbox">
      <div class="weui-cell weui-check_label" :class="{'vux-checklist-label-left': labelPosition === 'left'}" :for="`checkbox_${uuid}_${index}`" v-for="(one, index) in currentOptions">
        <div class="weui-cell__hd">
          <label :for="`checkbox_${uuid}_${index}`">
            <input type="checkbox" class="weui-check" :name="`vux-checkbox-${uuid}`" :value="getKey(one)" v-model="currentValue" :id="disabled ? '' : `checkbox_${uuid}_${index}`" :disabled="ifDisable(getKey(one))">
            <i class="weui-icon-checked vux-checklist-icon-checked"></i>
          </label>
        </div>
        <div class="weui-cell__bd">
          <a class="bd_link" v-if="one.link" :href="one.link">{{one.linkText?one.linkText:'详情&#187;'}}</a>
          <label :for="`checkbox_${uuid}_${index}`" class="labelName">
            <p v-html="getValue(one)"></p>
          </label>
        </div>
      </div>
    </div>
    <slot name="footer"></slot>
  </div>
</template>

<script>
import Base from '../../../libs/base'
import Tip from '../tip'
import Icon from '../icon'
import { getValue, getKey } from './object-filter'
import shuffle from 'array-shuffle'

export default {
  name: 'check-list',
  components: {
    Tip,
    Icon
  },
  filters: {
    getValue,
    getKey
  },
  mixins: [Base],
  props: {
    name: String,
    showError: Boolean,
    title: String,
    required: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      required: true
    },
    value: {
      type: Array,
      default: () => []
    },
    max: Number,
    min: Number,
    fillMode: Boolean,
    randomOrder: Boolean,
    checkDisabled: {
      type: Boolean,
      default: true
    },
    labelPosition: String,
    disabled: Boolean
  },
  data() {
    return {
      currentValue: [],
      currentOptions: this.options
    }
  },
  created() {
    this.handleChangeEvent = true
    if (this.value) {
      this.currentValue = this.value
    }
    if (this.randomOrder) {
      this.currentOptions = shuffle(this.options)
    } else {
      this.currentOptions = this.options
    }
  },
  methods: {
    getValue,
    getKey,
    ifDisable(key) {
      if (!this.checkDisabled) {
        return false
      }
      return this.currentValue.indexOf(key) === -1 && this.currentValue.length === this._max
    }
  },
  computed: {
    _total() {
      return this.fillMode ? (this.options.length + 1) : this.options.length
    },
    _min() {
      if (!this.required && !this.min) {
        return 0
      }
      if (!this.required && this.min) {
        return Math.min(this._total, this.min)
      }
      if (this.required) {
        if (this.min) {
          let max = Math.max(1, this.min)
          return Math.min(this._total, max)
        } else {
          return 1
        }
      }
    },
    _max() {
      if (!this.required && !this.max) {
        return this._total
      }
      if (this.max) {
        if (this.max > this._total) {
          return this._total
        }
        return this.max
      } else {
        return this._total
      }
    },
    valid() {
      return this.currentValue.length >= this._min && this.currentValue.length <= this._max
    }
  },
  watch: {
    value(newVal) {
      if (JSON.stringify(newVal) !== JSON.stringify(this.currentValue)) {
        this.currentValue = newVal
      }
    },
    options(val) {
      this.currentOptions = val
    },
    currentValue(newVal) {
      const val = pure(newVal)
      this.$emit('on-change', val)
      this.$emit('input', val)

      let err = {}
      if (this._min) {
        if (this.required) {
          if (this.currentValue.length < this._min) {
            err = {
              min: this._min
            }
          }
        } else {
          if (this.currentValue.length && this.currentValue.length < this._min) {
            err = {
              min: this._min
            }
          }
        }
      }
      if (!this.valid && this.dirty && Object.keys(err).length) {
        this.$emit('on-error', err)
      } else {
        this.$emit('on-clear-error')
      }
    }
  }
}
function pure(obj) {
  return JSON.parse(JSON.stringify(obj))
}
</script>

<style lang="less">
@import "~@/assets/styles/form.less";
.labelName {
  display: block;
  padding-right: 15%;
}
</style>
