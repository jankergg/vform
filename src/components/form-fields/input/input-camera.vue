<!--
      descript: timer 组件
        author: jankergg
        param: props
        example:
接口地址：
/data/ocr/no-login/idCard
/data/ocr/no-login/bankCard
请求：post
参数{"image":"base64Image"}
-->
<template>
  <div class="input-ca-box">
    <!-- input 类型 -->
    <root-input
      @formChange="onChange"
      :rules="$rules"
      :value="innerValue"
      :name="name">
    </root-input>
    <!-- input 类型 -->
    <div class="upload-img">
      <input type="file" name="upfile" class="upinput" @change="upload" accept="image/*"/>
    </div>
  </div>
</template>
<script>
  import rootInput from './input'
  import formMixin from '../../../mixin/tools-mixin'
  import Zip from '../esign/zip'

  const OCRIDCARD = ''
  const OCRBANKCARD = ''
  export default {
    name: 'za-input-camera',
    mixins: [formMixin],
    data () {
      return {
        innerValue: this.value,
        innerErrors: null,
        scheme: {
          idCard: this.idCardScan,
          bankCard: this.getBank
        },
        base64: '',
        options: {},
        inputPics: null
      }
    },
    props: ['rules', 'value', 'name'],
    computed: {
      $rules () {
        return this.formModel.rules
      }
    },
    methods: {
      init () {
        this.Vzip = new Zip({
          quality: 0.5,
          maxSize: 800 * 1024
        })
        switch (this.formModel.rules.type) {
        case 'idCard':
          this.options['id_number'] = ''
          break
        case 'bankCard':
          this.options['card_number'] = ''
          break
        }
      },
      onChange (e) {
        this.$emit('formChange', e)
      },
      handler (img64) {
        let nativeFun = this.scheme[this.formModel.rules.type]
        if (!nativeFun) {
          throw new Error('调用的方法类型不存在，请检查scheme')
        }
        nativeFun(img64)
      },
      upload (e) {
        // begin loading
        this.$store.dispatch('toggleLoadingStatus', true)
        // zip image
        if (!e.target.files[0]) {
          return
        }
        return this.Vzip.run(e.target.files[0]).then(success => {
          this.nimg = {...success}
          this.base64 = this.nimg.base64
          return this.handler(this.nimg.base64)
        }, fail => {
          console.log(fail)
          return null
        }).catch(error => {
          console.log(error)
        })
      },
      idCardScan (img64) {
        return this.axios.post(OCRIDCARD, {image: img64}).then(res => {
          return this.setResult(res.data)
        })
      },
      getBank (img64) {
        return this.axios.post(OCRBANKCARD, {image: img64}).then(res => {
          return this.setResult(res.data)
        })
      },
      setResult (res) {
        // hide loading
        this.$store.dispatch('toggleLoadingStatus', false)
        if (res.rsp_code === '0000') {
          if (res.error_code === 0) {
            this.options = this.__attach(this.options, res)
            this.innerValue = this.__getFirstProp(this.options).replace(/\s/g, "")
            this.updateExt(res)
          } else {
            this.__toast(res.error_msg)
          }
          return res
        } else {
          this.__toast('识别失败，请重试')
          return null
        }
      },
      updateExt (res) {
        if (this.formModel.rules.update) {
          this.$nextTick(() => {
            this.formModel.rules.update.forEach(item => {
              let tar = item.split(':')
              if (tar[0] && res[tar[1]]) {
                this.$emit('formChange', {
                  name: tar[0],
                  value: res[tar[1]],
                  msg: null,
                  isValid: true
                })
              }
            })
          })
        }
      }
    },
    watch: {
      value (v) {
        if (v === null || v === undefined) {
          return
        }
        this.innerValue = v
      }
    },
    components: {
      rootInput
    }
  }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped></style>
