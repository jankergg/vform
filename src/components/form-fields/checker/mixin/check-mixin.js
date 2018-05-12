/*
* @Author: jankergg
* @Date:   2017-09-13 15:41:02
* @Last Modified by:   jankergg
* @Last Modified time: 2018-04-27 13:15:26
符合以下标准的方法或者变量才可放在本mixin
1、初始化操作 (触发验证，提交组件结果)
2、验证方法（可以按需重写）
3、innerValue更新逻辑
4、组件结果如何提交
5、onEvent方法（上报用户行为）
*/
import base from '../../mixin/base-mixin'
export default {
  data () {
    return {
      // innerValue的数据类型，一定要声明
      innerValue: ''
    }
  },
  mixins: [base],
  created () {
    this.checkInit()
  },
  methods: {
    checkInit () {
      this.innerValue = this.formModel.value
      this.onValidate()
      this.commit()
    },
    onCheck () {
      this.$nextTick(() => {
        let neo = this.__str(this.innerValue)
        if (neo !== this.__oldValue) {
          // 必须
          // vux 不同类型的组件，onHide触发时间不一致
          // 这里放到下一个Tick，对齐
          this.onEvent('onChange', {
            name: this.name,
            event: null,
            type: 'change',
            triggerType: 'onCheck',
            value: this.innerValue
          })
        }
      })
    },
    onChange (v) {
      let neo = this.__str(v)
      if (neo !== this.__oldValue) {
        this.innerValue = v
        this.onValidate()
        this.commit()
        this.$nextTick(() => {
          this.__oldValue = neo
        })
      }
    }
  }
}
