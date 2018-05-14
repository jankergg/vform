<!--
      descript: yes-no 组件
        author: jankergg
        param: props
        example:
-->
<template>
   <!-- 是否 类型 -->
  <div class="za-yesno">
    <div class="za-yesno-box">
      <span class="za-yesno-item" :class="{active: innerValue === 'Y'}" @click="onClick('Y')">是</span>
      <span class="za-yesno-item" :class="{active: innerValue === 'N'}" @click="onClick('N')">否</span>
    </div>
  </div>
  <!-- 是否 类型 -->
</template>

<script>
import rootSelectMx from '../mixin/check-mixin'

export default {
  name: 'za-yesno',
  mixins: [rootSelectMx],
  props: ["formModel", "name", "index"],
  watch: {
    innerValue: {
      deep: true,
      handler (v) {
        this.onChange(v)
      }
    }
  },
  methods: {
    onClick (v) {
      this.onCheck()
      this.innerValue = v
    }
  }
}
</script>
<style lang='less'>
  .za-yesno{
    text-align:right;
    .za-yesno-box{
      display:inline-block;
      vertical-align: middle;
      overflow:hidden;
      border-radius: 5px;
      border: 1px solid #ccc;
      font-size:0;
      line-height: 0;
      .za-yesno-item {
        display: inline-block;
        font-size: 14px;
        line-height: 1.2;
        padding: 4px 8px;
      }
      .za-yesno-item.active {
        background: #91dbfe;
        color:#fff;
      }
      .za-yesno-item:first-child{
        border-right:1px solid #ccc;
      }
    }
  }
</style>
