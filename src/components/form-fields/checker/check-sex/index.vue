<!--
descript: 单选组件
author: jankergg
param: props
methods:
seledcheck: 用于选择默认值 传入一个索引数即可
-->
<template>
  <div class="za-sex">
    <div class="root-select-mask" v-if="isReadOnly"></div>
    <div class="za-sex-box" :class="{dis: isReadOnly}">
      <div class="male" :class="{seled: innerValue === 'M'}" @click="onClick('M')">男</div>
      <div class="famale" :class="{seled: innerValue === 'F'}" @click="onClick('F')">女</div>
    </div>
  </div>
</template>
<script>
import rootSelectMx from '../mixin/check-mixin'

export default {
  name: 'za-sex',
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
      this.onCheck(v)
      this.innerValue = v
    }
  }
}
</script>
<style lang='less'>
.za-sex {
  display: inline-block;
  overflow: hidden;
  position: relative;
  vertical-align: middle;
  .za-sex-box{
    overflow: hidden;
    position: relative;
    & > div {
      position: absolute;
      color: #999999;
      display: inline-block;
      border-radius: 10px;
      position: relative;
      font-size: 14px;
      line-height: 1.2;
      box-sizing: border-box;
      vertical-align: middle;
      margin-left: 10px;
      padding: 4px 20px;
      border: 1px solid #ccc;
      &.seled {
        border: none;
        color: #fff;
      }
      &.male.seled {
        background: #91dbfe;
        border: 1px solid #91dbfe;
      }
      &.famale.seled {
        background: #fb7d8f;
        border: 1px solid #fb7d8f;
      }
    }
  }
  .dis > div.male.seled,
  .dis > div.famale.seled {
    background:#c0c0c0;
  }
}
</style>
