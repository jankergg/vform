<template>
  <div class="esign-upload">
    <ul class="item-wrapper" v-show="true">
      <li v-for="(item, index) in form.caInfoList" :key="index">
        <div class="item-block">
          <div>{{item.desc}}</div>
          <div class="upload-img" @click="uploadPic(item)">
            <!--<div :class="[item.cType != 1 ? 'camera' : 'sign']"></div>-->
            <div class="sign" v-if="item.cType == 1"></div>
            <div class="camera" v-else>
              <input :id="item.title" class="file-input" type="file" @change="inputChange(item)" accept="image/*" >
            </div>
          </div>
        </div>
        <div class="img_gallery" v-show="item.signImgPath || item.photoPath">
          <!--sign-->
          <span class="uploadImgEle" v-show="item.signImgPath">
            <i class="deleimg" @click.self="deleImg(item.cType, item)"></i>
            <img class="sign" :src="item.signImgPath"/>
          </span>
          <span class="uploadImgEle" v-show="item.photoPath">
            <i class="deleimg" @click.self="deleImg(item.cType, item)"></i>
            <img :src="item.photoPath"/>
          </span>
          <span class="sign-time">签名时间：<span>{{item.signTime | timefilter}}</span></span>
        </div>
        <!--pic(imgShowList)-->
        <div class="img_gallery" v-show="item.imagePathList && item.imagePathList[0]">
          <span class="uploadImgEle" v-show="item.imagePathList" v-for="(i, index) in item.imagePathList" :key="index">
              <i class="deleimg" @click.self="dImg(item, index)"></i>
              <img :src="i"/>
            </span>
        </div>
      </li>
    </ul>
    <h5-sign-for-enroll v-if="eSignStatus" @OnCancel="signCancel" @OnSuccess="signSuccess" :handlerName="handlerName"></h5-sign-for-enroll>
  </div>
</template>
<script>
  import Zip from './zip'
  import H5SignForEnroll from "./h5-sign-for-enroll.vue"

  const UPLOAD_IMG = ''
  export default {
    components: {
      H5SignForEnroll
    },
    name: 'c-upload-and-esign',
    data () {
      return {
        innerErrors: '',
        form: {},
        eSignStatus: false,
        currentImg: null,
        currentList: null
      }
    },
    mounted () {
      this.Vzip = new Zip()
    },
    props: ['eSignModel', 'handlerName'],
    computed: {
      $eSignModel: function () {
        return this.eSignModel
      },
      innerModel () {
        return {
//          name: this.name,
//          value: this.form.caInfoList,
//          msg: this.innerErrors,
//          isValid: ''
        }
      }
    },
    created () {
      this.oninit()
    },
    methods: {
      oninit () {
        this.form = this.$eSignModel.value
        this.initInnerModel(this.form.caInfoList)
        this.onValidate(this.form.caInfoList)
      },
      initInnerModel (list) {
        list.map(el => {
          if (el.cType == '1') {
            this.innerModel[el.title] = {
              name: el.title,
              value: el.signImgPath,
              msg: '',
              isValid: false
            }
          }
          if (el.cType == '2' || el.cType == '3') {
            this.innerModel[el.title] = {
              name: el.title,
              value: el.signImgPath,
              msg: '',
              isValid: false
            }
          }
          if (el.cType == '4') {
            this.innerModel[el.title] = {
              name: el.title,
              value: el.imagePathList,
              msg: '',
              isValid: false
            }
          }
        })
      },
      onValidate (list) {
        if (list) {
          list.map(el => {
            let model = this.innerModel[el.title]
            if (el.cType == '1') {
              if (!el.signImgPath) {
                model.msg = this.errorMsg(el.desc)
                model.isValid = false
                model.value = ''
              } else {
                model.msg = ''
                model.isValid = true
                model.value = el.signImgPath
              }
            }
            if (el.cType == '2' || el.cType == '3') {
              if (!el.photoPath) {
                model.msg = this.errorMsg(el.desc)
                model.isValid = false
                model.value = ''
              } else {
                model.msg = ''
                model.isValid = true
                model.value = el.photoPath
              }
            }
            if (el.cType == '4') {
              if (!(el.imagePathList && el.imagePathList[0])) {
                model.msg = this.errorMsg(el.desc)
                model.isValid = false
                model.value = ''
              } else {
                if (el.imagePathList.length < el.minLength) {
                  model.msg = el.errMsgForMin
                  model.isValid = false
                  model.value = ''
                } else {
                  model.msg = ''
                  model.isValid = true
                  let arr = []
                  el.imagePathList.map((obj) => {
                    arr.push(obj.url)
                  })
                  model.value = arr
                }
              }
            }
          })
        }
        this.$emit('on', {info: this.innerModel, form: this.form.caInfoList})
      },
      errorMsg (_msg) {
        return _msg + '不能为空'
      },
      deleImg (type, item) {
        item.photoPath = ''
        item.signImgPath = ''
        item.signData = ''
        item.faceFlag = null
        item.signImgLocal = ''
        item.imagePathList = []
        this.$nextTick(() => {
        })
        this.innerModel[item.title].isValid = false
        this.innerModel[item.title].msg = this.errorMsg(item.desc)
      },
      dImg (item, index) {
        item.imagePathList.splice(index, 1)
        item.imgShowList.splice(index, 1)
        let inputPics = document.getElementById(item.title)
        inputPics.value = ''
        this.onValidate(this.form.caInfoList)
        this.$nextTick(() => {
        })
      },
      uploadPic (item) {
        if (item.cType == '1') {
          this.eSignStatus = true
          this.currentImg = item
        } else {
          this.currentList = item
        }
      },
      inputChange (item) {
        // begin loading
        this.$store.dispatch('toggleLoadingStatus', true)
        let inputPics = document.getElementById(item.title)
        let firstImg = inputPics.files[0]
        let imgUpload = ''
        // zip image
        this.Vzip.run(firstImg).then(success => {
          this.nimg = {...success}
          let file = this.nimg.base64.split('base64,')
          this.axios.post(UPLOAD_IMG, {file: file[1], useFullUrl: 'yes'}).then(res => {
            // hide loading
            this.$store.dispatch('toggleLoadingStatus', false)
            imgUpload = res.data.value.url[0]
            if (item.imagePathList.length < item.maxLength) {
              item.imagePathList.push(imgUpload)
              item.imgShowList.push(imgUpload)
            } else {
              // this.$vux.toast.show({
              //   text: '照片数目大于最大值',
              //   type: 'text',
              //   width: '50%',
              //   isShowMask: true
              // })
            }
            this.onValidate(this.form.caInfoList)
            this.$emit('signChange', {info: this.innerModel, form: this.form.caInfoList})
          })
        }, fail => {
          console.log(fail)
        }).catch(error => {
          console.log(error)
        })
      },
      signCancel () {
        this.eSignStatus = false
      },
      signSuccess (img) {
        let file = img.split('base64,')
//        console.log(img)
//        this.img = img
        let imgUpload = ''
        this.eSignStatus = false
        // show loading
        this.$store.dispatch('toggleLoadingStatus', true)
        this.axios.post(UPLOAD_IMG, {file: file[1], useFullUrl: 'yes'}).then(res => {
          // hide loading
          imgUpload = res.data.value.url[0]
          this.currentImg.signImgPath = imgUpload
          this.currentImg.signTime = Date.now()
          this.currentImg.signImgLocal = imgUpload
//          this.currentImg.imagePathList.push()
          this.onValidate(this.form.caInfoList)
          this.$emit('signChange', {info: this.innerModel, form: this.form.caInfoList})
          this.$store.dispatch('toggleLoadingStatus', false)
        })
      }
    }
  }
</script>
<style lang='less' scoped></style>
