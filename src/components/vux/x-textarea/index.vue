<template>
  <textarea class="weui-textarea" :autocomplete="autocomplete" :autocapitalize="autocapitalize" :autocorrect="autocorrect" :spellcheck="spellcheck" :placeholder="placeholder" :readonly="readonly" :name="name" :rows="rows" :cols="cols" v-model="currentValue" @focus="$emit('on-focus')" @blur="$emit('on-blur')" @input="onEvent" :style="textareaStyle" :maxlength="max" ref="textarea"></textarea>
</template>

<script>
import Autosize from 'autosize' // prop.autosize

export default {
  name: 'x-textarea',
  mounted() {
    // prop.autosize
    this.$nextTick(() => {
      if (this.autosize) {
        this.bindAutosize()
      }
    })
    // prop.autosize
  },
  props: {
    value: String,
    name: String,
    placeholder: String,
    readonly: Boolean,
    rows: {
      type: Number,
      default: 3
    },
    max: {
      type: Number,
      default: 140
    },
    cols: {
      type: Number,
      default: 30
    },
    height: Number,
    // https://github.com/yisibl/blog/issues/3
    autocomplete: {
      type: String,
      default: 'off'
    },
    autocapitalize: {
      type: String,
      default: 'off'
    },
    autocorrect: {
      type: String,
      default: 'off'
    },
    spellcheck: {
      type: String,
      default: 'false'
    },
    autosize: Boolean // prop.autosize
  },
  created() {
    this.currentValue = this.value
  },
  watch: {
    // prop.autosize
    autosize(val) {
      this.unbindAutosize()
      if (val) {
        this.bindAutosize()
      }
    },
    // prop.autosize
    value(val) {
      this.currentValue = val
    },
    currentValue(newVal) {
      if (this.max && newVal && newVal.length > this.max) {
        this.currentValue = newVal.slice(0, this.max)
      }
      this.$nextTick(() => {
        this.$emit('input', this.currentValue)
        this.$emit('on-change', this.currentValue)
      })
    }
  },
  data() {
    return {
      currentValue: ''
    }
  },
  computed: {
    count() {
      let len = 0
      if (this.currentValue) {
        len = this.currentValue.replace(/\n/g, 'aa').length
      }
      return len > this.max ? this.max : len
    },
    textareaStyle() {
      if (this.height) {
        return {
          height: `${this.height}px`
        }
      }
    }
  },
  methods: {
    onEvent(v) {
      this.$emit('on-event', v)
    },
    // prop.autosize
    bindAutosize() {
      Autosize(this.$refs.textarea)
    },
    unbindAutosize() {
      Autosize.destroy(this.$refs.textarea)
    }
  },
  // prop.autosize
  beforeDestroy() {
    this.unbindAutosize()
  }
  // prop.autosize
}
</script>
