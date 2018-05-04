<template>
  <div class="container">
    <form-unit
    :formModels="formModel"
    @formChange="onChange"
    @formEvent="onEvent">
      <template slot="cust">
        <div>
          <test-cust
            :formModel="formModel.cust"
            :name="'cust'"
          ></test-cust>
        </div>
      </template>
    </form-unit>
    <button @click="data1"> set data 1</button> <br>
    <button @click="data2"> set data 2</button>
  </div>
</template>

<script>
import { formUnit } from '../components/form-units'
import modelData from './formModel'
import testCust from './test-custom'

export default {
  name: 'test-unit',
  data () {
    return {
      formModel: {}
    }
  },
  created () {
    window.test = this
  },
  methods: {
    onEvent (t, v) {
      console.warn(t, 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', v)
    },
    onChange (v) {
      console.warn('formChange::', v)
    },
    data1 () {
      let nd = this.$children[0].__clone(modelData)
      // let nd = {}
      nd['home'] =  {
        value: 'xuchang',
        rules: {
          label: 'home',
          type: 'za-input',
          vRules: 'required',
          placeholder: '请输入',
          errorMsg: '请输入'
        }
      }
      nd['address'] =  {
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
      this.formModel = nd
    },
    data2 () {
      // let nd = this.$children[0].__clone(modelData)
      let nd = {}
      nd['work'] =  {
        value: 'zhongan',
        rules: {
          label: 'work',
          type: 'za-input',
          vRules: 'required',
          placeholder: '请输入',
          errorMsg: '请输入'
        }
      }
      nd['position'] =  {
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
    }
  },
  components: {
    formUnit,
    testCust
  }
}
</script>
