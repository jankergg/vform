/*
* @Author: jankergg
* @Date:   2017-09-13 15:41:02
* @Last Modified by:   jankergg
* @Last Modified time: 2018-06-19 16:07:39
*/
import base from '../../mixin/base-mixin'
export default {
  data() {
    return {
      innerValue: [],
      __oldValue: '',
      autoTrigger: this.formModel.rules.autoTrigger
    }
  },
  mixins : [base],
  created() {
    this.convertValueType()
    this.selectInit()
  },
  computed : {
    list() {
      return this.formModel.rules.options || []
    },
    showName() {
      return this.formModel.rules.showName || false
    },
    placeholder() {
      return this.formModel.rules.placeholder || '请选择'
    }
  },
  watch : {
    'formModel.value': {
      deep: true,
      handler(v) {
        if (this.innerValueType === 'string') {
          v = v || ''
          if (typeof v === 'string') {
            this.innerValue = v
          } else {
            this.innerValue = v[0]
          }
        } else {
          v = v || []
          if (typeof v === 'string') {
            this.innerValue = v.split('/')
          } else {
            this.innerValue = v
          }
        }
      }
    }
  },
  methods : {
    // 根据组件转换innerValue数据类型
    convertValueType() {
      let val = ''
      if (typeof this.formModel.value === 'string') {
        // 组件需要什么类型
        val = typeof this.innerValue === 'string'
          ? this.formModel.value
          : [this.formModel.value]
      } else if (Array.isArray(this.formModel.value)) {
        // 组件需要什么类型
        val = typeof this.innerValue === 'string'
          ? this.formModel.value[0]
          : this.formModel.value
      } else {
        val = typeof this.innerValue === 'string'
          ? ''
          : []
      }
      if (val[0] == '') {
        this.innerValue = []
      } else {
        this.innerValue = val
      }
    },
    selectInit() {
      this.onValidate()
      if (this.innerValue && this.innerValue.length) {
        this.__oldValue = this.__str(this.innerValue)
      }
    },
    // popup show
    onShow(v) {
      // this.onEvent('onShow', v)
    },
    // popup hide
    onHide(v) {
      if (v === false) {
        return
      }
      let neo = this.__str(this.innerValue)
      if (neo !== this.__oldValue) {
        // 必须 vux 不同类型的组件，onHide触发时间不一致 这里放到下一个Tick，对齐
        this.$nextTick(() => {
          this.onEvent('onHide', {
            name: this.name,
            event: null,
            type: 'change',
            triggerType: 'onHide',
            value: this.innerValue
          })
          this.__oldValue = neo
        })
      }
    },
    onChange(v) {
      let neo = this.__str(v)
      if (neo !== this.__oldValue) {
        this.innerValue = v
        this.onValidate()
        this.$nextTick(() => {
          this.__oldValue = neo
          this.commit() // 放在此处是为了让onChange事件晚于onEvent事件
        })
      }
    }
  }
}
