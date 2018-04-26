# form-unit 表单组件用法：
## `mixin`使用场景：
- unit-mixin: 页面中只包含一组formUnit，并且不需要动态增加，`unitMix`会将表单数据注入到页面中
- multi-mixin: 页面中需要动态增加表单单元，`multiMix`会将表单注入到formUnit的**父级组件** （注意，不一定是页面）

### 推荐用法：
```html
  <template>
    <form-unit
    :formModels="$formModels"
    :formRules="$formRules"
    @formChange="onChange">
    </form-unit>
  </template>
```
```javascript
  import {formUnit, unitMix} from '@/components/unit'

  // 导入数组模型
  import your-form-models
  import your-form-rules

  export default {
    data () {
      return {
        formModels: your-form-models
        formModels: your-form-rules
      }
    }
    mixins: [unitMix],
    components: {formUnit},
    // 页面业务逻辑相关
    // 非页面逻辑的功能，考虑在mixin中添加
    methods: {
      // 获取数据
      getData () {
        this.axios.get('dataApi').then(res => {
          if (res.data.success) {
            // __Model 是定义在 unit-mixin中的可计算值，用来转换数据结构
            // 默认返回 formModels. 可以通过 __modHelper 添加数据过滤器
            this.__Model = res.data.resultList
          }
        })      },
      __modHelper (data) {
        // data = data.map(i => i.value = '')
        return data
      },
      nextStep () {
        // 报错信息在 fromErrors对象，由unitMix维护
        // isValid, errorMsg 由 unitMix维护
        if (!this.isValid) {
          this.__toast(this.errorMsg)
        }
        // form 对象由 unitMix 自动更新及维护
        this.axios.post('your-api', Object.values(this.form)).then(res => {
          alert('提交成功')
        })
      }
    },
    // 如需对表单结果添加自定义行为
    // 比如根据某个表单项的返回值，改变其它表单项的值
    watch: {
      form: {
        deep: true,
        handler (v) {
          if (v['inputA'].value) {
            // 更新表单的值 应该通过 $formModels, 而不是 formModels
            // 因为 formModels 有可能是props传值进来的，无法修改
            this.$formModels['inputB'].value = 'xxx'
          }
        }
      }
    }
  }
```
1. 组件接收2个必填项: formModels, formRules。
  - formModels 用来定义表单项的name、value
  - formRules 用来定义表单渲染规则
2. 组件通过@formChange 方法来输出组件内部的值
  - 参数数组结构： {name, value, msg, errorBag, isValid, status}
  - name: 表单项的name(需要与接口保持一致) 类型：String
  - value: 表单项的集合. 类型：Object
  - msg: 整个unit的报错信息，默认是表单内第一个不通过验证的项 类型：String
  - errorBag: 所有未通过校验的表单项集合。类型：Array
  - isValid: 整个unit是否通过验证，注意是整体有没有通过验证，不是单个 类型： Boolean
  - status: 目前有3种状态：empty(空，也即默认状态), dirty(表单有填写过，但未通过校验), valid(已通过校验) 类型：String
3. 命名管理
  - 建议使用`$formModels,$formRules, onChange` 统一命名的好处是可以用mixin统一管理，方便组织代码。
  - 本地变量推荐以`$`开头，mixin内方法以`_`开头

4. mixin 使用: 目前提供2个公共mixin，用来组织页面数据，强烈推荐使用。
  - mxins 使用需要遵循一定的约定，否则会导致组件难以维护，具体请查看相关mixin源码
  - unitMix: 单unit页面使用
  - mutiMix: 多unit页面使用

## 备注
1. `formModels` 和 `formRules` 为组件数据模型，不要直接修改，请修改他们的本地副本： `$formModels` 和 `$formRules`
2. 非必要情况下，请不要直接在组件内覆盖 `onChange` 方法，否则可能导致数据绑定异常。
3. 在一般情况下，尽量使用 `watch`方法来 监听 `form` 对象的数据变化，以**数据为中心**，而不要直接修改`methods`， 这样可以最大化减少对事件依赖