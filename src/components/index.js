/*
* @Author: jankergg
* @Date:   2018-01-23 18:56:42
* @Last Modified by:   jankergg
* @Last Modified time: 2018-06-25 12:31:50
*/
import {formUnit, formUnitBase, unitMix, multiMix} from './form-units'
import formFileds from './form-fields'
import {zaTitle} from './form-fields'
import row1Col from './layouts/row1col'
import row2Col from './layouts/row2col'
import row3Col from './layouts/row3col'

export default {
  formUnit, formUnitBase, unitMix, multiMix,
  ...formFileds,
  zaTitle,
  row1Col,
  row2Col,
  row3Col
}

