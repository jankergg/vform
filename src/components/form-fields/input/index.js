/*
* @Author: jankergg
* @Date:   2018-01-23 19:05:43
* @Last Modified by:   jankergg
* @Last Modified time: 2018-02-13 10:48:05
*/
import zaInput from './input'
import zaInputBtn from './input-btn'
import zaInputTxt from './input-txt'
import zaInputCamera from './input-camera'
import zaTextarea from './textarea'

export default {
  root: { zaInput },
  inline: {
    zaInput,
    zaInputBtn,
    zaInputTxt,
    zaInputCamera
  },
  block: {
    zaTextarea
  }
}
