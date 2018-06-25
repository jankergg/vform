/*
* @Author: jankergg
* @Date:   2018-06-25 11:49:43
* @Last Modified by:   jankergg
* @Last Modified time: 2018-06-25 14:40:57
*/
import base from '../mixin/base-mixin'
export default {
  name: 'hidden',
  mixins: [base],
  template: '',
  render(){},
  created () {
    this.commit()
  },
  props: {
    index: [String, Number],
    name: String,
    formModel: Object
  },
  methods: {
    // 用于向formUnit提交数据更新
    commit() {
      let mod = this.innerModel()
      mod.isValid = true
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
      }
    },
  }
}