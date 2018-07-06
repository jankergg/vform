/* @Author: jankergg
/* @Description: input 类型通用mixin
* @Date:   2017-09-13 15:41:02
* @Last Modified by:   jankergg
* @Last Modified time: 2018-07-06 11:07:12
*/
import base from '../../mixin/base-mixin'

export default {
  data () {
    return {
      innerValue: this.formModel.value,
      __eventType: this.formModel.rules.event,
      timer: null
    }
  },
  mixins: [base],
  props: {
    index: [String, Number],
    name: String,
    formModel: Object
  },
  computed: {
    validator () {
      let parent = this.$parent
      let validator = null
      // 遍历查找父级节点，找到 formValidator
      for (; ;) {
        if (!parent.formValidator) {
          parent = parent.$parent
          if (!parent) {
            throw new Error('validator 未定义, 表单必须借助 [formUnit] 才能正确渲染')
          }
        } else {
          validator = parent.formValidator
          if (this._validator) {
            validator.detach(this.name)
          }
          validator.attach(this.name, this.formModel.rules.vRules)
          this._validator = validator
          return this._validator
        }
      }
    }
  },
  created () {
    this.onValidate()
    this.inputInit()
  },
  methods: {
    inputInit () {
      // rules.event 定义数据变化事件
      // 比如：定义rules.event: 'change', 则只有change事件才会通知UI视图更新
      this.__eventType = (this.formModel && this.formModel.rules && this.formModel.rules.event) || 'input'
    },
    // 更新验证规则
    updateValidator(rules){
      this._validator.detach(this.name)
      this._validator.attach(this.name, rules || this.formModel.rules.vRules)
    },
    eventHandler (e, type) {
      let eName = 'e_' + this.__eventType
      if (this.__eventType === type) {
        // 触发事件
        typeof this[eName] === 'function' && this[eName](e)
        this.onEvent(type, {
          name: this.name,
          event: e,
          type: type,
          triggerType: this.__eventType,
          value: this.innerValue
        })
      }
      if (type === 'input') {
        // 挂载到验证器上
        this.intimeValidate(e.target)
      }
    },
    // event 类型
    e_input (e) {
      this.innerValue = (e && e.target.value) || ""
    },
    e_change (e) {
      this.innerValue = (e && e.target.value) || ""
    },
    e_blur (e) {
      this.innerValue = (e && e.target.value) || ""
    },
    e_focus (e) {
    },
    __errorMsg () {
      let label = this.formModel.rules.label || ''
      let _msg = this.validator.errorBag.first(this.name)
      if (_msg !== this.name) {
        return label + _msg
      }
      return this.formModel.rules.errorMsg || this.formModel.rules.placeholder
    },
    validateItem (v = this.innerValue, cb = (res) => {}) {
      // rules 是表单规则，无规则则不触发验证
      let self = this
      return this.validator.validate(this.name, v).then(res => {
        self.isValid = true
        cb(true)
        return true
      }).catch((e) => {
        self.isValid = false
        cb(false)
        return false
      })
    },
    intimeValidate (el) {
      // 即时验证，只用于样式变更
      this.__bounce(300).do(() => {
        this.handleValid(el.value, res => {
          let klss = el.classList
          if (!res) {
            klss.add('weui-cell_warn')
          } else {
            klss.remove('weui-cell_warn')
          }
        })
      })
    },
    onValidate () {
      // 给定一个正则，用来过滤数据
      if (this.formModel.rules.filter){
        let v = this.innerValue
        v = v.replace(this.formModel.rules.filter, '')
        this.innerValue = v
      }
      return this.handleValid(this.innerValue, res => {
        let timeout = 50
        // 针对input事件做节流
        if (this.__eventType === 'input') {
          let timeout = 350
        }
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
          this.commit()
        }, timeout)
      })
    },
    handleValid (v, cb) {
      if (this.formModel.rules) {
        return this.validateItem(v, cb)
      } else {
        cb(false)
        return Promise.resolve(false)
      }
    }
  },
  watch: {
    'formModel.rules.vRuels': {
      deep: true,
      handler(v){
        this.updateValidator()
        this.onValidate().then(res => {
          this.commit()
        })
      }
    },
    value (v) {
      if (v === null || v === undefined) {
        v = ''
      }
      this.innerValue = v
    }
  }
}
