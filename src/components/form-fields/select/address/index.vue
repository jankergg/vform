<!--
      descript: native 省市区 组件
        author: jankergg
        param: props
        example:
-->
<template>
  <div class="web-select-box">
    <div class="root-select-mask" v-if="isReadOnly"></div>
    <x-address :list="datalist" placeholder="省 / 市 / 县" v-model="innerValue" @on-hide="onHide" @on-change="onChange"></x-address>
    <za-input v-if="showInput" @formEvent="onInputEvent" @formChange="onInputChange" :inset="true" :formModel="inputModel" :name="name">
    </za-input>
  </div>
</template>
<script>
import { XAddress } from '../../../vux'
import zaInput from '../../input/input'
import rootSelectMx from '../mixin/select-mixin'

export default {
  name: 'za-address',
  components: {
    XAddress,
    zaInput
  },
  mixins: [rootSelectMx],
  data() {
    return {
      innerErrors: null,
      innerValue: [],
      originValue: [],
      originName: [],
      rawText: '',
      inputValue: '',
      inputError: '',
      inputValid: false,
      inputModel: {
        rules: {
          type: 'za-input',
          vRules: 'required|min:8',
          readOnly: true,
          placeholder: '请输入详细地址'
        },
        value: this.formModel.value.detail
      },
      datalist: []
    }
  },
  props: ['formModel', 'name', 'index'],
  watch: {
    innerValue(v) {
      this.inputModel.rules.readOnly = !(v && v.length)
      this.onValidate()
      this.commit()
    }
  },
  computed: {
    showInput() {
      return this.formModel.rules.showDetail
    },
    $innerValue(){
      let v = this.formModel.value
      if (v.province && v.city && v.district){
        return [v.province, v.city, v.district]
      }
      console.warn('address组件初始value值设置不正确请参考 ：', {
        "province": "110000",
          "provinceDesc": "北京市",
          "city": "110100",
          "cityDesc": "北京市",
          "district": "110101",
          "districtDesc": "东城区",
          "detail": "圆明园路真光大楼"
      })
      return []
    }
  },
  created() {
    if (!window.__select_area_data) {
      let data = require('./area')
      window.__select_area_data = data.areaData.data
    }
    window.addr = this
    this.datalist = JSON.parse(window.__select_area_data)
    this.innerValue = this.$innerValue
  },
  methods: {
    onValidate() {
      return new Promise((resolve, reject) => {
        let mod = this.innerModel()
        this.isValid = mod.isValid
        if (this.isValid) {
          resolve(true)
        } else {
          reject(false)
        }
      }).catch(e => { return false })
    },
    onInputEvent(v) {
      let mod = this.innerModel()
      this.onEvent('onInput', {
        name: this.name,
        event: null,
        type: 'change',
        triggerType: 'onInput',
        value: mod.value
      })
    },
    onInputChange(v) {
      this.inputValue = v.value
      this.inputValid = v.isValid
      this.inputError = v.msg
      this.$nextTick(() => {
        this.onValidate()
        this.commit()
      })
    },
    __errorMsg() {
      if (this.showInput && !this.inputValid) {
        return this.inputError
      }
      return this.innerValue && this.innerValue.length ? null : (this.formModel.rules.placeholder || '请选择省、市、区')
    },
    onHide(v) {
      if (!v) { return }
      let neo = this.__str(this.innerValue)
      if (neo !== this.__oldValue) {
        // 必须
        // vux 不同类型的组件，onHide触发时间不一致
        // 这里放到下一个Tick，对齐
        this.$nextTick(() => {
          let mod = this.innerModel()
          this.onEvent('onHide', {
            name: this.name,
            event: null,
            type: 'change',
            triggerType: 'onHide',
            value: mod.value
          })
          this.__oldValue = neo
        })
      }
    },
    innerModel() {
      let isValid = this.isValid
      let _address = {
        "province": "",
        "provinceDesc": "",
        "city": "",
        "cityDesc": "",
        "district": "",
        "districtDesc": "",
        "detail": ""
      }
      // 保存默认地址数据，用来检验数据是否改动过
      let _$defAddr = this.__str(_address)
      let _value = this.innerValue || []
      if (_value.length && this.datalist.length) {
        let p = this.datalist.find(i => i.value == _value[0])
        _address.provinceDesc = p ? p.name : ''
        _address.province = _value[0]
        let c = this.datalist.find(i => i.value == _value[1])
        _address.cityDesc = c ? c.name : ''
        _address.city = _value[1]
        let d = this.datalist.find(i => i.value == _value[2])
        _address.districtDesc = d ? d.name : ''
        _address.district = _value[2]
      }
      // console.error(this.__str(_value), this.__str(_address))
      if (this.showInput) {
        isValid = this.inputValid
      }
      if (_$defAddr === this.__str(_address)) {
        isValid = false
      }
      // if not required
      if (!this.formModel.rules.vRules || this.formModel.rules.vRules.indexOf('required') === -1) {
        // if not touched
        isValid = true
      }
      // mixins update
      _address.detail = this.inputValue || ''
      return {
        name: this.name,
        value: this.__clone(_address),
        msg: this.__errorMsg(),
        isValid: isValid
      }
    }
  }
}
</script>

<style lang='less'></style>
