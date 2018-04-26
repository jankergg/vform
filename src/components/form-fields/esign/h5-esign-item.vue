<template>
  <div class="vsSign-2" id="canvasBox" :style="getHorizontalStyle">
    <div class="sign-title">请{{signName}}签名</div>
    <!--<div class="sign-title">请张三四签名</div>-->
    <canvas class="canvas-h"></canvas>
    <div class="menuCanvas" id="menuCanvas">
      <a @click="cancel">取消</a>
      <a @click="clear">清屏</a>
      <a @click="success" :class="[!status ? 'diable' : '']">确定</a>
    </div>
 </div>
</template>

<script>
  import esignMixin from './mixins/h5-esign-item-mixin'
  export default {
    name: 'c-h5-esign',
    mixins: [esignMixin]
  }
</script>

<style lang='less'></style>
