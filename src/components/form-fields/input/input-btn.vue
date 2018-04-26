<!--
      descript: input-btn 组件
        author: jankergg
        param: props
        example:
-->
<template>
  <!-- input 类型 -->
  <div class="input-btn-box">
    <root-input
      @formChange="onChange"
      @formPassed="onVlid"
      :rules="$rules"
      :value="innerValue"
      :name="name">
    </root-input>
    <div class="txt" v-if="$rules.showExtBtn == undefined||$rules.showExtBtn == true">
      <div class="selectIcon" @click="emission">
        <span class="icon-cricle" :class="{'active': isMiss}"></span>
        <span class="icon-text" :class="{'icon-text-active': isMiss}">{{$rules.txt}}</span>
      </div>
    </div>
    <!-- input 类型 -->
  </div>
</template>
<script>
  import rootInput from './input'

  export default {
    name: 'za-input-btn',
    data () {
      return {
        isMiss: false,
        innerErrors: null,
        innerValid: null
      }
    },
    props: ['rules', 'value', 'name'],
    watch: {
      value (v) {
        if (v === null || v === undefined) {
          return
        }
        this.innerValue = v
      }
    },
    computed: {
      $rules: {
        get () {
          return this.formModel.rules
        },
        set (val) {
          return val
        }
      },
      innerValue: {
        get () {
          return this.value
        },
        set () {}
      }
    },
    methods: {
      onChange (e) {
        this.$emit('formChange', e)
      },
      onVlid (e) {
        this.$emit('formValid', e)
      },
      emission () {
        this.isMiss = !this.isMiss
        this.$set(this.$rules, 'readOnly', this.isMiss)
        // missionTarget: 通知父组件需要更新哪个字段
        this.$emit('emission', {target: this.formModel.rules.emitTarget, value: this.isMiss})
      }
    },
    components: {
      rootInput
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped></style>
