<!--
      descript: yes-no 多级 组件
        author: jankergg
        param: props
        example:
-->
<template>
   <!-- 是否 类型 -->
  <div class="baseBox hotitle">
    <div class="main">
      <div class="baseBoxLeft"><label class="input-label">{{rules.label}}</label></div>
      <div class="baseBoxright atop">
        <div class="radio">
          <div class="radio-button">
            <span :class="{active: innerValue.yesorno === 'yes'}" @click="check(true)">是</span>
            <span :class="{active: innerValue.yesorno === 'no'}" @click="check(false)">否</span>
          </div>
        </div>
      </div>
    </div>
    <div class="check-list" v-if="showOptions">
      <template v-if="slotItem">
        <slot name="slotItem"></slot>
      </template>
      <template v-else>
      <slot :name="name">
        <ul>
          <li v-for="(item, key, index) in rules.options" :key="index">
            <label :for="key" class="labels">
              <input class="checkbox" type="checkbox" :id="key" :name="key" :checked="isChecked(key)" :value="key" v-model="innerValue.selected" />
              {{item.label}}
            </label>
          </li>
        </ul>
      </slot>
      </template>
    </div>
  </div>
  <!-- 是否 类型 -->
</template>

<script>
  export default {
    name: 'za-question',
    data () {
      return {
        innerValue: this.modValue,
        isValid: false,
        errorMsg: this.formModel.rules.errorMsg || this.formModel.rules.placeholder || this.formModel.rules.label + ': 还有未完成的选项'
      }
    },
    props: ['rules', 'name', 'value', 'slotItem'],
    created () {
      if (this.slotItem) {
        this.$slots.slotItem = this.slotItem
      }
    },
    watch: {
      value (v) {
        if (this.__str(v) !== this.__str(this.innerValue)) {
          this.modValue = v
        }
      },
      innerValue: {
        deep: true,
        handler (v) {
          if (this.innerValue.yesorno === 'yes') {
            this.isValid = this.formModel.rules.options ? this.onValidate() : true
          } else if (this.innerValue.yesorno === 'no') {
            this.isValid = true
          }
          this.emit()
        }
      }
    },
    computed: {
      showOptions () {
        return this.formModel.rules.options && this.innerValue.yesorno === 'yes' || !this.innerValue.yesorno
      },
      modValue: {
        set (v) {
          if (v.yesorno === undefined && v.selected === undefined) {
            v = {yesorno: 'no', selected: []}
          }
          if (typeof v.selected === 'string') {
            v.selected = v.selected.split('/')
          }
          // 处理接口异常数据
          if (v.selected === null) {
            v.selected = []
          }
          this.innerValue = v
        },
        get () {
          let v = this.value
          if (v.yesorno === undefined || v.selected === undefined) {
            v = {yesorno: 'no', selected: []}
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
        if (val) {
          this.$set(this.innerValue, 'yesorno', 'yes')
        } else {
          this.$set(this.innerValue, 'yesorno', 'no')
          this.$set(this.innerValue, 'selected', [])
          this.$set(this.innerValue, 'options', {})
        }
      },
      emit () {
        this.$emit('formChange', this.innerModel())
      },
      isChecked (key) {
        if (this.innerValue.selected.find) {
          return !!this.innerValue.selected.find(i => i == key)
        }
        return false
      },
      onValidate () {
        // 子组件会覆盖此处
        return !!this.innerValue.selected.length
      },
      innerModel () {
        return {
          name: this.name,
          value: this.__obj(this.innerValue),
          msg: this.isValid ? null : this.errorMsg,
          isValid: this.isValid
        }
      }
    }
  }
</script>

<style lang='less' scoped></style>
