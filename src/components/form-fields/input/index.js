/*
* @Author: jankergg
* @Date:   2018-01-23 19:05:43
* @Last Modified by:   jankergg
* @Last Modified time: 2018-04-28 17:21:07
*/
import zaInput from './input'
import zaInputBtn from './input-btn'
import zaInputTxt from './input-txt'
import zaInputCamera from './input-camera'
import zaTextarea from './textarea'

export {
  zaInput,
  zaInputBtn,
  zaInputTxt,
  zaInputCamera,
  zaTextarea
}

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
