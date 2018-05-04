<!--
注意： 此处引用的所有内置组件，都必须要加上:inset="true"
-->
<template>
  <div class="container">
    <row-2-col>
      <template slot="label">{{formModel.rules.label}}</template>
      <template slot="val">
        <div>
          姓名：
          <za-input
            @onChange="onNameChange"
            :formModel="nameModel"
            :inset="true"
            :index="index"
            name="name">
          </za-input>
        </div>
        <div>
          民族：
          <za-select
            @onChange="onSelectChange"
            :formModel="selectModel"
            :inset="true"
            :index="index"
            name="select">
          </za-select>
        </div>
    </template>
  </row-2-col>
</div>
</template>

<script>
import zaInput from '../components/form-fields/input/input'
import zaSelect from '../components/form-fields/select/select'
import row2Col from '../components/layouts/row2col'
import baseMixin from '../components/form-fields/mixin/base-mixin'

export default {
  name: 'test-cust',
  mixins: [baseMixin],
  data () {
    return {
      innerValue: {
        name: '',
        select: ''
      }
    }
  },
  props: ['formModel', 'name', 'index'],
  created () {
    window.testcs = this
  },
  computed: {
    nameModel () {
      return {
        value: this.formModel.value.name,
        rules: this.formModel.rules.name
      }
    },
    selectModel () {
      return {
        value: this.formModel.value.select,
        rules: this.formModel.rules.select
      }
    }
  },
  methods: {
    onEvent (t, v) {
    },
    onNameChange (v) {
      console.warn('custNameChange::', v)
      this.$set(this.innerValue, v.name, v.value)
    },
    onSelectChange (v) {
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
      handler(v){
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
