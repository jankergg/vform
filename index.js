/*
* @Author: jankergg
* @Date:   2018-01-23 17:24:29
* @Last Modified by:   jankergg
* @Last Modified time: 2018-05-31 16:43:10
*/
import Components from './src/components'
import baseMixin from './src/components/form-fields/mixin/base-mixin'
import AlertPlugin from './src/plugins/alert/index.js'
import ConfirmPlugin from './src/plugins/confirm/index.js'
import ToastPlugin from './src/plugins/toast/index.js'
import LoadingPlugin from './src/plugins/loading/index.js'
import {Tab, TabItem, checker, checkerItem, checkList} from './src/components/vux'
const {
  // formUnit
  formUnit,
  // form fields src/components/form-fields/check
  zaTitle,
  zaText,
  zaSex,
  zaYesno,
  zaButton_group,
  zaQuestion,

  // src/components/form-fields/input
  zaInput,
  zaInputBtn,
  zaInputTxt,
  zaInputCamera,
  zaTextarea,

  // src/components/form-fields/select
  zaSelect,
  zaDate,
  zaAddress,
  zaAddressFull,

  row1Col,
  row2Col,
  row3Col
} = Components

export {
  // from vux
  LoadingPlugin,
  Tab,
  TabItem,
  AlertPlugin,
  ConfirmPlugin,
  ToastPlugin,
  checker,
  checkerItem,
  checkList,

  // components
  baseMixin,
  formUnit,
  zaTitle,
  zaText,
  zaSex,
  zaYesno,
  zaButton_group,
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
