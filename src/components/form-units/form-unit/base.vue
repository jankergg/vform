<!--
  descript: form-unit 表单 单元组件
    author: jankergg
    param: props {
      formModels // 表单值 数据结构, 表单初始化属性，包含name/type/验证规则等等
      titleConfig 表单title
  }
  example:
    <form-unit
    :formModels="formModels"
    @formChange="onChange"
    @formValid="onValid">
      <template slot="testInput3">
        <root-input
        @formChange="onChange"
        @formPassed="onValid"
        :rules="props.rule.rules"
        :value="props.item.value"
        :name="props.item.name">
        </root-input>
      </template>
    </form-unit>
    // TODO 排序
-->
<script>
import Vue from 'vue'

import VeeValidate from '../../../libs/validator'
import formMixin from '../../../mixin/tools-mixin'
import * as ValidateRules from '../mixin/extend'

import formRow from '../../layouts/form-row'
import formBlock from '../../layouts/form-block'
import { FORM_BLOCK_ITEM, zaTitle, hidden} from '../../form-fields'
import uuid from '../../../mixin/uuid-mixin'
import zhcn from '../../../libs/zh-CN'
const formUnitBase = Vue.extend({
  formType: 'formUnit',
  data() {
    return {
      formValues: {},
      formErrors: {},
      errorBag: [],
      fields: {},
      filedsNum: 0,
      isValid: false,
      __oldValue: '',
      currentItem: {}// 当前是哪个节点发生了变更
    }
  },
  mixins: [formMixin],
  props: {
    titleConfig: Object,
    formModels: {
      type: Object,
      default() {
        return {}
      }
    },
    index: [String, Number],
    name: {
      type: [String, Number, Object],
      default() {
        uuid.created();
        return `formUnit_${uuid.uuid}`
      }
    },
    extends: {
      type: [Object, Array],
      default() {
        return []
      }
    },
    delPart: String
  },
  computed: {
    // 获取根组件
    rootComp() {
      let par = this.$parent
      if (!par.formValues) {
        par.formValues = {}
      }
      if (!par.formErrors) {
        par.formErrors = {}
      }
      if (!par.getForm) {
        par.getForm = function (name) {
          return par.$children.find(i => i.name === name)
        }
      }
      return par
    },
    // 判断组件属于哪一种类型 inline/block
    __form_block_type_() {
      let _t = {}
      Object.values(FORM_BLOCK_ITEM).map(i => {
        _t[i.name] = i
      })
      return _t
    },
    // 用于排序
    keys() {
      let key
      let keys = []
      let obj = this.formModels
      for (key in obj) {
        // is virtual form fields
        if (obj.hasOwnProperty(key)){
          let rule = obj[key].rules || {}
          if (rule.type !== 'title') {
            keys.push(key)
          }
        }
      }
      return keys
    }
  },
  methods: {
    getType(t) {
      if (t === 'title' || t === 'za-title') {
        return 'zaTitle'
      }
      if (t === 'hidden'){
        return 'hidden'
      }
      if (this.__form_block_type_[t]) {
        return 'formBlock'
      }
      return 'formRow'
    },
    getError(name) {
      if (name) {
        return this.formErrors[name] || null
      }
      return this.errorBag[0]
    },
    getErrorMsg(name) {
      let err = this.getError(name)
      if (err && err.msg !== undefined) {
        return err.msg
      }
      return ''
    },
    getValidateRules() {
      return Object.keys(this.formValidator.dictionary.dictionary.cn.messages)
    },
    // 吐出数据
    commit() {
      let mod = this.innerModel()
      this.$emit('formChange', mod, this.currentItem)

      // 挂载到根结点
      this.$set(this.rootComp.formValues, this.name, this.formValues)
      this.$set(this.rootComp.formErrors, this.name, Object.values(this.formErrors))
    },
    //
    onChange(val) {
      // 点击组件带过来的值{isValid，msg，name，value}
      this.updateForm(val)
    },
    updateForm(val) {
      // 缓存带有child的组件name
      if (!this.__cacheParent) {
        this.__cacheParent = {}
        this.mountChild()
      }
      // 收集所有表单信息，用来验证错误
      this.$set(this.formErrors, val.name, val)

      // 如果是子节点更新了
      if (this.__cacheParent[val.name]) {
        let parent = this.__cacheParent[val.name]
        let realVal = this.formValues[parent] || {}
        realVal.value = realVal.value || {}
        this.$set(realVal, 'name', parent)
        this.$set(realVal.value, val.name, val.value)
        this.$set(this.formValues, parent, realVal)
      } else {
        // 添加需要更新的属性
        let prop = this.__attach(['name', 'value', 'index'], val)
        this.$set(this.formValues, val.name, prop)
      }
    },
    mountChild() {
      let obj = this.formModels.rules
      let ts = this
      for (let i in obj) {
        if (obj.hasOwnProperty(i) && obj[i].child) {
          for (let prop in obj[i].child) {
            if (obj[i].child.hasOwnProperty(prop)) {
              this.__cacheParent[prop] = i
            }
          }
        }
      }
    },
    deleteThis() {
      this.$emit('formDelete', { index: this.index, name: this.name })
    },
    onEvent(type, val, name) {
      this.$emit('formEvent', type, val, name)
    },
    mountErrors() {
      this.errorBag = []
      this.keys.forEach(i => {
        let err = this.formErrors[i]
        if (err && err.name && !err.isValid) {
          this.errorBag.push(err)
        }
      })
      return this.errorBag
    },
    innerModel() {
      let _msg = (this.errorBag[0] && this.errorBag[0].msg) || '表单信息填写不完整'
      return {
        name: ((this.name || this.index) || 'formUnit').toString(),
        value: this.formValues,
        index: this.index,
        msg: _msg,
        status: this.isEmpty() ? 'empty' : (this.isValid ? 'valid' : 'dirty'),
        errorBag: this.errorBag,
        isValid: this.isValid
      }
    },
    setValues(model){
      let items = Object.keys(model)
      items.map(i => {
        let item = this.getItem(i)
        if (item){
          item.innerValue = model[i].value
        }
      })
    },
    isEmpty() {
      let _all = Object.values(this.formValues).filter(item => {
        return (typeof item !== 'boolean' && !item)
      })
      return _all.length === this.keys.length
    },
    __isValid(err) {
      for (let i in err) {
        let item = err[i]
        if (typeof item === 'string') continue
        if (!item) return false
        if (!item.isValid) {
          return false
        }
      }
      return true
    },
    getItem(name) {
      return this.fields[name]
    },
    validateAll() {
      let self = this
      const fields = Object.keys(this.fields)
      return Promise.all(fields.map(i => this.fields[i].onValidate()))
        .then(res => {
          let isValid = res.find(i => i === false)
          if (isValid === false) {
            return self
          } else {
            return true
          }
      }).catch(e => { return false })
    },
    resetFormValues() {
      this.formValues = {}
    }
  },
  watch: {
    formModels: {
      deep: true,
      handler(v, o) {
        // 判断如果换了formModel 就移除旧值 from formValues
        let neo = Object.keys(v)
        let old = Object.keys(this.formValues)
        old.map(key => {
          if (v[key] === undefined){
            this.$delete(this.formValues, key)
            this.$delete(this.formErrors, key)
            this.$delete(this.fields, key)
          }
        })
      }
    },
    formValues: {
      deep: true,
      handler(v, o) {
        let neo = this.__str(v)
        if (this.__oldValue !== neo) {
          this.__oldValue = neo
          this.isValid = this.__isValid(this.formErrors)
          this.commit()
        }
      }
    },
    formErrors: {
      deep: true,
      handler(v){
        this.mountErrors()
      }
    }
  },
  components: {
    formRow,
    formBlock,
    zaTitle,
    hidden
  }
})

// 注册语言包及vee-validate初始化
VeeValidate.install(Vue, {
  errorBagName: 'vee-errors',
  fieldsBagName: 'vee-fileds',
  delay: 0.5,
  locale: 'cn',
  messages: null,
  strict: true,
  dictionary: {
    cn: {
      messages: zhcn
    }
  }
})
let formValidator = new VeeValidate.Validator()
// 注册验证规则
for (let i in ValidateRules) {
  if (ValidateRules[i].messages && ValidateRules[i].validate) {
    try {
      formValidator.extend(i, ValidateRules[i])
    } catch (e) {
      console.log(e)
    }
  }
}
// 注册数据勾子
formUnitBase.prototype.formValidator = formValidator
export default formUnitBase
</script>
