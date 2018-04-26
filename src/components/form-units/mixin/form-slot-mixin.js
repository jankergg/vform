/**
 mix 组件
 auth: jankergg
 desc: 从父组件中访问slottr
 */
export default {
  computed: {
    mySlots () {
      let pslots = this.$parent.$slots
      if (this.isEmpty(pslots)) {
        return null
      }
      return pslots
    }
  },
  methods: {
    getSlotItem (name) {
      if (this.mySlots && this.mySlots[name]) {
        return this.mySlots[name]
      }
      return null
    },
    isEmpty (obj) {
      if (typeof obj === 'object') {
        if (Array.isArray(obj)) {
          return obj.length === 0
        } else {
          return Object.keys(obj).length === 0
        }
      } else {
        return obj === ''
      }
    }
  }
}
