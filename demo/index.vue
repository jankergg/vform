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
    <tab>
      <tab-item selected @on-item-click="onItemClick">已发货</tab-item>
      <tab-item @on-item-click="onItemClick">未发货</tab-item>
      <tab-item @on-item-click="onItemClick">全部订单</tab-item>
    </tab>
    <form-unit name="f1" :formModels="formModel" @formChange="onChange" @formEvent="onEvent">
      <template slot="cust">
        <div>
          <test-cust :formModel="formModel.cust" name="cust"></test-cust>
        </div>
      </template>
    </form-unit>
    <form-unit name="f2" :formModels="formModel2" @formChange="onChange" @formEvent="onEvent">
    </form-unit>
    <button @click="data1"> set data 1</button>
    <button @click="data2"> set data 2</button>
    <button @click="nextStep"> next step </button>
  </div>
</template>

<script>
// 导入formUnit
import Vue from 'vue'
import { formUnit } from '../src/components/form-units'
import { Tab, TabItem } from '../src/components/vux'
import {AlertPlugin, ConfirmPlugin, ToastPlugin} from '../'
// 导入配置文件
import modelData from './formModel'
// 导入自定义组件
import testCust from './test-custom'
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(ToastPlugin)
export default {
  name: 'test-unit',
  data() {
    return {
      formModel: {},
      formModel2: modelData
    }
  },
  created() {
    window.test = this
    window.ap = AlertPlugin
  },
  methods: {
    onEvent(t, v) {
      console.warn(t, 'trigger: onEvent', v)
    },
    onItemClick(){},
    onChange(v) {
      console.warn('trigger: formChange::', v)
    },
    data1() {
      let nd = this.$children[0].__clone(modelData)
      // let nd = {}
      nd['home'] = {
        value: 'xuchang',
        rules: {
          label: 'home',
          type: 'za-input',
          vRules: 'required',
          placeholder: '请输入',
          errorMsg: '请输入'
        }
      }
      nd['address'] = {
        value: '',
        rules: {
          label: 'address',
          type: 'za-address',
          vRules: 'required',
          showDetail: true,
          placeholder: '请输入',
          errorMsg: '请输入'
        }
      }
      nd['cust'] = {
        value: {
          select: 'sssss',
          name: 'jankergg'
        },
        rules: {
          label: '个人信息',
          select: {
            label: '国家',
            vRules: 'required',
            options: [['aaaaa', 'bbbbb', 'ccccc']],
            placeholder: '请输入',
            errorMsg: '请输入'
          },
          name: {
            label: '名字',
            vRules: 'required',
            placeholder: '请输入',
            errorMsg: '请输入'
          }
        }
      }
      this.formModel = nd
    },
    data2() {
      // let nd = this.$children[0].__clone(modelData)
      let nd = {}
      nd['work'] = {
        value: 'zhongan',
        rules: {
          label: 'work',
          type: 'za-input',
          vRules: 'required',
          placeholder: '请输入',
          errorMsg: '请输入'
        }
      }
      nd['position'] = {
        value: 'yyy',
        rules: {
          label: 'position',
          type: 'za-select',
          vRules: 'required',
          options: [['xxx', 'yyy', 'ooo']],
          placeholder: '请输入',
          errorMsg: '请输入'
        }
      }
      this.formModel2 = nd
    },
    nextStep(){
      let fm = this.getForm('f2')
      fm.validateAll().then(res=>{
        if (res) {
          alert('通过')
        } else {
          alert(fm.getErrorMsg())
        }
      })
    }
  },
  components: {
    formUnit,
    testCust,
    Tab, TabItem
  }
}
</script>
<style lang='less' scoped>
  @import '../src/styles/variable.less';
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

