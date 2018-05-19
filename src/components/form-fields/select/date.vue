<!--
      descript: timer 组件
        author: jankergg
        param: props
        example:
-->
<template>
  <div class="time-item-box" :class="{isempty: isEmpty, showext: formModel.rules.showExtBtn}">
    <div class="root-select-mask" v-if="isReadOnly"></div>
    <date-time @on-change="onChange" @on-hide="onHide" clear-text="" :placeholder="formModel.rules.placeholder" v-model.trim="innerValue" :readonly="isReadOnly" :format="'YYYY-MM-DD'" :start-date="formModel.rules.stime" :end-date="formModel.rules.etime" :min-year="1940" :name="name">
    </date-time>
    <div class="txt" v-if="formModel.rules.showExtBtn">
      <div class="selectIcon" @click="emission">
        <span class="icon-cricle" :class="{'active': isLong}"></span>
        <span class="icon-text" :class="{'icon-text-active': isLong}">{{formModel.rules.txt}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { DateTime } from '../../vux'
import rootSelectMx from './mixin/select-mixin'

export default {
  name: 'za-date',
  data() {
    return {
      isEmpty: true,
      isLong: false,
      rules: null,
      innerValueType: 'string',
      innerValue: ''
    }
  },
  mixins: [rootSelectMx],
  props: {
    name: String,
    formModel: Object
  },
  computed: {
    readOnly: {
      get() {
        return !!this.formModel.rules.readOnly || !!this.formModel.rules.disabled
      },
      set(v) {
        this.isReadOnly = v
      }
    }
  },
  watch: {
    'formModel.rules': {
      deep: true,
      handler(v) {
        this.isReadOnly = !!this.formModel.rules.readOnly || !!this.formModel.rules.disabled
      }
    }
  },
  methods: {
    emission() {
      this.isLong = !this.isLong
      this.readOnly = this.isLong
      if (this.isLong) {
        this.innerValue = '9999-1-1'
      }
      // this.$emit('emission', {target: this.formModel.rules.emitTarget, value: this.isLong})
    },
    innerModel() {
      this.isEmpty = !this.innerValue
      // mixins update
      return {
        name: this.name,
        value: this.innerValue,
        msg: this.value ? '' : (this.formModel.rules.errorMsg || this.formModel.rules.placeholder),
        isValid: (!this.formModel.rules.vRules || this.formModel.rules.vRules.indexOf('required') == -1) ? true : !!this.innerValue
      }
    }
  },
  components: {
    DateTime
  }
}
</script>
<style lang="less">
  @import '~@/assets/styles/form.less';
</style>
