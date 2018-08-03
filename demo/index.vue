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
    <za-title :titleClass="tc">这个是表单标题</za-title>
    <check-list
      :title="'请选择'"
      label-position="right"
      required
      :options="commonList"
      v-model="checklist001"
      @on-change="onCheck"></check-list>
    <form-unit name="f1" :formModels="formModel" @formChange="onChange" @formEvent="onEvent">
      <template slot="cust">
        <div>
          <test-cust :formModel="formModel.cust" name="cust"></test-cust>
        </div>
      </template>
    </form-unit>
    <form-unit name="f2" :formModels="formModel2" @formChange="onChange" @formEvent="onEvent">
    </form-unit>
    <button @click="showActionSheet = true">show ActionSheet</button>
    <button @click="showConfirm">show ConfirmPlugin</button>
    <button @click="data1"> set data 1</button>
    <button @click="data2"> set data 2</button>
    <button @click="nextStep"> next step </button>

    <div v-transfer-dom>
      <actionsheet v-model="showActionSheet" :menus="{menu1: '苹果', menu2: '三星', menu3: '华为'}">
      </actionsheet>
    </div>
  </div>
</template>

<script>
// 导入formUnit
import Vue from 'vue'
import { formUnit} from '../src/components/form-units'
import { Tab, TabItem } from '../src/components/vux'
import {TransferDom, actionsheet, AlertPlugin, ConfirmPlugin, ToastPlugin, LoadingPlugin, zaTitle,checkList} from '../'
// 导入配置文件
import modelData from './formModel'
// 导入自定义组件
import testCust from './test-custom'
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)

export default {
  name: 'test-unit',
  data() {
    return {
      formModel: {},
      showActionSheet: false,
      commonList: ['China', 'Japan', 'America' ],
      checklist001: [],
      formModel2: modelData,
      tc: 'some-title-class'
    }
  },
  created() {
    window.test = this
    window.ap = AlertPlugin
  },
  directives: {
    TransferDom
  },
  methods: {
    onEvent(t, v) {
      console.warn(t, 'trigger: onEvent', v)
    },
    onItemClick(){},
    onCheck(v){
      console.log(v)
    },
    onChange(v) {
      console.warn('trigger: formChange::', v)
    },
    showConfirm(){
      this.$vux.confirm.show({
        title: 'Title',
        content: 'Content',
        confirmText: 'xxxxx'
      })
    },
    data1() {
      let nd = JSON.parse(JSON.stringify(modelData))
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
      // 获取name为f2的表单
      let fm = this.getForm('f2')
      fm.validateAll().then(res=>{
        console.log('resssssssssssssssssssss:', res)
        if (res===true) {
          alert('通过')
        } else {
          alert(fm.getErrorMsg())
        }
      })
    }
  },
  components: {
    actionsheet,
    formUnit,
    testCust,
    Tab, TabItem,checkList,
    zaTitle
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

