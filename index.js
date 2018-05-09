/*
* @Author: jankergg
* @Date:   2018-01-23 17:24:29
* @Last Modified by:   jankergg
* @Last Modified time: 2018-05-02 14:32:52
*/
import Components from './src/components'
import baseMixin from './src/components/form-fields/mixin/base-mixin'
// formUnit
const formUnit = Components.formUnit

// form fields
// src/components/form-fields/check
const zaSex = Components.zaSex
const zaYesno = Components.zaYesno
const zaCheckList = Components.zaCheckList
const zaCheckItem = Components.zaCheckItem
const zaQuestion = Components.zaQuestion

// src/components/form-fields/input
const zaInput = Components.zaInput
const zaInputBtn = Components.zaInputBtn
const zaInputTxt = Components.zaInputTxt
const zaInputCamera = Components.zaInputCamera
const zaTextarea = Components.zaTextarea

// src/components/form-fields/select
const zaSelect = Components.zaSelect
const zaDate = Components.zaDate
const zaAddress = Components.zaAddress
const zaAddressFull = Components.zaAddressFull

const row1Col = Components.row1Col
const row2Col = Components.row2Col
const row3Col = Components.row3Col

export {
  baseMixin,
  formUnit,
  zaSex,
  zaYesno,
  zaCheckList,
  zaCheckItem,
  zaQuestion,
  zaInput,
  zaInputBtn,
  zaInputTxt,
  zaInputCamera,
  zaTextarea,
  zaSelect,
  zaDate,
  zaAddress,
  zaAddressFull,
  row1Col,
  row2Col,
  row3Col
}
