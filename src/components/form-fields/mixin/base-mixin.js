/* @Author: jankergg
/* @Description: 所有表单类型通用mixin,主要包含验证，数据处理等公共逻辑
* @Date:   2017-09-13 15:41:02
* @Last Modified by:   jankergg
* @Last Modified time: 2018-04-27 13:15:36
符合以下标准的方法或者变量才可放在本base-mixin, 否则会污染组件
1、初始化操作 (挂载当前组件到formUnit)
2、props 监听， 更新rules及value => innerValue
3、验证方法（提供基本版，其它组件可以按需重写）
*/
import formMixin from '../../mixin/tools-mixin'
export default {
  data () {
    return {
      innerValue: this.formModel.value, // 只用于内部，用来存储组件最新的值，可以是任何数据类型
      isValid: false, // 组件状态，是否通过验证
      isReadOnly: false, // 是否只读
      __oldValue: '',
      formUnit: this.getFormUnit() // 根组件 formUnit
    }
  },
  mixins: [formMixin],
  created () {
    // 挂载到formUnit
    this.formUnit.fields[this.name] = this
  },
  computed: {
    // 是否只读
    readonly () {
      return !!this.formModel.rules.readOnly || !!this.formModel.rules.disabled
    }
  },
  props: ['inset'],
  watch: {
    // 值更新后 触发验证
    // 验证方法 onValidate 根据组件类型有所不同，被组件复写
    'formModel.value': {
      deep: true,
      handler (v) {
        this.innerValue = v
      }
    },
    innerValue: {
      deep: true,
      handler (v) {
        this.onValidate()
      }
    }
  },
  methods: {
    onValidate () {
      return new Promise((resolve, reject) => {
        let isValid = !!(this.innerValue && this.innerValue.length)
        this.isValid = isValid
        if (isValid) {
          resolve(true)
        } else {
          reject(false)
        }
      }).catch(e => {return false})
    },
    // 用于向formUnit提交数据更新
    commit () {
      let mod = this.innerModel()
      // 如果该组件嵌套在另一个组件里, 这里指同层组件，比如input 和 select
      if (this.inset) {
        this.$emit('onChange', mod)
        this.$emit('formChange', mod)
      } else {
        this.formUnit = this.formUnit || this.getFormUnit()
        this.$set(this.formUnit.formValues, this.name, mod.value || this.innerValue || '')
        // 上报formErrors
        if (mod.isValid) {
          this.$delete(this.formUnit.formErrors, this.name)
        } else {
          this.$set(this.formUnit.formErrors, this.name, mod)
        }
      }
    },
    // 用于上报各种用户交互事件
    onEvent (type, val) {
      if (this.inset) {
        this.$emit('onEvent', val)
      } else {
        this.formUnit = this.formUnit || this.getFormUnit()
        this.formUnit.onEvent(type, val)
      }
    },
    getFormUnit () {
      let parent = this.$parent
      for (; ;) {
        if (!parent.formValidator) {
          parent = parent.$parent
        } else {
          return parent
        }
      }
      return parent
    },
    // 获取当前表单项的各种状态
    innerModel () {
      return {
        name: this.name,
        value: this.innerValue,
        index: this.index,
        msg: this.formModel.rules.errorMsg || this.__errorMsg() || this.formModel.rules.placeholder || '请填' + this.formModel.rules.label,
        isValid: this.isValid
      }
    }
  }
}
