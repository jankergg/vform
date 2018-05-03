// 健康告知 slot 组件专用mixin
export default {
  props: ['name'],
  data () {
    return {
      errorMsg: null,
      formErrors: {},
      formModel: {rules: {}, value: ''},
      $ioptions: null,
      rules: null,
      models: null
    }
  },
  created () {
    if (!this.name) {
      throw new Error('必须传入一个name')
    }
    this.models = this.calcModels
    this.formModel.rules = this.calcRules
    if (this.models && this.models.value.options) {
      this.$ioptions = this.models.value.options
    } else if (this.formModel.rules) {
      this.$ioptions = this.formModel.rules.options
    } else if (!this.$ioptions) {
      this.$ioptions = {}
    }
    // 劫持/重定向父组件的验证方法
    this.$parent.onValidate = this.onValidate
  },
  computed: {
    calcRules: {
      get () {
        return this.$parent.rules
      },
      set (v) {
        this.formModel.rules = v
      }
    },
    calcModels: {
      get () {
        return this.$parent.models
      },
      set (v) {
        this.models = v
      }
    },
    isValid () {
      let vs = Object.values(this.formErrors)
      if (!vs.length) {
        return true
      }
      return !vs.find(i => i.isValid === false)
    }
  },
  mounted () {
    // 在组件初始化完成之后，监听model的变更
    this.$watch('models', function (v) {
      this.$ioptions = v.value.options
    }, {deep: true})
  },
  watch: {
    "$parent.rules" (v) {
      this.calcRules = v
    },
    "$parent.models" (v) {
      this.calcModels = v
    },
    $ioptions: {
      deep: true,
      handler (v) {
        this.$set(this.$parent.innerValue, 'options', v)
      }
    }
  },
  methods: {
    onChange (v) {
      if (v.msg) {
        this.errorMsg = v.msg
      }
      if (!v.isValid) {
        this.$set(this.formErrors, v.name, v)
      } else {
        this.$delete(this.formErrors, v.name)
      }
      this.$set(this.$parent.innerValue, 'options', this.$ioptions)
    },
    onValidate () {
      return this.isValid
    }
  }
}
