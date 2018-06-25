/*
* @Author: jankergg
* @Date:   2017-12-21 10:52:26
* @Last Modified by:   jankergg
* @Last Modified time: 2018-06-25 13:56:07
*/
// checker
import checkers from './checker'
// input
import inputs from './input'
// select
import selects from './select'

import zaText from './text'
import zaTitle from './title'
import hidden from './hidden'

export default {
  ...checkers.inline,
  ...checkers.block,
  ...inputs.inline,
  ...inputs.block,
  ...selects.inline,
  ...selects.block
}
// question 组件 slot mixin 用来扩展新的 slot 组件
import questionSlot from './select/mixin/question-slot-mixin'
// export rootitems
export const ROOT_ITEM = {
  ...checkers.root,
  ...inputs.root,
  ...selects.root
}
// export form-row-items
export const FORM_ROW_ITEM = {
  zaText,
  ...checkers.inline,
  ...inputs.inline,
  ...selects.inline
}
// export form-blocks
export const FORM_BLOCK_ITEM = {
  ...checkers.block,
  ...inputs.block,
  ...selects.block
}

export {zaTitle, questionSlot, hidden}