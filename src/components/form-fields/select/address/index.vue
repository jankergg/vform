<!--
      descript: native 省市区 组件
        author: jankergg
        param: props
        example:
-->
<template>
  <div class="web-select-box">
    <div class="select-mask" v-if="isReadOnly"></div>
    <x-address :list="datalist" placeholder="省 / 市 / 县" v-model="innerValue"
    @on-hide="onHide"
    @on-change="onChange"
    ></x-address>
  </div>
</template>
<script>
  import { XAddress } from '../../../vux'
  import rootSelectMx from '../mixin/select-mixin'

  const GET_DICTITEMS = ''
  export default {
    name: 'za-address',
    components: {
      XAddress
    },
    mixins: [rootSelectMx],
    data () {
      return {
        innerValue: null,
        innerErrors: null,
        originValue: [],
        originName: [],
        rawText: '',
        datalist: []
      }
    },
    props: ['formModel', 'name', 'index'],
    created () {
      this.innerValue = this.$value
    },
    watch: {
      innerValue (v) {
        this.onValidate()
        this.commit()
      },
      'formModel.value': {
        deep: true,
        handler (v) {
          this.$value = v
        }
      }
    },
    computed: {
      $value: {
        get () {
          let v = this.formModel.value
          if (typeof v == 'string') {
            return v.split('/')
          } else if (!v) {
            return []
          }
          return v
        },
        set (val) {
          let v = val
          if (typeof v === 'string') {
            v = v.split('/')
          } else if (!v) {
            v = []
          }
          this.innerValue = v
        }
      }
    },
    created () {
      if (!window.__select_area_data) {
        let data = require('./area')
        window.__select_area_data = data.areaData.data
      }
      this.datalist = JSON.parse(window.__select_area_data)
    },
    methods: {
      __errorMsg () {
        return this.innerValue && this.innerValue.length ? null : (this.formModel.rules.placeholder || '请选择省、市、区')
      },
      onHide () {
        let neo = this.__str(this.innerValue)
        if (neo !== this.__oldValue) {
          // 必须
          // vux 不同类型的组件，onHide触发时间不一致
          // 这里放到下一个Tick，对齐
          this.$nextTick(() => {
            let mod = this.innerModel()
            this.onEvent('onChange', {
              name: this.name,
              event: null,
              type: 'change',
              triggerType: 'onHide',
              value: mod.value
            })
          })
        }
      },
      innerModel () {
        let isValid = this.isValid
        let _address = {
          entry_province: {
            value: '',
            name: ''
          },
          entry_city: {
            value: '',
            name: ''
          },
          entry_district: {
            value: '',
            name: ''
          },
          detail: ''
        }
        // 保存默认地址数据，用来检验数据是否改动过
        let _$defAddr = this.__str(_address)
        let _value = this.innerValue || []
        if (_value.length && this.datalist.length) {
          let p = this.datalist.find(i => i.value == _value[0])
          _address.entry_province.name = p ? p.name : ''
          _address.entry_province.value = _value[0]
          let c = this.datalist.find(i => i.value == _value[1])
          _address.entry_city.name = c ? c.name : ''
          _address.entry_city.value = _value[1]
          let d = this.datalist.find(i => i.value == _value[2])
          _address.entry_district.name = d ? d.name : ''
          _address.entry_district.value = _value[2]
        }
        // console.error(this.__str(_value), this.__str(_address))
        // if not required
        if (!this.formModel.rules.vRules || this.formModel.rules.vRules.indexOf('required') === -1) {
          // if not touched
          if (_$defAddr === this.__str(_address)) {
            isValid = true
          }
        }
        // mixins update
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
