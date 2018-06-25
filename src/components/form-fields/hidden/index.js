/*
* @Author: jankergg
* @Date:   2018-06-25 11:49:43
* @Last Modified by:   jankergg
* @Last Modified time: 2018-06-25 12:37:54
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
  }
}