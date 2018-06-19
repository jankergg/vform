<!--
  这是一个demo
  用来演示formUnit如何使用，以及通过slot和baseMixin来扩展表单组件

  说明：form-unit
  name: 该字段为可选项，默认会生成一个随机id.
  formModels: 必填。接收一个配置文件，用来初始化表单。也可以先给空对象，再动态修改。
  formChange/formEvent 可选。用来处理回调
-->
<template>
  <div class="container">
    <form-unit name="f1" :formModels="formModel" @formChange="onChange" @formEvent="onEvent"></form-unit>
  </div>
</template>

<script>
// 导入formUnit
import Vue from 'vue'
import { formUnit} from '../src/components/form-units'

// 导入配置文件
const modelData = {
  certType: {
    value: '',
    rules: {
      label: 'certType',
      type: 'za-select',
      vRules: 'required',
      placeholder: '请输入',
      showName: true,
      errorMsg: '请输入证件类型',
      options: [[{value: 'idcard',name: '身份证'},{value: 'bankcard', name: '银行卡'}]]
    }
  },
  certNo: {
    value: '',
    rules: {
      label: '证件号码',
      type: 'za-input',
      vRules: 'required|bankcard',
      placeholder: '请输入'
    }
  }
}

export default {
  name: 'hsr-unit',
  data() {
    return {
      formModel: modelData
    }
  },
  created() {
    window.test = this
  },
  methods: {
    onEvent(t, v) {
      console.warn(t, 'trigger: onEvent', v)
      const fm = this.getForm('f1')
      if (v.name === 'certType'){
        let mod = JSON.parse(JSON.stringify(this.formModel))
        mod.certNo.rules.vRules = 'required|'+ v.value[0]

        Object.keys(fm.formValues).map(key =>{
          mod[key].value = fm.formValues[key]
        })
        this.$nextTick(()=>{
          this.formModel.certNo.rules.vRules = 'required|'+ v.value[0]
        })
      }
    },
    onChange(v) {
      // console.warn('trigger: formChange::', v)
    }
  },
  components: {
    formUnit
  }
}
</script>
<style lang='less' scoped>
  @import '~@/assets/styles/variable.less';
  .container {
    padding:5px;
    font-size: 12px;
    button {
      padding: 8px;
      text-align:center;
      width:150px;
      display:block;
      box-sizing: border-box;
      border: 1px solid yellowgreen;
      background: lightseagreen;
      margin: 1rem auto 0;
    }
  }
</style>

