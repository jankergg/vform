/* @Author: jankergg
/* @Description: 所有表单类型通用mixin,主要包含验证，数据处理等公共逻辑
* @Date:   2017-09-13 15:41:02
* @Last Modified by:   jankergg
* @Last Modified time: 2018-06-25 14:51:31
********************************************************
*符合以下标准的方法或者变量才可放在本base-mixin, 否则会污染组件 *
*1、初始化操作 (挂载当前组件到formUnit)                     *
*2、props 监听， 更新rules及value => innerValu            *
*3、验证方法（提供基本版，其它组件可以按需重写                 *
*********************************************************
** 注: 通用组件属性 **
innerValue: any;  组件当前值
isValid: boolean;   是否通过验证
isReadOnly: boolean; 是否只读
__oldValue: string;  旧值的JSON形式
formUnit: Vue Object; 当前组件所属的formUnit
onValidate: function 验证方法，会根据组件类型不同而被组件改写
commit: function   提交当前组件的值，及状态。会先执行onValidate,再获取innerModel,并提交
onEvent: function   用于触发onEvent 的emit事件，只能主动触发(通过UI交互，而且非数据交互)
onChange: function  用于触发onChange 的emit事件，数据变更时触发，包括主动和被动
*/
// 工具方法集合
import formMixin from '../../../mixin/tools-mixin'
export default {
  data() {
    return {
      innerValue: this.formModel.value, // 只用于内部，用来存储组件最新的值，可以是任何数据类型
      innerRules: this.formModel.rules,
      isValid: false, // 组件状态，是否通过验证
      isReadOnly: false, // 是否只读
      __oldValue: '', // 存储旧值的JSON字串，用来过滤数据变更
      formUnit: this.getFormUnit() // 根组件 formUnit
    }
  },
  mixins: [formMixin],
  created() {
    // 挂载到formUnit
    // 挂载到formUnit只是为了便于主动验证及特殊场景需求
    // 不应直接操作写入fields成员的值, 如：
    // var idCard = this.formUnit.getItem('idCard')
    // idCard.innerValue = 'xxx' （禁止此类操作）
    // idCard.onValidate() (可以)
    // let v = idCard.isValid (可以)
    // 跳过隐藏字段的校验
    if (this.formModel.rules.type !== 'hidden'){
      this.isReadOnly = this.readonly
      this.formUnit.fields[this.name] = this
    }
  },
  computed: {
    // 是否只读
    readonly() {
      return !!this.formModel.rules.readOnly || !!this.formModel.rules.disabled
    }
  },
  // inset: 当组件被嵌套进另一个组件的时候，inset应该为true
  // index: 索引值，正常情况下会通过formUnit传进来
  // formModel: 组件的初始值及rules. 必须
  // name: 组件name. 必须
  props: {
    inset: Boolean,
    index: [Number, String],
    formModel: {
      required: true,
      type: Object
    },
    name: {
      required: true,
      type: String
    }
  },
  watch: {
    // 值更新后 触发验证
    // 验证方法 onValidate 根据组件类型有所不同，被组件复写
    formModel: {
      deep: true,
      handler(v) {
        this.innerValue = v.value
        this.innerRules = v.rules
        this.isReadOnly = this.readonly
      }
    },
    innerValue: {
      deep: true,
      handler(v) {
        this.onValidate().then(res=>{
          this.commit()
        })
      }
    }
  },
  methods: {
    // 验证, 只提供基本验证，可以被组件复写
    onValidate() {
      return new Promise((resolve, reject) => {
        const rules = this.formModel.rules
        let isValid = !!(this.innerValue && this.innerValue.length)
        if (!rules || !rules.vRules || rules.vRules.indexOf('required')==-1){
          isValid = true
        }
        this.isValid = isValid
        if (isValid) {
          resolve(true)
        } else {
          reject(false)
        }
      }).catch(e => {
        return false
      })
    },
    // 用于向formUnit提交数据更新
    commit() {
      let mod = this.innerModel()
      let neoValue = JSON.stringify(mod)
      if (neoValue === this.__oldValue){ return }
      this.__oldValue = neoValue
      // 如果该组件嵌套在另一个组件里
      if (this.inset) {
        this.$emit('onChange', mod, this.name)
        this.$emit('formChange', mod, this.name)
      } else {
        this.formUnit = this.formUnit || this.getFormUnit()
        // 让formUnit知道是谁发出的变更
        //console.log('currentItem', this.name)
        this.formUnit.currentItem = this.name
        this.$set(this.formUnit.formValues, this.name, mod.value)
        // 上报formErrors
        if (mod.isValid) {
          this.$delete(this.formUnit.formErrors, this.name)
        } else {
          this.$set(this.formUnit.formErrors, this.name, mod)
        }
      }
    },
    // 用于上报各种用户交互事件
    onEvent(type, val) {
      if (this.inset) {
        this.$emit('formEvent', val, this.name)
      } else {
        this.formUnit = this.formUnit || this.getFormUnit()
        this.formUnit.onEvent(type, val, this.name)
      }
    },
    // 获取当前所在formUnit
    getFormUnit() {
      let parent = this.$parent
      for (;;) {
        if (!parent.formValidator) {
          parent = parent.$parent
          if (!parent.$parent) {
            throw new Error('formUnit未注册validator!')
          }
        } else {
          return parent
        }
      }
    },
    __errorMsg() {
      return this.formModel.rules.errorMsg || this.formModel.rules.placeholder || '请选择' + this.formModel.rules.label
    },
    // 获取当前表单项的各种状态, 对外暴露
    innerModel() {
      // 注意： __toValue 是个转换数据的方法，可以按需要在组件里写，如果不需要转，就不要写
      //console.warn(this.name, '__toValue::', this.__toValue)
      let $value = (typeof this.__toValue === 'function') ? this.__toValue(this.innerValue) : this.innerValue
      let $isValid = this.isValid

      return {
        name: this.name,
        value: $value,
        index: this.index,
        msg: this.__errorMsg(),
        isValid: $isValid
      }
    }
  }
}
