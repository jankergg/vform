<!--
      descript: input-btn 组件
        author: jankergg
        param: props
        example:
-->
<template>
  <div class="address-box">
    <!-- select 地址 abnormal模式： 即 可选择同投、被保人，并且选择按钮在第一排 -->
    <template v-if="rules.abnormal">
      <div class="baseBox">
        <div class="main">
          <span v-if="required" class="required">*</span>
          <div class="baseBoxLeft"><label class="input-label">{{model.rules.label}}</label></div>
          <div class="baseBoxright">
            <div class="txt">
              <div class="selectIcon" @click="setEmission(0)">
                <span class="icon-cricle" :class="{'active': isMiss=='0'}"></span>
                <span class="icon-text" :class="{'icon-text-active': isMiss=='0'}">同投保人</span>
              </div>
              <div class="selectIcon" @click="setEmission(1)">
                <span class="icon-cricle" :class="{'active': isMiss=='1'}"></span>
                <span class="icon-text" :class="{'icon-text-active': isMiss=='1'}">同被保人</span>
              </div>
              <div class="selectIcon" @click="setEmission(2)">
                <span class="icon-cricle" :class="{'active': isMiss=='2'}"></span>
                <span class="icon-text" :class="{'icon-text-active': isMiss=='2'}">其它</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 地址选择  -->
      <div class="baseBox">
        <div class="main">
          <div class="baseBoxright">
            <web-select-item
              @onChange="onChange"
              :inset="true"
              :rules="$rules"
              :value="selected"
              :name="name+'_select'">
            </web-select-item>
          </div>
        </div>
      </div>
      <!-- input 详细地址 -->
      <div class="baseBox">
        <div class="main">
          <div class="baseBoxright">
            <input-btn-item
              @onChange="onChangeDetail"
              @onEvent=""
              :inset="true"
              :rules="detailRules"
              :value="detail"
              :name="name+'_input'">
            </input-btn-item>
          </div>
        </div>
      </div>
    </template>
    <!-- 常规的地址模式，一个发射按钮 -->
    <template v-else>
      <div class="baseBox">
        <div class="main">
          <span v-if="required" class="required">*</span>
          <div class="baseBoxLeft"><label class="input-label">{{configs.rules.label}}</label></div>
          <div class="baseBoxright">
            <web-select-item
              @onChange="onChange"
              :inset="true"
              :rules="$rules"
              :value="selected"
              :name="name+'_select'">
            </web-select-item>
          </div>
        </div>
      </div>
      <!-- input 详细地址 -->
      <div class="baseBox" v-if="!model.rules.InputDetail">
        <div class="main">
          <span v-if="required" class="required">*</span>
          <div class="baseBoxLeft"> <label class="input-label">{{model.rules.detail.label}}</label></div>
          <div class="baseBoxright">
            <input-btn-item
              @onChange="onChangeDetail"
              @emission="onEmission"
              :rules="detailRules"
              :value="detail"
              :name="name+'_input'">
            </input-btn-item>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
  import inputBtnItem from '../../input/input-btn'
  import rootInput from '../../input/input'
  import webSelectItem from '../address'

  export default {
    name: 'za-address-full',
    data () {
      return {
        $rules: null,
        innerErrors: null,
        selected: this.innerValue,
        sResult: null,
        isMiss: '',
        sError: '',
        sValid: false,
        detail: this.innerValue ? this.innerValue.detail : '',
        dError: '',
        dValid: false
      }
    },
    props: ['formModel', 'name', 'index'],
    watch: {
      value (v) {
        this.innerValue = v
      },
      isMiss (v) {
        if (v === '') { return }
        if (this.isMiss !== '' && this.isMiss < 2) {
          this.$set(this.$rules.detail.rules, 'readOnly', true)
        } else {
          this.$set(this.$rules.detail.rules, 'readOnly', false)
        }
        this.$emit('emission', {target: this.$rules.detail.rules.emitTarget[this.isMiss], value: true})
      }
    },
    computed: {
      innerValue: {
        get () {
          let v = this.model.value
          if (!v) {
            v = {detail: ''}
          }
          return v
        },
        set (v) {
          if (!v) v = {}
          if (v.detail !== undefined) {
            this.detail = v.detail
          }
          this.selected = v
        }
      },
      detailRules () {
        return this.$rules.detail.rules
      },
      required () {
        if (this.$rules.vRules) {
          return this.$rules.vRules.indexOf('required') !== -1
        } else {
          return false
        }
      }
    },
    created () {
      this.selected = this.innerValue
      this.detail = this.innerValue ? this.innerValue.detail : ''
      this.$rules = this.model.rules
      // $rules 初始化
      if (this.$rules.detail) {
        // 修正为 input-btn类型
        if (this.$rules.detail.type === 'input') {
          this.$rules.detail.type = 'input-btn'
        }
        // if not required
        if (!this.$rules.vRules || this.$rules.vRules.indexOf('required') === -1) {
          if (this.$rules.detail.rules.vRules) {
            this.$rules.detail.rules.vRules = this.$rules.detail.rules.vRules.replace(/required/, '').replace(/^\|/, '')
          }
        }
      }
      // 同步按钮在上面
      if (this.$rules.abnormal) {
        this.$set(this.$rules.detail.rules, 'showExtBtn', false)
      }
      let $et = this.$rules.detail.rules.emitTarget
      if ($et) {
        if (!Array.isArray($et)) {
          this.$set(this.$rules.detail.rules, 'emitTarget', $et.split('$'))
        }
      } else {
        this.$set(this.$rules.detail.rules, 'emitTarget', [])
      }
    },
    methods: {
      onChange (e) {
        this.sResult = e.value
        this.sError = e.msg
        this.sValid = e.isValid
        this.emit()
      },
      onChangeDetail (e) {
        this.detail = e.value
        this.dError = e.msg
        this.dValid = e.isValid
        this.emit()
      },
      onVlid (e) {
        this.$emit('formValid', e)
      },
      emit () {
        let im = this.innerModel()
        this.$emit('formChange', im)
      },
      onEmission (v) {
        // missionTarget: 通知父组件需要更新哪个字段
        this.$emit('emission', v)
      },
      setEmission (v) {
        this.isMiss = v
        if (this.isMiss == '' || this.isMiss == '2') {
          //
        }
      },
      innerModel () {
        let _v = this.__clone(this.sResult || {})
        _v.detail = this.detail
        let _valid = this.sValid && this.dValid
        return {
          name: this.name,
          msg: _valid ? null : (this.sError || this.dError),
          isValid: _valid,
          value: _v
        }
      }
    },
    components: {
      inputBtnItem,
      webSelectItem,
      rootInput
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped></style>
