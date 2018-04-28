/*
* @Author: jankergg
* @Date:   2017-12-21 10:52:26
* @Last Modified by:   jankergg
* @Last Modified time: 2018-04-28 17:22:59
*/
// checker
import checkers from './checker'
// input
import inputs from './input'
// select
import selects from './select'

// question 组件 slot mixin
// 用来扩展新的 slot 组件
import questionSlot from './select/mixin/question-slot-mixin'
// export rootitems
export const ROOT_ITEM = {
  ...checkers.root,
  ...inputs.root,
  ...selects.root
}
// export form-row-items
export const FORM_ROW_ITEM = {
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

export const questionSlotMix = questionSlot