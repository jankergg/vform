/*
* @Author: jankergg
* @Date:   2018-01-24 15:54:15
* @Last Modified by:   jankergg
* @Last Modified time: 2018-04-25 16:12:59
*/
import zaAddress from './address'
import zaSelect from './select'
import zaDate from './date'
import zaAddressFull from './address-full'

export default {
  root: { zaSelect },
  inline: {
    zaSelect,
    zaDate,
    zaAddress
  },
  block: {
    zaAddressFull
  }
}
