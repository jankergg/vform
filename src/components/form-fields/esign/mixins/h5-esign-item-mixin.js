/** mixins
 * mixin for h5-sign-item
 *
 *
 * **/
import Draw from '../draw'

export default {
  data () {
    return {
      msg: 'Just use canvas to draw',
      status: false,
      signName: this.handlerName,
      degree: 0, // 屏幕整体旋转的角度, 可取 -90,90,180等值
      scope: [
        {
          value: 0,
          title: '正常'
        },
        {
          value: 90,
          title: '顺时针旋转90°'
        },
        {
          value: 180,
          title: '顺时针旋转180°'
        },
        {
          value: -90,
          title: '逆时针旋转90°'
        }
      ]
    }
  },
  components: {
    Draw
  },
  props: ['handlerName'],
  mounted () {
    this.canvasBox = document.getElementById('canvasBox')
    this.initCanvas()
  },
  computed: {
//      $signName () {
//        return this.handlerName
//      },
    getHorizontalStyle () {
      const d = document
      const w = window.innerWidth || d.documentElement.clientWidth || d.body.clientWidth
      const h = window.innerHeight || d.documentElement.clientHeight || d.body.clientHeight
      let length = (h - w) / 2
      let width = w
      let height = h
      switch (this.degree) {
      case -90:
        length = -length
        break
      case 90:
        width = h
        height = w
        break
      default:
        length = 0
      }
      if (this.canvasBox) {
        this.canvasBox.removeChild(document.querySelector('canvas'))
        this.canvasBox.appendChild(document.createElement('canvas'))
        setTimeout(() => {
          this.initCanvas()
        }, 200)
      }
      return {
        transform: `rotate(${this.degree}deg) translate(${length}px,${length}px)`,
        width: `${width}px`,
        height: `${height}px`,
        transformOrigin: 'center center'
      }
    }
  },
  methods: {
    initCanvas () {
      const d = document
      const canvas = document.querySelector('canvas')
      const menu = document.getElementById('menuCanvas')
      const w = window.innerWidth || d.documentElement.clientWidth || d.body.clientWidth
      const h = window.innerHeight || d.documentElement.clientHeight || d.body.clientHeight
      canvas.width = w
//        canvas.height = h - 137
      this.draw = new Draw(canvas, -this.degree,
        () => {
          this.status = true
        })
    },
    clear () {
      this.status = false
      this.draw.clear()
      this.$emit('OnClear')
    },
    cancel () {
      this.$emit('OnCancel')
    },
    success () {
//      debugger
      if (!this.status) return
      const image = this.draw.getPNGImage()
      this.$emit('OnSuccess', image)
      // this.$emit('OnSuccess', this.draw.dataURLtoBlob(image))
      // this.draw.downloadPNGImage(this.draw.getPNGImage())
    },
    upload () {
      const image = this.draw.getPNGImage()
      const blob = this.draw.dataURLtoBlob(image)
      const url = ''
      const successCallback = (response) => {
        console.log(response)
      }
      const failureCallback = (error) => {
        console.log(error)
      }
      this.draw.upload(blob, url, successCallback, failureCallback)
    }
  }
}
