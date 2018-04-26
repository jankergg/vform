/*
* @Author: jankergg
* @Date:   2017-09-13 15:41:02
* @Last Modified by:   jankergg
* @Last Modified time: 2018-02-02 18:34:15
*/

export default {
  data () {
    return {
      autoTrigger: this.formModel.rules.autoTrigger
    }
  },
  created () {
    if (this.formModel.rules.autoTrigger === undefined) {
      this.autoTrigger = true
    }
    this.__init__autotrigger = this.autoTrigger
  },
  methods: {
    // popup show
    onShow (e) {
      if (this.autoTrigger === false) {
        this.autoTrigger = true
      }
    },
    // popup hide
    onHide (v) {
      if (this.autoTrigger === this.__init__autotrigger) { return }
      this.$nextTick(() => {
        this.autoTrigger = this.__init__autotrigger
      })
    },
    onChange (v) {
      if (!this.__lastValue || this.__lastValue !== this.__str(v)) {
        this.__lastValue = this.__str(v)
        this.$emit('onEvent', {
          name: this.name,
          event: 'change',
          type: 'change',
          value: v
        })
      }
      this.innerValue = v
    }
  }
}
