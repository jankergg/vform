/*
* @Author: jankergg
* @Date:   2017-11-13 15:41:02
* @Last Modified by:   jankergg
* @Last Modified time: 2018-02-05 12:08:44
* 注意：后续 multi-mixin 以此文件为准
*/

export default {
  data () {
    return {
      formGroupModels: null, // 须在组件内覆盖
      formGroupRules: null, // 须在组件内覆盖
      $formGroups: {}, // 可在组件内覆盖  表单模型合集
      formGroupErrorMsg: null,
      formGroup: [], // 表单数据
      formGroupErrors: [],
      formGroupStatus: {},
      isGroupValid: false,
      modQueue: [], // 如果有一个队列需要初始化
      options: {}
    }
  },
  watch: {
    formGroupErrors: {
      deep: true,
      handler () {
        this.groupValidate()
      }
    }
  },
  created () {
    this.$nextTick(() => {
      this.__initGroup()
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
  methods: {
    __initGroup () {
      if (/-unit$/.test(this.name)) {
        throw new Error('该mixin是为unit组件的父级组件编写')
      }
      if (this.formGroupModels === null || this.formGroupRules === null) {
        console.error('formGroupModels 和 formGroupRules是multi-form的必要参数，请在组件内定义！')
      }
    },
    addForm (idx, name, mod) {
      let demod = {}
      demod.formModels = this.__clone(this.formGroupModels)
      demod.formRules = this.__clone(this.formGroupRules)
      if (mod) {
        mod.formModels && (demod.formModels = mod.formModels)
        mod.formRules && (demod.formModels = mod.formRules)
      }
      this.$set(this.$formGroups, idx, {
        ...demod
      })
    },
    updateGroupForm (val) {
      this.formGroupStatus[val.index] = val.status
      this.$set(this.formGroup, val.index, val.value)
      this.$set(this.formGroupErrors, val.index, {msg: val.msg, isValid: val.isValid})
    },
    addOneForm () {
      let keys = Object.keys(this.$formGroups)
      let index = keys.length ? parseInt(keys[keys.length - 1]) + 1 : 0
      let mod
      if (this.modQueue.length) {
        mod = this.modQueue.shift(0)
      }
      this.addForm(index, name, mod)
    },
    addAllForm () {
      for (;this.modQueue.length;) {
        this.addOneForm()
      }
    },
    onDelted (val, index) {
      this.$delete(this.$formGroups, index)
      this.$delete(this.formGroup, index)
      this.$delete(this.formGroupErrors, index)
      this.$delete(this.formGroupStatus, index)
      !!this.emit && this.emit()
    },
    groupValidate () {
      let _valid = Object.values(this.formGroupErrors).find(item => item.isValid === false)
      this.isGroupValid = !_valid
      if (_valid) {
        this.formGroupErrorMsg = _valid.msg
      }
    },
    onGroupChange (val) {
      this.__mixGroupChange(val)
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
      this.updateGroupForm(val)
      !!this.emitGroup && this.emitGroup()
    },
    emitGroup () {
      this.__bounce(200).do(() => {
        this.$emit('formChange', this.innerGroupModel())
      })
    },
    innerGroupModel () {
      let status = 'valid'
      for (let i in this.formGroupStatus) {
        if (this.formGroupStatus[i] === 'dirty') {
          status = 'dirty'
          break
        }
        if (this.formGroupStatus[i] === 'empty') {
          status = 'empty'
          break
        }
      }
      return {
        name: this.name || 'multi-unit-form',
        value: this.__values(this.formGroup),
        status: status,
        msg: this.isGroupValid ? null : this.formGroupErrorMsg,
        isValid: this.isGroupValid
      }
    }
  }
}
