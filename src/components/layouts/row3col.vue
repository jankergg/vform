<!--
      descript: 行组件
        author: chen
        param: props

  ---------------------------------------------------
  注意：此处的rule 并不是 配置文件中的rules
  如果要访问rules下的属性，须用rule.rules -- 只在本组件生效
-->
<template>
  <div class="baseBox" :class="$extraClass">
    <!-- 动态插槽 -->
    <template v-if="overRide">
      <div class="main" :class="{line: underline}" >
        <slot :name="slotName"></slot>
      </div>
    </template>
    <template v-else-if="rule.type=='block'||rule.type=='title'">
      <div class="main nonflex" :class="rule.class||rule.type" >
        <slot :name="rule.name"></slot>
      </div>
    </template>
    <!-- 默认插槽 -->
    <template v-else>
      <div class="main" :class="{line: underline}" >
        <div class="baseBoxLeft">
          <slot name="label"></slot>
        </div>
        <div class="baseBoxright">
          <slot name="val"></slot>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
  export default {
    name: 'root-item',
    activated () {
    },
    props: {
      name: {
        type: String
      },
      rule: {
        type: Object,
        default () {
          return {}
        }
      },
      isalert: {
        type: Boolean,
        default () {
          return false
        }
      },
      overRide: {
        type: [Boolean, Object, Array],
        default () {
          return false
        }
      },
      isShowUnderLine: {
        type: Boolean,
        default () {
          return true
        }
      }
    },
    computed: {
      slotName () {
        if (!this.overRide) {
          return null
        }
        if (this.name) {
          return this.name
        } else {
          throw new Error('当指定overRide属性时，必须给name传值！')
        }
      },
      underline () {
        return this.rule.rules && this.rule.rules.underline === false
      },
      $extraClass () {
        return this.rule.vertical ? this.rule.extraClass + ' vertical' : this.rule.extraClass
      }
    },
    methods: {
    }
  }
</script>
<style lang='less' scope></style>
