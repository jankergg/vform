<template>
  <div>
    <c-upload-and-esign @signChange="signChange" @on="signChange" :eSignModel="eSignModels"></c-upload-and-esign>
    <c_button val="提交" @Click="onSubmit"></c_button>
  </div>
</template>
<script>
  import eSignModel from '../model/test_sign_and_confirm_model'
  import CButton from '../../../base/submitbtn.vue'
  import CUploadAndEsign from "../upload-and-esign.vue"

  export default {
    data () {
      return {
        eSignModels: eSignModel,
        infoModel: '',
        submitInfo: ''
      }
    },
    created () {
    },
    activated () {
      console.log('esign======', this.eSignModels)
      window.SetH5Header('AAAA')
    },
    methods: {
      signChange (info) {
        if (info) {
          console.log('infoList=====', info)
          this.infoModel = info
        }
      },
      onSubmit () {
        if (this.isValid) {
          alert('success')
          let subMsg = this.infoModel.info
          let submitModel = {}
          for (let i in subMsg) {
            let item = subMsg[i]
            submitModel[i] = item.value
          }
          console.log('submitMODEL=====', submitModel)
        } else {
          // this.$vux.toast.show({
          //   text: this.infoModel.info.errorMsg,
          //   type: 'text',
          //   width: '50%',
          //   isShowMask: true
          // })
        }
      }
    },
    computed: {
      isValid () {
        let errors = this.infoModel.info
        for (let i in errors) {
          let item = errors[i]
          if (typeof item === 'string') continue
          if (!item) return false
          if (!item.isValid) {
            this.infoModel.info.errorMsg = item.msg
            return false
          }
        }
        return true
      }
    },
    components: {
      CUploadAndEsign,
      CButton
    }
  }
</script>
<style lang="less" scoped></style>
