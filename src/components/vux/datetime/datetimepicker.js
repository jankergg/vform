import Scroller from '../picker/scroller'
import { each, trimZero, addZero, getMaxDay, parseRow, parseDate, getElement, toElement, removeElement } from './util'
import { getYears, getMonths, getDays } from './makeData'

const MASK_TEMPLATE = '<div class="dp-mask"></div>'

const TEMPLATE = `<div class="dp-container">
  <div class="dp-header">
    <div class="dp-item dp-left vux-datetime-cancel" data-role="cancel">取消</div>
    <div class="dp-item vux-datetime-clear" data-role="clear"></div>
    <div class="dp-item dp-right vux-datetime-confirm" data-role="confirm">确定</div>
  </div>
  <div class="dp-content">
    <div class="dp-item" data-role="year"></div>
    <div class="dp-item" data-role="month"></div>
    <div class="dp-item" data-role="day"></div>
    <div class="dp-item" data-role="hour"></div>
    <div class="dp-item" data-role="minute"></div>
  </div>
</div>`

var SHOW_ANIMATION_TIME = 100 // ms
var SHOW_CONTAINER_TIME = 300

var TYPE_MAP = {
  year: ['YYYY'],
  month: ['MM', 'M'],
  day: ['DD', 'D'],
  hour: ['HH', 'H'],
  minute: ['mm', 'm']
}

var MASK = null

var CURRENT_PICKER

var NOW = new Date()

var DEFAULT_CONFIG = {
  template: TEMPLATE,
  trigger: null,
  output: null,
  currentYear: NOW.getFullYear(),
  currentMonth: NOW.getMonth() + 1,
  minYear: 2000,
  maxYear: 2030,
  minHour: 0,
  maxHour: 23,
  hourList: null,
  minuteList: null,
  startDate: null,
  endDate: null,
  yearRow: '{value}',
  monthRow: '{value}',
  dayRow: '{value}',
  hourRow: '{value}',
  minuteRow: '{value}',
  format: 'YYYY-MM-DD',
  value: NOW.getFullYear() + '-' + (NOW.getMonth() + 1) + '-' + NOW.getDate(),
  onSelect () {},
  onConfirm () {},
  onClear () {},
  onShow () {},
  onHide () {},
  confirmText: '确定',
  clearText: '',
  cancelText: '取消',
  destroyOnHide: false
}

function renderScroller (el, data, value, fn) {
  data = data.map(one => {
    one.value = one.value + ''
    return one
  })
  return new Scroller(el, {
    data,
    defaultValue: value + '',
    onSelect: fn
  })
}

function showMask () {
  if (!MASK) {
    MASK = toElement(MASK_TEMPLATE)
    document.body.appendChild(MASK)

    MASK.addEventListener('click', function () {
      CURRENT_PICKER && CURRENT_PICKER.hide()
    }, false)
  }

  MASK.style.display = 'block'

  setTimeout(function () {
    MASK && (MASK.style.opacity = 0.5)
  }, 0)
}

function hideMask () {
  if (!MASK) {
    return
  }

  MASK.style.opacity = 0

  setTimeout(function () {
    MASK && (MASK.style.display = 'none')
    // hideMaskTimer = null
  }, SHOW_ANIMATION_TIME)
}

function DatetimePicker (config) {
  var self = this
  self.config = {}
  self.value = config.value || ''
  each(DEFAULT_CONFIG, function (key, val) {
    self.config[key] = config[key] || val
  })

  if (config.defaultSelectedValue && !config.value) {
    self.config.value = config.defaultSelectedValue
  }

  if (typeof this.config.startDate === 'string') {
    this.config.startDate = new Date(this.config.startDate.replace(/-/g, '/'))
  }

  if (typeof this.config.endDate === 'string') {
    this.config.endDate = new Date(this.config.endDate.replace(/-/g, '/'))
  }

  if (this.config.startDate && !this.config.endDate) {
    this.config.endDate = new Date('2030-12-31')
  }

  this.reMakeData = !!this.config.startDate && !!this.config.endDate

  var trigger = self.config.trigger

  this.triggerHandler = function (e) {
    e.preventDefault()
    self.show(self.value)
  }
  if (trigger) {
    trigger = self.trigger = getElement(trigger)
    this.trigger = trigger
    this.trigger.addEventListener('click', this.triggerHandler, false)
  }
}

DatetimePicker.prototype = {

  _show (newValueMap) {
    var self = this

    self.container.style.display = 'block'

    each(TYPE_MAP, function (type) {
      self[type + 'Scroller'] && self[type + 'Scroller'].select(trimZero(newValueMap[type]), false)
    })

    setTimeout(function () {
      self.container.style['-webkit-transform'] = 'translateY(0)'
      self.container.style.transform = 'translateY(0)'
    }, 0)
  },
  show (value) {
    var self = this
    var config = self.config
    CURRENT_PICKER = self
    var valueMap = self.valueMap = parseDate(config.format, value || config.value)
    var newValueMap = {}

    each(TYPE_MAP, function (type, list) {
      newValueMap[type] = list.length === 1 ? valueMap[list[0]] : (valueMap[list[0]] || valueMap[list[1]])
    })

    if (self.container) {
      self._show(newValueMap)
    } else {
      var container = self.container = toElement(config.template)
      document.body.appendChild(container)

      self.container.style.display = 'block'

      container.addEventListener('touchstart', function (e) {
        // e.preventDefault()
      }, false)

      each(TYPE_MAP, function (type) {
        // 清除格式里没有列
        var div = self.find('[data-role=' + type + ']')
        if (newValueMap[type] === undefined) {
          removeElement(div)
          return
        }
        var data
        if (type === 'day') {
          data = self._makeData(type, trimZero(newValueMap.year), trimZero(newValueMap.month))
        } else {
          data = self._makeData(type)
        }

        self[type + 'Scroller'] = renderScroller(div, data, trimZero(newValueMap[type]), function (currentValue) {
          config.onSelect.call(self, type, currentValue)
          var currentDay
          if (type === 'year') {
            var currentMonth = self.monthScroller ? self.monthScroller.value : config.currentMonth
            self._setMonthScroller(currentValue, currentMonth)
            if (self.dayScroller) {
              currentDay = self.dayScroller.value
              self._setDayScroller(currentValue, currentMonth, currentDay)
            }
          } else if (type === 'month') {
            var currentYear = self.yearScroller ? self.yearScroller.value : config.currentYear
            if (self.dayScroller) {
              currentDay = self.dayScroller.value
              self._setDayScroller(currentYear, currentValue, currentDay)
            }
          }
        })
      })

      if (!self.renderText) {
        if (self.config.confirmText) {
          self.find('[data-role=confirm]').innerText = self.config.confirmText
        }

        if (self.config.cancelText) {
          self.find('[data-role=cancel]').innerText = self.config.cancelText
        }
        if (self.config.clearText) {
          self.find('[data-role=clear]').innerText = self.config.clearText
        }
        self.renderText = true
      }

      this._show(newValueMap)

      self.find('[data-role=cancel]').addEventListener('click', function (e) {
        e.preventDefault()
        self.hide()
      }, false)

      self.find('[data-role=confirm]').addEventListener('click', function (e) {
        e.preventDefault()
        self.confirm()
      }, false)

      if (self.config.clearText) {
        self.find('[data-role=clear]').addEventListener('click', function (e) {
          e.preventDefault()
          self.clear()
        }, false)
      }
    }

    showMask()
    config.onShow.call(self)
  },

  _makeData (type, year, month) {
    var config = this.config
    var valueMap = this.valueMap
    var list = TYPE_MAP[type]
    var data = []
    var min
    var max

    if (type === 'year') {
      min = config.minYear
      max = config.maxYear
      if (this.reMakeData) {
        const { minYear, maxYear } = getYears(this.config.startDate, this.config.endDate)
        min = minYear
        max = maxYear
      }
    } else if (type === 'month') {
      min = 1
      max = 12
      if (this.reMakeData) {
        const { minMonth, maxMonth } = getMonths(this.config.startDate, this.config.endDate, this.yearScroller.value * 1)
        min = Math.max(min, minMonth)
        max = Math.min(max, maxMonth)
      }
    } else if (type === 'day') {
      min = 1
      max = getMaxDay(year, month)
      if (this.reMakeData) {
        const { minDay, maxDay } = getDays(this.config.startDate, this.config.endDate, this.yearScroller.value * 1, this.monthScroller.value * 1)
        min = Math.max(min, minDay)
        max = Math.min(max, maxDay)
      }
    } else if (type === 'hour') {
      min = this.config.minHour
      max = this.config.maxHour
    } else if (type === 'minute') {
      min = 0
      max = 59
    }
    for (var i = min; i <= max; i++) {
      var name
      if (type === 'year') {
        name = parseRow(config.yearRow, i)
      } else {
        var val = valueMap[list[0]] ? addZero(i) : i
        name = parseRow(config[type + 'Row'], val)
      }
      data.push({
        name: name,
        value: i
      })
    }
    if (type === 'hour' && this.config.hourList) {
      data = this.config.hourList.map(hour => {
        return {
          name: parseRow(config['hourRow'], hour),
          value: addZero(hour)
        }
      })
    }
    if (type === 'minute' && this.config.minuteList) {
      data = this.config.minuteList.map(minute => {
        return {
          name: parseRow(config['minuteRow'], minute),
          value: addZero(minute)
        }
      })
    }
    return data
  },

  // after year change
  _setMonthScroller (currentValue, month) {
    const self = this
    this.monthScroller.destroy()
    var div = self.find('[data-role=month]')
    self.monthScroller = renderScroller(div, self._makeData('month'), month, function (currentValue) {
      self.config.onSelect.call(self, 'month', currentValue)
      var currentYear = self.yearScroller ? self.yearScroller.value : self.config.currentYear
      if (self.dayScroller) {
        const currentDay = self.dayScroller.value
        self._setDayScroller(currentYear, currentValue, currentDay)
      }
    })
  },

  _setDayScroller (year, month, day) {
    var self = this
    var maxDay = getMaxDay(year, month)
    if (day > maxDay) {
      day = maxDay
    }
    self.dayScroller.destroy()
    var div = self.find('[data-role=day]')
    self.dayScroller = renderScroller(div, self._makeData('day', year, month), day, function (currentValue) {
      self.config.onSelect.call(self, 'day', currentValue)
    })
  },

  find (selector) {
    return this.container.querySelector(selector)
  },

  hide () {
    if (!this.container) {
      return
    }
    var self = this
    self.container.style.removeProperty('transform')
    self.container.style.removeProperty('-webkit-transform')

    setTimeout(function () {
      self.container && (self.container.style.display = 'none')
    }, SHOW_CONTAINER_TIME)

    hideMask()

    self.config.onHide.call(self)
    if (self.config.destroyOnHide) {
      setTimeout(() => {
        self.destroy()
      }, 500)
    }
  },

  select (type, value) {
    this[type + 'Scroller'].select(value, false)
  },

  destroy () {
    var self = this
    this.trigger && this.trigger.removeEventListener('click', this.triggerHandler, false)
    removeElement(MASK)
    removeElement(self.container)
    MASK = null
    self.container = null
  },

  getValue () {
    var self = this
    var config = self.config

    var value = config.format

    function formatValue (scroller, expr1, expr2) {
      if (scroller) {
        var val = scroller.value
        if (expr1) {
          value = value.replace(new RegExp(expr1, 'g'), addZero(val))
        }
        if (expr2) {
          value = value.replace(new RegExp(expr2, 'g'), trimZero(val))
        }
      }
    }

    each(TYPE_MAP, function (key, list) {
      formatValue(self[key + 'Scroller'], list[0], list[1])
    })

    return value
  },

  confirm () {
    var self = this
    var value = self.getValue()
    this.value = value

    if (self.config.onConfirm.call(self, value) === false) {
      return
    }

    self.hide()
  },

  clear () {
    var self = this
    var value = self.getValue()

    if (self.config.onClear.call(self, value) === false) {
      return
    }

    self.hide()
  }
}

export default DatetimePicker
