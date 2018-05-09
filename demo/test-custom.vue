<!--
注意： 此处引用的所有内置组件，都必须要加上:inset="true"
所有自定义组件都需要满足以下要求：
1、props: ['formModel', 'name', 'inset']
2、使用innerValue存储组件的值(否则不兼容Mixin)
3、使用baseMixin，使组件行为一致，并自动把结果集成到formUnit

baseMixin 干了以下事情：
1. 挂载、更新组件值到innerValue
2. 基于innerValue验证组件状态
3. 向formUnit汇报组件状态
-->
<template>
  <div class="container">
    <row-2-col>
      <template slot="label">{{formModel.rules.label}}</template>
      <template slot="val">
        <div>
          姓名：
          <za-input @onChange="onNameChange" :formModel="nameModel" :inset="true" :index="index" name="name"></za-input>
        </div>
        <div>
          民族：
          <za-select @onChange="onSelectChange" :formModel="selectModel" :inset="true" :index="index" name="select"></za-select>
        </div>
      </template>
    </row-2-col>
  </div>
</template>

<script>
import zaInput from '../src/components/form-fields/input/input'
import zaSelect from '../src/components/form-fields/select/select'
import row2Col from '../src/components/layouts/row2col'
import baseMixin from '../src/components/form-fields/mixin/base-mixin'

export default {
  name: 'test-cust',
  mixins: [baseMixin],
  data() {
    return {
      innerValue: {
        name: '',
        select: ''
      }
    }
  },
  props: ['formModel', 'name', 'index'],
  created() {
    window.testcs = this
  },
  computed: {
    nameModel() {
      return {
        value: this.formModel.value.name,
        rules: this.formModel.rules.name
      }
    },
    selectModel() {
      return {
        value: this.formModel.value.select,
        rules: this.formModel.rules.select
      }
    }
  },
  methods: {
    onEvent(t, v) {
    },
    onNameChange(v) {
      console.warn('custNameChange::', v)
      this.$set(this.innerValue, v.name, v.value)
    },
    onSelectChange(v) {
      console.warn('custSelectChange::', v)
      this.$set(this.innerValue, v.name, v.value)
      // },
      // __toValue (v) {
      //   console.warn('=---------=', v)
      //   return v
    }
  },
  watch: {
    innerValue: {
      deep: true,
      handler(v) {
        this.commit()
      }
    }
  },
  components: {
    zaInput,
    zaSelect,
    row2Col
  }
}
</script>
