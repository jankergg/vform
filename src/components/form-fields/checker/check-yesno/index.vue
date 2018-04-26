<!--
      descript: yes-no 组件
        author: jankergg
        param: props
        example:
-->
<template>
   <!-- 是否 类型 -->
  <div class="radio">
    <div class="radio-button">
      <span :class="{active: innerValue === 'true' || innerValue === 'yes'}" @click="check(true)">是</span>
      <span :class="{active: innerValue === 'false' || innerValue === 'no'}" @click="check(false)">否</span>
    </div>
  </div>
  <!-- 是否 类型 -->
</template>

<script>
  export default {
    name: 'za-yesno',
    data () {
      return {
        innerValue: this.modValue,
        dataType: 'bool',
        isValid: false
      }
    },
    props: ['rules', 'name', 'value'],
    watch: {
      value (v) {
        if (JSON.stringify(v) !== JSON.stringify(this.innerValue)) {
          this.modValue = v
        }
      },
      innerValue (v) {
        this.isValid = !(this.innerValue === null)
        if (v == 'yes' || v == 'no') {
          this.dataType = 'str'
        }
        this.emit()
      }
    },
    computed: {
      modValue: {
        set (v) {
          if (typeof v === 'boolean') {
            this.innerValue = v + ''
          } else if (!v) {
            this.innerValue = null
          } else {
            this.innerValue = v
          }
        },
        get () {
          let v
          if (typeof this.value === 'boolean') {
            v = this.value + ''
          } else if (!this.value) {
            v = null
          } else {
            v = this.value
          }
          return v
        }
      }
    },
    methods: {
      init () {
        this.innerValue = this.modValue
      },
      check (val) {
        this.innerValue = val + ''
      },
      emit () {
        let mod = this.innerModel()
        this.$emit('formChange', mod)
        this.$emit('input', mod.value)
      },
      innerModel () {
        let _v = this.innerValue + ''
        if (this.dataType == 'str') {
          if (_v === 'true') {
            _v = 'yes'
          } else if (_v === 'false') {
            _v = 'no'
          }
        }
        return {
          name: this.name,
          value: _v,
          msg: this.isValid ? null : ((this.formModel.rules && this.formModel.rules.errorMsg) || '请选择是或者否'),
          isValid: this.isValid
        }
      }
    }
  }
</script>

<style lang='less' scoped></style>
