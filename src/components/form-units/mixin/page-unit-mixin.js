/*
* @Author: jankergg
* @Date:   2017-11-13 15:41:02
* @Last Modified by:   jankergg
* @Last Modified time: 2018-02-05 12:08:56
* 注意：后续 unit-mixin 以此文件为准
* 约定：1. 传给组件使用的变量一律使用$_开头命名, 注意不要与vue自带变量重名(暂未实施)
*/

export default {
  data () {
    return {
      formModels: null, // 从外部文件引入的原始数据
      formRules: null, // 从外部文件引入的原始规则
      $formModels: this.__Model, // 传给formUnit
      $formRules: this.__Rule, // 传给formUnit
      formErrors: [], // 表单报错信息集合
      formStatus: '', // 表单状态：empty, dirty, valid
      vModel: {},
      form: {}, // 表单数据合集，根据响应 实时更新
      options: {}, // 页面一些配置参数，用于接口请求，如applyId, planId
      __data: null // 接口数据的本地缓存
    }
  },
  computed: {
    // 引入可计算属性，主要是考虑到数据结构及类型的转换
    // 计算及转换formModel
    __Model: {
      get () {
        this.$formModels = this.__modHelper(this.formModels)
      },
      set (v) {
        this.$formModels = this.__modHelper(v)
      }
    },
    // 计算及转换formRules
    __Rule: {
      get () {
        this.$formRules = this.__ruleHelper(this.formRules)
      },
      set (v) {
        this.$formRules = this.__ruleHelper(v)
      }
    },
    isValid () {
      return this.formErrors.length === 0
    },
    errorMsg () {
      return this.formErrors.length ? this.formErrors[0].msg : ''
    }
  },
  created () {
    this.$nextTick(() => {
      this.__unitMixInit()
    })
  },
  mounted () {
    let validators = []
    // 取出所有子节点的验证器，并扁平化数组
    for (let i = 0, len = this.$children.length; i < len; i++) {
      let v = this.$children[i]
      if (v.formValidator) {
        if (Array.isArray(v.formValidator)) {
          v.formValidator.map(i => validators.push(i))
        } else {
          validators.push(v.formValidator)
        }
      }
    }
    // 子节点验证器的集合
    this.formValidator = validators
  },
  watch: {
    vModel: {
      deep: true,
      handler (v) {
        if (v && this.__str(v) !== '{}') {
          this.__mixChange()
        }
      }
    }
  },
  methods: {
    __unitMixInit () {
      if (/-unit$/.test(this.name)) {
        throw new Error('该mixin是为单unit组件的父级组件编写')
      }
      this.$formModels = this.__Model
      this.$formRules = this.__Rule
      if (this.formModels === null || this.formRules === null) {
        console.error('formModels 和 formRules是form-unit的必要参数，请在组件内定义！')
      }
    },
    ready () {
      this.getData()
    },
    getData () {},
    onChange (val) {
      this.__mixChange(val)
    },
    formValidateAll (ms) {
      // 设置缓冲延迟, 节流
      // 封装验证器
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          let vparams = []
          this.formValidator.map(item => {
          })
          Promise.all(vparams).then(res => {
            resolve(true)
          }).catch(e => {
            reject(e)
          })
        }, ms || 100)
      })
    },
    __mixChange (val) {
      this.__updateForm(val)
    },
    __updateForm (val) {
      this.formErrors = val.errorBag
      this.form = val.value
      if (this.formStatus !== val.status) {
        this.formStatus = val.status
      }
    },
    // 这个方法可以重写
    __modHelper (v) {
      return v
    },
    // 这个方法可以重写
    __ruleHelper (v) {
      return v
    }
  }
}
