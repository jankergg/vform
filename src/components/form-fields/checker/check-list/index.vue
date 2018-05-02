<template>
  <div class="checker-list-item">
    <div class="ui-cell" v-for="(item, index) in options" :key="item.index">
      <input type="checkbox" class="checkbox" :id="`checkbox_${uuid}_${index}`" :disabled="item.disabled" :value="item | getKey(item)" v-model="innerValue" @change="getData">
      <label :for="`checkbox_${uuid}_${index}`" :class="{disabled: item.disabled, 'ui-label-right': position === 'right', 'ui-label-left': position === 'left'}">
        {{item | getValue(item)}}
        <span class="detail" v-if="position == 'left' && detail" @click="goDetail(item.url)">详情</span>
      </label>
    </div>
  </div>
</template>
<script>
  import uuid from '../../../../mixin/uuid-mixin'
  import tools from '../../../../mixin/tools-mixin'

  export default {
    name: 'za-check-list',
    mixins: [uuid, tools],
    model: {
      prop: 'value',
      event: 'update'
    },
    props: {
      options: {
        type: [Array, Object],
        required: true
      },
      value: {
        type: Array,
        required: false,
        default: () => [],
        validator: (arr) => {
          if (arr.length > 0) {
            let temp = arr.filter(v => {
              if (typeof v !== 'string') {
                return true
              }
            })
            if (temp.length > 0) {
              console.warn('value中的每一项必须是由options中每个对象的key组成的一个数组')
              return false
            } else {
              return true
            }
          } else {
            return true
          }
        }
      },
      // 打钩的位置，默认为左边left，带有详情选项；right为右边，不带详情标签
      position: {
        type: String,
        default () {
          return 'left'
        }
      },
      detail: {
        type: Boolean,
        default () {
          return false
        }
      },
      title: {
        type: String,
        default () {
          return ''
        }
      },
      type: {
        type: String,
        default () {
          return 'checkbox'
        }
      },
      errorMsg: {
        type: String,
        default () {
          return '请至少选择一项'
        }
      },
      max: {
        type: Number,
        default () {
          return Array.isArray(this.options) ? this.options.length : Object.values(this.options).length
        }
      }
    },
    filters: {
      getValue: function (item) {
        return typeof item === 'object' ? item.value : item
      },
      getKey: function (item) {
        return typeof item === 'object' ? item.key : item
      }
    },
    data () {
      return {
        valid: '',
        innerValue: this.$midValue
      }
    },
    created () {
      this.innerValue = this.$midValue
    },
    computed: {
      $midValue: {
        get () {
          if (!this.value) return this.value
          if (this.type === 'checkbox') {
            if (typeof this.value[0] === 'string') return this.value
            let arr = []
            for (let i of this.value) {
              if (this.__isObject(i)) {
                arr.push(i.key)
              } else {
                arr.push(i)
              }
            }
            console.log('Checkbox')
            return arr
          } else {
            return this.value
          }
        },
        set (v) {
          this.innerValue = v
        }
      },
      innerModel () {
        //        const intersection = (xs, ys) => xs.filter(x => ys.indexOf(x) > -1)
        let _values = []
        _values = [...this.innerValue]
        _values = _values.map(key => Object.values(this.options).find(subitem => subitem.key === key))
        return {
          isValid: this.innerValue.length > 0,
          msg: this.innerValue.length > 0 ? '' : this.errorMsg,
          value: JSON.parse(JSON.stringify(this.__intersection(Object.values(this.options), _values)))
        }
      }
    },
    beforeUpdate () {
      if (this.type === 'radio') {
        const length = this.innerValue.length
        if (length > 1) {
          this.innerValue = [this.innerValue[length - 1]]
        }
      }
    },
    watch: {
      innerValue (v) {
        console.log(v)
        console.log(JSON.parse(JSON.stringify(this.innerModel)))
        if (this.type === 'radio') {
          if (v.length > 1) return
        }
        this.$emit('on-change', JSON.parse(JSON.stringify(this.innerModel)), this.innerValue)
      },
      value (v) {
        this.$midValue = v
      },
      options (v) {

      }
    },
    methods: {
      getData (v) {
        this.$nextTick(() => {
          this.$emit('on-item-click', v)
        })
      }
    }
  }
</script>
<style lang="less" scoped></style>
