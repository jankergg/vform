import zaQuestion from './check-question'
import zaSex from './check-sex'
import zaYesno from './check-yesno'

export {
  zaSex,
  zaYesno,
  zaQuestion
}

export default {
  root: { },
  inline: {
    zaSex,
    zaYesno
  },
  block: {
    zaQuestion
  }
}
