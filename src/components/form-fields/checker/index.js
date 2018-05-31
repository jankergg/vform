import zaQuestion from './check-question'
import zaSex from './check-sex'
import zaYesno from './check-yesno'
import zaButton_group from './button_group'

export {
  zaSex,
  zaYesno,
  zaQuestion,
  zaButton_group
}

export default {
  root: { },
  inline: {
    zaSex,
    zaYesno,
    zaButton_group
  },
  block: {
    zaQuestion
  }
}
