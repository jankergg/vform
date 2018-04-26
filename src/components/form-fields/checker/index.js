import zaCheckList from './check-list'
import zaCheckItem from './check-list/check-item'

import zaQuestion from './check-question'
import zaSex from './check-sex'
import zaYesno from './check-yesno'

export default {
  root: { },
  inline: {
    zaSex,
    zaYesno
  },
  block: {
    zaCheckList,
    zaCheckItem,
    zaQuestion
  }
}
