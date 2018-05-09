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
    <form-unit name="f1" :formModels="formModel" @formChange="onChange" @formEvent="onEvent">
      <template slot="cust">
        <div>
          <test-cust :formModel="formModel.cust" name="cust"></test-cust>
        </div>
      </template>
    </form-unit>
    <form-unit name="f2" :formModels="formModel2" @formChange="onChange" @formEvent="onEvent">
    </form-unit>
    <button @click="data1"> set data 1</button> <br>
    <button @click="data2"> set data 2</button>
  </div>
</template>

<script>
// 导入formUnit
import { formUnit } from '../src/components/form-units'
// 导入配置文件
import modelData from './formModel'
// 导入自定义组件
import testCust from './test-custom'

export default {
  name: 'test-unit',
  data() {
    return {
      formModel: {},
      formModel2: {}
    }
  },
  created() {
    window.test = this
  },
  methods: {
    onEvent(t, v) {
      console.warn(t, 'trigger: onEvent', v)
    },
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
    }
  },
  components: {
    formUnit,
    testCust
  }
}
</script>
