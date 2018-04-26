<!--
      descript: 单选组件
        author: jankergg
        param: props

      methods:
   seledcheck: 用于选择默认值 传入一个索引数即可
-->
<template>
  <div class="choose_gender">
    <div class="choose_gender_content" :class="{dis: rules && rules.disabled === true}">
      <div class="male" :class="{seled: seled === true}" @click="onChange('M')">男</div>
      <div class="famale" :class="{seled: seled === false}" @click="onChange('F')">女</div>
    </div>
  </div>
</template>
<script>
import rootSelectMx from '../mixin/check-mixin'

export default {
  name: 'za-sex',
  data () {
    return {
      // 接受多种形式的性别字段传值，‘男、女’ 或者‘M/F’ 默认 M/F
      // 为保证接口字段修改过渡时期的正常显示
      alias: {
        'M': 'M',
        'F': 'F',
        '男': 'M',
        '女': 'F'
      },
      innerValue: null,
      seled: this._gender
    }
  },
  mixins: [rootSelectMx],
  props: {
    value: {
      type: [String, Number]
    },
    rules: {
      type: [Object]
    },
    name: {
      type: String
    }
  },
  computed: {
    _gender: {
      get () {
        if (this.alias[this.value] === 'M') {
          return true
        } else if (this.alias[this.value] === 'F') {
          return false
        }
        return null
      },
      set (v) {
        if (this.alias[v] === 'M') {
          this.seled = true
        } else if (this.alias[v] === 'F') {
          this.seled = false
        } else {
          this.seled = null
        }
      }
    },
    keys () {
      return Object.keys(this.alias)
    }
  },
  watch: {
    value (val) {
      this._gender = val
    },
    seled (v) {
      this.emit()
    }
  },
  methods: {
    init () {
      this.seled = this._gender
    },
    onChange (val) {
      if (this.formModel.rules && this.formModel.rules.disabled) {
        return
      }
      for (let i in this.alias) {
        if (this.alias[i] === val) {
          this._gender = i
          break
        }
      }
    },
    emit () {
      let mod = this.innerModel()
      this.$emit('formChange', mod)
    },
    innerModel () {
      let evalue = ''
      if (this.seled === true) {
        evalue = this.keys[0]
      } else if (this.seled === false) {
        evalue = this.keys[1]
      }
      this.innerValue = evalue
      // mixins update
      return {
        name: this.name,
        value: this.innerValue,
        msg: this.formModel.rules && (this.formModel.rules.errorMsg || this.formModel.rules.placeholder || '请选择性别'),
        isValid: (this.seled === false || this.seled === true) ? true : !!this.seled
      }
    }
  }
}
</script>
<style lang='less'></style>
